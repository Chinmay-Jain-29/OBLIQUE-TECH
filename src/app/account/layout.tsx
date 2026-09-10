'use client';

// =============================================================================
// OBLIQUETECH — "MY OBLIQUE" USER DASHBOARD LAYOUT (Section 11, 45, 46)
// Clean, professional SaaS navigation & notification center
// =============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { obliqueStore } from '@/lib/store';
import { 
  LayoutDashboard, 
  User, 
  FolderKanban, 
  PhoneCall, 
  MessageSquareText, 
  BookOpen, 
  MessageSquarePlus, 
  Activity, 
  Settings, 
  LogOut, 
  Bell, 
  ExternalLink,
  ChevronRight,
  Shield,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const ACCOUNT_NAV_ITEMS = [
  { label: 'Overview', href: '/account', icon: LayoutDashboard },
  { label: 'Profile', href: '/account/profile', icon: User },
  { label: 'My Projects', href: '/account/projects', icon: FolderKanban },
  { label: 'My Calls', href: '/account/calls', icon: PhoneCall },
  { label: 'My Inquiries', href: '/account/inquiries', icon: MessageSquareText },
  { label: 'My Articles', href: '/account/articles', icon: BookOpen },
  { label: 'My Feedback', href: '/account/feedback', icon: MessageSquarePlus },
  { label: 'Activity', href: '/account/activity', icon: Activity },
  { label: 'Settings', href: '/account/settings', icon: Settings },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = user ? obliqueStore.getUserNotifications(user.id) : [];
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AuthGuard fallbackMessage="Sign in to access your personal ObliqueTech workspace, manage your project inquiries, view scheduled calls, and track editorial drafts.">
      <div className="min-h-screen bg-[#08090B] text-slate-100 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Workspace Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-mono font-medium border border-blue-500/20">
                  WORKSPACE
                </span>
                <span className="text-xs text-slate-400">Personal Dashboard</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>My Oblique</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Everything you&apos;re working on with ObliqueTech, in one place.
              </p>
            </div>

            {/* Header Right Utilities */}
            <div className="flex items-center gap-3">
              {/* Notifications Center */}
              <div className="relative">
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-[#0D0F12] border border-white/10 rounded-2xl shadow-2xl p-4 z-50 animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications</span>
                      <span className="text-[10px] text-slate-400">{notifications.length} total</span>
                    </div>

                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-4">No notifications yet.</p>
                    ) : (
                      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                        {notifications.map((n) => (
                          <div 
                            key={n.id} 
                            onClick={() => user && obliqueStore.markNotificationAsRead(user.id, n.id)}
                            className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                              n.read 
                                ? 'bg-white/[0.02] border-white/5 text-slate-400' 
                                : 'bg-blue-500/10 border-blue-500/20 text-white font-medium'
                            }`}
                          >
                            <p className="text-xs font-semibold">{n.title}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">{n.message}</p>
                            <span className="text-[9px] text-slate-500 mt-1 block">
                              {new Date(n.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Public Website Link */}
              <Link
                href="/"
                className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <span>Public Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Main Grid: Sidebar + Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-3 space-y-4">
              {/* User Identity Mini Card */}
              {user && (
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-sm font-bold text-white shrink-0 overflow-hidden shadow-md">
                    {user.profilePhoto ? (
                      <img src={user.profilePhoto} alt={user.fullName} className="w-full h-full object-cover" />
                    ) : (
                      user.fullName.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-white truncate">{user.fullName}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-blue-400 font-mono font-medium capitalize">
                      {user.role}
                    </span>
                  </div>
                </div>
              )}

              {/* Navigation Menu */}
              <nav className="p-2 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                {ACCOUNT_NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/20'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                    </Link>
                  );
                })}

                {/* Logout Button */}
                <div className="pt-2 mt-2 border-t border-white/10">
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </nav>

              {/* Quick Contact ObliqueTech Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  NEED HELP?
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Have questions regarding your project or consultation?
                </p>
                <Link
                  href="/schedule"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 pt-1"
                >
                  <span>Book 30-min strategy call</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </aside>

            {/* Content Area */}
            <main className="lg:col-span-9 space-y-6">
              {children}
            </main>
          </div>

        </div>
      </div>
    </AuthGuard>
  );
}
