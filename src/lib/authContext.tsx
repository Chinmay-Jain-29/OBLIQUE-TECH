'use client';

// =============================================================================
// OBLIQUETECH — UNIFIED AUTHENTICATION & USER PROFILE CONTEXT
// Supabase Auth + Local Fallback + Protected Action Modal Engine
// =============================================================================

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { UserProfile, UserRole } from '@/types';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { obliqueStore } from './store';

interface AuthModalConfig {
  title?: string;
  message?: string;
  redirectPath?: string;
  initialTab?: 'login' | 'signup' | 'forgot';
}

interface AuthContextType {
  user: UserProfile | null;
  session: any | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (fullName: string, email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string; error?: string }>;
  authModalOpen: boolean;
  authModalConfig: AuthModalConfig;
  openAuthModal: (config?: AuthModalConfig) => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CURRENT_USER_KEY = 'oblique_current_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalConfig, setAuthModalConfig] = useState<AuthModalConfig>({});
  const router = useRouter();
  const pathname = usePathname();

  // Helper to construct / resolve UserProfile from auth user
  const resolveProfile = useCallback(async (authUserId: string, email: string, metaName?: string): Promise<UserProfile> => {
    // 1. Check in-memory / local storage store
    const local = obliqueStore.getUserProfile(authUserId);
    if (local) {
      return local;
    }

    // 2. Check Supabase 'profiles' table if connected
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('auth_user_id', authUserId)
          .maybeSingle();

        if (data && !error) {
          const fetched: UserProfile = {
            id: String(data.id),
            authUserId: data.auth_user_id,
            fullName: data.full_name,
            email: data.email,
            phone: data.phone || '',
            countryCode: data.country_code || '+91',
            companyName: data.company_name || '',
            jobTitle: data.job_title || '',
            bio: data.bio || '',
            country: data.country || '',
            city: data.city || '',
            profilePhoto: data.profile_photo || '',
            linkedin: data.linkedin || '',
            website: data.website || '',
            role: (data.role as UserRole) || 'user',
            createdAt: data.created_at,
            updatedAt: data.updated_at
          };
          await obliqueStore.saveUserProfile(fetched);
          return fetched;
        }
      } catch (err) {
        console.warn('Error fetching Supabase profile:', err);
      }
    }

