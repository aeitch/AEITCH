"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, Clock, ShieldCheck, Cpu, Calendar } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export function AiConsultingCTA() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';

  return (
    <section className="relative py-24 bg-[#080808] text-white overflow-hidden" dir={direction}>
      {/* Background Lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1d1308]/40 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#e9800a]/30 bg-gradient-to-b from-[#141210] to-[#0c0b0a] p-8 sm:p-14 text-center shadow-[0_25px_60px_-20px_rgba(233,128,10,0.2)]">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-3.5 py-1.5 text-xs font-mono font-semibold text-[#e9800a] mb-6">
            <Cpu className="h-3.5 w-3.5" />
            <span>{isAr ? 'جاهزية الذكاء الاصطناعي السيادي' : 'ENTERPRISE AI READINESS'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
            {isAr
              ? 'انشر ذكاء اصطناعياً سيادياً وعالي الدقة في قلب أعمالك'
              : 'Deploy Production-Grade Sovereign AI in Your Enterprise'}
          </h2>

          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            {isAr
              ? 'احجز جلسة استشارية وتدقيق معماري مع كبير مهندسي الذكاء الاصطناعي لدينا لتقييم جاهزية بياناتك، وتحديد النماذج اللغوية المثالية، وتصميم بنية استدلال محلية آمنة دون أي تسريب لبياناتك خارج المملكة.'
              : 'Schedule an architecture scoping session with our Lead AI Architect. We evaluate your enterprise data readiness, design private foundation model pipelines, and enforce zero cross-border leakage on in-kingdom GPUs.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link
              href="/contact-us#consultation"
              className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-4 text-base font-bold text-black hover:bg-[#ff9420] transition-all shadow-[0_0_30px_rgba(233,128,10,0.4)] active:scale-[0.98]"
            >
              <Calendar className="h-4 w-4" />
              <span>{isAr ? 'حجز جلسة استشارة الذكاء الاصطناعي' : 'Book Your Architecture Session'}</span>
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
              <span>{isAr ? 'سيادة بيانات 100% داخل المملكة' : '100% In-Kingdom Data Sovereignty'}</span>
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-[#e9800a]" />
              <span>{isAr ? 'ملكية تامة لأوزان النموذج والكود' : '100% Model Weights & Code Ownership'}</span>
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-[#e9800a]" />
              <span>{isAr ? 'تزامن كامل بتوقيت الرياض (GMT+3)' : '100% Riyadh Working Hours (Sun-Thu GMT+3)'}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
