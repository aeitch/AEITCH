"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Terminal,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Cpu,
  Layers,
  GitPullRequest,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { viewportOnce } from '@/lib/motion';

export function SquadAnatomyBento() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';

  return (
    <section className="relative py-24 sm:py-32 bg-[#09090b] text-white overflow-hidden border-b border-white/10" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#1d1408]/30 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-3.5 py-1.5 text-xs font-mono font-semibold text-[#e9800a] mb-4">
              <Users className="h-3.5 w-3.5" />
              <span>{isAr ? 'هيكل الفريق المستقل' : 'SQUAD ANATOMY & DISCIPLINE'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
              {isAr ? 'فرق عمل مستقلة ومكتملة التخصصات' : 'Autonomous, Full-Stack Product Pods'}
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              {isAr
                ? 'لا نقدم مجرد أفراد متباعدين، بل نوفر فرق عمل متكاملة تضم معماريي نظم، ومهندسي سحابة، ومطوري برمجيات متقدمين، ومسؤولي جودة يعملون كوحدة واحدة منسجمة.'
                : 'We do not staff fragmented freelancers. We deploy synchronized, cross-functional squads with US architectural governance, dedicated SREs, senior developers, and automated QA.'}
            </p>
          </motion.div>

          <div className="font-mono text-xs text-white/50 border-s-2 border-[#e9800a] ps-4 py-1">
            <span>RIYADH_GMT+3 • AGILITY</span>
            <span className="block text-[#e9800a] font-bold">100% DIRECT_ENGINEER_ACCESS</span>
          </div>
        </div>

        {/* Asymmetric Bento Grid (2.0 Architecture) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: The Autonomous Pod Blueprint (8 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45 }}
            className="md:col-span-8 group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#131215] to-[#0c0c0e] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div className="absolute top-0 end-0 -mt-10 -me-10 h-64 w-64 rounded-full bg-[#e9800a]/10 blur-[100px] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                  <Workflow className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                  AUTONOMOUS PRODUCT POD
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'هيكل الفريق الهندسي المخصص المتكامل' : 'The Multi-Disciplinary Managed Pod Architecture'}
              </h3>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xl mb-6">
                {isAr
                  ? 'كل فريق مخصص يعمل كوحدة برمجية مكتملة ومستقلة، مدعومة بإشراف معماري من الولايات المتحدة وتنفيذ فائق السرعة من مركز التطوير، مما يمنع فجوات التواصل ويضمن تسليم البرمجيات بدقة متناهية.'
                  : 'Every dedicated pod functions as a complete self-contained software unit. Led by a US Principal Architect for C4 diagrams and code reviews, backed by senior full-stack developers and dedicated QA leads.'}
              </p>

              {/* Roles Breakdown Visual */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="rounded-xl border border-white/10 bg-black/50 p-3.5 font-mono text-xs">
                  <span className="text-[#e9800a] font-bold block mb-1">01. US Principal Architect</span>
                  <span className="text-white/70 text-[11px] block">
                    {isAr ? 'معمارية C4 ومراجعة الأكواد الصارمة' : 'System Architecture, C4 Models & ADRs'}
                  </span>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/50 p-3.5 font-mono text-xs">
                  <span className="text-emerald-400 font-bold block mb-1">02. Staff SRE & Platform Lead</span>
                  <span className="text-white/70 text-[11px] block">
                    {isAr ? 'تيرفورم وكوبرنيتس وخطوط GitOps' : 'Terraform, K8s & GitOps Delivery'}
                  </span>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/50 p-3.5 font-mono text-xs">
                  <span className="text-white/90 font-bold block mb-1">03. Senior Full-Stack Pod</span>
                  <span className="text-white/70 text-[11px] block">
                    {isAr ? 'تطوير Next.js و Go و Python فائق السرعة' : 'Next.js, TypeScript, Go & High-Throughput APIs'}
                  </span>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/50 p-3.5 font-mono text-xs">
                  <span className="text-white/90 font-bold block mb-1">04. Automated QA & Security</span>
                  <span className="text-white/70 text-[11px] block">
                    {isAr ? 'اختبارات Playwright وفحص الثغرات' : 'Playwright E2E & 0-CVE Pipeline Gates'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-6 border-t border-white/10 font-mono text-xs text-white/60">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>{isAr ? 'تسليم أسبوعي مستمر مع عروض حية على بيئات Staging' : 'Bi-Weekly Staging Demos & Production Releases'}</span>
            </div>
          </motion.div>

          {/* Card 2: 100% Riyadh Working Hours Synchronicity (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="md:col-span-4 group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#131215] to-[#0c0c0e] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                  <Clock className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                  100% GMT+3
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'تزامن كامل بتوقيت الرياض' : '100% Riyadh Hours Synchronicity'}
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'يعمل المهندسون من الأحد إلى الخميس، من الساعة 9:00 صباحاً حتى 6:00 مساءً بتوقيت الرياض. استجابة فورية عبر سلاك واجتماعات يومية مباشرة.'
                  : 'Engineers are online and active Sunday through Thursday, 9:00 AM - 6:00 PM AST. Real-time Slack collaboration with sub-15-minute response times.'}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between text-white/60">
                <span>Working Days:</span>
                <span className="text-white/90 font-bold">Sunday – Thursday</span>
              </div>
              <div className="flex items-center justify-between text-white/60">
                <span>Standup Time:</span>
                <span className="text-emerald-400 font-bold">10:30 AM AST Daily</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Direct Access & Zero Bureaucracy (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="md:col-span-4 group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#131215] to-[#0c0c0e] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                  <Terminal className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#e9800a] bg-[#e9800a]/15 border border-[#e9800a]/30 px-3 py-1 rounded-full">
                  DIRECT ACCESS
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'وصول مباشر دون وسطاء' : 'Direct Engineer Tooling Access'}
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'لا وجود لمدراء حسابات تقليديين. يتعاون قادتك التقنيون مباشرة مع مهندسي الفريق عبر قنوات سلاك، ومراجعات طلبات الدمج (PRs)، ولوحات Jira.'
                  : 'No account managers or communication bottlenecks. Your technical leads collaborate directly with squad engineers via dedicated Slack channels and GitHub PRs.'}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between text-white/60">
                <span>Communication Channels:</span>
                <span className="text-white/90 font-bold">Slack • GitHub • Jira</span>
              </div>
              <div className="flex items-center justify-between text-white/60">
                <span>Account Middlemen:</span>
                <span className="text-emerald-400 font-bold">Zero (0)</span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Day-1 IP Ownership & Git Protection (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="md:col-span-4 group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#131215] to-[#0c0c0e] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                  <Lock className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                  100% IP SOVEREIGNTY
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'ملكية تامة للكود من اليوم الأول' : 'Day-1 Intellectual Property Protection'}
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'يتم دفع جميع التعديلات مباشرة إلى مستودعات مؤسستك الخاصة (GitHub/GitLab). ملكية فكرية مطلقة بنسبة 100% دون أي قيود أو شروط خروج.'
                  : 'All code is committed directly to your enterprise GitHub/GitLab repositories. Complete IP ownership is transferred in real-time under airtight NDAs.'}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between text-white/60">
                <span>Repository Custody:</span>
                <span className="text-emerald-400 font-bold">Client Private Org</span>
              </div>
              <div className="flex items-center justify-between text-white/60">
                <span>Code Lock-in:</span>
                <span className="text-white/90 font-bold">Zero (0) Vendor Lock-in</span>
              </div>
            </div>
          </motion.div>

          {/* Card 5: Automated Testing & 0-CVE Pipeline Gates (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="md:col-span-4 group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#131215] to-[#0c0c0e] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                  0-DEFECT DISCIPLINE
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'جودة برمجية وأمان مؤتمت' : 'Automated QA & Security Gate'}
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'اختبارات شاملة عبر Playwright وفحص مستمر للثغرات البرمجية قبل الدمج. لا يتم نشر أي ميزة للإنتاج دون اجتياز بوابات الفحص التلقائي.'
                  : 'Automated Playwright end-to-end suites, unit test thresholds, and Trivy container vulnerability scanning required before every pull request merge.'}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between text-white/60">
                <span>End-to-End Suite:</span>
                <span className="text-emerald-400 font-bold">Playwright / Vitest</span>
              </div>
              <div className="flex items-center justify-between text-white/60">
                <span>Vulnerability Threshold:</span>
                <span className="text-emerald-400 font-bold">0 High/Crit CVEs</span>
              </div>
            </div>
          </motion.div>

          {/* Card 6: Bi-Weekly Agile Sprint Cadence & Delivery Engine (12 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="md:col-span-12 group relative rounded-3xl border border-white/10 bg-gradient-to-r from-[#121114] via-[#151419] to-[#121114] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                    <GitPullRequest className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#e9800a] font-bold">
                    PREDICTABLE 2-WEEK VELOCITY
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                  {isAr
                    ? 'وتيرة السبرنت المستمرة ودورات الإطلاق نصف الشهرية'
                    : 'Bi-Weekly Sprint Cadence & Continuous Delivery Engine'}
                </h3>

                <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl mb-6">
                  {isAr
                    ? 'نعمل وفق دورات رشيقة مدتها أسبوعان تبدأ بتخطيط دقيق وتصميم معماري، ثم تنفيذ متواصل مع عروض تجريبية حية على بيئات الاختبار قبل الإطلاق الرسمي.'
                    : 'Disciplined 2-week Agile cycles commencing with C4 architectural alignment, followed by high-velocity implementation and live staging demonstrations before production release.'}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Sunday Sprint Planning & ADRs</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Daily 10:30 AM Video Standup</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Thursday Bi-Weekly Staging Demo</span>
                  </span>
                </div>
              </div>

              {/* Right Mini Sprint Dashboard */}
              <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-black/60 p-5 font-mono text-xs text-white/80 space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[11px] text-white/40">
                  <span>ACTIVE_SPRINT_CYCLE</span>
                  <span className="text-emerald-400 font-bold">VELOCITY_OPTIMAL</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/60">Sprint Cadence:</span>
                  <span className="text-white/90 font-bold">14-Day Predictable Sprints</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/60">PR Review Time:</span>
                  <span className="text-emerald-400 font-bold">&lt; 2 Hours Average</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/60">Engagement Model:</span>
                  <span className="text-[#e9800a] font-bold">3 - 12 Month Flexible Pods</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
