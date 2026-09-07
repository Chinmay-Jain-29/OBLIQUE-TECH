'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { obliqueStore } from '@/lib/store';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight, 
  Video, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

const CONTACT_REASONS = [
  'Start a Project',
  'Web Development',
  'Mobile Application',
  'AI / ML Project',
  'UI/UX Design',
  'IT Consulting & Architecture',
  'Digital Transformation',
  'Strategic Partnership',
  'Student / Project Inquiry',
  'Other'
];

const TIME_SLOTS = [
  '09:00 AM - 09:45 AM',
  '11:00 AM - 11:45 AM',
  '02:00 PM - 02:45 PM',
  '04:00 PM - 04:45 PM',
  '06:00 PM - 06:45 PM'
];

export default function SchedulePage() {
  const [reason, setReason] = useState('Start a Project');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState(TIME_SLOTS[0]);
  const [requirements, setRequirements] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Default duration based on reason (30 or 45 mins)
  const duration = ['Start a Project', 'IT Consulting & Architecture', 'Digital Transformation'].includes(reason)
    ? 45 
    : 30;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !preferredDate) return;

    setLoading(true);
    await obliqueStore.submitCallRequest({
      name,
      email,
      phone,
      businessName,
      reason,
      serviceRequired: reason,
      projectType: reason,
      preferredDate,
      preferredTime,
      durationMinutes: duration,
      requirements
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
          <Clock className="w-3.5 h-3.5" />
          <span>Introductory Technical Consultation</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Schedule a Call.
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Book a focused 30–45 minute conversation with an ObliqueTech engineering lead. No generic sales pitches—pure technical discovery and practical solutions.
        </p>
      </div>

      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-white/10 shadow-2xl">
        {submitted ? (
          <div className="text-center py-12 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Consultation Request Confirmed</h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. We have reserved your preferred slot for <strong>{preferredDate} ({preferredTime})</strong> for a {duration}-minute session.
              </p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                A calendar invitation with video conference credentials will be delivered to <strong>{email}</strong>.
              </p>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={`https://wa.me/${cleanWhatsappNumber}?text=Hi%20ObliqueTech,%20I%20just%20scheduled%20a%20call%20for%20${encodeURIComponent(preferredDate)}%20under%20the%20name%20${encodeURIComponent(name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <Link
                href="/"
                className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition-colors"
              >
                Return Home
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {/* 1. Reason Selection */}
            <div className="space-y-2">
              <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                1. What is the primary reason for this call? *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CONTACT_REASONS.map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setReason(r)}
                    className={`p-3 rounded-xl text-left font-medium transition-all ${
                      reason === r
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20 border-transparent'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-cyan-400 mt-1">
                Estimated duration: <strong>{duration} minutes</strong> based on your selected topic.
              </p>
            </div>

            {/* 2. Date & Time Selection */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                2. Select Preferred Date & Window *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Preferred Time Window *</label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Contact Details */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                3. Your Details (We never ask for budget upfront) *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jordan Mitchell"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Work Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Business / Organization Name</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Mitchell Logistics Ltd"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">
                  Brief Technical Context / Goals (Optional)
                </label>
                <textarea
                  rows={3}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Share any context on existing tech stack, bottlenecks, or specific expectations..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero spam guarantee. Strict privacy boundaries.</span>
              </div>

              <button
                type="submit"
                disabled={loading || !name || !email || !phone || !preferredDate}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 disabled:opacity-40 transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{loading ? 'Confirming...' : 'Schedule Technical Consultation'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
