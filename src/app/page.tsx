'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  obliqueStore, 
  INITIAL_PORTFOLIO, 
  INITIAL_POSTS 
} from '@/lib/store';
import { 
  ArrowRight, 
  Globe, 
  Cpu, 
  Layout, 
  Compass, 
  Check, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { HeroPerspectiveCanvas } from '@/components/home/HeroPerspectiveCanvas';
import { ProcessInteractiveTimeline } from '@/components/home/ProcessInteractiveTimeline';
import { OriginEvolutionPath } from '@/components/home/OriginEvolutionPath';
import { Hero3DScene } from '@/components/3d/Hero3DScene';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  // Check if intro was already seen in this active session
  const [introComplete, setIntroComplete] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('oblique_intro_seen') === 'true';
    }
    return false;
  });
  const heroTlRef = useRef<gsap.core.Timeline | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Interactive Card Hover Tilt Handlers (Desktop only)
  const handleCard3DTilt = (e: React.MouseEvent<HTMLElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotX = ((y / rect.height) - 0.5) * -6;
    const rotY = ((x / rect.width) - 0.5) * 10;
    gsap.to(card, {
      rotateX: rotX,
      rotateY: rotY,
      z: 16,
      transformPerspective: 800,
      transformOrigin: 'center center',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleCard3DReset = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      z: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  // Section Refs for GSAP ScrollTrigger Mapping
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);
  const whyRef = useRef<HTMLElement>(null);
  const insightsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // 4 Primary services with controlled accent colors & visual variation styles
  const primaryServices = [
    {
      title: 'Web Development',
      slug: 'web-development',
      number: '01',
      description: 'Websites and web applications built for performance, resilience, and business growth.',
      icon: Globe,
      accentColor: '#3B82F6',
      cardClass: 'tile-accent-top border-t-[#3B82F6] hover:border-[#3B82F6]/70',
      accentBadge: 'bg-blue-500/10 text-[#3B82F6] border-blue-500/20',
      tag: 'Architecture & Web'
    },
    {
      title: 'AI & ML',
      slug: 'ai-ml',
      number: '02',
      description: 'Practical AI solutions, workflow automation, RAG pipelines, and intelligent systems.',
      icon: Cpu,
      accentColor: '#7C5CFF',
      cardClass: 'tile-accent-left border-l-[#7C5CFF] hover:border-[#7C5CFF]/70',
      accentBadge: 'bg-purple-500/10 text-[#7C5CFF] border-purple-500/20',
      tag: 'Intelligent Systems'
    },
    {
      title: 'UI/UX Design',
      slug: 'ui-ux-design',
      number: '03',
      description: 'Clear digital experiences designed around human workflows and high conversion.',
      icon: Layout,
      accentColor: '#FF6B5A',
      cardClass: 'tile-accent-bottom border-b-[#FF6B5A] hover:border-[#FF6B5A]/70',
      accentBadge: 'bg-rose-500/10 text-[#FF6B5A] border-rose-500/20',
      tag: 'Human Workflows'
    },
    {
      title: 'IT Consulting',
      slug: 'it-consulting',
      number: '04',
      description: 'Pragmatic technology direction and systems architecture for growing companies.',
      icon: Compass,
      accentColor: '#D4AF5A',
      cardClass: 'tile-accent-corner border-white/10 hover:border-[#D4AF5A]/70',
      accentBadge: 'bg-amber-500/10 text-[#D4AF5A] border-amber-500/20',
      tag: 'Systems Strategy'
    }
  ];

  // 3 completed featured projects for varied visual layouts
  const projects = INITIAL_PORTFOLIO.filter(p => p.status === 'completed').slice(0, 3);
  const proj1 = projects[0];
  const proj2 = projects[1];
  const proj3 = projects[2];

  // 1 featured + 2 smaller insights
  const featuredPost = INITIAL_POSTS[0];
  const secondaryPosts = INITIAL_POSTS.slice(1, 3);

  // =========================================================================
  // GSAP + SCROLLTRIGGER MASTER ANIMATION SYSTEM
  // =========================================================================
  useEffect(() => {
    // If already seen or reduced motion, mark intro complete immediately
    const seen = typeof window !== 'undefined' && sessionStorage.getItem('oblique_intro_seen') === 'true';
    const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (seen || reducedMotion) {
      setIntroComplete(true);
      return;
    }

    // Listen for site-level intro completion
    const onIntroFinished = () => {
      setIntroComplete(true);
    };
    window.addEventListener('oblique-intro-finished', onIntroFinished);
    return () => {
      window.removeEventListener('oblique-intro-finished', onIntroFinished);
    };
  }, []);

  // When opening animation completes or if already seen, trigger the hero entrance sequence
  useEffect(() => {
    if (introComplete) {
      if (heroTlRef.current) {
        heroTlRef.current.play();
      }
      ScrollTrigger.refresh();
    }
  }, [introComplete]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Reduced motion: instantaneous safe reveal
        gsap.set('.hero-anim-item, .home-service-card, .home-project-card, .home-why-card, .home-insight-card, .cta-anim-item, .cta-badge, .cta-heading-line, .cta-paragraph, .cta-buttons', {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1
        });
        return;
      }

      // -----------------------------------------------------------------------
      // 1. HERO OPENING ANIMATION (Phases 1–7)
      // -----------------------------------------------------------------------
      const heroTl = gsap.timeline({ paused: true, delay: 0.1 });
      heroTlRef.current = heroTl;

      // Initial states
      gsap.set('.hero-badge', { opacity: 0, y: 15 });
      gsap.set('.hero-oblique-line', { scaleX: 0, opacity: 0 });
      gsap.set('.hero-heading-inner', { y: '105%', opacity: 0 });
      gsap.set('.hero-text', { opacity: 0, y: 20 });
      gsap.set('.hero-cta', { opacity: 0, y: 15 });
      gsap.set('.hero-visual-card', { opacity: 0, scale: 0.94, y: 30 });

      // Phase 1: Background perspective activates (handled in canvas)
      // Phase 2: ObliqueTech badge / wordmark
      heroTl.to('.hero-badge', {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      });

      // Phase 3: Subtle diagonal visual element moves across
      heroTl.to('.hero-oblique-line', {
        scaleX: 1,
        opacity: 1,
        duration: 0.45,
        ease: 'power3.inOut'
      }, '-=0.15');

      // Phase 4: Main heading "See Business Differently." smooth text mask reveal
      heroTl.to('.hero-heading-inner', {
        y: '0%',
        opacity: 1,
        duration: 0.75,
        ease: 'power3.out'
      }, '-=0.2');

      // Phase 5: Supporting text appears
      heroTl.to('.hero-text', {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: 'power2.out'
      }, '-=0.35');

      // Phase 6: CTA buttons appear
      heroTl.to('.hero-cta', {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out'
      }, '-=0.2');

      // Phase 7: Hero visual card settles into subtle continuous movement
      heroTl.to('.hero-visual-card', {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.65,
        ease: 'power2.out'
      }, '-=0.35');

      // Play immediately if intro has already completed, already seen in session, or reduced motion
      const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isAlreadySeen = typeof window !== 'undefined' && sessionStorage.getItem('oblique_intro_seen') === 'true';
      if (reducedMotion || isAlreadySeen || introComplete) {
        heroTl.play();
      }

      // -----------------------------------------------------------------------
      // HERO SCROLL SCRUB EFFECT (continuous scroll-linked motion)
      // -----------------------------------------------------------------------
      if (heroRef.current) {
        gsap.to('.hero-scroll-layer', {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8
          },
          y: -45,
          opacity: 0.45,
          ease: 'none'
        });

        gsap.to('.hero-visual-card', {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8
          },
          y: -30,
          scale: 0.95,
          ease: 'none'
        });
      }

      // -----------------------------------------------------------------------
      // 2. SERVICES SECTION — REVERSIBLE HORIZONTAL SCROLL WITH 3D DEPTH (LEFT → CENTER / CENTER → LEFT)
      // -----------------------------------------------------------------------
      if (servicesRef.current) {
        const serviceCards = gsap.utils.toArray<HTMLElement>('.home-service-card');
        const xStart = isMobile ? -25 : -70;

        const servicesTl = gsap.timeline({
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });

        servicesTl.fromTo(serviceCards,
          { opacity: 0, x: xStart, scale: 0.94, z: -40, transformPerspective: 1000 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            z: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power2.out'
          }
        );
      }

      // -----------------------------------------------------------------------
      // 3. WHAT WE BUILD — REVERSIBLE 3D POP / DEPTH REVEAL
      // -----------------------------------------------------------------------
      if (portfolioRef.current) {
        const projectCards = gsap.utils.toArray<HTMLElement>('.home-project-card');

        const portfolioTl = gsap.timeline({
          scrollTrigger: {
            trigger: portfolioRef.current,
            start: 'top 78%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });

        portfolioTl.fromTo(projectCards,
          { opacity: 0, scale: 0.90, y: 40, z: -50, transformPerspective: 1000 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            z: 0,
            duration: 0.8,
            stagger: 0.18,
            ease: 'power3.out'
          }
        );
      }

      // -----------------------------------------------------------------------
      // 4. WHY OBLIQUETECH — REVERSIBLE HORIZONTAL SCROLL (RIGHT → CENTER) WITH 3D ROTATION
      // -----------------------------------------------------------------------
      if (whyRef.current) {
        const whyCards = gsap.utils.toArray<HTMLElement>('.home-why-card');
        const xStartRight = isMobile ? 25 : 70;

        const whyTl = gsap.timeline({
          scrollTrigger: {
            trigger: whyRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });

        whyTl.fromTo(whyCards,
          { opacity: 0, x: xStartRight, z: -30, rotateY: 8, transformPerspective: 900 },
          {
            opacity: 1,
            x: 0,
            z: 0,
            rotateY: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out'
          }
        );
      }

      // -----------------------------------------------------------------------
      // 5. INSIGHTS SECTION — REVERSIBLE 3D SOFT POP / DEPTH REVEAL
      // -----------------------------------------------------------------------
      if (insightsRef.current) {
        const insightCards = gsap.utils.toArray<HTMLElement>('.home-insight-card');

        const insightsTl = gsap.timeline({
          scrollTrigger: {
            trigger: insightsRef.current,
            start: 'top 78%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });

        insightsTl.fromTo(insightCards,
          { opacity: 0, scale: 0.92, y: 30, z: -30, transformPerspective: 1000 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            z: 0,
            duration: 0.75,
            stagger: 0.15,
            ease: 'power3.out'
          }
        );
      }

      // -----------------------------------------------------------------------
      // 6. FINAL CTA — STAGGERED TEXT REVEAL & MOTION
      // -----------------------------------------------------------------------
      if (ctaRef.current) {
        const ctaTl = gsap.timeline({
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 78%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });

        // 1. Next Steps badge spring pop
        ctaTl.fromTo('.cta-badge',
          { opacity: 0, scale: 0.8, y: -16 },
          { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: 'back.out(1.8)' }
        );

        // 2. Heading lines upward mask reveal with 3D perspective angle
        ctaTl.fromTo('.cta-heading-line',
          { y: '125%', opacity: 0, rotateX: 18, transformPerspective: 800 },
          { y: '0%', opacity: 1, rotateX: 0, duration: 0.85, stagger: 0.15, ease: 'power3.out' },
          '-=0.25'
        );

        // 3. Supporting paragraph smooth upward drift
        ctaTl.fromTo('.cta-paragraph',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
          '-=0.4'
        );

        // 4. CTA Action Buttons reveal
        ctaTl.fromTo('.cta-buttons',
          { opacity: 0, y: 18, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        );

        // 5. Ambient diagonal background lines
        ctaTl.fromTo('.cta-line-gold',
          { opacity: 0, x: -60 },
          { opacity: 0.25, x: 0, duration: 1.0, ease: 'power2.out' },
          0
        );
        ctaTl.fromTo('.cta-line-blue',
          { opacity: 0, x: 60 },
          { opacity: 0.2, x: 0, duration: 1.0, ease: 'power2.out' },
          0.15
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col overflow-x-hidden">
      {/* =========================================================================
          01 — HERO (Surface: Oblique Black #08090B + Gold #D4AF5A + Blue #3B82F6)
          ========================================================================= */}
      <section 
        ref={heroRef}
        className="surface-black pt-32 pb-20 md:pt-44 md:pb-32 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden"
      >
        {/* Dynamic layered perspective canvas */}
        <HeroPerspectiveCanvas />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Hero Content */}
          <div className="hero-scroll-layer lg:col-span-7 space-y-6">
            {/* Phase 2: ObliqueTech badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs font-mono text-slate-300 backdrop-blur-md shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#D4AF5A] animate-pulse" />
              <span>Different perspective. Better technology.</span>
            </div>

            {/* Phase 3: Thin subtle diagonal oblique line */}
            <div className="hero-oblique-line w-28 h-0.5 bg-gradient-to-r from-[#D4AF5A] via-[#3B82F6] to-transparent origin-left" />

            {/* Phase 4: Dominant Visual Typography with Mask Reveal */}
            <div className="text-mask-wrap py-2 -my-2">
              <h1 className="hero-heading-inner text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.18] pb-2">
                See Business <br className="hidden sm:inline" />
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF5A] via-[#F3E2B4] to-[#3B82F6] pb-2 pr-1">
                  Differently.
                </span>
              </h1>
            </div>

            {/* Phase 5: Supporting text */}
            <p className="hero-text text-base sm:text-xl text-slate-300 max-w-xl leading-relaxed font-normal">
              We build practical digital solutions that help businesses grow, adapt, and compete in a changing market.
            </p>

            {/* Phase 6: Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <div className="hero-cta">
                <Link href="/start-project" className="btn-gold">
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="hero-cta">
                <Link href="/portfolio" className="btn-secondary">
                  <span>View Our Work</span>
                </Link>
              </div>
              <div className="hero-cta">
                <Link
                  href="/schedule"
                  className="text-xs font-semibold text-slate-400 hover:text-white transition-colors underline-offset-4 hover:underline ml-2"
                >
                  Schedule a Call →
                </Link>
              </div>
            </div>
          </div>

          {/* Phase 7: Right Hero Content: 3D Oblique Monogram & Architecture Console */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="hero-visual-card w-full max-w-md rounded-2xl bg-[#0D0F13]/90 border border-white/15 p-6 sm:p-7 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden backdrop-blur-xl group hover:border-[#00D2FF]/40 transition-colors duration-500">
              {/* Minimal technical telemetry bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 z-10 relative">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00D2FF] animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-300">3D Identity Console</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">v2.4</span>
                  <span className="text-xs font-mono font-bold text-[#00D2FF]">ObliqueTech</span>
                </div>
              </div>

              {/* Central 3D Scene Container */}
              <div className="relative w-full h-[270px] sm:h-[300px] flex items-center justify-center my-2">
                <Hero3DScene className="w-full h-full" />
              </div>

              {/* Central Geometric Statement */}
              <div className="space-y-2 py-2 z-10 relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#7C3AED] to-[#EC4899]" />
                    Angle of Departure
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">WebGL • Three.js</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Engineered directly from the authentic Oblique monogram. Interactive desktop cursor parallax and depth-reactive scroll physics.
                </p>
              </div>

              {/* Metric indicators */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/10 z-10 relative">
                <div>
                  <div className="text-base font-bold text-white font-mono">3 Live</div>
                  <div className="text-[10px] text-slate-400">Production Deployments</div>
                </div>
                <div>
                  <div className="text-base font-bold text-[#00D2FF] font-mono">2 Active</div>
                  <div className="text-[10px] text-slate-400">Engineering Bench</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          02 — SERVICES (Surface: Permanent Dark #121316 / #15171B)
          MOTION: ANIMATES FROM LEFT → RIGHT ON SCROLL
          ========================================================================= */}
      <section 
        ref={servicesRef}
        className="surface-warm py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="section-tag-blue">Services</span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Technology that solves real problems.
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                From websites and software to AI and consulting, we build solutions around what your business actually needs.
              </p>
            </div>
            <div>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B82F6] hover:text-blue-400 transition-colors"
              >
                <span>View All Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 4 Primary Services Grid with Varied Visual Design & Left-to-Right Stagger */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {primaryServices.map((svc) => {
              const Icon = svc.icon;
              return (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.slug}`}
                  onMouseMove={handleCard3DTilt}
                  onMouseLeave={handleCard3DReset}
                  className={`home-service-card clean-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between group transition-all duration-300 bg-[#15171B] border border-white/10 ${svc.cardClass}`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon + Number Label */}
                    <div className="flex items-center justify-between">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110" 
                        style={{ backgroundColor: `${svc.accentColor}15`, color: svc.accentColor }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-white transition-colors">
                        {svc.number}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono border ${svc.accentBadge}`}>
                        {svc.tag}
                      </span>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#3B82F6] transition-colors">
                        {svc.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {svc.description}
                    </p>
                  </div>

                  <div className="pt-6 flex items-center text-xs font-semibold text-[#3B82F6] group-hover:translate-x-1.5 transition-transform duration-200">
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          03 — SELECTED WORK (Surface: Permanent Dark #15171B + Emerald #16A878 + Blue #3B82F6)
          MOTION: SOFT POP / DEPTH REVEAL ON SCROLL
          ========================================================================= */}
      <section 
        ref={portfolioRef}
        className="surface-white py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="section-tag-gold">Selected Work</span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                What we’ve built.
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                A look at our production software, telemetry platforms, and healthcare hubs.
              </p>
            </div>
            <div>
              <Link href="/portfolio" className="btn-primary text-xs">
                <span>View Full Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Varied Visual Layout 01: Large Left Image + Right Details */}
          {proj1 && (
            <div 
              onMouseMove={handleCard3DTilt}
              onMouseLeave={handleCard3DReset}
              className="home-project-card p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#121316] shadow-xs hover:shadow-xl transition-all duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Large Left Image (7 cols) */}
                <div className="lg:col-span-7">
                  <Link href={`/portfolio/${proj1.slug}`} className="group block rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-md">
                    <img
                      src={proj1.coverImage}
                      alt={proj1.title}
                      className="w-full h-auto object-cover max-h-[380px] group-hover:scale-103 transition-transform duration-500"
                    />
                  </Link>
                </div>

                {/* Right Details (5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-blue-500/10 text-[#3B82F6] border border-blue-500/20 font-semibold">
                      {proj1.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{proj1.clientIndustry}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                    <Link href={`/portfolio/${proj1.slug}`} className="hover:text-[#3B82F6] transition-colors">
                      {proj1.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {proj1.shortDescription}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {proj1.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span key={tIdx} className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <Link href={`/portfolio/${proj1.slug}`} className="inline-flex items-center gap-2 text-xs font-semibold text-[#3B82F6] hover:text-blue-500">
                      <span>Explore Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Varied Visual Layout 02: Full-Width Showcase Banner with Overlay Metadata */}
          {proj2 && (
            <div 
              onMouseMove={handleCard3DTilt}
              onMouseLeave={handleCard3DReset}
              className="home-project-card relative rounded-3xl overflow-hidden border border-white/10 bg-slate-950 shadow-xl group hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-21/9 sm:aspect-16/7 w-full overflow-hidden">
                <img
                  src={proj2.coverImage}
                  alt={proj2.title}
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                />
              </div>

              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/60 to-transparent flex flex-col justify-end p-6 sm:p-10">
                <div className="max-w-3xl space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold backdrop-blur-md">
                      Featured • {proj2.category}
                    </span>
                    <span className="text-xs font-mono text-slate-300">{proj2.clientIndustry}</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-bold text-white leading-tight">
                    <Link href={`/portfolio/${proj2.slug}`} className="hover:text-[#D4AF5A] transition-colors">
                      {proj2.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-2xl">
                    {proj2.shortDescription}
                  </p>

                  <div className="pt-2 flex items-center gap-4">
                    <Link href={`/portfolio/${proj2.slug}`} className="btn-gold text-xs">
                      <span>View Full Breakdown</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Varied Visual Layout 03: Right Image + Left Details */}
          {proj3 && (
            <div 
              onMouseMove={handleCard3DTilt}
              onMouseLeave={handleCard3DReset}
              className="home-project-card p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#121316] shadow-xs hover:shadow-xl transition-all duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Details (5 cols) */}
                <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-[#16A878] border border-emerald-500/20 font-semibold">
                      {proj3.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{proj3.clientIndustry}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                    <Link href={`/portfolio/${proj3.slug}`} className="hover:text-[#16A878] transition-colors">
                      {proj3.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {proj3.shortDescription}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {proj3.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span key={tIdx} className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <Link href={`/portfolio/${proj3.slug}`} className="inline-flex items-center gap-2 text-xs font-semibold text-[#16A878] hover:text-emerald-500">
                      <span>Explore Healthcare Hub</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right Image (7 cols) */}
                <div className="lg:col-span-7 order-1 lg:order-2">
                  <Link href={`/portfolio/${proj3.slug}`} className="group block rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-md">
                    <img
                      src={proj3.coverImage}
                      alt={proj3.title}
                      className="w-full h-auto object-cover max-h-[380px] group-hover:scale-103 transition-transform duration-500"
                    />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          04 — WHY CHOOSE US (Surface: Charcoal #15171B + Coral #FF6B5A + Gold #D4AF5A)
          MOTION: ANIMATES FROM RIGHT → LEFT ON SCROLL
          ========================================================================= */}
      <section 
        ref={whyRef}
        className="surface-charcoal py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-3 max-w-2xl">
            <span className="section-tag-coral">Why ObliqueTech</span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              A pragmatic partner for serious engineering.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              We eliminate the fluff and focus purely on what works, scales, and creates commercial value.
            </p>
          </div>

          {/* 4 Bold Visual Statements with Oversized Numbers & Right-to-Left Reveal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 01 LISTEN */}
            <div className="home-why-card p-7 rounded-2xl bg-white/5 border border-white/10 border-t-2 border-t-[#FF6B5A] flex flex-col justify-between space-y-6 hover:border-white/20 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-5xl font-extrabold font-mono text-[#FF6B5A]">01</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF6B5A] px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 font-bold">
                    LISTEN
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">We understand before we build.</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We diagnose real business workflows, technical debt, and operational friction before writing any code.
                </p>
              </div>
              <div className="w-8 h-0.5 bg-[#FF6B5A]" />
            </div>

            {/* 02 CLARITY */}
            <div className="home-why-card p-7 rounded-2xl bg-white/5 border border-white/10 border-t-2 border-t-[#3B82F6] flex flex-col justify-between space-y-6 hover:border-white/20 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-5xl font-extrabold font-mono text-[#3B82F6]">02</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#3B82F6] px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 font-bold">
                    CLARITY
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">You always know what comes next.</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Weekly demo builds, clear sprint milestones, transparent contracts, and no technical obfuscation.
                </p>
              </div>
              <div className="w-8 h-0.5 bg-[#3B82F6]" />
            </div>

            {/* 03 QUALITY */}
            <div className="home-why-card p-7 rounded-2xl bg-white/5 border border-white/10 border-t-2 border-t-[#D4AF5A] flex flex-col justify-between space-y-6 hover:border-white/20 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-5xl font-extrabold font-mono text-[#D4AF5A]">03</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF5A] px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 font-bold">
                    QUALITY
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">We build for real-world use.</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Type-safe codebases, high availability infrastructure, automated tests, and maintainable data models.
                </p>
              </div>
              <div className="w-8 h-0.5 bg-[#D4AF5A]" />
            </div>

            {/* 04 COMMITMENT */}
            <div className="home-why-card p-7 rounded-2xl bg-white/5 border border-white/10 border-t-2 border-t-[#16A878] flex flex-col justify-between space-y-6 hover:border-white/20 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-5xl font-extrabold font-mono text-[#16A878]">04</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#16A878] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 font-bold">
                    COMMITMENT
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">We stand behind what we deliver.</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Direct engineering accountability from kickoff through rollout, security patching, and SLA-backed maintenance.
                </p>
              </div>
              <div className="w-8 h-0.5 bg-[#16A878]" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          05 — HOW WE WORK (Surface: Warm Grey #EAE9E4 / Light + Blue + Emerald)
          ========================================================================= */}
      <section className="surface-grey py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-3 max-w-2xl">
            <span className="section-tag-blue">Process</span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              A disciplined path from idea to production.
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Hover through each stage to explore how we execute with speed and precision.
            </p>
          </div>

          <ProcessInteractiveTimeline />
        </div>
      </section>

      {/* =========================================================================
          06 — ABOUT OBLIQUE & SIGNATURE ORIGIN EVOLUTION PATH
          (Surface: Warm White #F7F7F3 + Gold #D4AF5A + Violet #7C5CFF)
          ========================================================================= */}
      <section className="surface-warm py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="section-tag-violet">Our Origin</span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Where Oblique began.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Oblique started after seeing a common challenge among engineering students: companies wanted experience, but students were struggling to find opportunities to gain it.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                We began by connecting developers with seasoned architects through real commercial prototypes, technical mentorship, and high-velocity sprints. That relentless culture of execution evolved into an enterprise technology company building mission-critical software globally.
              </p>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B82F6] hover:text-blue-400 transition-colors"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-8 rounded-3xl bg-[#15171B] border border-white/10 space-y-6 shadow-sm">
                <div className="space-y-2 border-b border-white/10 pb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF5A] font-mono">Mission</h4>
                  <p className="text-sm font-semibold text-white">
                    Build useful technology, solve real problems, and create opportunities that matter.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7C5CFF] font-mono">Vision</h4>
                  <p className="text-sm font-semibold text-white">
                    Become a trusted technology company that builds products with global relevance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SIGNATURE ANIMATED EVOLUTION PATH */}
          <div className="pt-8 border-t border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
                The Evolution Path • 5 Key Milestones
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-[#D4AF5A]" />
                <span>Origin</span>
                <ArrowRight className="w-3 h-3" />
                <span className="w-2 h-2 rounded-full bg-[#FF6B5A]" />
                <span>Future</span>
              </div>
            </div>

            {/* Signature GSAP ScrollTrigger evolution path */}
            <OriginEvolutionPath />
          </div>
        </div>
      </section>

      {/* =========================================================================
          07 — OBLIQUE INSIGHTS (Surface: Pure White #FFFFFF + Violet #7C5CFF + Blue #3B82F6)
          MOTION: SOFT POP / DEPTH REVEAL ON SCROLL
          ========================================================================= */}
      <section 
        ref={insightsRef}
        className="surface-white py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="section-tag-violet">Insights</span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Ideas worth exploring.
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Technology, ideas, and practical thinking from our engineering team.
              </p>
            </div>
            <div>
              <Link
                href="/insights"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B82F6] hover:text-blue-400 transition-colors"
              >
                <span>View All Insights</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Editorial Publication Layout: 1 Featured with Large Cover + 2 Visual Supporting Articles */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Featured Article (7 cols) */}
            {featuredPost && (
              <Link
                href={`/insights/${featuredPost.slug}`}
                className="home-insight-card lg:col-span-7 clean-card rounded-3xl overflow-hidden flex flex-col justify-between group border border-white/10 shadow-xs hover:shadow-lg transition-all"
              >
                <div className="aspect-16/9 w-full overflow-hidden bg-slate-950 relative">
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#08090B]/80 backdrop-blur-md text-[#D4AF5A] border border-white/10">
                      Featured • {featuredPost.category}
                    </span>
                  </div>
                </div>

                <div className="p-7 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-slate-400">
                      {featuredPost.readingTimeMinutes} min read • {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#3B82F6] transition-colors leading-snug">
                      {featuredPost.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#3B82F6]">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            )}

            {/* 2 Smaller Articles with Visual Covers (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {secondaryPosts.map((post) => {
                const categoryColor = post.category.includes('AI')
                  ? 'text-purple-400 bg-purple-500/10 border-purple-500/20'
                  : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';

                return (
                  <Link
                    key={post.id}
                    href={`/insights/${post.slug}`}
                    className="home-insight-card clean-card rounded-2xl overflow-hidden flex-1 flex flex-col sm:flex-row group border border-white/10 shadow-xs hover:shadow-lg transition-all"
                  >
                    <div className="sm:w-44 aspect-video sm:aspect-auto overflow-hidden bg-slate-950 shrink-0 relative">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${categoryColor}`}>
                            {post.category}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {post.readingTimeMinutes}m read
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-white group-hover:text-[#3B82F6] transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                      </div>

                      <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-[#3B82F6]">
                        <span>Read</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          08 — FINAL CALL TO ACTION (Surface: Oblique Black #08090B + Gold + Blue)
          ========================================================================= */}
      <section 
        ref={ctaRef}
        className="surface-black py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-center"
      >
        {/* Subtle diagonal background lines */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1200 400" fill="none">
            <line className="cta-line-gold" x1="0" y1="400" x2="1200" y2="0" stroke="#D4AF5A" strokeWidth="2" />
            <line className="cta-line-blue" x1="200" y1="400" x2="1400" y2="0" stroke="#00D2FF" strokeWidth="1.5" strokeDasharray="6 6" />
          </svg>
        </div>

        <div className="cta-anim-item max-w-3xl mx-auto space-y-8 relative z-10">
          <div>
            <div className="cta-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00D2FF] backdrop-blur-md shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse" />
              <span>Next Steps</span>
            </div>
          </div>

          <div className="space-y-1.5 overflow-hidden py-1">
            <div className="overflow-hidden py-1">
              <h2 className="cta-heading-line text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Let’s look at your challenge
              </h2>
            </div>
            <div className="overflow-hidden py-2">
              <h2 className="cta-heading-line text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight pb-1">
                <span className="bg-gradient-to-r from-[#00D2FF] via-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent inline-block font-extrabold pb-2 pr-1">
                  differently.
                </span>
              </h2>
            </div>
          </div>

          <p className="cta-paragraph text-sm sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Whether you need a new web application, an AI workflow, or strategic systems direction, we’re ready to build.
          </p>

          <div className="cta-buttons pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link href="/start-project" className="btn-gold group">
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/schedule" className="btn-secondary">
              <span>Schedule a 30-Min Call</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
