'use client';

import React, { useEffect, useRef, useState } from 'react';

export function HeroPerspectiveCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
    >
      {/* 1. Subtle Radial Ambient Lighting Gradients */}
      <div 
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 90, 0.4) 0%, transparent 70%)',
          transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)`
        }}
      />
      <div 
        className="absolute top-1/3 -right-40 w-[650px] h-[650px] rounded-full opacity-20 blur-[140px] transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, transparent 70%)',
          transform: `translate(${-mousePos.x * 0.6}px, ${-mousePos.y * 0.6}px)`
        }}
      />

      {/* 2. Deep Oblique Perspective Plane */}
      <div 
        className="absolute inset-0 opacity-25 transition-transform duration-500 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(25deg) rotateY(${-mousePos.x * 0.15}deg) rotateZ(-12deg) scale(1.15) translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)`,
          transformOrigin: '50% 60%'
        }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <pattern id="oblique-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
              <circle cx="80" cy="80" r="1.5" fill="rgba(212, 175, 90, 0.4)" />
            </pattern>
            <linearGradient id="grid-fade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#fff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id="fade-mask">
              <rect width="100%" height="100%" fill="url(#grid-fade)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#oblique-grid)" mask="url(#fade-mask)" />
        </svg>
      </div>

      {/* 3. Floating Geometric Lines & Coordinate Vectors */}
      <div 
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)`
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1440 900" fill="none" className="w-full h-full">
          {/* Main Diagonal Perspective Ray */}
          <line
            x1="0"
            y1="900"
            x2="1440"
            y2="0"
            stroke="url(#ray-gradient)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            className="opacity-40"
          />
          {/* Parallel Accent Ray */}
          <line
            x1="200"
            y1="900"
            x2="1440"
            y2="120"
            stroke="rgba(59, 130, 246, 0.25)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />

          {/* Floating Oblique Geometric Polyline Nodes */}
          <g className="opacity-60">
            <polyline
              points="680,320 740,280 740,360 800,320"
              stroke="rgba(212, 175, 90, 0.4)"
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="740" cy="280" r="3" fill="#D4AF5A" />
            <circle cx="740" cy="360" r="2" fill="#3B82F6" />
          </g>

          {/* Vector Direction Arrows */}
          <g className="opacity-40" transform="translate(1080, 240) rotate(-35)">
            <line x1="0" y1="0" x2="120" y2="0" stroke="rgba(212, 175, 90, 0.6)" strokeWidth="1.5" />
            <polygon points="120,0 110,-4 110,4" fill="#D4AF5A" />
            <text x="10" y="-10" fill="rgba(212, 175, 90, 0.7)" fontSize="10" fontFamily="monospace">AXIS_OBLIQUE // 34.8°</text>
          </g>

          <defs>
            <linearGradient id="ray-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
              <stop offset="40%" stopColor="#3B82F6" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#D4AF5A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D4AF5A" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 4. Fine Technical Coordinate Crosshairs */}
      <div className="absolute top-24 right-12 hidden lg:flex flex-col gap-1 text-[10px] font-mono text-slate-500 opacity-60 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF5A] animate-pulse" />
          <span>PERSPECTIVE_MATRIX: 3D_ROT_ANGLED</span>
        </div>
        <div>COORDS: X={Math.round(mousePos.x * 10)} Y={Math.round(mousePos.y * 10)}</div>
      </div>
    </div>
  );
}
