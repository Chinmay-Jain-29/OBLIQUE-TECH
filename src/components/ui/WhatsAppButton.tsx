'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { obliqueStore } from '@/lib/store';

export function WhatsAppButton() {
  const [number, setNumber] = useState('+15550192834');

  useEffect(() => {
    const settings = obliqueStore.getSettings();
    if (settings?.whatsappNumber) {
      setNumber(settings.whatsappNumber.replace(/[^0-9]/g, ''));
    }
  }, []);

  const message = encodeURIComponent('Hello ObliqueTech, I would like to discuss a technology project.');
  const whatsappUrl = `https://wa.me/${number}?text=${message}`;

  return (
    <aside aria-label="Quick WhatsApp Contact" className="fixed bottom-6 right-6 z-40 flex items-center group">
      <div className="mr-3 hidden md:block px-3 py-1.5 rounded-lg bg-slate-900/90 text-xs text-slate-200 border border-emerald-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg pointer-events-none whitespace-nowrap">
        Chat with ObliqueTech on WhatsApp
      </div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct message on WhatsApp"
        className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>
    </aside>
  );
}
