"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export const IntroStatement: React.FC = () => {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';

  const textAr = 'لا نقدم كل شيء لكل أحد. نركز على تخصصات دقيقة نتقنها بعمق، ونسلّمها من الفكرة إلى الإنتاج، بشفافية كاملة وملكية كاملة للعميل على الكود.';
  const textEn = "We don't do everything for everyone. We focus on core disciplines we execute with depth, delivered from idea to production, with full transparency and full client ownership of the code.";

  const text = isAr ? textAr : textEn;
  const words = text.split(' ');

  return (
    <section
      data-theme="light"
      className="relative py-24 sm:py-32 md:py-40 bg-[#f5f5f3] text-[#0a0a0a] overflow-hidden border-t border-b border-black/10 transition-colors duration-500"
      dir={direction}
    >
      {/* Architectural Light Grid & Radial Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.06]" />
      <div className="pointer-events-none absolute -top-24 end-0 w-[500px] h-[500px] bg-[#e9800a]/10 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-24 start-0 w-[500px] h-[500px] bg-[#e9800a]/5 rounded-full blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start gap-6"
        >
          {/* High-Contrast Light Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/40 bg-[#e9800a]/10 px-3.5 py-1 text-xs font-mono font-bold tracking-[0.2em] text-[#c26500] uppercase shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e9800a] animate-pulse" />
            <span>{isAr ? 'المبدأ الهندسي' : 'OUR CONVICTION'}</span>
          </div>

          {/* Large Kinetic Editorial Statement with Screen-Reader / Test Parity */}
          <p className="sr-only">{text}</p>
          <p
            aria-hidden="true"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-semibold leading-[1.38] tracking-tight text-[#0a0a0a]"
          >
            {words.map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.02,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block me-[0.28em] will-change-transform"
              >
                {word}
              </motion.span>
            ))}
          </p>

          {/* Under-quote Architectural Hairline Indicator */}
          <div className="flex items-center gap-3 pt-2 text-xs font-mono tracking-wider text-black/50">
            <span className="h-[1px] w-12 bg-black/20" />
            <span>{isAr ? 'شفافية هندسية كاملة • كود سيادي' : 'FULL TRANSPARENCY • SOVEREIGN CODEBASE'}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
