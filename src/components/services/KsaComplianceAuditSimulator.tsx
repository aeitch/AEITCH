"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Sliders,
  ShieldCheck,
  ArrowRight,
  Clock,
  KeyRound,
  FileCheck,
  Server,
  Zap,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

type CloudTarget = 'aws-ksa' | 'azure-ksa' | 'gcp-ksa' | 'multi-cloud';
type MaturityLevel = 'baseline' | 'intermediate' | 'advanced';
type RegulatoryScope = 'nca-ecc' | 'nca-ccc-pdpl' | 'sama-fintech';

interface SimulationResult {
  timelineEn: string;
  timelineAr: string;
  automatedCoverage: string;
  criticalGapsClosedEn: string[];
  criticalGapsClosedAr: string[];
  podStructureEn: string;
  podStructureAr: string;
  coreDeliverablesEn: string[];
  coreDeliverablesAr: string[];
}

const SIMULATION_MATRIX: Record<MaturityLevel, Record<RegulatoryScope, SimulationResult>> = {
  baseline: {
    'nca-ecc': {
      timelineEn: '4 - 6 Weeks Fast-Track Sprint',
      timelineAr: '4 - 6 أسابيع في سبرنت مكثف',
      automatedCoverage: '92% Automated Compliance',
      criticalGapsClosedEn: [
        'Elimination of static database credentials and developer access keys',
        'Automated SAST & container vulnerability gate in GitHub Actions / GitLab',
        'NCA ECC-1:2018 Essential Controls baseline validation dossier',
      ],
      criticalGapsClosedAr: [
        'إنهاء كامل لكلمات المرور ومفاتيح الوصول الثابتة للمطورين',
        'بوابة فحص أمني تلقائي للكود والحاويات في خطوط CI/CD',
        'ملف إثبات الامتثال لضوابط الهيئة الوطنية للأمن السيبراني ECC-1:2018',
      ],
      podStructureEn: '1 Lead DevSecOps Architect + 2 Cloud Security Engineers',
      podStructureAr: 'كبير معماريي DevSecOps + مهندسا أمن سحابي',
      coreDeliverablesEn: ['HashiCorp Vault Dynamic Secrets', 'CI/CD Trivy & SonarQube Gates', 'NCA ECC Policy Guardrails'],
      coreDeliverablesAr: ['إدارة أسرار ديناميكية عبر Vault', 'بوابات فحص Trivy و SonarQube', 'سياسات حوكمة كود متوافقة مع NCA'],
    },
    'nca-ccc-pdpl': {
      timelineEn: '6 - 8 Weeks Sovereign Hardening Sprint',
      timelineAr: '6 - 8 أسابيع للتحصين السيادي الكامل',
      automatedCoverage: '96% Automated Compliance',
      criticalGapsClosedEn: [
        'Complete network boundary isolation with default-deny VPC peering',
        'Saudi PDPL Class 3 field-level AES-256 envelope encryption with in-kingdom KMS',
        'Zero-trust tenant isolation with continuous multi-cloud CSPM drift alerting',
      ],
      criticalGapsClosedAr: [
        'عزل شبكي كامل لبيئات السحابة مع حظر منافذ الوصول العامة',
        'تشفير سيادي لبيانات PDPL الحساسة عبر مفاتيح KMS سعودية',
        'عزل تام للمستأجرين مع مراقبة مستمرة لانحراف إعدادات السحابة CSPM',
      ],
      podStructureEn: '1 Principal Sovereign Cyber Architect + 3 DevSecOps Specialists',
      podStructureAr: 'كبير معماريي الأمن السيبراني + 3 متخصصي DevSecOps',
      coreDeliverablesEn: ['KSA Cloud KMS Envelope Encryption', 'NCA CCC-1:2020 Terraform Sentinel', 'Continuous Multi-Cloud CSPM'],
      coreDeliverablesAr: ['تشفير مغلف عبر KMS سحابي محلي', 'حراس تيرفورم لضوابط CCC-1:2020', 'منظومة مراقبة أمن السحابة CSPM'],
    },
    'sama-fintech': {
      timelineEn: '8 - 10 Weeks Banking-Grade Sprint',
      timelineAr: '8 - 10 أسابيع للمستوى المصرفي والمالي',
      automatedCoverage: '98% Automated Compliance',
      criticalGapsClosedEn: [
        'Dual-custody secret leasing with 15-minute maximum TTL',
        'Immutable cryptographic audit trails stored in WORM storage enclaves',
        'Automated 24-hour vulnerability remediation SLA and air-gapped staging',
      ],
      criticalGapsClosedAr: [
        'حيازة مزدوجة للأسرار المصرفية مع مهلة لا تتعدى 15 دقيقة',
        'سجلات تدقيق مشفرة وغير قابلة للتعديل مخزنة في بيئات WORM',
        'اتفاقية معالجة الثغرات خلال 24 ساعة وبيئات اختبار معزولة تماماً',
      ],
      podStructureEn: '1 Principal Financial Security Architect + 3 Senior SecOps Engineers',
      podStructureAr: 'كبير معماريي أمن الأنظمة المالية + 3 مهندسي عمليات أمنية',
      coreDeliverablesEn: ['FIPS 140-3 HSM Master Enclave', 'SAMA Cyber Framework Evidence Dossier', 'Zero-Trust Istio mTLS Mesh'],
      coreDeliverablesAr: ['وحدات تشفير FIPS 140-3 HSM', 'ملف أدلة إثبات معايير البنك المركزي SAMA', 'شبكة اتصالات مشفرة عبر Istio mTLS'],
    },
  },
  intermediate: {
    'nca-ecc': {
      timelineEn: '3 - 4 Weeks Acceleration Sprint',
      timelineAr: '3 - 4 أسابيع في سبرنت تسريع',
      automatedCoverage: '94% Automated Compliance',
      criticalGapsClosedEn: [
        'Transitioning from static env secrets to HashiCorp Vault dynamic tokens',
        'Automated Open Policy Agent (OPA) pull request block gates',
        'Zero manual documentation: instant export of NCA compliance binders',
      ],
      criticalGapsClosedAr: [
        'الانتقال من الأسرار الثابتة إلى أسرار Vault المؤقتة تلقائياً',
        'دمج بوابات OPA البرمجية لمنع دمج أي كود غير متوافق',
        'إلغاء التوثيق اليدوي: تصدير فوري لملفات امتثال NCA',
      ],
      podStructureEn: '1 Lead DevSecOps Architect + 1 Senior Security Engineer',
      podStructureAr: 'قائد DevSecOps + مهندس أمن سحابي متقدم',
      coreDeliverablesEn: ['Vault AppRole OIDC Integration', 'OPA Rego Policy Repository', 'Automated CISO Compliance Dashboard'],
      coreDeliverablesAr: ['تكامل Vault عبر بروتوكول OIDC', 'مستودع سياسات OPA Rego', 'لوحة تحكم CISO المؤتمتة للامتثال'],
    },
    'nca-ccc-pdpl': {
      timelineEn: '4 - 6 Weeks Sovereign Alignment Sprint',
      timelineAr: '4 - 6 أسابيع للمواءمة السيادية',
      automatedCoverage: '97% Automated Compliance',
      criticalGapsClosedEn: [
        'Cryptographic hardware envelope isolation for customer PII',
        'Enforcing in-kingdom data residency across all cloud egress points',
        'Automated remediation for cloud infrastructure drift under 60 seconds',
      ],
      criticalGapsClosedAr: [
        'عزل تشفيري متقدم للبيانات الشخصية الحساسة للمستخدمين',
        'فرض إقامة البيانات داخل المملكة ومنع التدفقات غير المصرح بها',
        'معالجة آلية فورية لأي انحراف في إعدادات السحابة خلال أقل من دقيقة',
      ],
      podStructureEn: '1 Lead DevSecOps Architect + 2 Cloud Compliance Engineers',
      podStructureAr: 'قائد DevSecOps + مهندسا امتثال سحابي',
      coreDeliverablesEn: ['In-Kingdom KMS Envelope Encryption', 'Cloud Custodian / CSPM Rules', 'Saudi PDPL RoPA Export Engine'],
      coreDeliverablesAr: ['تشفير مغلف عبر KMS داخل المملكة', 'قواعد CSPM للمراقبة المستمرة', 'منظومة تصدير سجلات معالجة البيانات'],
    },
    'sama-fintech': {
      timelineEn: '6 - 8 Weeks Banking Hardening Sprint',
      timelineAr: '6 - 8 أسابيع لتحصين المنظومة المالية',
      automatedCoverage: '99% Automated Compliance',
      criticalGapsClosedEn: [
        'High-security dual control approval workflows for production deployments',
        'Real-time automated evidence streaming to enterprise SIEM and SOC',
        'Automated compliance regression testing on every production release',
      ],
      criticalGapsClosedAr: [
        'سير عمل بموافقة مزدوجة لعمليات النشر في بيئات الإنتاج الحساسة',
        'بث فوري لأدلة الامتثال وسجلات الأمان إلى منصات SIEM و SOC',
        'اختبارات انحدار أمنية آلية مع كل إصدار جديد للأنظمة المصرفية',
      ],
      podStructureEn: '1 Staff Financial Security Architect + 2 DevSecOps Engineers',
      podStructureAr: 'كبير مهندسي أمن مالي + مهندسا DevSecOps',
      coreDeliverablesEn: ['SAMA CSF Automated Audit Engine', 'Dynamic DB Rotation & Lease Monitor', 'Hardened Container Base Images'],
      coreDeliverablesAr: ['محرك تدقيق آلي لمعايير SAMA CSF', 'مراقبة وتدوير أسرار قواعد البيانات', 'صور حاويات محصنة ضد الثغرات'],
    },
  },
  advanced: {
    'nca-ecc': {
      timelineEn: '2 - 3 Weeks Fast-Pass Certification Sprint',
      timelineAr: '2 - 3 أسابيع لسبرنت الاعتماد السريع',
      automatedCoverage: '98% Automated Compliance',
      criticalGapsClosedEn: [
        'Complete policy-as-code coverage for remaining legacy microservices',
        'Automated OSCAL-compliant continuous compliance reporting',
        'Self-healing IAM and secret leases with automated revocation',
      ],
      criticalGapsClosedAr: [
        'تغطية برمجية كاملة للخدمات المصغرة المتبقية عبر السياسات ككود',
        'تقارير امتثال مستمرة بتنسيق OSCAL القياسي الدولي',
        'معالجة ذاتية لصلاحيات IAM والأسرار منتهية الصلاحية',
      ],
      podStructureEn: '1 Lead DevSecOps Architect + 1 Cloud Automation Engineer',
      podStructureAr: 'قائد DevSecOps + مهندس أتمتة سحابية',
      coreDeliverablesEn: ['OSCAL Compliance Dossier', 'Zero-Trust IAM Guardrails', 'Self-Healing Security Runbooks'],
      coreDeliverablesAr: ['ملف امتثال OSCAL المعتمد', 'حواجز IAM بمفهوم الثقة الصفرية', 'كتيبات تشغيل برمجية للمعالجة الذاتية'],
    },
    'nca-ccc-pdpl': {
      timelineEn: '3 - 5 Weeks Full Sovereign Mastery Sprint',
      timelineAr: '3 - 5 أسابيع للسيادة الرقمية المتكاملة',
      automatedCoverage: '99% Automated Compliance',
      criticalGapsClosedEn: [
        'Zero-trust hardware security module cryptographic offloading',
        'Real-time egress DPI filtering preventing any cross-border PII leakage',
        'Automated regulatory audit trail sync to sovereign authorities',
      ],
      criticalGapsClosedAr: [
        'تفريغ تشفيري لوحدات HSM بمفهوم انعدام الثقة',
        'فحص عميق للشبكة لمنع أي تسريب للبيانات الشخصية خارج المملكة',
        'مزامنة فورية لسجلات التدقيق مع متطلبات الجهات التنظيمية',
      ],
      podStructureEn: '1 Principal DevSecOps Architect + 2 Senior Cloud Engineers',
      podStructureAr: 'كبير معماريي DevSecOps + مهندسا سحابة متقدمان',
      coreDeliverablesEn: ['Dedicated In-Kingdom HSM Enclaves', 'Real-Time Egress Packet Filter', 'Automated Sovereign Audit Portal'],
      coreDeliverablesAr: ['بيئات HSM سحابية محلية مخصصة', 'مرشح فحص فوري لحزم البيانات الصادرة', 'بوابة تدقيق سيادية مؤتمتة'],
    },
    'sama-fintech': {
      timelineEn: '4 - 6 Weeks Elite Financial Benchmark Sprint',
      timelineAr: '4 - 6 أسابيع للتميز المصرفي الشامل',
      automatedCoverage: '100% Automated Compliance',
      criticalGapsClosedEn: [
        'Zero human access to production database credentials and keys',
        'Cryptographically signed container provenance and SBOM attestation',
        'Full financial-grade fault tolerance with sub-second secret rollover',
      ],
      criticalGapsClosedAr: [
        'انعدام الوصول البشري تماماً لمفاتيح وقواعد بيانات الإنتاج',
        'توقيع رقمي موثق لسلسلة توريد البرمجيات (SBOM) والحاويات',
        'صمود مالي فائق مع تبديل تلقائي للأسرار بأجزاء من الثانية',
      ],
      podStructureEn: '1 Principal Financial SecOps Architect + 2 Senior SREs',
      podStructureAr: 'كبير معماريي الأمن المالي + مهندسا SRE متقدمان',
      coreDeliverablesEn: ['Sigstore / Cosign Image Attestation', 'Automated SAMA Inspection Dossier', 'Zero-Knowledge Vault Federation'],
      coreDeliverablesAr: ['توثيق صور الحاويات عبر Cosign', 'ملف فحص جاهز للبنك المركزي SAMA', 'اتحاد سحابي للأسرار دون مشاركة المفاتيح'],
    },
  },
};

