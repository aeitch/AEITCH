"use client";

import React, { useEffect, useRef, useState } from 'react';
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
  CreditCard,
  Building2,
  CloudLightning,
  Flame,
  ShieldCheck,
  Users,
  Compass,
  ChevronDown,
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

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close automatically on route changes
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
      name: locale === 'ar' ? 'أتمتة الذكاء الاصطناعي وتكامل الأنظمة' : 'AI Automation & Integration',
      desc: locale === 'ar' ? 'وكلاء ذكاء اصطناعي ذاتية، استضافة نماذج سيادية H100، ومحركات RAG' : 'Autonomous agents, private sovereign LLMs (vLLM/H100) & enterprise RAG',
      href: '/services/ai-automation',
      icon: <Cpu className="h-4 w-4 text-accent shrink-0" />,
      tag: 'SOVEREIGN AI',
    },
    {
      name: locale === 'ar' ? 'تطوير المنتجات الرقمية وهندسة الابتكار' : 'Product Development',
      desc: locale === 'ar' ? 'هندسة المنتجات الرقمية المتكاملة، إطلاق MVPs في 8 أسابيع ومنصات SaaS' : 'Full-cycle digital products, rapid 8-week MVPs & bilingual GCC SaaS',
      href: '/services/product-development',
      icon: <Rocket className="h-4 w-4 text-accent shrink-0" />,
      tag: 'RAPID MVPS',
    },
    {
      name: locale === 'ar' ? 'ديف أوبس وهندسة السحابة السيادية' : 'DevOps & Cloud Engineering',
      desc: locale === 'ar' ? 'بنى سحابية محلية متعددة، كوبرنيتيس، تيرا فورم وأتمتة النشر وترشيد FinOps' : 'In-kingdom multi-cloud (AWS, Azure, GCP, Oracle), K8s & FinOps',
      href: '/services/cloud-devops',
      icon: <Cloud className="h-4 w-4 text-accent shrink-0" />,
      tag: '99.99% RESILIENCE',
    },
    {
      name: locale === 'ar' ? 'تطوير البرمجيات المؤسسية المخصصة' : 'Custom Software Development',
      desc: locale === 'ar' ? 'أنظمة مؤسسية موزعة فائقة الأداء، واجهات برمجية سريعة وتكامل الفاتورة وساما' : 'High-throughput microservices, <80ms APIs, Kafka streams & ZATCA/SAMA',
      href: '/services/custom-software',
      icon: <Code2 className="h-4 w-4 text-accent shrink-0" />,
      tag: 'ENTERPRISE B2B',
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
            {/* 1. Services Section */}
            <div>
              <div className="flex items-center justify-between w-full text-[11px] font-mono uppercase tracking-[0.2em] text-accent mb-3">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  <span>{locale === 'ar' ? 'الخدمات التقنية الأربع' : '4 CORE SERVICES'}</span>
                </div>
                <span className="text-[10px] text-fg-subtle">{locale === 'ar' ? 'معايير وادي السيليكون' : 'US-KSA Pods'}</span>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-1">
                {serviceLinks.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-accent/40 hover:bg-white/[0.06] active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="rounded-lg bg-white/5 p-2 border border-white/10 shrink-0">
                        {service.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white truncate">
                            {service.name}
                          </span>
                        </div>
                        <div className="text-[11px] text-fg-subtle truncate">
                          {service.desc}
                        </div>
                      </div>
                    </div>
                    {direction === 'rtl' ? (
                      <ArrowLeft className="h-4 w-4 text-fg-subtle shrink-0 ms-2" />
                    ) : (
                      <ArrowRight className="h-4 w-4 text-fg-subtle shrink-0 ms-2" />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* 3. Main Navigation Links */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-fg-subtle mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{locale === 'ar' ? 'المسارات الاستراتيجية' : 'STRATEGIC PATHWAYS'}</span>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Link
                  href="/delivery-engine"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-fg-muted hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span>{locale === 'ar' ? 'محرك الإنجاز (أمريكا - الرياض - باكستان)' : 'Delivery Engine (US + KSA + Pak)'}</span>
                  {direction === 'rtl' ? (
                    <ArrowLeft className="h-3.5 w-3.5 opacity-40" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                  )}
                </Link>

                <Link
                  href="/case-studies"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-fg-muted hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span>{locale === 'ar' ? 'دراسات النجاح والأرقام الموثقة' : 'Case Studies & Quantified Results'}</span>
                  {direction === 'rtl' ? (
                    <ArrowLeft className="h-3.5 w-3.5 opacity-40" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                  )}
                </Link>

                <Link
                  href="/saudi-hub"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-accent bg-accent-soft border border-accent/25 hover:bg-accent/20 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span>{locale === 'ar' ? 'مركز المملكة ورؤية 2030' : 'Saudi Hub & Vision 2030'}</span>
                  </div>
                  {direction === 'rtl' ? (
                    <ArrowLeft className="h-3.5 w-3.5 text-accent" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5 text-accent" />
                  )}
                </Link>

                <Link
                  href="/about-us"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-fg-muted hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span>{locale === 'ar' ? 'من نحن وفريق القيادة' : 'About AEITCH & Leadership'}</span>
                  {direction === 'rtl' ? (
                    <ArrowLeft className="h-3.5 w-3.5 opacity-40" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* 4. Bottom Actions & Sovereign Telemetry */}
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
              <span>{locale === 'ar' ? 'طلب تدقيق معماري فوري' : 'Book Architecture Audit'}</span>
              {direction === 'rtl' ? (
                <ArrowLeft className="h-4 w-4" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLocale}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <Globe className="h-4 w-4 text-accent" />
              <span>{locale === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}</span>
            </button>

            {/* Micro Sovereign Footer */}
            <div className="flex items-center justify-between text-[11px] text-fg-subtle pt-2 px-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                <span>{locale === 'ar' ? 'الرياض (طريق الملك فهد)' : 'Riyadh (King Fahd Rd)'}</span>
              </span>
              <span className="flex items-center gap-1.5 font-mono text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>GMT+3 ONLINE</span>
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
