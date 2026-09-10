'use client';

// =============================================================================
// OBLIQUETECH — "MY OBLIQUE" DASHBOARD OVERVIEW (Section 11, 12, 45, 46, 49)
// Real statistics, quick actions, profile completion & activity timeline
// =============================================================================

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';
import { obliqueStore } from '@/lib/store';
import { 
  FolderKanban, 
  PhoneCall, 
  FileText, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Sparkles,
  MessageSquareText,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export default function AccountOverviewPage() {
  const { user } = useAuth();

  if (!user) return null;

  const projects = obliqueStore.getUserProjectInquiries(user.id, user.email);
  const calls = obliqueStore.getUserCallRequests(user.id, user.email);
  const articles = obliqueStore.getUserArticles(user.id, user.email);
  const activities = obliqueStore.getUserActivities(user.id);
  const completion = obliqueStore.calculateProfileCompletion(user);

  // Filter actual statistics
  const activeRequestsCount = projects.filter(p => p.status === 'new' || p.status === 'in-review').length;
  const scheduledCallsCount = calls.filter(c => c.status === 'pending' || c.status === 'confirmed').length;
  const totalProjectsCount = projects.length;
  const publishedArticlesCount = articles.filter(a => a.status === 'published').length;

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-purple-900/20 border border-white/10 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Welcome back, {user.fullName.split(' ')[0]}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Your personalized digital workspace for active projects, calls, and engineering insights.
            </p>
          </div>

          <Link
            href="/start-project"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Start a Project</span>
          </Link>
        </div>

        {/* Profile Completion Indicator */}
        {completion < 100 && (
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-slate-300 font-medium">Profile {completion}% complete</span>
              <div className="w-32 bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>
            <Link 
              href="/account/profile" 
              className="text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1 text-[11px]"
            >
              <span>Add company & professional details</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>

      {/* 4 Metric Cards (Section 12: Actual Data Only) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Requests */}
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Active Requests</span>
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <MessageSquareText className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
            {activeRequestsCount}
          </div>
          <p className="text-[11px] text-slate-400">Inquiries currently in review</p>
        </div>

        {/* Scheduled Calls */}
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Scheduled Calls</span>
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <PhoneCall className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
            {scheduledCallsCount}
          </div>
          <p className="text-[11px] text-slate-400">Upcoming consultation sessions</p>
        </div>

        {/* Total Projects */}
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Projects</span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <FolderKanban className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
            {totalProjectsCount}
          </div>
          <p className="text-[11px] text-slate-400">Project requirements submitted</p>
        </div>

        {/* Published Articles */}
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Published Articles</span>
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <BookOpen className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
            {publishedArticlesCount}
          </div>
          <p className="text-[11px] text-slate-400">Insights authored by you</p>
        </div>
      </div>

      {/* Two Column Layout: Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Quick Service Actions */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Services
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Start a Project */}
            <Link
              href="/start-project"
              className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 transition-all group flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <FolderKanban className="w-4 h-4" />
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Start a Project</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Submit scope & requirements through our project wizard.
                </p>
              </div>
            </Link>

            {/* Schedule a Call */}
            <Link
              href="/schedule"
              className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 transition-all group flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <PhoneCall className="w-4 h-4" />
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Schedule Call</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Book a 30-minute technical architecture consultation.
                </p>
              </div>
            </Link>

            {/* Write for ObliqueTech */}
            <Link
              href="/insights/write"
              className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 transition-all group flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <BookOpen className="w-4 h-4" />
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Write an Article</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Author perspectives in the editorial studio.
                </p>
              </div>
            </Link>

            {/* Submit Feedback */}
            <Link
              href="/account/feedback"
              className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 transition-all group flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                  <MessageSquareText className="w-4 h-4" />
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Give Feedback</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Share reviews and feature recommendations.
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity Timeline (Section 13, 14, 44) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Recent Activity
            </h3>
            <Link 
              href="/account/activity" 
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
            >
              View Full Timeline →
            </Link>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
            {activities.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <Clock className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400 font-medium">No activity recorded yet.</p>
                <p className="text-[11px] text-slate-500">Your actions across ObliqueTech will appear here in chronological order.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activities.slice(0, 4).map((act) => (
                  <div key={act.id} className="flex items-start gap-3 text-xs">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0 shadow-xs" />
                    <div className="flex-1 overflow-hidden">
                      <p className="font-semibold text-white">{act.title}</p>
                      {act.description && (
                        <p className="text-slate-400 text-[11px] truncate">{act.description}</p>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono whitespace-nowrap">
                      {new Date(act.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
