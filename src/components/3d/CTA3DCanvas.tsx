'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createOblique3DMark, Oblique3DMarkInstance } from './Oblique3DMark';

interface CTA3DCanvasProps {
  className?: string;
}

export function CTA3DCanvas({ className = '' }: CTA3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth || 320;
    let height = mount.clientHeight || 320;

    const isMobile =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || 'ontouchstart' in window);

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 0, 6.2);

    // 2. WebGL Renderer
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

    // 3. Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(-2, 3, 4);
    scene.add(keyLight);

    const blueLight = new THREE.PointLight(0x00d2ff, 3.8, 18);
    blueLight.position.set(-3, -2, 2.5);
    scene.add(blueLight);

    const magentaLight = new THREE.PointLight(0xec4899, 3.5, 18);
    magentaLight.position.set(3, 2, 2.5);
    scene.add(magentaLight);

    const ambientLight = new THREE.AmbientLight(0x090d16, 1.2);
    scene.add(ambientLight);

    // 4. Subtle Angled 3D Plane Grid in Background
    const planeGeo = new THREE.PlaneGeometry(8, 8, 8, 8);
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = -Math.PI / 3;
    plane.rotation.z = -Math.PI / 6;
    plane.position.set(0, -1.0, -1.5);
    scene.add(plane);

    // 5. Authentic 3D Oblique Mark
    const markInstance: Oblique3DMarkInstance = createOblique3DMark(0.22);
    const logoGroup = markInstance.group;
    logoGroup.scale.set(0.85, 0.85, 0.85);
    logoGroup.rotation.set(0.08, -0.25, 0.02);
    scene.add(logoGroup);

    // 6. Mouse Parallax (desktop)
    let targetRotY = -0.25;
    let targetRotX = 0.08;
    let currentRotY = -0.25;
    let currentRotX = 0.08;

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = mount.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRotY = -0.25 + nx * 0.22;
      targetRotX = 0.08 - ny * 0.16;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // 7. Observer to pause off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(mount);

    // 8. Render loop
    let animId: number;
    const startTime = performance.now();

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isVisible) return;

      const elapsed = (performance.now() - startTime) / 1000;

      if (!isMobile) {
        currentRotX += (targetRotX - currentRotX) * 0.06;
        currentRotY += (targetRotY - currentRotY) * 0.06;
      }

      logoGroup.rotation.x = currentRotX + Math.sin(elapsed * 1.4) * 0.02;
      logoGroup.rotation.y = currentRotY;
      logoGroup.position.y = Math.sin(elapsed * 1.4) * 0.04;

      // Soft light shift
      blueLight.position.x = Math.sin(elapsed * 1.2) * 3.5;
      magentaLight.position.x = -Math.sin(elapsed * 1.2) * 3.5;

      renderer.render(scene, camera);
    };

    render();

    // 9. Resize
    const onResize = () => {
      if (!mount) return;
      width = mount.clientWidth || 320;
      height = mount.clientHeight || 320;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    return () => {
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      cancelAnimationFrame(animId);

      planeGeo.dispose();
      planeMat.dispose();
      markInstance.dispose();
      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full min-h-[260px] sm:min-h-[300px] flex items-center justify-center select-none ${className}`}
    />
  );
}
