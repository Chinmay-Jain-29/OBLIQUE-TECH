import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { INITIAL_SERVICES, INITIAL_PORTFOLIO } from '@/lib/store';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowUpRight, 
  Clock, 
  Layers, 
  HelpCircle, 
  FileText, 
  ShieldCheck, 
  Sparkles,
  ChevronRight
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
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-300">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/services" className="hover:text-slate-300">Services</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-cyan-400 font-medium">{service.title}</span>
      </nav>

      {/* 1. Hero */}
      <div className="max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{service.badge}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          {service.title}
        </h1>

        <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-medium">
          {service.shortDescription}
        </p>

        <div className="pt-2 flex flex-wrap gap-4 items-center">
          <Link
            href="/start-project"
            className="px-6 py-3 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
          >
            Start a Project with this Service
          </Link>
          <Link
            href="/schedule"
            className="px-6 py-3 rounded-xl font-bold text-xs bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all"
          >
            Schedule a Scoping Call
          </Link>
        </div>
      </div>

      {/* 2. Problem Statement */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400">The Challenge We Solve</h2>
        <h3 className="text-xl sm:text-2xl font-bold text-white">Why Conventional Approaches Fall Short</h3>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {service.problemStatement}
        </p>
        <div className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-cyan-400 text-xs text-slate-300 mt-4">
          <strong className="text-white">Business Value: </strong>
          {service.businessValue}
        </div>
      </div>

      {/* 3. What We Provide & Key Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-slate-900/40 border border-white/10 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>What We Provide</span>
          </h2>
          <ul className="space-y-3 text-xs text-slate-300">
            {service.whatWeProvide.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/40 border border-white/10 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span>Key Capabilities</span>
          </h2>
          <ul className="space-y-3 text-xs text-slate-300">
            {service.capabilities.map((cap, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. Typical Use Cases */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">Typical Use Cases</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {service.typicalUseCases.map((useCase, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 space-y-2">
              <h3 className="text-base font-bold text-white">{useCase.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{useCase.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Technology Stack */}
      <div className="p-8 rounded-3xl bg-slate-900/40 border border-white/10 space-y-4">
        <h2 className="text-xl font-bold text-white">Recommended Technology Stack</h2>
        <p className="text-xs text-slate-400">
          Tools selected for reliability, active ecosystem support, and enterprise performance.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {service.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-white/5 text-slate-200 border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 6. Development Process */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">Development Lifecycle</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {service.process.map((step, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/50 border border-white/10 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">{step.step}</span>
              <h3 className="text-sm font-bold text-white">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Deliverables */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-violet-400" />
          <span>Tangible Deliverables</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
          {service.deliverables.map((del, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="w-2 h-2 rounded-full bg-violet-400 mt-1 shrink-0" />
              <span>{del}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Related Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedProjects.map((p) => (
              <div key={p.id} className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-white/5 text-slate-300">
                  {p.status}
                </span>
                <h3 className="text-base font-bold text-white">{p.title}</h3>
                <p className="text-xs text-slate-400">{p.shortDescription}</p>
                <Link
                  href={`/portfolio/${p.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:underline pt-2"
                >
                  <span>View Project Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. FAQs */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/40 border border-white/10 space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <span>Frequently Asked Questions About {service.title}</span>
        </h2>
        <div className="space-y-4">
          {service.faqs.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <h3 className="text-sm font-bold text-white">{faq.question}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 10. Bottom CTA & Schedule a Call */}
      <div className="text-center p-12 rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-cyan-500/10 border border-white/10 space-y-4">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
          Ready to Engineer Your {service.title} Solution?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          Start with our interactive discovery wizard or schedule a 30-minute call with an engineering lead.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/start-project"
            className="px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            Start a Project
          </Link>
          <Link
            href="/schedule"
            className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/15 transition-all"
          >
            Schedule a Call
          </Link>
        </div>
      </div>
    </div>
  );
}
