"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, CheckCircle2, Download, Shield, Sparkles, X, ArrowRight, Lock } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface LeadMagnetProps {
  type?: 'whitepaper' | 'checklist' | 'both';
  className?: string;
}

export function LeadMagnetCard({ type = 'both', className = '' }: LeadMagnetProps) {
  const { locale, direction } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeAsset, setActiveAsset] = useState<'whitepaper' | 'checklist'>('whitepaper');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const whitepaperInfo = {
    title:
      locale === 'ar'
        ? 'الهجرة إلى السحابة السعودية المحلية: دليل مناطق الحوسبة السيادية ونظام PDPL وضوابط NCA'
        : 'Migrating to Local Saudi Cloud: Navigating In-Country Regions, PDPL, and NCA Controls',
    desc:
      locale === 'ar'
        ? 'دليل تنفيذي معماري شامل لرؤساء التقنية (CTOs) يغطي Google Cloud Dammam و Azure Riyadh و AWS KSA واستراتيجيات عزل البيانات السيادية.'
        : 'An architectural executive blueprint for CTOs covering Google Cloud Dammam, Azure Riyadh, AWS KSA, and strict in-kingdom data residency.',
    pages: '28 Pages • PDF Architecture Blueprint',
    badge: 'KSA CTO Whitepaper',
  };

  const checklistInfo = {
    title:
      locale === 'ar'
        ? 'قائمة الفحص المعيارية لعمليات DevSecOps لمبادرات التحول الرقمي لرؤية 2030'
        : 'Enterprise DevSecOps Checklist for KSA Vision 2030 Digital Initiatives',
    desc:
      locale === 'ar'
        ? 'أكثر من 45 معيار تدقيق للأمان والأتمتة تشمل فحص الثغرات اللحظي، إدارة الأسرار عبر Vault، وسياسات IAM Least-Privilege.'
        : '45+ audited checkpoints covering automated SAST/DAST, HashiCorp Vault secrets, container image signing, and NCA ECC alignment.',
    pages: 'Spreadsheet & Interactive Checklist Template',
    badge: 'Engineering Governance Template',
  };

  const handleOpenModal = (asset: 'whitepaper' | 'checklist') => {
    setActiveAsset(asset);
    setIsSuccess(false);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 900);
  };

  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`} dir={direction}>
        {/* Card 1: Whitepaper */}
        {(type === 'both' || type === 'whitepaper') && (
          <div className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-surface p-6 shadow-xl transition-all duration-300 hover:border-accent/50 hover:bg-surface-2">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-mono font-semibold text-accent">
                  <FileText className="h-3.5 w-3.5" />
                  {whitepaperInfo.badge}
                </span>
                <span className="text-[11px] font-mono text-fg-subtle">{whitepaperInfo.pages}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug group-hover:text-accent transition-colors">
                {whitepaperInfo.title}
              </h3>
              <p className="text-xs sm:text-sm text-fg-muted leading-relaxed mb-6">
                {whitepaperInfo.desc}
              </p>
            </div>
            <button
              onClick={() => handleOpenModal('whitepaper')}
              className="inline-flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-semibold text-white hover:border-accent hover:bg-accent hover:text-black transition-all"
            >
              <span>{locale === 'ar' ? 'تحميل ورقة العمل البيضاء (PDF)' : 'Download Whitepaper (PDF)'}</span>
              <Download className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Card 2: DevSecOps Checklist Template */}
        {(type === 'both' || type === 'checklist') && (
          <div className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-surface p-6 shadow-xl transition-all duration-300 hover:border-accent/50 hover:bg-surface-2">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-semibold text-emerald-400">
                  <Shield className="h-3.5 w-3.5" />
                  {checklistInfo.badge}
                </span>
                <span className="text-[11px] font-mono text-fg-subtle">{checklistInfo.pages}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug group-hover:text-accent transition-colors">
                {checklistInfo.title}
              </h3>
              <p className="text-xs sm:text-sm text-fg-muted leading-relaxed mb-6">
                {checklistInfo.desc}
              </p>
            </div>
            <button
              onClick={() => handleOpenModal('checklist')}
              className="inline-flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-semibold text-white hover:border-accent hover:bg-accent hover:text-black transition-all"
            >
              <span>{locale === 'ar' ? 'الحصول على قائمة فحص DevSecOps' : 'Get DevSecOps Checklist'}</span>
              <Download className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-2xl border border-white/20 bg-black/95 p-6 sm:p-8 shadow-2xl text-white"
              dir={direction}
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 end-5 rounded-lg p-1.5 text-fg-subtle hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {!isSuccess ? (
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-mono text-accent mb-3">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{activeAsset === 'whitepaper' ? whitepaperInfo.badge : checklistInfo.badge}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white mb-2">
                    {activeAsset === 'whitepaper' ? whitepaperInfo.title : checklistInfo.title}
                  </h3>
                  <p className="text-xs text-fg-muted mb-6">
                    {locale === 'ar'
                      ? 'أدخل بيانات عملك المؤسسي لاستلام وثيقة المعمارية التقنية مباشرة على بريدك المهني.'
                      : 'Enter your corporate credentials to receive the full architectural deliverable directly in your inbox.'}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-fg-muted mb-1">
                        {locale === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={locale === 'ar' ? 'م. فهد السبيعي' : 'Eng. Tariq Al-Ghamdi'}
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-fg-muted mb-1">
                        {locale === 'ar' ? 'البريد الإلكتروني المهني' : 'Corporate Work Email'}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@enterprise.com.sa"
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-fg-muted mb-1">
                        {locale === 'ar' ? 'اسم المؤسسة / الجهة' : 'Enterprise / Organization'}
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={locale === 'ar' ? 'شركة أو جهة كبرى' : 'Enterprise Tech Lead'}
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-accent py-3 text-sm font-bold text-black hover:bg-accent-hover transition-colors shadow-glow-sm disabled:opacity-50"
                    >
                      {isSubmitting
                        ? locale === 'ar'
                          ? 'جارٍ التحقق وتجهيز الوثيقة...'
                          : 'Preparing Deliverable...'
                        : locale === 'ar'
                        ? 'إرسال وثيقة المعمارية الفورية'
                        : 'Access Deliverable Now'}
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-fg-subtle pt-2">
                      <Lock className="h-3 w-3 text-accent" />
                      <span>{locale === 'ar' ? 'محمي ومحفوظ بموجب نظام حماية البيانات الشخصية' : 'Encrypted & compliant with Saudi PDPL'}</span>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mb-4">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {locale === 'ar' ? 'تم إرسال الملف بنجاح!' : 'Deliverable Sent Successfully!'}
                  </h3>
                  <p className="text-sm text-fg-muted mb-6">
                    {locale === 'ar'
                      ? `تم إرسال الرابط الآمن لتحميل الملف مباشرة إلى ${email}. سيتواصل معك أحد كبار مهندسينا في حال كان لديك أي استفسار فني.`
                      : `A secure direct download link has been dispatched to ${email}. Our principal cloud architects are available should you require custom review.`}
                  </p>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="rounded-xl border border-white/20 bg-white/10 px-6 py-2.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                  >
                    {locale === 'ar' ? 'إغلاق النافذة' : 'Close'}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
