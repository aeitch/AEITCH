"use client";

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 start-0 end-0 h-[2.5px] bg-gradient-to-r from-[#e9800a] via-[#ff9420] to-[#e9800a] origin-left z-[9999] pointer-events-none shadow-[0_0_12px_rgba(233,128,10,0.6)]"
      aria-hidden="true"
    />
  );
}
