"use client";

import React, { useEffect, useRef } from 'react';
import { Layers, ShieldCheck, Server, Lock, Cloud, CheckCircle2, Award } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { scrambleText } from '@/lib/anime-motion';
import { CLOUD_PARTNERS, COMPLIANCE_STANDARDS } from '@/lib/constants';

interface TechItem {
  name: string;
  category: string;
}

const TECH_ITEMS: TechItem[] = [
  { name: 'Next.js 15', category: 'High-Performance App Router' },
  { name: 'Three.js / WebGL', category: 'Interactive 3D Engine' },
  { name: 'TypeScript', category: 'Type-Safe Architecture' },
  { name: 'Python AI', category: 'LLMs, PyTorch & Agents' },
  { name: 'Kubernetes (CKA)', category: 'High-Availability Clusters' },
  { name: 'AWS ME-Central', category: 'Sovereign Cloud Deployment' },
  { name: 'Google Cloud Dammam', category: 'Regional Hyperscaler' },
  { name: 'Azure Riyadh', category: 'Enterprise Cloud' },
  { name: 'Terraform & GitOps', category: 'Infrastructure as Code' },
  { name: 'Apache Kafka', category: 'Event-Driven Streaming' },
  { name: 'HashiCorp Vault', category: 'Zero-Trust Secrets' },
  { name: 'PostgreSQL', category: 'Distributed Relational DB' },
  { name: 'mada / Apple Pay', category: 'Regional Payment Protocols' },
];

