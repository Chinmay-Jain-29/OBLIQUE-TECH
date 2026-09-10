'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createOblique3DMark, Oblique3DMarkInstance } from './Oblique3DMark';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Hero3DSceneProps {
  className?: string;
}

export function Hero3DScene({ className = '' }: Hero3DSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth || 450;
    let height = mount.clientHeight || 450;

    // Detect mobile touch device
    const isMobile =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || 'ontouchstart' in window);

    // 1. Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mount.appendChild(renderer.domElement);

    // 3. Controlled Studio Lighting System
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(-3, 3, 5);
    scene.add(keyLight);

    const blueRimLight = new THREE.PointLight(0x00d2ff, 4.2, 22);
    blueRimLight.position.set(-4, -2, 3);
    scene.add(blueRimLight);

    const magentaAccentLight = new THREE.PointLight(0xec4899, 3.8, 22);
    magentaAccentLight.position.set(4, 2, 3);
    scene.add(magentaAccentLight);

    const goldFillLight = new THREE.PointLight(0xd4af5a, 2.0, 16);
    goldFillLight.position.set(0, 4, -2);
    scene.add(goldFillLight);

    const ambientLight = new THREE.AmbientLight(0x090c14, 1.3);
    scene.add(ambientLight);

    // 4. Subtle Digital Architectural Environment: Angled Frame & Lines
    const frameGroup = new THREE.Group();
    scene.add(frameGroup);

    // Thin 45-degree diagonal accent lines
    const lineGeo = new THREE.BufferGeometry();
    const linePoints = new Float32Array([
      -3.0, -3.0, -1.0,
       3.0,  3.0, -1.0,
      -2.0, -3.5, -0.5,
       3.5,  2.0, -0.5,
    ]);
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePoints, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.22,
    });
    const diagonalLines = new THREE.LineSegments(lineGeo, lineMat);
    frameGroup.add(diagonalLines);

    // Minimal floating depth particles
    const particleCount = 45;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 10;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particleMat = new THREE.PointsMaterial({
      color: 0x00d2ff,
      size: 0.03,
      transparent: true,
      opacity: 0.35,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Authentic 3D Oblique Logo Mark
    const markInstance: Oblique3DMarkInstance = createOblique3DMark(0.24);
    const logoGroup = markInstance.group;
    scene.add(logoGroup);

    // Initial signature oblique perspective
    logoGroup.position.set(0, 0, 0);
    logoGroup.rotation.set(0.06, -0.22, 0.02);

    // 6. Desktop Mouse Parallax (Controlled & Damped)
    let targetRotX = 0.06;
    let targetRotY = -0.22;
    let currentRotX = 0.06;
    let currentRotY = -0.22;
    let targetCamX = 0;
    let targetCamY = 0;
    let currentCamX = 0;
    let currentCamY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;

      // Small, controlled tilt: max ±7 degrees (0.12 rad)
      targetRotY = -0.22 + nx * 0.18;
      targetRotX = 0.06 - ny * 0.14;
      targetCamX = nx * 0.25;
      targetCamY = -ny * 0.2;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // 7. Scroll-Linked 3D Transformation (Moving Deeper into Website)
    let scrollTriggerInstance: ScrollTrigger | null = null;
    const heroSection = containerRef.current?.closest('section');

    if (heroSection) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;
          // As user scrolls down: logo moves backward, scales down, rotates slightly
          logoGroup.position.z = -p * 2.8;
          logoGroup.position.x = p * 0.4;
          logoGroup.position.y = -p * 0.3;
          logoGroup.scale.setScalar(1 - p * 0.28);
          frameGroup.position.z = -p * 2.0;
        },
      });
    }

    // 8. Visibility Observer to Pause When Off-Screen
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(mount);

    // 9. Render Loop with High Performance & performance.now()
    let animId: number;
    const startTime = performance.now();

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isVisible) return;

      const elapsed = (performance.now() - startTime) / 1000;

      // Smooth mouse lerp interpolation (desktop)
      if (!isMobile) {
        currentRotX += (targetRotX - currentRotX) * 0.06;
        currentRotY += (targetRotY - currentRotY) * 0.06;
        currentCamX += (targetCamX - currentCamX) * 0.05;
        currentCamY += (targetCamY - currentCamY) * 0.05;

        camera.position.x = currentCamX;
        camera.position.y = currentCamY;
      }

      // Subtle imperceptible idle floating movement
      const idleFloatY = Math.sin(elapsed * 1.5) * 0.04;
      const idleFloatRotZ = Math.sin(elapsed * 0.8) * 0.015;

      logoGroup.rotation.x = currentRotX;
      logoGroup.rotation.y = currentRotY;
      logoGroup.rotation.z = 0.02 + idleFloatRotZ;
      logoGroup.position.y += (idleFloatY - logoGroup.position.y) * 0.1;

      // Gentle specular light movement across the satin gradient
      blueRimLight.position.x = Math.sin(elapsed * 1.1) * 4.2;
      blueRimLight.position.z = Math.cos(elapsed * 1.1) * 3.0 + 1.5;
      magentaAccentLight.position.x = -Math.sin(elapsed * 1.1) * 4.0;
      magentaAccentLight.position.z = -Math.cos(elapsed * 1.1) * 3.0 + 1.5;

      // Particles ambient drift
      particles.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
    };

    render();

    // 10. Resize Handling
    const onResize = () => {
      if (!mount) return;
      width = mount.clientWidth || 450;
      height = mount.clientHeight || 450;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    // 11. Clean Memory Disposal
    return () => {
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      cancelAnimationFrame(animId);

      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }

      lineGeo.dispose();
      lineMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      markInstance.dispose();
      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center select-none ${className}`}
    >
      <div
        ref={mountRef}
        className="w-full h-full min-h-[320px] sm:min-h-[420px] flex items-center justify-center pointer-events-auto"
      />
    </div>
  );
}
