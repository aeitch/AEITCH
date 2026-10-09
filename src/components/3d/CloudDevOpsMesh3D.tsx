"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export interface CloudDevOpsMesh3DProps {
  className?: string;
  activeDisciplineId?: string;
  onSelectDiscipline?: (id: string) => void;
}

interface CloudNode {
  id: string;
  titleEn: string;
  titleAr: string;
  focus: string;
  pos: THREE.Vector3;
  color: number;
}

const CLOUD_NODES: CloudNode[] = [
  {
    id: 'iac-terraform',
    titleEn: 'Zero-Drift Terraform & OpenTofu',
    titleAr: 'تيرفورم ككود بدون انحراف',
    focus: 'Immutable IaC & Automated OPA Sentinel Gates',
    pos: new THREE.Vector3(0, 2.3, 0.3),
    color: 0xe9800a,
  },
  {
    id: 'k8s-mesh',
    titleEn: 'Multi-AZ Kubernetes & Istio Mesh',
    titleAr: 'عناقيد كوبرنيتس المتعددة و Istio',
    focus: 'EKS/AKS In-Kingdom Autoscaling via Karpenter',
    pos: new THREE.Vector3(2.3, 0.8, -0.4),
    color: 0x10b981,
  },
  {
    id: 'gitops-argocd',
    titleEn: 'ArgoCD Declarative GitOps',
    titleAr: 'مزامنة GitOps المؤتمتة عبر ArgoCD',
    focus: 'Zero-Downtime Canary Rollouts & Git as Truth',
    pos: new THREE.Vector3(1.6, -1.8, 0.4),
    color: 0xe9800a,
  },
  {
    id: 'opentelemetry-hub',
    titleEn: 'OpenTelemetry & Real-Time Tracing',
    titleAr: 'المراقبة الموزعة عبر OpenTelemetry',
    focus: 'Distributed Tracing, Prometheus & Grafana APM',
    pos: new THREE.Vector3(-1.6, -1.8, 0.4),
    color: 0x10b981,
  },
  {
    id: 'finops-engine',
    titleEn: 'FinOps & Spot Rightsizing',
    titleAr: 'ترشيد التكاليف السحابية FinOps',
    focus: '30-50% Spend Reduction via Dynamic Spot Pools',
    pos: new THREE.Vector3(-2.3, 0.8, -0.4),
    color: 0xffa033,
  },
];

function createCurvedArc(p1: THREE.Vector3, p2: THREE.Vector3, elevation: number) {
  const mid = p1.clone().add(p2).multiplyScalar(0.5);
  const distance = p1.distanceTo(p2);
  const midLength = mid.length();
  mid.normalize();
  mid.multiplyScalar(midLength + distance * elevation);
  return new THREE.QuadraticBezierCurve3(p1, mid, p2);
}

