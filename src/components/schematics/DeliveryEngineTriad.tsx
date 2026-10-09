"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Building,
  Terminal,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Check,
  Clock,
  Layers,
  Sparkles,
  Lock,
  Globe2,
  Users2,
  Workflow,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

// Dynamically import the 3D globe with SSR disabled to guarantee high-performance hydration
const Triad3DGlobe = dynamic(
  () => import('@/components/3d/Triad3DGlobe').then((mod) => mod.Triad3DGlobe),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[380px] sm:h-[440px] lg:h-[500px] flex items-center justify-center rounded-3xl border border-white/10 bg-black/40">
        <div className="flex items-center gap-2 font-mono text-xs text-white/50">
          <span className="h-2 w-2 rounded-full bg-[#e9800a] animate-pulse" />
          <span>Initializing 3D Geospatial Engine...</span>
        </div>
      </div>
    ),
  }
);

type HubId = 'us' | 'riyadh' | 'pakistan';

interface HubDetail {
  id: HubId;
  city: string;
  cityAr: string;
  country: string;
  countryAr: string;
  timezone: string;
  utcOffset: string;
  role: string;
  roleAr: string;
  mandate: string;
  mandateAr: string;
  deliverables: {
    title: string;
    titleAr: string;
    desc: string;
    descAr: string;
  }[];
  stat: string;
  statLabel: string;
  statLabelAr: string;
}

