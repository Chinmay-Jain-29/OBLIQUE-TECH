import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { INITIAL_SERVICES } from '@/lib/store';
import { 
  ArrowRight, 
  Check, 
  Globe, 
  Compass, 
  Cpu, 
  Layout, 
  Smartphone, 
  Code, 
  TrendingUp, 
  Layers 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services & Capabilities | ObliqueTech',
  description: 'Practical technology solutions across Web Development, AI/ML, UI/UX Design, IT Consulting, Custom Software, and Mobile Apps.',
};

export default function ServicesPage() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-5 h-5 text-[#3B82F6]" />;
      case 'Compass': return <Compass className="w-5 h-5 text-[#20A779]" />;
      case 'Brain':
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#7C5CFC]" />;
      case 'Layout': return <Layout className="w-5 h-5 text-[#C7A45D]" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-[#3B82F6]" />;
      case 'Code': return <Code className="w-5 h-5 text-[#7C5CFC]" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-[#20A779]" />;
      default: return <Layers className="w-5 h-5 text-[#3B82F6]" />;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header (Surface: Oblique Black) */}
      <section className="surface-black pt-32 pb-20 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[#C7A45D]">Services</span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Technology that solves real problems.
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
            From websites and custom software to AI and consulting, we build solutions around what your business actually needs.
          </p>
        </div>
      </section>

      {/* Services Grid (Surface: Warm White) */}
      <section className="surface-warm py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INITIAL_SERVICES.map((svc) => (
              <div
                key={svc.id}
                className="clean-card p-7 rounded-xl flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                    {getIcon(svc.iconName)}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#3B82F6] transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                      {svc.shortDescription}
                    </p>
                  </div>

                  {/* 3 Key capabilities */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-white/5">
                    {svc.capabilities.slice(0, 3).map((cap, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C7A45D]" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <Link
                    href={`/services/${svc.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B82F6] hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/start-project"
                    className="text-[11px] font-medium text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
                  >
                    Request Scope
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA (Surface: Charcoal) */}
      <section className="surface-charcoal py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Not sure what your project needs?
          </h2>
          <p className="text-sm text-slate-300">
            Book a focused 30-minute consultation with an engineering lead to define your technical approach.
          </p>
          <div className="pt-2 flex items-center justify-center gap-4">
            <Link href="/schedule" className="btn-gold text-xs">
              <span>Schedule a Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/start-project" className="btn-secondary text-white border-white/30 text-xs">
              <span>Start a Project</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
