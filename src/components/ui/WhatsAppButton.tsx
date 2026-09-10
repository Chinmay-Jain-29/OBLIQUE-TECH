'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { obliqueStore } from '@/lib/store';

export function WhatsAppButton() {
  const pathname = usePathname();
  const [number, setNumber] = useState('919225260237');

  useEffect(() => {
    const settings = obliqueStore.getSettings();
    if (settings?.whatsappNumber) {
      setNumber(settings.whatsappNumber.replace(/[^0-9]/g, ''));
    }
  }, []);

  if (
    pathname === '/insights/write' || 
    pathname?.startsWith('/insights/write') ||
    pathname === '/admin' ||
    pathname?.startsWith('/admin')
  ) {
    return null;
  }

  const message = encodeURIComponent('Hello ObliqueTech, I would like to discuss a technology project.');
  const whatsappUrl = `https://wa.me/${number}?text=${message}`;

  return (
    <aside
      aria-label="Quick WhatsApp Contact"
      className="fixed bottom-6 right-6 z-40 flex items-center group select-none"
    >
      {/* Tooltip on hover (desktop only) */}
      <div className="mr-3 hidden md:block px-3 py-1.5 rounded-lg bg-[#0B0B0D]/95 text-xs text-white border border-emerald-500/30 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-xl pointer-events-none whitespace-nowrap -translate-x-1 group-hover:translate-x-0">
        <span className="font-medium">Chat on WhatsApp</span>
        <span className="block text-[10px] text-emerald-400 font-mono">+91 9225260237</span>
      </div>

        {/* Authentic WhatsApp Action Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with ObliqueTech on WhatsApp (+91 9225260237)"
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.55)] hover:scale-108 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-3 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-[#0B0B0D]"
        >

        {/* Authentic WhatsApp Icon SVG */}
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current"
          aria-hidden="true"
        >
          <path d="M16.002 2C8.268 2 2 8.267 2 16c0 2.544.685 5.01 1.986 7.172L2 30l7.009-1.928A13.93 13.93 0 0 0 16.002 30c7.732 0 14-6.268 14-14s-6.268-14-14-14zm0 25.642a11.603 11.603 0 0 1-5.918-1.62l-.424-.252-4.4 1.21 1.229-4.288-.277-.442A11.603 11.603 0 1 1 16.002 27.642zm6.368-8.718c-.349-.174-2.064-1.018-2.385-1.135-.32-.116-.553-.174-.785.174-.233.349-.9 1.135-1.104 1.368-.204.233-.407.262-.756.087-.349-.174-1.472-.543-2.805-1.732-1.037-.925-1.737-2.068-1.941-2.417-.204-.349-.022-.538.153-.711.157-.156.349-.407.524-.611.174-.204.233-.349.349-.582.116-.233.058-.437-.029-.611-.087-.174-.785-1.892-1.077-2.592-.284-.68-.573-.588-.785-.599l-.67-.012c-.233 0-.611.087-.931.437-.32.349-1.222 1.194-1.222 2.912 0 1.718 1.251 3.376 1.426 3.609.174.233 2.463 3.762 5.967 5.275.834.36 1.485.576 1.993.738.838.266 1.601.229 2.203.139.672-.1 2.064-.844 2.355-1.66.291-.815.291-1.514.204-1.66-.087-.145-.32-.233-.669-.407z" />
        </svg>
      </a>
    </aside>
  );
}
