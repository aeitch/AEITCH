"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cloud,
  ShieldCheck,
  Building2,
  CreditCard,
  Layers,
  ArrowRight,
  Lock,
  Server,
  Activity,
  CheckCircle2,
  Cpu,
  Database,
  Terminal,
  Zap,
  Check,
  ExternalLink,
  ChevronRight,
  FileCheck2,
  ShieldAlert,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

// 1. Hyperscaler Specs Data
interface HyperscalerData {
  id: 'gcp' | 'azure' | 'aws' | 'oracle';
  name: string;
  nameAr: string;
  regionCode: string;
  location: string;
  locationAr: string;
  zones: string;
  zonesAr: string;
  focus: string;
  focusAr: string;
  dataSovereignty: string;
  dataSovereigntyAr: string;
  encryption: string;
  badge: string;
}

const HYPERSCALERS: HyperscalerData[] = [
  {
    id: 'gcp',
    name: 'Google Cloud Dammam',
    nameAr: 'جوجل كلاود - منطقة الدمام',
    regionCode: 'me-central2',
    location: 'Dammam, Eastern Province',
    locationAr: 'الدمام، المنطقة الشرقية',
    zones: '3 Availability Zones (Multi-AZ)',
    zonesAr: '3 نطاقات توافر متوازية',
    focus: 'In-Kingdom Analytics, BigQuery Sovereign Pods & Kubernetes (GKE)',
    focusAr: 'تحليلات بيانات سيادية داخل المملكة، أتمتة كوبرنيتيس ونظم بيغ كويري',
    dataSovereignty: '100% In-Kingdom Data Residency (Zero Cross-Border Egress)',
    dataSovereigntyAr: 'إقامة كاملة للبيانات داخل المملكة مع منع النقل عبر الحدود',
    encryption: 'CMEK Hardware HSM (AES-256-GCM)',
    badge: 'Dammam Region Active',
  },
  {
    id: 'azure',
    name: 'Microsoft Azure Riyadh',
    nameAr: 'مايكروسوفت أزور - منطقة الرياض',
    regionCode: 'saudiarabiacentral',
    location: 'Riyadh Central Hub',
    locationAr: 'الرياض، المنطقة الوسطى',
    zones: '3 Multi-AZ Active-Active Clusters',
    zonesAr: '3 مجموعات توافر نشطة-نشطة',
    focus: 'Enterprise Sovereign AKS, Active Directory & SAMA Core Banking',
    focusAr: 'حاويات كوبرنيتيس المؤسسية، حوكمة الهوية والخدمات المصرفية المتوافقة مع ساما',
    dataSovereignty: 'In-Kingdom Disaster Recovery & NDMO Boundary Enforced',
    dataSovereigntyAr: 'تعافي من الكوارث داخل المملكة وعزل سيادي معتمد من مكتب إدارة البيانات',
    encryption: 'Dedicated Managed HSM Keys',
    badge: 'Riyadh Region Active',
  },
  {
    id: 'aws',
    name: 'AWS Saudi Arabia',
    nameAr: 'أمازون ويب سيرفيسز - السعودية',
    regionCode: 'me-central-1',
    location: 'Riyadh Region Hub',
    locationAr: 'منطقة الرياض الرئيسية',
    zones: '3 Resilient Availability Zones',
    zonesAr: '3 نطاقات توافر فائقة المرونة',
    focus: 'Enterprise EKS, Direct Connect (STC / Mobily) & Serverless Mesh',
    focusAr: 'ربط مباشر عبر شبكات الاتصالات السعودية STC وموبايلي والبنى غير الخادمة',
    dataSovereignty: 'PrivateLink Zero-Egress VPC Endpoints',
    dataSovereigntyAr: 'نقاط اتصال سحابية معزولة بدون أي نفاذ للإنترنت الخارجي',
    encryption: 'AWS KMS with CloudHSM Root',
    badge: 'Saudi Region Active',
  },
  {
    id: 'oracle',
    name: 'Oracle Cloud Riyadh',
    nameAr: 'أوراكل كلاود - الرياض وجدة',
    regionCode: 'sa-riyadh-1',
    location: 'Riyadh & Jeddah Sovereign Zones',
    locationAr: 'نطاقات الرياض وجدة السيادية',
    zones: 'Dual-Region In-Country Failover',
    zonesAr: 'فائض تشغيلي بين مدينتين داخل المملكة',
    focus: 'Core Government SCADA, Industrial ERP & High-IOPS Database Clusters',
    focusAr: 'أنظمة إدارة الموارد الحكومية، قواعد بيانات فائق الأداء والأنظمة الصناعية',
    dataSovereignty: 'Class-3 Restricted Data Classification Aligned',
    dataSovereigntyAr: 'متوافق مع تصنيف البيانات الحساسة من الفئة الثالثة',
    encryption: 'Vault Dedicated HSM Keyrings',
    badge: 'Dual Region Active',
  },
];

