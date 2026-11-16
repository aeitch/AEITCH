import { useState, useEffect, useRef, useCallback } from 'react';
import { WORD_CYCLE_DURATION_MS } from './motion';

interface UseActiveIndexOptions {
  totalItems?: number;
  durationMs?: number;
}

export interface UseActiveIndexReturn {
  activeIndex: number;
  progress: number; // 0 to 100
  setActiveIndex: (index: number) => void;
  pause: () => void;
  resume: () => void;
  isPaused: boolean;
}

export function useActiveIndex({
  totalItems = 4,
  durationMs = WORD_CYCLE_DURATION_MS,
}: UseActiveIndexOptions = {}): UseActiveIndexReturn {
  const [activeIndex, setActiveIndexState] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Check prefers-reduced-motion
  const prefersReducedMotionRef = useRef<boolean>(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      prefersReducedMotionRef.current = mediaQuery.matches;
      const handler = (e: MediaQueryListEvent) => {
        prefersReducedMotionRef.current = e.matches;
      };
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  const startTimeRef = useRef<number | null>(null);
  const elapsedBeforePauseRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  const setActiveIndex = useCallback((newIndex: number) => {
    setActiveIndexState(newIndex);
    startTimeRef.current = performance.now();
    elapsedBeforePauseRef.current = 0;
    setProgress(0);
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
    if (startTimeRef.current !== null) {
      elapsedBeforePauseRef.current = performance.now() - startTimeRef.current;
    }
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
    startTimeRef.current = performance.now() - elapsedBeforePauseRef.current;
  }, []);

  useEffect(() => {
    if (prefersReducedMotionRef.current) {
      setProgress(0);
      return;
    }

    if (isPaused) {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      return;
    }

    let isSubscribed = true;
    startTimeRef.current = performance.now() - elapsedBeforePauseRef.current;

    const tick = (now: number) => {
      if (!isSubscribed) return;
      if (startTimeRef.current === null) {
        startTimeRef.current = now;
      }

      const elapsed = now - startTimeRef.current;
      const rawPct = Math.min(1, Math.max(0, elapsed / durationMs));
      setProgress(rawPct * 100);

      if (elapsed >= durationMs) {
        startTimeRef.current = now;
        elapsedBeforePauseRef.current = 0;
        setProgress(0);
        setActiveIndexState((prev) => (prev + 1) % totalItems);
      }

      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    animFrameIdRef.current = requestAnimationFrame(tick);

    return () => {
      isSubscribed = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [durationMs, totalItems, isPaused, activeIndex]);

  return {
    activeIndex,
    progress,
    setActiveIndex,
    pause,
    resume,
    isPaused,
  };
}
