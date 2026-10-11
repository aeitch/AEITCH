"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, Shield, Lock, FileCode, Users } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { ConsultationModal } from '@/components/forms/ConsultationModal';

export const Vision2030Focused: React.FC = () => {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';
  const [modalOpen, setModalOpen] = useState(false);

  const tracks = [
    {
      serviceAr: 'الذكاء الاصطناعي والأتمتة',
      serviceEn: 'AI Automation & Integration',
      themeAr: 'اقتصاد مزدهر — رفع إنتاجية القطاعات الحيوية',
      themeEn: 'Thriving Economy — Boosting productivity across vital sectors',
      offerAr: 'أتمتة دورات العمل، RAG مؤسسي، استضافة سيادية داخل المملكة',
      offerEn: 'Workflow automation, enterprise RAG, sovereign hosting within the Kingdom',
    },
    {
      serviceAr: 'تطوير المنتجات',
      serviceEn: 'Product Development',
      themeAr: 'مجتمع حيوي واقتصاد رقمي — دعم ريادة الأعمال',
      themeEn: 'Vibrant Society & Digital Economy — Empowering entrepreneurship',
      offerAr: 'بناء MVPs متقنة في 8 أسابيع، جاهزة للاختبار الاستثماري والتوسع',
      offerEn: 'High-craft MVPs built in 8 weeks, ready for market validation and investment scale',
    },
    {
      serviceAr: 'DevOps وهندسة السحابة',
      serviceEn: 'DevOps & Cloud Engineering',
      themeAr: 'وطن طموح — بنية تحتية رقمية آمنة ومستقرة',
      themeEn: 'Ambitious Nation — Resilient, sovereign digital infrastructure',
      offerAr: 'ترحيل سحابي آمن، امتثال لمعايير NCA وPDPL، توفر 99.9%',
      offerEn: 'Secure cloud migrations, compliance with NCA and PDPL, 99.9% uptime architectures',
    },
    {
      serviceAr: 'البرمجيات المخصصة',
      serviceEn: 'Custom Software Development',
      themeAr: 'تحول رقمي شامل — أنظمة مؤسسية بلا تراخيص متكررة',
      themeEn: 'Comprehensive Digital Transformation — Enterprise systems with zero vendor lock-in',
      offerAr: 'برمجيات مصممة خصيصًا لكل قطاع، بملكية كاملة للكود وحرية تامة',
      offerEn: 'Bespoke enterprise software tailored to sector realities, with 100% client code ownership',
    },
  ];

  const commitments = [
    {
      icon: <Lock className="h-5 w-5 text-[#e9800a]" />,
      titleAr: 'البيانات تحت سيطرتك',
      titleEn: 'Data under your control',
      descAr: 'استضافة سحابية خاصة أو داخل المملكة، دون تسريب أي بيانات إلى نماذج عامة.',
      descEn: 'Private or local cloud hosting with zero sensitive data shared to public models.',
    },
    {
      icon: <FileCode className="h-5 w-5 text-[#e9800a]" />,
      titleAr: 'ملكية الكود لك 100%',
      titleEn: 'Full code ownership',
      descAr: 'المستودع، التوثيق، البنية، وخطوط النشر كلها ملكك بالكامل من اليوم الأول.',
      descEn: 'Repository, docs, architecture and CI/CD pipelines belong 100% to you from day one.',
    },
    {
      icon: <Users className="h-5 w-5 text-[#e9800a]" />,
      titleAr: 'نقل معرفة حقيقي',
      titleEn: 'Knowledge transfer',
      descAr: 'نعمل كفريق واحد مع مهندسيك ونسلّمهم كل شيء جاهزًا للإدارة والتطوير.',
      descEn: 'We embed with your engineering team and hand over a system they can maintain and evolve.',
    },
  ];

  return (
    <section
      id="vision-2030"
      data-theme="light"
      className="relative py-24 sm:py-32 md:py-36 bg-[#faf9f6] text-[#0a0a0a] border-t border-b border-black/10 overflow-hidden transition-colors duration-500"
      dir={direction}
    >
      {/* Architectural Light Grid & Ambient Accents */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.05]" />
      <div className="pointer-events-none absolute top-1/3 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#e9800a]/10 rounded-full blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {/* Section Header with Staggered Kinetic Entrance */}
        <div className="max-w-3xl space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/40 bg-[#e9800a]/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#c26500] shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#e9800a]" />
            <span>{isAr ? 'رؤية 2030' : 'Vision 2030'}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0a0a0a] leading-tight"
          >
            {isAr
              ? 'نهندس ما تحتاجه المملكة لتحقيق رؤيتها الرقمية.'
              : 'We engineer what the Kingdom needs to deliver its digital vision.'}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#4a4a4a] leading-relaxed font-normal"
          >
            {isAr
              ? 'تقوم رؤية السعودية 2030 على اقتصاد متنوع ومجتمع حيوي ووطن طموح، والتقنية هي المحرك الأساسي لكل ذلك. نضع قدراتنا الهندسية في خدمة هذه الأولويات: ذكاء اصطناعي يرفع الإنتاجية، ومنتجات رقمية تدعم ريادة الأعمال، وبنية سحابية آمنة، وأنظمة مؤسسية حديثة.'
              : 'Saudi Vision 2030 rests on a diversified economy, a vibrant society and an ambitious nation, and technology is the engine behind all three. We align our engineering capabilities with those priorities: AI that lifts productivity, digital products that support entrepreneurship, secure cloud infrastructure, and modern enterprise systems.'}
          </motion.p>
        </div>

        {/* Strategic Alignment Tracks (High-Contrast Clean Architectural Table) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="rounded-2xl border border-black/10 bg-white overflow-hidden shadow-xl"
        >
          {/* Table Header (Desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-black/10 bg-black/[0.03] text-xs font-mono uppercase tracking-wider text-black/60 font-semibold">
            <div className="col-span-3">{isAr ? 'الخدمة' : 'Service'}</div>
            <div className="col-span-4">{isAr ? 'محور رؤية 2030' : 'Vision 2030 Theme'}</div>
            <div className="col-span-5">{isAr ? 'ماذا نقدم' : 'What We Offer'}</div>
          </div>

          {/* Table Rows with Interactive Hover Rhythm */}
          <div className="divide-y divide-black/10">
            {tracks.map((track, idx) => (
              <motion.div
                key={idx}
                whileHover={{ backgroundColor: 'rgba(233, 128, 10, 0.04)' }}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 p-5 sm:p-6 transition-colors"
              >
                {/* Service Tag */}
                <div className="md:col-span-3 font-mono text-sm font-bold text-[#c26500]">
                  {isAr ? track.serviceAr : track.serviceEn}
                </div>

                {/* Theme */}
                <div className="md:col-span-4 text-sm font-semibold text-[#0a0a0a]">
                  <span className="md:hidden text-xs text-black/50 block font-mono mb-1">
                    {isAr ? 'المحور:' : 'Theme:'}
                  </span>
                  {isAr ? track.themeAr : track.themeEn}
                </div>

                {/* Offer */}
                <div className="md:col-span-5 text-sm text-[#444444] leading-relaxed">
                  <span className="md:hidden text-xs text-black/50 block font-mono mb-1">
                    {isAr ? 'ماذا نقدم:' : 'Offer:'}
                  </span>
                  {isAr ? track.offerAr : track.offerEn}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Commitments: Three Crisp White Cards */}
        <div className="space-y-6">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#c26500] font-bold">
            {isAr ? 'التزاماتنا الهندسية' : 'OUR COMMITMENTS'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {commitments.map((c, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08)' }}
                className="rounded-2xl border border-black/10 bg-white p-6 space-y-3 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[#e9800a]/10 p-2 border border-[#e9800a]/30 shrink-0">
                    {c.icon}
                  </div>
                  <h3 className="text-base font-bold text-[#0a0a0a]">
                    {isAr ? c.titleAr : c.titleEn}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  {isAr ? c.descAr : c.descEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA & Disclaimer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-black/10">
          <motion.button
            onClick={() => setModalOpen(true)}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a0a0a] text-white px-6 py-3.5 text-sm font-bold hover:bg-[#e9800a] hover:text-black transition-colors shadow-md self-start"
          >
            <span>{isAr ? 'ناقش مشروعك المرتبط برؤية 2030' : 'Discuss your Vision 2030 project'}</span>
            {direction === 'rtl' ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </motion.button>

          <p className="text-xs text-black/50 max-w-md leading-relaxed">
            {isAr
              ? 'إيتش شركة خاصة مستقلة، ولا تدّعي أي تمثيل حكومي أو شراكة رسمية مع الجهات المذكورة.'
              : 'AEITCH is an independent private company and does not claim government representation or official partnership with the bodies mentioned.'}
          </p>
        </div>
      </div>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService="vision-2030"
      />
    </section>
  );
};
