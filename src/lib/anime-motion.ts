"use client";

import { animate } from 'animejs';

/**
 * Animate a numeric value smoothly using Anime.js with outExpo easing.
 * Preserves decimal places, prefixes, and suffixes.
 */
export function animateCounter(
  targetEl: HTMLElement,
  endValue: number,
  options?: {
    startValue?: number;
    decimals?: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    onComplete?: () => void;
  }
) {
  const {
    startValue = 0,
    decimals = 0,
    duration = 1400,
    prefix = '',
    suffix = '',
    onComplete,
  } = options || {};

  const state = { value: startValue };

  const anim = animate(state, {
    value: endValue,
    duration,
    ease: 'outExpo',
    onUpdate: () => {
      const formatted = state.value.toFixed(decimals);
      targetEl.textContent = `${prefix}${formatted}${suffix}`;
    },
    onComplete: () => {
      const finalFormatted = endValue.toFixed(decimals);
      targetEl.textContent = `${prefix}${finalFormatted}${suffix}`;
      onComplete?.();
    },
  });

  return anim;
}

/**
 * Text scramble effect for monospace technical eyebrow labels.
 * Glitches through glyphs before resolving to the exact original text.
 */
export function scrambleText(
  targetEl: HTMLElement,
  originalText: string,
  options?: { duration?: number; speed?: number }
) {
  const { duration = 800, speed = 35 } = options || {};
  const chars = '0123456789ABCDEF!@#$%&*<>[]{}';
  const length = originalText.length;
  let frame = 0;
  const totalFrames = Math.floor(duration / speed);

  const interval = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const resolvedCount = Math.floor(progress * length);

    let output = '';
    for (let i = 0; i < length; i++) {
      if (i < resolvedCount) {
        output += originalText[i];
      } else if (originalText[i] === ' ') {
        output += ' ';
      } else {
        output += chars[Math.floor(Math.random() * chars.length)];
      }
    }

    targetEl.textContent = output;

    if (frame >= totalFrames) {
      clearInterval(interval);
      targetEl.textContent = originalText;
    }
  }, speed);

  return () => clearInterval(interval);
}

/**
 * SVG line drawing helper using stroke-dasharray and stroke-dashoffset
 */
export function drawSvgPath(
  pathEl: SVGPathElement | SVGGeometryElement,
  options?: { duration?: number; delay?: number }
) {
  const { duration = 1200, delay = 0 } = options || {};
  try {
    const length = pathEl.getTotalLength ? pathEl.getTotalLength() : 100;
    pathEl.style.strokeDasharray = `${length}`;
    pathEl.style.strokeDashoffset = `${length}`;

    const state = { offset: length };
    return animate(state, {
      offset: 0,
      duration,
      delay,
      ease: 'outExpo',
      onUpdate: () => {
        pathEl.style.strokeDashoffset = `${state.offset}`;
      },
    });
  } catch {
    return null;
  }
}
