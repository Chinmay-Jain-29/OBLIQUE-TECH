'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ServiceItem } from '@/types';
import { 
  ArrowRight, 
  Globe, 
  Compass, 
  Cpu, 
  Layout, 
  Smartphone, 
  Code, 
  TrendingUp, 
  Layers,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServicesViewProps {
  services: ServiceItem[];
}

export function ServicesView({ services }: ServicesViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  // Map service colors
  const getServiceColorConfig = (slug: string, index: number) => {
    switch (slug) {
      case 'web-development':
        return { color: '#3B82F6', badge: 'text-blue-500 bg-blue-500/10 border-blue-500/20', num: '01' };
      case 'ai-ml':
        return { color: '#7C5CFF', badge: 'text-purple-500 bg-purple-500/10 border-purple-500/20', num: '02' };
      case 'ui-ux-design':
        return { color: '#FF6B5A', badge: 'text-rose-500 bg-rose-500/10 border-rose-500/20', num: '03' };
      case 'it-consulting':
        return { color: '#D4AF5A', badge: 'text-amber-500 bg-amber-500/10 border-amber-500/20', num: '04' };
      case 'custom-software':
        return { color: '#16A878', badge: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20', num: '05' };
      case 'mobile-apps':
        return { color: '#3B82F6', badge: 'text-blue-500 bg-blue-500/10 border-blue-500/20', num: '06' };
      case 'digital-marketing':
        return { color: '#FF6B5A', badge: 'text-rose-500 bg-rose-500/10 border-rose-500/20', num: '07' };
      default:
        return { color: '#3B82F6', badge: 'text-blue-500 bg-blue-500/10 border-blue-500/20', num: `0${index + 1}` };
    }
  };

  const getIcon = (iconName: string, color: string) => {
    const iconProps = { className: 'w-5 h-5', style: { color } };
    switch (iconName) {
      case 'Globe': return <Globe {...iconProps} />;
      case 'Compass': return <Compass {...iconProps} />;
      case 'Brain':
      case 'Cpu': return <Cpu {...iconProps} />;
      case 'Layout': return <Layout {...iconProps} />;
      case 'Smartphone': return <Smartphone {...iconProps} />;
      case 'Code': return <Code {...iconProps} />;
      case 'TrendingUp': return <TrendingUp {...iconProps} />;
      default: return <Layers {...iconProps} />;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.svc-title-inner, .svc-hero-sub, .svc-card, .svc-accent-line, .svc-number, .svc-icon, .svc-text', {
          opacity: 1,
          y: 0,
          scale: 1,
          scaleX: 1
        });
        return;
      }

      // 1. SERVICES PAGE TITLE MASK REVEAL (Reversible)
      if (heroRef.current) {
        const titleTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });

        titleTl
          .fromTo('.svc-title-inner', 
            { y: '105%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 0.75, ease: 'power3.out' }
          )
          .fromTo('.svc-hero-sub',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
            '-=0.25'
          );
      }

      // 2. LAYERED TILE CONSTRUCTION ANIMATION (Reversible on scroll up)
      if (gridRef.current) {
        const cards = gsap.utils.toArray<HTMLElement>('.svc-card');

        const gridTl = gsap.timeline({
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 78%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });

        cards.forEach((card, i) => {
          const cardOffset = i * 0.12;

          gridTl.fromTo(card, 
            { opacity: 0, y: 35, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' },
            cardOffset
          )
          .fromTo(card.querySelectorAll('.svc-accent-line'),
            { scaleX: 0 },
            { scaleX: 1, duration: 0.35, ease: 'power3.inOut' },
            cardOffset + 0.15
          )
          .fromTo(card.querySelectorAll('.svc-number'),
            { opacity: 0, y: -8 },
            { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
            cardOffset + 0.2
          )
          .fromTo(card.querySelectorAll('.svc-icon-box'),
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.5)' },
            cardOffset + 0.25
          )
          .fromTo(card.querySelectorAll('.svc-text-block'),
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
            cardOffset + 0.3
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col">
      {/* 01 — HERO (Surface: Oblique Black #08090B) */}
      <section 
        ref={heroRef}
        className="surface-black pt-32 pb-20 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#D4AF5A]">
            <span>Capabilities & Disciplines</span>
          </div>

          {/* Mask Title Reveal */}
          <div className="text-mask-wrap">
            <h1 className="svc-title-inner text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Technology that solves real problems.
            </h1>
          </div>

          <p className="svc-hero-sub text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
            From web platforms and custom software to AI workflows and infrastructure advisory, we build solutions tailored to business realities.
          </p>
        </div>
      </section>

      {/* 02 — SERVICES GRID (Surface: Permanent Dark #121316 / #15171B) */}
      <section 
        ref={gridRef}
        className="surface-warm py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, idx) => {
              const cfg = getServiceColorConfig(svc.slug, idx);

              return (
                <div
                  key={svc.id}
                  className="svc-card clean-card relative rounded-2xl overflow-hidden p-7 flex flex-col justify-between group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-[#15171B] border border-white/10"
                >
                  {/* Layer 2: Accent Line (draws horizontally on construction) */}
                  <div 
                    className="svc-accent-line absolute top-0 left-0 right-0 h-1 origin-left transition-all duration-300 group-hover:h-1.5"
                    style={{ backgroundColor: cfg.color }}
                  />

                  <div className="space-y-5">
                    {/* Top Row: Icon + Number */}
                    <div className="flex items-center justify-between pt-1">
                      <div 
                        className="svc-icon-box w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${cfg.color}15` }}
                      >
                        {getIcon(svc.iconName, cfg.color)}
                      </div>

                      <span 
                        className="svc-number text-xs font-mono font-bold tracking-wider px-2 py-0.5 rounded"
                        style={{ color: cfg.color, backgroundColor: `${cfg.color}10` }}
                      >
                        {cfg.num}
                      </span>
                    </div>

                    {/* Content Block */}
                    <div className="svc-text-block space-y-2">
                      <h3 className="text-xl font-bold text-white transition-colors group-hover:text-[#3B82F6]">
                        {svc.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {svc.shortDescription}
                      </p>
                    </div>

                    {/* Capabilities list */}
                    <div className="svc-text-block space-y-2 pt-3 border-t border-white/10">
                      {svc.capabilities.slice(0, 3).map((cap: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                          <span 
                            className="w-1.5 h-1.5 rounded-full shrink-0" 
                            style={{ backgroundColor: cfg.color }}
                          />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="svc-text-block pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                    <Link
                      href={`/services/${svc.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B82F6] hover:text-blue-400 transition-colors group-hover:translate-x-1"
                    >
                      <span>Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/start-project"
                      className="text-[11px] font-medium text-slate-400 hover:text-white transition-colors"
                    >
                      Scope Project →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03 — ENGAGEMENT STANDARDS (Surface: Charcoal #15171B) */}
      <section className="surface-charcoal py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="section-tag-gold">Standards</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              How we deliver every engagement.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Clear accountability from kickoff through architecture, sprint execution, and deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-[#3B82F6] flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h4 className="text-base font-bold text-white">Fixed-Scope or Agile Sprints</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose between clear, milestone-capped project pricing or flexible 2-week continuous development sprints.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-[#7C5CFF] flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h4 className="text-base font-bold text-white">Direct Lead Access</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                No intermediate account managers or communication silos. You talk directly with the engineers building your product.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-[#16A878] flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <h4 className="text-base font-bold text-white">Complete IP & Code Ownership</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                All source code, Docker configs, documentation, and database schemas belong 100% to your organization from day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — CTA (Surface: Oblique Black + Gold) */}
      <section className="surface-black py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Not sure what your project needs?
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Book a focused 30-minute consultation with an engineering lead to define your technical approach.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link href="/schedule" className="btn-gold text-xs">
              <span>Schedule a Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/start-project" className="btn-secondary text-white border-white/30 text-xs">
              <span>Start a Project</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
