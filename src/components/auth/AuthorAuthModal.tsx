'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Lock, Mail, User, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { obliqueStore } from '@/lib/store';

interface AuthorAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl?: string;
  onSuccess?: () => void;
}

export function AuthorAuthModal({
  isOpen,
  onClose,
  redirectUrl = '/insights/write',
  onSuccess,
}: AuthorAuthModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleProceedAfterAuth = (authorId: string) => {
    const isProfileComplete = obliqueStore.isAuthorProfileComplete(authorId);
    if (onSuccess) {
      onSuccess();
    }
    onClose();

    if (!isProfileComplete) {
      router.push(`/author/profile?redirect=${encodeURIComponent(redirectUrl)}`);
    } else {
      router.push(redirectUrl);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid work or personal email address.');
      return;
    }
    if (!password || password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      try {
        const user = obliqueStore.loginAuthor(email, password);
        setIsLoading(false);
        handleProceedAfterAuth(user.id);
      } catch (err: unknown) {
        setIsLoading(false);
        setError(err instanceof Error ? err.message : 'Unable to log in. Please try again.');
      }
    }, 400);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      try {
        const user = obliqueStore.registerAuthor(name, email, password);
        setIsLoading(false);
        handleProceedAfterAuth(user.id);
      } catch (err: unknown) {
        setIsLoading(false);
        setError(err instanceof Error ? err.message : 'Registration failed.');
      }
    }, 400);
  };

  const handleOneClickDemo = (asCompletedProfile = false) => {
    setIsLoading(true);
    setTimeout(() => {
      let user;
      if (asCompletedProfile) {
        user = obliqueStore.loginAuthor('alex.morgan@obliquetech.com', 'demo123');
        // Ensure profile is complete
        obliqueStore.saveAuthorProfile({
          id: user.id,
          slug: 'alex-morgan',
          fullName: 'Alex Morgan',
          title: 'Principal Systems Architect',
          bio: 'Writing on distributed cloud systems, modern web micro-frontends, and pragmatic AI engineering.',
          expertise: ['Distributed Systems', 'Applied AI', 'Next.js & React', 'System Design'],
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          linkedInUrl: 'https://linkedin.com/in/alex-morgan-oblique',
          twitterUrl: 'https://x.com/alexmorgan_tech',
          isComplete: true
        });
      } else {
        // Register brand new user that triggers /author/profile step
        user = obliqueStore.registerAuthor('Elena Rostova', `elena.${Date.now()}@obliquetech.com`, 'author123');
      }
      setIsLoading(false);
      handleProceedAfterAuth(user.id);
    }, 300);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Enter your registered email to receive reset instructions.');
      return;
    }
    setForgotSent(true);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-md rounded-2xl bg-[#0D0F12] border border-white/10 shadow-2xl p-6 sm:p-8 text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Oblique Angle Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-[#3B82F6]/20 via-[#7C5CFF]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-[#C7A45D]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 space-y-1.5 text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-[#3B82F6] text-[11px] font-mono font-medium">
            <Lock className="w-3 h-3" />
            <span>Author Studio Access</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {showForgot 
              ? 'Reset Author Password' 
              : mode === 'login' 
              ? 'Login Required' 
              : 'Create Author Account'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            {showForgot
              ? 'Enter your registered email address to receive recovery instructions.'
              : mode === 'login'
              ? 'Sign in to write and publish articles with ObliqueTech Insights.'
              : 'Join our collective of engineers, researchers, and technology practitioners.'}
          </p>
        </div>

        {/* Tab switchers if not forgot mode */}
        {!showForgot && (
          <div className="flex rounded-xl bg-white/5 p-1 mb-6 border border-white/5">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-start gap-2 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Forgot Password Flow */}
        {showForgot ? (
          <div>
            {forgotSent ? (
              <div className="space-y-4 py-4 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Reset Link Dispatched</h4>
                  <p className="text-xs text-slate-400">
                    Check your inbox at <span className="text-white font-mono">{email}</span> for instructions to reset your password.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => { setShowForgot(false); setForgotSent(false); }}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-all"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-medium text-slate-300">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="author@example.com"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3B82F6] transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => { setShowForgot(false); setError(''); }}
                    className="flex-1 py-2.5 rounded-xl border border-white/10 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#3B82F6] hover:bg-blue-600 text-xs font-semibold text-white transition-all shadow-md"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Main Login / Register Form */
          <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="space-y-4 text-left">
            {mode === 'register' && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Jordan Hayes"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3B82F6] transition-colors"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="author@example.com"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3B82F6] transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-slate-300">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => { setShowForgot(true); setError(''); }}
                    className="text-[11px] text-[#3B82F6] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3B82F6] transition-colors"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#7C5CFF] hover:from-blue-600 hover:to-purple-600 text-xs font-semibold text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? 'Processing...' : mode === 'login' ? 'Sign In & Start Writing' : 'Create Account'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* Quick Instant Demo Options */}
        {!showForgot && (
          <div className="mt-6 pt-5 border-t border-white/10 space-y-2 text-left">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1 text-[#C7A45D]">
                <Sparkles className="w-3 h-3" />
                <span>Instant Reviewer / Demo Access</span>
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleOneClickDemo(true)}
                disabled={isLoading}
                className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-slate-300 hover:text-white transition-all text-left flex flex-col justify-center cursor-pointer"
              >
                <span className="font-semibold text-white">Active Author</span>
                <span className="text-[10px] text-slate-400">Existing complete profile</span>
              </button>
              <button
                type="button"
                onClick={() => handleOneClickDemo(false)}
                disabled={isLoading}
                className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-slate-300 hover:text-white transition-all text-left flex flex-col justify-center cursor-pointer"
              >
                <span className="font-semibold text-white">New Contributor</span>
                <span className="text-[10px] text-slate-400">Tests profile setup step</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
