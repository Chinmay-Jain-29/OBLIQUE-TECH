'use client';

// =============================================================================
// OBLIQUETECH — PUBLIC & AUTHENTICATED NAVBAR
// Open browsing + "My Oblique" user platform dropdown & Sign In trigger
// =============================================================================

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  User, 
  LayoutDashboard, 
  FolderKanban, 
  PhoneCall, 
  BookOpen, 
  Activity, 
  Settings, 
  LogOut, 
  ChevronDown,
  LogIn
} from 'lucide-react';
import { ObliqueLogo } from '@/components/ui/ObliqueLogo';
import { useAuth } from '@/lib/authContext';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, logout, openAuthModal } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Exclude navbar entirely on admin routes and dedicated fullscreen editorial workspace
  if (
    pathname.startsWith('/admin') || 
    pathname === '/insights/write' || 
    pathname.startsWith('/insights/write')
  ) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08090B]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Official ObliqueTech Logo */}
          <Link href="/" className="group focus:outline-none py-1">
            <ObliqueLogo size="md" showTagline />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded-full px-3 py-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-150 ${
                    isActive
                      ? 'text-white bg-white/10 font-semibold shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            {mounted && user ? (
              /* Authenticated "My Oblique" Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium transition-all cursor-pointer group"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-xs overflow-hidden">
                    {user.profilePhoto ? (
                      <img src={user.profilePhoto} alt={user.fullName} className="w-full h-full object-cover" />
                    ) : (
                      user.fullName.charAt(0).toUpperCase()
                    )}
                  </div>
                  <span className="max-w-[100px] truncate">{user.fullName.split(' ')[0]}</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-mono">My Oblique</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#0D0F12] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-xs font-semibold text-white truncate">{user.fullName}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/account"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-blue-400" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href="/account/profile"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-indigo-400" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        href="/account/projects"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <FolderKanban className="w-3.5 h-3.5 text-emerald-400" />
                        <span>My Projects</span>
                      </Link>
                      <Link
                        href="/account/calls"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                        <span>My Calls</span>
                      </Link>
                      <Link
                        href="/account/articles"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                        <span>My Articles</span>
                      </Link>
                      <Link
                        href="/account/activity"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Activity className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Activity</span>
                      </Link>
                      <Link
                        href="/account/settings"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Settings className="w-3.5 h-3.5 text-slate-400" />
                        <span>Settings</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-white/10">
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer text-left"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Guest: Sign In Button */
              <button
                onClick={() => openAuthModal({ initialTab: 'login' })}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-blue-400" />
                <span>Sign In</span>
              </button>
            )}

            {/* Primary Action Button */}
            <Link
              href="/schedule"
              className="inline-flex items-center justify-center text-xs font-semibold px-4 py-2 rounded-lg bg-[#3B82F6] hover:bg-blue-600 text-white transition-all shadow-xs"
            >
              <span>Schedule a Call</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-300 hover:bg-white/5 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#08090B] border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {/* Mobile User Card */}
          {mounted && user ? (
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white overflow-hidden">
                  {user.profilePhoto ? (
                    <img src={user.profilePhoto} alt={user.fullName} className="w-full h-full object-cover" />
                  ) : (
                    user.fullName.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-white truncate">{user.fullName}</p>
                  <p className="text-[10px] text-blue-400 font-mono">My Oblique Workspace</p>
                </div>
              </div>
              <Link
                href="/account"
                className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-blue-600 text-white"
              >
                Dashboard
              </Link>
            </div>
          ) : (
            <div className="mb-3">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  openAuthModal({ initialTab: 'login' });
                }}
                className="w-full py-2.5 text-xs font-semibold rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-blue-400" />
                <span>Sign In / Create Account</span>
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white/10 text-blue-400 font-semibold'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* User Specific Mobile Links */}
          {user && (
            <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
              <Link href="/account/projects" className="p-2 rounded-lg bg-white/[0.02] text-slate-300 hover:text-white">
                📁 My Projects
              </Link>
              <Link href="/account/calls" className="p-2 rounded-lg bg-white/[0.02] text-slate-300 hover:text-white">
                📞 My Calls
              </Link>
              <Link href="/account/articles" className="p-2 rounded-lg bg-white/[0.02] text-slate-300 hover:text-white">
                ✍️ My Articles
              </Link>
              <Link href="/account/profile" className="p-2 rounded-lg bg-white/[0.02] text-slate-300 hover:text-white">
                👤 My Profile
              </Link>
            </div>
          )}

          {/* Mobile Bottom Actions */}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/schedule"
              className="w-full text-center py-2.5 text-xs font-semibold rounded-lg bg-[#3B82F6] text-white hover:bg-blue-600 transition-colors"
            >
              Schedule a Call
            </Link>
            <Link
              href="/start-project"
              className="w-full text-center py-2.5 text-xs font-semibold rounded-lg border border-white/20 text-slate-200 hover:bg-white/5 transition-colors"
            >
              Start a Project
            </Link>
            {user && (
              <button
                onClick={logout}
                className="w-full py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer text-center"
              >
                Logout from ObliqueTech
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
