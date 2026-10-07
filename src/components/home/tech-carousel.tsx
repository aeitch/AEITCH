"use client";

import React, { useEffect, useRef } from 'react';
import { Layers, ShieldCheck, Server, Lock } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { scrambleText } from '@/lib/anime-motion';

interface TechItem {
  name: string;
  category: string;
}

const TECH_ITEMS: TechItem[] = [
  { name: 'Next.js 15', category: 'High-Performance App Router' },
  { name: 'Three.js / WebGL', category: 'Interactive 3D Engine' },
  { name: 'TypeScript', category: 'Type-Safe Architecture' },
  { name: 'Python AI', category: 'LLMs, PyTorch & Agents' },
  { name: 'Kubernetes', category: 'High-Availability Clusters' },
  { name: 'AWS ME-Central', category: 'Sovereign Cloud Deployment' },
  { name: 'Terraform', category: 'Infrastructure as Code' },
  { name: 'PostgreSQL', category: 'Distributed Relational DB' },
  { name: 'LangChain & RAG', category: 'Enterprise Search Pipelines' },
  { name: 'Docker', category: 'Isolated Microservices' },
  { name: 'Redis', category: 'In-Memory Micro-Cache' },
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-sm transition-colors hover:border-accent/40">
            <ShieldCheck className="h-5 w-5 text-accent shrink-0" />
            <div className="text-xs text-fg">
              <span className="font-semibold text-white block">
                {locale === 'ar' ? 'معايير أمن سيبراني متوافقة' : 'Cybersecurity Architecture'}
              </span>
              <span className="text-fg-subtle text-[11px]">{t.trust.securityReady}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-sm transition-colors hover:border-accent/40">
            <Server className="h-5 w-5 text-accent shrink-0" />
            <div className="text-xs text-fg">
              <span className="font-semibold text-white block">
                {locale === 'ar' ? 'استضافة سحابية سيادية' : 'Sovereign Data Residency'}
              </span>
              <span className="text-fg-subtle text-[11px]">{t.trust.inKingdomCloud}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-sm transition-colors hover:border-accent/40">
            <Lock className="h-5 w-5 text-accent shrink-0" />
            <div className="text-xs text-fg">
              <span className="font-semibold text-white block">
                {locale === 'ar' ? 'أنظمة حوكمة وجودة البرمجيات' : 'Enterprise Quality Standards'}
              </span>
              <span className="text-fg-subtle text-[11px]">{t.trust.certPlaceholder}</span>
            </div>
          </div>
        </div>

        {/* Client Logos Placeholder [REPLACE] */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <div className="text-[11px] font-mono uppercase tracking-wider text-fg-subtle mb-3">
            {locale === 'ar'
              ? 'شركاء النجاح المؤسسي والشركات الواعدة [REPLACE: شعارات العملاء المعتمدين]'
              : 'Enterprise Partners & Growth Ventures [REPLACE: Verified Client Logos]'}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 opacity-75">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-center rounded-lg border border-dashed border-border bg-surface px-5 py-2.5 text-xs font-mono text-fg-muted"
              >
                [REPLACE: Logo {i}]
              </div>
            ))}
          </div>
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
