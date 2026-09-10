'use client';

import React, { useState, useEffect } from 'react';
import { Opening3DExperience } from '@/components/3d/Opening3DExperience';

export function SiteIntro() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem('oblique_intro_seen');
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!seen && !prefersReducedMotion) {
        setShouldRender(true);
        document.body.style.overflow = 'hidden';
      } else {
        // Already seen in this session or reduced motion preferred -> clean up and unlock
        document.documentElement.classList.remove('oblique-intro-active');
        document.body.style.overflow = '';
      }
    } catch (e) {
      document.documentElement.classList.remove('oblique-intro-active');
      document.body.style.overflow = '';
    }
  }, []);

  const handleComplete = () => {
    try {
      sessionStorage.setItem('oblique_intro_seen', 'true');
    } catch (e) {}

    // Unlock body scroll
    document.body.style.overflow = '';

    // Remove the zero-flash shield class so page content smoothly fades in
    document.documentElement.classList.remove('oblique-intro-active');

    // Notify any listening components (e.g. HomePage hero timeline & ScrollTrigger)
    window.dispatchEvent(new CustomEvent('oblique-intro-finished'));

    setShouldRender(false);
  };

  if (!shouldRender) return null;

  return <Opening3DExperience onComplete={handleComplete} />;
}
