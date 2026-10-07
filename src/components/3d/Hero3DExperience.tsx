"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export interface Hero3DExperienceProps {
  className?: string;
  isRtl?: boolean;
}

export function Hero3DExperience({
  className = "",
  isRtl = true,
}: Hero3DExperienceProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // WebGL Context Check
    try {
      const testCanvas = document.createElement('canvas');
      const gl =
        testCanvas.getContext('webgl2') ||
        testCanvas.getContext('webgl') ||
        testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    let isVisible = true;
    let animationFrameId: number;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    // Centered camera with generous frustum depth to ensure no geometry clipping occurs at any rotation angle
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.0);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Pure transparency
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // 2. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xe9800a, 4, 15);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const orangeFillLight = new THREE.DirectionalLight(0xe9800a, 2.0);
    orangeFillLight.position.set(-5, -4, 4);
    scene.add(orangeFillLight);

    // Master Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 3. Geodesic Outer Cage (Scaled to 1.6 to sit comfortably inside view frustum)
    const outerGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerMesh);

    // Geodesic Vertices Sparks
    const verticesGeo = new THREE.BufferGeometry();
    const posAttr = outerGeo.getAttribute('position');
    verticesGeo.setAttribute('position', posAttr);
    const verticesMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.07,
      transparent: true,
      opacity: 0.85,
    });
    const verticesPoints = new THREE.Points(verticesGeo, verticesMat);
    coreGroup.add(verticesPoints);

    // 4. Inner Octahedron Core (Deep Obsidian & Glowing Orange Edges)
    const innerGeo = new THREE.OctahedronGeometry(0.95, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x050505,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0xe9800a,
      emissiveIntensity: 0.4,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    const innerWireMat = new THREE.MeshBasicMaterial({
      color: 0xe9800a,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });
    const innerWireMesh = new THREE.Mesh(innerGeo, innerWireMat);
    coreGroup.add(innerWireMesh);

    // 5. Dual Intersecting Orbital Rings (Radius 2.0 sits safely inside the 3.3 unit frustum half-height)
    const ringGeo = new THREE.TorusGeometry(2.0, 0.022, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xe9800a,
      transparent: true,
      opacity: 0.9,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    ringMesh1.rotation.y = Math.PI / 6;
    coreGroup.add(ringMesh1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.55,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 3;
    ringMesh2.rotation.y = -Math.PI / 5;
    coreGroup.add(ringMesh2);

    // 6. Central Pulsing Beacon (Riyadh Node)
    const beaconGeo = new THREE.SphereGeometry(0.28, 32, 32);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0xe9800a,
    });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    coreGroup.add(beaconMesh);

    // Halo around Beacon
    const haloGeo = new THREE.SphereGeometry(0.44, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xff9420,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    coreGroup.add(haloMesh);

    // 7. Dynamic Floating Particle Cloud (400 Particles, radius bounded within 2.5 units)
    const particleCount = 400;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.6 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      // 70% White sparks, 30% Orange sparks
      if (Math.random() > 0.3) {
        particleColors[i * 3] = 1.0;
        particleColors[i * 3 + 1] = 1.0;
        particleColors[i * 3 + 2] = 1.0;
      } else {
        particleColors[i * 3] = 0.91; // #e9800a
        particleColors[i * 3 + 1] = 0.50;
        particleColors[i * 3 + 2] = 0.04;
      }
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particleCloud);

    // 8. Interactive Mouse Parallax (Smooth Lerp with bounds clamping)
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const rawX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const rawY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = Math.max(-1, Math.min(1, rawX));
      mouseY = Math.max(-1, Math.min(1, rawY));
      targetRotationY = mouseX * 0.4;
      targetRotationX = -mouseY * 0.3;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Visibility Observer to pause when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Window Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // 9. 60fps Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Continuous Fluid Rotations
      outerMesh.rotation.y += delta * 0.35;
      outerMesh.rotation.x += delta * 0.15;

      innerMesh.rotation.y -= delta * 0.6;
      innerMesh.rotation.z += delta * 0.3;
      innerWireMesh.rotation.y -= delta * 0.6;
      innerWireMesh.rotation.z += delta * 0.3;

      ringMesh1.rotation.z += delta * 0.5;
      ringMesh2.rotation.x += delta * 0.45;

      particleCloud.rotation.y += delta * 0.08;

      // Beacon Breathing Pulse
      const pulseScale = 1.0 + Math.sin(time * 3.5) * 0.15;
      beaconMesh.scale.set(pulseScale, pulseScale, pulseScale);
      haloMesh.scale.set(pulseScale * 1.1, pulseScale * 1.1, pulseScale * 1.1);

      // Lerp mouse interaction
      coreGroup.rotation.y += (targetRotationY - coreGroup.rotation.y) * 0.05;
      coreGroup.rotation.x += (targetRotationX - coreGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      resizeObserver.disconnect();

      outerGeo.dispose();
      outerMat.dispose();
      verticesGeo.dispose();
      verticesMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      innerWireMat.dispose();
      ringGeo.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      beaconGeo.dispose();
      beaconMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isRtl]);

  if (!webglSupported) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="relative flex h-72 w-72 items-center justify-center rounded-full border border-border bg-surface p-6 shadow-glow-sm">
          <div className="h-8 w-8 rounded-full bg-accent shadow-glow-md" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      role="img"
      aria-label="Interactive 3D Sovereign Neural Mesh Architecture"
      className={`relative w-full max-w-[480px] aspect-square flex items-center justify-center pointer-events-auto select-none overflow-visible ${className}`}
    />
  );
}
