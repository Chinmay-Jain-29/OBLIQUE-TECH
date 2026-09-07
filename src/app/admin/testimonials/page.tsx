'use client';

import React, { useState, useEffect } from 'react';
import { obliqueStore } from '@/lib/store';
import { TestimonialSubmission } from '@/types';
import { CheckCircle2, XCircle, Star, MessageSquareQuote, Trash2 } from 'lucide-react';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialSubmission[]>([]);

  useEffect(() => {
    setTestimonials(obliqueStore.getTestimonials());
  }, []);

  const handleUpdateStatus = (id: string, status: 'pending' | 'approved' | 'rejected') => {
    obliqueStore.updateTestimonialStatus(id, status);
    setTestimonials(obliqueStore.getTestimonials());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Testimonials Approval</h1>
          <p className="text-xs text-slate-400 mt-1">
            Review user feedback submissions. In keeping with our verified policy, only approved feedback is published.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-900/60 border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 text-slate-400 font-semibold border-b border-white/10">
              <tr>
                <th className="p-4">Client & Company</th>
                <th className="p-4">Project</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Testimonial Content</th>
                <th className="p-4">Current Status</th>
                <th className="p-4 text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {testimonials.map((t) => (
                <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-bold text-white">
                    <div>{t.clientName}</div>
                    <div className="text-[10px] text-slate-400">{t.position}, {t.company}</div>
                  </td>
                  <td className="p-4 text-slate-300">{t.project}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{t.rating}/5</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300 max-w-sm">{t.testimonial}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        t.status === 'approved'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : t.status === 'rejected'
                          ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {t.status !== 'approved' && (
                      <button
                        onClick={() => handleUpdateStatus(t.id, 'approved')}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 font-semibold transition-colors"
                        title="Approve & Publish"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                    )}
                    {t.status !== 'rejected' && (
                      <button
                        onClick={() => handleUpdateStatus(t.id, 'rejected')}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 font-semibold transition-colors"
                        title="Reject"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {testimonials.length === 0 && (
          <div className="text-center py-12 p-6 space-y-2">
            <MessageSquareQuote className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-white">No Testimonials Submitted Yet</p>
            <p className="text-xs text-slate-400">
              When clients submit feedback via the public website modal, they will appear here for verification.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
