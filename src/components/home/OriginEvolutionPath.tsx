'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface EvolutionStage {
  number: string;
  stageName: string;
  subtitle: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
}

const STAGES: EvolutionStage[] = [
  {
    number: '01',
    stageName: 'The Beginning',
    subtitle: 'Student experience gap',
    description: 'Companies sought experience; motivated developers struggled to find avenues to gain it.',
    color: '#D4AF5A',
    bgColor: 'rgba(212, 175, 90, 0.08)',
    borderColor: 'rgba(212, 175, 90, 0.3)',
    glowColor: 'rgba(212, 175, 90, 0.4)'
  },
  {
    number: '02',
    stageName: 'The Perspective',
    subtitle: 'A different way to learn',
    description: 'Replacing rote coursework with rigorous, production-grade systems architecture.',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.08)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    glowColor: 'rgba(59, 130, 246, 0.4)'
  },
  {
    number: '03',
    stageName: 'Oblique',
    subtitle: 'Real projects & mentorship',
    description: 'Pairing emerging engineering talent with veteran leads on live client prototypes.',
    color: '#7C5CFF',
    bgColor: 'rgba(124, 92, 255, 0.08)',
    borderColor: 'rgba(124, 92, 255, 0.3)',
    glowColor: 'rgba(124, 92, 255, 0.4)'
  },
  {
    number: '04',
    stageName: 'Expansion',
    subtitle: 'Solutions for businesses',
    description: 'Evolving into an engineering consultancy delivering resilient web, cloud, and AI platforms.',
    color: '#16A878',
    bgColor: 'rgba(22, 168, 120, 0.08)',
    borderColor: 'rgba(22, 168, 120, 0.3)',
    glowColor: 'rgba(22, 168, 120, 0.4)'
  },
  {
    number: '05',
    stageName: 'The Future',
    subtitle: 'Products & global scale',
    description: 'Engineering proprietary software suites, data platforms, and tech solutions worldwide.',
    color: '#FF6B5A',
    bgColor: 'rgba(255, 107, 90, 0.08)',
    borderColor: 'rgba(255, 107, 90, 0.3)',
    glowColor: 'rgba(255, 107, 90, 0.4)'
  }
];

export function OriginEvolutionPath() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const stagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const cards = stagesRef.current.filter(Boolean);

      if (prefersReducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
        if (pathRef.current) {
          gsap.set(pathRef.current, { strokeDashoffset: 0 });
        }
        return;
      }

      // 1. Initial State: cards start slightly lower with zero opacity
      gsap.set(cards, { opacity: 0, y: 35, scale: 0.94 });

      // 2. Setup path length
      let pathLength = 1000;
      if (pathRef.current) {
        try {
          pathLength = pathRef.current.getTotalLength() || 1000;
        } catch {
          pathLength = 1000;
        }
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength
        });
      }

      // 3. Scrub-linked timeline: scrolls down = draws path + activates stages; scrolls up = retracts
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 82%',
          end: 'bottom 55%',
          scrub: 0.8,
        }
      });

      if (pathRef.current) {
        scrubTl.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'none'
        }, 0);
      }

      // Activate each card as the path reaches it
      cards.forEach((card, i) => {
        const triggerPoint = (i / Math.max(cards.length - 1, 1)) * 1.5;
        scrubTl.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: 'power2.out'
        }, triggerPoint);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full py-6">
      {/* Visual background connector line for desktop */}
      <div className="hidden lg:block absolute top-[4.2rem] left-8 right-8 h-1 pointer-events-none z-0">
        <svg className="w-full h-12 overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="originPathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4AF5A" />
              <stop offset="25%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#7C5CFF" />
              <stop offset="75%" stopColor="#16A878" />
              <stop offset="100%" stopColor="#FF6B5A" />
            </linearGradient>
          </defs>
          <path
            ref={pathRef}
            d="M 20 6 Q 250 6, 500 6 T 1000 6"
            stroke="url(#originPathGrad)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* 5 Stages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative z-10">
        {STAGES.map((stage, idx) => (
          <div
            key={stage.number}
            ref={(el) => { stagesRef.current[idx] = el; }}
            className="group relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xs hover:shadow-lg bg-[#15171B] border border-white/10"
            style={{
              borderTopWidth: '3px',
              borderTopColor: stage.color
            }}
          >
            {/* Top Row: Number & Status Dot */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <span
                className="text-3xl font-extrabold font-mono tracking-tight transition-transform duration-300 group-hover:scale-105"
                style={{ color: stage.color }}
              >
                {stage.number}
              </span>
              <div
                className="w-3 h-3 rounded-full flex items-center justify-center"
                style={{ backgroundColor: stage.color }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#08090B]" />
              </div>
            </div>

            {/* Middle: Stage Identity */}
            <div className="space-y-2 py-4 flex-1">
              <span
                className="text-[10px] font-mono uppercase tracking-wider font-semibold block"
                style={{ color: stage.color }}
              >
                {stage.stageName}
              </span>
              <h4 className="text-base font-bold text-white leading-snug">
                {stage.subtitle}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                {stage.description}
              </p>
            </div>

            {/* Bottom Accent Indicator */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400">
                MILESTONE
              </span>
              <div
                className="h-1 w-6 rounded-full transition-all duration-300 group-hover:w-10"
                style={{ backgroundColor: stage.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
