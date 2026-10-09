"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export interface PlatformCluster3DProps {
  className?: string;
  activeClusterId?: string;
  onSelectCluster?: (clusterId: string) => void;
}

interface ClusterNode {
  id: string;
  name: string;
  role: string;
  pos: THREE.Vector3;
  color: number;
}

// 5 Key Platform Engine Nodes: Control Plane, Ingress Mesh, Worker Pods, GitOps Synchronizer, SRE Telemetry
const CLUSTER_NODES: ClusterNode[] = [
  {
    id: 'control-plane',
    name: 'K8s Control Plane (EKS/AKS)',
    role: 'API Server & Etcd Quorum',
    pos: new THREE.Vector3(0, 2.2, 0.4),
    color: 0xe9800a,
  },
  {
    id: 'gitops',
    name: 'ArgoCD GitOps Sync Engine',
    role: 'Automated Canary & Blue/Green',
    pos: new THREE.Vector3(-2.4, 0.6, -0.5),
    color: 0xffa033,
  },
  {
    id: 'ingress',
    name: 'Istio Service Mesh & Envoy',
    role: 'mTLS Ingress & Traffic Shaping',
    pos: new THREE.Vector3(2.4, 0.6, -0.5),
    color: 0xe9800a,
  },
  {
    id: 'workers',
    name: 'Karpenter Worker Autoscaling',
    role: 'Dynamic Spot & Multi-AZ Pods',
    pos: new THREE.Vector3(1.6, -1.8, 0.5),
    color: 0xffa033,
  },
  {
    id: 'sre',
    name: 'OpenTelemetry & Prometheus',
    role: 'Distributed Tracing & SLOs',
    pos: new THREE.Vector3(-1.6, -1.8, 0.5),
    color: 0xe9800a,
  },
];

// Helper to construct curved parabolic arcs between points
function createCurvedArc(p1: THREE.Vector3, p2: THREE.Vector3, elevation: number) {
  const mid = p1.clone().add(p2).multiplyScalar(0.5);
  const distance = p1.distanceTo(p2);
  const midLength = mid.length();
  mid.normalize();
  mid.multiplyScalar(midLength + distance * elevation);
  return new THREE.QuadraticBezierCurve3(p1, mid, p2);
}

