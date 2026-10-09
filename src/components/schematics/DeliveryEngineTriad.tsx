"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Building,
  Terminal,
  Cpu,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export function DeliveryEngineTriad() {
  const { locale, direction } = useTranslation();
  const [selectedPillar, setSelectedPillar] = useState<'us' | 'riyadh' | 'pakistan'>('riyadh');

  const pillars = {
    us: {
      id: 'us',
      title: locale === 'ar' ? 'الحوكمة والمعايير الأمريكية' : 'US Advisory & Standards',
      subtitle: locale === 'ar' ? 'انضباط وادي السيليكون والمعمارية المؤسسية' : 'Silicon Valley Architectural Rigor',
      tag: 'Pillar 1 • Architectural Governance',
      location: 'San Francisco & New York Advisory',
      specs: [
        { label: locale === 'ar' ? 'معايير المعمارية' : 'Architecture Rigor', val: 'Enterprise ADRs & C4 Models' },
        { label: locale === 'ar' ? 'حوكمة الأمان' : 'Security Discipline', val: 'Zero-Trust & SOC 2 Practices' },
        { label: locale === 'ar' ? 'تخطيط المنتجات' : 'Product Design', val: 'System Roadmapping & SLOs' },
      ],
      details:
        locale === 'ar'
          ? 'إشراف معماري رفيع المستوى يضمن تصميم أنظمة برمجية قابلة للتوسع اللانهائي، بنى خدمات مصغرة غير معقدة، وتطبيق أحدث المعايير العالمية في الأمن والحوكمة المؤسسية.'
          : 'Principal architecture oversight ensuring non-monolithic scalability, event-driven decoupling, and tier-1 US engineering standards before a single line of production code is merged.',
    },
    riyadh: {
      id: 'riyadh',
      title: locale === 'ar' ? 'المواءمة والوجود المحلي بالرياض' : 'Riyadh Local Alignment',
      subtitle: locale === 'ar' ? 'فهم استراتيجي لمستهدفات رؤية 2030' : 'Vision 2030 Regulatory Mandates',
      tag: 'Pillar 2 • Regional Alignment',
      location: 'Riyadh (King Fahd Road / KAFD)',
      specs: [
        { label: locale === 'ar' ? 'التواجد المباشر' : 'Local Presence', val: 'On-site discovery & workshops' },
        { label: locale === 'ar' ? 'الامتثال السيادي' : 'KSA Compliance', val: 'NCA ECC/CCC & PDPL Class 3' },
        { label: locale === 'ar' ? 'التزامن الزمني' : 'Collaboration', val: 'Full GMT+3 working hours overlap' },
      ],
      details:
        locale === 'ar'
          ? 'قيادة واستشارات تقنية متواجدة على الأرض في الرياض، تعي الثقافة المؤسسية المحلية، مواءمة تامة مع متطلبات البنك المركزي (ساما) والهيئة الوطنية للأمن السيبراني، وتزامن عمل كامل.'
          : 'On-the-ground technical leadership embedded in Riyadh, deeply aligned with Saudi regulatory bodies (SAMA, NCA, NDMO), delivering local stakeholder management and continuous GMT+3 overlap.',
    },
    pakistan: {
      id: 'pakistan',
      title: locale === 'ar' ? 'مركز الإنجاز الهندسي المتسارع' : 'Offshore Engineering Hub',
      subtitle: locale === 'ar' ? 'كفاءات هندسية فائقة السرعة والتكلفة' : 'Pakistan High-Velocity Delivery Pods',
      tag: 'Pillar 3 • High-Velocity Scale',
      location: 'Islamabad & Lahore Delivery Centers',
      specs: [
        { label: locale === 'ar' ? 'سرعة الإنجاز' : 'Delivery Speed', val: '2-week sprint cycles with CI/CD' },
        { label: locale === 'ar' ? 'كفاءة الميزانية' : 'Cost Efficiency', val: '60% capital savings vs local agency' },
        { label: locale === 'ar' ? 'القدرات الهندسية' : 'Engineering Talent', val: 'Senior Full-Stack, SRE & QA Pods' },
      ],
      details:
        locale === 'ar'
          ? 'فرق هندسية مخصصة (Pods) تضم كبار المطورين ومهندسي DevOps وضمان الجودة، تمنح الشركات السعودية سرعة فائقة في بناء وتحديث الأنظمة بأعلى عائد على رأس المال الاستثماري.'
          : 'Elite full-stack product pods (Product Architect, DevOps Lead, Full-Stack Devs, QA) delivering maximum throughput, rapid 8-week releases, and capital efficiency without domestic overhead.',
    },
  };

  const active = pillars[selectedPillar];

  return (
    <div className="relative w-full rounded-3xl border border-white/15 bg-black/90 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl text-white" dir={direction}>
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-mono font-semibold text-accent mb-2">
            <Zap className="h-3.5 w-3.5" />
            <span>{locale === 'ar' ? 'نموذج الإنجاز الثلاثي الاستراتيجي' : 'The US–Saudi–Pakistan Triad Engine'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
            {locale === 'ar'
              ? 'معايير وادي السيليكون • تواجد بالرياض • سرعة إنجاز استثنائية'
              : 'US Rigor • Riyadh Alignment • High-Velocity Execution'}
          </h3>
        </div>

        {/* Pillar Switcher Buttons */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl border border-white/10 bg-white/5">
          <button
            onClick={() => setSelectedPillar('us')}
            className={`rounded-xl px-3 py-2 text-xs font-bold transition-all ${
              selectedPillar === 'us'
                ? 'bg-accent text-black shadow-glow-sm'
                : 'text-fg-muted hover:text-white hover:bg-white/5'
            }`}
          >
            {locale === 'ar' ? '1. أمريكا (المعايير)' : '1. US Advisory'}
          </button>
          <button
            onClick={() => setSelectedPillar('riyadh')}
            className={`rounded-xl px-3 py-2 text-xs font-bold transition-all ${
              selectedPillar === 'riyadh'
                ? 'bg-accent text-black shadow-glow-sm'
                : 'text-fg-muted hover:text-white hover:bg-white/5'
            }`}
          >
            {locale === 'ar' ? '2. الرياض (المواءمة)' : '2. Riyadh Hub'}
          </button>
          <button
            onClick={() => setSelectedPillar('pakistan')}
            className={`rounded-xl px-3 py-2 text-xs font-bold transition-all ${
              selectedPillar === 'pakistan'
                ? 'bg-accent text-black shadow-glow-sm'
                : 'text-fg-muted hover:text-white hover:bg-white/5'
            }`}
          >
            {locale === 'ar' ? '3. باكستان (التنفيذ)' : '3. Engineering Hub'}
          </button>
        </div>
      </div>

      {/* Main Interactive Diagram & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
        {/* SVG Interactive Topology Visualization (7 Cols) */}
        <div className="lg:col-span-7 relative flex items-center justify-center p-4 rounded-2xl border border-white/10 bg-surface/50 overflow-hidden min-h-[340px]">
          {/* Subtle Grid */}
          <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

          {/* SVG Vector Triad with Illuminated Connections */}
          <svg viewBox="0 0 600 380" className="w-full h-auto max-w-[560px] select-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="triadGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e9800a" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ff9420" stopOpacity="0.2" />
              </linearGradient>
              <filter id="triadBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Connecting Pathways */}
            <path
              d="M 120 120 L 300 280"
              stroke={selectedPillar === 'us' || selectedPillar === 'riyadh' ? '#e9800a' : 'rgba(255,255,255,0.15)'}
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />
            <path
              d="M 480 120 L 300 280"
              stroke={selectedPillar === 'pakistan' || selectedPillar === 'riyadh' ? '#e9800a' : 'rgba(255,255,255,0.15)'}
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />
            <path
              d="M 120 120 L 480 120"
              stroke={selectedPillar === 'us' || selectedPillar === 'pakistan' ? '#e9800a' : 'rgba(255,255,255,0.15)'}
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />

            {/* Animated Pulses on Active Pathways */}
            <circle cx="210" cy="200" r="4" fill="#e9800a" className="animate-ping" opacity="0.8" />
            <circle cx="390" cy="200" r="4" fill="#e9800a" className="animate-ping" opacity="0.8" />
            <circle cx="300" cy="120" r="4" fill="#e9800a" className="animate-ping" opacity="0.8" />

            {/* Central Synergistic Hub */}
            <circle cx="300" cy="170" r="42" fill="#0d0d0d" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <circle cx="300" cy="170" r="34" fill="#141414" stroke="#e9800a" strokeWidth="2" strokeDasharray="4 2" />
            <text x="300" y="166" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
              AEITCH
            </text>
            <text x="300" y="180" textAnchor="middle" fill="#e9800a" fontSize="8" fontWeight="bold" fontFamily="monospace">
              SYNCHRONIZED
            </text>

            {/* Node 1: US Standards (Top Left) */}
            <g
              className="cursor-pointer"
              onClick={() => setSelectedPillar('us')}
            >
              <circle
                cx="120"
                cy="120"
                r={selectedPillar === 'us' ? '46' : '38'}
                fill="#111111"
                stroke={selectedPillar === 'us' ? '#e9800a' : 'rgba(255,255,255,0.25)'}
                strokeWidth={selectedPillar === 'us' ? '3' : '1.5'}
                filter={selectedPillar === 'us' ? 'url(#triadBlur)' : undefined}
                className="transition-all duration-300"
              />
              <text x="120" y="115" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                US Standards
              </text>
              <text x="120" y="130" textAnchor="middle" fill={selectedPillar === 'us' ? '#e9800a' : '#888888'} fontSize="8" fontFamily="monospace">
                Silicon Valley
              </text>
            </g>

            {/* Node 2: Pakistan Scale Pods (Top Right) */}
            <g
              className="cursor-pointer"
              onClick={() => setSelectedPillar('pakistan')}
            >
              <circle
                cx="480"
                cy="120"
                r={selectedPillar === 'pakistan' ? '46' : '38'}
                fill="#111111"
                stroke={selectedPillar === 'pakistan' ? '#e9800a' : 'rgba(255,255,255,0.25)'}
                strokeWidth={selectedPillar === 'pakistan' ? '3' : '1.5'}
                filter={selectedPillar === 'pakistan' ? 'url(#triadBlur)' : undefined}
                className="transition-all duration-300"
              />
              <text x="480" y="115" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                Delivery Hub
              </text>
              <text x="480" y="130" textAnchor="middle" fill={selectedPillar === 'pakistan' ? '#e9800a' : '#888888'} fontSize="8" fontFamily="monospace">
                Pakistan Pods
              </text>
            </g>

            {/* Node 3: Riyadh Anchor (Bottom Center) */}
            <g
              className="cursor-pointer"
              onClick={() => setSelectedPillar('riyadh')}
            >
              <circle
                cx="300"
                cy="280"
                r={selectedPillar === 'riyadh' ? '50' : '42'}
                fill="#111111"
                stroke={selectedPillar === 'riyadh' ? '#e9800a' : 'rgba(255,255,255,0.25)'}
                strokeWidth={selectedPillar === 'riyadh' ? '3' : '1.5'}
                filter={selectedPillar === 'riyadh' ? 'url(#triadBlur)' : undefined}
                className="transition-all duration-300"
              />
              <text x="300" y="275" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
                Riyadh Hub
              </text>
              <text x="300" y="291" textAnchor="middle" fill={selectedPillar === 'riyadh' ? '#e9800a' : '#888888'} fontSize="8" fontFamily="monospace">
                Vision 2030 (GMT+3)
              </text>
            </g>
          </svg>
        </div>

        {/* Dynamic Detail Card (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: direction === 'rtl' ? -15 : 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 'rtl' ? 15 : -15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono text-accent">
                <span>{active.tag}</span>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-1">{active.title}</h4>
                <p className="text-xs font-medium text-fg-subtle">{active.subtitle}</p>
              </div>

              <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
                {active.details}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 gap-2 pt-2">
                {active.specs.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-surface p-3"
                  >
                    <span className="text-xs text-fg-subtle">{item.label}</span>
                    <span className="text-xs font-mono font-bold text-accent">{item.val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
