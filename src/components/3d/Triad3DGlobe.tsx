"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export type HubId = 'us' | 'riyadh' | 'pakistan';

export interface Triad3DGlobeProps {
  className?: string;
  activeHub?: HubId;
  onSelectHub?: (hub: HubId) => void;
}

// Geographic Coordinates
const HUBS = {
  us: {
    id: 'us' as const,
    name: 'San Francisco, USA',
    lat: 37.7749,
    lon: -122.4194,
    color: '#e9800a',
  },
  riyadh: {
    id: 'riyadh' as const,
    name: 'Riyadh, Saudi Arabia',
    lat: 24.7136,
    lon: 46.6753,
    color: '#ff9420',
  },
  pakistan: {
    id: 'pakistan' as const,
    name: 'Islamabad / Lahore, Pakistan',
    lat: 31.5204,
    lon: 74.3587,
    color: '#e9800a',
  },
};

// Convert Lat/Lon to 3D Vector on Sphere
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// Generate Parabolic Curve between two 3D points above the sphere
function createCurvedArc(p1: THREE.Vector3, p2: THREE.Vector3, maxElevation: number) {
  const distance = p1.distanceTo(p2);
  const mid = p1.clone().add(p2).multiplyScalar(0.5);
  const midLength = mid.length();
  mid.normalize();
  mid.multiplyScalar(midLength + distance * maxElevation);

  const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
  return curve;
}

