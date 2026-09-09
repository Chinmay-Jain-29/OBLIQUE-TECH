'use client';

import React from 'react';
import Image from 'next/image';

interface ObliqueLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showTagline?: boolean;
  showText?: boolean;
  className?: string;
  iconOnly?: boolean;
}

export function ObliqueLogo({
  size = 'md',
  showTagline = false,
  showText = true,
  iconOnly = false,
  className = '',
}: ObliqueLogoProps) {
  // Dimensions for the authentic mark (aspect ratio is ~1.53 : 1)
  const dimensions = {
    sm: { markW: 28, markH: 18, textClass: 'text-base', tagClass: 'text-[9px]' },
    md: { markW: 36, markH: 24, textClass: 'text-lg', tagClass: 'text-[10px]' },
    lg: { markW: 52, markH: 34, textClass: 'text-2xl', tagClass: 'text-xs' },
    xl: { markW: 72, markH: 47, textClass: 'text-3xl sm:text-4xl', tagClass: 'text-xs' },
    hero: { markW: 96, markH: 63, textClass: 'text-4xl sm:text-5xl', tagClass: 'text-sm' },
  }[size];

  if (iconOnly) {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}>
        <Image
          src="/oblique-mark.png"
          alt="ObliqueTech"
          width={dimensions.markW * 2}
          height={dimensions.markH * 2}
          style={{ width: `${dimensions.markW}px`, height: 'auto' }}
          className="drop-shadow-[0_2px_12px_rgba(0,194,255,0.3)]"
          priority
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Authentic ObliqueTech Gradient Monogram Mark */}
      <div className="relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/oblique-mark.png"
          alt="ObliqueTech Mark"
          width={dimensions.markW * 2}
          height={dimensions.markH * 2}
          style={{ width: `${dimensions.markW}px`, height: 'auto' }}
          className="drop-shadow-[0_2px_14px_rgba(0,194,255,0.3)]"
          priority
        />
      </div>

      {/* Wordmark with Brand-Accurate Gradient 'T' */}
      {showText && (
        <div className="flex flex-col">
          <div className={`font-bold tracking-tight text-white leading-tight ${dimensions.textClass} flex items-center`}>
            <span>Oblique</span>
            <span className="bg-gradient-to-r from-[#00D2FF] via-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent font-extrabold">
              T
            </span>
            <span>ech</span>
          </div>

          {showTagline && (
            <span className={`uppercase tracking-widest text-slate-400 font-medium font-mono -mt-0.5 ${dimensions.tagClass}`}>
              See Business Differently
            </span>
          )}
        </div>
      )}
    </div>
  );
}
