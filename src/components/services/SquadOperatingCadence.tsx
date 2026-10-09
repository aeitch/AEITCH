"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Terminal,
  Activity,
  Users,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { viewportOnce } from '@/lib/motion';

interface ScheduleSlot {
  timeAst: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  badge: string;
}

const DAILY_SCHEDULE: ScheduleSlot[] = [
  {
    timeAst: '09:00 - 10:00 AST',
    titleEn: 'Async PR Triage & Code Quality Verification',
    titleAr: 'مراجعة طلبات الدمج والتحقق من الجودة البرمجية',
    descEn: 'Engineers review open pull requests, verify automated CI test runs (Vitest/Playwright), and inspect SonarQube quality gates before morning sync.',
    descAr: 'فحص طلبات السحب ومراجعة نتائج الاختبارات المؤتمتة وتأكيد اجتياز بوابات الجودة قبل المزامنة الصباحية.',
    badge: 'ASYNC_TRIAGE',
  },
  {
    timeAst: '10:30 - 10:45 AST',
    titleEn: 'Live 15-Minute Video Standup',
    titleAr: 'الاجتماع الصباحي المرئي اليومي (15 دقيقة)',
    descEn: 'Direct camera-on video standup with your tech leads. 3 questions: What was completed yesterday, what is committing today, and any architectural blockers.',
    descAr: 'اجتماع مرئي مباشر مع قادتك التقنيين لمناقشة ما تم إنجازه، وخطة اليوم، وإزالة أي عوائق برمجية أو معمارية فوراً.',
    badge: 'LIVE_STANDUP',
  },
  {
    timeAst: '11:00 - 16:00 AST',
    titleEn: 'High-Focus Deep Work & Real-Time Slack Collaboration',
    titleAr: 'جلسات التطوير المركز والتعاون الفوري عبر سلاك',
    descEn: 'Uninterrupted feature implementation and pair programming. Sub-15 minute Slack response times for immediate design or logic clarification.',
    descAr: 'تنفيذ مركز للميزات والبرمجة الثنائية. استجابة سريعة في أقل من 15 دقيقة عبر قنوات سلاك المخصصة لمناقشة التفاصيل.',
    badge: 'CORE_EXECUTION',
  },
  {
    timeAst: '16:30 - 17:15 AST',
    titleEn: 'Daily Staging Deploy & Automated Regression Run',
    titleAr: 'النشر اليومي على بيئة Staging وتشغيل اختبارات الانحدار',
    descEn: 'Approved PRs are deployed to your preview staging environment. Playwright E2E suites run automatically to guarantee zero regressions.',
    descAr: 'نشر التعديلات المعتمدة على بيئة التجربة Staging، وتشغيل اختبارات Playwright الشاملة للتأكد من سلامة النظام.',
    badge: 'STAGING_DEPLOY',
  },
  {
    timeAst: '17:30 - 18:00 AST',
    titleEn: 'End-of-Day Summary & Jira Burndown Update',
    titleAr: 'التقرير الختامي اليومي وتحديث لوحة المهام',
    descEn: 'Engineers post daily recap in Slack and update Jira cards. Transparent record of progress and clear alignment for the next morning.',
    descAr: 'إرسال ملخص الإنجاز اليومي في قناة سلاك وتحديث بطاقات Jira لتوفير شفافية مطلقة وتنسيق مهام اليوم التالي.',
    badge: 'DAILY_RECAP',
  },
];