    // 3. Construct clean default profile
    const derivedName = metaName || email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const newProfile: UserProfile = {
      id: authUserId,
      authUserId,
      fullName: derivedName,
      email,
      phone: '',
      countryCode: '+91',
      companyName: '',
      jobTitle: '',
      bio: '',
      country: '',
      city: '',
      profilePhoto: '',
      linkedin: '',
      website: '',
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await obliqueStore.saveUserProfile(newProfile);
    return newProfile;
  }, []);

  // Initialize Auth state on mount
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      // Supabase Auth listener
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: { session: currentSession } } = await supabase.auth.getSession();
          if (mounted && currentSession?.user) {
            setSession(currentSession);
            const prof = await resolveProfile(
              currentSession.user.id, 
              currentSession.user.email || '', 
              currentSession.user.user_metadata?.full_name
            );
            if (mounted) setUser(prof);
          }
        } catch (e) {
          console.warn('Supabase getSession error:', e);
        }

        // Listen to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
          if (!mounted) return;
          setSession(newSession);
          if (newSession?.user) {
            const prof = await resolveProfile(
              newSession.user.id, 
              newSession.user.email || '', 
              newSession.user.user_metadata?.full_name
            );
            if (mounted) {
              setUser(prof);
              localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(prof));
            }
          } else {
            if (mounted) {
              setUser(null);
              localStorage.removeItem(CURRENT_USER_KEY);
            }
          }
        });

        if (mounted) setIsLoading(false);
        return () => subscription.unsubscribe();
      } else {
        // Local Fallback initialization
        try {
          const stored = localStorage.getItem(CURRENT_USER_KEY);
          if (stored) {
            const parsed: UserProfile = JSON.parse(stored);
            const verified = obliqueStore.getUserProfile(parsed.id) || parsed;
            if (mounted) setUser(verified);
          }
        } catch (e) {
          console.warn('Local auth restore error:', e);
        }
        if (mounted) setIsLoading(false);
      }
    }

    initAuth();
    return () => {
      mounted = false;
    };
  }, [resolveProfile]);

  // Login
  const login = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();

    if (isSupabaseConfigured && supabase && password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password
        });

        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }

        if (data.user) {
          const prof = await resolveProfile(data.user.id, cleanEmail, data.user.user_metadata?.full_name);
          setUser(prof);
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(prof));
          await obliqueStore.logUserActivity(prof.id, 'login', 'Logged in', 'Signed in via credentials');
          setIsLoading(false);
          closeAuthModal();
          return { success: true };
        }
      } catch (err: any) {
        setIsLoading(false);
        return { success: false, error: err?.message || 'Login failed.' };
      }
    }

    // Local simulated auth fallback
    const id = `user-${cleanEmail.replace(/[^a-z0-9]/g, '-')}`;
    const prof = await resolveProfile(id, cleanEmail);
    setUser(prof);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(prof));
    await obliqueStore.logUserActivity(prof.id, 'login', 'Logged in', 'Signed in successfully');

    // Also bridge with author user if applicable
    obliqueStore.loginAuthor(cleanEmail);

    setIsLoading(false);
    closeAuthModal();

    if (authModalConfig.redirectPath) {
      router.push(authModalConfig.redirectPath);
    }

    return { success: true };
  };

  // Sign Up
  const signup = async (fullName: string, email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName.trim();

    if (isSupabaseConfigured && supabase && password) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: { full_name: cleanName }
          }
        });

        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }

        if (data.user) {
          const prof = await resolveProfile(data.user.id, cleanEmail, cleanName);
          setUser(prof);
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(prof));
          await obliqueStore.logUserActivity(prof.id, 'login', 'Created Account', 'Registered new ObliqueTech profile');
          setIsLoading(false);
          closeAuthModal();
          return { success: true };
        }
      } catch (err: any) {
        setIsLoading(false);
        return { success: false, error: err?.message || 'Registration failed.' };
      }
    }

    // Local simulated signup fallback
    const id = `user-${Date.now()}`;
    const newProfile: UserProfile = {
      id,
      authUserId: id,
      fullName: cleanName,
      email: cleanEmail,
      phone: '',
      countryCode: '+91',
      companyName: '',
      jobTitle: '',
      bio: '',
      country: '',
      city: '',
      profilePhoto: '',
      linkedin: '',
      website: '',
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await obliqueStore.saveUserProfile(newProfile);
    setUser(newProfile);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newProfile));
    await obliqueStore.logUserActivity(newProfile.id, 'login', 'Created Account', 'Registered new ObliqueTech profile');
    
    // Also bridge with author user
    obliqueStore.registerAuthor(cleanName, cleanEmail);

    setIsLoading(false);
    closeAuthModal();

    if (authModalConfig.redirectPath) {
      router.push(authModalConfig.redirectPath);
    }

    return { success: true };
  };

  // Logout
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    if (user) {
      await obliqueStore.logUserActivity(user.id, 'logout', 'Logged out', 'Session terminated');
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Supabase signOut error:', e);
      }
    }

    setUser(null);
    setSession(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    obliqueStore.logoutAuthor();
    setIsLoading(false);

    // If currently on an account route, redirect to home
    if (pathname.startsWith('/account')) {
      router.push('/');
    }
  };

  // Update Profile
  const updateProfile = async (updates: Partial<UserProfile>): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'User not authenticated' };

    try {
      const updated: UserProfile = {
        ...user,
        ...updates,
        updatedAt: new Date().toISOString()
      };

      const saved = await obliqueStore.saveUserProfile(updated);
      setUser(saved);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(saved));
      await obliqueStore.logUserActivity(user.id, 'profile_update', 'Updated Profile', 'Updated profile details');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to update profile' };
    }
  };

  // Reset Password
  const resetPassword = async (email: string): Promise<{ success: boolean; message: string; error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase());
        if (error) return { success: false, message: '', error: error.message };
        return { success: true, message: 'Password reset link sent to your email inbox.' };
      } catch (err: any) {
        return { success: false, message: '', error: err?.message || 'Unable to send reset email.' };
      }
    }
    return { success: true, message: 'Password reset instructions simulated for development.' };
  };

  // Modal Controls
  const openAuthModal = (config?: AuthModalConfig) => {
    setAuthModalConfig(config || {});
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
    setAuthModalConfig({});
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
        resetPassword,
        authModalOpen,
        authModalConfig,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
