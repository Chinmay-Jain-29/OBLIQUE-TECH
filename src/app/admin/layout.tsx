'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Briefcase, 
  Layers, 
  FileText, 
  HelpCircle, 
  MessageSquareQuote, 
  Mail, 
  Calendar, 
  Settings, 
  ArrowLeft, 
  ShieldCheck,
  Menu,
  X,
  UserCheck,
  LogOut
} from 'lucide-react';
import { AdminAuthGuard, logoutAdmin } from '@/components/admin/AdminAuthGuard';

const ADMIN_NAV = [
  { label: 'Overview Dashboard', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Portfolio Projects', href: '/admin/portfolio', icon: <Briefcase className="w-4 h-4" /> },
  { label: 'Services', href: '/admin/services', icon: <Layers className="w-4 h-4" /> },
  { label: 'Oblique Insights', href: '/admin/insights', icon: <FileText className="w-4 h-4" /> },
  { label: 'FAQs Management', href: '/admin/faqs', icon: <HelpCircle className="w-4 h-4" /> },
  { label: 'Testimonials Approval', href: '/admin/testimonials', icon: <MessageSquareQuote className="w-4 h-4" /> },
  { label: 'Contact Inquiries', href: '/admin/inquiries', icon: <Mail className="w-4 h-4" /> },
  { label: 'Call Requests', href: '/admin/call-requests', icon: <Calendar className="w-4 h-4" /> },
  { label: 'Site Settings', href: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
        {/* Admin Top Header */}
        <header className="h-16 border-b border-white/10 bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 lg:hidden"
              aria-label="Toggle admin sidebar"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-cyan-400 p-[1.5px]">
                <div className="w-full h-full bg-slate-950 rounded-[5px] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-sm tracking-tight text-white">OBLIQUE</span>
                <span className="text-[11px] font-mono uppercase text-cyan-400 tracking-wider">CMS Console</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
              <UserCheck className="w-3.5 h-3.5" />
              <span className="font-medium">Admin: Active</span>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Live Website</span>
              <span className="sm:hidden">Website</span>
            </Link>

            <button
              type="button"
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 text-xs font-semibold border border-rose-500/30 transition-colors cursor-pointer"
              title="Logout from CMS Console"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <aside
            className={`fixed inset-y-16 left-0 z-30 w-64 bg-slate-950/95 border-r border-white/10 p-4 space-y-1 transition-transform duration-200 lg:static lg:translate-x-0 overflow-y-auto ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 py-2">
              CMS Navigation
            </div>
            {ADMIN_NAV.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto bg-slate-900/30">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
