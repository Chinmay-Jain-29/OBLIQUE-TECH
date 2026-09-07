'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { obliqueStore, INITIAL_PORTFOLIO } from '@/lib/store';
import { PortfolioProject } from '@/types';
import { ArrowUpRight, Award, Search, Filter, Layers, CheckCircle, Clock } from 'lucide-react';

const CATEGORIES = ['All', 'Web', 'Mobile', 'AI/ML', 'SaaS', 'UI/UX', 'Software'];

export default function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>(INITIAL_PORTFOLIO);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setProjects(obliqueStore.getPortfolio());
  }, []);

  const filtered = projects.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
          <Award className="w-3.5 h-3.5" />
          <span>Demonstrated Capability</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Portfolio & Case Studies.
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Authentic engineering delivered with clarity. Exploring 3 completed enterprise solutions and 2 ongoing innovation initiatives.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/50 border border-white/10">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or stack..."
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((project) => (
          <div
            key={project.id}
            className="group flex flex-col justify-between rounded-3xl bg-slate-900/40 border border-white/10 overflow-hidden hover:border-amber-400/40 transition-all duration-300 shadow-xl hover:-translate-y-1"
          >
            <div className="p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/5 text-slate-300 border border-white/10">
                  {project.category}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                    project.status === 'completed'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  {project.status === 'completed' ? (
                    <>
                      <CheckCircle className="w-3 h-3" />
                      <span>Completed</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3" />
                      <span>Ongoing Sprint</span>
                    </>
                  )}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>

              <div className="pt-2 text-xs text-slate-400">
                <strong className="text-slate-300 font-semibold">Industry: </strong>
                <span>{project.clientIndustry}</span>
              </div>

              <div className="pt-2">
                <p className="text-[11px] font-semibold text-slate-300 mb-1.5">Key Highlights:</p>
                <ul className="space-y-1 text-xs text-slate-400">
                  {project.metricsOrHighlights.slice(0, 3).map((metric, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
                      <span>{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-7 pt-0 space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 5).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-400 border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="inline-flex items-center justify-between w-full text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  <span>Explore Case Study</span>
                  <ArrowUpRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 p-8 rounded-2xl bg-slate-900/30 border border-white/10 space-y-2">
          <p className="text-sm font-semibold text-white">No matching projects found</p>
          <p className="text-xs text-slate-400">Try adjusting your search terms or category filters.</p>
        </div>
      )}

      {/* Bottom Scoping Card */}
      <div className="text-center p-12 rounded-3xl bg-slate-900/50 border border-white/10 space-y-4">
        <h2 className="text-2xl font-bold text-white">Have a Project with Similar Constraints?</h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          We engineer tailored solutions suited directly to your business workflows.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <Link
            href="/start-project"
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all"
          >
            Launch Project Wizard
          </Link>
        </div>
      </div>
    </div>
  );
}
