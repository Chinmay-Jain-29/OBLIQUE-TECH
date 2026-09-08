import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { INITIAL_PORTFOLIO } from '@/lib/store';
import { ArrowRight, ChevronRight, Check } from 'lucide-react';

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
    title: `${project.title} | ObliqueTech Portfolio`,
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
    <div className="flex flex-col">
      {/* 1. Header (Surface: Oblique Black) */}
      <section className="surface-black pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/portfolio" className="hover:text-white">Portfolio</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#C7A45D]">{project.title}</span>
          </nav>

          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#3B82F6]">
              {project.category} • {project.clientIndustry}
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {project.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Large Visual Hero Screen (Surface: Warm White) */}
      <section className="surface-warm py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg bg-slate-950">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. Challenge & Solution (Surface: Pure White) */}
      <section className="surface-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C7A45D]">The Challenge</span>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">What needed fixing</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#20A779]">The Solution</span>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">What we engineered</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Built With / Stack (Surface: Soft Grey) */}
      <section className="surface-light py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Built With</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 shadow-2xs"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Key Highlights / Real Results (Surface: Pure White) */}
      {project.metricsOrHighlights && project.metricsOrHighlights.length > 0 && (
        <section className="surface-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
          <div className="max-w-4xl mx-auto space-y-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Verified Project Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.metricsOrHighlights.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 flex items-center gap-3 bg-slate-50/50 dark:bg-white/5 text-xs font-medium text-slate-800 dark:text-slate-200"
                >
                  <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-[#20A779] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. CTA (Surface: Charcoal) */}
      <section className="surface-charcoal py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Interested in building a similar system?
          </h2>
          <p className="text-sm text-slate-300">
            Tell us about your requirements. We’ll discuss feasibility, architecture, and timeline.
          </p>
          <div className="pt-2 flex items-center justify-center gap-4">
            <Link href="/start-project" className="btn-gold text-xs">
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/portfolio" className="btn-secondary text-white border-white/30 text-xs">
              <span>Back to Portfolio</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
