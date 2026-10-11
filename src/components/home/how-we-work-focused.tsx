"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export const HowWeWorkFocused: React.FC = () => {
  const { locale, direction } = useTranslation();

  const steps = [
    {
      num: '01',
      titleAr: 'اكتشاف',
      titleEn: 'Discover',
      descAr: 'نفهم هدفك وقيودك ونحدد النطاق بدقة تامة.',
      descEn: 'We understand your goal and constraints, and define scope.',
      detailAr: 'جلسة هندسية مركزة لتفكيك المتطلبات التقنية والتنظيمية.',
      detailEn: 'Focused engineering session breaking down technical and regulatory constraints.',
    },
    {
      num: '02',
      titleAr: 'تصميم',
      titleEn: 'Design',
      descAr: 'مخطط تقني وتجربة مستخدم تعتمدها قبل أي سطر كود.',
      descEn: 'A technical blueprint and UX you approve before we build.',
      detailAr: 'معمارية سحابية، مخططات بيانات، ونماذج تفاعلية كاملة.',
      detailEn: 'Cloud architecture, data schemas, and interactive clickable prototypes.',
    },
    {
      num: '03',
      titleAr: 'بناء',
      titleEn: 'Build',
      descAr: 'إصدارات أسبوعية قابلة للتجربة وتواصل مباشر.',
      descEn: 'Weekly testable releases and constant communication.',
      detailAr: 'سبرنتات هندسية رشيقة، اختبارات جودة آلية، ومراجعة كود مستمرة.',
      detailEn: 'Agile engineering sprints, automated CI/CD tests, and continuous PR review.',
    },
    {
      num: '04',
      titleAr: 'إطلاق ودعم',
      titleEn: 'Launch & support',
      descAr: 'نشر آمن، تدريب، وتسليم كامل لملكية الكود.',
      descEn: 'Secure deployment, training and full code handover.',
      detailAr: 'بنية تشغيلية صفرية التوقف ومستندات تسليم شاملة.',
      detailEn: 'Zero-downtime production deployment and comprehensive documentation.',
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-bg border-t border-border overflow-hidden" dir={direction}>
      {/* Background Subtle Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-15" />
      <div className="pointer-events-none absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/[0.03] rounded-full blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent">
                {locale === 'ar' ? 'المنهجية الهندسية' : 'OUR PROCESS'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {locale === 'ar' ? 'كيف نعمل' : 'How we work'}
            </h2>
          </div>
          <p className="max-w-md text-sm text-fg-muted leading-relaxed">
            {locale === 'ar'
              ? 'نهج هندسي منضبط يضمن سرعة التنفيذ وجودة المنتج دون مفاجآت أو هدر للوقت والميزانية.'
              : 'A disciplined engineering approach ensuring rapid execution and product excellence with zero surprises.'}
          </p>
        </div>

        {/* Steps Grid with Connecting Line */}
        <div className="relative">
          {/* Subtle Horizontal Connecting Rail for Desktop */}
          <div className="hidden lg:block absolute top-[52px] start-12 end-12 h-px bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20 pointer-events-none z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6 }}
                data-cursor-type="explore"
                className="group relative rounded-2xl border border-border bg-surface/90 backdrop-blur-sm p-6 sm:p-7 space-y-5 hover:border-accent/50 hover:bg-surface-2 transition-all duration-300 shadow-sm hover:shadow-glow-sm"
              >
                {/* Step Top Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface border border-border font-mono text-sm font-bold text-accent group-hover:border-accent/40 group-hover:bg-accent/10 transition-colors">
                      {step.num}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-fg-subtle uppercase">
                      STEP {idx + 1}
                    </span>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-border group-hover:bg-accent group-hover:scale-125 transition-all duration-300" />
                </div>

                {/* Step Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                    {locale === 'ar' ? step.titleAr : step.titleEn}
                  </h3>
                  <p className="text-sm font-medium text-fg-muted leading-relaxed">
                    {locale === 'ar' ? step.descAr : step.descEn}
                  </p>
                </div>

                {/* Micro Detail */}
                <div className="pt-4 border-t border-white/5 text-xs text-fg-subtle leading-relaxed group-hover:text-fg-muted transition-colors">
                  {locale === 'ar' ? step.detailAr : step.detailEn}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

