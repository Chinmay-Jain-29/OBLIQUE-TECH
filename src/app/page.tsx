'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  obliqueStore, 
  INITIAL_SERVICES, 
  INITIAL_PORTFOLIO, 
  INITIAL_POSTS, 
  INITIAL_FAQS 
} from '@/lib/store';
import { 
  ServiceItem, 
  PortfolioProject, 
  BlogPost, 
  FAQItem 
} from '@/types';
import { 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Code, 
  Cpu, 
  Globe, 
  Compass, 
  Brain, 
  Layout, 
  Smartphone, 
  TrendingUp, 
  ChevronDown, 
  Shield, 
  Clock, 
  Target, 
  Zap, 
  MessageSquarePlus, 
  Eye, 
  ExternalLink,
  Users,
  Award,
  Lightbulb,
  Building,
  GraduationCap
} from 'lucide-react';
import { FeedbackModal } from '@/components/ui/FeedbackModal';

export default function HomePage() {
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>(INITIAL_PORTFOLIO);
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [faqs, setFaqs] = useState<FAQItem[]>(INITIAL_FAQS);
  const [faqCategory, setFaqCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [techTab, setTechTab] = useState<'frontend' | 'backend' | 'database' | 'ai' | 'cloud'>('frontend');
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setServices(obliqueStore.getServices());
    setPortfolio(obliqueStore.getPortfolio());
    setPosts(obliqueStore.getPosts());
    setFaqs(obliqueStore.getFAQs());
  }, []);

  // Signature Oblique Interactive Perspective Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    let angleOffset = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw oblique perspective grid lines
      angleOffset += 0.003;
      const lines = 14;
      ctx.lineWidth = 1;

      for (let i = 0; i <= lines; i++) {
        const progress = i / lines;
        const xStart = progress * width;
        const xEnd = (progress + Math.sin(angleOffset) * 0.15) * width;

        // Gradient for lines
        const grad = ctx.createLinearGradient(xStart, 0, xEnd, height);
        grad.addColorStop(0, 'rgba(0, 210, 255, 0.03)');
        grad.addColorStop(0.5, 'rgba(245, 158, 11, 0.15)');
        grad.addColorStop(1, 'rgba(139, 92, 246, 0.05)');

        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(xStart, 0);
        ctx.lineTo(xEnd, height);
        ctx.stroke();
      }

      // Horizontal perspective planes
      for (let j = 1; j <= 8; j++) {
        const y = Math.pow(j / 8, 1.8) * height;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Glowing floating focal node
      const focalX = width * 0.6 + Math.cos(angleOffset * 1.5) * 40;
      const focalY = height * 0.45 + Math.sin(angleOffset * 1.2) * 30;

      const radialGrad = ctx.createRadialGradient(focalX, focalY, 2, focalX, focalY, 140);
      radialGrad.addColorStop(0, 'rgba(0, 210, 255, 0.25)');
      radialGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.08)');
      radialGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = radialGrad;
      ctx.beginPath();
      ctx.arc(focalX, focalY, 140, 0, Math.PI * 2);
      ctx.fill();

      // Oblique diamond angle highlight
      ctx.save();
      ctx.translate(focalX, focalY);
      ctx.rotate(Math.PI / 4 + Math.sin(angleOffset) * 0.2);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-25, -25, 50, 50);
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-amber-400" />;
      case 'Brain': return <Brain className="w-5 h-5 text-violet-400" />;
      case 'Layout': return <Layout className="w-5 h-5 text-amber-400" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'Code': return <Code className="w-5 h-5 text-violet-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-cyan-400" />;
      default: return <Cpu className="w-5 h-5 text-amber-400" />;
    }
  };

  const filteredFaqs = faqCategory === 'All' 
    ? faqs 
    : faqs.filter(f => f.category === faqCategory);

  return (
    <div className="relative overflow-hidden">
      {/* ============================================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background Canvas Visual */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-70">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>

        {/* Ambient Top Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-amber-500/10 to-violet-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Oblique Motif Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-inner">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-300">
              Technology From a Different Angle
            </span>
          </div>

          {/* Primary Tagline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
              See Business{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-cyan-300 to-violet-400">
                Differently.
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
              Technology solutions built around your ambition.
            </p>
          </div>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            ObliqueTech helps businesses turn ideas, challenges, and opportunities into scalable digital experiences through software, AI, design, and technology consulting.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/start-project"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/portfolio"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm bg-white/5 hover:bg-white/10 text-white border border-white/15 transition-all hover:border-cyan-400/50 flex items-center justify-center gap-2"
            >
              <span>Explore Our Work</span>
              <ArrowUpRight className="w-4 h-4 text-cyan-400" />
            </Link>

            <Link
              href="/schedule"
              className="w-full sm:w-auto text-xs text-slate-400 hover:text-cyan-300 py-2 sm:px-3 transition-colors flex items-center justify-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Schedule a Call (30m)</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. HERO TRUST STRIP (NO FAKE METRICS - HONEST PRINCIPLES) */}
      {/* ============================================================ */}
      <section className="relative z-10 border-y border-white/10 bg-slate-950/60 backdrop-blur-md py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] uppercase tracking-widest text-center text-slate-500 font-semibold mb-4">
            Built on Core Engineering Principles
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {[
              { title: 'Client-Centric Approach', sub: 'Driven by your problem' },
              { title: 'Quality-Driven Development', sub: 'Reliable engineering' },
              { title: 'Transparent Communication', sub: 'Clear milestones' },
              { title: 'Scalable Technology', sub: 'Built to evolve' },
              { title: 'Global Collaboration', sub: 'Worldwide delivery' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-xs sm:text-sm font-bold text-slate-200 tracking-tight">
                  {item.title}
                </div>
                <div className="text-[11px] text-slate-500">
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. PROBLEM / SOLUTION SECTION */}
      {/* ============================================================ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Problem Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Market Reality</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              The Digital World Moves Fast.{' '}
              <span className="text-cyan-400">Your Business Should Too.</span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Modern businesses face unprecedented pressure. Off-the-shelf software is rigid, legacy systems are brittle, and AI promises often get lost in marketing buzz. To remain competitive, organizations require pragmatic technology partners who build systems that directly align with commercial reality.
            </p>

            <blockquote className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-amber-400 text-slate-300 text-sm italic">
              “We turn complex business challenges into practical technology solutions.”
            </blockquote>
          </div>

          {/* Right Column: 4-Step Animated Flow (Problem -> Strategy -> Technology -> Growth) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                step: '01',
                phase: 'Problem',
                desc: 'Identifying operational bottlenecks, broken user journeys, or unscalable systems.',
                color: 'text-amber-400',
                border: 'hover:border-amber-400/40',
                badgeBg: 'bg-amber-400/10'
              },
              {
                step: '02',
                phase: 'Strategy',
                desc: 'Scoping realistic architectural blueprints and clear milestone roadmaps.',
                color: 'text-cyan-400',
                border: 'hover:border-cyan-400/40',
                badgeBg: 'bg-cyan-400/10'
              },
              {
                step: '03',
                phase: 'Technology',
                desc: 'Engineering with type-safe, scalable codebases and zero unnecessary dependencies.',
                color: 'text-violet-400',
                border: 'hover:border-violet-400/40',
                badgeBg: 'bg-violet-400/10'
              },
              {
                step: '04',
                phase: 'Growth',
                desc: 'Deploying reliable platforms that scale transaction volume and customer adoption.',
                color: 'text-emerald-400',
                border: 'hover:border-emerald-400/40',
                badgeBg: 'bg-emerald-400/10'
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-slate-900/60 border border-white/10 transition-all duration-300 ${item.border} hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${item.badgeBg} ${item.color}`}>
                    {item.phase}
                  </span>
                  <span className="text-xs font-mono text-slate-600 font-bold">{item.step}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. SERVICES SHOWCASE */}
      {/* ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Comprehensive Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered For Impact.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From modern web platforms and distributed backend architectures to applied AI integrations and intuitive design systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(0,210,255,0.1)] hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-slate-400 border border-white/5">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {service.shortDescription}
                </p>

                <div className="pt-2">
                  <p className="text-[11px] font-semibold text-slate-300 mb-2">Business Value:</p>
                  <p className="text-xs text-slate-400 bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                    {service.businessValue}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {service.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-400 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors"
                >
                  <span>Explore Capabilities</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 text-xs font-semibold transition-all hover:scale-105"
          >
            <span>Explore All 7 Services In Detail</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. WHY CHOOSE OBLIQUETECH */}
      {/* ============================================================ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950/80 border-y border-white/10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 text-xs font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span>Why ObliqueTech</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              A Relationship Built on Clarity.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              We approach engineering not as a transactional ticket queue, but as long-term strategic stewards of your product architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Customer-Centric',
                desc: 'Technology begins with understanding your actual operational bottleneck, not pushing unnecessary tools.',
                icon: <Target className="w-6 h-6 text-amber-400" />,
                accent: 'border-amber-400/20 hover:border-amber-400/40'
              },
              {
                title: 'Commitment',
                desc: 'If we commit to an architecture, scope, or delivery milestone, we take that commitment seriously.',
                icon: <CheckCircle2 className="w-6 h-6 text-cyan-400" />,
                accent: 'border-cyan-400/20 hover:border-cyan-400/40'
              },
              {
                title: 'Quality',
                desc: 'Focus on delivering reliable, type-safe, and thoroughly tested engineering rather than fragile MVPs.',
                icon: <Award className="w-6 h-6 text-violet-400" />,
                accent: 'border-violet-400/20 hover:border-violet-400/40'
              },
              {
                title: 'Affordable Technology',
                desc: 'Professional enterprise-grade solutions without bloated agency markups or synthetic complexity.',
                icon: <Zap className="w-6 h-6 text-amber-400" />,
                accent: 'border-amber-400/20 hover:border-amber-400/40'
              },
              {
                title: 'Transparency',
                desc: 'Clear communication, weekly working demos, and direct access to the engineers writing your code.',
                icon: <Eye className="w-6 h-6 text-cyan-400" />,
                accent: 'border-cyan-400/20 hover:border-cyan-400/40'
              },
              {
                title: 'Long-Term Thinking',
                desc: 'Architectures engineered to adapt gracefully as your users, transactions, and business scale.',
                icon: <Building className="w-6 h-6 text-violet-400" />,
                accent: 'border-violet-400/20 hover:border-violet-400/40'
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-8 rounded-2xl bg-slate-900/60 border ${card.accent} transition-all duration-300 hover:-translate-y-1 space-y-4`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {card.icon}
                </div>
                <h3 className="text-base font-bold text-white tracking-wide">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. TECHNOLOGY ECOSYSTEM */}
      {/* ============================================================ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Modern Technology Stack</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Pragmatic Engineering Tools.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            We work only with proven, battle-tested technologies that deliver speed, developer velocity, and long-term security.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { key: 'frontend', label: 'Frontend' },
            { key: 'backend', label: 'Backend & APIs' },
            { key: 'database', label: 'Database & Storage' },
            { key: 'ai', label: 'AI & Machine Learning' },
            { key: 'cloud', label: 'Cloud & Infrastructure' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setTechTab(tab.key as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                techTab === tab.key
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,210,255,0.3)]'
                  : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {techTab === 'frontend' && [
            'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'HTML5 / CSS3', 'Figma'
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-white/10 text-center space-y-1">
              <span className="text-xs font-bold text-white block">{item}</span>
              <span className="text-[10px] text-cyan-400">High-Performance UI</span>
            </div>
          ))}

          {techTab === 'backend' && [
            'Node.js', 'Python', 'FastAPI', 'Go', 'GraphQL', 'REST APIs'
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-white/10 text-center space-y-1">
              <span className="text-xs font-bold text-white block">{item}</span>
              <span className="text-[10px] text-amber-400">Scalable Microservices</span>
            </div>
          ))}

          {techTab === 'database' && [
            'PostgreSQL', 'Supabase', 'Redis', 'TimescaleDB', 'pgvector', 'Neo4j'
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-white/10 text-center space-y-1">
              <span className="text-xs font-bold text-white block">{item}</span>
              <span className="text-[10px] text-violet-400">ACID & Scalability</span>
            </div>
          ))}

          {techTab === 'ai' && [
            'PyTorch', 'LangChain', 'LlamaIndex', 'Hugging Face', 'FastAPI', 'Claude / OpenAI APIs'
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-white/10 text-center space-y-1">
              <span className="text-xs font-bold text-white block">{item}</span>
              <span className="text-[10px] text-cyan-400">Applied Intelligence</span>
            </div>
          ))}

          {techTab === 'cloud' && [
            'Docker', 'AWS', 'Google Cloud', 'GitHub Actions', 'Terraform', 'Vercel'
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-white/10 text-center space-y-1">
              <span className="text-xs font-bold text-white block">{item}</span>
              <span className="text-[10px] text-emerald-400">CI/CD & DevOps</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. SELECTED PORTFOLIO (3 COMPLETED, 2 ONGOING) */}
      {/* ============================================================ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10" id="portfolio">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>Demonstrated Capability</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Selected Projects.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              Authentic engineering across web, mobile, SaaS, and AI systems. 3 completed solutions and 2 currently in active sprint milestones.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
          >
            <span>View Full Portfolio Index</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolio.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between rounded-2xl bg-slate-900/50 border border-white/10 overflow-hidden hover:border-amber-400/40 transition-all duration-300 shadow-xl hover:-translate-y-1"
            >
              {/* Card Header & Status Banner */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/5 text-slate-300 border border-white/10">
                    {item.category}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.status === 'completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {item.status === 'completed' ? '✓ Completed' : '● Ongoing Sprint'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.shortDescription}
                </p>

                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-slate-300">Industry: </span>
                  <span className="text-xs text-slate-400">{item.clientIndustry}</span>
                </div>

                <div className="pt-2">
                  <p className="text-[11px] font-semibold text-slate-300 mb-1.5">Key Highlights:</p>
                  <ul className="space-y-1 text-xs text-slate-400">
                    {item.metricsOrHighlights.slice(0, 2).map((metric, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies & Case Study Link */}
              <div className="p-6 pt-0 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {item.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-400 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10">
                  <Link
                    href={`/portfolio/${item.slug}`}
                    className="inline-flex items-center justify-between w-full text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowUpRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. OUR PROCESS (01 - 07 TIMELINE) */}
      {/* ============================================================ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950/90 border-y border-white/10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Disciplined Execution</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Our Development Process.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              A structured, transparent engineering lifecycle designed to eliminate surprises and guarantee production stability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Discover', desc: 'Deep dive into your business logic, audience, constraints, and success criteria.' },
              { step: '02', title: 'Strategize', desc: 'Define system blueprints, data models, technical stacks, and risk mitigations.' },
              { step: '03', title: 'Design', desc: 'Craft Figma wireframes, interactive prototypes, and accessible design systems.' },
              { step: '04', title: 'Build', desc: 'Develop with type-safe, modular code in transparent weekly sprint iterations.' },
              { step: '05', title: 'Test', desc: 'Rigorous automated unit, integration, performance, and security testing.' },
              { step: '06', title: 'Launch', desc: 'Zero-downtime deployment, DNS provisioning, and live telemetry setup.' },
              { step: '07', title: 'Grow', desc: 'Continuous SLA monitoring, security patching, and strategic scaling.' },
            ].map((proc, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-cyan-400/40 transition-all duration-300 relative group"
              >
                <div className="text-2xl font-black font-mono text-cyan-400/60 group-hover:text-cyan-400 transition-colors mb-2">
                  {proc.step}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{proc.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{proc.desc}</p>
              </div>
            ))}

            {/* Final CTA Card in Grid */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-cyan-500/10 border border-amber-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">Next Step</span>
                <h3 className="text-base font-bold text-white mb-2">Ready to kick off your sprint?</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Book a free introductory scoping call with an engineering lead.
                </p>
              </div>
              <Link
                href="/schedule"
                className="mt-4 inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md"
              >
                Schedule Scoping Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. OBLIQUE ORIGIN STORY & PHILOSOPHY */}
      {/* ============================================================ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900/90 border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Where Oblique Began</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Bridging The Experience Gap.
            </h2>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                The word <strong className="text-amber-400 font-semibold">Oblique</strong> means looking at something from an angle—choosing a path that departs from conventional convention.
              </p>
              <p>
                ObliqueTech originally emerged from observing a glaring contradiction in the technology sector: <em className="text-slate-200">companies consistently demand production experience, while fresh engineering graduates are afforded few real opportunities to obtain it.</em>
              </p>
              <p>
                To address this gap, Oblique created an ecosystem centered on real-world projects, practical mentorship, hackathons, and direct collaboration with veteran practitioners.
              </p>
              <p className="text-slate-400">
                Today, that same founding conviction drives our entire engineering firm: we don’t blindly follow traditional, bloated agency models. We think differently, engineer pragmatically, and build scalable technology solutions that create lasting opportunities globally.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/15 transition-colors"
              >
                <span>Read Full Company Story & Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. LATEST INSIGHTS / BLOG PREVIEW */}
      {/* ============================================================ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Thought Leadership</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Oblique Insights.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              Architectural deep-dives, applied AI analysis, and pragmatic engineering strategy from our core technical team.
            </p>
          </div>

          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
          >
            <span>Browse All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => (
            <div
              key={post.id}
              className="group flex flex-col justify-between rounded-2xl bg-slate-900/50 border border-white/10 overflow-hidden hover:border-cyan-400/40 transition-all duration-300 shadow-xl hover:-translate-y-1 p-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-semibold">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readingTimeMinutes} min read
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <Link
                  href={`/insights/${post.slug}`}
                  className="text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 inline-flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 11. TESTIMONIALS / REVIEWS SYSTEM */}
      {/* ============================================================ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950/80 border-y border-white/10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
              <Users className="w-3.5 h-3.5" />
              <span>Client Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Verified Client Impressions.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              We adhere strictly to factual transparency. All client reviews undergo verification before publication.
            </p>
          </div>

          {/* Clean State with Active Feedback Invitation */}
          <div className="max-w-2xl mx-auto text-center p-8 rounded-2xl bg-slate-900/60 border border-white/10 space-y-6">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <MessageSquarePlus className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white">Have You Collaborated with ObliqueTech?</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
                We value honest partner and client feedback. Share your experience regarding our technical delivery, speed, and architectural clarity.
              </p>
            </div>
            <div>
              <button
                onClick={() => setFeedbackModalOpen(true)}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
              >
                Submit Client Feedback
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 12. FAQ ACCORDION */}
      {/* ============================================================ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions.
          </h2>
          <p className="text-slate-400 text-sm">
            Everything you need to know about our engagement models, tech stack, and workflow.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {['All', 'General', 'Services', 'Process', 'Security & Tech', 'Pricing & Engagement'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFaqCategory(cat)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  faqCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredFaqs.slice(0, 8).map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-xl bg-slate-900/60 border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-bold text-white tracking-wide">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/faq"
            className="text-xs font-semibold text-cyan-400 hover:underline"
          >
            View All Frequently Asked Questions →
          </Link>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 13. SIGNATURE BRAND PERSPECTIVE MOMENT */}
      {/* ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-y border-white/10 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
            The Oblique Philosophy
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-bold text-slate-300">
            <span>Straight Path</span>
            <span className="text-slate-600">→</span>
            <span className="text-rose-400">Market Bottleneck</span>
            <span className="text-slate-600">→</span>
            <span className="text-amber-400 underline decoration-amber-400/50 decoration-2">Shift Perspective</span>
            <span className="text-slate-600">→</span>
            <span className="text-cyan-400 font-extrabold uppercase tracking-wider">OBLIQUE</span>
            <span className="text-slate-600">→</span>
            <span className="text-emerald-400 font-black">Scalable Solution</span>
          </div>
          <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
            When you view a problem from an angle that others overlook, the solution becomes obvious. We bring this perspective to every line of code we write.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 14. FINAL CALL TO ACTION (CTA) */}
      {/* ============================================================ */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-8 relative">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Your next move starts from a{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-cyan-300 to-violet-400">
              different angle.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Whether you are launching something new, transforming an existing business, or solving a challenge you have not been able to solve alone — let’s explore what’s possible.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/start-project"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all hover:scale-105 active:scale-95"
          >
            Start a Project
          </Link>

          <Link
            href="/schedule"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all hover:scale-105"
          >
            Talk to ObliqueTech
          </Link>
        </div>
      </section>

      {/* Public Feedback Modal */}
      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
      />
    </div>
  );
}