export function CloudDevOpsMesh3D({
  className = '',
  activeDisciplineId = 'iac-terraform',
  onSelectDiscipline,
}: CloudDevOpsMesh3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  const activeDisciplineRef = useRef<string>(activeDisciplineId);
  activeDisciplineRef.current = activeDisciplineId;

  const onSelectDisciplineRef = useRef(onSelectDiscipline);
  onSelectDisciplineRef.current = onSelectDiscipline;

  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.12, y: 0.0 });

  useEffect(() => {
    const node = CLOUD_NODES.find((n) => n.id === activeDisciplineId);
    if (node) {
      targetRotationRef.current = {
        x: -node.pos.y * 0.07,
        y: node.pos.x * 0.11,
      };
    }
  }, [activeDisciplineId]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080808, 0.09);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 7.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Central Multi-Cloud Core
    const coreGroup = new THREE.Group();
    rootGroup.add(coreGroup);

    // Inner Glowing Core (Icosahedron)
    const coreGeom = new THREE.IcosahedronGeometry(0.85, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x141210,
      emissive: 0xe9800a,
      emissiveIntensity: 0.55,
      metalness: 0.9,
      roughness: 0.15,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    coreGroup.add(coreMesh);

    // Inner Solid Cloud Jewel (Dodecahedron)
    const jewelGeom = new THREE.DodecahedronGeometry(0.48, 0);
    const jewelMat = new THREE.MeshStandardMaterial({
      color: 0xe9800a,
      emissive: 0xffa033,
      emissiveIntensity: 0.75,
      metalness: 0.8,
      roughness: 0.2,
    });
    const jewelMesh = new THREE.Mesh(jewelGeom, jewelMat);
    coreGroup.add(jewelMesh);

    // Concentric Gyro Rings
    const ring1Geom = new THREE.TorusGeometry(1.35, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xe9800a,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ring1Geom, ringMat1);
    coreGroup.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(1.65, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.45,
    });
    const ring2 = new THREE.Mesh(ring2Geom, ringMat2);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    coreGroup.add(ring2);

    const ring3Geom = new THREE.TorusGeometry(1.95, 0.012, 16, 100);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0xffa033,
      transparent: true,
      opacity: 0.35,
    });
    const ring3 = new THREE.Mesh(ring3Geom, ringMat3);
    ring3.rotation.x = -Math.PI / 4;
    coreGroup.add(ring3);

    // 2. Satellite Cloud DevOps Nodes
    const nodeMeshes: { mesh: THREE.Group; node: CloudNode }[] = [];

    CLOUD_NODES.forEach((node) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.copy(node.pos);

      // Outer wireframe orb
      const orbGeom = new THREE.IcosahedronGeometry(0.32, 1);
      const orbMat = new THREE.MeshStandardMaterial({
        color: 0x1c1a17,
        emissive: node.color,
        emissiveIntensity: 0.6,
        metalness: 0.7,
        roughness: 0.2,
        wireframe: true,
      });
      const orbMesh = new THREE.Mesh(orbGeom, orbMat);
      nodeGroup.add(orbMesh);

      // Inner glowing core
      const innerGeom = new THREE.SphereGeometry(0.14, 16, 16);
      const innerMat = new THREE.MeshBasicMaterial({
        color: node.color,
      });
      const innerMesh = new THREE.Mesh(innerGeom, innerMat);
      nodeGroup.add(innerMesh);

      // Node Halo Ring
      const haloGeom = new THREE.RingGeometry(0.38, 0.44, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: node.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
      });
      const haloMesh = new THREE.Mesh(haloGeom, haloMat);
      nodeGroup.add(haloMesh);

      rootGroup.add(nodeGroup);
      nodeMeshes.push({ mesh: nodeGroup, node });
    });

    // 3. Curved Bézier Energy Beams connecting Core to Satellite Nodes
    const packetMeshes: { curve: THREE.QuadraticBezierCurve3; mesh: THREE.Mesh; progress: number; speed: number }[] = [];

    CLOUD_NODES.forEach((node, i) => {
      const curve = createCurvedArc(new THREE.Vector3(0, 0, 0), node.pos, 0.22);
      const points = curve.getPoints(40);
      const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.35,
      });
      const line = new THREE.Line(lineGeom, lineMat);
      rootGroup.add(line);

      // Moving Data Packets along the beam
      const pktGeom = new THREE.SphereGeometry(0.06, 8, 8);
      const pktMat = new THREE.MeshBasicMaterial({
        color: node.color,
      });
      const pkt = new THREE.Mesh(pktGeom, pktMat);
      rootGroup.add(pkt);

      packetMeshes.push({
        curve,
        mesh: pkt,
        progress: (i * 0.2) % 1.0,
        speed: 0.006 + (i % 3) * 0.002,
      });
    });

    // 4. Subtle Background Particle Dust
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe9800a,
      size: 0.045,
      transparent: true,
      opacity: 0.25,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0xe9800a, 2.8, 12);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 0.9);
    topLight.position.set(3, 8, 5);
    scene.add(topLight);

    // Mouse Drag Interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const currentRotation = { x: 0.12, y: 0.0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      targetRotationRef.current.y += deltaX * 0.005;
      targetRotationRef.current.x += deltaY * 0.005;
      targetRotationRef.current.x = Math.max(-0.6, Math.min(0.6, targetRotationRef.current.x));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const interactiveTargets: THREE.Object3D[] = [];
      nodeMeshes.forEach((item) => {
        item.mesh.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            interactiveTargets.push(child);
          }
        });
      });

      const intersects = raycaster.intersectObjects(interactiveTargets, false);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const matched = nodeMeshes.find((item) => {
          let found = false;
          item.mesh.traverse((c) => {
            if (c === hit) found = true;
          });
          return found;
        });

        if (matched && onSelectDisciplineRef.current) {
          onSelectDisciplineRef.current(matched.node.id);
        }
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domEl.addEventListener('click', onClick);

    // Touch Support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      targetRotationRef.current.y += deltaX * 0.005;
      targetRotationRef.current.x += deltaY * 0.005;
      targetRotationRef.current.x = Math.max(-0.6, Math.min(0.6, targetRotationRef.current.x));

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    domEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth inertia rotation
      currentRotation.x += (targetRotationRef.current.x - currentRotation.x) * 0.06;
      currentRotation.y += (targetRotationRef.current.y - currentRotation.y) * 0.06;

      rootGroup.rotation.x = currentRotation.x;
      rootGroup.rotation.y = currentRotation.y + elapsedTime * 0.08;

      // Rotate core elements
      coreMesh.rotation.y = -elapsedTime * 0.25;
      coreMesh.rotation.x = elapsedTime * 0.15;
      jewelMesh.rotation.y = elapsedTime * 0.35;
      jewelMesh.rotation.z = -elapsedTime * 0.2;

      ring1.rotation.z = elapsedTime * 0.35;
      ring2.rotation.z = -elapsedTime * 0.25;
      ring3.rotation.y = elapsedTime * 0.2;

      // Animate node halos & pulsating orientation
      nodeMeshes.forEach((item, idx) => {
        item.mesh.rotation.y = elapsedTime * (0.3 + idx * 0.1);
        item.mesh.position.y = item.node.pos.y + Math.sin(elapsedTime * 2 + idx) * 0.06;

        const isCurrentActive = item.node.id === activeDisciplineRef.current;
        const targetScale = isCurrentActive ? 1.25 : 1.0;
        item.mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      });

      // Move data packets along curves
      packetMeshes.forEach((pkt) => {
        pkt.progress += pkt.speed;
        if (pkt.progress > 1.0) pkt.progress = 0.0;
        const pt = pkt.curve.getPoint(pkt.progress);
        pkt.mesh.position.copy(pt);
      });

      particles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('click', onClick);
      domEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      jewelGeom.dispose();
      jewelMat.dispose();
      ring1Geom.dispose();
      ringMat1.dispose();
      ring2Geom.dispose();
      ringMat2.dispose();
      ring3Geom.dispose();
      ringMat3.dispose();
      particleGeom.dispose();
      particleMat.dispose();
    };
  }, []);

  if (!webglSupported) {
    return (
      <div className={`relative flex items-center justify-center rounded-3xl border border-white/10 bg-[#0c0c0e] p-8 text-center ${className}`}>
        <div className="max-w-xs space-y-3 font-mono text-xs text-white/70">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#e9800a]/10 border border-[#e9800a]/30 text-[#e9800a]">
            <span>K8S</span>
          </div>
          <span className="font-bold text-white block">Multi-Cloud Fabric Mesh</span>
          <span className="text-[11px] text-white/50 block">AWS Riyadh • Azure Saudi • Google Cloud Dammam</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`relative cursor-grab active:cursor-grabbing overflow-hidden ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
}
