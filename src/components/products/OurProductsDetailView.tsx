"use client";

import React from 'react';
import Link from 'next/link';
import {
  Rocket,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Car,
  CreditCard,
  Layers,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { TrustBadges } from '@/components/common/trust-badges';
import { Vision2030Strip } from '@/components/common/vision-2030-strip';

export function OurProductsDetailView() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const products = [
    {
      name: 'ParkKaro',
      domain: 'parkkaro.pk',
      url: 'https://parkkaro.pk',
      icon: Car,
      tagAr: 'مشاركة المواقف الذكية',
      tagEn: 'Smart Parking Sharing',
      descAr: 'يربط السائقين الباحثين عن موقف بأصحاب المنازل الذين لديهم مساحة. احجز بالساعة واكسب دخلًا إضافيًا.',
      descEn: 'Connects drivers who need parking with homeowners who have space. Book by the hour. Earn passive income.',
      highlightsAr: ['حجز فوري بالدقيقة والساعة', 'بوابة دفع آمنة وتسوية مالية مؤتمتة', 'تطبيق هاتف بواجهات سهلة وسريعة'],
      highlightsEn: ['Instant hourly booking & search', 'Secure automated payout settlement', 'Intuitive mobile & web user experience'],
      color: 'from-amber-500/15 via-amber-500/5 to-transparent',
      borderColor: 'border-amber-500/30 hover:border-amber-500/60',
    },
    {
      name: 'Paylink',
      domain: 'thepaylink.com',
      url: 'https://thepaylink.com',
      icon: CreditCard,
      tagAr: 'بنية تحتية للمدفوعات',
      tagEn: 'Payment Gateway Infrastructure',
      descAr: 'منصة مدفوعات تتطلب سرعة وموثوقية وانضباطًا تشغيليًا، وأنشأنا لها منظومة DevOps للتوسع.',
      descEn: 'A payments platform that needs speed, reliability and operational discipline; we built the DevOps foundation to scale it.',
      highlightsAr: ['بنية سحابية عالية التوفر 99.99%', 'خطوط نشر آمنة ومراقبة حية للعمليات', 'معمارية قادرة على معالجة آلاف المعاملات في الثانية'],
      highlightsEn: ['High-availability 99.99% cloud topology', 'Automated CI/CD & active telemetry', 'Engineered for thousands of transactions per second'],
      color: 'from-blue-500/15 via-blue-500/5 to-transparent',
      borderColor: 'border-blue-500/30 hover:border-blue-500/60',
    },
  ];

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#080808] text-white selection:bg-[#e9800a] selection:text-black" dir={direction}>
      {/* 1. HERO */}
      <section className="relative w-full overflow-hidden bg-[#080808] pt-28 pb-20 sm:pt-36 sm:pb-24 border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-15" />
        <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#e9800a]/10 rounded-full blur-[150px]" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-4 py-1.5 backdrop-blur-md mb-6">
            <Sparkles className="h-4 w-4 text-[#e9800a]" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
              {isAr ? 'منتجاتنا' : 'OUR PRODUCTS'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            {isAr ? 'منتجات بنيناها وأطلقناها.' : 'Products we built and launched.'}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-8">
            {isAr
              ? 'أفضل دليل على قدرتنا منتجات حقيقية في السوق.'
              : 'The best proof of what we can do is real products in the market.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors shadow-glow-sm active:scale-95"
            >
              <span>{isAr ? 'ناقش فكرتك' : 'Talk through your idea'}</span>
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TRUST BADGES */}
      <TrustBadges />

      {/* 3. PRODUCTS GRID */}
      <section className="py-20 sm:py-28 bg-[#0c0c0e] border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {products.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className={`rounded-3xl border ${p.borderColor} bg-gradient-to-b ${p.color} to-[#111114] p-8 sm:p-10 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 hover:scale-[1.01]`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/60 text-[#e9800a] border border-white/10">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-xs text-neutral-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                        {isAr ? p.tagAr : p.tagEn}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-3 mb-2">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                        {p.name}
                      </h2>
                      <span className="font-mono text-xs text-neutral-400">
                        ({p.domain})
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6">
                      {isAr ? p.descAr : p.descEn}
                    </p>

                    <div className="space-y-2 mb-8">
                      {(isAr ? p.highlightsAr : p.highlightsEn).map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#e9800a] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white hover:text-[#e9800a] transition-colors"
                    >
                      <span>{p.domain}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    <Link
                      href="/contact-us"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e9800a] hover:underline"
                    >
                      <span>{isAr ? 'بناء منتج مماثل' : 'Build something like this'}</span>
                      <ArrowIcon className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="py-20 sm:py-24 bg-[#080808] text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
            {isAr ? 'لديك منتج في ذهنك؟' : 'Got a product in mind?'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mb-8 max-w-xl mx-auto">
            {isAr
              ? 'تحدث مع فريقنا لنحول فكرتك إلى منتج حقيقي عالي الأداء في السوق.'
              : 'Talk through your product idea with our engineering leads and map your MVP timeline.'}
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors shadow-glow-sm active:scale-95"
          >
            <span>{isAr ? 'ناقش فكرتك' : 'Talk through your idea'}</span>
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 5. VISION 2030 STRIP */}
      <Vision2030Strip />
    </div>
  );
}
