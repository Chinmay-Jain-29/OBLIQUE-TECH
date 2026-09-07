'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { obliqueStore } from '@/lib/store';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  MessageCircle, 
  Layers, 
  ShieldCheck, 
  Rocket, 
  Code2, 
  Cpu, 
  Smartphone, 
  Globe 
} from 'lucide-react';

const PROJECT_TYPES = [
  { id: 'web-app', label: 'Web Application', icon: <Globe className="w-5 h-5 text-cyan-400" />, desc: 'Modern responsive SaaS or customer portal' },
  { id: 'mobile-app', label: 'Mobile Application', icon: <Smartphone className="w-5 h-5 text-amber-400" />, desc: 'iOS & Android cross-platform solution' },
  { id: 'ai-product', label: 'AI Product / Automation', icon: <Cpu className="w-5 h-5 text-violet-400" />, desc: 'Applied LLM, RAG or predictive model' },
  { id: 'custom-software', label: 'Enterprise Software', icon: <Code2 className="w-5 h-5 text-emerald-400" />, desc: 'Tailored backend, internal tools or APIs' },
  { id: 'saas-mvp', label: 'New Startup MVP', icon: <Rocket className="w-5 h-5 text-amber-400" />, desc: 'Rapid prototype built to validate scale' },
  { id: 'other', label: 'Other Technology Need', icon: <Layers className="w-5 h-5 text-slate-400" />, desc: 'Consulting, audit, or unique requirements' },
];

const SERVICES_LIST = [
  'UI/UX Design & Prototyping',
  'Full-Stack Development',
  'AI / LLM Integration & Automation',
  'Architecture & Cloud Infrastructure',
  'Legacy System Modernization',
  'Technical SEO & Performance Audit'
];

const TIMELINES = [
  { id: 'urgent', label: 'Urgent (< 1 Month)', desc: 'Immediate kickoff required' },
  { id: 'standard', label: '1 to 3 Months', desc: 'Typical agile sprint roadmap' },
  { id: 'medium', label: '3 to 6 Months', desc: 'Comprehensive enterprise scope' },
  { id: 'flexible', label: 'Flexible / Discovery Phase', desc: 'Scoping & planning first' },
];

