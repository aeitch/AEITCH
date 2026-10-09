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
  const [solutionsExpanded, setSolutionsExpanded] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);

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

  const solutionLinks = [
    {
      name: locale === 'ar' ? 'التقنية المالية والمصرفية' : 'FinTech & Digital Banking',
      desc: locale === 'ar' ? 'جاهزية ساما، المصرفية المفتوحة و ISO 20022' : 'SAMA Open Banking, ISO 20022 & mada',
      href: '/solutions/fintech-digital-banking',
      icon: <CreditCard className="h-4 w-4 text-accent shrink-0" />,
    },
    {
      name: locale === 'ar' ? 'المشاريع الكبرى والمنصات الذكية' : 'Giga-Projects & Platforms',
      desc: locale === 'ar' ? 'إنترنت الأشياء، التوائم الرقمية والحوسبة الطرفية' : 'IoT telemetry, digital twins & cognitive edge',
      href: '/solutions/giga-projects-smart-infrastructure',
      icon: <Building2 className="h-4 w-4 text-accent shrink-0" />,
    },
    {
      name: locale === 'ar' ? 'الهجرة السحابية السيادية' : 'Enterprise Cloud Migration',
      desc: locale === 'ar' ? 'جوجل الدمام، أزور، أمازون وأوراكل الرياض' : 'GCP Dammam, Azure Riyadh, AWS & Oracle',
      href: '/solutions/enterprise-cloud-migration',
      icon: <CloudLightning className="h-4 w-4 text-accent shrink-0" />,
    },
    {
      name: locale === 'ar' ? 'الشركات الريادية وساس (SaaS)' : 'High-Growth SaaS',
      desc: locale === 'ar' ? 'بنى متعددة المستأجرين وإطلاق MVP في 8 أسابيع' : 'Multi-tenant scale & 8-week MVP launch',
      href: '/solutions/high-growth-saas',
      icon: <Flame className="h-4 w-4 text-accent shrink-0" />,
    },
  ];

  const serviceLinks = [
    {
      name: locale === 'ar' ? 'هندسة المنتجات المرتكزة على السحابة' : 'Cloud-First Product Engineering',
      desc: locale === 'ar' ? 'خدمات مصغرة، بث كافكا والأنظمة اللامركزية' : 'Microservices, Kafka event-streaming & serverless',
      href: '/services/cloud-first-product-engineering',
      icon: <Cpu className="h-4 w-4 text-accent shrink-0" />,
    },
    {
      name: locale === 'ar' ? 'هندسة المنصات وديف أوبس' : 'Platform Engineering & DevOps',
      desc: locale === 'ar' ? 'كوبرنيتيس، منصات المطورين وتيرا فورم GitOps' : 'Internal Developer Platforms, Kubernetes & IaC',
      href: '/services/platform-engineering-devops',
      icon: <Cloud className="h-4 w-4 text-accent shrink-0" />,
    },
    {
      name: locale === 'ar' ? 'ديف سيك أوبس والامتثال السيادي' : 'DevSecOps & KSA Compliance',
      desc: locale === 'ar' ? 'ضوابط NCA ECC/CCC، حماية البيانات PDPL وفولت' : 'NCA ECC/CCC, NDMO data residency & Vault',
      href: '/services/devsecops-ksa-compliance',
      icon: <ShieldCheck className="h-4 w-4 text-accent shrink-0" />,
    },
    {
      name: locale === 'ar' ? 'فرق هندسية مخصصة (Pods)' : 'Dedicated Engineering Squads',
      desc: locale === 'ar' ? 'فرق عمل متزامنة بتوقيت الرياض GMT+3 وإشراف أمريكي' : 'Full-cycle pods with GMT+3 overlap & US governance',
      href: '/services/dedicated-engineering-squads',
      icon: <Users className="h-4 w-4 text-accent shrink-0" />,
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
            {/* 1. Solutions Accordion */}
            <div>
              <button
                onClick={() => setSolutionsExpanded(!solutionsExpanded)}
                className="flex items-center justify-between w-full text-[11px] font-mono uppercase tracking-[0.2em] text-fg-subtle mb-2"
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{locale === 'ar' ? 'الحلول القطاعية (رؤية 2030)' : 'SOLUTIONS (VISION 2030)'}</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${solutionsExpanded ? 'rotate-180 text-accent' : ''}`} />
              </button>

              <div className="grid grid-cols-1 gap-2 pt-1">
                {solutionLinks.map((sol) => (
                  <Link
                    key={sol.href}
                    href={sol.href}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-accent/40 hover:bg-white/[0.06] active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-white/5 p-2 border border-white/10">
                        {sol.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {sol.name}
                        </div>
                        <div className="text-[11px] text-fg-subtle">
                          {sol.desc}
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

            {/* 2. Services Accordion */}
            <div>
              <button
                onClick={() => setServicesExpanded(!servicesExpanded)}
                className="flex items-center justify-between w-full text-[11px] font-mono uppercase tracking-[0.2em] text-fg-subtle mb-2"
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{locale === 'ar' ? 'القدرات الهندسية المؤسسية' : 'ENGINEERING SERVICES'}</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${servicesExpanded ? 'rotate-180 text-accent' : ''}`} />
              </button>

              <div className="grid grid-cols-1 gap-2 pt-1">
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
