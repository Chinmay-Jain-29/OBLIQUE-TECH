'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { obliqueStore, INITIAL_SERVICES } from '@/lib/store';
import { SiteSettings, ServiceItem } from '@/types';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { LinkedInIcon, TwitterXIcon, GitHubIcon, InstagramIcon } from '@/components/ui/Icons';
import { ObliqueLogo } from '@/components/ui/ObliqueLogo';

export function Footer() {
  const [settings, setSettings] = useState<SiteSettings>(obliqueStore.getSettings());
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);

  useEffect(() => {
    setSettings(obliqueStore.getSettings());
    setServices(obliqueStore.getServices());
  }, []);

  return (
    <footer className="bg-[#0B0B0D] text-slate-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group focus:outline-none">
              <ObliqueLogo size="md" />
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Technology from a different perspective. Practical technology solutions for businesses ready to move forward.
            </p>

            <div className="pt-2 flex items-center gap-3">
              {settings.linkedinUrl && (
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 flex items-center justify-center transition-colors"
                >
                  <LinkedInIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {settings.twitterUrl && (
                <a
                  href={settings.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 flex items-center justify-center transition-colors"
                >
                  <TwitterXIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {settings.githubUrl && (
                <a
                  href={settings.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 flex items-center justify-center transition-colors"
                >
                  <GitHubIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 flex items-center justify-center transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Navigation</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Story</Link></li>
              <li><Link href="/insights" className="hover:text-white transition-colors">Insights</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Services</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/services/web-development" className="hover:text-white transition-colors">Web Development</Link></li>
              <li><Link href="/services/ai-ml" className="hover:text-white transition-colors">AI & ML</Link></li>
              <li><Link href="/services/ui-ux-design" className="hover:text-white transition-colors">UI/UX Design</Link></li>
              <li><Link href="/services/it-consulting" className="hover:text-white transition-colors">IT Consulting</Link></li>
              <li><Link href="/services/mobile-app-development" className="hover:text-white transition-colors">Mobile Apps</Link></li>
              <li><Link href="/services/software-development" className="hover:text-white transition-colors">Custom Software</Link></li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Direct Contact</h3>
            <div className="space-y-2 text-xs text-slate-400">
              <div>
                <a href={`mailto:${settings.email}`} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#C7A45D]" />
                  <span>{settings.email}</span>
                </a>
              </div>
              <div>
                <a href={`tel:${settings.phone}`} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>{settings.phone}</span>
                </a>
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <Link
                  href="/start-project"
                  className="inline-flex items-center justify-between text-xs font-semibold px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C7A45D]" />
                </Link>
                <Link
                  href="/schedule"
                  className="inline-flex items-center justify-between text-xs font-semibold px-3 py-2 rounded-md bg-[#3B82F6] hover:bg-blue-600 text-white transition-colors"
                >
                  <span>Schedule a Call</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ObliqueTech. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link href="/admin" className="hover:text-slate-400 transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
