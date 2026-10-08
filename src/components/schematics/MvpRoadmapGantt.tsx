"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Flag,
  ArrowRight,
  GitBranch,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export interface GanttSprint {
  phaseNumber: number;
  weeksLabel: string;
  weekSpan: [number, number]; // [startWeek, endWeek]
  daySpan: [number, number]; // [startDay, endDay]
  title: string;
  titleAr: string;
  trackName: string;
  trackNameAr: string;
  milestoneTitle: string;
  milestoneTitleAr: string;
  milestoneId: 'M1' | 'M2' | 'M3' | 'M4';
  deliverables: string[];
  deliverablesAr: string[];
  progressPercent: number;
}

export const GANTT_SPRINTS: GanttSprint[] = [
  {
    phaseNumber: 1,
    weeksLabel: 'W1 - W2',
    weekSpan: [1, 2],
    daySpan: [1, 14],
    title: 'Architectural Discovery & Schema Freeze',
    titleAr: 'المعمارية التقنية وتجميد المخطط',
    trackName: 'Architecture & Schema Track',
    trackNameAr: 'مسار المعمارية والمخططات',
    milestoneTitle: 'M1: Architecture Freeze (Day 14)',
    milestoneTitleAr: 'المعلم الأول: تجميد المعمارية (اليوم 14)',
    milestoneId: 'M1',
    deliverables: [
      'System Architecture ADRs & C4 Container Model',
      'PostgreSQL / Prisma Schema & Indexing Plan',
      'OpenAPI 3.1 & tRPC Type-Safe API Contracts',
      'Interactive High-Fidelity Figma Prototypes',
    ],
    deliverablesAr: [
      'سجلات القرارات المعمارية ونموذج الحاويات C4',
      'مخطط قاعدة البيانات وفهرسة الأداء في Prisma',
      'عقود واجهات البرمجة الآمنة بنمط OpenAPI 3.1',
      'نماذج واجهات المستخدم التفاعلية عالية الدقة',
    ],
    progressPercent: 100,
  },
  {
    phaseNumber: 2,
    weeksLabel: 'W3 - W4',
    weekSpan: [3, 4],
    daySpan: [15, 28],
    title: 'Core Engine, Auth & DB Pipelines',
    titleAr: 'بناء المحرك والتوثيق وقواعد البيانات',
    trackName: 'Core Backend & Workflows Track',
    trackNameAr: 'مسار المحرك وسير العمل',
    milestoneTitle: 'M2: Core Workflow Validation (Day 28)',
    milestoneTitleAr: 'المعلم الثاني: التحقق من مسارات العمل (اليوم 28)',
    milestoneId: 'M2',
    deliverables: [
      'SAML 2.0 / OAuth2 / Nafath RBAC Authentication',
      'Core Domain Business Logic & State Machines',
      'Automated Database Migrations & Seeds',
      'Regional Payment Rails (mada & Apple Pay)',
    ],
    deliverablesAr: [
      'التوثيق الموحد نفاذ وإدارة الصلاحيات المؤسسية',
      'منطق الأعمال الأساسي ونماذج آلة الحالة',
      'الترحيل الآلي لقواعد البيانات وبيانات الاختبار',
      'بوابات الدفع الإقليمية (مدى وآبل باي)',
    ],
    progressPercent: 100,
  },
  {
    phaseNumber: 3,
    weeksLabel: 'W5 - W6',
    weekSpan: [5, 6],
    daySpan: [29, 42],
    title: 'Agentic AI, Integrations & Observability',
    titleAr: 'وكلاء الذكاء والتكاملات والمراقبة',
    trackName: 'AI Mesh & External APIs Track',
    trackNameAr: 'مسار شبكة الذكاء والربط الخارجي',
    milestoneTitle: 'M3: Feature Freeze & Integration (Day 42)',
    milestoneTitleAr: 'المعلم الثالث: تجميد المزايا والتكامل (اليوم 42)',
    milestoneId: 'M3',
    deliverables: [
      'Sovereign RAG Vector Pipeline & Tool Agents',
      'Asynchronous Task Queue Mesh (BullMQ / Redis)',
      'OpenTelemetry Distributed Tracing & Alerts',
      'End-to-End Automated Playwright User Journeys',
    ],
    deliverablesAr: [
      'مسار استرجاع المتجهات السيادي ووكلاء الذكاء',
      'شبكة طوابير المهام الموزعة عبر Redis / BullMQ',
      'التتبع الموزع ومؤشرات التنبيه OpenTelemetry',
      'حزم اختبارات رحلة المستخدم الآلية الشاملة',
    ],
    progressPercent: 100,
  },
  {
    phaseNumber: 4,
    weeksLabel: 'W7 - W8',
    weekSpan: [7, 8],
    daySpan: [43, 56],
    title: 'Security Hardening, Audit & 100% IP Handover',
    titleAr: 'التعزيز الأمني والتدقيق ونقل الملكية الكاملة',
    trackName: 'Hardening & Production Handover Track',
    trackNameAr: 'مسار التحصين والتسليم الإنتاجي',
    milestoneTitle: 'M4: Commercial Launch & IP Transfer (Day 56)',
    milestoneTitleAr: 'المعلم الرابع: الإطلاق التجاري ونقل الملكية (اليوم 56)',
    milestoneId: 'M4',
    deliverables: [
      'NCA ECC & Saudi PDPL Class 3 Verification',
      'Penetration Testing & Remediation Sign-Off',
      'Zero-Downtime Multi-Region Cloud Deployment',
      'Complete Git Repository & 100% Source IP Transfer',
    ],
    deliverablesAr: [
      'التحقق من ضوابط الأمن السيبراني وحماية البيانات',
      'اختبارات الاختراق وإغلاق الثغرات بالكامل',
      'النشر السحابي متعدد المناطق دون أي توقف',
      'تسليم كامل الشيفرة المصدرية وحقوق الملكية 100%',
    ],
    progressPercent: 100,
  },
];

