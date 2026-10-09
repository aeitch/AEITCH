"use client";

import React from 'react';
import Link from 'next/link';
import {
  Cpu,
  Rocket,
  Cloud,
  Code2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  Shield,
  Layers,
  Activity,
  Terminal,
  Server,
  Zap,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { TrustBadges } from '@/components/common/trust-badges';
import { Vision2030Strip } from '@/components/common/vision-2030-strip';

export function ServicesHubView() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const services = [
    {
      id: '01',
      slug: 'ai-automation',
      titleAr: 'الذكاء الاصطناعي والأتمتة',
      titleEn: 'AI Automation & Integration',
      taglineAr: 'أتمتة الأعمال المتكررة ووكلاء ذكاء اصطناعي مرتبطون ببياناتك.',
      taglineEn: 'Automate repetitive work with AI agents connected to your data.',
      icon: Cpu,
      color: 'from-amber-500/20 via-amber-500/5 to-transparent',
      borderColor: 'border-amber-500/30 hover:border-amber-500/60',
      badgeAr: 'وكلاء وأنظمة RAG',
      badgeEn: 'Autonomous Agents & RAG',
      featuresAr: ['وكلاء أذكياء مرتبطون بقواعد معرفتك', 'أتمتة سير العمل وسلاسل القرار', 'بيئات سحابية خاصة ومشفرة متوافقة مع PDPL'],
      featuresEn: ['Enterprise RAG connected to your internal data', 'End-to-end workflow decision routing', 'In-Kingdom sovereign & private LLM serving'],
      statAr: 'استجابة سريعة ودقة مراقبة',
      statEn: 'Monitored accuracy & low latency',
    },
    {
      id: '02',
      slug: 'product-development',
      titleAr: 'تطوير المنتجات',
      titleEn: 'Product Development',
      taglineAr: 'من الفكرة إلى منتج في السوق.',
      taglineEn: 'From idea to a product in the market.',
      icon: Rocket,
      color: 'from-blue-500/20 via-blue-500/5 to-transparent',
      borderColor: 'border-blue-500/30 hover:border-blue-500/60',
      badgeAr: 'إطلاق في 6–10 أسابيع',
      badgeEn: 'MVP in 6–10 Weeks',
      featuresAr: ['تصميم UI/UX ثنائي اللغة (RTL/LTR)', 'بناء MVPs ومنصات SaaS قابلة للتوسع', 'هندسة معمارية آمنة جاهزة لجذب الاستثمار'],
      featuresEn: ['Bilingual GCC-first UI/UX engineering', 'Investor-grade MVPs and scalable SaaS', 'Clean modular architecture for long-term growth'],
      statAr: 'إصدارات أسبوعية مستمرة',
      statEn: 'Weekly agile sprint shipments',
    },
    {
      id: '03',
      slug: 'cloud-devops',
      titleAr: 'DevOps وهندسة السحابة',
      titleEn: 'DevOps & Cloud Engineering',
      taglineAr: 'نشر أسرع، توقف أقل، تكلفة مضبوطة.',
      taglineEn: 'Faster releases, less downtime, controlled cost.',
      icon: Cloud,
      color: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
      borderColor: 'border-emerald-500/30 hover:border-emerald-500/60',
      badgeAr: 'سحابة داخل المملكة (NCA CCC)',
      badgeEn: 'In-Kingdom Multi-Cloud',
      featuresAr: ['خطوط CI/CD مؤتمتة بدون فترات توقف', 'إدارة البنية التحتية كشيفرة (Terraform)', 'تحسين تكلفة السحابة ومراقبة على مدار الساعة'],
      featuresEn: ['Automated zero-downtime CI/CD pipelines', 'Infrastructure as Code (Terraform GitOps)', 'Cloud FinOps cost governance & 24/7 telemetry'],
      statAr: 'استقرار تشغيلي وأمان سيبراني',
      statEn: 'Resilient uptime & NCA CCC alignment',
    },
    {
      id: '04',
      slug: 'custom-software',
      titleAr: 'البرمجيات المخصصة',
      titleEn: 'Custom Software Development',
      taglineAr: 'أنظمة مبنية على مقاس عملك.',
      taglineEn: 'Systems built around your business.',
      icon: Code2,
      color: 'from-purple-500/20 via-purple-500/5 to-transparent',
      borderColor: 'border-purple-500/30 hover:border-purple-500/60',
      badgeAr: 'ملكية كاملة للكود',
      badgeEn: 'Full Code & IP Ownership',
      featuresAr: ['تطبيقات مؤسسية مخصصة وعالية الأداء', 'ربط واجهات API وتحديث الأنظمة القديمة', 'ضمان الجودة واختبارات الأمان والأداء'],
      featuresEn: ['Tailored high-concurrency microservices', 'Seamless API integration & legacy modernization', 'Full IP transfer with strict security controls'],
      statAr: 'تكامل كامل مع أنظمتك',
      statEn: '100% custom codebase ownership',
    },
  ];

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#080808] text-white selection:bg-[#e9800a] selection:text-black" dir={direction}>
      {/* 1. HERO HEADER */}
      <section className="relative w-full overflow-hidden bg-[#080808] pt-28 pb-20 sm:pt-36 sm:pb-24 border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-15" />
        <div className="pointer-events-none absolute top-1/3 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#e9800a]/10 rounded-full blur-[140px]" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-4 py-1.5 backdrop-blur-md mb-6">
            <Sparkles className="h-4 w-4 text-[#e9800a]" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
              {isAr ? 'الخدمات الأساسية' : 'CORE SERVICES'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            {isAr ? 'أربع خدمات نتقنها' : 'Four services we do well'}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            {isAr
              ? 'نركز على ما نعرف أن نفعله جيدًا: الذكاء الاصطناعي، المنتجات الرقمية، السحابة وDevOps، والبرمجيات المخصصة. اختر نقطة البداية، أو ابدأ بمكالمة ونحدد لك الأنسب.'
              : 'We focus on what we do best: AI, digital products, cloud and DevOps, and custom software. Pick a starting point, or start with a call and we’ll point you to the right one.'}
          </p>
        </div>
      </section>

      {/* 2. TRUST BADGES STRIP */}
      <TrustBadges />

      {/* 3. FOUR DISTINCT SERVICE CARDS */}
      <section className="relative py-20 sm:py-28 bg-[#0c0c0e]">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {services.map((srv) => {
              const Icon = srv.icon;
              return (
                <Link
                  key={srv.slug}
                  href={`/services/${srv.slug}`}
                  className={`group relative flex flex-col justify-between rounded-3xl border ${srv.borderColor} bg-gradient-to-b ${srv.color} to-[#111114] p-8 sm:p-10 backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-black/60`}
                >
                  <div>
                    {/* Header: ID + Badge */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#e9800a] bg-black/40 px-3 py-1 rounded-md border border-white/10">
                        {srv.id}
                      </span>
                      <span className="font-mono text-xs font-medium text-neutral-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                        {isAr ? srv.badgeAr : srv.badgeEn}
                      </span>
                    </div>

                    {/* Icon + Title */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/50 border border-white/10 text-[#e9800a] shadow-inner group-hover:border-[#e9800a]/50 group-hover:scale-105 transition-all">
                        <Icon className="h-7 w-7" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#e9800a] transition-colors leading-snug">
                        {isAr ? srv.titleAr : srv.titleEn}
                      </h2>
                    </div>

                    {/* Tagline */}
                    <p className="text-base sm:text-lg text-neutral-200 font-medium leading-relaxed mb-6">
                      {isAr ? srv.taglineAr : srv.taglineEn}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-8">
                      {(isAr ? srv.featuresAr : srv.featuresEn).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#e9800a] mt-1.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm font-bold text-white group-hover:text-[#e9800a] transition-colors">
                    <span className="text-neutral-400 font-mono text-xs font-normal">
                      {isAr ? srv.statAr : srv.statEn}
                    </span>
                    <div className="inline-flex items-center gap-2">
                      <span>{isAr ? 'استكشف الخدمة بالتفصيل' : 'Explore Service'}</span>
                      <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* NOT SURE WHERE TO START BOX */}
          <div className="mt-16 sm:mt-20 rounded-3xl border border-[#e9800a]/40 bg-gradient-to-r from-[#17120a] via-[#121214] to-[#17120a] p-8 sm:p-10 text-center backdrop-blur-xl shadow-2xl">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 text-[#e9800a] mb-4">
              <HelpCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3">
              {isAr ? 'لست متأكدًا من أين تبدأ؟' : 'Not sure where to start?'}
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto mb-6 leading-relaxed">
              {isAr
                ? 'لست متأكدًا؟ احجز 30 دقيقة ونرشدك إلى الخيار الأنسب لنشاطك، ونقيّم احتياجاتك التقنية دون أي التزام.'
                : 'Not sure? Book 30 minutes and we’ll guide you to the right option for your business, reviewing your technical needs with zero commitment.'}
            </p>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors shadow-lg active:scale-95"
            >
              <span>{isAr ? 'احجز استشارة 30 دقيقة' : 'Book a 30-Minute Consultation'}</span>
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. VISION 2030 STRIP */}
      <Vision2030Strip />
    </div>
  );
}
