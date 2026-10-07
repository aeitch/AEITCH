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
                  {locale === 'ar' ? 'إيتش للحلول الرقمية' : 'DIGITAL ENGINEERING'}
                </span>
              </div>
            </Link>

            <p className="text-sm text-fg-muted leading-relaxed max-w-sm">
              {t.footer.description}
            </p>

            <div className="space-y-2 pt-2 text-xs text-fg-subtle">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent shrink-0" />
                <span>{t.footer.workingHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent shrink-0" />
                <span>
                  {locale === 'ar'
                    ? 'الرياض • جدة • المنطقة الشرقية'
                    : 'Riyadh • Jeddah • Eastern Province'}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Engineering Services */}
          <div>
            <h4 className="text-sm font-mono font-bold text-fg uppercase tracking-wider mb-4">
              {t.footer.servicesTitle}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/services/ai-consulting"
                  className="hover:text-accent transition-colors"
                >
                  {locale === 'ar' ? 'الذكاء الاصطناعي والوكلاء' : 'Applied AI & Agents'}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/cloud-devops"
                  className="hover:text-accent transition-colors"
                >
                  {locale === 'ar' ? 'السحابة السيادية وديف أوبس' : 'Sovereign Cloud & DevOps'}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/custom-software"
                  className="hover:text-accent transition-colors"
                >
                  {locale === 'ar' ? 'البرمجيات المؤسسية المخصصة' : 'Custom Enterprise Software'}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/new-product-development"
                  className="hover:text-accent transition-colors"
                >
                  {locale === 'ar' ? 'تطوير النماذج الأولية MVPs' : 'Rapid MVP Development'}
                </Link>
              </li>
              <li>
                <Link href="/#industries" className="hover:text-accent transition-colors">
                  {locale === 'ar' ? 'القطاعات ذات الأولوية' : 'Priority Industries'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Insights */}
          <div>
            <h4 className="text-sm font-mono font-bold text-fg uppercase tracking-wider mb-4">
              {t.footer.companyTitle}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about-us" className="hover:text-accent transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-accent transition-colors">
                  {t.nav.caseStudies}
                </Link>
              </li>
              <li>
                <Link href="/#vision-2030" className="hover:text-accent transition-colors">
                  {t.nav.kingdom2030}
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-accent transition-colors">
                  {t.nav.insights}
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-accent transition-colors">
                  {t.common.contactUs}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Governance & Direct Contact */}
          <div>
            <h4 className="text-sm font-mono font-bold text-fg uppercase tracking-wider mb-4">
              {t.footer.legalTitle}
            </h4>
            <ul className="space-y-2.5 text-sm mb-6">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-accent transition-colors text-xs text-fg-subtle"
                >
                  {t.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="hover:text-accent transition-colors text-xs text-fg-subtle"
                >
                  {t.footer.termsOfService}
                </Link>
              </li>
            </ul>

            <h4 className="text-xs font-mono font-bold text-fg-subtle uppercase tracking-wider mb-2">
              {t.footer.contactDirect}
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="mailto:engineering@aeitch.com"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-accent" />
                <span>engineering@aeitch.com</span>
              </a>
              <div className="flex items-center gap-2 text-fg-subtle">
                <Phone className="h-3.5 w-3.5 text-accent" />
                <span>{t.footer.phoneLabel}</span>
              </div>
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

        {/* Bottom Bar: Copyright & Strict Honesty Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-fg-subtle">
          <p>{t.footer.copyright}</p>
          <p className="text-center md:text-end max-w-xl text-[11px] leading-relaxed">
            {t.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};