export function TechCarousel() {
  const { t, locale, direction } = useTranslation();
  const eyebrowRef = useRef<HTMLSpanElement>(null);

  // Text-scramble on reveal for eyebrow label
  useEffect(() => {
    const el = eyebrowRef.current;
    if (!el) return;

    let cleanup: (() => void) | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          cleanup = scrambleText(el, t.trust.preheading, { duration: 900 });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cleanup?.();
    };
  }, [t.trust.preheading]);

  return (
    <section className="relative w-full border-y border-border bg-bg-elevated py-12 overflow-hidden" dir={direction}>
      {/* 1. Verified Credentials & Compliance Strip */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center mb-6">
          <span
            ref={eyebrowRef}
            className="text-xs font-mono tracking-widest text-accent uppercase select-none"
          >
            {t.trust.preheading}
          </span>
        </div>

        {/* Dual Tier: Cloud Partners & Compliance Standards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Tier A: Cloud Partner Accreditations */}
          <div className="rounded-2xl border border-white/10 bg-surface p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
              <Cloud className="h-4 w-4 text-accent" />
              <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                {locale === 'ar' ? 'الاعتمادات وشراكات السحابة' : 'Cloud Hyperscaler Accreditations'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {CLOUD_PARTNERS.map((cp, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block">{cp.name}</span>
                    <span className="text-[10px] text-fg-subtle">{cp.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tier B: Enterprise Compliance Standards */}
          <div className="rounded-2xl border border-white/10 bg-surface p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                {locale === 'ar' ? 'معايير الأمان والسيادة المعتمدة' : 'Security & Compliance Standards'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {COMPLIANCE_STANDARDS.map((cs, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block">{cs.name}</span>
                    <span className="text-[10px] text-fg-subtle">{cs.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regional Enterprise Partner Ecosystem & Standards */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <div className="text-[11px] font-mono uppercase tracking-wider text-fg-subtle mb-4">
            {locale === 'ar'
              ? 'شركاء المنظومة التقنية الإقليمية ومعايير المدفوعات والفوترة المعتمدة'
              : 'Regional Technology Ecosystem & Certified Enterprise Standards'}
          </div>
          <RegionalPartnerLogos />
        </div>
      </div>

      {/* 2. Enterprise Technology Marquee */}
      <div className="relative w-full overflow-hidden mask-marquee-edges group mt-4">
        <div className="flex w-max animate-marquee space-x-4 rtl:space-x-reverse py-2 group-hover:[animation-play-state:paused]">
          {TECH_ITEMS.map((tech, idx) => (
            <div
              key={`tech-1-${idx}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface px-5 py-3 shadow-sm transition-all duration-300 hover:border-accent/40 hover:bg-surface-2 select-none"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface-2 text-accent">
                <Layers className="h-4 w-4" />
              </div>
              <div className="flex flex-col text-start">
                <span className="text-xs sm:text-sm font-bold text-white">
                  {tech.name}
                </span>
                <span className="text-[10px] text-fg-subtle">
                  {tech.category}
                </span>
              </div>
            </div>
          ))}

          {/* Seamless duplicate */}
          {TECH_ITEMS.map((tech, idx) => (
            <div
              key={`tech-2-${idx}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface px-5 py-3 shadow-sm transition-all duration-300 hover:border-accent/40 hover:bg-surface-2 select-none"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface-2 text-accent">
                <Layers className="h-4 w-4" />
              </div>
              <div className="flex flex-col text-start">
                <span className="text-xs sm:text-sm font-bold text-white">
                  {tech.name}
                </span>
                <span className="text-[10px] text-fg-subtle">
                  {tech.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RegionalPartnerLogos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-80 transition-opacity hover:opacity-100">
      {/* 1. mada (Saudi Payments) */}
      <div className="flex items-center gap-2 group" title="mada - Saudi Payments National Network">
        <svg
          viewBox="0 0 110 32"
          className="h-6 sm:h-7 w-auto fill-current text-white/70 group-hover:text-accent transition-colors duration-200"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="mada Payment Network"
        >
          <path d="M12 8 C6 8 2 12 2 18 C2 24 6 28 12 28 C16 28 19 26 21 23 L21 28 L27 28 L27 8 L21 8 L21 13 C19 10 16 8 12 8 Z M14 23 C10.5 23 8 21 8 18 C8 15 10.5 13 14 13 C17.5 13 20 15 20 18 C20 21 17.5 23 14 23 Z" />
          <path d="M38 12 C34 12 31 15 31 19 L31 28 L37 28 L37 20 C37 17.5 38.5 16 41 16 C43.5 16 45 17.5 45 20 L45 28 L51 28 L51 20 C51 17.5 52.5 16 55 16 C57.5 16 59 17.5 59 20 L59 28 L65 28 L65 19 C65 14 62 12 58 12 C54.5 12 52.5 13.5 51 16 C49.5 13.5 47.5 12 44 12 C41 12 39 13.5 38 15 L38 12 Z" />
          <path d="M76 8 C70 8 66 12 66 18 C66 24 70 28 76 28 C80 28 83 26 85 23 L85 28 L91 28 L91 8 L85 8 L85 13 C83 10 80 8 76 8 Z M78 23 C74.5 23 72 21 72 18 C72 15 74.5 13 78 13 C81.5 13 84 15 84 18 C84 21 81.5 23 78 23 Z" />
          <rect x="97" y="8" width="6" height="20" rx="3" />
        </svg>
      </div>

      {/* 2. stc pay (Digital Bank / Mobile Wallet) */}
      <div className="flex items-center gap-2 group" title="stc pay - Digital Banking">
        <svg
          viewBox="0 0 120 32"
          className="h-6 sm:h-7 w-auto fill-current text-white/70 group-hover:text-accent transition-colors duration-200"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="stc pay"
        >
          <path d="M6 14 C4 14 2 15.5 2 17.5 C2 21 11 20.5 11 24 C11 26 9 27.5 6 27.5 C3.5 27.5 1.5 26.5 0.5 25 L0.5 28 C2 29 4 29.5 6.5 29.5 C11 29.5 14 27 14 23.5 C14 19.5 5 20 5 17 C5 15.5 6.5 14.5 9 14.5 C11 14.5 12.5 15.2 13.5 16 L13.5 13 C12 12.2 10.5 12 8.5 12 C7.5 12 6.5 12 6 14 Z" />
          <path d="M19 8 L19 12.5 L16 12.5 L16 15 L19 15 L19 25 C19 28 21 29.5 24 29.5 C25.5 29.5 26.5 29.2 27 28.8 L27 26 C26.5 26.2 25.8 26.5 25 26.5 C23.5 26.5 22.5 25.5 22.5 24 L22.5 15 L27 15 L27 12.5 L22.5 12.5 L22.5 8 Z" />
          <path d="M37 12 C31.5 12 28 16 28 21 C28 26 31.5 30 37 30 C40 30 42.5 28.8 44 27 L42 24.8 C40.8 26 39.2 26.8 37 26.8 C33.5 26.8 31.5 24.2 31.5 21 C31.5 17.8 33.5 15.2 37 15.2 C39.2 15.2 40.8 16 42 17.2 L44 15 C42.5 13.2 40 12 37 12 Z" />
          <text x="52" y="27" fontFamily="monospace" fontSize="16" fontWeight="bold" letterSpacing="2">PAY</text>
        </svg>
      </div>

      {/* 3. Tamara (Saudi FinTech Unicorn) */}
      <div className="flex items-center gap-2 group" title="Tamara - Licensed Saudi FinTech">
        <svg
          viewBox="0 0 115 32"
          className="h-6 sm:h-7 w-auto fill-current text-white/70 group-hover:text-accent transition-colors duration-200"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Tamara"
        >
          <path d="M8 8 C3.6 8 0 11.6 0 16 C0 20.4 3.6 24 8 24 C12.4 24 16 20.4 16 16 C16 11.6 12.4 8 8 8 Z M8 20 C5.8 20 4 18.2 4 16 C4 13.8 5.8 12 8 12 C10.2 12 12 13.8 12 16 C12 18.2 10.2 20 8 20 Z" />
          <text x="24" y="22" fontFamily="sans-serif" fontSize="17" fontWeight="800" letterSpacing="1">tamara</text>
        </svg>
      </div>

      {/* 4. Lean Technologies (SAMA Open Banking) */}
      <div className="flex items-center gap-2 group" title="Lean Technologies - Open Banking Infrastructure">
        <svg
          viewBox="0 0 100 32"
          className="h-6 sm:h-7 w-auto fill-current text-white/70 group-hover:text-accent transition-colors duration-200"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Lean Technologies"
        >
          <rect x="2" y="18" width="4" height="10" rx="1" />
          <rect x="9" y="12" width="4" height="16" rx="1" />
          <rect x="16" y="6" width="4" height="22" rx="1" />
          <text x="28" y="22" fontFamily="sans-serif" fontSize="16" fontWeight="900" letterSpacing="3">LEAN</text>
        </svg>
      </div>

      {/* 5. Geidea (Saudi Payments Network) */}
      <div className="flex items-center gap-2 group" title="Geidea - Payments & Merchant Infrastructure">
        <svg
          viewBox="0 0 110 32"
          className="h-6 sm:h-7 w-auto fill-current text-white/70 group-hover:text-accent transition-colors duration-200"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Geidea"
        >
          <path d="M12 4 L2 16 L12 28 L22 16 Z M12 9 L18 16 L12 23 L6 16 Z" />
          <text x="30" y="22" fontFamily="sans-serif" fontSize="16" fontWeight="700" letterSpacing="1">geidea</text>
        </svg>
      </div>

      {/* 6. ZATCA Fatoora (Saudi E-Invoicing Enterprise Standard) */}
      <div className="flex items-center gap-2 group" title="ZATCA Fatoora Phase-2 Integration Standard">
        <svg
          viewBox="0 0 125 32"
          className="h-6 sm:h-7 w-auto fill-current text-white/70 group-hover:text-accent transition-colors duration-200"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="ZATCA Fatoora Standard"
        >
          <rect x="2" y="7" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <rect x="7" y="12" width="8" height="8" rx="1" />
          <text x="26" y="16" fontFamily="monospace" fontSize="10" fontWeight="bold" letterSpacing="1">ZATCA</text>
          <text x="26" y="26" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="currentColor" opacity="0.7">FATOORA STACK</text>
        </svg>
      </div>
    </div>
  );
}
