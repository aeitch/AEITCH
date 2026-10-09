"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  Cpu,
  Rocket,
  Cloud,
  Code2,
  CheckCircle2,
  Terminal,
  Layers,
  GitBranch,
  Boxes,
  Database,
  Shield,
  Workflow,
  Sparkles,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { ConsultationModal } from '@/components/forms/ConsultationModal';

export const ServicesFocused: React.FC = () => {
  const { locale, direction } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState('ai-automation');

  const openConsultation = (service: string) => {
    setModalService(service);
    setModalOpen(true);
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-bg overflow-hidden" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-15" />
      <div className="pointer-events-none absolute top-1/3 end-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/4 start-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-28 sm:space-y-36">

        {/* ============================================================== */}
        {/* BLOCK 01 — AI Automation & Integration                          */}
        {/* Layout: Asymmetric Split Grid with Engineering Capability Matrix */}
        {/* ============================================================== */}
        <div className="relative border-b border-border/80 pb-20 sm:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Narrative Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/10 border border-accent/30 font-bold text-[11px]">
                  01
                </span>
                <span>{locale === 'ar' ? 'الذكاء الاصطناعي والأتمتة' : 'AI AUTOMATION & INTEGRATION'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {locale === 'ar'
                  ? 'ادمج الذكاء الاصطناعي في عملك بأمان وبعائد واضح.'
                  : 'Bring AI into your business — safely, with clear ROI.'}
              </h2>

              <p className="text-sm sm:text-base text-fg-muted leading-relaxed font-normal">
                {locale === 'ar'
                  ? 'نصمم ونبني حلولًا عملية تُنهي العمل اليدوي المتكرر وتسرّع القرار: من أتمتة العمليات إلى وكلاء الذكاء الاصطناعي والتحليلات التنبؤية، ونربطها بأنظمتك وبياناتك الحالية.'
                  : 'We design and build practical solutions that remove repetitive manual work and speed up decisions, from process automation to AI agents and predictive analytics, integrated with your existing systems and data.'}
              </p>

              {/* Target Audience Pill */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs">
                <span className="font-mono uppercase tracking-wider text-accent font-semibold block mb-1">
                  {locale === 'ar' ? 'لمن هذا:' : 'FOR:'}
                </span>
                <span className="text-fg-muted leading-relaxed">
                  {locale === 'ar'
                    ? 'فرق العمليات والتقنية التي تريد نتائج من الذكاء الاصطناعي، لا تجارب.'
                    : 'Ops and tech teams that want results from AI, not experiments.'}
                </span>
              </div>

              {/* CTA Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => openConsultation('ai-automation')}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-black hover:bg-accent-hover transition-colors shadow-glow-sm"
                >
                  <span>{locale === 'ar' ? 'ابدأ مشروع ذكاء اصطناعي' : 'Start an AI project'}</span>
                  {direction === 'rtl' ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </button>
                <Link
                  href="/services/ai-automation"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-xs font-semibold text-fg-muted hover:text-white hover:border-accent/40 transition-colors"
                >
                  <span>{locale === 'ar' ? 'تفاصيل الخدمة' : 'Service Details'}</span>
                </Link>
              </div>
            </div>

            {/* Right Capability Matrix (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-accent" />
                  <span className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
                    {locale === 'ar' ? 'ماذا نبني في الذكاء الاصطناعي' : 'WHAT WE BUILD IN AI'}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-fg-subtle">6 CORE CAPABILITIES</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    num: '01',
                    ar: 'أتمتة العمليات بالذكاء الاصطناعي',
                    en: 'AI-driven process automation',
                    descAr: 'تحويل المهام المتكررة إلى تدفقات مؤتمتة ذكية',
                    descEn: 'Eliminate repetitive manual loops with intelligent workflows',
                  },
                  {
                    num: '02',
                    ar: 'وكلاء ذكاء اصطناعي مؤسسيون وأنظمة RAG للبحث في المعرفة الداخلية',
                    en: 'Enterprise AI agents and RAG for internal knowledge search',
                    descAr: 'بحث دلالي فائق الدقة داخل مستندات الشركة دون تسريب',
                    descEn: 'Context-aware semantic agents isolated within your perimeter',
                  },
                  {
                    num: '03',
                    ar: 'تحليلات تنبؤية',
                    en: 'Predictive analytics',
                    descAr: 'نماذج رياضية تتوقع السلوك والطلب ومسارات النمو',
                    descEn: 'Mathematical models forecasting operational trends',
                  },
                  {
                    num: '04',
                    ar: 'معالجة اللغة الطبيعية (بما فيها العربية)',
                    en: 'Natural language processing (including Arabic)',
                    descAr: 'فهم وتلخيص المحتوى والوثائق العربية بدقة عالية',
                    descEn: 'High-accuracy comprehension for Arabic and English dialects',
                  },
                  {
                    num: '05',
                    ar: 'أنظمة الرؤية الحاسوبية',
                    en: 'Computer vision systems',
                    descAr: 'فحص الصور والفيديو والمستندات واستخراج البيانات آليًا',
                    descEn: 'Automated document extraction, OCR and video analysis',
                  },
                  {
                    num: '06',
                    ar: 'تطوير النماذج والتكامل والنشر',
                    en: 'Model development, integration and deployment',
                    descAr: 'نشر نماذج مفتوحة المصدر على بنيتك الخاصة وتوصيلها بالـ APIs',
                    descEn: 'Private fine-tuning, API integration and production inference',
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="group rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-accent/30 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] text-accent/80 font-bold">
                        {item.num}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-border group-hover:bg-accent transition-colors" />
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-accent transition-colors mb-1">
                      {locale === 'ar' ? item.ar : item.en}
                    </div>
                    <div className="text-xs text-fg-subtle leading-relaxed">
                      {locale === 'ar' ? item.descAr : item.descEn}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* BLOCK 02 — Product Development                                 */}
        {/* Layout: Horizontal 8-Week Timeline & Full-Cycle Roadmap        */}
        {/* ============================================================== */}
        <div className="relative border-b border-border/80 pb-20 sm:pb-28">
          <div className="space-y-8">
            {/* Header Ribbon */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/10 border border-accent/30 font-bold text-[11px]">
                    02
                  </span>
                  <span>{locale === 'ar' ? 'تطوير المنتجات' : 'PRODUCT DEVELOPMENT'}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  {locale === 'ar'
                    ? 'من الفكرة إلى الإطلاق، منتج جاهز للنمو.'
                    : 'From idea to launch — a product ready to grow.'}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-fg-muted max-w-xl font-normal leading-relaxed">
                {locale === 'ar'
                  ? 'هندسة منتجات متكاملة: نتحقق من الفكرة، نصمم التجربة، نبني النسخة الأولى (MVP)، ثم نطورها إلى منصة قابلة للتوسع وآمنة وسحابية الأساس.'
                  : 'End-to-end product engineering. We validate the idea, design the experience, build the MVP, then evolve it into a scalable, secure, cloud-native platform.'}
              </p>
            </div>

            {/* What We Build: Structured 6-Deliverable Flow */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  phase: 'Phase 01',
                  ar: 'تطوير المنتجات من الفكرة حتى الإطلاق',
                  en: 'Full-cycle product engineering',
                  descAr: 'هندسة كاملة من التخطيط الأولي وصولاً للإنتاج التجاري',
                  descEn: 'Architected from foundational discovery to production release',
                },
                {
                  phase: 'Phase 02',
                  ar: 'تصميم وتطوير الـ MVP',
                  en: 'MVP design and development',
                  descAr: 'نسخة أولية عملية قابلة للاختبار في السوق لجذب المستخدمين والمستثمرين',
                  descEn: 'Lean, testable first release validating core user demand',
                },
                {
                  phase: 'Phase 03',
                  ar: 'استراتيجية المنتج وخارطة الطريق',
                  en: 'Product strategy and roadmapping',
                  descAr: 'تحديد الأولويات والميزات الحرجة لتقليل الهدر الزمني',
                  descEn: 'Prioritizing high-leverage features to minimize build waste',
                },
                {
                  phase: 'Phase 04',
                  ar: 'تصميم UI / UX',
                  en: 'UI / UX product design',
                  descAr: 'واجهات مستخدم ثنائية اللغة متوافقة مع سلوك المستخدم الإقليمي',
                  descEn: 'Bilingual, accessible interfaces built for conversion and delight',
                },
                {
                  phase: 'Phase 05',
                  ar: 'منصات SaaS متعددة المستأجرين',
                  en: 'Multi-tenant SaaS platforms',
                  descAr: 'معمارية سحابية تعزل بيانات العملاء وتدعم الاشتراكات والفواتير',
                  descEn: 'Secure tenant isolation with scalable subscription architecture',
                },
                {
                  phase: 'Phase 06',
                  ar: 'إدارة دورة حياة المنتج',
                  en: 'Product lifecycle management',
                  descAr: 'مواكبة نمو المنتج وتحديثه المستمر بعد الإطلاق',
                  descEn: 'Iterative feature updates, refactoring, and post-launch telemetry',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-surface p-5 hover:border-accent/40 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] text-accent tracking-widest uppercase">
                      {item.phase}
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {locale === 'ar' ? item.ar : item.en}
                    </h3>
                    <p className="text-xs text-fg-subtle leading-relaxed">
                      {locale === 'ar' ? item.descAr : item.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Audience Ribbon & Action */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold block">
                  {locale === 'ar' ? 'الفئة المستهدفة:' : 'FOR FOUNDERS & ENTERPRISES:'}
                </span>
                <p className="text-xs sm:text-sm text-fg-muted">
                  {locale === 'ar'
                    ? 'المؤسسون والشركات الناشئة والمؤسسات التي تطلق منتجًا رقميًا جديدًا.'
                    : 'Founders, startups and enterprises launching a new digital product.'}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => openConsultation('product-development')}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs sm:text-sm font-bold text-black hover:bg-accent-hover transition-colors shadow-glow-sm"
                >
                  <span>{locale === 'ar' ? 'ناقش فكرة منتجك' : 'Talk through your product idea'}</span>
                  {direction === 'rtl' ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </button>
                <Link
                  href="/services/product-development"
                  className="text-xs font-mono text-fg-muted hover:text-white transition-colors"
                >
                  {locale === 'ar' ? 'صفحة الخدمة ←' : 'Learn more →'}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* BLOCK 03 — DevOps & Cloud Engineering                           */}
        {/* Layout: Technical Infrastructure Schematic with Pipeline Flow  */}
        {/* ============================================================== */}
        <div className="relative border-b border-border/80 pb-20 sm:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Terminal Schematic (6 cols) */}
            <div className="lg:col-span-6 rounded-2xl border border-border bg-black/90 p-5 sm:p-7 shadow-2xl font-mono text-xs">
              {/* Terminal Window Chrome */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-green-500/80" />
                  <span className="text-[11px] text-fg-subtle ms-2">cloud-ops.aeitch.io</span>
                </div>
                <span className="text-[10px] text-emerald-400">PIPELINE VERIFIED</span>
              </div>

              {/* What We Build (6 items formatted as infrastructure stages) */}
              <div className="space-y-3 font-mono">
                {[
                  { tag: 'CI/CD', ar: 'خطوط CI/CD آلية', en: 'Automated CI/CD pipelines', status: 'PASS' },
                  { tag: 'FinOps', ar: 'إدارة البنية السحابية وتحسين التكلفة', en: 'Cloud infrastructure management & cost optimization', status: 'OPTIMIZED' },
                  { tag: 'IaC', ar: 'البنية كشيفرة (Terraform)', en: 'Infrastructure as Code (Terraform)', status: 'SYNCED' },
                  { tag: 'Migrate', ar: 'الهجرة إلى السحابة وتحديث الأنظمة', en: 'Cloud migration and modernization', status: 'STANDARDIZED' },
                  { tag: 'Observe', ar: 'المراقبة وقابلية الرصد', en: 'Monitoring and observability', status: 'TELEMETRY' },
                  { tag: 'K8s', ar: 'الحاويات وKubernetes', en: 'Containerization and Kubernetes', status: 'CLUSTERED' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-white/5 bg-white/[0.02] hover:border-accent/30 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-accent text-[11px] font-bold">[{item.tag}]</span>
                      <span className="text-white text-xs truncate">
                        {locale === 'ar' ? item.ar : item.en}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 shrink-0 ms-2">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Narrative Column (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/10 border border-accent/30 font-bold text-[11px]">
                  03
                </span>
                <span>{locale === 'ar' ? 'DevOps وهندسة السحابة' : 'DEVOPS & CLOUD ENGINEERING'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {locale === 'ar'
                  ? 'انشر أسرع، وقلّل التوقف، وتحكّم في تكلفة السحابة.'
                  : 'Ship faster, cut downtime, control your cloud bill.'}
              </h2>

              <p className="text-sm sm:text-base text-fg-muted leading-relaxed font-normal">
                {locale === 'ar'
                  ? 'نبني خطوط نشر آلية وبنية سحابية موثوقة وآمنة، ونراقبها باستمرار، لتصل تحديثاتك إلى المستخدم بسرعة وثبات.'
                  : 'We build automated delivery pipelines and reliable, secure cloud infrastructure, and monitor it continuously, so your updates reach users quickly and safely.'}
              </p>

              {/* Target Audience Box */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs">
                <span className="font-mono uppercase tracking-wider text-accent font-semibold block mb-1">
                  {locale === 'ar' ? 'لمن هذا:' : 'FOR:'}
                </span>
                <span className="text-fg-muted leading-relaxed">
                  {locale === 'ar'
                    ? 'الفرق التي تعاني من بطء الإصدارات أو أعطال متكررة أو فواتير سحابية متصاعدة.'
                    : 'Teams facing slow releases, recurring outages or climbing cloud bills.'}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => openConsultation('cloud-devops')}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-black hover:bg-accent-hover transition-colors shadow-glow-sm"
                >
                  <span>{locale === 'ar' ? 'قيّم بنيتك السحابية' : 'Review your cloud setup'}</span>
                  {direction === 'rtl' ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </button>
                <Link
                  href="/services/cloud-devops"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-xs font-semibold text-fg-muted hover:text-white hover:border-accent/40 transition-colors"
                >
                  <span>{locale === 'ar' ? 'تفاصيل السحابة وDevOps' : 'Cloud Architecture Details'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* BLOCK 04 — Custom Software Development                         */}
        {/* Layout: Modular Architectural Blueprint Matrix                */}
        {/* ============================================================== */}
        <div className="relative">
          <div className="space-y-10">
            {/* Top Header */}
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/10 border border-accent/30 font-bold text-[11px]">
                  04
                </span>
                <span>{locale === 'ar' ? 'تطوير البرمجيات المخصصة' : 'CUSTOM SOFTWARE DEVELOPMENT'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {locale === 'ar'
                  ? 'برمجيات مصممة على مقاس عملك، لا العكس.'
                  : 'Software built around your business, not the other way around.'}
              </h2>

              <p className="text-sm sm:text-base text-fg-muted leading-relaxed font-normal">
                {locale === 'ar'
                  ? 'نهندس تطبيقات مؤسسية مخصصة لعمليتك وعملائك وأهدافك بعيدة المدى، سواء كان المشروع تحديث نظام قديم أو بناء نظام جديد من الصفر.'
                  : "We engineer enterprise applications tailored to your workflow, customers and long-term goals, whether you're modernizing a legacy system or building something new from scratch."}
              </p>
            </div>

            {/* The 6 Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  code: 'SW-01',
                  ar: 'هندسة برمجية متكاملة من البداية للنهاية',
                  en: 'End-to-end software engineering',
                  descAr: 'تصميم المعمارية، كتابة الكود النظيف، الفحص والتشغيل',
                  descEn: 'From technical architecture and clean code to testing and production',
                },
                {
                  code: 'SW-02',
                  ar: 'تطبيقات مؤسسية',
                  en: 'Enterprise applications',
                  descAr: 'منظومات عمل متينة تخدم آلاف المستخدمين والعمليات الحساسة',
                  descEn: 'Mission-critical systems serving high user volumes and workflows',
                },
                {
                  code: 'SW-03',
                  ar: 'تطوير تطبيقات Low-Code',
                  en: 'Low-code application development',
                  descAr: 'بناء أدوات داخلية سريعة لفرق العمل لتقليص تكلفة التطوير',
                  descEn: 'Rapid internal tool development for immediate operational leverage',
                },
                {
                  code: 'SW-04',
                  ar: 'تصميم واجهات API وتكامل الأنظمة',
                  en: 'API design and system integration',
                  descAr: 'ربط المنظومات الحالية وقواعد البيانات وبوابات الطرف الثالث بسلاسة',
                  descEn: 'Seamless integrations connecting legacy databases and third-party APIs',
                },
                {
                  code: 'SW-05',
                  ar: 'تحديث الأنظمة القديمة (Legacy)',
                  en: 'Legacy system modernization',
                  descAr: 'إعادة هيكلة الأنظمة المركزية المعقدة إلى خدمات سحابية حديثة',
                  descEn: 'Refactoring monoliths into modular cloud architectures with zero data loss',
                },
                {
                  code: 'SW-06',
                  ar: 'واجهات مستخدم تركز على التجربة',
                  en: 'UX-focused product interfaces',
                  descAr: 'تجارب تفاعلية سريعة ترفع إنتاجية المستخدمين وتسهل إنجاز المهام',
                  descEn: 'Intuitive, highly responsive interfaces built around real workflows',
                },
              ].map((module) => (
                <div
                  key={module.code}
                  className="rounded-2xl border border-border bg-surface p-6 hover:border-accent/40 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-accent font-bold">
                        {module.code}
                      </span>
                      <Code2 className="h-4 w-4 text-fg-subtle" />
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {locale === 'ar' ? module.ar : module.en}
                    </h3>
                    <p className="text-xs text-fg-subtle leading-relaxed">
                      {locale === 'ar' ? module.descAr : module.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Ribbon with Target Audience & CTA */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold block">
                  {locale === 'ar' ? 'لمن هذا:' : 'FOR ORGANIZATIONS:'}
                </span>
                <p className="text-xs sm:text-sm text-fg-muted">
                  {locale === 'ar'
                    ? 'المؤسسات التي لا تناسبها الحلول الجاهزة، أو التي تحتاج إلى تحديث أنظمتها.'
                    : "Organizations where off-the-shelf tools don't fit, or whose systems need modernizing."}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => openConsultation('custom-software')}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs sm:text-sm font-bold text-black hover:bg-accent-hover transition-colors shadow-glow-sm"
                >
                  <span>{locale === 'ar' ? 'ابدأ مشروعك البرمجي' : 'Start your software project'}</span>
                  {direction === 'rtl' ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </button>
                <Link
                  href="/services/custom-software"
                  className="text-xs font-mono text-fg-muted hover:text-white transition-colors"
                >
                  {locale === 'ar' ? 'تفاصيل الخدمة ←' : 'Learn more →'}
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Global Consultation Modal */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={modalService}
      />
    </section>
  );
};
