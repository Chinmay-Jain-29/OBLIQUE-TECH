'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ImpactItem {
  title: string;
  desc: string;
  metric?: string;
  tag: string;
  accent: 'emerald' | 'blue' | 'gold' | 'purple';
}

interface Props {
  highlights: string[];
  projectCategory: string;
}

export function PortfolioImpactVisual({ highlights, projectCategory }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = containerRef.current.querySelectorAll('.impact-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
      }
    );
  }, []);

  return (
    <div ref={containerRef} className="space-y-12">
      {/* Transformation comparison strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl border border-white/10 bg-white/5">
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Previous State
          </span>
          <h4 className="text-sm font-bold text-slate-200">Manual & Fragmented</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Operations depended on uncoordinated spreadsheets, manual phone inquiries, and delayed reconciliation.
          </p>
        </div>

        <div className="hidden md:flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-[#0B0B0D] text-[#3B82F6] shadow-sm">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#20A779] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#20A779]" />
            Engineered Outcome
          </span>
          <h4 className="text-sm font-bold text-slate-200">Unified & Automated</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Centralized data ledger, sub-second query latency, automated validation pipelines, and instant stakeholder visibility.
          </p>
        </div>
      </div>

      {/* Verified Qualitative & Numerical Impact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {highlights.map((item, idx) => {
          // Determine subtle color accent
          const accents = ['border-l-emerald-500', 'border-l-blue-500', 'border-l-amber-500', 'border-l-purple-500'];
          const accentClass = accents[idx % accents.length];

          return (
            <div
              key={idx}
              className={`impact-card p-5 rounded-xl border border-white/10 ${accentClass} border-l-4 bg-[#121317] shadow-xs flex flex-col justify-between space-y-3 hover:border-white/20 transition-all`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  Metric 0{idx + 1}
                </span>
                <CheckCircle2 className="w-4 h-4 text-[#20A779]" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white leading-snug">
                {item}
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3 h-3 text-[#3B82F6]" />
                <span>Verified in production</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
