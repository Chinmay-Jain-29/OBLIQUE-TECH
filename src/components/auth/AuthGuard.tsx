'use client';

// =============================================================================
// OBLIQUETECH — USER AUTHENTICATION ROUTE GUARD
// Protects /account/* and user platform areas with seamless sign-in CTA
// =============================================================================

import React, { useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { Lock, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface AuthGuardProps {
  children: React.ReactNode;
  fallbackMessage?: string;
}

export function AuthGuard({ children, fallbackMessage }: AuthGuardProps) {
  const { user, isLoading, openAuthModal, authModalOpen } = useAuth();
  const hasTriggeredRef = React.useRef(false);

  useEffect(() => {
    if (!isLoading && !user && !authModalOpen && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      openAuthModal({
        title: 'Sign in to your workspace',
        message: fallbackMessage || 'Create your ObliqueTech profile to manage your projects, requests, calls, and other activities in one place.'
      });
    }
  }, [isLoading, user, fallbackMessage, authModalOpen, openAuthModal]);

  useEffect(() => {
    if (user) {
      hasTriggeredRef.current = false;
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-xs text-slate-400 font-mono">Verifying credentials & session...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0D0F12] border border-white/10 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Lock className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Sign in to continue.
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {fallbackMessage || 
                'Create your ObliqueTech profile to manage your projects, requests, calls, and other activities in one place.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => openAuthModal({ initialTab: 'login' })}
              className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => openAuthModal({ initialTab: 'signup' })}
              className="py-2.5 px-6 rounded-xl border border-white/20 hover:bg-white/5 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
            >
              Create Account
            </button>
          </div>

          <div className="pt-4 border-t border-white/10 text-center">
            <Link href="/" className="text-xs text-slate-400 hover:text-white transition-colors">
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
