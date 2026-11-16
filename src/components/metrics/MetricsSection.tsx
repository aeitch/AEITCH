import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MetricCard } from './MetricCard';
import { metricsContent } from './metricsContent';

const CONTAINER_FADE_IN = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const MetricsSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black py-16 sm:py-20 tablet:py-24 desktop:py-28 px-4 sm:px-6 tablet:px-12 desktop:px-[80px] overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(247, 192, 89, 0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-[1440px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", duration: 0.8, bounce: 0 }}
          className="flex flex-col items-center text-center mb-12 sm:mb-14 desktop:mb-16"
        >
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-2.5 py-1 mb-4"
            style={{
              border: '1px solid rgba(247, 192, 89, 0.3)',
              borderRadius: '8px',
              backgroundColor: 'rgba(247, 192, 89, 0.05)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                backgroundColor: 'rgb(247, 192, 89)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
              aria-hidden="true"
            />
            <span
              className="text-[12px] font-medium tracking-tight leading-none"
              style={{ color: 'rgb(247, 192, 89)' }}
            >
              {metricsContent.eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h2
            className="font-normal text-white text-[32px] sm:text-[42px] tablet:text-[52px] desktop:text-[58px] leading-[1.12] tracking-[-1px] desktop:tracking-[-2px]"
            style={{
              fontFeatureSettings: '"lnum" on, "cv11" on, "cv05" on, "cv13" on',
            }}
          >
            {metricsContent.heading}
          </h2>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          variants={CONTAINER_FADE_IN}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 tablet:grid-cols-4 gap-4 sm:gap-5 desktop:gap-6"
        >
          {metricsContent.metrics.map((metric, idx) => (
            <MetricCard key={metric.id} metric={metric} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsSection;
