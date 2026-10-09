"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';

export const IntroStatement: React.FC = () => {
  const { locale, direction } = useTranslation();

  const text =
    locale === 'ar'
      ? 'لا نقدم كل شيء لكل أحد. نركز على أربع خدمات نتقنها، ونسلّمها من الفكرة إلى الإنتاج، بشفافية كاملة وملكية كاملة للعميل على الكود.'
      : "We don't do everything for everyone. We focus on four services we do well, delivered from idea to production, with full transparency and full client ownership of the code.";

  return (
    <section className="relative py-20 sm:py-28 md:py-36 bg-bg overflow-hidden border-t border-b border-border/80" dir={direction}>
      {/* Editorial backdrop accents */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-15" />
      <div className="pointer-events-none absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center sm:text-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start gap-4"
        >
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>{locale === 'ar' ? 'المبدأ الهندسي' : 'OUR CONVICTION'}</span>
          </div>

          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-medium leading-[1.35] tracking-tight text-white/95">
            {text}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
