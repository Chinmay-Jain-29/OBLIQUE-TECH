'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { obliqueStore, INITIAL_SERVICES } from '@/lib/store';
import { SiteSettings, ServiceItem } from '@/types';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { LinkedInIcon, TwitterXIcon, GitHubIcon, InstagramIcon } from '@/components/ui/Icons';

export function Footer() {
  const [settings, setSettings] = useState<SiteSettings>(obliqueStore.getSettings());
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);

  useEffect(() => {
    setSettings(obliqueStore.getSettings());
    setServices(obliqueStore.getServices());
  }, []);

  return (
    <footer className="relative bg-slate-950 text-slate-400 border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background Decorative Diagonal Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 via-cyan-400 to-violet-500 p-[1.5px]">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <div className="w-3.5 h-3.5 border-2 border-amber-400 transform -skew-x-12" />
                </div>
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                OBLIQUE<span className="text-amber-400 font-light">TECH</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Technology solutions from a different angle. We design, engineer, and scale digital systems for ambitious organizations worldwide.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                  {settings.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-violet-400 shrink-0" />
                <span>{settings.officeAddress}</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-3">
              {settings.linkedinUrl && (
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center justify-center transition-all hover:scale-105"
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
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center justify-center transition-all hover:scale-105"
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
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center justify-center transition-all hover:scale-105"
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
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center justify-center transition-all hover:scale-105"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Services Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Services</h4>
            <ul className="space-y-2 text-xs">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{service.title}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-cyan-400 hover:underline font-medium">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Navigation Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">
                  Portfolio & Case Studies
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us & Origin Story
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition-colors">
                  Oblique Insights (Blog)
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="text-amber-400 font-medium hover:underline">
                  Schedule a Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Action & Wizard Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Start Building</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Have an idea or operational bottleneck? Discover practical solutions with our project wizard.
            </p>
            <div className="pt-2">
              <Link
                href="/start-project"
                className="inline-flex items-center justify-center w-full px-4 py-2.5 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all hover:scale-102"
              >
                Launch Project Wizard →
              </Link>
            </div>
            <div className="pt-2">
              <Link
                href="/admin"
                className="text-[11px] text-slate-500 hover:text-slate-300 block"
              >
                Admin Management Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ObliqueTech. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 font-mono text-[11px]">v1.0.0 Production</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
