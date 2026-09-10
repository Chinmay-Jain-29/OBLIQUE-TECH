'use client';

// =============================================================================
// OBLIQUETECH — "MY OBLIQUE" MY INQUIRIES (Section 11, 42)
// Direct contact requests, general inquiries, status tracking
// =============================================================================

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';
import { obliqueStore } from '@/lib/store';
import { 
  MessageSquareText, 
  Plus, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Clock,
  Send
} from 'lucide-react';

export default function AccountInquiriesPage() {
  const { user } = useAuth();

  if (!user) return null;

  const inquiries = obliqueStore.getContactSubmissions().filter(c => c.userId === user.id || c.email.toLowerCase() === user.email.toLowerCase());

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">My Inquiries</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Track communication and messages submitted via the ObliqueTech contact portal.
          </p>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all cursor-pointer self-start"
        >
          <Plus className="w-4 h-4" />
          <span>New Inquiry</span>
        </Link>
      </div>

      {inquiries.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mx-auto">
            <MessageSquareText className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="text-base font-bold text-white">No inquiries sent yet.</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Have a technical question or need a customized quote? Send a message directly to our engineering team.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all"
            >
              <span>Contact ObliqueTech</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {inq.service || 'General Inquiry'}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {new Date(inq.submittedAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                {inq.message}
              </p>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <span>Status: <strong className="text-white capitalize">{inq.status}</strong></span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Received
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
