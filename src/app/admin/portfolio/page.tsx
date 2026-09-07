'use client';

import React, { useState, useEffect } from 'react';
import { obliqueStore } from '@/lib/store';
import { PortfolioProject } from '@/types';
import { Plus, Edit2, Trash2, CheckCircle, Clock, Eye, EyeOff, X } from 'lucide-react';

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setProjects(obliqueStore.getPortfolio());
  }, []);

  const handleTogglePublish = (project: PortfolioProject) => {
    const updated = { ...project, published: !project.published };
    obliqueStore.saveProject(updated);
    setProjects(obliqueStore.getPortfolio());
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this portfolio project?')) {
      obliqueStore.deleteProject(id);
      setProjects(obliqueStore.getPortfolio());
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    obliqueStore.saveProject(editingProject);
    setProjects(obliqueStore.getPortfolio());
    setEditingProject(null);
    setIsNew(false);
  };

  const handleOpenNew = () => {
    const newP: PortfolioProject = {
      id: `proj-${Date.now()}`,
      slug: 'new-project',
      title: 'New Architecture Solution',
      shortDescription: 'Brief summary of the engineered solution.',
      clientIndustry: 'Technology & Enterprise',
      status: 'completed',
      category: 'Web',
      problem: 'Operational bottleneck details...',
      approach: 'Oblique architecture strategy...',
      solution: 'Engineered solution implementation...',
      features: ['Feature A', 'Feature B'],
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL'],
      metricsOrHighlights: ['High Reliability Metric'],
      coverImage: '/projects/default.jpg',
      galleryImages: [],
      published: true,
      featured: false,
      order: projects.length + 1
    };
    setEditingProject(newP);
    setIsNew(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Portfolio Projects</h1>
          <p className="text-xs text-slate-400 mt-1">Manage case studies, delivery statuses, and technologies.</p>
        </div>
        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl bg-slate-900/60 border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 text-slate-400 font-semibold border-b border-white/10">
              <tr>
                <th className="p-4">Project Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Industry</th>
                <th className="p-4">Status</th>
                <th className="p-4">Visibility</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-bold text-white">
                    <div>{p.title}</div>
                    <div className="text-[10px] text-slate-500 font-mono">/portfolio/{p.slug}</div>
                  </td>
                  <td className="p-4 text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-medium border border-white/5">
                      {p.category}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{p.clientIndustry}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        p.status === 'completed'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {p.status === 'completed' ? 'Completed' : 'Ongoing'}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleTogglePublish(p)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-semibold transition-colors ${
                        p.published
                          ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                          : 'bg-slate-800 text-slate-500 border border-white/5'
                      }`}
                    >
                      {p.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{p.published ? 'Published' : 'Hidden'}</span>
                    </button>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingProject(p);
                        setIsNew(false);
                      }}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                      title="Edit project"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100">
            <button
              onClick={() => setEditingProject(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-white mb-4">
              {isNew ? 'Create New Portfolio Project' : `Edit ${editingProject.title}`}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category *</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  >
                    <option value="Web">Web</option>
                    <option value="Mobile">Mobile</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="SaaS">SaaS</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Software">Software</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Project Status *</label>
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  >
                    <option value="completed">Completed</option>
                    <option value="ongoing">Ongoing Sprint</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Client Industry *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.clientIndustry}
                    onChange={(e) => setEditingProject({ ...editingProject, clientIndustry: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Short Description *</label>
                <textarea
                  required
                  rows={2}
                  value={editingProject.shortDescription}
                  onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">The Problem / Challenge *</label>
                <textarea
                  required
                  rows={2}
                  value={editingProject.problem}
                  onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">The Solution *</label>
                <textarea
                  required
                  rows={2}
                  value={editingProject.solution}
                  onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={editingProject.technologies.join(', ')}
                  onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
