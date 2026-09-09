'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2, Compass, ShieldCheck, Sparkles, Target, Zap } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PRINCIPLES = [
  {
    num: '01',
    name: 'Customer First',
    shortCopy: 'We understand the commercial problem before writing a single line of code.',
    detail: 'No speculative engineering. Every feature must tie directly to operational ROI or client workflow acceleration.',
    color: '#D4AF5A',
    badge: 'bg-amber-500/10 text-[#D4AF5A] border-amber-500/20'
  },
  {
    num: '02',
    name: 'Innovation',
    shortCopy: 'Pragmatic creativity that moves systems forward, not decorative tech trends.',
    detail: 'We adopt bleeding-edge tools (AI inference, edge deployment, vector embeddings) only when they deliver measurable speed.',
    color: '#7C5CFF',
    badge: 'bg-purple-500/10 text-[#7C5CFF] border-purple-500/20'
  },
  {
    num: '03',
    name: 'Transparency',
    shortCopy: 'Clear milestones, weekly demo builds, and zero technical obfuscation.',
    detail: 'You see our sprint boards, code commits, and system metrics in real time. No surprise scope changes or delayed handoffs.',
    color: '#3B82F6',
    badge: 'bg-blue-500/10 text-[#3B82F6] border-blue-500/20'
  },
  {
    num: '04',
    name: 'Quality',
    shortCopy: 'Codebases engineered for maintainability, resilience, and strict type safety.',
    detail: 'We build systems designed to run stably for years without requiring ongoing emergency refactors.',
    color: '#16A878',
    badge: 'bg-emerald-500/10 text-[#16A878] border-emerald-500/20'
  },
  {
    num: '05',
    name: 'Teamwork',
    shortCopy: 'True collaborative partnership integrated directly with your internal teams.',
    detail: 'We upskill your developers, document architectural decisions, and ensure a smooth operational transfer.',
    color: '#FF6B5A',
    badge: 'bg-rose-500/10 text-[#FF6B5A] border-rose-500/20'
  },
  {
    num: '06',
    name: 'Growth',
    shortCopy: 'Continuous velocity and engineering evolution for both client and team.',
    detail: 'Software should unlock new revenue streams and operational capacity, not become an ongoing maintenance burden.',
    color: '#16A878',
    badge: 'bg-emerald-500/10 text-[#16A878] border-emerald-500/20'
  },
  {
    num: '07',
    name: 'Ethics',
    shortCopy: 'Uncompromising integrity, data privacy, and security in every delivery.',
    detail: 'We adhere to enterprise security protocols, clean licensing, and responsible AI guardrails across all environments.',
    color: '#D4AF5A',
    badge: 'bg-amber-500/10 text-[#D4AF5A] border-amber-500/20'
  }
];

