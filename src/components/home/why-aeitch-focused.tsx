"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';

export const WhyAeitchFocused: React.FC = () => {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';

  const points = [
    {
      num: '01',
      titleAr: 'مهندسون senior فقط',
      textAr: 'من يتحدث معك هو من يبني.',
      titleEn: 'Senior engineers only',
      textEn: 'The people who talk to you are the people who build.',
    },
    {
      num: '02',
      titleAr: 'تخصص هندسي مركّز',
      textAr: 'عمق تقني بدل التشتت.',
      titleEn: 'Focused specialization',
      textEn: 'Technical depth over sprawl.',
    },
    {
      num: '03',
      titleAr: 'تعاقد مرن',
      textAr: 'مشروع محدد أو فريق مخصص.',
      titleEn: 'Flexible engagement',
      textEn: 'A defined project or a dedicated team.',
    },
    {
      num: '04',
      titleAr: 'عملية واضحة',
      textAr: 'تسليمات أسبوعية دون مفاجآت.',
      titleEn: 'A clear process',
      textEn: 'Weekly deliveries, no surprises.',
    },
  ];

  return (
    <section
      data-theme="light"
      className="relative py-20 sm:py-28 md:py-32 bg-[#f5f5f3] text-[#0a0a0a] border-t border-b border-black/10 overflow-hidden transition-colors duration-500"
      dir={direction}
    >
      {/* Light Micro-Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05]" />
      <div className="pointer-events-none absolute top-1/2 end-0 w-[450px] h-[450px] bg-[#e9800a]/5 rounded-full blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        <div className="max-w-xl space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#c26500]"
          >
            {isAr ? 'القيمة الهندسية' : 'WHY US'}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0a0a0a]"
          >
            {isAr ? 'لماذا إيتش؟' : 'Why AEITCH'}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p, idx) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08)' }}
              className="rounded-2xl border border-black/10 bg-white p-6 sm:p-7 space-y-3 transition-all group"
            >
              <span className="font-mono text-xs font-bold text-[#e9800a] block">
                {p.num}
              </span>
              <h3 className="text-base font-bold text-[#0a0a0a] group-hover:text-[#c26500] transition-colors">
                {isAr ? p.titleAr : p.titleEn}
              </h3>
              <p className="text-sm text-[#555555] leading-relaxed font-normal">
                {isAr ? p.textAr : p.textEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
