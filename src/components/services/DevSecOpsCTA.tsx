"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, Clock, ShieldCheck } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export function DevSecOpsCTA() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';

  return (
    <section className="relative py-24 bg-[#080808] text-white overflow-hidden" dir={direction}>
      {/* Background Lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1d1308]/40 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#e9800a]/30 bg-gradient-to-b from-[#141210] to-[#0c0b0a] p-8 sm:p-14 text-center shadow-[0_25px_60px_-20px_rgba(233,128,10,0.2)]">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-3.5 py-1.5 text-xs font-mono font-semibold text-[#e9800a] mb-6">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{isAr ? 'جاهزية الامتثال السيبراني السيادي' : 'SOVEREIGN DEVSECOPS AUDIT'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
            {isAr
              ? 'حقق الامتثال السيادي لضوابط NCA دون التضحية بسرعة التطوير'
              : 'Achieve Sovereign NCA Compliance Without Sacrificing Engineering Velocity'}
          </h2>

          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            {isAr
              ? 'احجز جلسة تدقيق هندسية متخصصة مع معماريي الأمن السيبراني لدينا. نقوم بفحص خطوط CI/CD، وآليات إدارة الأسرار، وإعدادات السحابة مقابل ضوابط الهيئة الوطنية للأمن السيبراني ونظام حماية البيانات.'
              : 'Schedule an in-depth DevSecOps architectural audit. We review your CI/CD pipelines, secret management workflows, and in-kingdom cloud infrastructure against NCA ECC, CCC, and Saudi PDPL controls.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-4 text-base font-bold text-black hover:bg-[#ff9420] transition-all shadow-[0_0_30px_rgba(233,128,10,0.4)] active:scale-[0.98]"
            >
              <span>{isAr ? 'احجز تدقيق الأمن والامتثال' : 'Book Sovereign DevSecOps Audit'}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/delivery-engine"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-7 py-4 text-base font-semibold text-white hover:bg-white/[0.08] transition-all active:scale-[0.98]"
            >
              <span>{isAr ? 'استكشف محرك الإنجاز الثلاثي' : 'Explore The Triad Delivery Engine'}</span>
            </Link>
          </div>

          {/* Guarantee Badges */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 font-mono text-xs text-white/60">
            <span className="flex items-center gap-2">
              <Lock className="h-3.5 w-3.5 text-[#e9800a]" />
              <span>{isAr ? 'ملكية تامة لكود تيرفورم وسياسات OPA' : '100% Day-1 In-Kingdom IaC & Policy Ownership'}</span>
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-[#e9800a]" />
              <span>{isAr ? 'صفر مفاتيح ثابتة مع أسرار ديناميكية' : 'Zero Hardcoded Secrets Guarantee'}</span>
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-[#e9800a]" />
              <span>{isAr ? 'تزامن كامل بتوقيت الرياض (GMT+3)' : '100% Riyadh Working Hours Synchronized'}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