const HUBS_DATA: Record<HubId, HubDetail> = {
  us: {
    id: 'us',
    city: 'San Francisco & Silicon Valley',
    cityAr: 'سان فرانسيسكو ووادي السيليكون',
    country: 'United States',
    countryAr: 'الولايات المتحدة',
    timezone: 'PST / PDT',
    utcOffset: 'UTC-8',
    role: 'Architectural Governance & Security Standards',
    roleAr: 'الحوكمة المعمارية ومعايير الأمان المؤسسي',
    mandate:
      'Principal US architects review every system design, database schema, and microservices decomposition before a single line of production code is merged. Ensuring Silicon Valley engineering rigor and zero-debt architecture.',
    mandateAr:
      'إشراف معماري رفيع المستوى يضمن تدقيق كافة المخططات الهندسية، تفكيك المنظومات المعقدة، والالتزام بأعلى معايير الحوكمة السحابية قبل دمج أي سطر برمجيات في بيئة الإنتاج.',
    deliverables: [
      {
        title: 'C4 Models & Enterprise ADRs',
        titleAr: 'سجلات القرارات المعمارية ونماذج C4',
        desc: 'Formal Architectural Decision Records documenting system trade-offs, failover logic, and scaling limits.',
        descAr: 'توثيق رسمي للقرارات المعمارية، خوارزميات الفائض التشغيلي، وحدود التوسع المؤسسي.',
      },
      {
        title: 'Zero-Trust Security & SOC 2 Posture',
        titleAr: 'بنية الأمان الصفري وضوابط SOC 2',
        desc: 'Shift-left security, secret rotation via HashiCorp Vault, and automated IAM least-privilege policies.',
        descAr: 'أمان استباقي في خطوط النشر، تدوير المفاتيح عبر Vault، وأتمتة صلاحيات الوصول الأدنى.',
      },
      {
        title: 'US Legal Entity & IP Assignment',
        titleAr: 'عقود أمريكية معتمدة وحماية الملكية الفكرية',
        desc: 'Delaware C-Corp contracting options with comprehensive IP assignment and non-disclosure guarantees.',
        descAr: 'خيارات تعاقد عبر كيان قانوني أمريكي مع التنازل الكامل عن الملكية الفكرية والتزام صارم بعدم الإفصاح.',
      },
    ],
    stat: '100%',
    statLabel: 'Architecture Rigor & Code Review Signoff',
    statLabelAr: 'تدقيق معماري شامل قبل الاعتماد',
  },
  riyadh: {
    id: 'riyadh',
    city: 'Riyadh (KAFD / King Fahd Road)',
    cityAr: 'الرياض (طريق الملك فهد / مركز الملك عبدالله المالي)',
    country: 'Kingdom of Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    timezone: 'AST (Saudi Standard)',
    utcOffset: 'UTC+3',
    role: 'Regional Leadership & Regulatory Alignment',
    roleAr: 'القيادة الإقليمية والمواءمة التنظيمية',
    mandate:
      'On-the-ground technical leadership embedded in Riyadh. Direct executive stakeholder engagement, deep alignment with Vision 2030 digital mandates, SAMA Open Banking, and full working hours overlap.',
    mandateAr:
      'قيادة تقنية متواجدة على الأرض في الرياض للتواصل المباشر مع أصحاب المصلحة، مواءمة دقيقة مع مستهدفات رؤية 2030 وضوابط البنك المركزي (ساما) والهيئة الوطنية للأمن السيبراني، وتزامن كامل مع ساعات العمل.',
    deliverables: [
      {
        title: 'Vision 2030 & NCA ECC-1:2018 Alignment',
        titleAr: 'مواءمة رؤية 2030 وضوابط الأمن السيبراني NCA',
        desc: 'Architectures engineered specifically for in-Kingdom sovereign clouds (GCP Dammam, Azure Riyadh, AWS KSA).',
        descAr: 'تصميم أنظمة مخصصة لمناطق السحابة المحلية في المملكة مع الالتزام التام بضوابط السيادة الرقمية.',
      },
      {
        title: 'Full GMT+3 Working Hours Overlap',
        titleAr: 'تزامن كامل مع توقيت الرياض (GMT+3)',
        desc: 'Daily standups, instant Slack/Teams communication, and rapid executive escalations in Riyadh time.',
        descAr: 'اجتماعات يومية، تواصل فوري ومباشر، واستجابة سريعة للطوارئ طوال ساعات العمل الرسمية.',
      },
      {
        title: 'On-Site Discovery & Executive Workshops',
        titleAr: 'ورش عمل معمارية حضورية بالرياض',
        desc: 'In-person whiteboarding, technical discovery, sprint demos, and knowledge transfer in Riyadh.',
        descAr: 'جلسات عصف ذهني معماري حضوري، عروض تجريبية لنهاية الدورات، ونقل معرفي مباشر.',
      },
    ],
    stat: 'GMT+3',
    statLabel: 'Real-Time Working Hours Overlap',
    statLabelAr: 'تزامن عمل فوري ولحظي',
  },
  pakistan: {
    id: 'pakistan',
    city: 'Islamabad & Lahore',
    cityAr: 'إسلام آباد ولاهور',
    country: 'Pakistan Delivery Hubs',
    countryAr: 'مراكز الهندسة البرمجية في باكستان',
    timezone: 'PKT',
    utcOffset: 'UTC+5',
    role: 'Dedicated High-Velocity Engineering Squads',
    roleAr: 'فرق هندسية مخصصة فائقة السرعة والإنتاجية',
    mandate:
      'Full-cycle product pods (Product Architect, Senior Full-Stack Engineers, DevOps/SRE Lead, QA Automation) shipping in rapid 2-week CI/CD cycles, delivering tier-1 engineering output without inflated domestic agency markups.',
    mandateAr:
      'فرق منتجات متكاملة (مهندس رئيسي، مطورو Full-Stack، خبراء DevOps وضمان الجودة) تنجز دورات سبرنت سريعة كل أسبوعين، محققة أعلى إنتاجية هندسية بتكلفة رأسمالية ذكية دون تضخيم الهوامش.',
    deliverables: [
      {
        title: 'Dedicated Product Pods (No Shared Staff)',
        titleAr: 'فرق برمجية مخصصة بالكامل (غير مشتركة)',
        desc: 'Engineers dedicated exclusively to your platform. No context switching or competing client deadlines.',
        descAr: 'مهندسون مفرغون حصرياً لمشروعك لضمان التركيز الكامل وسرعة التدفق البرمجي دون تشتت.',
      },
      {
        title: 'Rapid 2-Week CI/CD Sprints',
        titleAr: 'دورات إنجاز سريعة كل أسبوعين',
        desc: 'Automated test suites, continuous deployment, and tangible features delivered at every demo.',
        descAr: 'فحوصات برمجية مؤتمتة، نشر سحابي مستمر، ومزايا ملموسة جاهزة للاختبار في كل دورة تسليم.',
      },
      {
        title: '60% Capital Efficiency vs Domestic Rates',
        titleAr: 'وفر رأسمالي يصل إلى 60% مقارنة بالوكالات المحلية',
        desc: 'Institutional-grade output at a fraction of legacy agency billing, maximizing your runway and ROI.',
        descAr: 'مخرجات برمجية بمستوى الشركات العالمية بجزء بسيط من تكلفة الاستشارات المحلية التقليدية.',
      },
    ],
    stat: '60%',
    statLabel: 'Capital Efficiency vs Pure Domestic Agencies',
    statLabelAr: 'وفر تشغيلي ورأسمالي',
  },
};

