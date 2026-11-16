import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    deliverables: string[];
    accentColor: string;
    iconPath: string;
  };
}

const CARD_FADE_UP = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      duration: 0.6,
      bounce: 0,
    },
  },
};

const DELIVERABLE_STAGGER = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as any,
    },
  }),
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for glow effect
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const smoothMouseX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={CARD_FADE_UP}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{
        scale: 1.03,
        y: -8,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
      }}
      className="relative group overflow-hidden rounded-2xl"
      style={{
        background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: isHovered
          ? '0 20px 60px -15px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 255, 255, 0.05)'
          : '0 4px 20px -4px rgba(0, 0, 0, 0.2)',
        transition: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Animated Hover Glow Effect */}
      <motion.div
        className="absolute -inset-[1px] pointer-events-none rounded-2xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${smoothMouseX.get()}% ${smoothMouseY.get()}%, ${service.accentColor}20 0%, transparent 40%)`,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Border Shine Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          border: `1px solid ${service.accentColor}`,
          opacity: 0,
        }}
        animate={{
          opacity: isHovered ? 0.3 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Card Content */}
      <div className="relative z-10 p-6 sm:p-7 desktop:p-8 flex flex-col h-full">
        {/* Icon Container */}
        <motion.div
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-5 sm:mb-6"
          style={{
            background: `linear-gradient(135deg, ${service.accentColor}20 0%, ${service.accentColor}08 100%)`,
            border: `1px solid ${service.accentColor}30`,
          }}
          animate={{
            boxShadow: isHovered
              ? `0 0 40px ${service.accentColor}40, 0 0 20px ${service.accentColor}25, inset 0 0 20px ${service.accentColor}15`
              : `0 0 0px ${service.accentColor}00`,
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.svg
            className="w-7 h-7 sm:w-8 sm:h-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke={service.accentColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
              scale: isHovered ? 1.15 : 1,
              rotate: isHovered ? [0, -3, 3, 0] : 0,
            }}
            transition={{
              scale: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              rotate: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
            }}
          >
            <path d={service.iconPath} />
          </motion.svg>
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-[20px] sm:text-[22px] desktop:text-[24px] font-bold mb-2.5 sm:mb-3 tracking-tight"
          style={{
            fontFeatureSettings: '"lnum" on, "cv11" on, "cv05" on, "cv13" on',
          }}
          animate={{
            color: isHovered ? service.accentColor : 'rgb(255, 255, 255)',
          }}
          transition={{ duration: 0.3 }}
        >
          {service.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-[13.5px] sm:text-[14px] desktop:text-[14.5px] leading-[1.6] text-white/65 mb-5 sm:mb-6"
          animate={{
            opacity: isHovered ? 1 : 0.85,
          }}
          transition={{ duration: 0.3 }}
        >
          {service.description}
        </motion.p>

        {/* Deliverables List */}
        <div className="flex flex-col gap-2.5 mt-auto">
          {service.deliverables.map((item, idx) => (
            <motion.div
              key={idx}
              className="flex items-start gap-2.5"
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={DELIVERABLE_STAGGER}
            >
              {/* Checkmark Icon */}
              <motion.div
                className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  backgroundColor: `${service.accentColor}15`,
                  border: `1px solid ${service.accentColor}40`,
                }}
                whileHover={{ scale: 1.15 }}
                transition={{ type: 'spring', duration: 0.3, bounce: 0.4 }}
              >
                <motion.svg
                  className="w-2.5 h-2.5"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke={service.accentColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.08 }}
                >
                  <path d="M2 6.5L4.5 9L10 3" />
                </motion.svg>
              </motion.div>

              {/* Deliverable Text */}
              <span className="text-[12.5px] sm:text-[13px] leading-[1.5] text-white/80 font-medium">
                {item}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom Accent Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${service.accentColor} 50%, transparent 100%)`,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
};
