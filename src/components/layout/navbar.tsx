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
import { SOLUTIONS_LINKS, SERVICES_LINKS } from '@/lib/constants';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { t, locale, toggleLocale, direction } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
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
    setSolutionsOpen(false);
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

  const solutionItems = [
    {
      name: locale === 'ar' ? 'التقنية المالية والمصرفية' : 'FinTech & Digital Banking',
      href: '/solutions/fintech-digital-banking',
      desc: locale === 'ar' ? 'جاهزية ساما، المصرفية المفتوحة ومعيار ISO 20022' : 'SAMA Open Banking, ISO 20022 & mada rails',
      icon: <CreditCard className="h-5 w-5 text-accent" />,
    },
    {
      name: locale === 'ar' ? 'المشاريع الكبرى والمنصات الذكية' : 'Giga-Projects & Platforms',
      href: '/solutions/giga-projects-smart-infrastructure',
      desc: locale === 'ar' ? 'إنترنت الأشياء، التوائم الرقمية والحوسبة الطرفية' : 'IoT telemetry, digital twins & cognitive edge',
      icon: <Building2 className="h-5 w-5 text-accent" />,
    },
    {
      name: locale === 'ar' ? 'الهجرة السحابية السيادية' : 'Enterprise Cloud Migration',
      href: '/solutions/enterprise-cloud-migration',
      desc: locale === 'ar' ? 'جوجل الدمام، أزور، أمازون وأوراكل الرياض' : 'GCP Dammam, Azure Riyadh, AWS KSA & Oracle',
      icon: <CloudLightning className="h-5 w-5 text-accent" />,
    },
    {
      name: locale === 'ar' ? 'الشركات الريادية وساس (SaaS)' : 'High-Growth SaaS',
      href: '/solutions/high-growth-saas',
      desc: locale === 'ar' ? 'بنى متعددة المستأجرين وإطلاق MVP في 8 أسابيع' : 'Multi-tenant scale & 8-week MVP launch',
      icon: <Flame className="h-5 w-5 text-accent" />,
    },
  ];

  const serviceItems = [
    {
      name: locale === 'ar' ? 'هندسة المنتجات المرتكزة على السحابة' : 'Cloud-First Product Engineering',
      href: '/services/cloud-first-product-engineering',
      desc: locale === 'ar' ? 'خدمات مصغرة، بث كافكا والأنظمة اللامركزية' : 'Microservices, Kafka event-streaming & serverless',
      icon: <Cpu className="h-5 w-5 text-accent" />,
    },
    {
      name: locale === 'ar' ? 'هندسة المنصات وديف أوبس' : 'Platform Engineering & DevOps',
      href: '/services/platform-engineering-devops',
      desc: locale === 'ar' ? 'كوبرنيتيس، منصات المطورين وتيرا فورم GitOps' : 'Internal Developer Platforms, Kubernetes & IaC',
      icon: <Cloud className="h-5 w-5 text-accent" />,
    },
    {
      name: locale === 'ar' ? 'ديف سيك أوبس والامتثال السيادي' : 'DevSecOps & KSA Compliance',
      href: '/services/devsecops-ksa-compliance',
      desc: locale === 'ar' ? 'ضوابط NCA ECC/CCC، حماية البيانات PDPL وفولت' : 'NCA ECC/CCC, NDMO data residency & HashiCorp Vault',
      icon: <ShieldCheck className="h-5 w-5 text-accent" />,
    },
    {
      name: locale === 'ar' ? 'فرق هندسية مخصصة (Pods)' : 'Dedicated Engineering Squads',
      href: '/services/dedicated-engineering-squads',
      desc: locale === 'ar' ? 'فرق عمل متزامنة بتوقيت الرياض GMT+3 وإشراف أمريكي' : 'Full-cycle pods with GMT+3 overlap & US governance',
      icon: <Users className="h-5 w-5 text-accent" />,
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
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname?.startsWith('/solutions')
                    ? 'text-accent'
                    : 'text-fg-muted hover:text-white hover:bg-white/5'
                }`}
                aria-expanded={solutionsOpen}
              >
                <span>{locale === 'ar' ? 'الحلول القطاعية' : 'Solutions'}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    solutionsOpen ? 'rotate-180 text-accent' : 'text-fg-subtle'
                  }`}
                />
              </button>

              <AnimatePresence>
                {solutionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full start-0 pt-2 w-96 z-50"
                  >
                    <div className="rounded-2xl border border-border bg-surface p-2 shadow-2xl backdrop-blur-2xl">
                      <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-accent border-b border-white/5 mb-1">
                        {locale === 'ar' ? 'التركيز على مستهدفات رؤية 2030' : 'Saudi Vision 2030 Focus'}
                      </div>
                      {solutionItems.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          onClick={() => setSolutionsOpen(false)}
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
                <span>{locale === 'ar' ? 'القدرات الهندسية' : 'Services'}</span>
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
                    className="absolute top-full start-0 pt-2 w-96 z-50"
                  >
                    <div className="rounded-2xl border border-border bg-surface p-2 shadow-2xl backdrop-blur-2xl">
                      <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-accent border-b border-white/5 mb-1">
                        {locale === 'ar' ? 'القدرات الهندسية المؤسسية' : 'Core Cloud & DevOps Capabilities'}
                      </div>
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

            {/* Saudi Hub / Vision 2030 */}
            <Link
              href="/saudi-hub"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === '/saudi-hub'
                  ? 'text-accent bg-accent-soft border border-accent/40'
                  : 'text-accent bg-accent-soft/70 border border-accent/25 hover:bg-accent/20'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span>{locale === 'ar' ? 'مركز المملكة 2030' : 'Saudi Hub'}</span>
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
