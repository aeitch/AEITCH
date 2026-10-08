"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import {
  Cpu,
  Cloud,
  Code2,
  Rocket,
  ChevronDown,
  Menu,
  X,
  Globe,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { ConsultationModal } from '@/components/forms/ConsultationModal';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { t, locale, toggleLocale, direction } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);

  // Top reading scroll progress bar
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceItems = [
    {
      name: locale === 'ar' ? 'الذكاء الاصطناعي والوكلاء' : 'Applied AI & Agents',
      href: '/services/ai-consulting',
      desc: locale === 'ar' ? 'وكلاء مؤتمتون ونماذج لغوية سيادية' : 'Autonomous agents & sovereign LLM workflows',
      icon: <Cpu className="h-5 w-5 text-accent" />,
    },
    {
      name: locale === 'ar' ? 'السحابة السيادية وديف أوبس' : 'Sovereign Cloud & DevOps',
      href: '/services/cloud-devops',
      desc: locale === 'ar' ? 'بنى تحتية آمنة بنسبة توافر 99.99%' : 'Resilient cloud with 99.99% availability',
      icon: <Cloud className="h-5 w-5 text-accent" />,
    },
    {
      name: locale === 'ar' ? 'البرمجيات المؤسسية المخصصة' : 'Custom Enterprise Software',
      href: '/services/custom-software',
      desc: locale === 'ar' ? 'أنظمة فائقة الأداء بزمن استجابة < 80ms' : 'High-throughput systems under 80ms latency',
      icon: <Code2 className="h-5 w-5 text-accent" />,
    },
    {
      name: locale === 'ar' ? 'تطوير النماذج الأولية (MVPs)' : 'Product Engineering & MVPs',
      href: '/services/new-product-development',
      desc: locale === 'ar' ? 'إطلاق منتجك التجاري في 8 أسابيع' : 'Production-ready MVP launch in 8 weeks',
      icon: <Rocket className="h-5 w-5 text-accent" />,
    },
  ];

  return (
    <>
      {/* Top Accent Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 start-0 end-0 h-[2px] bg-accent z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-bg/90 backdrop-blur-xl border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.8)] h-16 sm:h-18'
            : 'bg-transparent border-b border-transparent h-20'
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* 1. Geometric AEITCH Logo (Black tile, White H, Accent dot) */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-surface border border-border transition-all duration-300 group-hover:border-accent group-hover:shadow-glow-sm">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover:scale-105"
              >
                <path
                  d="M5 4V20M19 4V20M5 12H19"
                  stroke="#ffffff"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-sans text-xl font-extrabold tracking-tight text-white">
                  AEITCH<span className="text-accent animate-pulse">.</span>
                </span>
                <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] font-semibold text-accent border border-border">
                  {locale === 'ar' ? 'إيتش' : 'KSA'}
                </span>
              </div>
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-fg-subtle">
                {locale === 'ar' ? 'أنظمة التحول الرقمي' : 'DIGITAL SYSTEMS'}
              </span>
            </div>
          </Link>

          {/* 2. Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname?.startsWith('/services')
                    ? 'text-accent'
                    : 'text-fg-muted hover:text-white hover:bg-white/5'
                }`}
                aria-expanded={servicesOpen}
              >
                <span>{t.nav.services}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    servicesOpen ? 'rotate-180 text-accent' : 'text-fg-subtle'
                  }`}
                />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full start-0 pt-2 w-84 z-50"
                  >
                    <div className="rounded-2xl border border-border bg-surface p-2 shadow-2xl backdrop-blur-2xl">
                      {serviceItems.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          onClick={() => setServicesOpen(false)}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface-2"
                        >
                          <div className="rounded-lg bg-surface-2 p-2 border border-border group-hover:border-accent/40 transition-colors">
                            {s.icon}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                              {s.name}
                            </div>
                            <div className="text-xs text-fg-subtle leading-snug mt-0.5">
                              {s.desc}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/#industries"
              className="rounded-lg px-3 py-2 text-sm font-medium text-fg-muted hover:text-white hover:bg-white/5 transition-colors"
            >
              {t.nav.industries}
            </Link>

            <Link
              href="/#vision-2030"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-accent bg-accent-soft border border-accent/25 hover:bg-accent/20 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span>{t.nav.kingdom2030}</span>
            </Link>

            <Link
              href="/case-studies"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === '/case-studies'
                  ? 'text-accent'
                  : 'text-fg-muted hover:text-white hover:bg-white/5'
              }`}
            >
              {t.nav.caseStudies}
            </Link>

            <Link
              href="/insights"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === '/insights'
                  ? 'text-accent'
                  : 'text-fg-muted hover:text-white hover:bg-white/5'
              }`}
            >
              {t.nav.insights}
            </Link>

            <Link
              href="/about-us"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === '/about-us'
                  ? 'text-accent'
                  : 'text-fg-muted hover:text-white hover:bg-white/5'
              }`}
            >
              {t.nav.about}
            </Link>
          </nav>

          {/* 3. Actions: Language Switcher & Consultation CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Language Switcher Toggle */}
            <button
              onClick={toggleLocale}
              aria-label="Toggle language between Arabic and English"
              className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-fg-muted hover:text-white hover:border-accent/40 transition-all"
            >
              <Globe className="h-3.5 w-3.5 text-accent" />
              <span>{t.nav.langToggle}</span>
            </button>

            {/* Primary Consultation Action Button (Magnetic styling) */}
            <button
              onClick={() => setConsultationModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs sm:text-sm font-bold text-black hover:bg-accent-hover transition-all duration-200 shadow-glow-sm hover:shadow-glow-md active:scale-95"
            >
              <span>{t.nav.bookConsultation}</span>
              {direction === 'rtl' ? (
                <ArrowLeft className="h-4 w-4" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Navigation"
              className="flex lg:hidden rounded-xl border border-border bg-surface p-2 text-fg-muted hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* 4. Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden border-b border-border bg-surface/98 backdrop-blur-2xl px-4 pt-3 pb-6 overflow-hidden"
            >
              <div className="flex flex-col space-y-2">
                <Link
                  href="/services/ai-consulting"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl p-3 text-sm font-medium text-white hover:bg-surface-2"
                >
                  <span>{locale === 'ar' ? 'الذكاء الاصطناعي والوكلاء' : 'AI & Autonomous Agents'}</span>
                  <Cpu className="h-4 w-4 text-accent" />
                </Link>
                <Link
                  href="/services/cloud-devops"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl p-3 text-sm font-medium text-white hover:bg-surface-2"
                >
                  <span>{locale === 'ar' ? 'السحابة السيادية وديف أوبس' : 'Sovereign Cloud & DevOps'}</span>
                  <Cloud className="h-4 w-4 text-accent" />
                </Link>
                <Link
                  href="/services/custom-software"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl p-3 text-sm font-medium text-white hover:bg-surface-2"
                >
                  <span>{locale === 'ar' ? 'البرمجيات المؤسسية المخصصة' : 'Custom Enterprise Software'}</span>
                  <Code2 className="h-4 w-4 text-accent" />
                </Link>
                <Link
                  href="/services/new-product-development"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl p-3 text-sm font-medium text-white hover:bg-surface-2"
                >
                  <span>{locale === 'ar' ? 'تطوير النماذج الأولية MVPs' : 'Rapid MVP Development'}</span>
                  <Rocket className="h-4 w-4 text-accent" />
                </Link>
                <Link
                  href="/#industries"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl p-3 text-sm font-medium text-fg-muted hover:text-white hover:bg-surface-2"
                >
                  {t.nav.industries}
                </Link>
                <Link
                  href="/#vision-2030"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-xl p-3 text-sm font-medium text-accent bg-accent-soft border border-accent/25"
                >
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span>{t.nav.kingdom2030}</span>
                </Link>
                <Link
                  href="/case-studies"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl p-3 text-sm font-medium text-fg-muted hover:text-white hover:bg-surface-2"
                >
                  {t.nav.caseStudies}
                </Link>
                <Link
                  href="/insights"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl p-3 text-sm font-medium text-fg-muted hover:text-white hover:bg-surface-2"
                >
                  {t.nav.insights}
                </Link>
                <Link
                  href="/about-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl p-3 text-sm font-medium text-fg-muted hover:text-white hover:bg-surface-2"
                >
                  {t.nav.about}
                </Link>

                <div className="pt-3 border-t border-border flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setConsultationModalOpen(true);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-bold text-black hover:bg-accent-hover transition-colors"
                  >
                    <span>{t.nav.bookConsultation}</span>
                    {direction === 'rtl' ? (
                      <ArrowLeft className="h-4 w-4" />
                    ) : (
                      <ArrowRight className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Consultation Modal */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
      />
    </>
  );
};
