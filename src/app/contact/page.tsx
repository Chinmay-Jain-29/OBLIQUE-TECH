'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { obliqueStore } from '@/lib/store';
import { SiteSettings } from '@/types';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  MapPin, 
  CheckCircle2, 
  Send, 
  MessageCircle, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { LinkedInIcon, TwitterXIcon, GitHubIcon, InstagramIcon } from '@/components/ui/Icons';

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings>(obliqueStore.getSettings());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('Web Development');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Spam trap
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSettings(obliqueStore.getSettings());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent discard for automated bot submissions
    if (!name || !email || !message) return;

    setLoading(true);
    await obliqueStore.submitContact({
      name,
      email,
      phone,
      company,
      service,
      message,
    });
    setLoading(false);
    setSubmitted(true);
  };

  const cleanWhatsappNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Direct Access</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Connect With ObliqueTech.
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Reach our engineering leads directly. Whether you have an immediate RFP or wish to explore feasibility, we respond with clarity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info & Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 space-y-6">
            <h2 className="text-xl font-bold text-white tracking-tight">Direct Channels</h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <Mail className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Email Address</div>
                  <a href={`mailto:${settings.email}`} className="text-slate-400 hover:text-cyan-300 transition-colors">
                    {settings.email}
                  </a>
                  <p className="text-[10px] text-slate-500 mt-1">Average response within 1 business day</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Phone Inquiries</div>
                  <a href={`tel:${settings.phone}`} className="text-slate-400 hover:text-amber-300 transition-colors">
                    {settings.phone}
                  </a>
                  <p className="text-[10px] text-slate-500 mt-1">Mon - Fri, 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">WhatsApp Direct</div>
                  <a
                    href={`https://wa.me/${cleanWhatsappNumber}?text=Hello%20ObliqueTech`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                  >
                    <span>Instant Messaging Available</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <MapPin className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Global Operations Hub</div>
                  <span className="text-slate-400">{settings.officeAddress}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 border-t border-white/10">
              <p className="text-xs font-semibold text-slate-300 mb-3">Connect on Social Platforms</p>
              <div className="flex items-center gap-3">
                {settings.linkedinUrl && (
                  <a
                    href={settings.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center justify-center transition-all hover:scale-105"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                  </a>
                )}
                {settings.twitterUrl && (
                  <a
                    href={settings.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter / X"
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center justify-center transition-all hover:scale-105"
                  >
                    <TwitterXIcon className="w-4 h-4" />
                  </a>
                )}
                {settings.githubUrl && (
                  <a
                    href={settings.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center justify-center transition-all hover:scale-105"
                  >
                    <GitHubIcon className="w-4 h-4" />
                  </a>
                )}
                {settings.instagramUrl && (
                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center justify-center transition-all hover:scale-105"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Alternative: Schedule a Call</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Prefer a structured 30–45 minute introductory discussion? Choose a convenient time via our dedicated calendar scheduler.
            </p>
            <Link
              href="/schedule"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:underline pt-1"
            >
              <span>Go to Call Scheduler</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-white/10 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Received</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{name}</strong>. Your inquiry has been logged in our secure system. An engineering lead will review your requirements and reach out within 1 business day.
                </p>
                <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href={`https://wa.me/${cleanWhatsappNumber}?text=Hi%20ObliqueTech,%20I%20just%20submitted%20an%20inquiry%20under%20name%20${encodeURIComponent(name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Follow Up on WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Send an Inquiry</h2>
                <p className="text-xs text-slate-400 mb-8">
                  Fill out the details below and we will get back to you promptly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {/* Honeypot anti-spam field */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website_url"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1.5">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Henderson"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1.5">Company / Business</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Apex Health Systems"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">Required Service *</label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="IT Consulting">IT Consulting & Strategy</option>
                      <option value="AI / ML">AI / ML & Intelligent Systems</option>
                      <option value="UI/UX Design">UI/UX Design & Product Strategy</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="Custom Software">Custom Software Engineering</option>
                      <option value="Digital Marketing">Technical Digital Marketing & SEO</option>
                      <option value="Student / Project Inquiry">Student / Project Inquiry</option>
                      <option value="Other">Other / General Discussion</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">Project Scope / Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about the challenge you are solving, your timeline, or any specific technologies required..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading || !name || !email || !message}
                      className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 disabled:opacity-40 transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{loading ? 'Submitting...' : 'Send Inquiry to ObliqueTech'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
