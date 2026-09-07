import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { INITIAL_PORTFOLIO } from '@/lib/store';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Clock, 
  ShieldCheck, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INITIAL_PORTFOLIO.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = INITIAL_PORTFOLIO.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found | ObliqueTech' };

  return {
    title: `${project.title} — Case Study | ObliqueTech`,
    description: project.shortDescription,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = INITIAL_PORTFOLIO.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-300">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/portfolio" className="hover:text-slate-300">Portfolio</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-amber-400 font-medium truncate max-w-xs">{project.title}</span>
      </nav>

      {/* Hero */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 text-slate-300 border border-white/10">
            {project.category}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              project.status === 'completed'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            }`}
          >
            {project.status === 'completed' ? '✓ Completed Solution' : '● Ongoing Sprint Milestone'}
          </span>
          <span className="text-xs text-slate-400">
            Industry: <strong className="text-slate-200">{project.clientIndustry}</strong>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-medium">
          {project.shortDescription}
        </p>
      </div>

      {/* 1. Challenge / Problem */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-rose-400">01 — The Challenge</h2>
        <h3 className="text-xl sm:text-2xl font-bold text-white">The Operational Friction</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          {project.problem}
        </p>
      </div>

      {/* 2. Approach & Architecture */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400">02 — Our Approach</h2>
        <h3 className="text-xl sm:text-2xl font-bold text-white">The Oblique Engineering Strategy</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          {project.approach}
        </p>
      </div>

      {/* 3. The Solution & Features */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-white/10 space-y-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400">03 — The Solution</h2>
        <h3 className="text-xl sm:text-2xl font-bold text-white">Engineered Implementation</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          {project.solution}
        </p>

        <div className="pt-4 border-t border-white/10 space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-300">Key Engineered Features:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            {project.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span className="leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Technology Stack */}
      <div className="p-8 rounded-3xl bg-slate-900/40 border border-white/10 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-violet-400" />
          <span>Technology & Infrastructure Stack</span>
        </h2>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-white/5 text-slate-200 border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 5. Key Highlights / Verification */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">04 — Verified Highlights</h2>
        <h3 className="text-xl font-bold text-white">Measurable System Capabilities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-2">
          {project.metricsOrHighlights.map((m, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
              <span className="font-medium text-slate-200">{m}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-10 rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-cyan-500/10 border border-white/10 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Discuss an Architecture Like This
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
          Need a robust system engineered to address specific operational bottlenecks?
        </p>
        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/start-project"
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all"
          >
            Start a Project
          </Link>
          <Link
            href="/schedule"
            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/15 transition-all"
          >
            Schedule a Scoping Call
          </Link>
        </div>
      </div>
    </div>
  );
}