export function KingdomFutureSection() {
  const { direction, locale } = useTranslation();
  const [selectedCloud, setSelectedCloud] = useState<'gcp' | 'azure' | 'aws' | 'oracle'>('gcp');
  const [activeTab, setActiveTab] = useState<'all' | 'cloud' | 'fintech' | 'giga' | 'migration'>('all');

  const activeHyperscaler = HYPERSCALERS.find((h) => h.id === selectedCloud) || HYPERSCALERS[0];

  return (
    <section
      id="vision-2030"
      className="relative py-20 sm:py-28 bg-[#000000] text-white overflow-hidden border-t border-white/10"
      dir={direction}
    >
      {/* Background Ambience: Architectural Blueprint Grid (Very Subtle, Midnight Luxury) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 end-0 -z-10 h-[600px] w-[600px] rounded-full bg-[#e9800a]/5 blur-[160px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 start-0 -z-10 h-[500px] w-[500px] rounded-full bg-white/[0.02] blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header: Swiss Typography & Asymmetric Clarity */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-[#e9800a] uppercase mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e9800a] inline-block" />
            {locale === 'ar' ? 'مستهدفات رؤية المملكة 2030 الهندسية' : 'SAUDI VISION 2030 ARCHITECTURAL MANDATES'}
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            {locale === 'ar' ? (
              <>
                معمارية سحابية سيادية مصممة{' '}
                <span className="text-[#e9800a]">لريادة المملكة الرقمية</span>
              </>
            ) : (
              <>
                Architected for the Kingdom’s{' '}
                <span className="text-[#e9800a]">Sovereign Digital Frontier</span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-white/70 leading-relaxed font-normal">
            {locale === 'ar'
              ? 'نتجاوز العروض التقديمية النظرية لنبني منصات برمجية فائقة التحمل متوافقة كلياً مع الضوابط الوطنية للسيادة الرقمية (NCA & PDPL) في مناطق السحابة المحلية بالرياض والدمام.'
              : 'Moving beyond theoretical consulting to engineer battle-tested platforms deployed strictly across in-Kingdom hyperscaler regions (Riyadh & Dammam), fully compliant with NCA ECC controls and Saudi PDPL data sovereignty mandates.'}
          </p>
        </div>

        {/* Tactical Filter Tabs (Bento Control Bar) */}
        <div className="flex flex-wrap items-center gap-2 mb-8 sm:mb-10 pb-4 border-b border-white/10">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-[#e9800a] text-black shadow-lg shadow-[#e9800a]/20'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            {locale === 'ar' ? 'كافة الركائز السيادية' : 'ALL ARCHITECTURAL DOMAINS'}
          </button>
          <button
            onClick={() => setActiveTab('cloud')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === 'cloud'
                ? 'bg-[#e9800a] text-black shadow-lg shadow-[#e9800a]/20'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            {locale === 'ar' ? 'السحابة المحلية والسيادة' : 'IN-COUNTRY HYPERSCALERS'}
          </button>
          <button
            onClick={() => setActiveTab('fintech')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === 'fintech'
                ? 'bg-[#e9800a] text-black shadow-lg shadow-[#e9800a]/20'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            {locale === 'ar' ? 'المصرفية المفتوحة (ساما)' : 'SAMA FINTECH & OPEN BANKING'}
          </button>
          <button
            onClick={() => setActiveTab('giga')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === 'giga'
                ? 'bg-[#e9800a] text-black shadow-lg shadow-[#e9800a]/20'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            {locale === 'ar' ? 'المشاريع الكبرى وإنترنت الأشياء' : 'GIGA-PROJECTS & IOT'}
          </button>
          <button
            onClick={() => setActiveTab('migration')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === 'migration'
                ? 'bg-[#e9800a] text-black shadow-lg shadow-[#e9800a]/20'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            {locale === 'ar' ? 'الهجرة وتحديث الأنظمة' : 'ENTERPRISE MIGRATION'}
          </button>
        </div>

        {/* 2. Bento Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* BENTO CARD 1: PRIMARY SHOWCASE (Span 7 on LG) -> In-Kingdom Hyperscaler Enablement */}
          {(activeTab === 'all' || activeTab === 'cloud') && (
            <div className={`rounded-3xl border border-white/10 bg-[#0d0d0d] p-6 sm:p-8 flex flex-col justify-between hover:border-[#e9800a]/40 transition-colors duration-300 ${
              activeTab === 'cloud' ? 'lg:col-span-12' : 'lg:col-span-7 md:col-span-2'
            }`}>
              <div>
                {/* Header Tag */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-[#e9800a] border border-white/10">
                      <Cloud className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#e9800a] tracking-wider uppercase">
                      {locale === 'ar' ? 'السيادة السحابية داخل المملكة' : 'IN-COUNTRY HYPERSCALER TOPOLOGY'}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#e9800a]/10 text-[#e9800a] border border-[#e9800a]/20">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    NCA ECC-1:2018 & PDPL
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight">
                  {locale === 'ar'
                    ? 'الاستضافة السحابية السيادية ومنع نقل البيانات خارج الحدود'
                    : 'In-Country Hyperscaler Enablement & Data Sovereignty'}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-6">
                  {locale === 'ar'
                    ? 'تصميم ونشر بيئات سحابية متقدمة داخل مناطق السحابة المعتمدة في المملكة لضمان بقاء البيانات الحساسة مشفرة ومستقرة تماماً داخل الحدود الوطنية.'
                    : 'Deploying mission-critical platforms strictly inside certified Saudi cloud regions to ensure all enterprise and sensitive citizen data never traverses international borders.'}
                </p>

                {/* Hyperscaler Selector Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                  {HYPERSCALERS.map((h) => {
                    const isSelected = selectedCloud === h.id;
                    return (
                      <button
                        key={h.id}
                        type="button"
                        onClick={() => setSelectedCloud(h.id)}
                        className={`rounded-xl border p-2.5 sm:p-3 text-start transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#e9800a] bg-white/10 text-white shadow-md'
                            : 'border-white/10 bg-white/[0.02] text-white/60 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <div className="text-[10px] font-mono text-[#e9800a] font-bold uppercase truncate">
                          {h.regionCode}
                        </div>
                        <div className="text-xs font-bold text-white mt-1 truncate">
                          {locale === 'ar' ? h.nameAr.split('-')[0] : h.name.split(' ')[0]}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Hyperscaler Topology Card */}
                <div className="rounded-2xl border border-white/10 bg-black/60 p-4 sm:p-6 mb-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <span className="text-xs font-mono text-white/50 block">
                        {locale === 'ar' ? 'المنطقة والموقع الجغرافي' : 'DESIGNATED CLOUD REGION'}
                      </span>
                      <span className="text-base font-bold text-white">
                        {locale === 'ar' ? activeHyperscaler.nameAr : activeHyperscaler.name}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#e9800a] bg-[#e9800a]/10 px-2.5 py-1 rounded-md border border-[#e9800a]/20">
                      {activeHyperscaler.regionCode}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="font-mono text-white/40 block mb-1">
                        {locale === 'ar' ? 'توزيع نطاقات التوافر:' : 'Availability Architecture:'}
                      </span>
                      <span className="font-semibold text-white/90">
                        {locale === 'ar' ? activeHyperscaler.zonesAr : activeHyperscaler.zones}
                      </span>
                    </div>
                    <div>
                      <span className="font-mono text-white/40 block mb-1">
                        {locale === 'ar' ? 'التشفير وحماية المفاتيح:' : 'Encryption & Key Vault:'}
                      </span>
                      <span className="font-semibold text-white/90">{activeHyperscaler.encryption}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="font-mono text-white/40 block mb-1">
                        {locale === 'ar' ? 'ضمان السيادة الرقمية (PDPL):' : 'Data Sovereignty Guarantee:'}
                      </span>
                      <span className="font-semibold text-[#e9800a]">
                        {locale === 'ar' ? activeHyperscaler.dataSovereigntyAr : activeHyperscaler.dataSovereignty}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Sovereign VPC Peering • Zero Cross-Border Routing</span>
                </div>
                <Link
                  href="/solutions/enterprise-cloud-migration"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e9800a] hover:text-white transition-colors"
                >
                  {locale === 'ar' ? 'استكشف حلول الهجرة السحابية' : 'Explore Sovereign Cloud Migration'}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* BENTO CARD 2: FINTECH & SAMA READY (Span 5 on LG) */}
          {(activeTab === 'all' || activeTab === 'fintech') && (
            <div className={`rounded-3xl border border-white/10 bg-[#0d0d0d] p-6 sm:p-8 flex flex-col justify-between hover:border-[#e9800a]/40 transition-colors duration-300 ${
              activeTab === 'fintech' ? 'lg:col-span-12' : 'lg:col-span-5 md:col-span-2'
            }`}>
              <div>
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-[#e9800a] border border-white/10">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#e9800a] tracking-wider uppercase">
                      {locale === 'ar' ? 'التقنية المالية والمصرفية' : 'FINTECH & BANKING'}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-white/60 bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
                    SAMA v2 Ready
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-white mb-2 leading-tight">
                  {locale === 'ar'
                    ? 'جاهزية المصرفية المفتوحة ومعيار ISO 20022'
                    : 'SAMA Open Banking & ISO 20022 Financial Rails'}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-6">
                  {locale === 'ar'
                    ? 'بنى برمجية مصغرة متوافقة مع أطر البنك المركزي السعودي (ساما) للمصرفية المفتوحة، معالجة رسائل ISO 20022 وتكامل الدفع عبر شبكة مدى وسداد.'
                    : 'Microservices engineered for Saudi Central Bank (SAMA) Open Banking frameworks, high-throughput ISO 20022 messaging, and low-latency mada/Sadad gateways.'}
                </p>

                {/* Financial Pipeline Stepper */}
                <div className="space-y-2.5 mb-6">
                  <div className="rounded-xl border border-white/10 bg-black/40 p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#e9800a]/10 text-[#e9800a] font-mono font-bold text-[11px]">
                        01
                      </span>
                      <span className="font-bold text-white">Payment Ingestion (mada / Apple Pay)</span>
                    </div>
                    <span className="font-mono text-[11px] text-emerald-400">&lt; 15ms</span>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/40 p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#e9800a]/10 text-[#e9800a] font-mono font-bold text-[11px]">
                        02
                      </span>
                      <span className="font-bold text-white">ISO 20022 Financial Parser (pacs.008)</span>
                    </div>
                    <span className="font-mono text-[11px] text-white/60">Strict Schema</span>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/40 p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#e9800a]/10 text-[#e9800a] font-mono font-bold text-[11px]">
                        03
                      </span>
                      <span className="font-bold text-white">SAMA FAPI 1.0 Advanced Security Gateway</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#e9800a]">mTLS Enforced</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-white/50">99.999% Settlement Availability</span>
                <Link
                  href="/solutions/fintech-digital-banking"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#e9800a] hover:text-white transition-colors"
                >
                  {locale === 'ar' ? 'تفاصيل الحلول المالية' : 'View FinTech Architecture'}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* BENTO CARD 3: GIGA-PROJECTS & SMART INFRASTRUCTURE (Span 4 on LG) */}
          {(activeTab === 'all' || activeTab === 'giga') && (
            <div className={`rounded-3xl border border-white/10 bg-[#0d0d0d] p-6 sm:p-8 flex flex-col justify-between hover:border-[#e9800a]/40 transition-colors duration-300 ${
              activeTab === 'giga' ? 'lg:col-span-12' : 'lg:col-span-4'
            }`}>
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-[#e9800a] border border-white/10">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#e9800a] tracking-wider uppercase">
                      {locale === 'ar' ? 'المشاريع الكبرى' : 'GIGA-PROJECTS'}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-white/60 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    IoT Telemetry
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-white mb-2 leading-tight">
                  {locale === 'ar'
                    ? 'التوائم الرقمية واستيعاب بيانات إنترنت الأشياء الضخمة'
                    : 'Giga-Projects IoT Telemetry & Digital Twins'}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                  {locale === 'ar'
                    ? 'منصات بث حدثي عبر كافكا تستوعب ملايين القراءات اللحظية من المستشعرات الذكية لنيوم والمشاريع الوطنية الكبرى دون فقدان للبيانات.'
                    : 'Event-driven telemetry fabric ingesting millions of sensor signals per second across smart cities, ports, and mega-developments with zero packet drop.'}
                </p>

                {/* Real-time Telemetry Metric Box */}
                <div className="rounded-2xl border border-white/10 bg-black/50 p-4 mb-6 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-white/50">Ingestion Throughput:</span>
                    <span className="font-mono font-bold text-[#e9800a]">1,250,000 evt/s</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#e9800a] h-full w-[84%]" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/60 pt-1">
                    <span>Kafka / MQTT Cluster</span>
                    <span className="text-emerald-400">Zero Packet Drop</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-white/50">Timescale / ClickHouse In-KSA</span>
                <Link
                  href="/solutions/giga-projects-smart-infrastructure"
                  className="text-xs font-bold text-[#e9800a] hover:text-white flex items-center gap-1"
                >
                  {locale === 'ar' ? 'المزيد' : 'Explore'}
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* BENTO CARD 4: ZERO-DOWNTIME ENTERPRISE MIGRATION (Span 4 on LG) */}
          {(activeTab === 'all' || activeTab === 'migration') && (
            <div className={`rounded-3xl border border-white/10 bg-[#0d0d0d] p-6 sm:p-8 flex flex-col justify-between hover:border-[#e9800a]/40 transition-colors duration-300 ${
              activeTab === 'migration' ? 'lg:col-span-12' : 'lg:col-span-4'
            }`}>
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-[#e9800a] border border-white/10">
                      <Layers className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#e9800a] tracking-wider uppercase">
                      {locale === 'ar' ? 'تحديث المؤسسات' : 'ENTERPRISE DEVOPS'}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-white/60 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    Zero Downtime
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-white mb-2 leading-tight">
                  {locale === 'ar'
                    ? 'تفكيك المنظومات القديمة وهندسة المنصات السحابية'
                    : 'Monolith Decomposition & Kubernetes GitOps'}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                  {locale === 'ar'
                    ? 'تحويل الأنظمة المركزية القديمة وقواعد البيانات المعقدة إلى خدمات مصغرة ذات استقرار فائق عبر كوبرنيتيس وترفارم مع نقل متدرج دون توقف الأعمال.'
                    : 'Transforming legacy Oracle, DB2, and monolithic core systems into sovereign Kubernetes microservices with Terraform GitOps and automated canary cutover.'}
                </p>

                {/* Migration Phased Checklist */}
                <div className="space-y-2 mb-6 text-xs">
                  <div className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-[#e9800a] shrink-0" />
                    <span>Schema Mapping & Dual-Write Database Sync</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-[#e9800a] shrink-0" />
                    <span>Shadow Traffic Replay for Zero-Loss Audit</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-[#e9800a] shrink-0" />
                    <span>Canary Istio Service Mesh Cutover (0ms Downtime)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400">100% Data Integrity</span>
                <Link
                  href="/services/platform-engineering-devops"
                  className="text-xs font-bold text-[#e9800a] hover:text-white flex items-center gap-1"
                >
                  {locale === 'ar' ? 'المزيد' : 'Explore'}
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* BENTO CARD 5: 100% IP OWNERSHIP & KNOWLEDGE TRANSFER (Span 4 on LG) */}
          {(activeTab === 'all' || activeTab === 'cloud') && (
            <div className={`rounded-3xl border border-white/10 bg-[#0d0d0d] p-6 sm:p-8 flex flex-col justify-between hover:border-[#e9800a]/40 transition-colors duration-300 ${
              activeTab === 'cloud' ? 'lg:col-span-12' : 'lg:col-span-4'
            }`}>
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-[#e9800a] border border-white/10">
                      <Lock className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#e9800a] tracking-wider uppercase">
                      {locale === 'ar' ? 'الملكية الفكرية' : 'IP SOVEREIGNTY'}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#e9800a] bg-[#e9800a]/10 px-2 py-0.5 rounded border border-[#e9800a]/20">
                    100% Client IP
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-white mb-2 leading-tight">
                  {locale === 'ar'
                    ? 'ملكية فكرية كاملة للعميل ونقل معرفي للكفاءات السعودية'
                    : '100% Code Ownership & In-Kingdom Knowledge Transfer'}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                  {locale === 'ar'
                    ? 'تسليم كامل للشفرة المصدرية من اليوم الأول بدون احتكار. عمل تشاركي مباشر مع مهندسي العميل في توقيت الرياض لنقل المعرفة وبناء الاستقلالية التقنية.'
                    : 'Complete source code and infrastructure ownership from Day 1. No proprietary lock-in. Co-engineering with your in-Kingdom technical staff in GMT+3 working hours.'}
                </p>

                {/* Sovereign Guarantees List */}
                <div className="space-y-2 mb-6 text-xs font-mono text-white/70">
                  <div className="flex items-center gap-2">
                    <span className="text-[#e9800a]">✓</span>
                    <span>Direct Git Repo Access on Day 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#e9800a]">✓</span>
                    <span>Daily Standups in Riyadh Time (GMT+3)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#e9800a]">✓</span>
                    <span>Architectural Decision Records (ADRs)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#e9800a]">✓</span>
                    <span>US & Saudi Legal Contracting Options</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-white/50">Zero Vendor Lock-in</span>
                <Link
                  href="/delivery-engine/security-ip-protection"
                  className="text-xs font-bold text-[#e9800a] hover:text-white flex items-center gap-1"
                >
                  {locale === 'ar' ? 'المزيد' : 'Explore'}
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

        </div>

        {/* 3. Bottom Assurance Bar: Accreditations & Regional Readiness */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono text-white/70">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#e9800a]" />
              NCA ECC / CCC Aligned
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#e9800a]" />
              Saudi PDPL Class-3 Enforced
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#e9800a]" />
              SAMA Open Banking Ready
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#e9800a]" />
              ISO 27001 & SOC 2 Practices
            </span>
          </div>

          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-[#e9800a] hover:text-black text-xs font-bold text-white transition-all"
          >
            <span>{locale === 'ar' ? 'احجز ورشة عمل معمارية بالرياض' : 'Book Riyadh Architecture Workshop'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
