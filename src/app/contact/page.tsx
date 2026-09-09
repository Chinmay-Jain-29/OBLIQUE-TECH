'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { obliqueStore } from '@/lib/store';
import { SiteSettings } from '@/types';
import { Mail, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { LinkedInIcon, TwitterXIcon, GitHubIcon, InstagramIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { PhoneInput, PhoneInputValue } from '@/components/ui/PhoneInput';

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings>(obliqueStore.getSettings());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneE164, setPhoneE164] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSettings(obliqueStore.getSettings());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    await obliqueStore.submitContact({
      name,
      email,
      phone: phoneE164 || phone,
      company,
      service: service || 'General Inquiry',
      message,
    });
    setLoading(false);
    setSubmitted(true);
  };

  const cleanWhatsappNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="surface-black pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[#C7A45D]">Get in Touch</span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Let’s discuss your project.
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
            Reach out with your requirements, ideas, or architectural challenges. We respond with clarity and direct engineering input.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="surface-warm py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight text-white">Direct Channels</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Contact our engineering team directly through any of our verified communication lines.
              </p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-[#3B82F6] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Email Us</div>
                  <a href={`mailto:${settings.email}`} className="text-xs text-[#3B82F6] hover:underline">
                    {settings.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-[#C7A45D] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Call Us</div>
                  <a href={`tel:${settings.phone}`} className="text-xs text-slate-300 hover:text-white">
                    {settings.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp with Official Icon & Professional Action */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between group hover:border-[#25D366]/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                    <WhatsAppIcon className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">WhatsApp</div>
                    <div className="text-[11px] text-slate-400 font-mono">+91 9225260237</div>
                  </div>
                </div>
                <a
                  href={`https://wa.me/${cleanWhatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all text-xs font-semibold font-mono flex items-center gap-1 group-hover:translate-x-0.5"
                >
                  <span>Chat</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 space-y-2">
              <div className="text-xs font-semibold text-slate-500">Connect on Social</div>
              <div className="flex items-center gap-2">
                {settings.linkedinUrl && (
                  <a
                    href={settings.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                  </a>
                )}
                {settings.twitterUrl && (
                  <a
                    href={settings.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  >
                    <TwitterXIcon className="w-4 h-4" />
                  </a>
                )}
                {settings.githubUrl && (
                  <a
                    href={settings.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  >
                    <GitHubIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-[#16181E] border border-white/10 shadow-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-[#20A779] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message Dispatched</h3>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Thank you. We have received your note and will get back to you within 1 business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-semibold text-[#3B82F6] hover:underline pt-2"
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-medium text-slate-300 mb-1">
                        Phone Number
                      </label>
                      <PhoneInput
                        id="contact-phone"
                        value={phone}
                        onChange={(val: PhoneInputValue) => {
                          setPhone(val.phoneNumber);
                          setPhoneE164(val.phoneE164);
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Organization or project"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Service Interested In
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#16181E] px-3 py-3 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
                    >
                      <option value="">Select a service category (optional)</option>
                      <option value="Web Development">Web Development</option>
                      <option value="AI/ML">AI & Machine Learning</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="IT Consulting">IT Consulting</option>
                      <option value="Custom Software">Custom Software</option>
                      <option value="Mobile App">Mobile App Development</option>
                      <option value="Other">Other Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what you're working on..."
                      className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary text-xs w-full sm:w-auto"
                    >
                      <span>{loading ? 'Sending...' : 'Send Message'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
