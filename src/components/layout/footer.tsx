"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, Clock } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export const Footer: React.FC = () => {
  const { t, locale, toggleLocale, direction } = useTranslation();

  return (
    <footer className="relative border-t border-border bg-bg pt-16 pb-12 text-fg-muted" dir={direction}>
      {/* Subtle background ambient mesh */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-20" />
      <div className="pointer-events-none absolute bottom-0 start-1/2 -translate-x-1/2 h-72 w-full max-w-7xl bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-border">
          {/* Column 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-black shadow-inner">
                <span className="font-mono text-lg font-black tracking-tighter text-white">
                  H<span className="text-accent">.</span>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-white">
                  AEITCH<span className="text-accent">.</span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-fg-subtle uppercase">
                  {locale === 'ar' ? 'هندسة رقمية للمؤسسات' : 'DIGITAL ENGINEERING'}
                </span>
              </div>
            </Link>

            <p className="text-sm text-fg-muted leading-relaxed max-w-sm">
              {locale === 'ar'
                ? 'إيتش — هندسة رقمية بأربع خدمات، ورؤية واضحة.'
                : 'AEITCH — Digital engineering: four services, one clear vision.'}
            </p>

            <div className="space-y-2 pt-2 text-xs text-fg-subtle">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <a href="mailto:hello@aeitch.com" className="hover:text-accent transition-colors">
                  hello@aeitch.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <span className="font-mono">0318-4055723</span>
              </div>
            </div>
          </div>

          {/* Column 2: Engineering Services */}
          <div>
            <h4 className="text-sm font-mono font-bold text-fg uppercase tracking-wider mb-4">
              {locale === 'ar' ? 'الخدمات' : 'Services'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/services/ai-automation"
                  className="hover:text-accent transition-colors"
                >
                  {locale === 'ar' ? 'الذكاء الاصطناعي والأتمتة' : 'AI Automation & Integration'}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/product-development"
                  className="hover:text-accent transition-colors"
                >
                  {locale === 'ar' ? 'تطوير المنتجات' : 'Product Development'}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/cloud-devops"
                  className="hover:text-accent transition-colors"
                >
                  {locale === 'ar' ? 'DevOps وهندسة السحابة' : 'DevOps & Cloud Engineering'}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/custom-software"
                  className="hover:text-accent transition-colors"
                >
                  {locale === 'ar' ? 'تطوير البرمجيات المخصصة' : 'Custom Software Development'}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-xs font-mono text-accent hover:underline">
                  {locale === 'ar' ? 'جميع الخدمات ←' : 'View All Services →'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-sm font-mono font-bold text-fg uppercase tracking-wider mb-4">
              {locale === 'ar' ? 'الشركة' : 'Company'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about-us" className="hover:text-accent transition-colors">
                  {locale === 'ar' ? 'من نحن' : 'About'}
                </Link>
              </li>
              <li>
                <Link href="/about-us/life-at-aeitch" className="hover:text-accent transition-colors flex items-center gap-1.5">
                  <span>{locale === 'ar' ? 'الحياة في إيتش' : 'Life at AEITCH'}</span>
                  <span className="text-[9px] font-mono text-accent bg-accent/10 px-1.5 py-0.5 rounded border border-accent/30">
                    NEW
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-accent transition-colors">
                  {locale === 'ar' ? 'دراسات الحالة' : 'Our Work'}
                </Link>
              </li>
              <li>
                <Link href="/our-products" className="hover:text-accent transition-colors">
                  {locale === 'ar' ? 'منتجاتنا' : 'Our Products'}
                </Link>
              </li>
              <li>
                <Link href="/vision-2030" className="hover:text-accent transition-colors">
                  {locale === 'ar' ? 'رؤية 2030' : 'Vision 2030'}
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-accent transition-colors">
                  {locale === 'ar' ? 'المدونة' : 'Blog'}
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-accent transition-colors">
                  {locale === 'ar' ? 'تواصل معنا' : 'Contact'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Social */}
          <div>
            <h4 className="text-sm font-mono font-bold text-fg uppercase tracking-wider mb-4">
              {locale === 'ar' ? 'قانوني' : 'Legal'}
            </h4>
            <ul className="space-y-2.5 text-sm mb-6">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-accent transition-colors text-xs text-fg-subtle"
                >
                  {locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="hover:text-accent transition-colors text-xs text-fg-subtle"
                >
                  {locale === 'ar' ? 'الشروط والأحكام' : 'Terms of Service'}
                </Link>
              </li>
            </ul>

            <h4 className="text-xs font-mono font-bold text-fg-subtle uppercase tracking-wider mb-2">
              {locale === 'ar' ? 'شبكات التواصل' : 'Social'}
            </h4>
            <div className="flex items-center gap-3 text-xs text-fg-subtle">
              <a
                href="https://linkedin.com/company/aeitch"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                LinkedIn
              </a>
              <span>•</span>
              <a
                href="https://instagram.com/aeitch"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                Instagram
              </a>
              <span>•</span>
              <a
                href="https://facebook.com/aeitch"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                Facebook
              </a>
            </div>

            <div className="pt-4">
              <button
                onClick={toggleLocale}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-fg-muted hover:text-fg hover:border-accent transition-colors"
              >
                <Globe className="h-3.5 w-3.5 text-accent" />
                <span>{locale === 'ar' ? 'English (LTR)' : 'العربية (RTL)'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Note */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-fg-subtle">
          <p>© 2026 AEITCH</p>
          <p className="text-center md:text-end max-w-xl text-[11px] leading-relaxed">
            {locale === 'ar'
              ? 'إيتش شركة خاصة مستقلة، ولا تدّعي أي تمثيل حكومي أو شراكة رسمية مع الجهات المذكورة.'
              : 'AEITCH is an independent private company and does not claim government representation or official partnership with the bodies mentioned.'}
          </p>
        </div>
      </div>
    </footer>
  );
};
