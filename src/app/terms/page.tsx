import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions | ObliqueTech',
  description: 'Terms governing technology advisory, software engineering engagements, and use of ObliqueTech digital properties.',
};

export default function TermsPage() {
  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12 text-slate-300 text-sm leading-relaxed">
      <div className="space-y-4 border-b border-white/10 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Terms & Conditions</h1>
        <p className="text-xs text-slate-400">Effective Date: September 2026</p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white">1. Agreement to Terms</h2>
        <p>
          By visiting ObliqueTech, utilizing our scheduling interfaces, submitting project inquiries, or executing formal Statements of Work (SOW), you agree to abide by these Terms and Conditions.
        </p>

        <h2 className="text-xl font-bold text-white">2. Scope of Services</h2>
        <p>
          ObliqueTech provides software engineering, web application development, mobile applications, machine learning architectures, UI/UX design systems, and digital marketing consulting. Formal deliverables, timelines, and payment milestones are governed by project-specific contracts.
        </p>

        <h2 className="text-xl font-bold text-white">3. Intellectual Property Ownership</h2>
        <p>
          Unless otherwise negotiated in an explicit custom master services agreement (MSA), <strong>clients retain 100% full ownership of all custom software, source code, database architectures, and digital assets developed on their behalf upon milestone payment completion.</strong>
        </p>

        <h2 className="text-xl font-bold text-white">4. No Hallucinated Metrics or Misleading Warranties</h2>
        <p>
          All estimates, discovery wizard outputs, and architectural overviews presented on this website are structured scoping assessments rather than binding fixed-cost guarantees. Final project milestones are confirmed after direct technical discovery.
        </p>

        <h2 className="text-xl font-bold text-white">5. Governing Law</h2>
        <p>
          These terms shall be governed by and construed in accordance with applicable international commercial arbitration standards and operational business jurisdictions.
        </p>
      </div>

      <div className="pt-8 border-t border-white/10 text-xs text-slate-500">
        <p>Return to <Link href="/" className="text-cyan-400 hover:underline">ObliqueTech Home</Link>.</p>
      </div>
    </div>
  );
}