export function PlatformCluster3D({
  className = '',
  activeClusterId = 'control-plane',
  onSelectCluster,
}: PlatformCluster3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  const activeClusterRef = useRef<string>(activeClusterId);
  activeClusterRef.current = activeClusterId;

  const onSelectClusterRef = useRef(onSelectCluster);
  onSelectClusterRef.current = onSelectCluster;

  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.15, y: 0.0 });

  useEffect(() => {
    const node = CLUSTER_NODES.find((n) => n.id === activeClusterId);
    if (node) {
      targetRotationRef.current = {
        x: -node.pos.y * 0.08,
        y: node.pos.x * 0.12,
      };
    }
  }, [activeClusterId]);

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
    camera.position.set(0, 0, 7.2);
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const amberLight = new THREE.PointLight(0xe9800a, 4.5, 18);
    amberLight.position.set(3, 4, 5);
    scene.add(amberLight);

    const coolRimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    coolRimLight.position.set(-5, -2, -3);
    scene.add(coolRimLight);

    // 3. Central Platform Mesh Group
    const clusterGroup = new THREE.Group();
    scene.add(clusterGroup);

    // 4. Central Orchestrator Core (K8s Cluster Spine & Rotating Gyro Rings)
    const centerPos = new THREE.Vector3(0, 0, 0);

    const centerCoreGeo = new THREE.DodecahedronGeometry(0.55, 0);
    const centerCoreMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      emissive: 0xe9800a,
      emissiveIntensity: 1.2,
      roughness: 0.3,
      metalness: 0.9,
    });
    const centerCore = new THREE.Mesh(centerCoreGeo, centerCoreMat);
    clusterGroup.add(centerCore);

    // Wireframe Shield
    const centerWireGeo = new THREE.DodecahedronGeometry(0.72, 0);
    const centerWireMat = new THREE.MeshBasicMaterial({
      color: 0xe9800a,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const centerWire = new THREE.Mesh(centerWireGeo, centerWireMat);
    clusterGroup.add(centerWire);

    // Dual Concentric Platform Orbit Rings
    const ringGeo1 = new THREE.TorusGeometry(1.05, 0.018, 8, 48);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xe9800a,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    clusterGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(1.3, 0.014, 8, 48);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    clusterGroup.add(ring2);

    // 5. Build 5 Cluster Nodes
    const nodeMeshes: Array<{
      id: string;
      group: THREE.Group;
      core: THREE.Mesh;
      halo: THREE.Mesh;
      hitMesh: THREE.Mesh;
      basePos: THREE.Vector3;
    }> = [];

    // Hexagonal prism or faceted shape representing a container cluster node
    const nodeGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.32, 6);
    const haloGeo = new THREE.RingGeometry(0.38, 0.52, 32);
    const hitGeo = new THREE.SphereGeometry(0.65, 16, 16);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });

    CLUSTER_NODES.forEach((node) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.copy(node.pos);

      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x111114,
        emissive: node.color,
        emissiveIntensity: node.id === activeClusterRef.current ? 1.6 : 0.6,
        roughness: 0.2,
        metalness: 0.8,
      });
      const core = new THREE.Mesh(nodeGeo, coreMat);
      core.rotation.x = Math.PI / 6;
      nodeGroup.add(core);

      const haloMat = new THREE.MeshBasicMaterial({
        color: node.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: node.id === activeClusterRef.current ? 0.85 : 0.2,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.lookAt(0, 0, 1);
      nodeGroup.add(halo);

      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.userData = { nodeId: node.id };
      nodeGroup.add(hitMesh);

      clusterGroup.add(nodeGroup);

      nodeMeshes.push({
        id: node.id,
        group: nodeGroup,
        core,
        halo,
        hitMesh,
        basePos: node.pos.clone(),
      });
    });

    // 6. Connect Cluster Nodes to Central Core with Parabolic Laser Beams
    const curves: THREE.QuadraticBezierCurve3[] = [];
    const arcLines: THREE.Line[] = [];

    CLUSTER_NODES.forEach((node) => {
      const arcCurve = createCurvedArc(centerPos, node.pos, 0.22);
      curves.push(arcCurve);

      const pts = arcCurve.getPoints(40);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const arcMat = new THREE.LineBasicMaterial({
        color: 0xe9800a,
        transparent: true,
        opacity: 0.5,
        linewidth: 1.5,
      });
      const line = new THREE.Line(arcGeo, arcMat);
      clusterGroup.add(line);
      arcLines.push(line);
    });

    // 7. Continuous GitOps Sync Data Packets
    const packetCount = 8;
    const packetGeo = new THREE.SphereGeometry(0.065, 12, 12);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
    });

    const packets: Array<{ mesh: THREE.Mesh; curveIndex: number; offset: number }> = [];
    for (let k = 0; k < packetCount; k++) {
      const p = new THREE.Mesh(packetGeo, packetMat);
      clusterGroup.add(p);
      packets.push({
        mesh: p,
        curveIndex: k % curves.length,
        offset: k / packetCount,
      });
    }

    // 8. SRE Telemetry Particle Field
    const particleCount = 130;
    const particleGeo = new THREE.BufferGeometry();
    const particleCoords = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particleCoords[i] = (Math.random() - 0.5) * 8.5;
      particleCoords[i + 1] = (Math.random() - 0.5) * 6.0;
      particleCoords[i + 2] = (Math.random() - 0.5) * 4.0;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particleCoords, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe9800a,
      size: 0.035,
      transparent: true,
      opacity: 0.35,
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    clusterGroup.add(particleField);

    // 9. Pointer Drag & Raycasting Interaction
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
        -0.5,
        Math.min(0.5, targetRotationRef.current.x + deltaY * 0.003)
      );
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;

      if (dragDistance < 6) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const hitMeshes = nodeMeshes.map((m) => m.hitMesh);
        const intersects = raycaster.intersectObjects(hitMeshes, false);

        if (intersects.length > 0) {
          const hitId = intersects[0].object.userData.nodeId;
          if (hitId && onSelectClusterRef.current) {
            onSelectClusterRef.current(hitId);
          }
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // 10. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 11. Render Loop
    const clock = new THREE.Clock();

    const animate = () => {
      if (isDestroyed) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth parallax orbit
      clusterGroup.rotation.y += (targetRotationRef.current.y - clusterGroup.rotation.y) * 0.05;
      clusterGroup.rotation.x += (targetRotationRef.current.x - clusterGroup.rotation.x) * 0.05;

      // Central core continuous rotation
      centerCore.rotation.y = elapsedTime * 0.5;
      centerCore.rotation.x = elapsedTime * 0.3;
      centerWire.rotation.y = -elapsedTime * 0.25;
      ring1.rotation.z = elapsedTime * 0.7;
      ring2.rotation.z = -elapsedTime * 0.4;

      const currentActiveId = activeClusterRef.current;

      // Animate Nodes
      nodeMeshes.forEach((item, idx) => {
        const isActive = item.id === currentActiveId;

        item.group.position.y = item.basePos.y + Math.sin(elapsedTime * 2 + idx) * 0.08;
        item.core.rotation.y = elapsedTime * (isActive ? 1.5 : 0.4);

        const coreMat = item.core.material as THREE.MeshStandardMaterial;
        const haloMat = item.halo.material as THREE.MeshBasicMaterial;

        if (isActive) {
          const pulse = 1.0 + Math.sin(elapsedTime * 4) * 0.25;
          coreMat.emissiveIntensity = 1.7 * pulse;
          haloMat.opacity = 0.9;
          item.halo.scale.set(pulse, pulse, pulse);
        } else {
          coreMat.emissiveIntensity = 0.6;
          haloMat.opacity = 0.2;
          item.halo.scale.set(1.0, 1.0, 1.0);
        }
      });

      // Flow packets along curves
      packets.forEach((p) => {
        const curve = curves[p.curveIndex];
        const t = (elapsedTime * 0.26 + p.offset) % 1;
        p.mesh.position.copy(curve.getPoint(t));
      });

      particleField.rotation.y = elapsedTime * 0.012;

      renderer.render(scene, camera);
    };

    animate();

    // 12. Cleanup
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
      centerCoreGeo.dispose();
      centerCoreMat.dispose();
      centerWireGeo.dispose();
      centerWireMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      nodeGeo.dispose();
      haloGeo.dispose();
      hitGeo.dispose();
      hitMat.dispose();
      packetGeo.dispose();
      packetMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      arcLines.forEach((l) => l.geometry.dispose());
    };
  }, []);

  if (!webglSupported) {
    return (
      <div className={`flex items-center justify-center rounded-3xl border border-white/10 bg-black/60 p-8 text-center ${className}`}>
        <p className="text-xs font-mono text-white/50">
          WebGL Cluster Acceleration Inactive. Standard View Active.
        </p>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-[380px] sm:h-[440px] lg:h-[500px] flex items-center justify-center select-none ${className}`}>
      {/* 3D Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating HUD Telemetry Tags */}
      <div className="pointer-events-none absolute top-4 start-4 flex items-center gap-2 rounded-xl border border-white/10 bg-black/80 px-3 py-1.5 backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-[#e9800a] animate-pulse" />
        <span className="font-mono text-[11px] font-bold text-white tracking-wider">
          LIVE K8S GITOPS FABRIC
        </span>
      </div>

      <div className="pointer-events-none absolute bottom-4 end-4 text-end">
        <span className="font-mono text-[10px] text-white/40 block">
          DEPLOY LEAD TIME
        </span>
        <span className="font-mono text-xs font-bold text-[#e9800a]">
          &lt; 8 MINS // ZERO DRIFT
        </span>
      </div>

      <div className="pointer-events-none absolute bottom-4 start-4 font-mono text-[10px] text-white/40">
        CLICK NODES TO INSPECT CLUSTER
      </div>
    </div>
  );
}
