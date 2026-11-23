import React from 'react';
import { motion } from 'framer-motion';
import { ServiceCard } from './ServiceCard';
import { servicesContent } from './servicesContent';

const SECTION_FADE_IN = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

export const ServicesSection: React.FC = () => {
  return (
    <section className="relative w-full bg-black py-16 sm:py-20 tablet:py-24 desktop:py-28 px-4 sm:px-6 tablet:px-12 desktop:px-[80px]">
      <div className="relative w-full max-w-[1440px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", duration: 0.8, bounce: 0 }}
          className="flex flex-col items-center text-center mb-12 sm:mb-14 tablet:mb-16 desktop:mb-20"
        >
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-2.5 py-1 mb-4 sm:mb-5"
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
              {servicesContent.eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h2
            className="font-normal text-white text-[32px] sm:text-[42px] tablet:text-[52px] desktop:text-[62px] leading-[1.12] tracking-[-1px] desktop:tracking-[-2px] mb-3 sm:mb-4"
            style={{
              fontFeatureSettings: '"lnum" on, "cv11" on, "cv05" on, "cv13" on',
            }}
          >
            {servicesContent.heading}
          </h2>

          {/* Subheading */}
          <p
            className="text-[14px] sm:text-[15px] desktop:text-[16px] leading-[1.5] font-normal max-w-[340px] sm:max-w-[480px] desktop:max-w-[620px] text-white/70"
            style={{ textWrap: 'balance' }}
          >
            {servicesContent.subheading}
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <motion.div
          variants={SECTION_FADE_IN}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 tablet:grid-cols-2 gap-4 sm:gap-5 desktop:gap-6"
        >
          {servicesContent.services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
