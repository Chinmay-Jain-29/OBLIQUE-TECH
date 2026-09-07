'use client';

import React, { useState, useEffect } from 'react';
import { obliqueStore } from '@/lib/store';
import { ContactSubmission, ProjectWizardInquiry } from '@/types';
import { Mail, Sparkles, Phone, Building, Calendar, CheckCircle2 } from 'lucide-react';

export default function AdminInquiriesPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [wizards, setWizards] = useState<ProjectWizardInquiry[]>([]);
  const [activeTab, setActiveTab] = useState<'wizards' | 'contacts'>('wizards');

  useEffect(() => {
    setContacts(obliqueStore.getContactSubmissions());
    setWizards(obliqueStore.getProjectWizardInquiries());
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Incoming Inquiries</h1>
          <p className="text-xs text-slate-400 mt-1">
            Review detailed scoping from the Project Discovery Wizard and direct contact messages.
          </p>
        </div>

        <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-white/10">
          <button
            onClick={() => setActiveTab('wizards')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'wizards'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Project Wizard ({wizards.length})
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'contacts'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Direct Contact ({contacts.length})
          </button>
        </div>
      </div>

      {activeTab === 'wizards' && (
        <div className="space-y-4">
          {wizards.map((wiz) => (
            <div
              key={wiz.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4 shadow-lg text-xs"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[10px]">
                    {wiz.projectType}
                  </span>
                  <span className="font-bold text-sm text-white">{wiz.name}</span>
                  {wiz.company && (
                    <span className="text-slate-400">({wiz.company})</span>
                  )}
                </div>
                <span className="text-[11px] text-slate-500">
                  {new Date(wiz.submittedAt).toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-300">
                <div>
                  <strong className="text-slate-400 block mb-1">Contact Details:</strong>
                  <p>Email: <a href={`mailto:${wiz.email}`} className="text-cyan-400 hover:underline">{wiz.email}</a></p>
                  <p>Phone: <a href={`tel:${wiz.phone}`} className="text-amber-400 hover:underline">{wiz.phone}</a></p>
                </div>
                <div>
                  <strong className="text-slate-400 block mb-1">Target Timeline:</strong>
                  <span className="text-amber-400 font-semibold">{wiz.timeline}</span>
                </div>
                <div>
                  <strong className="text-slate-400 block mb-1">Selected Disciplines:</strong>
                  <div className="flex flex-wrap gap-1">
                    {wiz.servicesNeeded.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <div>
                  <strong className="text-slate-300">Core Objective:</strong>
                  <p className="text-slate-400 mt-0.5">{wiz.coreObjective || 'No objective specified'}</p>
                </div>
                {wiz.keyFeatures && (
                  <div>
                    <strong className="text-slate-300">Key Features / Constraints:</strong>
                    <p className="text-slate-400 mt-0.5">{wiz.keyFeatures}</p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {wizards.length === 0 && (
            <div className="text-center py-16 p-6 rounded-2xl bg-slate-900/30 border border-white/10 space-y-2">
              <Sparkles className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-white">No Wizard Inquiries Yet</p>
              <p className="text-xs text-slate-400">
                Submissions from the 5-step interactive project wizard will appear here.
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'contacts' && (
        <div className="space-y-4">
          {contacts.map((c) => (
            <div
              key={c.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3 text-xs"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">{c.name}</span>
                  {c.company && <span className="text-slate-400">({c.company})</span>}
                  <span className="px-2 py-0.5 rounded bg-white/5 text-cyan-400 text-[10px]">
                    {c.service}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">
                  {new Date(c.submittedAt).toLocaleString()}
                </span>
              </div>

              <div className="flex gap-6 text-slate-300">
                <div>Email: <a href={`mailto:${c.email}`} className="text-cyan-400 hover:underline">{c.email}</a></div>
                {c.phone && <div>Phone: <span className="text-amber-400">{c.phone}</span></div>}
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-slate-300">
                {c.message}
              </div>
            </div>
          ))}

          {contacts.length === 0 && (
            <div className="text-center py-16 p-6 rounded-2xl bg-slate-900/30 border border-white/10 space-y-2">
              <Mail className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-white">No Direct Contact Messages Yet</p>
              <p className="text-xs text-slate-400">
                Submissions from the general contact form will appear here.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