export default function StartProjectPage() {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0].label);
  const [servicesNeeded, setServicesNeeded] = useState<string[]>([SERVICES_LIST[0], SERVICES_LIST[1]]);
  const [coreObjective, setCoreObjective] = useState('');
  const [keyFeatures, setKeyFeatures] = useState('');
  const [timeline, setTimeline] = useState(TIMELINES[1].label);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (srv: string) => {
    if (servicesNeeded.includes(srv)) {
      setServicesNeeded(servicesNeeded.filter((s) => s !== srv));
    } else {
      setServicesNeeded([...servicesNeeded, srv]);
    }
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setLoading(true);
    await obliqueStore.submitProjectWizard({
      projectType,
      servicesNeeded,
      coreObjective,
      keyFeatures,
      timeline,
      name,
      email,
      phone,
      company
    });
    setLoading(false);
    setSubmitted(true);
  };

  const settings = obliqueStore.getSettings();
  const cleanWhatsappNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Discovery Wizard</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Start a Project.
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Tell us about what you are looking to build. We assess technical feasibility, architecture requirements, and timeline without artificial price guessing.
        </p>
      </div>

      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-white/10 shadow-2xl relative">
        {/* Progress Bar */}
        {!submitted && (
          <div className="mb-8 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Step {step} of 5</span>
              <span className="text-cyan-400 font-semibold font-mono">
                {Math.round((step / 5) * 100)}% Completed
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-amber-400 transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {submitted ? (
          <div className="text-center py-12 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Project Scope Received</h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. Your project requirements for <strong>{projectType}</strong> have been recorded in our technical system.
              </p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                An engineering lead will review your objectives and prepare an architectural recommendation.
              </p>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={`https://wa.me/${cleanWhatsappNumber}?text=Hello%20ObliqueTech,%20I%20just%20completed%20the%20Project%20Discovery%20Wizard%20for%20a%20${encodeURIComponent(projectType)}%20under%20the%20name%20${encodeURIComponent(name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discuss on WhatsApp</span>
              </a>

              <Link
                href="/portfolio"
                className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition-colors"
              >
                Explore Case Studies
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* STEP 1: What are you building? */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white">What are you looking to build?</h2>
                  <p className="text-xs text-slate-400 mt-1">Select the primary system category.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PROJECT_TYPES.map((pt) => (
                    <button
                      type="button"
                      key={pt.id}
                      onClick={() => setProjectType(pt.label)}
                      className={`p-5 rounded-2xl text-left border transition-all ${
                        projectType === pt.label
                          ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,210,255,0.2)]'
                          : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {pt.icon}
                        <span className="font-bold text-sm text-white">{pt.label}</span>
                      </div>
                      <p className="text-xs text-slate-400">{pt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: What services do you need? */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white">What specific capabilities do you require?</h2>
                  <p className="text-xs text-slate-400 mt-1">Select all disciplines that apply to your roadmap.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES_LIST.map((srv) => {
                    const isSelected = servicesNeeded.includes(srv);
                    return (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => toggleService(srv)}
                        className={`p-4 rounded-xl text-left text-xs font-semibold border flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-400 text-white shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                            : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        <span>{srv}</span>
                        {isSelected ? (
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-white/20 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: Tell us about the problem & objective */}
            {step === 3 && (
              <div className="space-y-6 text-xs">
                <div>
                  <h2 className="text-xl font-bold text-white">Tell us about the objective & bottlenecks</h2>
                  <p className="text-xs text-slate-400 mt-1">What core business challenge are you solving?</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">
                      Core Business Objective *
                    </label>
                    <textarea
                      rows={3}
                      value={coreObjective}
                      onChange={(e) => setCoreObjective(e.target.value)}
                      placeholder="e.g. Automate multi-warehouse inventory reconciliation and eliminate manual paper orders..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">
                      Key Features or Architectural Constraints
                    </label>
                    <textarea
                      rows={3}
                      value={keyFeatures}
                      onChange={(e) => setKeyFeatures(e.target.value)}
                      placeholder="e.g. Offline sync support, barcode scanner integration, role-based access, HIPAA compliance..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Timeline */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white">What is your expected timeline?</h2>
                  <p className="text-xs text-slate-400 mt-1">Select the deployment window you are targeting.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {TIMELINES.map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setTimeline(t.label)}
                      className={`p-5 rounded-2xl text-left border transition-all ${
                        timeline === t.label
                          ? 'bg-violet-500/15 border-violet-400 text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]'
                          : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <span className="font-bold text-sm text-white block mb-1">{t.label}</span>
                      <span className="text-xs text-slate-400">{t.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: Contact Details */}
            {step === 5 && (
              <form onSubmit={handleSubmit} className="space-y-6 text-xs">
                <div>
                  <h2 className="text-xl font-bold text-white">Where should we deliver our recommendation?</h2>
                  <p className="text-xs text-slate-400 mt-1">We respect your privacy. No unsolicited promotional spam.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Morgan Vance"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">Work Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="morgan@enterprise.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 345-6789"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">Company / Startup Name</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Vance Logistics Systems"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-slate-400 space-y-1 text-[11px]">
                  <p><strong>Summary of Inquiry:</strong> {projectType} with {servicesNeeded.length} selected service(s), targeting {timeline}.</p>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={loading || !name || !email || !phone}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 disabled:opacity-40 transition-all flex items-center gap-2"
                  >
                    <span>{loading ? 'Submitting...' : "Let's Build It"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Navigation buttons for steps 1-4 */}
            {step < 5 && (
              <div className="pt-8 border-t border-white/10 mt-8 flex justify-between items-center">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-7 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
