'use client';

// =============================================================================
// OBLIQUETECH — "MY OBLIQUE" MY CALLS (Section 21, 22, 46, 49)
// Upcoming, requested, confirmed, completed calls with meeting specs
// =============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';
import { obliqueStore } from '@/lib/store';
import { CallRequest } from '@/types';
import { 
  PhoneCall, 
  Calendar, 
  Clock, 
  Video, 
  ArrowRight, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  XCircle,
  HelpCircle
} from 'lucide-react';

const STATUS_BADGES: Record<string, { label: string; bg: string; text: string; border: string }> = {
  pending: { label: 'Requested', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  confirmed: { label: 'Confirmed', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  completed: { label: 'Completed', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  cancelled: { label: 'Cancelled', bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' }
};

export default function AccountCallsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past'>('all');

  if (!user) return null;

  const calls = obliqueStore.getUserCallRequests(user.id, user.email);

  const filteredCalls = calls.filter(c => {
    if (activeTab === 'upcoming') return c.status === 'pending' || c.status === 'confirmed';
    if (activeTab === 'past') return c.status === 'completed' || c.status === 'cancelled';
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">My Scheduled Calls</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            View upcoming technical consultations, architecture reviews, and strategic discovery calls.
          </p>
        </div>

        <Link
          href="/schedule"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all cursor-pointer self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Book Consultation</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      {calls.length > 0 && (
        <div className="flex rounded-xl bg-white/5 p-1 border border-white/10 w-fit text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeTab === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Calls ({calls.length})
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeTab === 'upcoming' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeTab === 'past' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            Past & Completed
          </button>
        </div>
      )}

      {/* Calls List or Empty State */}
      {filteredCalls.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto">
            <PhoneCall className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="text-base font-bold text-white">No calls scheduled yet.</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Book a 30-minute one-on-one session with our senior engineers to discuss your architecture or project roadmap.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/schedule"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all"
            >
              <span>Schedule a Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCalls.map((call) => {
            const statusInfo = STATUS_BADGES[call.status] || STATUS_BADGES.pending;

            return (
              <div
                key={call.id}
                className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium border font-mono uppercase tracking-wider bg-white/5 text-cyan-400 border-white/10">
                      {call.serviceRequired || 'Consulting'}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}>
                      {statusInfo.label}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {call.reason || 'Strategic Technology Discussion'}
                    </h3>
                    {call.requirements && (
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                        {call.requirements}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1 font-mono">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span>{call.preferredDate}</span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{call.preferredTime} ({call.durationMinutes} min)</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <Link
                    href={`https://api.whatsapp.com/send/?phone=8698314051&text=Hello+ObliqueTech%2C+inquiring+about+my+scheduled+call+(${encodeURIComponent(call.reason)})`}
                    target="_blank"
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors"
                  >
                    Support via WhatsApp
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
