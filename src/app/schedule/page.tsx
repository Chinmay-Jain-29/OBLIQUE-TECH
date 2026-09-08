'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { obliqueStore } from '@/lib/store';
import { Clock, CheckCircle2, MessageCircle, Mail, ArrowRight } from 'lucide-react';
import { PhoneInput, PhoneInputValue } from '@/components/ui/PhoneInput';

const TOPICS = [
  'Start a Project',
  'Web Development',
  'AI/ML',
  'UI/UX',
  'IT Consulting',
  'Software',
  'Mobile App',
  'Partnership',
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
  const [topic, setTopic] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneE164, setPhoneE164] = useState('');
  const [company, setCompany] = useState('');
  const [requirements, setRequirements] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState(TIME_SLOTS[0]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !preferredDate) return;

    setLoading(true);
    await obliqueStore.submitCallRequest({
      name,
      email,
      phone: phoneE164 || phone,
      businessName: company,
      reason: topic,
      serviceRequired: topic,
      projectType: topic,
      preferredDate,
      preferredTime,
      durationMinutes: 45,
      requirements
    });
    setLoading(false);
    setSubmitted(true);
  };

  const settings = obliqueStore.getSettings();
  const cleanWhatsappNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="flex flex-col">
      {/* Header (Surface: Oblique Black) */}
      <section className="surface-black pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[#C7A45D]">Consultation</span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Schedule a Call.
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-xl leading-relaxed">
            A focused 30–45 minute conversation with an ObliqueTech engineering lead. No sales pitches—just practical technical solutions.
          </p>
        </div>
      </section>

      {/* Booking Form (Surface: Warm White) */}
      <section className="surface-warm py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-3xl mx-auto">
          <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#16181E] border border-slate-200 dark:border-white/10 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-[#20A779] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    Consultation Requested
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    We have logged your requested slot for <strong>{preferredDate}</strong> ({preferredTime}). Our team will confirm the calendar invite via email.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link href="/" className="btn-secondary text-xs">
                    Back to Home
                  </Link>
                  <a
                    href={`https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(`Hi ObliqueTech, I just requested a call for ${preferredDate} (${preferredTime}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#20A779] text-white text-xs font-semibold hover:bg-emerald-600 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirm via WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Discussion Topic */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    1. What would you like to discuss?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {TOPICS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTopic(t)}
                        className={`p-3 rounded-lg text-xs font-medium text-left border transition-all ${
                          topic === t
                            ? 'border-[#3B82F6] bg-blue-50/50 dark:bg-blue-500/10 text-[#3B82F6] font-semibold'
                            : 'border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Contact Details */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    2. Your details
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6]"
                      />
                    </div>
                    <div>
                      <label htmlFor="schedule-phone" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Phone Number
                      </label>
                      <PhoneInput
                        id="schedule-phone"
                        value={phone}
                        onChange={(val: PhoneInputValue) => {
                          setPhone(val.phoneNumber);
                          setPhoneE164(val.phoneE164);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Acme Corp"
                        className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Brief Requirements or Goals
                    </label>
                    <textarea
                      rows={3}
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      placeholder="What are the main topics you want to cover?"
                      className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6]"
                    />
                  </div>
                </div>

                {/* 3. Preferred Time Slot */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    3. Preferred time (30–45 mins)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Preferred Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#3B82F6]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Time Slot <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#3B82F6]"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Direct Alternative Options */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <a
                      href={`https://wa.me/${cleanWhatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#20A779] flex items-center gap-1 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Direct</span>
                    </a>
                    <span>•</span>
                    <a
                      href={`mailto:${settings.email}`}
                      className="hover:text-[#3B82F6] flex items-center gap-1 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email Directly</span>
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary text-xs w-full sm:w-auto"
                  >
                    <span>{loading ? 'Booking...' : 'Confirm Call Request'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
