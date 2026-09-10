'use client';

// =============================================================================
// OBLIQUETECH — "MY OBLIQUE" MY PROJECTS (Section 17, 18, 19, 46, 49)
// Project tracking, distinct status indicators, scope detail modal & empty state
// =============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';
import { obliqueStore } from '@/lib/store';
import { ProjectWizardInquiry, DetailedProjectStatus } from '@/types';
import { 
  FolderKanban, 
  Plus, 
  ArrowRight, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Layers, 
  Tag, 
  Eye, 
  X,
  FileText,
  ChevronRight
} from 'lucide-react';

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; border: string }> = {
  submitted: { label: 'Submitted', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  'in-review': { label: 'Reviewing', bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  discussion: { label: 'In Discussion', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  approved: { label: 'Approved', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  in_progress: { label: 'In Progress', bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  completed: { label: 'Completed', bg: 'bg-emerald-500/15', text: 'text-emerald-300', border: 'border-emerald-500/30' },
  on_hold: { label: 'On Hold', bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/20' },
  cancelled: { label: 'Cancelled', bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' }
};

export default function AccountProjectsPage() {
  const { user } = useAuth();
  const [selectedProject, setSelectedProject] = useState<ProjectWizardInquiry | null>(null);

  if (!user) return null;

  const projects = obliqueStore.getUserProjectInquiries(user.id);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">My Projects</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Track architecture scopes, submitted inquiries, and milestone development status.
          </p>
        </div>

        <Link
          href="/start-project"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all cursor-pointer self-start"
        >
          <Plus className="w-4 h-4" />
          <span>New Project Inquiry</span>
        </Link>
      </div>

      {/* Projects List or Empty State */}
      {projects.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mx-auto">
            <FolderKanban className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="text-base font-bold text-white">You haven&apos;t started a project with us yet.</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Define your software, web application, or AI requirements using our guided project wizard.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/start-project"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => {
            const statusKey = p.projectStatus || p.status || 'submitted';
            const statusInfo = STATUS_CONFIG[statusKey] || STATUS_CONFIG.submitted;

            return (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-white/5 text-[11px] font-mono text-cyan-400 capitalize">
                      {p.projectType.replace('-', ' ')}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}>
                      {statusInfo.label}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                      {p.coreObjective || `${p.projectType} System Architecture`}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                      {p.keyFeatures || 'Comprehensive engineering implementation.'}
                    </p>
                  </div>

                  {/* Services Needed Pills */}
                  {p.servicesNeeded && p.servicesNeeded.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.servicesNeeded.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-slate-400">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(p.submittedAt).toLocaleDateString()}</span>
                  </span>

                  <button
                    onClick={() => setSelectedProject(p)}
                    className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
                  >
                    <span>View Details</span>
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Project Detail Modal (Section 19) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0D0F12] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-5">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-mono capitalize">
                {selectedProject.projectType.replace('-', ' ')}
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight pt-1">
                {selectedProject.coreObjective || 'Project Scope & Requirements'}
              </h3>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">Key Requirements & Features</span>
                <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {selectedProject.keyFeatures || 'No extra features detailed.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                  <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">Estimated Timeline</span>
                  <p className="text-white font-semibold">{selectedProject.timeline || 'Flexible'}</p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                  <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">Submitted On</span>
                  <p className="text-white font-semibold">
                    {new Date(selectedProject.submittedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {selectedProject.servicesNeeded && selectedProject.servicesNeeded.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">Requested Services</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.servicesNeeded.map((s, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 text-[11px] font-medium border border-blue-500/20">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs">
              <span className="text-slate-400">Status: <strong className="text-white capitalize">{selectedProject.status}</strong></span>
              <Link
                href="/schedule"
                className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
              >
                Discuss on Call
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