export function AboutView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const originRef = useRef<HTMLElement>(null);
  const visionRef = useRef<HTMLElement>(null);
  const principlesRef = useRef<HTMLElement>(null);
  const futureRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.about-anim-item, .principle-card, .future-anim', { opacity: 1, x: 0, y: 0 });
        return;
      }

      // 1. HERO TITLE MASK REVEAL (Reversible)
      if (heroRef.current) {
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });

        heroTl
          .fromTo('.about-hero-title',
            { y: '105%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 0.75, ease: 'power3.out' }
          )
          .fromTo('.about-hero-text',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
            '-=0.25'
          );
      }

      // 2. ORIGIN SECTION SEQUENTIAL ENTRANCE (Reversible on scroll up)
      if (originRef.current) {
        const originTl = gsap.timeline({
          scrollTrigger: {
            trigger: originRef.current,
            start: 'top 78%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });

        originTl
          .fromTo('.origin-left-content',
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
            0
          )
          .fromTo('.origin-visual',
            { opacity: 0, x: isMobile ? 25 : 60, scale: 0.95 },
            { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
            0.1
          );
      }

      // 3. VISION & AMBITIONS SECTION (Reversible on scroll up)
      if (visionRef.current) {
        const visionTl = gsap.timeline({
          scrollTrigger: {
            trigger: visionRef.current,
            start: 'top 78%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });

        visionTl.fromTo(visionRef.current.querySelectorAll('.vision-anim'),
          { opacity: 0, y: 30, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out' }
        );
      }

      // 4. PRINCIPLES — ALTERNATING LEFT / RIGHT MOTION (Reversible on scroll up)
      if (principlesRef.current) {
        const principleCards = gsap.utils.toArray<HTMLElement>('.principle-card');

        principleCards.forEach((card, idx) => {
          // Even index -> from left, Odd index -> from right
          const fromX = isMobile ? (idx % 2 === 0 ? -25 : 25) : (idx % 2 === 0 ? -60 : 60);

          const cardTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse'
            }
          });

          cardTl.fromTo(card,
            { opacity: 0, x: fromX },
            { opacity: 1, x: 0, duration: 0.65, ease: 'power2.out' }
          );
        });
      }

      // 5. FUTURE / CTA SECTION (Reversible on scroll up)
      if (futureRef.current) {
        const futureTl = gsap.timeline({
          scrollTrigger: {
            trigger: futureRef.current,
            start: 'top 82%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });

        futureTl.fromTo(futureRef.current.querySelectorAll('.future-anim'),
          { opacity: 0, y: 30, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out' }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col overflow-x-hidden">
      {/* 01 — HERO (Surface: Oblique Black #08090B + Gold #D4AF5A) */}
      <section 
        ref={heroRef}
        className="surface-black pt-32 pb-20 md:pt-44 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#D4AF5A]">
            <span>Who We Are & Origin</span>
          </div>

          <div className="text-mask-wrap">
            <h1 className="about-hero-title text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              See Business <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF5A] via-[#F3E2B4] to-[#3B82F6]">
                Differently.
              </span>
            </h1>
          </div>

          <p className="about-hero-text text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal">
            ObliqueTech is a technology engineering company focused on building practical digital solutions for businesses and creating meaningful opportunities through execution.
          </p>

          <div className="about-hero-text pt-2 flex flex-wrap items-center gap-4">
            <Link href="/portfolio" className="btn-gold">
              <span>Explore Our Work</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-secondary">
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 02 — WHERE OBLIQUE BEGAN (Surface: Warm White #F7F7F3) */}
      <section 
        ref={originRef}
        className="surface-warm py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="origin-left-content lg:col-span-6 space-y-6">
              <div className="origin-num">
                <span className="text-6xl sm:text-8xl font-black font-mono text-white/10 block select-none">
                  01
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-[#3B82F6] font-bold block -mt-4">
                  OUR ORIGIN
                </span>
              </div>

              <h2 className="origin-title text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                Where Oblique began.
              </h2>

              <div className="origin-text space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                <p>
                  Oblique started after diagnosing an undeniable disconnect across technology education: <strong className="text-white">companies wanted real-world production experience, but students were struggling to find opportunities to build anything meaningful.</strong>
                </p>
                <p>
                  Rather than accepting this divide, Oblique was founded as an engineering crucible designed around authentic delivery: pairing ambitious developers with seasoned architects to build live commercial prototypes and production software.
                </p>
                <p className="text-xs text-slate-400">
                  That foundational bias toward execution over credentials became our DNA. Today, ObliqueTech builds enterprise-grade software, AI systems, and cloud platforms for global businesses.
                </p>
              </div>

              <div className="origin-text pt-2 flex flex-wrap gap-3">
                {['Live Commercial Prototypes', 'Architect Mentorship', 'Production CI/CD', 'Complete IP Delivery'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#15171B] border border-white/10 text-xs font-medium text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF5A]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Schematic */}
            <div className="origin-visual lg:col-span-6 flex items-center justify-center">
              <div className="w-full max-w-lg aspect-4/3 rounded-3xl bg-[#08090B] border border-white/15 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <svg width="100%" height="100%" viewBox="0 0 500 350" fill="none">
                    <line x1="0" y1="350" x2="500" y2="0" stroke="#D4AF5A" strokeWidth="2" />
                    <line x1="50" y1="350" x2="550" y2="0" stroke="#3B82F6" strokeWidth="1" strokeDasharray="6 6" />
                    <circle cx="250" cy="175" r="80" stroke="#7C5CFF" strokeWidth="1" strokeDasharray="4 4" />
                  </svg>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
                  <span className="text-xs font-mono text-[#D4AF5A] uppercase tracking-wider">LABORATORY BLUEPRINT</span>
                  <span className="text-xs font-mono text-slate-400">FOUNDED 2024</span>
                </div>

                <div className="space-y-3 relative z-10 py-4">
                  <div className="text-xs font-mono text-[#3B82F6] uppercase">Core Paradigm</div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Action Over Theory.
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    We eliminate the bureaucratic lag of traditional consultancies. Every team member codes, tests, and deploys.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 relative z-10 text-xs font-mono">
                  <div>
                    <div className="text-[#16A878] font-bold">100% PRODUCTION</div>
                    <div className="text-slate-400 text-[10px]">Real Workflows</div>
                  </div>
                  <div>
                    <div className="text-[#3B82F6] font-bold">GLOBAL REACH</div>
                    <div className="text-slate-400 text-[10px]">Distributed Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — VISION & AMBITION: BUILT FOR WHAT'S NEXT (Surface: Charcoal #15171B) */}
      <section 
        ref={visionRef}
        className="surface-charcoal py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="space-y-4 max-w-3xl">
            <span className="vision-anim section-tag-gold block">Vision & Ambition</span>
            <h2 className="vision-anim text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Built for what’s next.
            </h2>
            <p className="vision-anim text-base sm:text-xl text-slate-300 leading-relaxed">
              We are moving beyond pure client services to build software platforms, automation tools, and technology infrastructure that solves fundamental business problems at scale.
            </p>
          </div>

          {/* Staged Evolution Trajectory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { phase: '01', title: 'Applied Solutions', desc: 'Bespoke high-performance client web applications & systems engineering.', color: '#3B82F6' },
              { phase: '02', title: 'Internal Tooling', desc: 'Proprietary developer velocity kits, automated CI templates, and deployment scripts.', color: '#7C5CFF' },
              { phase: '03', title: 'Vertical Platforms', desc: 'Purpose-built SaaS engines for health telemetry, cloud logistics, and predictive analytics.', color: '#16A878' },
              { phase: '04', title: 'Global Impact', desc: 'Enterprise technology suites supporting organizations worldwide with resilient infrastructure.', color: '#D4AF5A' }
            ].map((item, i) => (
              <div 
                key={i}
                className="vision-anim p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-white/20 transition-colors"
                style={{ borderTopWidth: '3px', borderTopColor: item.color }}
              >
                <span className="text-xs font-mono font-bold" style={{ color: item.color }}>
                  STAGE {item.phase}
                </span>
                <h4 className="text-lg font-bold text-white tracking-tight">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — PRINCIPLES (Surface: Warm White #F7F7F3) — ALTERNATING ENTRANCE */}
      <section 
        ref={principlesRef}
        className="surface-warm py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10"
      >
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="space-y-3">
            <span className="section-tag-blue">Core Standards</span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              The principles we build by.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
              We hold ourselves to rigorous engineering and partnership standards. No exceptions.
            </p>
          </div>

          {/* Prominent Large Typography Principle Cards with Alternating Reveal */}
          <div className="space-y-6">
            {PRINCIPLES.map((p) => (
              <div
                key={p.num}
                className="principle-card clean-card p-6 sm:p-8 rounded-3xl transition-all duration-300 hover:shadow-xl group"
                style={{
                  borderLeftWidth: '4px',
                  borderLeftColor: p.color
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Big Number (2 cols) */}
                  <div className="md:col-span-2">
                    <span 
                       className="text-4xl sm:text-6xl font-black font-mono tracking-tight"
                      style={{ color: p.color }}
                    >
                      {p.num}
                    </span>
                  </div>

                  {/* Title & Short Statement (6 cols) */}
                  <div className="md:col-span-6 space-y-1.5">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-mono border font-semibold ${p.badge}`}>
                      Principle {p.num}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#3B82F6] transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-sm font-medium text-slate-300">
                      {p.shortCopy}
                    </p>
                  </div>

                  {/* Detail explanation (4 cols) */}
                  <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {p.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 text-center">
            <Link href="/schedule" className="btn-primary">
              <span>Schedule a Consultation with Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 05 — CTA / FUTURE (Surface: Oblique Black #08090B) */}
      <section ref={futureRef} className="surface-black py-24 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="future-anim text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Ready to partner with an engineering team that delivers?
          </h2>
          <p className="future-anim text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Tell us about your technical challenge and let’s construct the right digital product.
          </p>
          <div className="future-anim pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link href="/start-project" className="btn-gold">
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-secondary">
              <span>Contact Our Team</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