export function Triad3DGlobe({
  className = '',
  activeHub = 'riyadh',
  onSelectHub,
}: Triad3DGlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  // Keep ref to target rotation so user clicks smoothly rotate the globe
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.2, y: -0.8 });
  const activeHubRef = useRef<HubId>(activeHub);
  activeHubRef.current = activeHub;

  const beaconsRef = useRef<Record<
    HubId,
    { mat: THREE.MeshBasicMaterial; haloMat: THREE.MeshBasicMaterial }
  > | null>(null);

  useEffect(() => {
    const hub = HUBS[activeHub];
    if (hub) {
      // Calculate target Y rotation so that the selected hub faces the camera
      const radLon = (hub.lon * Math.PI) / 180;
      const radLat = (hub.lat * Math.PI) / 180;
      targetRotationRef.current = {
        x: radLat * 0.4,
        y: -radLon - Math.PI / 2,
      };
    }

    if (beaconsRef.current) {
      (['us', 'riyadh', 'pakistan'] as HubId[]).forEach((h) => {
        const beacon = beaconsRef.current?.[h];
        if (beacon) {
          const isActive = h === activeHub;
          beacon.mat.color.setHex(isActive ? 0xffffff : 0xe9800a);
          beacon.haloMat.opacity = isActive ? 0.95 : 0.55;
        }
      });
    }
  }, [activeHub]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
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

    let animationFrameId: number;
    let isDestroyed = false;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 6.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xe9800a, 3, 20);
    goldLight.position.set(4, 5, 5);
    scene.add(goldLight);

    const blueRimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    blueRimLight.position.set(-5, 3, -4);
    scene.add(blueRimLight);

    // 3. Globe Core Structure
    const globeRadius = 2.1;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Dark Inner Sphere with subtle specular reflection
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 48, 48);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x050505,
      roughness: 0.8,
      metalness: 0.3,
      transparent: true,
      opacity: 0.96,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphereMesh);

    // Wireframe Atmospheric Cage
    const wireGeo = new THREE.IcosahedronGeometry(globeRadius + 0.04, 3);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x222222,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireMesh);

    // Subtle Equator & Latitude Rings
    const ringGeo = new THREE.RingGeometry(globeRadius + 0.08, globeRadius + 0.1, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xe9800a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.18,
    });
    const equator = new THREE.Mesh(ringGeo, ringMat);
    equator.rotation.x = Math.PI / 2;
    globeGroup.add(equator);

    // 4. Hub Beacon Positions
    const posUS = latLonToVector3(HUBS.us.lat, HUBS.us.lon, globeRadius);
    const posRiyadh = latLonToVector3(HUBS.riyadh.lat, HUBS.riyadh.lon, globeRadius);
    const posPK = latLonToVector3(HUBS.pakistan.lat, HUBS.pakistan.lon, globeRadius);

    // Beacon Meshes
    const beaconGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const beaconHaloGeo = new THREE.RingGeometry(0.09, 0.14, 24);

    const makeBeacon = (pos: THREE.Vector3, isPrimary = false) => {
      const group = new THREE.Group();
      group.position.copy(pos);
      group.lookAt(0, 0, 0);

      // Core point
      const mat = new THREE.MeshBasicMaterial({
        color: isPrimary ? 0xffffff : 0xe9800a,
      });
      const mesh = new THREE.Mesh(beaconGeo, mat);
      group.add(mesh);

      // Halo ring
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0xe9800a,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: isPrimary ? 0.9 : 0.6,
      });
      const halo = new THREE.Mesh(beaconHaloGeo, haloMat);
      halo.position.z = -0.02;
      group.add(halo);

      return { group, halo, mat, haloMat };
    };

    const currentHub = activeHubRef.current;
    const beaconUS = makeBeacon(posUS, currentHub === 'us');
    const beaconRiyadh = makeBeacon(posRiyadh, currentHub === 'riyadh');
    const beaconPK = makeBeacon(posPK, currentHub === 'pakistan');

    beaconsRef.current = {
      us: { mat: beaconUS.mat, haloMat: beaconUS.haloMat },
      riyadh: { mat: beaconRiyadh.mat, haloMat: beaconRiyadh.haloMat },
      pakistan: { mat: beaconPK.mat, haloMat: beaconPK.haloMat },
    };

    globeGroup.add(beaconUS.group);
    globeGroup.add(beaconRiyadh.group);
    globeGroup.add(beaconPK.group);

    // 5. Parabolic Geodesic Data Arcs
    const arcUS_Riyadh = createCurvedArc(posUS, posRiyadh, 0.28);
    const arcRiyadh_PK = createCurvedArc(posRiyadh, posPK, 0.24);
    const arcPK_US = createCurvedArc(posPK, posUS, 0.32);

    const createArcLine = (curve: THREE.QuadraticBezierCurve3, color: number) => {
      const points = curve.getPoints(50);
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.75,
        linewidth: 1.5,
      });
      return new THREE.Line(geo, mat);
    };

    const line1 = createArcLine(arcUS_Riyadh, 0xe9800a);
    const line2 = createArcLine(arcRiyadh_PK, 0xffa033);
    const line3 = createArcLine(arcPK_US, 0x555555);

    globeGroup.add(line1);
    globeGroup.add(line2);
    globeGroup.add(line3);

    // 6. Traveling Light Pulses along the Arcs
    const pulseGeo = new THREE.SphereGeometry(0.04, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const pulse1 = new THREE.Mesh(pulseGeo, pulseMat);
    const pulse2 = new THREE.Mesh(pulseGeo, pulseMat);
    const pulse3 = new THREE.Mesh(pulseGeo, pulseMat);

    globeGroup.add(pulse1);
    globeGroup.add(pulse2);
    globeGroup.add(pulse3);

    // 7. Ambient Floating Dust Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particleCoords = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const r = globeRadius + 0.3 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particleCoords[i] = r * Math.sin(phi) * Math.cos(theta);
      particleCoords[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      particleCoords[i + 2] = r * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particleCoords, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe9800a,
      size: 0.035,
      transparent: true,
      opacity: 0.45,
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    globeGroup.add(particleCloud);

    // 8. Interaction: Pointer Drag / Parallax
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let autoRotate = true;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      autoRotate = false;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotationRef.current.y += deltaX * 0.005;
      targetRotationRef.current.x = Math.max(
        -0.8,
        Math.min(0.8, targetRotationRef.current.x + deltaY * 0.005)
      );
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      if (isDestroyed) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation toward target rotation
      globeGroup.rotation.y += (targetRotationRef.current.y - globeGroup.rotation.y) * 0.05;
      globeGroup.rotation.x += (targetRotationRef.current.x - globeGroup.rotation.x) * 0.05;

      // Slow drift if not dragging
      if (autoRotate && !isDragging) {
        targetRotationRef.current.y += 0.001;
      }

      // Move Pulses along curves
      const t1 = (elapsedTime * 0.35) % 1;
      const t2 = (elapsedTime * 0.42 + 0.33) % 1;
      const t3 = (elapsedTime * 0.28 + 0.66) % 1;

      pulse1.position.copy(arcUS_Riyadh.getPoint(t1));
      pulse2.position.copy(arcRiyadh_PK.getPoint(t2));
      pulse3.position.copy(arcPK_US.getPoint(t3));

      // Gentle Halo pulse
      const haloScale = 1.0 + Math.sin(elapsedTime * 3) * 0.12;
      beaconUS.halo.scale.set(haloScale, haloScale, haloScale);
      beaconRiyadh.halo.scale.set(haloScale, haloScale, haloScale);
      beaconPK.halo.scale.set(haloScale, haloScale, haloScale);

      // Particle cloud slow spin
      particleCloud.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Three.js objects
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      beaconGeo.dispose();
      beaconHaloGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  if (!webglSupported) {
    return (
      <div className={`flex items-center justify-center rounded-3xl border border-white/10 bg-black/60 p-8 text-center ${className}`}>
        <p className="text-xs font-mono text-white/50">
          3D Canvas Acceleration Disabled. Standard Architecture Active.
        </p>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-[380px] sm:h-[440px] lg:h-[500px] flex items-center justify-center select-none ${className}`}>
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Spatial HUD Badges */}
      <div className="pointer-events-none absolute top-4 start-4 flex items-center gap-2 rounded-xl border border-white/10 bg-black/70 px-3 py-1.5 backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-[#e9800a] animate-pulse" />
        <span className="font-mono text-[11px] font-bold text-white tracking-wider">
          LIVE GLOBAL ARCS
        </span>
      </div>

      <div className="pointer-events-none absolute bottom-4 end-4 text-end">
        <span className="font-mono text-[10px] text-white/40 block">
          GEODESIC TOPOLOGY
        </span>
        <span className="font-mono text-xs font-bold text-[#e9800a]">
          US ↔ KSA ↔ PK
        </span>
      </div>

      {/* Subtle Bottom Drag Hint */}
      <div className="pointer-events-none absolute bottom-4 start-4 font-mono text-[10px] text-white/40">
        DRAG TO ROTATE GLOBE
      </div>
    </div>
  );
}
