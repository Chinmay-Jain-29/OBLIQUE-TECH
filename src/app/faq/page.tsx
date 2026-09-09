'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { obliqueStore, INITIAL_FAQS } from '@/lib/store';
import { FAQItem } from '@/types';
import { ChevronDown, Search, ArrowRight } from 'lucide-react';

const CATEGORIES = ['All', 'General', 'Services', 'Process', 'Security & Tech', 'Pricing & Engagement'];

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>(INITIAL_FAQS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>('faq-1');

  useEffect(() => {
    setFaqs(obliqueStore.getFAQs());
  }, []);

  const filtered = faqs.filter((faq) => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col">
      {/* Header (Surface: Oblique Black) */}
      <section className="surface-black pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[#C7A45D]">FAQ</span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Frequently Asked Questions.
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-xl leading-relaxed">
            Straightforward answers about our engineering capabilities, engagement models, project lifecycles, and IP ownership.
          </p>
        </div>
      </section>

      {/* Main Content (Surface: Warm White) */}
      <section className="surface-warm py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Category Filter & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#16181E] border border-white/10 shadow-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-white text-[#0B0B0D] font-semibold'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6]"
              />
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {filtered.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="clean-card rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3B82F6] block">
                        {faq.category}
                      </span>
                      <span className="text-sm font-bold text-white">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#3B82F6]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Assistance Box */}
          <div className="p-8 rounded-xl bg-[#16181E] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-sm font-bold text-white">Still have a question?</h3>
              <p className="text-xs text-slate-400">Our engineering leads are available to talk through your specific scenario.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/schedule" className="btn-primary text-xs">
                <span>Schedule a Call</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/contact" className="btn-secondary text-xs">
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
