'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { obliqueStore } from '@/lib/store';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  MessageCircle, 
  Layers, 
  Globe, 
  Smartphone, 
  Cpu, 
  Code2, 
  Rocket, 
  FileText,
  Clock
} from 'lucide-react';

const PROJECT_TYPES = [
  { id: 'website', label: 'Website' },
  { id: 'web-app', label: 'Web Application' },
  { id: 'mobile-app', label: 'Mobile App' },
  { id: 'software', label: 'Software' },
  { id: 'ai-ml', label: 'AI / ML Solution' },
  { id: 'saas-product', label: 'SaaS / Product' },
  { id: 'other', label: 'Other' },
];

const SERVICES_LIST = [
  'Web Development',
  'UI/UX Design',
  'AI/ML',
  'IT Consulting',
  'Software Development',
  'Mobile App Development',
  'Digital Marketing',
  'Not Sure Yet'
];

const TIMELINE_OPTIONS = [
  'As soon as possible',
  'Within 1 month',
  'Within 1–3 months',
  '3–6 months',
  'Just exploring for now',
  'Not decided yet'
];

export default function StartProjectPage() {
  const [step, setStep] = useState(1);
  
  // COMPLETELY NEUTRAL INITIAL STATE — ZERO PRE-SELECTIONS
  const [projectType, setProjectType] = useState<string>('');
  const [servicesNeeded, setServicesNeeded] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string>('');
  const [projectDetails, setProjectDetails] = useState<string>('');
  
  // Contact details
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [website, setWebsite] = useState<string>('');

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
      projectType: projectType || 'Not specified',
      servicesNeeded: servicesNeeded.length > 0 ? servicesNeeded : ['Not specified'],
      coreObjective: projectDetails,
      keyFeatures: website ? `Website: ${website}` : '',
      timeline: timeline || 'Not decided yet',
      name,
      email,
      phone,
      company: company || 'Not specified'
    });
    setLoading(false);
    setSubmitted(true);
  };

  const settings = obliqueStore.getSettings();
  const cleanWhatsappNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');

  if (submitted) {
    return (
      <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto text-center space-y-8 animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Thanks. We’ve got it.
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Your project details have been received. Our team will review them and get in touch.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-lg border border-slate-300 dark:border-white/20 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
          >
            Back to Website
          </Link>
          <a
            href={`https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(`Hi ObliqueTech, I just submitted a project request (${name}).`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#20A779] text-white text-xs font-semibold hover:bg-emerald-600 transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-10">
      {/* Progress Indicator */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Step {step} of 5</span>
          <span>
            {step === 1 && 'What are you building?'}
            {step === 2 && 'What do you need?'}
            {step === 3 && 'Start timeline'}
            {step === 4 && 'Project details'}
            {step === 5 && 'Your contact info'}
          </span>
        </div>
        <div className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#3B82F6] transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#121317] border border-slate-200 dark:border-white/10 shadow-sm">
        {/* STEP 1: What are you building? */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Tell us what you’re building.
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
                Select the option that best describes your project.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {PROJECT_TYPES.map((pt) => {
                const isSelected = projectType === pt.label;
                return (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => setProjectType(pt.label)}
                    className={`p-4 rounded-xl text-left border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#3B82F6] bg-blue-50/50 dark:bg-blue-500/10 text-[#3B82F6] font-semibold'
                        : 'border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20'
                    }`}
                  >
                    <span className="text-sm">{pt.label}</span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-[#3B82F6] bg-[#3B82F6]'
                          : 'border-slate-300 dark:border-white/20'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-6 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                disabled={!projectType}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold text-white transition-all ${
                  projectType
                    ? 'bg-[#3B82F6] hover:bg-blue-600 cursor-pointer shadow-xs'
                    : 'bg-slate-300 dark:bg-white/10 cursor-not-allowed opacity-60'
                }`}
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: What do you need? */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                What do you need?
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
                Choose the services you are looking for (select all that apply).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {SERVICES_LIST.map((srv) => {
                const isSelected = servicesNeeded.includes(srv);
                return (
                  <button
                    key={srv}
                    type="button"
                    onClick={() => toggleService(srv)}
                    className={`p-4 rounded-xl text-left border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#3B82F6] bg-blue-50/50 dark:bg-blue-500/10 text-[#3B82F6] font-semibold'
                        : 'border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20'
                    }`}
                  >
                    <span className="text-sm">{srv}</span>
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                        isSelected
                          ? 'border-[#3B82F6] bg-[#3B82F6] text-white'
                          : 'border-slate-300 dark:border-white/20'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={servicesNeeded.length === 0}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold text-white transition-all ${
                  servicesNeeded.length > 0
                    ? 'bg-[#3B82F6] hover:bg-blue-600 cursor-pointer shadow-xs'
                    : 'bg-slate-300 dark:bg-white/10 cursor-not-allowed opacity-60'
                }`}
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: When would you like to get started? */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                When would you like to get started?
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
                Help us understand your planned timing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {TIMELINE_OPTIONS.map((opt) => {
                const isSelected = timeline === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setTimeline(opt)}
                    className={`p-4 rounded-xl text-left border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#3B82F6] bg-blue-50/50 dark:bg-blue-500/10 text-[#3B82F6] font-semibold'
                        : 'border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20'
                    }`}
                  >
                    <span className="text-sm">{opt}</span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-[#3B82F6] bg-[#3B82F6]'
                          : 'border-slate-300 dark:border-white/20'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!timeline}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold text-white transition-all ${
                  timeline
                    ? 'bg-[#3B82F6] hover:bg-blue-600 cursor-pointer shadow-xs'
                    : 'bg-slate-300 dark:bg-white/10 cursor-not-allowed opacity-60'
                }`}
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Tell us a little about your project */}
        {step === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Tell us a little about your project.
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
                What are you trying to build or improve?
              </p>
            </div>

            <div className="pt-2">
              <textarea
                rows={5}
                value={projectDetails}
                onChange={(e) => setProjectDetails(e.target.value)}
                placeholder="What are you trying to build or improve?"
                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div className="pt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!projectDetails.trim()}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold text-white transition-all ${
                  projectDetails.trim()
                    ? 'bg-[#3B82F6] hover:bg-blue-600 cursor-pointer shadow-xs'
                    : 'bg-slate-300 dark:bg-white/10 cursor-not-allowed opacity-60'
                }`}
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Contact Information */}
        {step === 5 && (
          <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Where can we reach you?
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
                We respect your time. An engineering lead will review your submission and reply with practical next steps.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Morgan"
                  className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Business Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Business / Company Name
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Corp"
                  className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Current Website (Optional)
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                disabled={loading || !name || !email || !phone}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold text-white transition-all ${
                  name && email && phone && !loading
                    ? 'bg-[#3B82F6] hover:bg-blue-600 cursor-pointer shadow-xs'
                    : 'bg-slate-300 dark:bg-white/10 cursor-not-allowed opacity-60'
                }`}
              >
                <span>{loading ? 'Submitting...' : 'Submit Project'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
