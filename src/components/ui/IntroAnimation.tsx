'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
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
        {/* 02: Official Logo mark */}
        <div className="intro-logo relative flex items-center justify-center filter drop-shadow-[0_0_35px_rgba(0,194,255,0.4)]">
          <Image
            src="/oblique-mark.png"
            alt="ObliqueTech"
            width={160}
            height={104}
            style={{ width: '88px', height: 'auto' }}
            priority
          />
        </div>

        {/* 05: Official Wordmark */}
        <div className="intro-wordmark flex items-center text-3xl sm:text-5xl font-bold tracking-tight text-white">
          <span>Oblique</span>
          <span className="bg-gradient-to-r from-[#00D2FF] via-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent font-extrabold">
            T
          </span>
          <span>ech</span>
        </div>

        {/* 03 & 04: Thin angled line travels across the screen */}
        <div className="w-48 sm:w-64 h-[2px] bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent intro-line origin-center" />

        {/* Tag */}
        <p className="intro-tag text-xs font-mono uppercase tracking-widest text-slate-400">
          See Business Differently.
        </p>
      </div>
    </div>
  );
}
