"use client";

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
}

export interface ParticleCanvasProps extends React.HTMLAttributes<HTMLCanvasElement> {
  particleCount?: number;
  maxDistance?: number;
  repulsionRadius?: number;
  className?: string;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  particleCount,
  maxDistance = 110,
  repulsionRadius = 160,
  className = '',
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null; radius: number }>({
    x: null,
    y: null,
    radius: repulsionRadius,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let isVisible = true;

    // Check user's motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const getDynamicCount = (w: number) => {
      if (particleCount) return particleCount;
      if (w < 640) return 30;
      if (w < 1024) return 60;
      return 90;
    };

    const initCanvasSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Re-seed particles
      const count = getDynamicCount(width);
      particles = [];
      for (let i = 0; i < count; i++) {
        const r = Math.random() * 2.2 + 1.2;
        const speed = prefersReducedMotion ? 0 : 0.65;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          radius: r,
          baseRadius: r,
          color: Math.random() > 0.4 ? '#e9800a' : '#ffffff',
        });
      }
    };

    initCanvasSize();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initCanvasSize();
      }, 100);
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      if (!isVisible) {
        animFrameRef.current = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mr = mouseRef.current.radius;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Boundary bouncing
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Electrostatic mouse repulsion
          if (mx !== null && my !== null) {
            const dx = p.x - mx;
            const dy = p.y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mr && dist > 0) {
              const force = (1 - dist / mr) * 2.2;
              const angle = Math.atan2(dy, dx);
              p.x += Math.cos(angle) * force;
              p.y += Math.sin(angle) * force;
              p.radius = p.baseRadius * 1.5;
            } else {
              p.radius = Math.max(p.baseRadius, p.radius - 0.05);
            }
          }
        }

        // Draw particle dot with electric neon glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#E9800A';
        ctx.shadowBlur = p.radius > 2 ? 8 : 4;
        ctx.fill();

        // Draw proximity connecting lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < maxDistance) {
            const alpha = (1 - cdist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(233, 128, 10, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    // Auto-pause RAF loop when scrolled out of viewport
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animFrameRef.current) {
        render();
      }
    });
    observer.observe(canvas);

    if (isVisible && !animFrameRef.current) {
      render();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      clearTimeout(resizeTimer);
      if (typeof window !== 'undefined' && animFrameRef.current) {
        window.cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [particleCount, maxDistance, repulsionRadius]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 z-0 h-full w-full', className)}
      {...props}
    />
  );
};

// Export alias
export const HeroParticleCanvas = ParticleCanvas;
