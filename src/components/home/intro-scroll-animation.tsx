"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

const TOTAL_FRAMES = 240;
const FRAME_PATH_PREFIX = '/scroll-motion/frame_';

function getFrameUrl(index: number): string {
  const paddedIndex = String(index).padStart(4, '0');
  return `${FRAME_PATH_PREFIX}${paddedIndex}.webp`;
}

export function IntroScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedCountRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);
  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const isVisibleRef = useRef<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Render a specific frame onto the canvas with cover sizing
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext('2d', { alpha: false });
    } catch {
      return;
    }
    if (!ctx) return;

    // Find the closest loaded frame if the requested frame isn't ready yet
    let img: HTMLImageElement | null = imagesRef.current[frameIndex] || null;
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Look backward for nearest loaded frame
      for (let i = frameIndex - 1; i >= 1; i--) {
        if (imagesRef.current[i]?.complete && imagesRef.current[i]!.naturalWidth > 0) {
          img = imagesRef.current[i];
          break;
        }
      }
      // If still none found, look forward
      if (!img) {
        for (let i = frameIndex + 1; i <= TOTAL_FRAMES; i++) {
          if (imagesRef.current[i]?.complete && imagesRef.current[i]!.naturalWidth > 0) {
            img = imagesRef.current[i];
            break;
          }
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const w = canvas.width;
    const h = canvas.height;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    // "cover" math preserving aspect ratio
    const scale = Math.max(w / imgW, h / imgH);
    const renderW = imgW * scale;
    const renderH = imgH * scale;
    const offsetX = (w - renderW) / 2;
    const offsetY = (h - renderH) / 2;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
  }, []);

  // Smooth lerp loop
  const startAnimationLoop = useCallback(() => {
    const tick = () => {
      if (isVisibleRef.current) {
        const diff = targetFrameRef.current - currentFrameRef.current;
        if (Math.abs(diff) > 0.05) {
          currentFrameRef.current += diff * 0.22;
          const frameToDraw = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(currentFrameRef.current)));
          renderFrame(frameToDraw);
        } else if (Math.round(currentFrameRef.current) !== targetFrameRef.current) {
          currentFrameRef.current = targetFrameRef.current;
          renderFrame(targetFrameRef.current);
        }
      }
      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    animFrameIdRef.current = requestAnimationFrame(tick);
  }, [renderFrame]);

  // Resize canvas to match window with DPR capping
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayW = window.innerWidth;
    const displayH = window.innerHeight;

    if (canvas.width !== displayW * dpr || canvas.height !== displayH * dpr) {
      canvas.width = displayW * dpr;
      canvas.height = displayH * dpr;
      renderFrame(Math.round(currentFrameRef.current));
    }
  }, [renderFrame]);

  // Preload frames progressively
  useEffect(() => {
    let isCancelled = false;
    imagesRef.current = new Array(TOTAL_FRAMES + 1).fill(null);

    // Initial batch: first 30 frames for immediate responsiveness
    const loadBatch = async (start: number, end: number) => {
      const promises: Promise<void>[] = [];
      for (let i = start; i <= end; i++) {
        if (isCancelled) return;
        const p = new Promise<void>((resolve) => {
          const img = new Image();
          img.src = getFrameUrl(i);
          img.onload = () => {
            if (!isCancelled) {
              imagesRef.current[i] = img;
              loadedCountRef.current += 1;
              const pct = Math.round((loadedCountRef.current / TOTAL_FRAMES) * 100);
              setLoadProgress(pct);

              // Render first frame as soon as frame 1 arrives
              if (i === 1) {
                renderFrame(1);
                setIsLoading(false);
              }
            }
            resolve();
          };
          img.onerror = () => {
            resolve();
          };
        });
        promises.push(p);
      }
      await Promise.all(promises);
    };

    // Load initial 30 frames first, then load the remaining 210 in chunks
    const loadAll = async () => {
      await loadBatch(1, 30);
      if (isCancelled) return;

      // Batch 2: 31 to 120 (the logo reveal moment)
      await loadBatch(31, 120);
      if (isCancelled) return;

      // Batch 3: 121 to 240 (the blend moment)
      await loadBatch(121, TOTAL_FRAMES);
      if (!isCancelled) {
        setIsFullyLoaded(true);
      }
    };

    handleResize();
    loadAll();
    startAnimationLoop();

    return () => {
      isCancelled = true;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [handleResize, renderFrame, startAnimationLoop]);

  // Scroll listener tracking position within container
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      // Progress from 0.0 to 1.0
      const rawProgress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      setScrollProgress(rawProgress);

      // Map progress to frame number 1 - 240
      const targetFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(rawProgress * (TOTAL_FRAMES - 1)) + 1));
      targetFrameRef.current = targetFrame;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  // IntersectionObserver to pause RAF loop when completely scrolled out of view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Quick skip function to jump past the animation track
  const handleSkip = () => {
    const container = containerRef.current;
    if (!container) return;
    const targetY = container.offsetTop + container.offsetHeight - window.innerHeight;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  // Seamless blend transitions:
  // As scroll approaches the end (progress 0.70 -> 1.0), the blend overlay smoothly increases
  const blendOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.72) / 0.25));
  // Scroll prompt fades out quickly
  const promptOpacity = Math.max(0, 1 - scrollProgress * 5);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320vh] bg-[#000000]"
      aria-label="AEITCH Cinematic Intro Experience"
    >
      {/* Pinned Sticky Full-Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#000000] flex items-center justify-center">
        {/* Main Canvas rendering frame sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ display: 'block' }}
        />

        {/* Ambient Top & Bottom Depth Vignettes matching website pure black (#000000) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#000000] via-[#000000]/60 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent"
        />

        {/* The Invisible Bridge Blend Layer:
            As the user scrubs into the final frames (0.75 -> 1.0), this subtle radial glow and smooth transition
            layer matches the hero section's exact ambient atmosphere so that the handoff to the hero website
            is 100% indistinguishable and seamless. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 flex items-center justify-center"
          style={{ opacity: blendOpacity }}
        >
          {/* Accent glow identical to HeroSection background pulse */}
          <div className="size-[550px] sm:size-[750px] rounded-full bg-accent/20 blur-[140px]" />
          {/* Bottom feathering guaranteeing zero visible seam with the hero section */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-[#000000]" />
        </div>

        {/* Initial Minimal Loading Indicator (only if first frames are still downloading) */}
        {isLoading && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#000000]/90 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex size-3 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-white">
                Initializing Visual Engine
              </span>
            </div>
            {/* Elegant Micro Progress Line */}
            <div className="mt-4 h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${Math.max(10, loadProgress)}%` }}
              />
            </div>
          </div>
        )}

        {/* Preload Status Tag (discreet corner badge while caching high-resolution frames) */}
        {!isFullyLoaded && !isLoading && (
          <div className="pointer-events-none absolute bottom-4 left-6 z-20 hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] font-mono text-white/50 backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            <span>BUFFERING {loadProgress}%</span>
          </div>
        )}

        {/* Skip to Content Button */}
        <button
          onClick={handleSkip}
          type="button"
          className="absolute top-6 right-6 z-20 group inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md transition-all duration-200 hover:border-accent hover:text-white hover:bg-black/90 cursor-pointer"
        >
          <span>Skip Intro</span>
          <ChevronDown className="size-3.5 text-accent transition-transform group-hover:translate-y-0.5" />
        </button>

        {/* Scroll To Discover Prompt (Fades out gently as user scrolls) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 z-20 flex flex-col items-center gap-3 transition-opacity duration-300"
          style={{ opacity: promptOpacity }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-black/60 px-4 py-1.5 backdrop-blur-md">
            <Sparkles className="size-3.5 text-accent animate-pulse" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Scroll To Reveal
            </span>
          </div>

          {/* Mouse / Pill Scroll Motion Indicator */}
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/30 p-1">
            <div className="h-2 w-1.5 rounded-full bg-accent animate-bounce" />
          </div>
        </div>

        {/* Organic Narrative Headline Peek near the end of the scroll (progress >= 0.82) */}
        {scrollProgress > 0.82 && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-16 z-20 text-center transition-all duration-500 flex flex-col items-center"
            style={{
              opacity: Math.min(1, (scrollProgress - 0.82) / 0.15),
              transform: `translateY(${(1 - (scrollProgress - 0.82) / 0.18) * 20}px)`,
            }}
          >
            <span className="font-sans text-xs sm:text-sm font-bold tracking-[0.25em] text-accent uppercase">
              Welcome to Next-Gen Engineering
            </span>
            <ChevronDown className="size-5 text-accent mt-2 animate-bounce" />
          </div>
        )}
      </div>
    </div>
  );
}
