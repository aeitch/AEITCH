import type { Transition, Variants } from 'framer-motion';

/**
 * Exact motion constants and timing extracted from quorum.framer.website live bundle
 */

// Step duration for each word and active stat card: 5000ms (5s) to perfectly match 5.0s video loop
export const WORD_CYCLE_DURATION_MS = 5000;

// Initial entrance delay on page load before first cycle begins: 2500ms (2.5s)
export const INITIAL_DELAY_MS = 2500;

// Base spring transition: { bounce: 0, delay: 0, duration: 1, type: "spring" }
export const SPRING_BASE: Transition = {
  type: "spring",
  duration: 1.0,
  bounce: 0,
};

// Card expand/collapse spring transition: { bounce: 0, delay: 0, duration: 1, type: "spring" }
export const SPRING_CARD: Transition = {
  type: "spring",
  duration: 1.0,
  bounce: 0,
};

// Word transition spring: { bounce: 0, delay: 0, duration: 0.3, type: "spring" }
export const SPRING_WORD_ENTER: Transition = {
  type: "spring",
  duration: 0.3,
  bounce: 0,
};

export const SPRING_WORD_EXIT: Transition = {
  type: "spring",
  duration: 0.2,
  bounce: 0,
};

// Word underline loop spring: { bounce: 0, delay: 1, duration: 0.5, type: "spring" }
export const SPRING_UNDERLINE_LOOP: Transition = {
  type: "spring",
  duration: 0.5,
  bounce: 0,
  delay: 1.0,
  repeat: Infinity,
  repeatType: "mirror",
  repeatDelay: 0,
};

// Hover transition: { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" }
export const SPRING_HOVER: Transition = {
  type: "spring",
  duration: 0.4,
  bounce: 0.2,
};

// CTA Button spring transitions:
// Entry: { bounce: 0, delay: 0, duration: 0.6, type: "spring" }
export const SPRING_BUTTON_ENTER: Transition = {
  type: "spring",
  duration: 0.6,
  bounce: 0,
};

// Exit: { bounce: 0, delay: 0, duration: 1.0, type: "spring" }
export const SPRING_BUTTON_EXIT: Transition = {
  type: "spring",
  duration: 1.0,
  bounce: 0,
};

// Page entrance stagger animations
export const HERO_ENTRANCE_CONTAINER: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const HERO_FADE_UP_ITEM: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 0.8,
      bounce: 0,
    },
  },
};

// Rotating word variants
export const ROTATING_WORD_VARIANTS: Variants = {
  active: {
    opacity: 1,
    transition: SPRING_WORD_ENTER,
  },
  inactive: {
    opacity: 0,
    transition: SPRING_WORD_EXIT,
  },
};

// Underline animation variants
export const UNDERLINE_VARIANTS: Variants = {
  idle: {
    opacity: 1,
  },
  pulsing: {
    opacity: [1, 0, 1],
    transition: {
      duration: 1.0,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

// Case study card sheen hover
export const CASE_STUDY_SHEEN_VARIANTS: Variants = {
  initial: {
    rotate: 0,
    opacity: 0.75,
    transition: SPRING_HOVER,
  },
  hover: {
    rotate: -14.9857,
    opacity: 1.0,
    transition: SPRING_HOVER,
  },
};