export function KsaComplianceAuditSimulator() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';

  const [cloud, setCloud] = useState<CloudTarget>('aws-ksa');
  const [maturity, setMaturity] = useState<MaturityLevel>('intermediate');
  const [scope, setScope] = useState<RegulatoryScope>('nca-ccc-pdpl');

  const result = SIMULATION_MATRIX[maturity][scope];

  return (
    <section className="relative py-24 sm:py-32 bg-[#09090b] text-white overflow-hidden border-b border-white/10" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1f1508]/30 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-3.5 py-1.5 text-xs font-mono font-semibold text-[#e9800a] mb-4">
            <Sliders className="h-3.5 w-3.5" />
            <span>{isAr ? 'محاكي الفجوات الأمنية وسرعة الامتثال' : 'CISO GAP ANALYSIS & REMEDIATION SIMULATOR'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            {isAr ? 'حساب جدول سبرنت الامتثال السيادي لمؤسستك' : 'Calculate Your Sovereign Compliance Sprint'}
          </h2>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            {isAr
              ? 'اختر بيئتك السحابية ونضج ممارساتك الحالية واللوائح المستهدفة لمعاينة خطة المعالجة الفورية، وتوزيع الفريق الهندسي، وحجم الأتمتة المنجزة.'
              : 'Select your cloud environment, current security maturity, and target regulatory framework to project remediation timelines, dedicated pod structure, and automated coverage.'}
          </p>
        </div>

        {/* Simulator Grid (Left: Inputs, Right: Live Results) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-[#0d0d10] p-6 sm:p-8 space-y-8">
            {/* Input 1: Cloud Environment */}
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
                {isAr ? '1. البيئة السحابية المستهدفة' : '1. Cloud Infrastructure Environment'}
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'aws-ksa', label: 'AWS Riyadh (me-central-1)' },
                  { id: 'azure-ksa', label: 'Azure Saudi Arabia' },
                  { id: 'gcp-ksa', label: 'Google Cloud Dammam' },
                  { id: 'multi-cloud', label: 'Hybrid / Multi-Cloud' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCloud(item.id as CloudTarget)}
                    className={`font-mono text-xs p-3 rounded-xl border text-start transition-all ${
                      cloud === item.id
                        ? 'border-[#e9800a] bg-[#e9800a]/10 text-white font-bold'
                        : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Current Security Maturity */}
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
                {isAr ? '2. مستوى نضج الأمان الحالي' : '2. Current DevSecOps Posture'}
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: 'baseline',
                    titleEn: 'Baseline (Manual Audits & Static Keys)',
                    titleAr: 'مستوى تأسيسي (فحوصات يدوية ومفاتيح ثابتة)',
                  },
                  {
                    id: 'intermediate',
                    titleEn: 'Intermediate (CI/CD Scans, Needs Vault & OPA)',
                    titleAr: 'مستوى متوسط (فحص CI/CD، بحاجة لـ Vault و OPA)',
                  },
                  {
                    id: 'advanced',
                    titleEn: 'Advanced (K8s / GitOps, Needs NCA Policy-as-Code)',
                    titleAr: 'مستوى متقدم (كوبرنيتس و GitOps، بحاجة لضوابط NCA البرمجية)',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setMaturity(item.id as MaturityLevel)}
                    className={`w-full font-mono text-xs p-3.5 rounded-xl border text-start transition-all flex items-center justify-between ${
                      maturity === item.id
                        ? 'border-[#e9800a] bg-[#e9800a]/10 text-white font-bold'
                        : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20'
                    }`}
                  >
                    <span>{isAr ? item.titleAr : item.titleEn}</span>
                    {maturity === item.id && <span className="h-2 w-2 rounded-full bg-[#e9800a]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 3: Target Regulatory Mandate */}
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
                {isAr ? '3. اللوائح والمعايير المستهدفة' : '3. Target Regulatory Framework'}
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: 'nca-ecc',
                    titleEn: 'NCA ECC-1:2018 (Essential Cybersecurity Baseline)',
                    titleAr: 'ضوابط الأمن السيبراني الأساسية NCA ECC-1:2018',
                  },
                  {
                    id: 'nca-ccc-pdpl',
                    titleEn: 'Full Cloud CCC-1:2020 & Saudi PDPL Class 3',
                    titleAr: 'ضوابط السحابة CCC-1:2020 ونظام حماية البيانات PDPL',
                  },
                  {
                    id: 'sama-fintech',
                    titleEn: 'SAMA Cyber Security Framework (Banking Grade)',
                    titleAr: 'إطار الأمن السيبراني للبنك المركزي SAMA (مصرفي)',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setScope(item.id as RegulatoryScope)}
                    className={`w-full font-mono text-xs p-3.5 rounded-xl border text-start transition-all flex items-center justify-between ${
                      scope === item.id
                        ? 'border-[#e9800a] bg-[#e9800a]/10 text-white font-bold'
                        : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20'
                    }`}
                  >
                    <span>{isAr ? item.titleAr : item.titleEn}</span>
                    {scope === item.id && <span className="h-2 w-2 rounded-full bg-[#e9800a]" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Dynamic Output Card (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-white/15 bg-gradient-to-br from-[#121115] to-[#0a0a0c] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 end-0 -mt-10 -me-10 h-72 w-72 rounded-full bg-[#e9800a]/10 blur-[120px] pointer-events-none" />

            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#e9800a] font-bold block mb-1">
                  PROJECTED SPRINT BLUEPRINT
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {isAr ? 'خطة سبرنت الامتثال والتحصين السيبراني' : 'Sovereign Compliance & Hardening Plan'}
                </h3>
              </div>

              <div className="font-mono text-xs px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-bold">
                {result.automatedCoverage}
              </div>
            </div>

            {/* Key Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-center gap-2 text-white/50 font-mono text-xs mb-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#e9800a]" />
                  <span>{isAr ? 'المدة التقديرية للإنجاز' : 'Estimated Remediation Velocity'}</span>
                </div>
                <span className="text-lg sm:text-xl font-bold text-white block">
                  {isAr ? result.timelineAr : result.timelineEn}
                </span>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-center gap-2 text-white/50 font-mono text-xs mb-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{isAr ? 'فريق العمل المخصص' : 'Dedicated Engineering Pod'}</span>
                </div>
                <span className="text-sm sm:text-base font-bold text-white block">
                  {isAr ? result.podStructureAr : result.podStructureEn}
                </span>
              </div>
            </div>

            {/* Critical Security Gaps Closed */}
            <div className="mb-8">
              <span className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-3">
                {isAr ? 'الثغرات الحرجة التي سيتم إغلاقها برمجياً:' : 'Critical Security Gaps Closed Programmatically:'}
              </span>
              <div className="space-y-2.5">
                {(isAr ? result.criticalGapsClosedAr : result.criticalGapsClosedEn).map((gap, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{gap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tangible Deliverables */}
            <div className="mb-8 pt-6 border-t border-white/10">
              <span className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-3">
                {isAr ? 'المخرجات والأصول البرمجية المسلمة بالكامل:' : 'Core IaC Deliverables & Artifacts Handed Over:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {(isAr ? result.coreDeliverablesAr : result.coreDeliverablesEn).map((item, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-white/90"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-mono text-xs text-white/50 text-center sm:text-start">
                {isAr ? '100% ملكية تامة لكود تيرفورم وسياسات الأمان' : '100% Day-1 Ownership of All IaC & Policies'}
              </span>
              <Link
                href="/contact-us"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#e9800a] px-6 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-all shadow-[0_0_20px_rgba(233,128,10,0.3)] active:scale-[0.98]"
              >
                <span>{isAr ? 'احجز تدقيق الامتثال السيادي' : 'Book Sovereign DevSecOps Audit'}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
