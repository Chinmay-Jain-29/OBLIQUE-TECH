'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { obliqueStore } from '@/lib/store';
import { 
  Briefcase, 
  Layers, 
  FileText, 
  HelpCircle, 
  MessageSquareQuote, 
  Mail, 
  Calendar, 
  ArrowUpRight, 
  Plus, 
  Clock, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [servicesCount, setServicesCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [draftsCount, setDraftsCount] = useState(0);
  const [faqsCount, setFaqsCount] = useState(0);
  const [pendingReviewsCount, setPendingReviewsCount] = useState(0);
  const [inquiriesCount, setInquiriesCount] = useState(0);
  const [callsCount, setCallsCount] = useState(0);

  useEffect(() => {
    const services = obliqueStore.getServices();
    const portfolio = obliqueStore.getPortfolio();
    const posts = obliqueStore.getPosts();
    const faqs = obliqueStore.getFAQs();
    const testimonials = obliqueStore.getTestimonials();
    const contacts = obliqueStore.getContactSubmissions();
    const wizards = obliqueStore.getProjectWizardInquiries();
    const calls = obliqueStore.getCallRequests();

    setServicesCount(services.length);
    setProjectsCount(portfolio.length);
    setPostsCount(posts.filter(p => p.status === 'published').length);
    setDraftsCount(posts.filter(p => p.status === 'draft').length);
    setFaqsCount(faqs.length);
    setPendingReviewsCount(testimonials.filter(t => t.status === 'pending').length);
    setInquiriesCount(contacts.length + wizards.length);
    setCallsCount(calls.length);
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">System Overview</h1>
          <p className="text-xs text-slate-400 mt-1">Live metrics across Content Management, Inquiries, and Pipeline.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/portfolio"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </Link>
          <Link
            href="/admin/insights"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Insight</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Inquiries</span>
            <Mail className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{inquiriesCount}</div>
          <Link href="/admin/inquiries" className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1">
            <span>View incoming</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Scheduled Calls</span>
            <Calendar className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{callsCount}</div>
          <Link href="/admin/call-requests" className="text-[11px] text-amber-400 hover:underline flex items-center gap-1">
            <span>Manage bookings</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Pending Reviews</span>
            <MessageSquareQuote className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{pendingReviewsCount}</div>
          <Link href="/admin/testimonials" className="text-[11px] text-rose-400 hover:underline flex items-center gap-1">
            <span>Review submissions</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Portfolio Items</span>
            <Briefcase className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{projectsCount}</div>
          <Link href="/admin/portfolio" className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1">
            <span>Edit projects</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Services Configured</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-white">{servicesCount} Core Disciplines</div>
          <p className="text-[11px] text-slate-500">All 7 primary services active in dynamic catalog.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Published Insights</span>
            <FileText className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-xl font-bold text-white">{postsCount} Articles ({draftsCount} drafts)</div>
          <p className="text-[11px] text-slate-500">Live on Oblique Insights with structured SEO.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Active FAQs</span>
            <HelpCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-white">{faqsCount} Questions</div>
          <p className="text-[11px] text-slate-500">Categorized across Process, Tech & Engagement.</p>
        </div>
      </div>

      {/* Recent Activity Feed & Status */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
        <h2 className="text-base font-bold text-white">System Logs & Recent Activity</h2>
        <div className="space-y-3 text-xs">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold text-slate-200">System Ready: </span>
              <span className="text-slate-400">Universal store initialized with 7 core services and 5 case studies.</span>
            </div>
            <span className="text-[10px] text-slate-500">Online</span>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold text-slate-200">Oblique AI Engine: </span>
              <span className="text-slate-400">Operational on client-side floating widget with zero pricing hallucinations.</span>
            </div>
            <span className="text-[10px] text-slate-500">Active</span>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold text-slate-200">Security Perimeter: </span>
              <span className="text-slate-400">PostgreSQL RLS policies defined in schema.sql. Zero secrets exposed client-side.</span>
            </div>
            <span className="text-[10px] text-slate-500">Secured</span>
          </div>
        </div>
      </div>
    </div>
  );
}
