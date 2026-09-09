'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface IntroAnimationProps {
  onComplete?: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if user already saw intro this session
    const hasSeenIntro = sessionStorage.getItem('oblique_intro_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeenIntro || prefersReducedMotion) {
      if (onComplete) onComplete();
      return;
    }

    setShouldRender(true);
  }, [onComplete]);

  useEffect(() => {
    if (!shouldRender || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('oblique_intro_seen', 'true');
          setShouldRender(false);
          if (onComplete) onComplete();
        },
      });

      // 01: Dark Screen (initial state)
      gsap.set(containerRef.current, { opacity: 1 });
      gsap.set('.intro-logo', { opacity: 0, scale: 0.85, rotate: -5 });
      gsap.set('.intro-line', { scaleX: 0, opacity: 0 });
      gsap.set('.intro-wordmark', { opacity: 0, y: 14 });
      gsap.set('.intro-tag', { opacity: 0, y: 8 });

      // 02: Logo mark appears
      tl.to('.intro-logo', {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.4,
        ease: 'power2.out',
        delay: 0.15,
      });

      // 03 & 04: Thin angled line travels across the screen and creates visual transition
      tl.to('.intro-line', {
        scaleX: 1,
        opacity: 1,
        duration: 0.45,
        ease: 'power3.inOut',
      }, '-=0.15');

      // 05: ObliqueTech wordmark reveals
      tl.to('.intro-wordmark', {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
      }, '-=0.2');

      // Supporting brandline
      tl.to('.intro-tag', {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: 'power2.out',
      }, '-=0.15');

      // 06: Screen transitions towards homepage (1.4s mark)
      tl.to(containerRef.current, {
        opacity: 0,
        scale: 1.03,
        duration: 0.35,
        ease: 'power2.inOut',
        delay: 0.25,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [shouldRender, onComplete]);

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#08090B] text-white select-none pointer-events-auto"
    >
      <div className="relative flex flex-col items-center space-y-4 px-6 text-center">
        {/* 02: Logo mark */}
        <div className="intro-logo w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-[0_0_40px_rgba(212,175,90,0.3)]">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="text-[#08090B]">
            <path
              d="M5 19L19 5M6 5H18C18.5523 5 19 5.44772 19 6V18"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="15" r="2.5" fill="#D4AF5A" />
          </svg>
        </div>

        {/* 05: Wordmark */}
        <div className="intro-wordmark flex items-center gap-1.5 text-2xl sm:text-4xl font-bold tracking-tight">
          <span>Oblique</span>
          <span className="text-[#D4AF5A]">Tech</span>
        </div>

        {/* 03 & 04: Thin angled line travels across the screen */}
        <div className="w-48 sm:w-64 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF5A] to-transparent intro-line origin-center" />

        {/* Tag */}
        <p className="intro-tag text-xs font-mono uppercase tracking-widest text-slate-400">
          See Business Differently.
        </p>
      </div>
    </div>
  );
}
