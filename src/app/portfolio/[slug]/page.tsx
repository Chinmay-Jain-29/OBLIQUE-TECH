import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { INITIAL_PORTFOLIO } from '@/lib/store';
import { 
  ArrowRight, 
  ChevronRight, 
  Layers, 
  Cpu, 
  Globe, 
  Sparkles, 
  Workflow, 
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react';
import { PortfolioGalleryLightbox } from '@/components/portfolio/PortfolioGalleryLightbox';
import { PortfolioImpactVisual } from '@/components/portfolio/PortfolioImpactVisual';

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

// Category color accents
const CATEGORY_STYLES: Record<string, { badge: string; dot: string; text: string }> = {
  'Web': { badge: 'bg-blue-500/10 border-blue-500/30 text-blue-500', dot: 'bg-blue-500', text: 'text-blue-500' },
  'AI/ML': { badge: 'bg-purple-500/10 border-purple-500/30 text-purple-400', dot: 'bg-purple-500', text: 'text-purple-400' },
  'SaaS': { badge: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400', dot: 'bg-emerald-500', text: 'text-emerald-400' },
  'Mobile': { badge: 'bg-amber-500/10 border-amber-500/30 text-amber-400', dot: 'bg-amber-500', text: 'text-amber-400' },
  'Consulting': { badge: 'bg-slate-500/10 border-slate-500/30 text-slate-400', dot: 'bg-slate-400', text: 'text-slate-400' },
};

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = INITIAL_PORTFOLIO.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const categoryStyle = CATEGORY_STYLES[project.category] || CATEGORY_STYLES['Web'];
  const relatedProjects = INITIAL_PORTFOLIO.filter((p) => p.slug !== slug).slice(0, 3);

  // Gallery images collection (fallback to cover if empty)
  const gallery = [project.coverImage, ...(project.galleryImages || [])];

  return (
    <div className="flex flex-col">
      {/* ------------------------------------------------------------- */}
      {/* SECTION 01 — PROJECT HERO (Large visual showcase, minimal text) */}
      {/* ------------------------------------------------------------- */}
      <section className="surface-black pt-28 pb-12 md:pt-36 md:pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Breadcrumb navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-[#C7A45D] truncate">{project.title}</span>
          </nav>

          {/* Minimal textual header */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border ${categoryStyle.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${categoryStyle.dot}`} />
                {project.category}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {project.clientIndustry}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              {project.title}
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Large Hero UI Showcase */}
          <div className="pt-6">
            <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-slate-950">
              {/* Browser bar mockup */}
              <div className="px-4 py-3 bg-[#17181C] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="px-3 py-1 rounded-md bg-[#0B0B0D] text-[11px] font-mono text-slate-400 border border-white/5 truncate max-w-xs">
                  obliquetech.com/portfolio/{project.slug}
                </div>
                <div className="w-10" />
              </div>

              {/* Main Screenshot */}
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-auto object-cover max-h-[640px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 02 — PROJECT SNAPSHOT (Attractive colored accent strip) */}
      {/* ------------------------------------------------------------- */}
      <section className="surface-warm py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-white dark:bg-[#121317] border border-slate-200 dark:border-white/10 shadow-xs">
            {/* Industry */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Industry</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                {project.clientIndustry}
              </p>
            </div>

            {/* Project Type */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Project Type</span>
              <div className="pt-0.5">
                <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-mono font-semibold bg-blue-50 dark:bg-blue-500/10 text-[#3B82F6] border border-blue-200 dark:border-blue-500/30">
                  {project.category} System
                </span>
              </div>
            </div>

            {/* Core Stack */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Key Technology</span>
              <p className="text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 truncate">
                {project.technologies.slice(0, 3).join(', ')}
              </p>
            </div>

            {/* Status */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Status</span>
              <div className="pt-0.5">
                {project.status === 'completed' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-mono font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-[#20A779] border border-emerald-200 dark:border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#20A779]" />
                    Production Ready
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-mono font-semibold bg-amber-50 dark:bg-amber-500/10 text-amber-500 border border-amber-200 dark:border-amber-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Active Initiative
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 03 & 04 — THE CHALLENGE & THE SOLUTION (Visual flow)   */}
      {/* ------------------------------------------------------------- */}
      <section className="surface-white py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Section 03: The Challenge */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider bg-rose-500/10 text-rose-500 border border-rose-500/20">
                <span>01</span>
                <span>•</span>
                <span>The Challenge</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                What needed fixing
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Visual Problem Representation */}
            <div className="lg:col-span-7">
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                  <span className="text-xs font-mono text-slate-500">SYSTEM BOTTLENECK DIAGNOSIS</span>
                  <span className="text-xs font-mono text-rose-500">Critical Friction</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-white dark:bg-[#17181C] border border-slate-200 dark:border-white/10 space-y-1.5">
                    <span className="text-[10px] font-mono text-rose-500 uppercase">Friction 01</span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Fragmented Data Silos</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Manual spreadsheets caused desynchronized operational tracking across teams.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-[#17181C] border border-slate-200 dark:border-white/10 space-y-1.5">
                    <span className="text-[10px] font-mono text-rose-500 uppercase">Friction 02</span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">High Latency Triage</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Slow query speeds and fragile plugin dependencies created constant support bottlenecks.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 04: The Solution (Visual Transition Flow) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-8 border-t border-slate-100 dark:border-white/5">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider bg-emerald-500/10 text-[#20A779] border border-emerald-500/20">
                <span>02</span>
                <span>•</span>
                <span>The Solution</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                What we engineered
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* Problem -> Approach -> Digital Product Visual Flow */}
            <div className="lg:col-span-7">
              <div className="space-y-3">
                {/* Step 1 */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-500 text-xs font-mono flex items-center justify-center font-bold">1</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">User Pain Point Isolated</h4>
                      <p className="text-[11px] text-slate-500">Unreliable manual processing eliminated at the root architecture layer.</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-mono flex items-center justify-center font-bold">2</span>
                    <div>
                      <h4 className="text-xs font-bold text-[#3B82F6]">ObliqueTech Approach</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{project.approach}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#3B82F6] shrink-0" />
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#20A779] text-white text-xs font-mono flex items-center justify-center font-bold">3</span>
                    <div>
                      <h4 className="text-xs font-bold text-[#20A779]">Production Digital Product</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Deployed high-performance platform delivering verifiable operational lift.</p>
                    </div>
                  </div>
                  <Check className="w-4 h-4 text-[#20A779] shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 05 — VISUAL FEATURE SHOWCASE (Alternating Visual/Text) */}
      {/* ------------------------------------------------------------- */}
      <section className="surface-light py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#3B82F6]">
              Engineered Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Feature Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Purpose-built capabilities engineered to drive speed, resilience, and clarity.
            </p>
          </div>

          {/* Alternating Feature Items */}
          <div className="space-y-12">
            {project.features.map((feat, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                    isEven ? '' : 'lg:grid-flow-dense'
                  }`}
                >
                  {/* Visual Screen */}
                  <div className={`lg:col-span-7 ${isEven ? '' : 'lg:col-start-6'}`}>
                    <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-950 shadow-lg">
                      <img
                        src={project.coverImage}
                        alt={feat}
                        className="w-full h-auto object-cover max-h-[360px]"
                      />
                    </div>
                  </div>

                  {/* Short Text Explainer */}
                  <div className={`lg:col-span-5 space-y-3 ${isEven ? '' : 'lg:col-start-1'}`}>
                    <span className="text-xs font-mono font-bold text-[#C7A45D]">
                      FEATURE 0{idx + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {feat}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Engineered with precision for zero downtime and low-friction workflow execution across all active workstations.
                    </p>
                    <div className="pt-1 flex items-center gap-2 text-xs font-mono text-[#3B82F6]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Production Verified</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 06 — PROJECT IMPACT (Mandatory Impact & Visualization)  */}
      {/* ------------------------------------------------------------- */}
      <section className="surface-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#20A779]">
              Measured Outcomes
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Impact
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
              Real-world operational enhancements delivered through clean software architecture.
            </p>
          </div>

          <PortfolioImpactVisual
            highlights={project.metricsOrHighlights || []}
            projectCategory={project.category}
          />
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 07 — PROJECT TECHNOLOGY (Visual Stack Badges)          */}
      {/* ------------------------------------------------------------- */}
      <section className="surface-warm py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              Technology Stack
            </h3>
            <span className="text-xs font-mono text-slate-400">
              {project.technologies.length} Core Technologies
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, idx) => (
              <div
                key={idx}
                className="group px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121317] hover:border-[#3B82F6] hover:shadow-md transition-all duration-200 flex items-center gap-2 cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-[#3B82F6] group-hover:scale-125 transition-transform" />
                <span className="text-xs font-mono font-semibold text-slate-800 dark:text-slate-200">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 08 — PROJECT GALLERY (Interactive Lightbox Showcase)   */}
      {/* ------------------------------------------------------------- */}
      <section className="surface-light py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C7A45D]">
              Visual Presentation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Project Gallery
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Click any screenshot to view in full resolution.
            </p>
          </div>

          <PortfolioGalleryLightbox images={gallery} title={project.title} />
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 09 — RELATED WORK (More from ObliqueTech)               */}
      {/* ------------------------------------------------------------- */}
      {relatedProjects.length > 0 && (
        <section className="surface-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Selected Portfolio
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  More from ObliqueTech
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B82F6] hover:text-blue-500 transition-colors"
              >
                <span>View All Work</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => {
                const relStyle = CATEGORY_STYLES[rel.category] || CATEGORY_STYLES['Web'];
                return (
                  <Link
                    key={rel.id}
                    href={`/portfolio/${rel.slug}`}
                    className="group flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121317] hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-xs hover:shadow-lg"
                  >
                    <div className="aspect-16/10 overflow-hidden bg-slate-950">
                      <img
                        src={rel.coverImage}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        <span className={`text-[10px] font-mono uppercase tracking-wider ${relStyle.text}`}>
                          {rel.category} • {rel.clientIndustry}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-[#3B82F6] transition-colors line-clamp-2">
                          {rel.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                          {rel.shortDescription}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                        <span>View Project</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SECTION 10 — FINAL CTA (Building something similar?)           */}
      {/* ------------------------------------------------------------- */}
      <section className="surface-charcoal py-24 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C7A45D]">
            Start a Conversation
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
            Building something similar?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Let’s look at your idea from a different angle. We’ll discuss architectural trade-offs, scope, and technical roadmap.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/start-project" className="btn-gold text-xs w-full sm:w-auto">
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/schedule" className="btn-secondary text-white border-white/30 text-xs w-full sm:w-auto">
              <span>Schedule a Call</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
