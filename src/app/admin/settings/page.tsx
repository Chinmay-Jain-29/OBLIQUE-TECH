'use client';

import React, { useState, useEffect } from 'react';
import { obliqueStore } from '@/lib/store';
import { SiteSettings } from '@/types';
import { Settings, Save, CheckCircle2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(obliqueStore.getSettings());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(obliqueStore.getSettings());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    obliqueStore.updateSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Site & Brand Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure company contact channels, WhatsApp integration number, social links, and brand statements.
        </p>
      </div>

      <form onSubmit={handleSave} className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 space-y-6 text-xs shadow-xl">
        {saved && (
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings updated and synced successfully!</span>
          </div>
        )}

        {/* Brand Core */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Brand Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Company Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Primary Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Supporting Tagline</label>
            <input
              type="text"
              value={settings.taglineSub}
              onChange={(e) => setSettings({ ...settings, taglineSub: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
          </div>
        </div>

        {/* Direct Contact Channels */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Contact Channels</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Public Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Phone Number</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">WhatsApp Target Number</label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Office Operations Description</label>
            <input
              type="text"
              value={settings.officeAddress}
              onChange={(e) => setSettings({ ...settings, officeAddress: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h2 className="text-sm font-bold text-violet-400 uppercase tracking-wider">Social Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={settings.linkedinUrl || ''}
                onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-violet-400"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Twitter / X URL</label>
              <input
                type="url"
                value={settings.twitterUrl || ''}
                onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-violet-400"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">GitHub URL</label>
              <input
                type="url"
                value={settings.githubUrl || ''}
                onChange={(e) => setSettings({ ...settings, githubUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-violet-400"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Instagram URL</label>
              <input
                type="url"
                value={settings.instagramUrl || ''}
                onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-violet-400"
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Mission & Vision</h2>
          <div>
            <label className="block text-slate-300 font-medium mb-1">Mission Statement</label>
            <textarea
              rows={2}
              value={settings.missionStatement}
              onChange={(e) => setSettings({ ...settings, missionStatement: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-medium mb-1">Vision Statement</label>
            <textarea
              rows={2}
              value={settings.visionStatement}
              onChange={(e) => setSettings({ ...settings, visionStatement: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save All Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
