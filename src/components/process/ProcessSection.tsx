import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ProcessStep } from './ProcessStep';
import { processContent } from './processContent';

const CONTAINER_FADE_IN = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

export const ProcessSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black py-16 sm:py-20 tablet:py-24 desktop:py-28 px-4 sm:px-6 tablet:px-12 desktop:px-[80px]"
    >
      <div className="relative w-full max-w-[1440px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", duration: 0.8, bounce: 0 }}
          className="flex flex-col items-center text-center mb-12 sm:mb-16 desktop:mb-20"
        >
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-2.5 py-1 mb-4"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                backgroundColor: 'rgb(242, 196, 97)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
              aria-hidden="true"
            />
            <span
              className="text-[12px] font-medium tracking-tight leading-none"
              style={{ color: 'rgb(242, 196, 97)' }}
            >
              {processContent.eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h2
            className="font-normal text-white text-[32px] sm:text-[42px] tablet:text-[52px] desktop:text-[62px] leading-[1.12] tracking-[-1px] desktop:tracking-[-2px] mb-3 sm:mb-4"
            style={{
              fontFeatureSettings: '"lnum" on, "cv11" on, "cv05" on, "cv13" on',
            }}
          >
            {processContent.heading}
          </h2>

          {/* Subheading */}
          <p className="text-[14px] sm:text-[15px] desktop:text-[16px] leading-[1.5] font-normal max-w-[340px] sm:max-w-[520px] desktop:max-w-[640px] text-white/70">
            {processContent.subheading}
          </p>
        </motion.div>

        {/* Process Timeline */}
        <motion.div
          variants={CONTAINER_FADE_IN}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Connecting Line (Desktop) */}
          <div className="hidden desktop:block absolute top-[60px] left-0 right-0 h-[2px] z-0">
            <motion.div
              className="h-full"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 10%, rgba(255, 255, 255, 0.15) 90%, transparent 100%)',
              }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-6 sm:gap-8 desktop:gap-6">
            {processContent.steps.map((step, idx) => (
              <ProcessStep key={step.id} step={step} index={idx} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
