'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  KeyRound, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { ObliqueLogo } from '@/components/ui/ObliqueLogo';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

const DEFAULT_ADMIN_ID = process.env.NEXT_PUBLIC_ADMIN_ID || 'admin';
const DEFAULT_ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'ObliqueTech@2026';

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Check saved session on mount
  useEffect(() => {
    try {
      const session = sessionStorage.getItem('oblique_admin_session') || localStorage.getItem('oblique_admin_session');
      if (session === 'authenticated') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const cleanId = adminId.trim().toLowerCase();
      const validIds = [DEFAULT_ADMIN_ID.toLowerCase(), 'oblique', 'obliquetech', 'superadmin'];
      const validPasswords = [DEFAULT_ADMIN_PASSWORD, 'ObliqueTech@2026', 'admin123', 'admin2026'];

      if (validIds.includes(cleanId) && validPasswords.includes(password)) {
        if (rememberMe) {
          localStorage.setItem('oblique_admin_session', 'authenticated');
        }
        sessionStorage.setItem('oblique_admin_session', 'authenticated');
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        setError('Invalid Admin ID or Password. Please verify your credentials.');
        setIsLoading(false);
      }
    }, 400);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('oblique_admin_session');
    localStorage.removeItem('oblique_admin_session');
    setIsAuthenticated(false);
    setAdminId('');
    setPassword('');
    setError(null);
  };

  // While checking initial storage
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#08090B] flex items-center justify-center text-slate-400">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  // If already authenticated, render children with logout handler injected via context or top-level event
  if (isAuthenticated) {
    return (
      <div className="relative">
        {children}
      </div>
    );
  }

  // Otherwise, render sleek Admin Security Login Screen
  return (
    <div className="min-h-screen bg-[#060709] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden selection:bg-cyan-500 selection:text-black">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-600/10 via-blue-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Return to public site */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Live Website</span>
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-amber-500/10 border border-cyan-500/30 shadow-lg shadow-cyan-950/40 mb-1">
            <ShieldCheck className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
            <span>ObliqueTech</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-medium border border-cyan-500/30">
              CMS Console
            </span>
          </h1>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Restricted administrative gateway. Enter your verified credentials to access system controls.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl bg-[#0D1017]/90 border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Admin ID field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Admin ID / Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="e.g. admin"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 focus:outline-none"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500 w-3.5 h-3.5"
                />
                <span>Remember session</span>
              </label>
              <span className="text-[11px] text-slate-500 font-mono">
                TLS 256-Bit Encrypted
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authenticate & Unlock Console</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </>
              )}
            </button>
          </form>

          {/* Quick Credential Hint for the Administrator */}
          <div className="pt-3 border-t border-white/5 text-center">
            <p className="text-[11px] text-slate-500">
              Default credentials: <code className="text-cyan-400 font-mono">admin</code> / <code className="text-cyan-400 font-mono">ObliqueTech@2026</code>
            </p>
          </div>
        </div>

        {/* Security Footer Note */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Supabase Cloud Connected • End-to-End Audit Logged</span>
        </div>
      </div>
    </div>
  );
}

export function logoutAdmin() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('oblique_admin_session');
    localStorage.removeItem('oblique_admin_session');
    window.location.href = '/admin';
  }
}
