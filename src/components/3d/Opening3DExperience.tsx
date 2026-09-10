'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { createOblique3DMark, Oblique3DMarkInstance } from './Oblique3DMark';

interface Opening3DExperienceProps {
  onComplete: () => void;
}

export function Opening3DExperience({ onComplete }: Opening3DExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setIsFinished(true);
      onComplete();
      return;
    }

    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth || window.innerWidth;
    let height = mount.clientHeight || window.innerHeight;

    // 1. Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    // 3. Studio Lighting System (Electric Blue, Magenta, Dark Ambient)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(-3, 4, 6);
    scene.add(keyLight);

    const blueRimLight = new THREE.PointLight(0x00d2ff, 4.5, 20);
    blueRimLight.position.set(-4, -2, 3);
    scene.add(blueRimLight);

    const magentaAccentLight = new THREE.PointLight(0xec4899, 4.0, 20);
    magentaAccentLight.position.set(4, 3, 3);
    scene.add(magentaAccentLight);

    const ambientLight = new THREE.AmbientLight(0x090d16, 1.4);
    scene.add(ambientLight);

    // 4. Subtle 3D Depth Particles & Angled Wireframe Boundary
    const particleCount = 60;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particleMat = new THREE.PointsMaterial({
      color: 0x00d2ff,
      size: 0.035,
      transparent: true,
      opacity: 0.45,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 5. Authentic 3D Oblique Logo Mark
    const markInstance: Oblique3DMarkInstance = createOblique3DMark(0.24);
    const logoGroup = markInstance.group;
    scene.add(logoGroup);

    // Initial 3D State: Deep in z-space, angled obliquely
    logoGroup.scale.set(0.3, 0.3, 0.3);
    logoGroup.position.set(0, 0.2, -4);
    logoGroup.rotation.set(0.35, -0.65, 0.15);

    // 6. Animation Loop with Performance.now()
    let animId: number;
    const startTime = performance.now();

    const render = () => {
      animId = requestAnimationFrame(render);
      const elapsed = (performance.now() - startTime) / 1000;

      // Subtle atmospheric particle drift
      particleSystem.rotation.y = elapsed * 0.03;

      // Dynamic light orbit during reveal
      blueRimLight.position.x = Math.sin(elapsed * 2.0) * 4.5;
      magentaAccentLight.position.x = -Math.sin(elapsed * 2.0) * 4.5;

      renderer.render(scene, camera);
    };

    render();

    // 7. GSAP 9-Step Cinematic Brand Sequence (~1.9s)
    const masterTl = gsap.timeline({
      onComplete: () => {
        // Step 8: Seamless transition into the hero
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.04,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            setIsFinished(true);
            onComplete();
          },
        });
      },
    });

    // Step 02: Diagonal 45-degree line appears across center
    if (lineRef.current) {
      masterTl.fromTo(
        lineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.35, ease: 'power3.inOut' },
        0.1
      );
    }

    // Step 03: Line expands into angled geometric frame
    if (frameRef.current) {
      masterTl.fromTo(
        frameRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'power2.out' },
        0.3
      );
    }

    // Step 04 & 05: 3D Oblique mark emerges from depth and rotates into signature alignment
    masterTl.to(
      logoGroup.position,
      {
        z: 0,
        x: 0,
        y: 0.22,
        duration: 0.85,
        ease: 'power3.out',
      },
      0.35
    );

    masterTl.to(
      logoGroup.scale,
      {
        x: 1.05,
        y: 1.05,
        z: 1.05,
        duration: 0.85,
        ease: 'power3.out',
      },
      0.35
    );

    masterTl.to(
      logoGroup.rotation,
      {
        x: 0.08,
        y: -0.18, // Signature oblique angle
        z: 0.02,
        duration: 0.9,
        ease: 'power2.out',
      },
      0.35
    );

    // Step 06: Blue / Magenta specular lighting passes across the satin beveled surface
    masterTl.fromTo(
      keyLight,
      { intensity: 0.5 },
      { intensity: 2.8, duration: 0.5, ease: 'power2.inOut' },
      0.65
    );

    // Step 07: "ObliqueTech" wordmark & tagline reveal below the 3D logo
    if (wordmarkRef.current) {
      masterTl.fromTo(
        wordmarkRef.current,
        { opacity: 0, y: 18, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.5,
          ease: 'power3.out',
        },
        0.95
      );
    }

    // Settle pause before final transition (Total timing: ~2.0s)
    masterTl.to({}, { duration: 0.45 });

    // 8. Resize Handler
    const onResize = () => {
      if (!mount) return;
      width = mount.clientWidth || window.innerWidth;
      height = mount.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    // 9. Clean Disposal
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      masterTl.kill();
      particleGeo.dispose();
      particleMat.dispose();
      markInstance.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#08090B] flex items-center justify-center overflow-hidden select-none pointer-events-auto"
      style={{ willChange: 'opacity, transform' }}
    >
      {/* 3D WebGL Canvas Layer */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Step 02: Thin 45° Diagonal Line Graphic */}
      <div
        ref={lineRef}
        className="absolute w-[360px] sm:w-[480px] h-[1.5px] bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent pointer-events-none -rotate-[35deg] opacity-0"
        style={{ willChange: 'transform, opacity' }}
      />

      {/* Step 03: Angled Geometric Frame Layer */}
      <div
        ref={frameRef}
        className="absolute w-[280px] sm:w-[360px] h-[280px] sm:h-[360px] rounded-3xl border border-white/10 pointer-events-none -rotate-[12deg] opacity-0"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="absolute top-0 right-0 w-8 h-[1px] bg-[#EC4899]/60" />
        <div className="absolute bottom-0 left-0 w-8 h-[1px] bg-[#00D2FF]/60" />
      </div>

      {/* Step 07: Authentic Brand Wordmark & Tagline */}
      <div
        ref={wordmarkRef}
        className="absolute bottom-[22%] sm:bottom-[20%] flex flex-col items-center justify-center text-center pointer-events-none opacity-0 z-10 space-y-1.5"
      >
        <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white flex items-center">
          <span>Oblique</span>
          <span className="bg-gradient-to-r from-[#00D2FF] via-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent font-extrabold">
            T
          </span>
          <span>ech</span>
        </div>
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-slate-400">
          Solutions &amp; Innovation
        </span>
      </div>
    </div>
  );
}
