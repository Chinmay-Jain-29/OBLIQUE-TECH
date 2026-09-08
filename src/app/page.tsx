'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  obliqueStore, 
  INITIAL_SERVICES, 
  INITIAL_PORTFOLIO, 
  INITIAL_POSTS, 
  INITIAL_FAQS 
} from '@/lib/store';
import { 
  ArrowRight, 
  ArrowUpRight, 
  ChevronDown, 
  Globe, 
  Cpu, 
  Layout, 
  Compass, 
  Check, 
  Sparkles,
  MessageSquare
} from 'lucide-react';

export default function HomePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // 4 Primary services as requested
  const primaryServices = [
    {
      title: 'Web Development',
      slug: 'web-development',
      description: 'Websites and web applications built for performance and growth.',
      icon: <Globe className="w-5 h-5 text-[#3B82F6]" />,
      accent: 'border-l-[#3B82F6]'
    },
    {
      title: 'AI & ML',
      slug: 'ai-ml',
      description: 'Practical AI solutions, automation, and intelligent systems.',
      icon: <Cpu className="w-5 h-5 text-[#7C5CFC]" />,
      accent: 'border-l-[#7C5CFC]'
    },
    {
      title: 'UI/UX Design',
      slug: 'ui-ux-design',
      description: 'Clear digital experiences designed around people.',
      icon: <Layout className="w-5 h-5 text-[#C7A45D]" />,
      accent: 'border-l-[#C7A45D]'
    },
    {
      title: 'IT Consulting',
      slug: 'it-consulting',
      description: 'Technology direction for better digital decisions.',
      icon: <Compass className="w-5 h-5 text-[#20A779]" />,
      accent: 'border-l-[#20A779]'
    }
  ];

  // 3 completed featured projects
  const featuredPortfolio = INITIAL_PORTFOLIO.filter(p => p.status === 'completed').slice(0, 3);

  // 1 featured + 2 smaller insights
  const featuredPost = INITIAL_POSTS[0];
  const secondaryPosts = INITIAL_POSTS.slice(1, 3);

  // 8 concise FAQ questions as specified
  const homeFaqs = [
    {
      q: 'What services do you provide?',
      a: 'We provide Web Development, AI & Machine Learning solutions, UI/UX Product Design, and IT Consulting as our primary services, alongside Custom Software, Mobile Apps, and Technical Digital Marketing.'
    },
    {
      q: 'Can you work with startups?',
      a: 'Yes. We frequently partner with founders to validate concepts, build rapid high-converting MVPs, and establish clean technical foundations designed for commercial scale.'
    },
    {
      q: 'Do you work with international clients?',
      a: 'Yes. We collaborate with clients across North America, Europe, and Asia with structured async updates, weekly sprint reviews, and direct communication channels.'
    },
    {
      q: 'Can you improve an existing product?',
      a: 'Yes. We audit legacy codebases, resolve performance bottlenecks, modernize user interfaces, and migrate monolithic applications without business interruption.'
    },
    {
      q: 'How do we start a project?',
      a: 'You can submit your requirements through our neutral 5-step Project Wizard, or book a direct 30–45 minute introductory consultation call.'
    },
    {
      q: 'How long does development usually take?',
      a: 'A typical MVP or focused web platform takes 4 to 8 weeks. Larger custom systems and enterprise software projects run in structured 2-week agile sprints over 2 to 4 months.'
    },
    {
      q: 'Do you provide ongoing support?',
      a: 'Yes. We provide clear maintenance arrangements, security updates, cloud optimization, and continuous feature expansion after launch.'
    },
    {
      q: 'Can you integrate AI into existing systems?',
      a: 'Yes. We build private retrieval pipelines (RAG), workflow automation, and predictive models that integrate safely with your existing databases and APIs.'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* =========================================================================
          01 — HERO (Surface: Oblique Black #0B0B0D)
          ========================================================================= */}
      <section className="surface-black pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#C7A45D]" />
              <span>Different perspective. Better technology.</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              See Business <br className="hidden sm:inline" />
              <span className="text-[#C7A45D]">Differently.</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 max-w-xl leading-relaxed font-normal">
              We build practical digital solutions that help businesses grow, adapt, and compete in a changing market.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/start-project"
                className="btn-gold"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/portfolio"
                className="btn-secondary text-white border-white/30 hover:border-white"
              >
                <span>View Our Work</span>
              </Link>
              <Link
                href="/schedule"
                className="text-xs font-semibold text-slate-400 hover:text-white transition-colors underline-offset-4 hover:underline ml-2"
              >
                Schedule a Call →
              </Link>
            </div>
          </div>

          {/* Right Hero Graphic: Restrained Oblique Geometric Mark & Perspective */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full max-w-md aspect-square rounded-2xl bg-[#17181C] border border-white/10 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              {/* Subtle angled geometry overlay */}
              <div className="absolute inset-0 opacity-15 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
                  <line x1="0" y1="400" x2="400" y2="0" stroke="white" strokeWidth="1" />
                  <line x1="100" y1="400" x2="400" y2="100" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
                  <line x1="0" y1="300" x2="300" y2="0" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
                </svg>
              </div>

              {/* Minimal technical telemetry bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#20A779]" />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-300">Engineering Studio</span>
                </div>
                <span className="text-xs font-mono text-[#C7A45D]">ObliqueTech</span>
              </div>

              {/* Central Geometric Statement */}
              <div className="space-y-4 py-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#C7A45D]">
                    <path
                      d="M5 19L19 5M6 5H18C18.5523 5 19 5.44772 19 6V18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Angle of Departure
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Most organizations take the crowded, linear route. We assess architectural problems from an intentional angle to eliminate unnecessary complexity.
                </p>
              </div>

              {/* Metric indicators */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <div className="text-lg font-bold text-white font-mono">3 Live</div>
                  <div className="text-[11px] text-slate-400">Production Deployments</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#3B82F6] font-mono">2 Active</div>
                  <div className="text-[11px] text-slate-400">Engineering Bench</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          02 — WHAT WE DO (Surface: Warm White #F7F6F2)
          ========================================================================= */}
      <section className="surface-warm py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3B82F6]">Capabilities</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Technology that solves real business problems.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                From websites and software to AI and consulting, we build solutions around what your business actually needs.
              </p>
            </div>
            <div>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B82F6] hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
              >
                <span>View All Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 4 Primary Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {primaryServices.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className={`clean-card p-6 rounded-xl border-l-4 ${svc.accent} flex flex-col justify-between group`}
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {svc.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#3B82F6] transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {svc.description}
                  </p>
                </div>
                <div className="pt-6 flex items-center text-xs font-semibold text-[#3B82F6] group-hover:translate-x-1 transition-transform">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          03 — SELECTED WORK (Surface: Pure White #FFFFFF)
          ========================================================================= */}
      <section className="surface-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C7A45D]">Work</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Selected work
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                A look at what we’ve built.
              </p>
            </div>
            <div>
              <Link
                href="/portfolio"
                className="btn-primary text-xs"
              >
                <span>View Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Visual-First 3 Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPortfolio.map((project) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className="group flex flex-col space-y-4 rounded-xl overflow-hidden"
              >
                {/* Large visual screenshot */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs transition-transform duration-300 group-hover:scale-[1.02]">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-xs text-[10px] font-semibold text-white">
                    {project.category}
                  </div>
                </div>

                {/* Minimal Metadata */}
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#3B82F6] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          04 — WHY US (Surface: Soft Grey #F1F2F5)
          ========================================================================= */}
      <section className="surface-light py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#20A779]">Reliability</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Why work with us?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Technology is only as good as the understanding behind it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="clean-card p-6 rounded-xl space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-[#20A779] flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">We Listen</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                We understand the problem thoroughly before choosing or writing any technology.
              </p>
            </div>

            <div className="clean-card p-6 rounded-xl space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/10 text-[#3B82F6] flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">We Keep It Clear</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                You always know exactly what is being built, why it matters, and how it performs.
              </p>
            </div>

            <div className="clean-card p-6 rounded-xl space-y-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-500/10 text-[#C7A45D] flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">We Build for Real Use</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                We focus on useful, maintainable solutions rather than disposable technical hype.
              </p>
            </div>

            <div className="clean-card p-6 rounded-xl space-y-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-500/10 text-[#7C5CFC] flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">We Stay Committed</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                We take direct responsibility for what we agree to deliver from kickoff to post-launch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          05 — HOW WE WORK (Surface: Soft Grey #F1F2F5 / Process)
          ========================================================================= */}
      <section className="surface-light py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Methodology</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              A simple, disciplined process.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: '01', name: 'Discover', desc: 'Understand the problem.' },
              { step: '02', name: 'Plan', desc: 'Define the right approach.' },
              { step: '03', name: 'Build', desc: 'Design and develop the solution.' },
              { step: '04', name: 'Test', desc: 'Make sure it works properly.' },
              { step: '05', name: 'Launch', desc: 'Deliver and support.' },
            ].map((st) => (
              <div key={st.step} className="p-4 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#C7A45D]">{st.step}</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{st.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          06 — ABOUT OBLIQUE (Surface: Warm White #F7F6F2)
          ========================================================================= */}
      <section className="surface-warm py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C7A45D]">Our Origin</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Where Oblique began.
            </h2>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              Oblique started after seeing a common challenge among engineering students: companies wanted experience, but students were struggling to find opportunities to gain it.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              We began by connecting developers with seasoned architects through real commercial prototypes, technical mentorship, and high-velocity sprints. That relentless culture of execution evolved into an enterprise technology company building mission-critical software globally.
            </p>

            {/* Strategic Ambition Progression */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Our Trajectory</div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-3 py-1 rounded bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white">Solutions</span>
                <span className="text-slate-400">→</span>
                <span className="px-3 py-1 rounded bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white">Products</span>
                <span className="text-slate-400">→</span>
                <span className="px-3 py-1 rounded bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white">Platforms</span>
                <span className="text-slate-400">→</span>
                <span className="px-3 py-1 rounded bg-[#C7A45D] text-[#0B0B0D] font-bold">Global Impact</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B82F6] hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-8 rounded-2xl bg-white dark:bg-[#17181C] border border-slate-200 dark:border-white/10 space-y-6 shadow-sm">
              <div className="space-y-2 border-b border-slate-100 dark:border-white/10 pb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Mission</h4>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Build useful technology, solve real problems, and create opportunities that matter.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Vision</h4>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Become a trusted technology company that builds products with global relevance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          07 — OBLIQUE INSIGHTS (Surface: Pure White #FFFFFF)
          ========================================================================= */}
      <section className="surface-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C5CFC]">Thinking</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Oblique Insights
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Ideas, technology, and practical thinking.
              </p>
            </div>
            <div>
              <Link
                href="/insights"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B82F6] hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
              >
                <span>View All Insights</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 1 Featured + 2 Smaller Articles */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Featured Article (7 cols) */}
            {featuredPost && (
              <Link
                href={`/insights/${featuredPost.slug}`}
                className="lg:col-span-7 clean-card p-6 sm:p-8 rounded-xl flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                    <span className="text-[#3B82F6] font-semibold">{featuredPost.category}</span>
                    <span>•</span>
                    <span>{featuredPost.readingTimeMinutes} min read</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[#3B82F6] transition-colors leading-snug">
                    {featuredPost.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>
                <div className="pt-6 flex items-center text-xs font-semibold text-[#3B82F6]">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </Link>
            )}

            {/* 2 Smaller Articles (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {secondaryPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/insights/${post.slug}`}
                  className="clean-card p-6 rounded-xl flex-1 flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono text-slate-500">
                      <span className="text-[#C7A45D] font-semibold">{post.category}</span> • {post.readingTimeMinutes} min read
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#3B82F6] transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 text-xs font-semibold text-[#3B82F6] flex items-center">
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          08 — FAQ (Surface: Warm White #F7F6F2)
          ========================================================================= */}
      <section className="surface-warm py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Answers</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Concise answers to what businesses ask us most often.
            </p>
          </div>

          <div className="space-y-3">
            {homeFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="clean-card rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#3B82F6]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/faq"
              className="text-xs font-semibold text-[#3B82F6] hover:underline"
            >
              View Full FAQ Directory →
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          09 — FINAL CTA (Surface: Charcoal #17181C)
          ========================================================================= */}
      <section className="surface-charcoal py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C7A45D]">Next Step</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Have a challenge worth solving?
          </h2>
          <p className="text-base sm:text-xl text-slate-300 max-w-xl mx-auto leading-relaxed">
            Let’s look at it from a different angle.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/start-project"
              className="btn-gold w-full sm:w-auto"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/schedule"
              className="btn-secondary text-white border-white/30 hover:border-white w-full sm:w-auto"
            >
              <span>Schedule a Call</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
