"use client";

import React from 'react';
import { Users, Rocket, KeyRound, ShieldCheck, Globe } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export const TrustBadges: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { locale, direction } = useTranslation();

  const badges = [
    {
      ar: 'مهندسون senior',
      en: 'Senior engineers',
      icon: Users,
    },
    {
      ar: 'إصدارات أسبوعية',
      en: 'Weekly releases',
      icon: Rocket,
    },
    {
      ar: 'ملكية كاملة للكود',
      en: 'Full code ownership',
      icon: KeyRound,
    },
    {
      ar: 'الأمان من أول يوم',
      en: 'Security from day one',
      icon: ShieldCheck,
    },
    {
      ar: 'تواصل بالعربية والإنجليزية',
      en: 'Arabic & English communication',
      icon: Globe,
    },
  ];

  return (
    <div className={`w-full py-4 border-y border-border/80 bg-surface/50 backdrop-blur-md ${className}`} dir={direction}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 items-center justify-center">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="flex items-center justify-center sm:justify-start gap-2.5 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent/30 transition-colors"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft text-accent shrink-0">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-semibold text-fg-muted hover:text-white transition-colors truncate">
                  {locale === 'ar' ? b.ar : b.en}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
