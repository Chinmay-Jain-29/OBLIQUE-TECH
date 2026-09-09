'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { obliqueStore, INITIAL_PORTFOLIO } from '@/lib/store';
import { PortfolioProject } from '@/types';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORIES = ['All', 'Web', 'Mobile', 'AI', 'Software', 'UI/UX'];

export default function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>(INITIAL_PORTFOLIO);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setProjects(obliqueStore.getPortfolio());
  }, []);

  const filtered = projects.filter((p) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'AI') return p.category.includes('AI');
    return p.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  // Reversible GSAP ScrollTrigger Animations
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.portfolio-title-inner, .portfolio-hero-sub, .portfolio-card', {
          opacity: 1,
          y: 0,
          scale: 1
        });
        return;
      }

      // 1. Title mask reveal (reversible on scroll up)
      if (heroRef.current) {
        const titleTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });

        titleTl
          .fromTo('.portfolio-title-inner',
            { y: '105%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 0.75, ease: 'power3.out' }
          )
          .fromTo('.portfolio-hero-sub',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
            '-=0.25'
          );
      }

      // 2. Project Cards reveal (reversible on scroll up)
      if (gridRef.current) {
        const cards = gsap.utils.toArray<HTMLElement>('.portfolio-card');

        const gridTl = gsap.timeline({
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 78%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });

        gridTl.fromTo(cards,
          { opacity: 0, y: 35, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.12,
            ease: 'power2.out'
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [filtered.length]);

  return (
    <div ref={containerRef} className="flex flex-col">
      {/* Header (Surface: Oblique Black) */}
      <section 
        ref={heroRef}
        className="surface-black pt-32 pb-20 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="text-xs font-mono uppercase tracking-wider text-[#C7A45D]">Selected Work</span>
          
          <div className="text-mask-wrap">
            <h1 className="portfolio-title-inner text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              A look at what we’ve built.
            </h1>
          </div>

          <p className="portfolio-hero-sub text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
            Authentic software interfaces and distributed systems. 3 completed production deployments and 2 active initiatives.
          </p>
        </div>
      </section>

      {/* Filter & Projects Grid (Surface: Pure White) */}
      <section className="surface-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Simple Filters */}
          <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-[#0B0B0D]'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Visual-First Projects Grid */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className="portfolio-card clean-card rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-[#15171B] border border-white/10"
              >
                {/* Visual Cover Screenshot */}
                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden border-b border-white/10">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
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
                    <h3 className="text-base font-bold text-white group-hover:text-[#3B82F6] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#3B82F6]">
                    <span>View Case Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 space-y-3">
              <p className="text-sm font-semibold text-slate-300">
                More work is on the way.
              </p>
              <p className="text-xs text-slate-400">
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
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
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
