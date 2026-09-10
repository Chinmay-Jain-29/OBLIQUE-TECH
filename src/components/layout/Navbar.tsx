'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { ObliqueLogo } from '@/components/ui/ObliqueLogo';

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

  if (
    pathname === '/insights/write' || 
    pathname?.startsWith('/insights/write') ||
    pathname === '/admin' ||
    pathname?.startsWith('/admin')
  ) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08090B]/90 backdrop-blur-md border-b border-white/10 shadow-sm py-3'
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

          {/* Action: Schedule a Call */}
          <div className="hidden lg:flex items-center gap-3">
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
          </div>
        </div>
      )}
    </header>
  );
}
