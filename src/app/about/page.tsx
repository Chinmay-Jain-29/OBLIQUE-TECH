import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  GraduationCap, 
  Target, 
  Compass, 
  Lightbulb, 
  ShieldCheck, 
  Layers, 
  HeartHandshake, 
  Rocket, 
  TrendingUp,
  Award,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About ObliqueTech — Our Story, Mission & Philosophy',
  description: 'Learn how ObliqueTech began by bridging the student experience gap and grew into a global product studio and engineering advisory.',
};

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-24">
      {/* 1. Header & Brand Concept */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>The Philosophy Behind Oblique</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          See Business Differently.
        </h1>
        <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-medium">
          The word <em>Oblique</em> means approaching a problem from a different angle. We believe the future belongs to companies that reject conventional bloat and build with clarity.
        </p>
      </div>

      {/* 2. Where Oblique Began (The Student Experience Origin) */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/70 border border-white/10 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Origin Story</span>
            <h2 className="text-2xl font-bold text-white">Where Oblique Began</h2>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>
            Oblique was sparked by observing an undeniable paradox in the engineering sector: <strong className="text-white">companies consistently expect candidates to possess production experience, while fresh graduates are given limited opportunities to gain it.</strong>
          </p>
          <p>
            Rather than accept this friction as an unchangeable reality, Oblique was created to build a bridge around:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              'Hands-on, production-grade real-world projects',
              'Direct mentorship from experienced software practitioners',
              'Expert speaker sessions & architectural breakdowns',
              'Collaborative hackathons & team problem-solving',
              'Career development & production engineering literacy',
              'Exposure to modern deployment workflows and CI/CD',
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="pt-2 text-slate-400">
            That founding empathy for practical capability over empty credentials remains our core ethos. Today, ObliqueTech has expanded that same pragmatic spirit into building scalable products, custom platforms, and enterprise solutions globally.
          </p>
        </div>
      </div>

      {/* 3. Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/10 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white">Our Mission</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            To build meaningful technology solutions that solve real problems, create opportunities, and help people and businesses move confidently into the future.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/10 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <Rocket className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white">Our Vision</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            To build products and technology businesses that solve problems at scale, compete globally, and create lasting impact through long-term product-driven innovation.
          </p>
        </div>
      </div>

      {/* 4. Core Values */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Our Core Values</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Principles that guide every architecture review, client engagement, and product decision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Customer-Centricity',
              desc: 'Understanding the client’s actual operational challenge before touching code.',
              icon: <HeartHandshake className="w-5 h-5 text-amber-400" />
            },
            {
              title: 'Quality',
              desc: 'Engineering type-safe, resilient code that will be maintainable for years to come.',
              icon: <Award className="w-5 h-5 text-cyan-400" />
            },
            {
              title: 'Transparency',
              desc: 'Clear scopes, honest feasibility assessments, and zero hidden technical traps.',
              icon: <ShieldCheck className="w-5 h-5 text-violet-400" />
            },
            {
              title: 'Innovation',
              desc: 'Applying cutting-edge AI and distributed systems pragmatically for genuine utility.',
              icon: <Lightbulb className="w-5 h-5 text-amber-400" />
            },
            {
              title: 'Teamwork',
              desc: 'Collaborative pair programming, blameless postmortems, and shared engineering pride.',
              icon: <Layers className="w-5 h-5 text-cyan-400" />
            },
            {
              title: 'Ethics',
              desc: 'Strict user data privacy, transparent communication, and genuine long-term partnership.',
              icon: <CheckCircle2 className="w-5 h-5 text-violet-400" />
            },
          ].map((val, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 space-y-3 hover:border-cyan-400/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                {val.icon}
              </div>
              <h3 className="text-base font-bold text-white">{val.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Future Roadmap: Evolution */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-white/10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            Evolutionary Arc
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            From Services to Global Platforms
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            How ObliqueTech evolves from service-based engineering into product-led global innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {[
            { phase: '01', name: 'Services', desc: 'Bespoke client software & strategic consulting' },
            { phase: '02', name: 'Experience', desc: 'Accelerated engineering through tested patterns' },
            { phase: '03', name: 'Products', desc: 'Proprietary tools solving recurring bottlenecks' },
            { phase: '04', name: 'Platforms', desc: 'Scalable multi-tenant enterprise ecosystems' },
            { phase: '05', name: 'Global Tech', desc: 'Internationally recognized engineering brand' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-400">{item.phase}</span>
              <h3 className="text-sm font-bold text-white">{item.name}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center p-12 rounded-3xl bg-slate-900/50 border border-white/10 space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Collaborate With ObliqueTech
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Whether you’re an entrepreneur with an ambitious roadmap or an enterprise looking for a fresh technical perspective.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <Link
            href="/start-project"
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all"
          >
            Start a Project
          </Link>
          <Link
            href="/schedule"
            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/15 transition-all"
          >
            Schedule a Call
          </Link>
        </div>
      </div>
    </div>
  );
}
