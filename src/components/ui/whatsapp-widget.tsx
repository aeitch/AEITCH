"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ExternalLink, ShieldCheck, Clock } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { BRAND } from '@/lib/constants';

export function WhatsAppWidget() {
  const { locale, direction } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const whatsappMessage = encodeURIComponent(
    locale === 'ar'
      ? 'مرحباً فريق إيتش بالرياض، أود الاستفسار حول معمارية السحابة والامتثال للأنظمة السعودية لمنظومتنا.'
      : 'Hello AEITCH Riyadh, I would like to inquire about cloud architecture and Saudi compliance for our platform.'
  );

  const whatsappUrl = `https://wa.me/966118294400?text=${whatsappMessage}`;

  return (
    <div
      className={`fixed bottom-6 ${
        direction === 'rtl' ? 'left-6' : 'right-6'
      } z-40 flex flex-col items-${direction === 'rtl' ? 'start' : 'end'} select-none`}
      dir={direction}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-80 sm:w-96 rounded-2xl border border-white/15 bg-black/95 p-5 shadow-2xl backdrop-blur-2xl text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <MessageCircle className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {locale === 'ar' ? 'المكتب التقني بالرياض' : 'Riyadh Technical Office'}
                  </h4>
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
                    {locale === 'ar' ? 'متاح الآن (توقيت الرياض GMT+3)' : 'Online Now (GMT+3 Riyadh)'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-fg-subtle hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close WhatsApp chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="py-3 text-xs text-fg-muted space-y-2">
              <p>
                {locale === 'ar'
                  ? 'تحدث مباشرة مع المدير التقني الإقليمي في الرياض لمناقشة متطلبات مشروعك، معمارية السحابة السيادية، أو مراجعة أنظمة الامتثال (NCA & PDPL).'
                  : 'Connect directly with our Regional Technical Director in Riyadh to discuss sovereign cloud architecture, Vision 2030 digital initiatives, or KSA compliance.'}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-fg-subtle pt-1">
                <Clock className="h-3 w-3 text-accent" />
                <span>{locale === 'ar' ? 'زمن الاستجابة المعتاد: أقل من 15 دقيقة' : 'Typical response time: < 15 mins'}</span>
              </div>
            </div>

            {/* Action CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-black hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
            >
              <span>{locale === 'ar' ? 'بدء محادثة واتساب المباشرة' : 'Start WhatsApp Consultation'}</span>
              <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-2.5 rounded-full border border-white/20 bg-black/95 px-4 py-3 shadow-2xl backdrop-blur-xl hover:border-emerald-500/60 transition-all duration-300"
        aria-label="Chat with our Regional Technical Director in Riyadh"
      >
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
          <MessageCircle className="h-4 w-4" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
        </div>
        <div className="hidden sm:flex flex-col text-start">
          <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
            {locale === 'ar' ? 'تحدث مع المدير التقني بالرياض' : 'Chat with Riyadh Technical Director'}
          </span>
          <span className="text-[10px] text-fg-subtle">
            {locale === 'ar' ? 'استشارة فورية • GMT+3' : 'Instant Advisory • GMT+3'}
          </span>
        </div>
      </motion.button>
    </div>
  );
}
