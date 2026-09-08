'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function IntroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if user already saw intro this session
    const hasSeenIntro = sessionStorage.getItem('oblique_intro_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeenIntro || prefersReducedMotion) {
      return;
    }

    setShouldRender(true);
  }, []);

  useEffect(() => {
    if (!shouldRender || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('oblique_intro_seen', 'true');
          setShouldRender(false);
        },
      });

      // Step 1: Wordmark appears
      tl.fromTo(
        '.intro-wordmark',
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
      );

      // Step 2: Angled line sweeps through
      tl.fromTo(
        '.intro-line',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.35, ease: 'power3.inOut' }
      );

      // Step 3: Subtle tag reveal
      tl.fromTo(
        '.intro-tag',
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        '-=0.1'
      );

      // Step 4: Curtain fades and scales away smoothly (<1.2s total)
      tl.to(containerRef.current, {
        opacity: 0,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.inOut',
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#0B0B0D] text-white select-none pointer-events-auto"
    >
      <div className="relative flex flex-col items-center space-y-4 px-6 text-center">
        {/* Brandmark Icon */}
        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-2xl">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#0B0B0D]">
            <path
              d="M5 19L19 5M6 5H18C18.5523 5 19 5.44772 19 6V18"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="15" r="2.5" fill="#C7A45D" />
          </svg>
        </div>

        {/* Wordmark */}
        <div className="intro-wordmark flex items-center gap-1 text-2xl sm:text-3xl font-bold tracking-tight">
          <span>Oblique</span>
          <span className="text-[#C7A45D]">Tech</span>
        </div>

        {/* Diagonal / Horizontal Angled Brand Line */}
        <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#C7A45D] to-transparent intro-line origin-center" />

        {/* Brandline */}
        <p className="intro-tag text-[11px] font-mono uppercase tracking-widest text-slate-400">
          See Business Differently.
        </p>
      </div>
    </div>
  );
}