export function SquadOperatingCadence() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';

  const comparisonRows = [
    {
      metricEn: 'Timezone Synchronicity',
      metricAr: 'التزامن الزمني وأيام العمل',
      offshore: 'Fragmented (2-4 hr lag, Mon-Fri)',
      domestic: '100% GMT+3 (Sun-Thu)',
      aeitch: '100% GMT+3 (Sun-Thu, 9 AM - 6 PM AST)',
    },
    {
      metricEn: 'Architectural Oversight',
      metricAr: 'الإشراف المعماري وجودة الكود',
      offshore: 'Junior devs, zero ADRs',
      domestic: 'Variable, often outsourced',
      aeitch: 'US Principal Architect (C4 & ADRs)',
    },
    {
      metricEn: 'Direct Communication',
      metricAr: 'التواصل المباشر مع المهندسين',
      offshore: 'Opaque account manager delay',
      domestic: 'Account managers & sales reps',
      aeitch: 'Direct Slack, Jira & GitHub PRs',
    },
    {
      metricEn: 'Deployment Velocity',
      metricAr: 'سرعة الإطلاق وبدء أول سبرنت',
      offshore: '4 - 8 weeks contract delay',
      domestic: '6 - 10 weeks recruitment',
      aeitch: 'Sub-10 business days to Sprint 1',
    },
    {
      metricEn: 'Cost Efficiency vs Domestic',
      metricAr: 'الجدوى الاقتصادية للتكلفة',
      offshore: 'Cheap but high rework cost',
      domestic: 'Heavily inflated (agency margins)',
      aeitch: '50% - 65% Savings with 3x Velocity',
    },
    {
      metricEn: 'Code & IP Ownership',
      metricAr: 'ملكية الكود والملكية الفكرية',
      offshore: 'Held hostage until final invoice',
      domestic: 'Standard local agency IP',
      aeitch: '100% Day-1 Direct Push to Your Git',
    },
  ];

  return (
    <section id="sprint-cadence" className="relative py-24 sm:py-32 bg-[#080808] text-white overflow-hidden border-b border-white/10" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1d1408]/30 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-3.5 py-1.5 text-xs font-mono font-semibold text-[#e9800a] mb-4">
            <Clock className="h-3.5 w-3.5" />
            <span>{isAr ? 'وتيرة العمل اليومية' : 'OPERATING RHYTHM & CADENCE'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            {isAr ? 'يوم عمل كامل بتوقيت الرياض دون انقطاع' : 'A Day in the Life of an AEITCH Managed Pod'}
          </h2>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            {isAr
              ? 'صممنا وتيرة العمل اليومية لتتكامل بشكل طبيعي وسلس مع فريقك القيادي في الرياض. شفافية مطلقة وتواصل مباشر دون أي تأخير في الاستجابة.'
              : 'Our daily operating cadence is engineered to integrate seamlessly into your engineering organization. Zero communication blackouts, direct collaboration, and continuous delivery.'}
          </p>
        </div>

        {/* Daily Schedule Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24">
          {DAILY_SCHEDULE.map((slot, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="md:col-span-12 lg:col-span-6 xl:col-span-4 rounded-3xl border border-white/10 bg-[#0d0d10] p-6 sm:p-7 flex flex-col justify-between hover:border-[#e9800a]/40 transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-xs font-bold text-[#e9800a] bg-[#e9800a]/10 border border-[#e9800a]/20 px-2.5 py-1 rounded-lg">
                    {slot.timeAst}
                  </span>
                  <span className="font-mono text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded">
                    {slot.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">
                  {isAr ? slot.titleAr : slot.titleEn}
                </h3>

                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4">
                  {isAr ? slot.descAr : slot.descEn}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-white/40">
                <span>RIYADH_GMT+3</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  ONLINE
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Delivery Model Comparison Matrix */}
        <div className="rounded-3xl border border-white/10 bg-[#0c0c0e] p-6 sm:p-10 shadow-2xl">
          <div className="max-w-2xl mb-8">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#e9800a] block mb-2">
              DELIVERY MODEL BENCHMARK
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {isAr ? 'مقارنة نماذج التوريد الهندسي' : 'How the AEITCH Pod Compares'}
            </h3>
            <p className="text-sm text-white/60">
              {isAr
                ? 'فارق جوهري بين الاستعانة بمصادر خارجية تقليدية أو الشركات المحلية، وبين نموذج المحرك الثلاثي المتطور.'
                : 'A head-to-head comparison between traditional offshore vendors, purely domestic agencies, and AEITCH’s US–Saudi–Pakistan triad model.'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-white/10 text-white/50">
                  <th className="py-3 px-4 text-start font-bold uppercase">Operating Metric</th>
                  <th className="py-3 px-4 text-start text-white/40">Traditional Offshore</th>
                  <th className="py-3 px-4 text-start text-white/40">Domestic Saudi Agency</th>
                  <th className="py-3 px-4 text-start text-[#e9800a] font-bold bg-[#e9800a]/10 rounded-t-xl">
                    AEITCH Managed Pod (Triad)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-bold text-white">
                      {isAr ? row.metricAr : row.metricEn}
                    </td>
                    <td className="py-4 px-4 text-white/60">
                      {row.offshore}
                    </td>
                    <td className="py-4 px-4 text-white/60">
                      {row.domestic}
                    </td>
                    <td className="py-4 px-4 text-[#e9800a] font-bold bg-[#e9800a]/[0.04]">
                      {row.aeitch}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