export interface MvpRoadmapGanttProps {
  className?: string;
  initialSelectedPhase?: number;
  interactive?: boolean;
}

export function MvpRoadmapGantt({
  className = '',
  initialSelectedPhase = 1,
  interactive = true,
}: MvpRoadmapGanttProps) {
  const { locale, direction } = useTranslation();
  const [selectedPhase, setSelectedPhase] = useState<number>(initialSelectedPhase);
  const [activeWeekCursor, setActiveWeekCursor] = useState<number>(4);

  const activeSprint =
    GANTT_SPRINTS.find((s) => s.phaseNumber === selectedPhase) || GANTT_SPRINTS[0];

  const weeks = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div
      data-testid="mvp-roadmap-gantt"
      className={`rounded-2xl border border-white/10 bg-black p-4 sm:p-6 lg:p-7 space-y-6 text-white ${className}`}
      dir={direction}
    >
      {/* 1. TOP HEADER HUD */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 border border-accent/30 text-accent">
            <Rocket className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                {locale === 'ar'
                  ? 'مخطط غانت لإطلاق النموذج الأولي (8 أسابيع)'
                  : '8-WEEK RAPID MVP GANTT ROADMAP'}
              </span>
              <span className="flex h-2 w-2 rounded-full bg-accent animate-ping" />
            </div>
            <p className="font-mono text-[10px] text-white/50">
              {'DAY 01 TO DAY 56 PRODUCTION SPRINT ENGINE // 4 PHASED SPRINTS'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-[10px]">
          <span className="rounded bg-accent/10 px-2.5 py-1 text-accent border border-accent/25 font-bold">
            56-DAY HANDOVER GUARANTEED
          </span>
          <span className="rounded bg-white/5 px-2.5 py-1 text-white/70 border border-white/10">
            ZERO VENDOR LOCK-IN
          </span>
        </div>
      </div>

      {/* 2. DESKTOP / TABLET 8-WEEK GANTT MATRIX (hidden on mobile, visible md+) */}
      <div className="hidden md:block rounded-xl border border-white/10 bg-[#09090b] p-5 space-y-4">
        {/* Timeline Header: 8 Weeks Scale (1 to 8) & Days (1 to 56) */}
        <div>
          <div className="grid grid-cols-8 gap-2 border-b border-white/10 pb-2.5 text-center font-mono">
            {weeks.map((wk) => {
              const isCursorWeek = activeWeekCursor === wk;
              const parentPhase = GANTT_SPRINTS.find(
                (s) => wk >= s.weekSpan[0] && wk <= s.weekSpan[1]
              );
              const isSelectedSprintWeek = parentPhase?.phaseNumber === selectedPhase;

              return (
                <button
                  key={wk}
                  type="button"
                  data-testid={`gantt-week-header-${wk}`}
                  onClick={() => {
                    setActiveWeekCursor(wk);
                    if (parentPhase) setSelectedPhase(parentPhase.phaseNumber);
                  }}
                  className={`p-1.5 rounded transition-all cursor-pointer ${
                    isCursorWeek
                      ? 'bg-accent text-black font-black shadow-glow-xs'
                      : isSelectedSprintWeek
                      ? 'bg-white/10 text-white font-bold border border-accent/40'
                      : 'bg-black/40 text-white/60 hover:bg-white/5'
                  }`}
                >
                  <span className="text-[11px] block">W{wk}</span>
                  <span className="text-[9px] text-white/40 block">
                    D{(wk - 1) * 7 + 1}–{wk * 7}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Multi-Track Gantt Bars with Milestones */}
        <div className="space-y-3 pt-2">
          {GANTT_SPRINTS.map((sprint) => {
            const isSelected = selectedPhase === sprint.phaseNumber;
            // 8-column grid math:
            // Phase 1: W1-W2 (col 1 to 2) -> col-start-1 col-span-2
            // Phase 2: W3-W4 (col 3 to 4) -> col-start-3 col-span-2
            // Phase 3: W5-W6 (col 5 to 6) -> col-start-5 col-span-2
            // Phase 4: W7-W8 (col 7 to 8) -> col-start-7 col-span-2
            const colStartMap = ['col-start-1', 'col-start-3', 'col-start-5', 'col-start-7'];
            const colStart = colStartMap[sprint.phaseNumber - 1];

            return (
              <div
                key={sprint.phaseNumber}
                className={`grid grid-cols-8 gap-2 items-center p-2 rounded-lg transition-all border ${
                  isSelected
                    ? 'border-accent/40 bg-white/[0.04]'
                    : 'border-transparent hover:bg-white/[0.02]'
                }`}
              >
                {/* Gantt Bar spanning 2 columns */}
                <div className={`${colStart} col-span-2`}>
                  <button
                    type="button"
                    data-testid={`gantt-bar-phase-${sprint.phaseNumber}`}
                    onClick={() => {
                      setSelectedPhase(sprint.phaseNumber);
                      setActiveWeekCursor(sprint.weekSpan[0]);
                    }}
                    className={`w-full group text-start relative overflow-hidden rounded-lg p-2.5 transition-all border cursor-pointer ${
                      isSelected
                        ? 'border-accent bg-accent text-black font-bold shadow-glow-sm'
                        : 'border-white/15 bg-[#141418] text-white hover:border-accent/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider block">
                        {`PHASE 0${sprint.phaseNumber} // ${sprint.weeksLabel}`}
                      </span>
                      {/* Milestone Diamond Marker */}
                      <span
                        title={sprint.milestoneTitle}
                        data-testid={`gantt-milestone-${sprint.milestoneId}`}
                        className={`inline-flex items-center justify-center h-4 w-4 rotate-45 rounded-xs text-[9px] font-black ${
                          isSelected
                            ? 'bg-black text-accent border border-black'
                            : 'bg-accent text-black shadow-glow-xs'
                        }`}
                      >
                        <span className="-rotate-45">{sprint.milestoneId}</span>
                      </span>
                    </div>

                    <div className="text-xs truncate font-semibold mt-1">
                      {locale === 'ar' ? sprint.titleAr : sprint.title}
                    </div>

                    <div className="flex items-center justify-between text-[9px] font-mono mt-1 opacity-80">
                      <span>{sprint.milestoneTitle.split(':')[0]} CHECKPOINT</span>
                      <span>100% COMPLETE</span>
                    </div>
                  </button>
                </div>

                {/* Info summary on the remaining non-occupied columns */}
                <div
                  className={`text-[11px] font-mono transition-opacity flex items-center gap-2 ${
                    sprint.phaseNumber <= 2
                      ? 'col-start-3 col-span-6'
                      : 'col-start-1 col-span-4 row-start-1'
                  } ${isSelected ? 'text-white/80' : 'text-white/30'}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="truncate">
                    {locale === 'ar' ? sprint.milestoneTitleAr : sprint.milestoneTitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. MOBILE VERTICAL SPRINT STEPPER (< md) */}
      <div className="md:hidden space-y-3">
        <div className="flex items-center justify-between pb-1">
          <span className="font-mono text-[11px] text-white/50 uppercase tracking-wider">
            {locale === 'ar' ? 'مراحل الإطلاق الأسبوعية' : '8-WEEK STEPPER TIMELINE'}
          </span>
          <span className="font-mono text-[10px] text-accent">SELECT SPRINT</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {GANTT_SPRINTS.map((sprint) => {
            const isSelected = selectedPhase === sprint.phaseNumber;
            return (
              <button
                key={sprint.phaseNumber}
                type="button"
                data-testid={`gantt-mobile-tab-${sprint.phaseNumber}`}
                onClick={() => setSelectedPhase(sprint.phaseNumber)}
                className={`p-3 rounded-xl border text-start transition-all ${
                  isSelected
                    ? 'border-accent bg-accent text-black font-bold'
                    : 'border-white/10 bg-[#0d0d10] text-white'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span>{sprint.weeksLabel}</span>
                  <span className="font-bold">{sprint.milestoneId}</span>
                </div>
                <div className="text-xs font-semibold mt-1 truncate">
                  {locale === 'ar' ? sprint.titleAr : sprint.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. ACTIVE SPRINT DELIVERABLES & MILESTONE PANEL */}
      <motion.div
        key={activeSprint.phaseNumber}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="rounded-xl border border-white/15 bg-[#0e0e11] p-4 sm:p-5 space-y-4"
      >
          {/* Sprint Details Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span
                  data-testid="gantt-active-phase-tag"
                  className="font-mono text-[10px] text-accent font-bold px-1.5 py-0.5 rounded bg-accent/10 border border-accent/20"
                >
                  {`PHASE 0${activeSprint.phaseNumber} // ${activeSprint.weeksLabel}`}
                </span>
                <span className="font-bold text-sm text-white">
                  {locale === 'ar' ? activeSprint.titleAr : activeSprint.title}
                </span>
              </div>
              <p className="mt-1 text-xs text-white/60">
                {locale === 'ar' ? activeSprint.trackNameAr : activeSprint.trackName} — Days{' '}
                {activeSprint.daySpan[0]} to {activeSprint.daySpan[1]}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-xs">
              <span className="rounded bg-accent text-black px-2.5 py-1 font-bold">
                {activeSprint.milestoneId}: GATE CHECKPOINT
              </span>
            </div>
          </div>

          {/* 4 Verified Deliverables Grid */}
          <div>
            <div className="font-mono text-[10px] text-white/50 uppercase tracking-wider mb-2.5">
              {locale === 'ar' ? 'المخرجات الهندسية المعتمدة للمرحلة:' : 'VERIFIED SPRINT DELIVERABLES:'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeSprint.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-black/60 p-2.5 text-xs text-white/80"
                >
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    {locale === 'ar' ? activeSprint.deliverablesAr[idx] : item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantee / IP Protection Footer */}
          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-white/70">
              <ShieldCheck className="h-4 w-4 text-accent" />
              <span>
                {locale === 'ar'
                  ? 'تسليم كامل الشيفرة المصدرية وحقوق الملكية الفكرية 100%'
                  : '100% COMPLETE SOURCE CODE & IP OWNERSHIP TRANSFER'}
              </span>
            </div>
            <span className="text-accent font-bold">ZERO VENDOR LOCK-IN</span>
          </div>
        </motion.div>
    </div>
  );
}