export function DeliveryEngineTriad() {
  const { locale, direction } = useTranslation();
  const [selectedHub, setSelectedHub] = useState<HubId>('riyadh');

  const active = HUBS_DATA[selectedHub];

  return (
    <div
      className="relative w-full rounded-3xl border border-white/10 bg-[#000000] p-6 sm:p-10 lg:p-12 shadow-2xl text-white overflow-hidden"
      dir={direction}
    >
      {/* Background Architectural Mesh Flare */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 end-0 h-[500px] w-[500px] rounded-full bg-[#e9800a]/5 blur-[160px]"
      />

      {/* 1. Header Block: Swiss Typography & Editorial Punch */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 sm:pb-10 border-b border-white/10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-[#e9800a] uppercase mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e9800a] inline-block" />
            {locale === 'ar' ? 'نموذج الإنجاز الثلاثي الاستراتيجي' : 'THE GLOBAL DELIVERY TRIAD'}
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            {locale === 'ar' ? (
              <>
                معايير وادي السيليكون • مواءمة بالرياض •{' '}
                <span className="text-[#e9800a]">سرعة إنجاز استثنائية</span>
              </>
            ) : (
              <>
                Silicon Valley Rigor. Riyadh Alignment.{' '}
                <span className="text-[#e9800a]">High-Velocity Execution.</span>
              </>
            )}
          </h3>

          <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed">
            {locale === 'ar'
              ? 'نموذج مهيكل يُلغي تضخم تكاليف الوكالات الاستشارية التقليدية بدون مخاطر فرق التعهيد غير المدارة. إشراف معماري أمريكي صارم، تزامن كامل مع ساعات عمل الرياض، وفرق هندسية مخصصة بباكستان.'
              : 'We eliminate the bloated margins of purely domestic consultancies without the risks of unmanaged offshore shops. US principal architects govern system design, while dedicated full-stack pods in Pakistan ship in full alignment with Riyadh working hours.'}
          </p>
        </div>

        {/* Tactical Hub Selection Pills */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl border border-white/10 bg-white/[0.03]">
          <button
            type="button"
            onClick={() => setSelectedHub('us')}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              selectedHub === 'us'
                ? 'bg-[#e9800a] text-black shadow-lg shadow-[#e9800a]/20'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {locale === 'ar' ? '1. الحوكمة (أمريكا)' : '01. US Advisory'}
          </button>
          <button
            type="button"
            onClick={() => setSelectedHub('riyadh')}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              selectedHub === 'riyadh'
                ? 'bg-[#e9800a] text-black shadow-lg shadow-[#e9800a]/20'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {locale === 'ar' ? '2. المواءمة (الرياض)' : '02. Riyadh Hub'}
          </button>
          <button
            type="button"
            onClick={() => setSelectedHub('pakistan')}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              selectedHub === 'pakistan'
                ? 'bg-[#e9800a] text-black shadow-lg shadow-[#e9800a]/20'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {locale === 'ar' ? '3. الإنجاز (باكستان)' : '03. Delivery Pods'}
          </button>
        </div>
      </div>

      {/* 2. Main Content Layout: 3D Geospatial Engine (Col 1-7) & Command Board (Col 8-12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center pt-8 sm:pt-10">
        
        {/* Left Side: Interactive 3D WebGL Geospatial Delivery Canvas (7 Cols) */}
        <div className="lg:col-span-7 relative rounded-3xl border border-white/10 bg-[#080808] p-4 sm:p-6 overflow-hidden flex flex-col justify-between min-h-[460px] sm:min-h-[520px]">
          {/* Ambient Grid Texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(233,128,10,0.06)_0%,transparent_70%)]"
          />

          {/* Real-time Timezone Status Bar */}
          <div className="relative z-10 grid grid-cols-3 gap-2 sm:gap-3 text-center border-b border-white/10 pb-4 mb-2">
            <div
              onClick={() => setSelectedHub('us')}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                selectedHub === 'us'
                  ? 'border-[#e9800a] bg-white/10'
                  : 'border-white/5 bg-black/40 hover:border-white/20'
              }`}
            >
              <span className="font-mono text-[10px] text-white/40 block">SAN FRANCISCO</span>
              <span className="text-xs font-bold text-white mt-0.5 block">PST (UTC-8)</span>
              <span className="text-[10px] font-mono text-[#e9800a]">Architectural Core</span>
            </div>

            <div
              onClick={() => setSelectedHub('riyadh')}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                selectedHub === 'riyadh'
                  ? 'border-[#e9800a] bg-white/10 shadow-glow-sm'
                  : 'border-white/5 bg-black/40 hover:border-white/20'
              }`}
            >
              <span className="font-mono text-[10px] text-[#e9800a] block font-bold">RIYADH (ANCHOR)</span>
              <span className="text-xs font-bold text-white mt-0.5 block">AST (UTC+3)</span>
              <span className="text-[10px] font-mono text-emerald-400">Regional On-Site</span>
            </div>

            <div
              onClick={() => setSelectedHub('pakistan')}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                selectedHub === 'pakistan'
                  ? 'border-[#e9800a] bg-white/10'
                  : 'border-white/5 bg-black/40 hover:border-white/20'
              }`}
            >
              <span className="font-mono text-[10px] text-white/40 block">ISLAMABAD / LHR</span>
              <span className="text-xs font-bold text-white mt-0.5 block">PKT (UTC+5)</span>
              <span className="text-[10px] font-mono text-[#e9800a]">Dedicated Pods</span>
            </div>
          </div>

          {/* 3D WebGL Globe Viewport */}
          <div className="relative flex-1 flex items-center justify-center">
            <Triad3DGlobe
              activeHub={selectedHub}
              onSelectHub={(hub) => setSelectedHub(hub)}
              className="w-full h-full"
            />
          </div>

          {/* Bottom Synchronized Handover Tag */}
          <div className="relative z-10 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-white/60">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Continuous Follow-the-Sun Engineering Workflow</span>
            </div>
            <span className="text-[#e9800a] font-bold">Zero-Handoff Loss</span>
          </div>
        </div>

        {/* Right Side: Active Hub Operational Blueprint (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Hub Identification Header */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-[#e9800a] uppercase tracking-wider">
                    {locale === 'ar' ? active.cityAr : active.city}
                  </span>
                  <span className="font-mono text-[11px] text-white/50 bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
                    {active.utcOffset}
                  </span>
                </div>

                <h4 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {locale === 'ar' ? active.roleAr : active.role}
                </h4>

                <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                  {locale === 'ar' ? active.mandateAr : active.mandate}
                </p>
              </div>

              {/* 3 Concrete Deliverables (Authentic, Zero-Fluff) */}
              <div className="space-y-3">
                {active.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-4 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#e9800a]/10 text-[#e9800a] font-mono text-xs font-bold mt-0.5">
                        0{idx + 1}
                      </div>
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-white">
                          {locale === 'ar' ? item.titleAr : item.title}
                        </h5>
                        <p className="text-xs text-white/60 mt-1 leading-relaxed">
                          {locale === 'ar' ? item.descAr : item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stat Metric Callout */}
              <div className="rounded-2xl border border-[#e9800a]/30 bg-[#e9800a]/5 p-4 sm:p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-[#e9800a] uppercase block mb-1">
                    {locale === 'ar' ? active.statLabelAr : active.statLabel}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-white">{active.stat}</span>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e9800a] text-black">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 3. Bottom Sovereign Assurance Bar */}
      <div className="mt-10 sm:mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white/60">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <span className="flex items-center gap-1.5 text-white/80">
            <Lock className="h-3.5 w-3.5 text-[#e9800a]" />
            Client-Controlled Bastion VPN Access
          </span>
          <span className="flex items-center gap-1.5 text-white/80">
            <Check className="h-3.5 w-3.5 text-[#e9800a]" />
            Synthetic Test Datasets (Zero Production Data on Dev)
          </span>
          <span className="flex items-center gap-1.5 text-white/80">
            <Check className="h-3.5 w-3.5 text-[#e9800a]" />
            100% Code & IP Handover on Day 1
          </span>
        </div>

        <Link
          href="/delivery-engine"
          className="inline-flex items-center gap-1.5 font-bold text-[#e9800a] hover:text-white transition-colors"
        >
          <span>{locale === 'ar' ? 'استكشف محرك الإنجاز بالتفصيل' : 'Explore The Delivery Engine'}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
