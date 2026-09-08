import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  ArrowRight, 
  Check, 
  Target, 
  Rocket, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  HeartHandshake,
  Award
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About ObliqueTech — Who We Are & Origin Story',
  description: 'ObliqueTech is a technology company focused on building practical digital solutions for businesses and creating meaningful opportunities through technology.',
};

export default function AboutPage() {
  const values = [
    { name: 'Customer First', desc: 'We build around what your business actually needs.' },
    { name: 'Innovation', desc: 'Pragmatic creativity that moves projects forward.' },
    { name: 'Transparency', desc: 'Clear communication, no hidden agendas.' },
    { name: 'Quality', desc: 'Code and interfaces engineered to last.' },
    { name: 'Teamwork', desc: 'Collaborative partnership with client teams.' },
    { name: 'Growth', desc: 'Continuous improvement for clients and team.' },
    { name: 'Ethics', desc: 'Integrity and responsibility in everything we deliver.' }
  ];

  return (
    <div className="flex flex-col">
      {/* 1. Header / Who We Are (Surface: Oblique Black) */}
      <section className="surface-black pt-32 pb-20 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[#C7A45D]">About ObliqueTech</span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            See Business Differently.
          </h1>
          <p className="text-lg sm:text-2xl text-slate-300 font-normal leading-relaxed">
            ObliqueTech is a technology company focused on building practical digital solutions for businesses and creating meaningful opportunities through technology.
          </p>
          <div className="pt-2 flex items-center gap-4">
            <Link href="/portfolio" className="btn-gold">
              <span>Explore Our Work</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-secondary text-white border-white/30 hover:border-white">
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Where Oblique Began (Surface: Warm White) */}
      <section className="surface-warm py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3B82F6]">Origin</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Where Oblique began.
            </h2>
          </div>

          <div className="space-y-5 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              Oblique started after seeing a common challenge among engineering students: <strong className="text-slate-900 dark:text-white">companies wanted experience, but students were struggling to find opportunities to gain it.</strong>
            </p>
            <p>
              Rather than accept this disconnect, Oblique began as an open-architecture project laboratory designed around real execution:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Real-world commercial prototypes & applications',
                'Direct mentorship from seasoned systems architects',
                'Practical engineering sessions & architecture reviews',
                'Collaborative hackathons & team problem-solving',
                'Production CI/CD deployment literacy',
                'A culture of ownership and delivery'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-lg bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C7A45D]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p className="pt-2 text-slate-600 dark:text-slate-400">
              That founding commitment to capability over credentials remains our core identity. Today, ObliqueTech has grown into an applied technology company delivering production software, custom AI systems, and digital platforms worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Where We Are Going (Surface: Soft Grey) */}
      <section className="surface-light py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#20A779]">Vision & Ambition</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Where we are going.
            </h2>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              We aim to move beyond services and build technology products that solve real problems at scale.
            </p>
          </div>

          {/* Trajectory visualization */}
          <div className="p-6 sm:p-8 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-4">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Evolution Path</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {[
                { stage: 'Stage 01', title: 'Solutions', desc: 'Bespoke client systems & agile engineering' },
                { stage: 'Stage 02', title: 'Products', desc: 'Proprietary software tools for targeted verticals' },
                { stage: 'Stage 03', title: 'Platforms', desc: 'Scalable cloud infrastructure & data hubs' },
                { stage: 'Stage 04', title: 'Global Impact', desc: 'Technology solving fundamental business problems' },
              ].map((st, i) => (
                <div key={i} className="p-4 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 space-y-1.5">
                  <span className="text-[10px] font-mono text-[#C7A45D] font-bold">{st.stage}</span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{st.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Mission & Vision (Surface: Pure White) */}
      <section className="surface-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="clean-card p-8 rounded-xl space-y-3 border-l-4 border-l-[#3B82F6]">
            <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-500/10 text-[#3B82F6] flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Our Mission</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Build useful technology, solve real problems, and create opportunities that matter.
            </p>
          </div>

          <div className="clean-card p-8 rounded-xl space-y-3 border-l-4 border-l-[#C7A45D]">
            <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-500/10 text-[#C7A45D] flex items-center justify-center">
              <Rocket className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Our Vision</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Become a trusted technology company that builds products with global relevance.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Values (Surface: Warm White) */}
      <section className="surface-warm py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Principles</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Our Values
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              The fundamental standards that guide how we work and build.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((v, idx) => (
              <div key={idx} className="clean-card p-5 rounded-xl space-y-1.5">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{v.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-6 text-center">
            <Link href="/schedule" className="btn-primary text-xs">
              <span>Schedule a Call with Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
