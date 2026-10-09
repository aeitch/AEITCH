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
  CreditCard,
  Building2,
  CloudLightning,
  Flame,
  ShieldCheck,
  Users,
  Compass,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { ConsultationModal } from '@/components/forms/ConsultationModal';
import { MobileNav } from '@/components/layout/mobile-nav';
import { SERVICES_LINKS } from '@/lib/constants';

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

  // Close mobile drawer on route change or when desktop viewport is reached
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const serviceItems = [
    {
      name: locale === 'ar' ? 'أتمتة الذكاء الاصطناعي وتكامل الأنظمة' : 'AI Automation & Integration',
      href: '/services/ai-automation',
      desc: locale === 'ar' ? 'وكلاء ذكاء اصطناعي ذاتية، استضافة نماذج سيادية H100، ومحركات RAG دلالية' : 'Autonomous agent swarms, private sovereign LLMs (vLLM/H100), RAG & ERP integration',
      icon: <Cpu className="h-5 w-5 text-accent" />,
      tag: 'SOVEREIGN AI',
    },
    {
      name: locale === 'ar' ? 'تطوير المنتجات الرقمية وهندسة الابتكار' : 'Product Development',
      href: '/services/product-development',
      desc: locale === 'ar' ? 'هندسة المنتجات الرقمية المتكاملة، إطلاق MVPs في 8 أسابيع ومنصات SaaS' : 'Full-cycle digital products, rapid 8-week MVPs & scalable bilingual GCC platforms',
      icon: <Rocket className="h-5 w-5 text-accent" />,
      tag: 'RAPID MVPS',
    },
    {
      name: locale === 'ar' ? 'ديف أوبس وهندسة السحابة السيادية' : 'DevOps & Cloud Engineering',
      href: '/services/cloud-devops',
      desc: locale === 'ar' ? 'بنى سحابية محلية متعددة، كوبرنيتيس، تيرا فورم وأتمتة النشر وترشيد FinOps' : 'In-kingdom multi-cloud (AWS KSA, GCP Dammam, Azure, Oracle), K8s & FinOps',
      icon: <Cloud className="h-5 w-5 text-accent" />,
      tag: '99.99% RESILIENCE',
    },
    {
      name: locale === 'ar' ? 'تطوير البرمجيات المؤسسية المخصصة' : 'Custom Software Development',
      href: '/services/custom-software',
      desc: locale === 'ar' ? 'أنظمة مؤسسية موزعة فائقة الأداء، واجهات برمجية سريعة وتكامل الفاتورة وساما' : 'High-throughput distributed systems, <80ms APIs, Kafka streams & ZATCA/SAMA',
      icon: <Code2 className="h-5 w-5 text-accent" />,
      tag: 'ENTERPRISE B2B',
    },
  ];

  return (
    <>
      {/* Top Accent Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 start-0 end-0 h-[2px] bg-accent z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 bg-black/95 backdrop-blur-xl border-b border-white/15 shadow-2xl ${
          mobileMenuOpen ? 'h-16 sm:h-20' : isScrolled ? 'h-16' : 'h-16 sm:h-20'
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* 1. Geometric AEITCH Logo */}
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
                {locale === 'ar' ? 'أنظمة السحابة والتحول' : 'ENTERPRISE CLOUD'}
              </span>
            </div>
          </Link>

          {/* 2. Desktop Navigation Links */}
          {/* 2. Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* 4 Core Services Dropdown */}
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
                <span>{locale === 'ar' ? 'الخدمات التقنية الأربع' : 'Services'}</span>
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
                    className="absolute top-full start-0 pt-2 w-[420px] z-50"
                  >
                    <div className="rounded-2xl border border-border bg-surface p-2.5 shadow-2xl backdrop-blur-2xl">
                      <div className="flex items-center justify-between px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-accent border-b border-white/5 mb-1.5">
                        <span>{locale === 'ar' ? 'الخدمات الهندسية الأساسية' : '4 Core Engineering Disciplines'}</span>
                        <span className="text-[9px] text-fg-subtle">{locale === 'ar' ? 'معايير وادي السيليكون' : 'US-KSA Pods'}</span>
                      </div>
                      <div className="space-y-1">
                        {serviceItems.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            onClick={() => setServicesOpen(false)}
                            className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-surface-2"
                          >
                            <div className="rounded-lg bg-surface-2 p-2 border border-border group-hover:border-accent/40 transition-colors shrink-0 mt-0.5">
                              {s.icon}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <div className="text-sm font-semibold text-white group-hover:text-accent transition-colors truncate">
                                  {s.name}
                                </div>
                                {s.tag && (
                                  <span className="font-mono text-[9px] uppercase tracking-wider text-accent bg-accent-soft px-1.5 py-0.5 rounded border border-accent/30 shrink-0">
                                    {s.tag}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-fg-subtle leading-snug mt-1 line-clamp-2">
                                {s.desc}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Vision 2030 Sovereign Flagship */}
            <Link
              href="/#vision-2030"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === '/saudi-hub'
                  ? 'text-accent bg-accent-soft border border-accent/40'
                  : 'text-accent bg-accent-soft/70 border border-accent/25 hover:bg-accent/20'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span>{locale === 'ar' ? 'رؤية 2030' : 'Vision 2030'}</span>
            </Link>

            {/* Delivery Model (The Aeitch Delivery Engine) */}
            <Link
              href="/delivery-engine"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === '/delivery-engine'
                  ? 'text-accent'
                  : 'text-fg-muted hover:text-white hover:bg-white/5'
              }`}
            >
              {locale === 'ar' ? 'محرك الإنجاز' : 'Delivery Model'}
            </Link>

            {/* Case Studies */}
            <Link
              href="/case-studies"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === '/case-studies'
                  ? 'text-accent'
                  : 'text-fg-muted hover:text-white hover:bg-white/5'
              }`}
            >
              {locale === 'ar' ? 'دراسات النجاح' : 'Case Studies'}
            </Link>

            {/* About Us */}
            <Link
              href="/about-us"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === '/about-us'
                  ? 'text-accent'
                  : 'text-fg-muted hover:text-white hover:bg-white/5'
              }`}
            >
              {locale === 'ar' ? 'من نحن' : 'About'}
            </Link>
          </nav>

          {/* 3. Actions: Language Switcher & Architecture Audit CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Language Switcher Toggle */}
            <button
              onClick={toggleLocale}
              aria-label="Toggle language between Arabic and English"
              className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-fg-muted hover:text-white hover:border-accent/40 transition-all"
            >
              <Globe className="h-3.5 w-3.5 text-accent" />
              <span>{locale === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Primary CTA Button: Book Architecture Audit */}
            <button
              onClick={() => setConsultationModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs sm:text-sm font-bold text-black hover:bg-accent-hover transition-all duration-200 shadow-glow-sm hover:shadow-glow-md active:scale-95"
            >
              <span>{locale === 'ar' ? 'حجز تدقيق معماري' : 'Book Architecture Audit'}</span>
              {direction === 'rtl' ? (
                <ArrowLeft className="h-4 w-4" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              className="flex lg:hidden rounded-xl border border-border bg-surface p-2 text-fg-muted hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Decoupled Isolated Mobile Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenConsultation={() => {
          setMobileMenuOpen(false);
          setConsultationModalOpen(true);
        }}
      />

      {/* Global Consultation Modal */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
      />
    </>
  );
};
