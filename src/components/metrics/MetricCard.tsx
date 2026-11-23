import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface MetricCardProps {
  metric: {
    id: string;
    value: string;
    label: string;
    suffix?: string;
  };
  index: number;
}

const CARD_FADE_UP = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as any,
    },
  },
};

export const MetricCard: React.FC<MetricCardProps> = ({ metric, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  // Animated counter with easing
  useEffect(() => {
    if (!isInView) return;

    const targetValue = parseInt(metric.value.replace(/[^0-9]/g, ''));
    if (isNaN(targetValue)) return;

    const duration = 1800;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic for smooth deceleration
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(easeOutCubic * targetValue);
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, metric.value]);

  const displayValue = metric.value.includes('+')
    ? `${count}+`
    : metric.value.includes('%')
    ? `${count}%`
    : count.toString();

  return (
    <motion.div
      ref={cardRef}
      variants={CARD_FADE_UP}
      className="relative group overflow-hidden rounded-2xl p-4 sm:p-6 desktop:p-8 flex flex-col items-center text-center"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      {/* Subtle hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(247, 192, 89, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full">
        {/* Animated Number */}
        <motion.div
          className="text-[28px] sm:text-[38px] tablet:text-[46px] desktop:text-[56px] font-bold mb-1.5 sm:mb-2 tracking-tight"
          style={{
            color: 'rgb(247, 192, 89)',
            fontFeatureSettings: '"lnum" on, "cv11" on, "cv05" on, "cv13" on',
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{
            type: 'spring',
            duration: 0.8,
            delay: index * 0.1,
            bounce: 0.3,
          }}
        >
          {displayValue}
          {metric.suffix && (
            <span className="text-[18px] sm:text-[24px] desktop:text-[32px] ml-0.5 sm:ml-1">
              {metric.suffix}
            </span>
          )}
        </motion.div>

        {/* Label */}
        <p className="text-[13px] sm:text-[14px] font-medium text-white/70 leading-tight">
          {metric.label}
        </p>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(247, 192, 89, 0.4) 50%, transparent 100%)',
        }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
      />
    </motion.div>
  );
};
