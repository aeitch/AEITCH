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
      name: locale === 'ar' ? 'الذكاء الاصطناعي والأتمتة' : 'AI Automation & Integration',
      desc: locale === 'ar' ? 'أتمتة العمليات، وكلاء ذكاء اصطناعي مؤسسيون وأنظمة RAG' : 'AI-driven process automation, enterprise agents & RAG',
      href: '/services/ai-automation',
      icon: <Cpu className="h-4 w-4 text-accent shrink-0" />,
      tag: '01',
    },
    {
      name: locale === 'ar' ? 'تطوير المنتجات' : 'Product Development',
      desc: locale === 'ar' ? 'هندسة منتجات متكاملة من الفكرة والـ MVP إلى منصة قابلة للتوسع' : 'End-to-end product engineering, MVPs & scalable SaaS',
      href: '/services/product-development',
      icon: <Rocket className="h-4 w-4 text-accent shrink-0" />,
      tag: '02',
    },
    {
      name: locale === 'ar' ? 'DevOps وهندسة السحابة' : 'DevOps & Cloud Engineering',
      desc: locale === 'ar' ? 'خطوط نشر آلية، بنية سحابية موثوقة وتحسين التكلفة' : 'Automated pipelines, reliable infrastructure & FinOps',
      href: '/services/cloud-devops',
      icon: <Cloud className="h-4 w-4 text-accent shrink-0" />,
      tag: '03',
    },
    {
      name: locale === 'ar' ? 'تطوير البرمجيات المخصصة' : 'Custom Software Development',
      desc: locale === 'ar' ? 'تطبيقات مؤسسية مخصصة، واجهات API وتحديث الأنظمة القديمة' : 'Tailored enterprise applications, APIs & legacy modernization',
      href: '/services/custom-software',
      icon: <Code2 className="h-4 w-4 text-accent shrink-0" />,
      tag: '04',
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
                  <span>{locale === 'ar' ? 'الخدمات' : 'SERVICES'}</span>
                </div>
                <span className="text-[10px] text-fg-subtle">{locale === 'ar' ? 'أربع خدمات' : '4 Services'}</span>
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

            {/* 2. Main Navigation Links */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-fg-subtle mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{locale === 'ar' ? 'التنقل' : 'NAVIGATION'}</span>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Link
                  href="/vision-2030"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-accent bg-accent-soft border border-accent/25 hover:bg-accent/20 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span>{locale === 'ar' ? 'رؤية 2030' : 'Vision 2030'}</span>
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
                  <span>{locale === 'ar' ? 'أعمالنا' : 'Our Work'}</span>
                  {direction === 'rtl' ? (
                    <ArrowLeft className="h-3.5 w-3.5 opacity-40" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                  )}
                </Link>

                <Link
                  href="/our-products"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-fg-muted hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span>{locale === 'ar' ? 'منتجاتنا' : 'Our Products'}</span>
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
                  <span>{locale === 'ar' ? 'من نحن' : 'About'}</span>
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
                  <span>{locale === 'ar' ? 'المدونة' : 'Blog'}</span>
                  {direction === 'rtl' ? (
                    <ArrowLeft className="h-3.5 w-3.5 opacity-40" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                  )}
                </Link>

                <Link
                  href="/contact-us"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-fg-muted hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span>{locale === 'ar' ? 'تواصل معنا' : 'Contact'}</span>
                  {direction === 'rtl' ? (
                    <ArrowLeft className="h-3.5 w-3.5 opacity-40" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* 3. Bottom Actions & Contact */}
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
              <span>{locale === 'ar' ? 'احجز استشارة' : 'Book a Consultation'}</span>
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

            {/* Verified Contact Details */}
            <div className="flex items-center justify-between text-[11px] text-fg-subtle pt-2 px-1">
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-accent" />
                <a href="mailto:hello@aeitch.com" className="hover:text-accent">
                  hello@aeitch.com
                </a>
              </span>
              <span className="font-mono text-fg-muted">+92 318 4055723</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
