"use client";

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/**
 * AEITCH Unified Motion Tokens & Curves
 * Based on linear/vercel/stripe motion design principles.
 */
export const MOTION = {
  // Cubic-bezier Curves
  easings: {
    easeOutExpo: [0.16, 1, 0.3, 1] as const,
    easeInOutExpo: [0.87, 0, 0.13, 1] as const,
    easeOutQuart: [0.25, 1, 0.5, 1] as const,
  },
  // Springs
  springs: {
    snappy: { type: 'spring', stiffness: 260, damping: 30 },
    gentle: { type: 'spring', stiffness: 180, damping: 24 },
    bouncy: { type: 'spring', stiffness: 340, damping: 22 },
  },
  // Durations (in seconds for Framer, ms for Anime.js)
  durations: {
    micro: 0.15,
    base: 0.4,
    section: 0.8,
    stagger: 0.08,
  },
  durationsMs: {
    micro: 150,
    base: 400,
    section: 800,
    stagger: 80,
  },
};

/**
 * Standard Framer Motion Viewport Trigger
 */
export const viewportOnce = {
  once: true,
  margin: '-10%',
};

/**
 * Shared Animation Variants
 */
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: MOTION.durations.base, ease: MOTION.easings.easeOutExpo },
  },
};

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION.durations.base, ease: MOTION.easings.easeOutExpo },
  },
};

export const containerStaggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: MOTION.durations.stagger,
      delayChildren: 0.05,
    },
  },
};

export const cardHoverVariants = {
  rest: { y: 0 },
  hover: {
    y: -4,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

/**
 * Hook to check reduced motion preference
 */
export function useMotionSafe() {
  const prefersReduced = useFramerReducedMotion();
  return !prefersReduced;
}

/**
 * RTL-aware motion multiplier (mirrors X translation when RTL)
 */
export function getRtlMultiplier(isRtl: boolean): number {
  return isRtl ? -1 : 1;
}
