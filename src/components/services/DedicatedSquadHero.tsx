"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Users,
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

// Dynamically import the 3D WebGL component with SSR disabled
const DedicatedSquadMesh3D = dynamic(
  () => import('@/components/3d/DedicatedSquadMesh3D').then((mod) => mod.DedicatedSquadMesh3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[380px] sm:h-[440px] lg:h-[500px] flex items-center justify-center rounded-3xl border border-white/10 bg-black/40">
        <div className="flex items-center gap-2.5 font-mono text-xs text-white/50">
          <span className="h-2 w-2 rounded-full bg-[#e9800a] animate-pulse" />
          <span>Initializing 3D Dedicated Squad Mesh...</span>
        </div>
      </div>
    ),
  }
);

export function DedicatedSquadHero() {
  const { locale, direction } = useTranslation();
  const [activeRole, setActiveRole] = useState<string>('us-architect');

  const isAr = locale === 'ar';

  const roleTabs = [
    { id: 'us-architect', labelEn: 'US Principal Architect', labelAr: 'كبير معماريي النظم (أمريكا)' },
    { id: 'riyadh-lead', labelEn: 'Riyadh Delivery Lead', labelAr: 'قائد الإنجاز (الرياض)' },
    { id: 'staff-devops', labelEn: 'Staff Platform Lead', labelAr: 'قائد المنصة والبنية' },
    { id: 'senior-fullstack', labelEn: 'Senior Full-Stack', labelAr: 'مهندسو البرمجيات' },
    { id: 'qa-security', labelEn: 'QA & Security Lead', labelAr: 'قائد الجودة والأمان' },
  ];

  return (
    <section
      className="relative min-h-[85vh] w-full flex items-center overflow-hidden bg-[#080808] pt-28 pb-20 border-b border-white/10"
      dir={direction}
    >
      {/* 1. Midnight Luxury Background Dynamics */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1d1408]/40 via-[#0a0a0c] to-[#080808]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Ambient Core Lighting */}
      <div className="pointer-events-none absolute top-1/4 start-1/4 h-[420px] w-[500px] rounded-full bg-[#e9800a]/12 blur-[170px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Narrative & Executive Telemetry (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Top Sovereign Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-4 py-1.5 backdrop-blur-md mb-6 w-fit shadow-[inset_0_1px_0_rgba(233,128,10,0.2)]">
              <Users className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                {isAr
                  ? 'الفرق الهندسية المخصصة • توقيت الرياض GMT+3'
                  : 'DEDICATED MANAGED SQUADS • RIYADH GMT+3'}
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
              {isAr ? (
                <>
                  فرق هندسية متكاملة تعمل بتوقيت الرياض وتحت إشراف معايير{' '}
                  <span className="text-[#e9800a]">وادي السيليكون.</span>
                </>
              ) : (
                <>
                  Dedicated Engineering Pods Operating in Your Time Zone (GMT+3) Under{' '}
                  <span className="text-[#e9800a]">Silicon Valley Oversight.</span>
                </>
              )}
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl mb-8">
              {isAr
                ? 'ضاعف سرعة بناء منتجاتك الرقمية مع فرق هندسية متخصصة ومستقلة تعمل من الأحد إلى الخميس بتوقيت الرياض. وصول مباشر للمهندسين عبر سلاك وجيت هب، مع إشراف معماري صارم وملكية تامة للكود من اليوم الأول.'
                : 'Scale your product velocity with senior, autonomous engineering pods operating Sunday through Thursday on Riyadh business hours. Direct Slack & GitHub integration, US architectural rigor, and 100% Day-1 IP ownership without domestic agency inflation.'}
            </p>

            {/* In-Kingdom Operating Signals Strip */}
            <div className="flex flex-wrap items-center gap-2.5 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-wider text-white/40 block w-full mb-1">
                {isAr ? 'معايير التشغيل والجاهزية المؤسسية:' : 'Operating Standards & Enterprise Alignment:'}
              </span>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>100% GMT+3 Overlap (Sun-Thu)</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Sub-10 Business Days Deployment</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e9800a] animate-pulse" />
                <span>Zero Account Manager Middlemen</span>
              </div>
            </div>

            {/* Primary Action Controls */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-6 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-all shadow-[0_0_25px_rgba(233,128,10,0.35)] active:scale-[0.98]"
              >
                <span>{isAr ? 'تخصيص الفريق وحساب التكلفة' : 'Configure Dedicated Squad'}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#sprint-cadence"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/[0.08] hover:border-white/30 transition-all active:scale-[0.98]"
              >
                <span>{isAr ? 'استكشف وتيرة السبرنت' : 'Inspect Sprint Cadence'}</span>
              </a>
            </div>

            {/* Audited Engineering Telemetry */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div>
                <span className="block font-mono text-xs text-white/50 mb-1">
                  {isAr ? 'التزامن الزمني' : 'Timezone Overlap'}
                </span>
                <span className="font-mono text-lg font-bold text-white tracking-tight">100% GMT+3</span>
                <span className="block text-[11px] text-white/40 mt-0.5">
                  {isAr ? 'الأحد إلى الخميس' : 'Sun–Thu 9AM–6PM AST'}
                </span>
              </div>
              <div>
                <span className="block font-mono text-xs text-white/50 mb-1">
                  {isAr ? 'سرعة التعيين' : 'Deployment Velocity'}
                </span>
                <span className="font-mono text-lg font-bold text-emerald-400 tracking-tight">&lt; 10 Days</span>
                <span className="block text-[11px] text-white/40 mt-0.5">
                  {isAr ? 'من العقد إلى السبرنت 1' : 'Contract to Active Sprint'}
                </span>
              </div>
              <div>
                <span className="block font-mono text-xs text-white/50 mb-1">
                  {isAr ? 'ملكية الملكية الفكرية' : 'IP Protection'}
                </span>
                <span className="font-mono text-lg font-bold text-[#e9800a] tracking-tight">100% Day-1</span>
                <span className="block text-[11px] text-white/40 mt-0.5">
                  {isAr ? 'دفع مباشر لمستودعاتك' : 'Direct Push to Your Git'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D WebGL Dedicated Squad Mesh (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-3 sm:p-4 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              {/* Top Bar Indicators */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-3 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#e9800a] animate-ping" />
                  <span className="text-white/80 font-bold">MANAGED_POD_MESH</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/40">
                  <Clock className="h-3 w-3 text-emerald-400" />
                  <span>GMT+3 ACTIVE • ZERO FRICTION</span>
                </div>
              </div>

              {/* 3D WebGL Canvas */}
              <DedicatedSquadMesh3D
                className="w-full h-[360px] sm:h-[420px] lg:h-[460px]"
                activeRoleId={activeRole}
                onSelectRole={setActiveRole}
              />

              {/* Role Navigation Pills */}
              <div className="mt-3 pt-3 border-t border-white/10">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2 px-1">
                  {isAr ? 'أدوار الفريق المتخصصة (انقر للمعاينة):' : 'Autonomous Pod Disciplines (Click to Focus):'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {roleTabs.map((tab) => {
                    const isActive = activeRole === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveRole(tab.id)}
                        className={`font-mono text-[11px] px-2.5 py-1 rounded-lg transition-all ${
                          isActive
                            ? 'bg-[#e9800a] text-black font-bold shadow-[0_0_12px_rgba(233,128,10,0.4)]'
                            : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5'
                        }`}
                      >
                        {isAr ? tab.labelAr : tab.labelEn}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
