"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  ShieldCheck,
  ArrowRight,
  Lock,
  FileCheck,
  Terminal,
  Activity,
  Server,
  Zap,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

// Dynamically import the 3D WebGL component with SSR disabled
const SovereignSecurityVault3D = dynamic(
  () => import('@/components/3d/SovereignSecurityVault3D').then((mod) => mod.SovereignSecurityVault3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[380px] sm:h-[440px] lg:h-[500px] flex items-center justify-center rounded-3xl border border-white/10 bg-black/40">
        <div className="flex items-center gap-2.5 font-mono text-xs text-white/50">
          <span className="h-2 w-2 rounded-full bg-[#e9800a] animate-pulse" />
          <span>Initializing 3D Sovereign Security Vault...</span>
        </div>
      </div>
    ),
  }
);

export function DevSecOpsHero() {
  const { locale, direction } = useTranslation();
  const [activeControl, setActiveControl] = useState<string>('vault-core');

  const isAr = locale === 'ar';

  const controlTabs = [
    { id: 'vault-core', labelEn: 'Vault Dynamic Secrets', labelAr: 'أسرار Vault الديناميكية' },
    { id: 'sast-pipeline', labelEn: 'Shift-Left CI/CD Gate', labelAr: 'بوابات فحص الكود المبكر' },
    { id: 'nca-ecc', labelEn: 'NCA ECC Policy-as-Code', labelAr: 'حوكمة NCA البرمجية' },
    { id: 'pdpl-cipher', labelEn: 'Saudi PDPL Sovereign HSM', labelAr: 'تشفير PDPL السيادي' },
    { id: 'cspm-audit', labelEn: 'Continuous CSPM', labelAr: 'مراقبة أمن السحابة المستمرة' },
  ];

  return (
    <section
      className="relative min-h-[85vh] w-full flex items-center overflow-hidden bg-[#080808] pt-28 pb-20 border-b border-white/10"
      dir={direction}
    >
      {/* 1. Midnight Luxury Background Dynamics */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1f1408]/40 via-[#0a0a0c] to-[#080808]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Ambient Core Lighting */}
      <div className="pointer-events-none absolute top-1/4 start-1/4 h-[420px] w-[500px] rounded-full bg-[#e9800a]/12 blur-[170px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Asymmetric Narrative & Executive Signals (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Top Sovereign Cybersecurity Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-4 py-1.5 backdrop-blur-md mb-6 w-fit shadow-[inset_0_1px_0_rgba(233,128,10,0.2)]">
              <ShieldCheck className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                {isAr
                  ? 'الأمن السيبراني والامتثال الوطني السعودي DEVSECOPS'
                  : 'DEVSECOPS & SAUDI CYBERSECURITY SOVEREIGNTY'}
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
              {isAr ? (
                <>
                  أمن سيبراني استباقي متوافق مع ضوابط{' '}
                  <span className="text-[#e9800a]">NCA ونظام حماية البيانات PDPL.</span>
                </>
              ) : (
                <>
                  Shift-Left Security Aligned with Saudi{' '}
                  <span className="text-[#e9800a]">NCA & PDPL Mandates.</span>
                </>
              )}
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl mb-8">
              {isAr
                ? 'ندمج فحوصات الأمان آلياً في صميم خطوط نشر البرمجيات. إدارة أسرار بدون مفاتيح ثابتة عبر HashiCorp Vault، فحص مبكر للثغرات البرمجية، وتشفير سيادي للبيانات الحساسة داخل المملكة.'
                : 'We embed automated security controls directly into deployment pipelines. Zero hardcoded secrets with dynamic HashiCorp Vault leasing, continuous SAST/SCA scanning, and airtight in-kingdom cryptographic data isolation.'}
            </p>

            {/* Regulatory Compliance Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-wider text-white/40 block w-full mb-1">
                {isAr ? 'الامتثال للمعايير التنظيمية السيادية بالمملكة:' : 'Audited Compliance Frameworks & Sovereign Standards:'}
              </span>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>NCA ECC-1:2018</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>NCA CCC-1:2020</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e9800a] animate-pulse" />
                <span>Saudi PDPL Class 3</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>SAMA Cyber Framework</span>
              </div>
            </div>

            {/* Primary Action Controls */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-6 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-all shadow-[0_0_25px_rgba(233,128,10,0.35)] active:scale-[0.98]"
              >
                <span>{isAr ? 'طلب تقييم الامن السيبراني والامتثال' : 'Request DevSecOps Compliance Audit'}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#compliance-matrix"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/[0.08] hover:border-white/30 transition-all active:scale-[0.98]"
              >
                <span>{isAr ? 'مصفوفة ضوابط الهيئة الوطنية NCA' : 'Inspect NCA Compliance Matrix'}</span>
              </a>
            </div>

            {/* Audited Engineering Telemetry */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div>
                <span className="block font-mono text-xs text-white/50 mb-1">
                  {isAr ? 'صلاحية الأسرار (TTL)' : 'Secret TTL'}
                </span>
                <span className="font-mono text-lg font-bold text-white tracking-tight">&lt; 15 Mins</span>
                <span className="block text-[11px] text-white/40 mt-0.5">
                  {isAr ? 'تجديد دوري تلقائي' : 'Ephemeral Dynamic Leases'}
                </span>
              </div>
              <div>
                <span className="block font-mono text-xs text-white/50 mb-1">
                  {isAr ? 'حاجز فحص CI/CD' : 'Pipeline Scan Gate'}
                </span>
                <span className="font-mono text-lg font-bold text-emerald-400 tracking-tight">0 Critical CVE</span>
                <span className="block text-[11px] text-white/40 mt-0.5">
                  {isAr ? 'حظر تلقائي للثغرات' : 'Strict Commit Blocker'}
                </span>
              </div>
              <div>
                <span className="block font-mono text-xs text-white/50 mb-1">
                  {isAr ? 'سيادة البيانات' : 'In-Kingdom Isolation'}
                </span>
                <span className="font-mono text-lg font-bold text-[#e9800a] tracking-tight">100% KSA</span>
                <span className="block text-[11px] text-white/40 mt-0.5">
                  {isAr ? 'مراكز بيانات الرياض/الدمام' : 'Riyadh & Dammam Hyperscalers'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Sovereign Security Vault (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-3 sm:p-4 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              {/* Top Bar Indicators */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-3 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#e9800a] animate-ping" />
                  <span className="text-white/80 font-bold">SOVEREIGN_CYBER_VAULT</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/40">
                  <Lock className="h-3 w-3 text-[#e9800a]" />
                  <span>AES-256-GCM • HSM ACTIVE</span>
                </div>
              </div>

              {/* 3D WebGL Canvas */}
              <SovereignSecurityVault3D
                className="w-full h-[360px] sm:h-[420px] lg:h-[460px]"
                activeControlId={activeControl}
                onSelectControl={setActiveControl}
              />

              {/* Control Selector Navigation Tabs */}
              <div className="mt-3 pt-3 border-t border-white/10">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2 px-1">
                  {isAr ? 'عقد الأمن السيبراني التفاعلية (انقر للتدوير):' : 'Interactive Cyber Nodes (Click to Inspect):'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {controlTabs.map((tab) => {
                    const isActive = activeControl === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveControl(tab.id)}
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
