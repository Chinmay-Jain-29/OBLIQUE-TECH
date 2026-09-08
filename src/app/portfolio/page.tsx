'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { obliqueStore, INITIAL_PORTFOLIO } from '@/lib/store';
import { PortfolioProject } from '@/types';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';

const CATEGORIES = ['All', 'Web', 'Mobile', 'AI', 'Software', 'UI/UX'];

export default function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>(INITIAL_PORTFOLIO);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setProjects(obliqueStore.getPortfolio());
  }, []);

  const filtered = projects.filter((p) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'AI') return p.category.includes('AI');
    return p.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="flex flex-col">
      {/* Header (Surface: Oblique Black) */}
      <section className="surface-black pt-32 pb-20 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[#C7A45D]">Selected Work</span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            A look at what we’ve built.
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
            Authentic software interfaces and distributed systems. 3 completed production deployments and 2 active initiatives.
          </p>
        </div>
      </section>

      {/* Filter & Projects Grid (Surface: Pure White) */}
      <section className="surface-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Simple Filters */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0B0B0D] dark:bg-white text-white dark:text-[#0B0B0D]'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Visual-First Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className="clean-card rounded-2xl overflow-hidden flex flex-col group"
              >
                {/* Visual Cover Screenshot */}
                <div className="relative aspect-video w-full bg-slate-100 dark:bg-slate-900 overflow-hidden border-b border-slate-200/80 dark:border-white/10">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                        project.status === 'completed'
                          ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-500/30'
                          : 'bg-amber-900/80 text-amber-200 border border-amber-500/30'
                      }`}
                    >
                      {project.status === 'completed' ? 'Completed' : 'Active Bench'}
                    </span>
                  </div>
                </div>

                {/* Minimal Metadata */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3B82F6]">
                      {project.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#3B82F6] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-[#3B82F6]">
                    <span>View Case Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 space-y-3">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                More work is on the way.
              </p>
              <p className="text-xs text-slate-500">
                We are currently engineering additional production systems in this vertical.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA (Surface: Charcoal) */}
      <section className="surface-charcoal py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Have a project in mind?
          </h2>
          <p className="text-sm text-slate-300">
            Tell us what you are trying to build. We will help you scope the technical requirements clearly.
          </p>
          <div className="pt-2 flex items-center justify-center gap-4">
            <Link href="/start-project" className="btn-gold text-xs">
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/schedule" className="btn-secondary text-white border-white/30 text-xs">
              <span>Schedule a Call</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
