import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { INITIAL_SERVICES } from '@/lib/store';
import { ArrowRight, ArrowUpRight, CheckCircle2, Globe, Compass, Brain, Layout, Smartphone, Code, TrendingUp, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Technology Services & Solutions | ObliqueTech',
  description: 'Scalable web development, systems architecture, applied AI/ML systems, UI/UX design, mobile apps, and technical digital marketing.',
};

export default function ServicesPage() {
  const services = INITIAL_SERVICES;

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-6 h-6 text-cyan-400" />;
      case 'Compass': return <Compass className="w-6 h-6 text-amber-400" />;
      case 'Brain': return <Brain className="w-6 h-6 text-violet-400" />;
      case 'Layout': return <Layout className="w-6 h-6 text-amber-400" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-cyan-400" />;
      case 'Code': return <Code className="w-6 h-6 text-violet-400" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-cyan-400" />;
      default: return <Layers className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>Core Capabilities</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Technology Services Built For Scale.
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          We combine business strategy, engineering depth, and modern aesthetics to build software that drives quantifiable operational growth.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col justify-between p-8 rounded-3xl bg-slate-900/50 border border-white/10 hover:border-cyan-400/40 transition-all duration-300 shadow-xl group hover:-translate-y-1"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getServiceIcon(service.iconName)}
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 text-slate-300 border border-white/10">
                  {service.badge}
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h2>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              {/* What We Provide */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-300">Key Capabilities</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
                  {service.capabilities.slice(0, 4).map((cap, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="pt-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Technologies</p>
                <div className="flex flex-wrap gap-1.5">
                  {service.technologies.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300 border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-between">
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors"
              >
                <span>View Full Service Blueprint</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/schedule"
                className="text-xs text-slate-400 hover:text-amber-300 transition-colors"
              >
                Schedule Consultation →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Problem-Solving Matrix Section */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/40 border border-white/10 space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          How We Approach Problem-Solving
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400">
          <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <h3 className="text-sm font-bold text-amber-400">1. Architectural Validation</h3>
            <p>We stress-test ideas before writing code, choosing the right data structures and frameworks that prevent expensive rewrites.</p>
          </div>
          <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <h3 className="text-sm font-bold text-cyan-400">2. Incremental Delivery</h3>
            <p>Every sprint delivers working, deployable increments. You see real progress every week rather than waiting for big-bang reveals.</p>
          </div>
          <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <h3 className="text-sm font-bold text-violet-400">3. Zero Vendor Lock-in</h3>
            <p>You own 100% of your source code, deployment scripts, database schemas, and documentation from day one.</p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center p-12 rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-cyan-500/10 border border-white/10 space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Need a Customized Solution?</h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Every organization has unique constraints. Let’s evaluate your technical requirements on an introductory consultation.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <Link
            href="/start-project"
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all"
          >
            Start a Project
          </Link>
          <Link
            href="/schedule"
            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/15 transition-all"
          >
            Schedule a Call
          </Link>
        </div>
      </div>
    </div>
  );
}
