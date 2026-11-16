import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ProcessStepProps {
  step: {
    id: string;
    number: string;
    title: string;
    description: string;
    accentColor: string;
  };
  index: number;
}

const STEP_FADE_UP = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as any,
    },
  },
};

export const ProcessStep: React.FC<ProcessStepProps> = ({ step, index }) => {
  const stepRef = useRef(null);
  const isInView = useInView(stepRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={stepRef}
      variants={STEP_FADE_UP}
      className="relative flex flex-col items-center text-center desktop:items-start desktop:text-left"
    >
      {/* Number Badge */}
      <motion.div
        className="relative w-[120px] h-[120px] mb-5 sm:mb-6 flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{
          type: 'spring',
          duration: 0.8,
          delay: index * 0.15,
          bounce: 0.3,
        }}
      >
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${step.accentColor}15 0%, ${step.accentColor}05 100%)`,
            border: `1px solid ${step.accentColor}30`,
          }}
        />

        {/* Inner glow */}
        <div
          className="absolute inset-[8px] rounded-full"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${step.accentColor}10 0%, transparent 70%)`,
          }}
        />

        {/* Number */}
        <span
          className="relative z-10 text-[42px] sm:text-[48px] font-bold tracking-tight"
          style={{
            color: step.accentColor,
            fontFeatureSettings: '"lnum" on, "cv11" on',
          }}
        >
          {step.number}
        </span>

        {/* Animated pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: `2px solid ${step.accentColor}`,
          }}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.5,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="space-y-2 sm:space-y-2.5">
        <h3
          className="text-[20px] sm:text-[22px] desktop:text-[24px] font-bold tracking-tight"
          style={{
            color: 'rgb(255, 255, 255)',
            fontFeatureSettings: '"lnum" on, "cv11" on, "cv05" on, "cv13" on',
          }}
        >
          {step.title}
        </h3>

        <p className="text-[13px] sm:text-[14px] leading-[1.6] text-white/65 max-w-[300px] mx-auto desktop:mx-0">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};
