'use client';

// =============================================================================
// OBLIQUETECH — FRIENDLY AUTHENTICATION MODAL (Section 4, 5, 38, 39)
// "Sign in to continue. Create your ObliqueTech profile to manage your projects..."
// =============================================================================

import React, { useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { X, Sparkles, Mail, Lock, User, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';

export function AuthModal() {
  const { authModalOpen, authModalConfig, closeAuthModal, login, signup, resetPassword } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'forgot'>(
    authModalConfig.initialTab || 'login'
  );

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setIsSubmitting(true);

    if (activeTab === 'forgot') {
      const res = await resetPassword(email);
      setIsSubmitting(false);
      if (res.success) {
        setSuccessMessage(res.message);
      } else {
        setError(res.error || 'Failed to send reset link.');
      }
      return;
    }

    if (activeTab === 'signup') {
      if (!fullName.trim()) {
        setError('Please enter your full name.');
        setIsSubmitting(false);
        return;
      }
      if (!password || password.length < 6) {
        setError('Password must be at least 6 characters long.');
        setIsSubmitting(false);
        return;
      }

      const res = await signup(fullName, email, password);
      setIsSubmitting(false);
      if (!res.success) {
        setError(res.error || 'Account creation failed. Please try again.');
      }
      return;
    }

    // activeTab === 'login'
    if (!password) {
      setError('Please enter your password.');
      setIsSubmitting(false);
      return;
    }

    const res = await login(email, password);
    setIsSubmitting(false);
    if (!res.success) {
      setError(res.error || 'Invalid credentials. Please verify your email and password.');
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-[#0D0F12] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-b-full blur-xs" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 mb-1">
            <Image 
              src="/oblique-mark.png" 
              alt="ObliqueTech" 
              width={28} 
              height={28} 
              className="object-contain"
            />
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {authModalConfig.title || 'Sign in to continue.'}
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
            {authModalConfig.message || 
              'Create your ObliqueTech profile to manage your projects, requests, calls, and other activities in one place.'}
          </p>
        </div>

        {/* Tab Switcher */}
        {activeTab !== 'forgot' && (
          <div className="flex rounded-xl bg-white/5 p-1 border border-white/10 mb-6">
            <button
              type="button"
              onClick={() => { setActiveTab('login'); setError(null); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('signup'); setError(null); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'signup'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Alerts */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'signup' && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>
          </div>

          {activeTab !== 'forgot' && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-slate-300">Password</label>
                {activeTab === 'login' && (
                  <button
                    type="button"
                    onClick={() => { setActiveTab('forgot'); setError(null); }}
                    className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : activeTab === 'signup' ? (
              <>
                <span>Create My Oblique Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : activeTab === 'forgot' ? (
              <>
                <span>Send Reset Link</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Sign In to Continue</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {activeTab === 'forgot' && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => { setActiveTab('login'); setError(null); }}
              className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              ← Back to Sign In
            </button>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-white/10 text-center text-[11px] text-slate-500">
          By signing in, you agree to ObliqueTech's{' '}
          <a href="/terms" className="underline hover:text-slate-400">Terms of Service</a> and{' '}
          <a href="/privacy-policy" className="underline hover:text-slate-400">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}
