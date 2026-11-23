import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from '../../router/Router';
import { contactConfig } from '../../config/contactConfig';

export const CTASection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black py-20 sm:py-24 tablet:py-28 desktop:py-32 px-4 sm:px-6 tablet:px-12 desktop:px-[80px] overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(247, 192, 89, 0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", duration: 0.8, bounce: 0 }}
          className="relative overflow-hidden rounded-3xl p-6 sm:p-10 tablet:p-12 desktop:p-16 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {/* Radial glow effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(247, 192, 89, 0.12) 0%, transparent 60%)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Heading */}
            <h2
              className="font-normal text-white text-[32px] sm:text-[42px] tablet:text-[52px] desktop:text-[62px] leading-[1.12] tracking-[-1px] desktop:tracking-[-2px] mb-4 sm:mb-5 max-w-[800px]"
              style={{
                fontFeatureSettings: '"lnum" on, "cv11" on, "cv05" on, "cv13" on',
              }}
            >
              Ready to Build Something{' '}
              <span style={{ color: 'rgb(247, 192, 89)' }}>Exceptional</span>?
            </h2>

            {/* Description */}
            <p className="text-[14px] sm:text-[15px] desktop:text-[16px] leading-[1.6] text-white/70 mb-8 sm:mb-10 max-w-[560px]">
              From intelligent automation to scalable cloud infrastructure, AEITCH engineers
              mission-critical digital systems built for hypergrowth. Let's discuss your project.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full">
              {/* Primary CTA */}
              <Link
                href="/contact#contact-form"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-medium no-underline transition-all duration-300 shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  height: 'clamp(48px, 4.5vw, 52px)',
                  paddingLeft: '36px',
                  paddingRight: '32px',
                  backgroundColor: 'rgb(247, 192, 89)',
                  color: 'rgb(0, 0, 0)',
                }}
              >
                <span className="font-bold text-[15px] tablet:text-[16px] whitespace-nowrap">
                  Get Free Consultation
                </span>
                <motion.svg
                  role="presentation"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 flex-none"
                  animate={isHovered ? { x: 3 } : { x: 0 }}
                  transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
                >
                  <path
                    d="M 0 7 L 18 7 M 18 7 L 11 0 M 18 7 L 11 14"
                    fill="transparent"
                    stroke="rgb(0, 0, 0)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    transform="translate(3 5)"
                  />
                </motion.svg>
              </Link>

              {/* Secondary CTA */}
              <motion.a
                href={`tel:${contactConfig.phoneTel}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full font-medium no-underline transition-all duration-300"
                style={{
                  height: 'clamp(48px, 4.5vw, 52px)',
                  paddingLeft: '32px',
                  paddingRight: '32px',
                  backgroundColor: 'rgba(247, 192, 89, 0.12)',
                  border: '1px solid rgba(247, 192, 89, 0.3)',
                  color: 'rgb(247, 192, 89)',
                }}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="font-semibold text-[14px] tablet:text-[15px]">
                  Call Us
                </span>
              </motion.a>
            </div>

            {/* Contact info */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-[13px] text-white/50">
              <a
                href={`mailto:${contactConfig.email}`}
                className="flex items-center gap-2 hover:text-white/80 transition-colors no-underline text-inherit"
              >
                <svg
                  className="w-4 h-4 text-[#5EEAD4]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>{contactConfig.email}</span>
              </a>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{contactConfig.responseTime}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
