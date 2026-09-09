import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { INITIAL_SERVICES, INITIAL_PORTFOLIO } from '@/lib/store';
import { 
  Check, 
  ArrowRight, 
  ArrowUpRight, 
  ChevronRight,
  Layers,
  Sparkles
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INITIAL_SERVICES.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = INITIAL_SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found | ObliqueTech' };

  return {
    title: `${service.title} | ObliqueTech Services`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = INITIAL_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Related portfolio projects matching this service
  const relatedProjects = INITIAL_PORTFOLIO.filter(
    (p) => p.technologies.some((t) => service.technologies.includes(t)) || p.category.toLowerCase().includes(slug.split('-')[0])
  ).slice(0, 2);

  return (
    <div className="flex flex-col">
      {/* 1. Hero (Surface: Oblique Black) */}
      <section className="surface-black pt-32 pb-20 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#C7A45D]">{service.title}</span>
          </nav>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            {service.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
            {service.shortDescription}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <Link
              href="/start-project"
              className="btn-gold text-xs"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/schedule"
              className="btn-secondary text-white border-white/30 text-xs"
            >
              <span>Schedule a Call</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. What We Solve (Surface: Warm White) */}
      <section className="surface-warm py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3B82F6]">The Challenge</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            What we solve.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {service.problemStatement}
          </p>
        </div>
      </section>

      {/* 3. What We Offer & Deliverables (Surface: Pure White) */}
      <section className="surface-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#20A779]">Scope</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              What we offer.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.whatWeProvide.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-white/10 flex items-start gap-3 bg-white/5"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-[#20A779] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Technologies Stack */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Core Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Example Applications (Surface: Soft Grey) */}
      {service.typicalUseCases && service.typicalUseCases.length > 0 && (
        <section className="surface-light py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C7A45D]">Applications</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Where this fits.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.typicalUseCases.map((uc, idx) => (
                <div key={idx} className="clean-card p-6 rounded-xl space-y-2">
                  <h4 className="text-sm font-bold text-white">{uc.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Related Work (Surface: Pure White) */}
      {relatedProjects.length > 0 && (
        <section className="surface-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold tracking-tight text-white">Related Work</h3>
              <Link href="/portfolio" className="text-xs font-semibold text-[#3B82F6] hover:underline">
                View All Work →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedProjects.map((proj) => (
                <Link
                  key={proj.id}
                  href={`/portfolio/${proj.slug}`}
                  className="clean-card rounded-xl overflow-hidden group flex flex-col"
                >
                  <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                    <img
                      src={proj.coverImage}
                      alt={proj.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-[#3B82F6] transition-colors">{proj.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-1">{proj.shortDescription}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Simple Process (Surface: Warm White) */}
      <section className="surface-warm py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="text-lg font-bold tracking-tight text-white">How we deliver this service.</h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {service.process.map((p, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#C7A45D]">{p.step}</span>
                <h5 className="text-xs font-bold text-white">{p.title}</h5>
                <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA (Surface: Charcoal) */}
      <section className="surface-charcoal py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Ready to discuss {service.title}?
          </h2>
          <p className="text-sm text-slate-300">
            Tell us about what you are building, or schedule a direct introductory discussion.
          </p>
          <div className="pt-2 flex items-center justify-center gap-4">
            <Link href="/start-project" className="btn-gold text-xs">
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/schedule" className="btn-secondary text-white border-white/30 text-xs">
              <span>Schedule a Call</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
