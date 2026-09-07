import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | ObliqueTech',
  description: 'Our commitment to data privacy, zero unauthorized third-party sharing, and secure enterprise information governance.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12 text-slate-300 text-sm leading-relaxed">
      <div className="space-y-4 border-b border-white/10 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5" />
          <span>Data Governance</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Effective Date: September 2026</p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white">1. Overview</h2>
        <p>
          ObliqueTech is dedicated to maintaining high privacy standards for visitors, enterprise partners, and clients. This Privacy Policy details how we handle information collected through our website, scheduling utilities, discovery wizards, and client platforms.
        </p>

        <h2 className="text-xl font-bold text-white">2. Information We Collect</h2>
        <p>
          We only collect information directly submitted by you for the purpose of communicating about technological requirements, projects, or consulting sessions. This includes:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Contact details (name, email address, phone number, company name).</li>
          <li>Project technical requirements, timeline objectives, and architectural parameters.</li>
          <li>Feedback or reviews submitted through our verified client form.</li>
        </ul>

        <h2 className="text-xl font-bold text-white">3. Artificial Intelligence & Proprietary Client Data</h2>
        <p>
          We uphold a strict principle regarding AI systems: <strong>proprietary client code, databases, documentation, and communications are NEVER used to train public language models or third-party artificial intelligence engines.</strong> All private models and RAG architectures are isolated within dedicated perimeters.
        </p>

        <h2 className="text-xl font-bold text-white">4. Data Storage & Security</h2>
        <p>
          Submissions are stored securely using PostgreSQL databases with Row-Level Security (RLS) and encrypted transport (TLS/SSL). We implement automated vulnerability checks and role-based access control.
        </p>

        <h2 className="text-xl font-bold text-white">5. Third-Party Sharing</h2>
        <p>
          We do not sell, rent, or trade your personal or business data to data brokers or advertising networks. Information is only shared with verified operational service providers strictly necessary to execute project workflows (e.g. database hosting, transactional email delivery).
        </p>

        <h2 className="text-xl font-bold text-white">6. Your Rights & Inquiries</h2>
        <p>
          You may request access to, correction of, or permanent deletion of your contact records at any time by contacting our privacy officer at <a href="mailto:privacy@obliquetech.com" className="text-cyan-400 underline">privacy@obliquetech.com</a>.
        </p>
      </div>

      <div className="pt-8 border-t border-white/10 text-xs text-slate-500">
        <p>Return to <Link href="/" className="text-cyan-400 hover:underline">ObliqueTech Home</Link>.</p>
      </div>
    </div>
  );
}
