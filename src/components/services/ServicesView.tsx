'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ServiceItem } from '@/types';
import { 
  ArrowRight, 
  AppWindow, 
  Waypoints, 
  BrainCircuit, 
  Shapes, 
  TabletSmartphone, 
  Blocks, 
  SearchCode, 
  Layers,
  Sparkles,
  ShieldCheck,
  LucideIcon
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServicesViewProps {
  services: ServiceItem[];
}

interface ServiceColorTheme {
  color: string;
  num: string;
  tag: string;
  glowRgba: string;
  IconComponent: LucideIcon;
}

export function ServicesView({ services }: ServicesViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  // Distinct Multi-Color Configuration and Specialized Modern Icons for Each Tile
  const getServiceColorConfig = (slug: string, index: number): ServiceColorTheme => {
    switch (slug) {
      case 'web-development':
        return { 
          color: '#3B82F6', // Electric Sapphire Blue
          num: '01',
          tag: 'Web & Architecture',
          glowRgba: 'rgba(59, 130, 246, 0.18)',
          IconComponent: AppWindow
        };
      case 'it-consulting':
        return { 
          color: '#D4AF5A', // Warm Amber Gold
          num: '02',
          tag: 'Systems Strategy',
          glowRgba: 'rgba(212, 175, 90, 0.18)',
          IconComponent: Waypoints
        };
      case 'ai-ml':
        return { 
          color: '#8B5CF6', // Cosmic Violet
          num: '03',
          tag: 'Intelligent Systems',
          glowRgba: 'rgba(139, 92, 246, 0.22)',
          IconComponent: BrainCircuit
        };
      case 'ui-ux-design':
        return { 
          color: '#FF6B5A', // Sunset Coral
          num: '04',
          tag: 'Human Experience',
          glowRgba: 'rgba(255, 107, 90, 0.2)',
          IconComponent: Shapes
        };
      case 'mobile-apps':
      case 'mobile-app-development':
        return { 
          color: '#06B6D4', // Vibrant Cyan
          num: '05',
          tag: 'Mobile Platforms',
          glowRgba: 'rgba(6, 182, 212, 0.18)',
          IconComponent: TabletSmartphone
        };
      case 'custom-software':
      case 'software-development':
        return { 
          color: '#10B981', // Bright Emerald Green
          num: '06',
          tag: 'Bespoke Software',
          glowRgba: 'rgba(16, 185, 129, 0.18)',
          IconComponent: Blocks
        };
      case 'digital-marketing':
        return { 
          color: '#F97316', // Solar Orange
          num: '07',
          tag: 'Growth & SEO',
          glowRgba: 'rgba(249, 115, 22, 0.18)',
          IconComponent: SearchCode
        };
      default:
        return { 
          color: '#3B82F6', 
          num: `0${index + 1}`,
          tag: 'Engineering',
          glowRgba: 'rgba(59, 130, 246, 0.18)',
          IconComponent: Layers
        };
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.svc-title-inner, .svc-hero-sub, .svc-card, .svc-accent-line, .svc-number, .svc-icon-box, .svc-text-anim, .standard-card', {
          opacity: 1,
          y: 0,
          scale: 1,
          scaleX: 1,
          rotate: 0
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

      // 2. SCROLL POPPING ANIMATION FOR EACH INDIVIDUAL SERVICE TILE
      const cards = gsap.utils.toArray<HTMLElement>('.svc-card');
      cards.forEach((card) => {
        const icon = card.querySelector('.svc-icon-box');
        const line = card.querySelector('.svc-accent-line');
        const num = card.querySelector('.svc-number');
        const texts = card.querySelectorAll('.svc-text-anim');

        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          }
        });

        cardTl
          // Elastic spring pop of the card itself
          .fromTo(card, 
            { opacity: 0, scale: 0.85, y: 40 },
            { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: 'back.out(1.5)' }
          )
          // Accent line draws smoothly across the top
          .fromTo(line,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.4, ease: 'power2.out' },
            '-=0.45'
          )
          // Modern icon box pops with a dynamic rotational spring
          .fromTo(icon,
            { opacity: 0, scale: 0.4, rotate: -14 },
            { opacity: 1, scale: 1, rotate: 0, duration: 0.45, ease: 'back.out(2)' },
            '-=0.35'
          )
          // Number badge pops in
          .fromTo(num,
            { opacity: 0, scale: 0.6 },
            { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.8)' },
            '-=0.3'
          )
          // Content texts slide in
          .fromTo(texts,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' },
            '-=0.25'
          );
      });

      // 3. STANDARDS SECTION POPPING ANIMATION
      const standardCards = gsap.utils.toArray<HTMLElement>('.standard-card');
      standardCards.forEach((sc) => {
        gsap.fromTo(sc,
          { opacity: 0, scale: 0.88, y: 35 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.55,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: sc,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

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

      {/* 02 — SERVICES GRID (Surface: Permanent Dark with Multi-Color Tiles) */}
      <section 
        ref={gridRef}
        className="surface-warm py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, idx) => {
              const cfg = getServiceColorConfig(svc.slug, idx);
              const IconComp = cfg.IconComponent;

              return (
                <div
                  key={svc.id}
                  className="svc-card clean-card relative rounded-2xl overflow-hidden p-7 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5"
                  style={{ 
                    background: `linear-gradient(155deg, ${cfg.color}15 0%, #15171B 45%, #111215 100%)`,
                    border: `1px solid ${cfg.color}35`,
                    boxShadow: `0 8px 30px rgba(0, 0, 0, 0.4)`
                  }}
                >
                  {/* Subtle Inner Ambient Glow for each color theme */}
                  <div 
                    className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-25 group-hover:opacity-45 transition-opacity duration-500"
                    style={{ backgroundColor: cfg.color }}
                  />

                  {/* Accent Top Line (sweeps across on scroll pop) */}
                  <div 
                    className="svc-accent-line absolute top-0 left-0 right-0 h-1 origin-left transition-all duration-300 group-hover:h-1.5"
                    style={{ backgroundColor: cfg.color }}
                  />

                  <div className="space-y-5 relative z-10">
                    {/* Top Row: Specialized Icon + Number Badge */}
                    <div className="flex items-center justify-between pt-1">
                      <div 
                        className="svc-icon-box w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm"
                        style={{ 
                          backgroundColor: `${cfg.color}18`,
                          border: `1px solid ${cfg.color}40`
                        }}
                      >
                        <IconComp className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" style={{ color: cfg.color }} />
                      </div>

                      <div className="flex items-center gap-2">
                        <span 
                          className="svc-number text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md border"
                          style={{ 
                            color: cfg.color, 
                            backgroundColor: `${cfg.color}12`,
                            borderColor: `${cfg.color}35`
                          }}
                        >
                          {cfg.num}
                        </span>
                      </div>
                    </div>

                    {/* Content Block */}
                    <div className="svc-text-anim space-y-2">
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded border"
                          style={{ 
                            color: cfg.color, 
                            borderColor: `${cfg.color}25`,
                            backgroundColor: `${cfg.color}08`
                          }}
                        >
                          {cfg.tag}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white transition-colors duration-200">
                        {svc.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {svc.shortDescription}
                      </p>
                    </div>

                    {/* Capabilities list */}
                    <div className="svc-text-anim space-y-2 pt-3 border-t border-white/10">
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
                  <div className="svc-text-anim pt-6 mt-6 border-t border-white/10 flex items-center justify-between relative z-10">
                    <Link
                      href={`/services/${svc.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group-hover:translate-x-1"
                      style={{ color: cfg.color }}
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
            <div className="standard-card p-6 rounded-2xl bg-white/5 border border-blue-500/25 space-y-3 transition-transform duration-300 hover:-translate-y-1">
              <div className="w-9 h-9 rounded-lg bg-blue-500/15 text-[#3B82F6] border border-blue-500/30 flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h4 className="text-base font-bold text-white">Fixed-Scope or Agile Sprints</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose between clear, milestone-capped project pricing or flexible 2-week continuous development sprints.
              </p>
            </div>

            <div className="standard-card p-6 rounded-2xl bg-white/5 border border-purple-500/25 space-y-3 transition-transform duration-300 hover:-translate-y-1">
              <div className="w-9 h-9 rounded-lg bg-purple-500/15 text-[#8B5CF6] border border-purple-500/30 flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h4 className="text-base font-bold text-white">Direct Lead Access</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                No intermediate account managers or communication silos. You talk directly with the engineers building your product.
              </p>
            </div>

            <div className="standard-card p-6 rounded-2xl bg-white/5 border border-emerald-500/25 space-y-3 transition-transform duration-300 hover:-translate-y-1">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-[#10B981] border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-sm">
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
