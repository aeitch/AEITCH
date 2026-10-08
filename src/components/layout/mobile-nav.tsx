"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Cloud,
  Code2,
  Rocket,
  Globe,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Mail,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { BRAND } from '@/lib/constants';

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation?: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  onOpenConsultation,
}) => {
  const pathname = usePathname();
  const { t, locale, toggleLocale, direction } = useTranslation();
  const prevPathnameRef = useRef(pathname);

  // Lock body scroll when mobile drawer is open to prevent underlying content bleed-through and scroll collisions
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close automatically on route changes (avoiding premature close on initial mount)
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      if (isOpen) {
        onClose();
      }
    }
  }, [pathname, isOpen, onClose]);

  // Close on Escape keyboard event
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const serviceLinks = [
    {
      name: locale === 'ar' ? 'الذكاء الاصطناعي والوكلاء' : 'Applied AI & Agents',
      desc: locale === 'ar' ? 'وكلاء مؤتمتون ونماذج لغوية سيادية' : 'Autonomous agents & sovereign LLMs',
      href: '/services/ai-consulting',
      icon: <Cpu className="h-4 w-4 text-accent shrink-0" />,
    },
    {
      name: locale === 'ar' ? 'السحابة السيادية وديف أوبس' : 'Sovereign Cloud & DevOps',
      desc: locale === 'ar' ? 'بنى تحتية آمنة بنسبة توافر 99.99%' : 'Resilient cloud with 99.99% availability',
      href: '/services/cloud-devops',
      icon: <Cloud className="h-4 w-4 text-accent shrink-0" />,
    },
    {
      name: locale === 'ar' ? 'البرمجيات المؤسسية المخصصة' : 'Custom Enterprise Software',
      desc: locale === 'ar' ? 'أنظمة فائقة الأداء بزمن استجابة < 80ms' : 'High-throughput systems < 80ms latency',
      href: '/services/custom-software',
      icon: <Code2 className="h-4 w-4 text-accent shrink-0" />,
    },
    {
      name: locale === 'ar' ? 'تطوير النماذج الأولية (MVPs)' : 'Product Engineering & MVPs',
      desc: locale === 'ar' ? 'إطلاق منتجك التجاري في 8 أسابيع' : 'Production-ready launch in 8 weeks',
      href: '/services/new-product-development',
      icon: <Rocket className="h-4 w-4 text-accent shrink-0" />,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-nav-overlay"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 top-16 sm:top-20 bottom-0 bg-black/98 backdrop-blur-2xl z-50 overflow-y-auto p-6 lg:hidden flex flex-col justify-between"
          role="dialog"
          aria-modal="true"
          aria-label={locale === 'ar' ? 'قائمة التنقل للأجهزة المحمولة' : 'Mobile Navigation Menu'}
          dir={direction}
        >
          <div className="flex flex-col space-y-6">
            {/* 1. Core Engineering Services Section */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-fg-subtle mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{t.nav.services}</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {serviceLinks.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-accent/40 hover:bg-white/[0.06] active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-white/5 p-2 border border-white/10">
                        {service.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {service.name}
                        </div>
                        <div className="text-[11px] text-fg-subtle">
                          {service.desc}
                        </div>
                      </div>
                    </div>
                    {direction === 'rtl' ? (
                      <ArrowLeft className="h-4 w-4 text-fg-subtle" />
                    ) : (
                      <ArrowRight className="h-4 w-4 text-fg-subtle" />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* 2. Main Navigation Links */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-fg-subtle mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{locale === 'ar' ? 'الروابط الرئيسية' : 'MAIN NAVIGATION'}</span>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Link
                  href="/#industries"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-fg-muted hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span>{t.nav.industries}</span>
                  {direction === 'rtl' ? (
                    <ArrowLeft className="h-3.5 w-3.5 opacity-40" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                  )}
                </Link>

                <Link
                  href="/#vision-2030"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-accent bg-accent-soft border border-accent/25 hover:bg-accent/20 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span>{t.nav.kingdom2030}</span>
                  </div>
                  {direction === 'rtl' ? (
                    <ArrowLeft className="h-3.5 w-3.5 text-accent" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5 text-accent" />
                  )}
                </Link>

                <Link
                  href="/case-studies"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-fg-muted hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span>{t.nav.caseStudies}</span>
                  {direction === 'rtl' ? (
                    <ArrowLeft className="h-3.5 w-3.5 opacity-40" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                  )}
                </Link>

                <Link
                  href="/insights"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-fg-muted hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span>{t.nav.insights}</span>
                  {direction === 'rtl' ? (
                    <ArrowLeft className="h-3.5 w-3.5 opacity-40" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                  )}
                </Link>

                <Link
                  href="/about-us"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-fg-muted hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span>{t.nav.about}</span>
                  {direction === 'rtl' ? (
                    <ArrowLeft className="h-3.5 w-3.5 opacity-40" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* 3. Bottom Actions & Sovereign Telemetry */}
          <div className="space-y-4 pt-6 mt-6 border-t border-white/10">
            {/* Primary Action Button */}
            <button
              onClick={() => {
                onClose();
                if (onOpenConsultation) {
                  onOpenConsultation();
                }
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-bold text-black hover:bg-accent-hover transition-all duration-200 shadow-glow-sm hover:shadow-glow-md active:scale-95"
            >
              <span>{t.nav.bookConsultation}</span>
              {direction === 'rtl' ? (
                <ArrowLeft className="h-4 w-4" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </button>

            {/* Language Switcher & Operational Heartbeat */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={toggleLocale}
                aria-label="Toggle language between Arabic and English"
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white/80 hover:text-white hover:border-accent/40 transition-colors"
              >
                <Globe className="h-3.5 w-3.5 text-accent" />
                <span>{t.nav.langToggle}</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs text-white/60 font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>{locale === 'ar' ? 'الأنظمة نشطة' : 'SYSTEM OPERATIONAL'}</span>
              </div>
            </div>

            {/* Sovereign Contact Footer Card */}
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs text-white/60 font-mono space-y-1.5">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-accent" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-white transition-colors">
                  {BRAND.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                <span>{locale === 'ar' ? 'الرياض • المملكة العربية السعودية' : 'Riyadh, Kingdom of Saudi Arabia'}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
