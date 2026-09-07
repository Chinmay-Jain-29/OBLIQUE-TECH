'use client';

import React, { useState, useEffect } from 'react';
import { obliqueStore } from '@/lib/store';
import { CallRequest } from '@/types';
import { Calendar, Clock, Phone, Mail, Building, CheckCircle2 } from 'lucide-react';

export default function AdminCallRequestsPage() {
  const [calls, setCalls] = useState<CallRequest[]>([]);

  useEffect(() => {
    setCalls(obliqueStore.getCallRequests());
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Call Requests</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage scheduled 30–45 minute introductory calls and technical consultation sessions.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {calls.map((call) => (
          <div
            key={call.id}
            className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4 shadow-lg text-xs"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px]">
                  {call.durationMinutes} Minutes
                </span>
                <span className="font-bold text-sm text-white">{call.name}</span>
                {call.businessName && (
                  <span className="text-slate-400">({call.businessName})</span>
                )}
              </div>
              <span className="text-[11px] text-slate-500">
                Booked: {new Date(call.submittedAt).toLocaleDateString()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-300">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <strong className="text-amber-400 block mb-1">Reserved Slot:</strong>
                <p className="font-semibold text-white">Date: {call.preferredDate}</p>
                <p className="text-slate-400">Time: {call.preferredTime}</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <strong className="text-cyan-400 block mb-1">Topic / Scope:</strong>
                <p className="text-white font-medium">{call.reason}</p>
                <p className="text-slate-400">Service: {call.serviceRequired}</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <strong className="text-slate-400 block mb-1">Contact Details:</strong>
                <p>Email: <a href={`mailto:${call.email}`} className="text-cyan-400 hover:underline">{call.email}</a></p>
                <p>Phone: <a href={`tel:${call.phone}`} className="text-amber-400 hover:underline">{call.phone}</a></p>
              </div>
            </div>

            {call.requirements && (
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-slate-300">
                <strong className="text-slate-400 block mb-0.5">Notes:</strong>
                {call.requirements}
              </div>
            )}
          </div>
        ))}

        {calls.length === 0 && (
          <div className="text-center py-16 p-6 rounded-2xl bg-slate-900/30 border border-white/10 space-y-2">
            <Calendar className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-white">No Calls Scheduled Yet</p>
            <p className="text-xs text-slate-400">
              When prospective clients select a meeting window via `/schedule`, their requests will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
