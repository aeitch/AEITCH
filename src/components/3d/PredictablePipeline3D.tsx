"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export interface PredictablePipeline3DProps {
  className?: string;
  activeStep?: number;
  onSelectStep?: (index: number) => void;
}

// Stage node positional configuration in 3D coordinate space
const STAGE_NODES = [
  { index: 0, id: 'discovery', label: '01 Discovery', pos: new THREE.Vector3(-3.2, 1.2, -0.6), color: 0xe9800a },
  { index: 1, id: 'design', label: '02 Architecture', pos: new THREE.Vector3(-1.6, 0.5, 0.4), color: 0xffa033 },
  { index: 2, id: 'concurrent', label: '03 Concurrent Pods', pos: new THREE.Vector3(0.0, -0.1, 0.8), color: 0xe9800a },
  { index: 3, id: 'security', label: '04 SecHardening', pos: new THREE.Vector3(1.6, -0.6, 0.4), color: 0xffa033 },
  { index: 4, id: 'handover', label: '05 Sovereign IP', pos: new THREE.Vector3(3.2, -1.1, -0.6), color: 0xe9800a },
];

export function PredictablePipeline3D({
  className = '',
  activeStep = 0,
  onSelectStep,
}: PredictablePipeline3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  const activeStepRef = useRef<number>(activeStep);
  activeStepRef.current = activeStep;

  const onSelectStepRef = useRef(onSelectStep);
  onSelectStepRef.current = onSelectStep;

  // Camera lookAt and position targets for smooth lerping
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 6.2));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.1, y: 0.0 });

  // Update target focus when activeStep changes
  useEffect(() => {
    const node = STAGE_NODES[activeStep] || STAGE_NODES[0];
    // Slightly offset camera position relative to the active node for cinematic depth
    targetLookAtRef.current.copy(node.pos);
    targetCamPosRef.current.set(node.pos.x * 0.45, node.pos.y * 0.45 + 0.3, 5.2);
  }, [activeStep]);

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
    camera.position.set(0, 0, 6.2);
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

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const amberLight = new THREE.PointLight(0xe9800a, 4.0, 15);
    amberLight.position.set(2, 3, 4);
    scene.add(amberLight);

    const coldRimLight = new THREE.DirectionalLight(0xffffff, 1.0);
    coldRimLight.position.set(-4, 2, -2);
    scene.add(coldRimLight);

    // 3. Central Pipeline Group
    const pipelineGroup = new THREE.Group();
    scene.add(pipelineGroup);

    // 4. Construct Catmull-Rom Spline Curve joining all 5 nodes
    const curvePoints = STAGE_NODES.map((n) => n.pos);
    const splineCurve = new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.5);

    // Tube Geometry along the curve
    const tubeGeo = new THREE.TubeGeometry(splineCurve, 80, 0.04, 12, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0x332211,
      emissive: 0xe9800a,
      emissiveIntensity: 0.35,
      roughness: 0.4,
      metalness: 0.8,
      transparent: true,
      opacity: 0.85,
    });
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    pipelineGroup.add(tubeMesh);

    // Wireframe Cage around the tube for cybernetic texture
    const tubeWireGeo = new THREE.TubeGeometry(splineCurve, 50, 0.08, 6, false);
    const tubeWireMat = new THREE.MeshBasicMaterial({
      color: 0xe9800a,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const tubeWireMesh = new THREE.Mesh(tubeWireGeo, tubeWireMat);
    pipelineGroup.add(tubeWireMesh);

    // 5. Build Station Nodes & Rotating Gyro Rings
    const nodeMeshes: Array<{
      group: THREE.Group;
      core: THREE.Mesh;
      ring1: THREE.Mesh;
      ring2: THREE.Mesh;
      halo: THREE.Mesh;
      hitMesh: THREE.Mesh;
      index: number;
    }> = [];

    const coreGeo = new THREE.OctahedronGeometry(0.24, 0);
    const ringGeo1 = new THREE.TorusGeometry(0.36, 0.015, 8, 32);
    const ringGeo2 = new THREE.TorusGeometry(0.44, 0.012, 8, 32);
    const haloGeo = new THREE.RingGeometry(0.46, 0.65, 32);
    const hitGeo = new THREE.SphereGeometry(0.7, 16, 16);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });

    STAGE_NODES.forEach((stg, i) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.copy(stg.pos);

      // Core faceted diamond
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        emissive: stg.color,
        emissiveIntensity: i === activeStepRef.current ? 1.6 : 0.6,
        roughness: 0.2,
        metalness: 0.9,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      nodeGroup.add(core);

      // Rotating Gimbal Rings
      const ringMat1 = new THREE.MeshBasicMaterial({
        color: stg.color,
        transparent: true,
        opacity: i === activeStepRef.current ? 0.9 : 0.4,
      });
      const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
      nodeGroup.add(ring1);

      const ringMat2 = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: i === activeStepRef.current ? 0.7 : 0.25,
      });
      const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
      ring2.rotation.x = Math.PI / 2;
      nodeGroup.add(ring2);

      // Outer Pulsing Halo
      const haloMat = new THREE.MeshBasicMaterial({
        color: stg.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: i === activeStepRef.current ? 0.6 : 0.15,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.lookAt(0, 0, 1);
      nodeGroup.add(halo);

      // Invisible Hit Box for direct click interaction
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.userData = { stepIndex: i };
      nodeGroup.add(hitMesh);

      pipelineGroup.add(nodeGroup);

      nodeMeshes.push({
        group: nodeGroup,
        core,
        ring1,
        ring2,
        halo,
        hitMesh,
        index: i,
      });
    });

    // 6. Traveling Data Packets / Pulses along the Spline
    const packetCount = 4;
    const packetGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
    });

    const packets: THREE.Mesh[] = [];
    for (let k = 0; k < packetCount; k++) {
      const p = new THREE.Mesh(packetGeo, packetMat);
      pipelineGroup.add(p);
      packets.push(p);
    }

    // 7. Ambient Particle Field
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePositions[p] = (Math.random() - 0.5) * 8.0;
      particlePositions[p + 1] = (Math.random() - 0.5) * 4.0;
      particlePositions[p + 2] = (Math.random() - 0.5) * 3.5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe9800a,
      size: 0.03,
      transparent: true,
      opacity: 0.35,
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    pipelineGroup.add(particleField);

    // 8. Raycasting & Mouse Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let dragDistance = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      dragDistance = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      dragDistance += Math.abs(deltaX) + Math.abs(deltaY);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotationRef.current.y += deltaX * 0.004;
      targetRotationRef.current.x = Math.max(
        -0.4,
        Math.min(0.4, targetRotationRef.current.x + deltaY * 0.003)
      );
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;

      // Only treat as a node click if pointer didn't drag extensively
      if (dragDistance < 6) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const hitMeshes = nodeMeshes.map((m) => m.hitMesh);
        const intersects = raycaster.intersectObjects(hitMeshes, false);

        if (intersects.length > 0) {
          const hitIdx = intersects[0].object.userData.stepIndex;
          if (typeof hitIdx === 'number' && onSelectStepRef.current) {
            onSelectStepRef.current(hitIdx);
          }
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    const clock = new THREE.Clock();
    const currentCamPos = new THREE.Vector3().copy(camera.position);
    const currentLookAt = new THREE.Vector3(0, 0, 0);

    const animate = () => {
      if (isDestroyed) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Camera smooth lerping toward focused stage node
      currentCamPos.lerp(targetCamPosRef.current, 0.04);
      currentLookAt.lerp(targetLookAtRef.current, 0.04);
      camera.position.copy(currentCamPos);
      camera.lookAt(currentLookAt);

      // Pipeline group subtle parallax tilt
      pipelineGroup.rotation.y += (targetRotationRef.current.y - pipelineGroup.rotation.y) * 0.05;
      pipelineGroup.rotation.x += (targetRotationRef.current.x - pipelineGroup.rotation.x) * 0.05;

      // Animate Station Nodes & Highlight Active Step
      const currentActive = activeStepRef.current;
      nodeMeshes.forEach((item, idx) => {
        const isActive = idx === currentActive;

        // Gyro ring rotations
        item.ring1.rotation.y = elapsedTime * (isActive ? 1.6 : 0.6) + idx;
        item.ring2.rotation.z = -elapsedTime * (isActive ? 1.2 : 0.4) + idx;
        item.core.rotation.y = elapsedTime * (isActive ? 0.8 : 0.3);

        // Core and halo emissive pulsing
        const coreMat = item.core.material as THREE.MeshStandardMaterial;
        const ringMat1 = item.ring1.material as THREE.MeshBasicMaterial;
        const haloMat = item.halo.material as THREE.MeshBasicMaterial;

        if (isActive) {
          const pulse = 1.0 + Math.sin(elapsedTime * 4) * 0.25;
          coreMat.emissiveIntensity = 1.4 * pulse;
          ringMat1.opacity = 0.95;
          haloMat.opacity = 0.7 + Math.sin(elapsedTime * 3) * 0.2;
          item.halo.scale.set(pulse, pulse, pulse);
        } else {
          coreMat.emissiveIntensity = 0.5;
          ringMat1.opacity = 0.35;
          haloMat.opacity = 0.12;
          item.halo.scale.set(1.0, 1.0, 1.0);
        }
      });

      // Move packets along the spline curve
      packets.forEach((p, idx) => {
        const t = (elapsedTime * 0.12 + idx * (1 / packetCount)) % 1;
        p.position.copy(splineCurve.getPoint(t));
      });

      // Ambient particle slow drifting
      particleField.rotation.y = elapsedTime * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // 11. Complete Cleanup on Unmount
    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      tubeGeo.dispose();
      tubeMat.dispose();
      tubeWireGeo.dispose();
      tubeWireMat.dispose();
      coreGeo.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      haloGeo.dispose();
      hitGeo.dispose();
      hitMat.dispose();
      packetGeo.dispose();
      packetMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  if (!webglSupported) {
    return (
      <div className={`flex items-center justify-center rounded-3xl border border-white/10 bg-black/60 p-8 text-center ${className}`}>
        <p className="text-xs font-mono text-white/50">
          WebGL Pipeline Acceleration Inactive. Standard View Active.
        </p>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-[360px] sm:h-[420px] lg:h-[480px] flex items-center justify-center select-none ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Spatial Telemetry HUD Badge */}
      <div className="pointer-events-none absolute top-4 start-4 flex items-center gap-2 rounded-xl border border-white/10 bg-black/75 px-3 py-1.5 backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-[#e9800a] animate-pulse" />
        <span className="font-mono text-[11px] font-bold text-white tracking-wider">
          LIVE SPRINT ENGINE 3D
        </span>
      </div>

      <div className="pointer-events-none absolute bottom-4 end-4 text-end">
        <span className="font-mono text-[10px] text-white/40 block">
          PIPELINE TOPOLOGY
        </span>
        <span className="font-mono text-xs font-bold text-[#e9800a]">
          DISCOVERY ➔ IP HANDOVER
        </span>
      </div>

      {/* Bottom Drag / Interactive Node Click Hint */}
      <div className="pointer-events-none absolute bottom-4 start-4 font-mono text-[10px] text-white/40">
        CLICK NODES OR DRAG TO ROTATE
      </div>
    </div>
  );
}
