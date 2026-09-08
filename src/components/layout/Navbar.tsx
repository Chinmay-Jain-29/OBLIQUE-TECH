'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#0B0B0D]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Official ObliqueTech Wordmark & Angled Geometric Mark */}
          <Link href="/" className="flex items-center gap-2.5 group focus:outline-none">
            <div className="w-8 h-8 rounded bg-[#0B0B0D] dark:bg-white flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              {/* Minimal geometric angled O-mark */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white dark:text-[#0B0B0D]">
                <path
                  d="M5 19L19 5M6 5H18C18.5523 5 19 5.44772 19 6V18"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="15" r="2.5" fill="#C7A45D" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white transition-colors">
                Oblique<span className="text-[#C7A45D]">Tech</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium -mt-0.5">
                See Business Differently
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10 rounded-full px-3 py-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-150 ${
                    isActive
                      ? 'text-[#0B0B0D] dark:text-white bg-white dark:bg-white/10 font-semibold shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Theme Toggle, Admin, Schedule a Call */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />

            <Link
              href="/admin"
              className="text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white px-2 py-1 transition-colors flex items-center gap-1"
              title="Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>

            <Link
              href="/schedule"
              className="inline-flex items-center justify-center text-xs font-semibold px-4 py-2 rounded-lg bg-[#3B82F6] hover:bg-blue-600 text-white transition-all shadow-xs"
            >
              <span>Schedule a Call</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0B0B0D] border-b border-slate-200 dark:border-white/10 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-slate-100 dark:bg-white/10 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2">
            <Link
              href="/schedule"
              className="w-full text-center py-2.5 text-xs font-semibold rounded-lg bg-[#3B82F6] text-white hover:bg-blue-600 transition-colors"
            >
              Schedule a Call
            </Link>
            <Link
              href="/start-project"
              className="w-full text-center py-2.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-white/20 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
            >
              Start a Project
            </Link>
            <Link
              href="/admin"
              className="w-full text-center py-1 text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
