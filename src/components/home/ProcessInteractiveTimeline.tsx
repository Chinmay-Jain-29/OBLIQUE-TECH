'use client';

import React, { useState } from 'react';
import { Search, Compass, Code2, CheckCircle2, Rocket, ArrowRight } from 'lucide-react';

const PROCESS_STEPS = [
  {
    number: '01',
    name: 'Discover',
    tagline: 'Understand the core friction',
    desc: 'We analyze your workflows, data silos, and technical bottlenecks before proposing architecture.',
    icon: Search,
    accent: '#3B82F6',
    border: 'border-[#3B82F6]',
    text: 'text-[#3B82F6]',
    bg: 'bg-blue-500/10'
  },
  {
    number: '02',
    name: 'Plan',
    tagline: 'Architect the simplest reliable system',
    desc: 'System blueprint, schema design, security perimeter, and API contracts mapped with precision.',
    icon: Compass,
    accent: '#D4AF5A',
    border: 'border-[#D4AF5A]',
    text: 'text-[#D4AF5A]',
    bg: 'bg-amber-500/10'
  },
  {
    number: '03',
    name: 'Build',
    tagline: 'High-velocity type-safe engineering',
    desc: 'Sprint-based agile development with weekly preview deployments and transparent sprint reviews.',
    icon: Code2,
    accent: '#7C5CFF',
    border: 'border-[#7C5CFF]',
    text: 'text-[#7C5CFF]',
    bg: 'bg-purple-500/10'
  },
  {
    number: '04',
    name: 'Test',
    tagline: 'Rigorous QA and security audits',
    desc: 'Unit, integration, performance load, and cross-device testing to guarantee zero production regressions.',
    icon: CheckCircle2,
    accent: '#16A878',
    border: 'border-[#16A878]',
    text: 'text-[#16A878]',
    bg: 'bg-emerald-500/10'
  },
  {
    number: '05',
    name: 'Launch',
    tagline: 'Zero-downtime deployment & evolution',
    desc: 'Seamless migration, monitoring setup, SLA-backed warranty, and continuous platform enhancements.',
    icon: Rocket,
    accent: '#FF6B5A',
    border: 'border-[#FF6B5A]',
    text: 'text-[#FF6B5A]',
    bg: 'bg-rose-500/10'
  }
];

export function ProcessInteractiveTimeline() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className="space-y-8">
      {/* Desktop Horizontal Process Strip */}
      <div className="hidden lg:block relative">
        {/* Connecting Background Line */}
        <div className="absolute top-9 left-12 right-12 h-0.5 bg-white/10 -z-0" />
        
        {/* Active Progress Bar */}
        <div 
          className="absolute top-9 left-12 h-0.5 bg-gradient-to-r from-[#3B82F6] via-[#D4AF5A] to-[#16A878] transition-all duration-500 -z-0"
          style={{ width: `${(activeStep / (PROCESS_STEPS.length - 1)) * 82}%` }}
        />

        <div className="grid grid-cols-5 gap-4 relative z-10">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            const isPassed = activeStep >= idx;

            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setActiveStep(idx)}
                className={`group cursor-pointer flex flex-col items-center text-center p-4 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#15171B] shadow-lg scale-103 border border-white/15' 
                    : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                {/* Step Circle Node */}
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 mb-3 shadow-xs ${
                    isActive 
                      ? `${step.bg} ${step.text} ring-4 ring-[#15171B] border-2 ${step.border} scale-110` 
                      : isPassed
                      ? 'bg-white/10 text-slate-300'
                      : 'bg-white/5 text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider mb-1 ${isActive ? step.text : 'text-slate-400'}`}>
                  STAGE {step.number}
                </span>

                <h4 className="text-base font-bold text-white mb-1.5">
                  {step.name}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Stage Expanded Detail Card (Desktop) */}
      <div className="hidden lg:flex items-center justify-between p-6 rounded-2xl bg-[#15171B] border border-white/10 shadow-xs">
        <div className="flex items-center gap-4">
          <div 
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${PROCESS_STEPS[activeStep].bg} ${PROCESS_STEPS[activeStep].text}`}
          >
            {React.createElement(PROCESS_STEPS[activeStep].icon, { className: 'w-5 h-5' })}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono font-bold uppercase ${PROCESS_STEPS[activeStep].text}`}>
                Stage {PROCESS_STEPS[activeStep].number} — {PROCESS_STEPS[activeStep].name}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-xs font-medium text-slate-300">
                {PROCESS_STEPS[activeStep].tagline}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              {PROCESS_STEPS[activeStep].desc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 shrink-0">
          <span>0{activeStep + 1} of 05</span>
        </div>
      </div>

      {/* Mobile Vertical Timeline */}
      <div className="lg:hidden space-y-4">
        {PROCESS_STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="p-5 rounded-xl bg-[#15171B] border border-white/10 flex items-start gap-4 shadow-xs"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${step.bg} ${step.text}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className={`text-[10px] font-mono font-bold uppercase ${step.text}`}>
                  Stage {step.number}
                </span>
                <h4 className="text-sm font-bold text-white">
                  {step.name} — {step.tagline}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
