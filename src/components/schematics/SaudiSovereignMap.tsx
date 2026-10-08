"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Server,
  Activity,
  Shield,
  Radio,
  Cpu,
  Lock,
  Zap,
  Globe,
  CheckCircle2,
  Network,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export interface SaudiRegionNode {
  id: 'riyadh' | 'jeddah' | 'neom' | 'dammam';
  name: string;
  nameAr: string;
  tag: string;
  coords: { x: number; y: number };
  latency: string;
  status: string;
  tier: string;
  tierAr: string;
  role: string;
  roleAr: string;
  specs: {
    label: string;
    labelAr: string;
    value: string;
  }[];
}

export const SAUDI_REGIONS: SaudiRegionNode[] = [
  {
    id: 'riyadh',
    name: 'Riyadh Central (Primary Datacenter Hub)',
    nameAr: 'الرياض (مركز البيانات السحابي الرئيسي)',
    tag: 'CENTRAL CORE',
    coords: { x: 470, y: 340 },
    latency: '3.8ms',
    status: 'ONLINE // OPTIMAL',
    tier: 'Tier-IV Redundant Core',
    tierAr: 'المستوى الرابع - مركز رئيسي فائق الفائض',
    role: 'Primary Sovereign Cloud & Multi-AZ Enterprise Datacenter Hub',
    roleAr: 'السحابة السيادية المركزية ومركز البيانات متعدد نطاقات التوافر للجهات الحكومية والمالية',
    specs: [
      { label: 'Data Residency', labelAr: 'إقامة البيانات', value: '100% In-Kingdom (Zero Egress)' },
      { label: 'Hardware Encryption', labelAr: 'التشفير العتادي', value: 'Hardware HSM / AES-256-GCM' },
      { label: 'Compliance Standard', labelAr: 'معايير الامتثال', value: 'SDAIA & NCA ECC-1:2018' },
      { label: 'Uptime SLA', labelAr: 'جاهزية التشغيل', value: '99.999% Active-Active' },
    ],
  },
  {
    id: 'jeddah',
    name: 'Jeddah / Western Edge (Red Sea Cable Gateway)',
    nameAr: 'جدة (بوابة الكابلات البحرية والمنطقة الغربية)',
    tag: 'SUBSEA GATEWAY',
    coords: { x: 250, y: 390 },
    latency: '6.4ms',
    status: 'ONLINE // DUAL-AZ',
    tier: 'Tier-III+ Sovereign Edge',
    tierAr: 'المستوى الثالث+ - الحافة السيادية',
    role: 'International Submarine Cable Landing Station (SMW5, 2Africa) & Western Cloud Zone',
    roleAr: 'محطة إنزال الكابلات البحرية الدولية ونطاق السحابة الغربية فائق السرعة',
    specs: [
      { label: 'Subsea Transit', labelAr: 'الربط البحري', value: 'Dual Landing Red Sea Trunk' },
      { label: 'Redundant Backhaul', labelAr: 'الخط الترددي الفائض', value: 'Trans-Kingdom Optical Express' },
      { label: 'Data Sovereignty', labelAr: 'السيادة الرقمية', value: 'PDPL Class-3 Enforced' },
      { label: 'Edge Latency', labelAr: 'استجابة الحافة', value: 'Sub-7ms Regional Transit' },
    ],
  },
  {
    id: 'neom',
    name: 'Neom / North Cognitive Grid',
    nameAr: 'نيوم (الشبكة الإدراكية الشمالية)',
    tag: 'AI GPU SWARM',
    coords: { x: 180, y: 165 },
    latency: '5.1ms',
    status: 'ONLINE // ACCELERATED',
    tier: 'GPU Accelerated Core (H100/B200 Swarm)',
    tierAr: 'نواة تسريع المعالجة الرسومية والذكاء التوليدي',
    role: 'High-Performance AI Inference, Cognitive Edge Grid & Zero-Carbon Compute Pod',
    roleAr: 'شبكة الاستدلال بالذكاء الاصطناعي والحوسبة الإدراكية الخضراء عديمة الانبعاثات',
    specs: [
      { label: 'Inference Clusters', labelAr: 'عناقيد المعالجة', value: 'NVIDIA H100/B200 NVLink' },
      { label: 'Clean Power', labelAr: 'الطاقة النظيفة', value: '100% Renewable Solar & Wind' },
      { label: 'Fabric Speed', labelAr: 'سرعة الشبكة البينية', value: '800Gbps InfiniBand Quantum-2' },
      { label: 'Cognitive Latency', labelAr: 'زمن الاستجابة الإدراكي', value: '5.1ms Low-Jitter Bus' },
    ],
  },
  {
    id: 'dammam',
    name: 'Eastern Province / Industrial SCADA',
    nameAr: 'المنطقة الشرقية (الأنظمة الصناعية والنفطية)',
    tag: 'INDUSTRIAL SCADA',
    coords: { x: 600, y: 295 },
    latency: '4.2ms',
    status: 'ONLINE // AIR-GAPPED READY',
    tier: 'Industrial High-Throughput',
    tierAr: 'المستوى الصناعي فائق الاعتمادية',
    role: 'Industrial IoT, Energy Grid Automation & Critical Infrastructure SCADA Isolation',
    roleAr: 'إنترنت الأشياء الصناعي وحماية شبكات الطاقة وأنظمة التحكم الحساسة',
    specs: [
      { label: 'Air-Gap Isolation', labelAr: 'العزل الشبكي', value: 'Hardware Data Diode Ready' },
      { label: 'Industrial Protocols', labelAr: 'البروتوكولات الصناعية', value: 'OPC-UA / Modbus / MQTT SCADA' },
      { label: 'Critical Security', labelAr: 'الأمن السيبراني الحرج', value: 'NCA OTCC Critical Standard' },
      { label: 'Bus Throughput', labelAr: 'كثافة التدفق', value: 'Real-Time Deterministic IO' },
    ],
  },
];

export interface SaudiSovereignMapProps {
  className?: string;
  initialRegionId?: 'riyadh' | 'jeddah' | 'neom' | 'dammam';
  onRegionChange?: (regionId: string) => void;
}

export function SaudiSovereignMap({
  className = '',
  initialRegionId = 'riyadh',
  onRegionChange,
}: SaudiSovereignMapProps) {
  const { locale, direction } = useTranslation();
  const [activeRegionId, setActiveRegionId] = useState<'riyadh' | 'jeddah' | 'neom' | 'dammam'>(
    initialRegionId
  );

  const activeRegion =
    SAUDI_REGIONS.find((r) => r.id === activeRegionId) || SAUDI_REGIONS[0];

  const handleSelectRegion = (id: 'riyadh' | 'jeddah' | 'neom' | 'dammam') => {
    setActiveRegionId(id);
    if (onRegionChange) {
      onRegionChange(id);
    }
  };

  // Redundant fiber mesh interconnect lines:
  // Neom(180, 165) <-> Riyadh(470, 340)
  // Jeddah(250, 390) <-> Riyadh(470, 340)
  // Dammam(600, 295) <-> Riyadh(470, 340)
  // Neom(180, 165) <-> Jeddah(250, 390)
  // Dammam(600, 295) <-> Jeddah(250, 390) via central trunk

  return (
    <div
      data-testid="saudi-sovereign-map"
      className={`rounded-2xl border border-white/10 bg-black p-4 sm:p-6 lg:p-7 space-y-6 text-white ${className}`}
      dir={direction}
    >
      {/* 1. TOP HEADER HUD */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 border border-accent/30 text-accent">
            <Radio className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                {locale === 'ar'
                  ? 'طوبولوجيا البنية التحتية السيادية في المملكة'
                  : 'SOVEREIGN TOPOLOGY // IN-KINGDOM NODES'}
              </span>
              <span className="flex h-2 w-2 rounded-full bg-accent animate-ping" />
            </div>
            <p className="font-mono text-[10px] text-white/50">
              {'REDUNDANT FIBER MESH // 4 LOW-LATENCY COMPUTE ZONES'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto font-mono text-[10px]">
          <span className="rounded bg-accent/10 px-2.5 py-1 text-accent border border-accent/25 font-bold">
            PDPL CLASS 3 VERIFIED
          </span>
          <span className="rounded bg-white/5 px-2.5 py-1 text-white/70 border border-white/10">
            NCA ECC COMPLIANT
          </span>
          <span className="rounded bg-emerald-950/50 px-2.5 py-1 text-emerald-400 border border-emerald-500/30">
            AVG LATENCY: 4.87MS
          </span>
        </div>
      </div>

      {/* 2. ACCESSIBLE REGIONAL NODE BUTTONS (Mobile & Desktop quick tap) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
        {SAUDI_REGIONS.map((region) => {
          const isSelected = activeRegionId === region.id;
          return (
            <button
              key={region.id}
              type="button"
              data-testid={`saudi-region-btn-${region.id}`}
              onClick={() => handleSelectRegion(region.id)}
              className={`p-2.5 rounded-xl border text-start transition-all cursor-pointer ${
                isSelected
                  ? 'border-accent bg-accent text-black font-bold shadow-glow-xs'
                  : 'border-white/10 bg-[#0d0d10] text-white/80 hover:border-white/30'
              }`}
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="uppercase">{region.id}</span>
                <span className={isSelected ? 'text-black' : 'text-accent'}>
                  {region.latency}
                </span>
              </div>
              <div className="text-xs truncate font-semibold mt-1">
                {region.tag}
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. INTERACTIVE VECTOR MAP DISPLAY (800 x 580 viewBox) */}
      <div className="relative rounded-xl border border-white/10 bg-[#070709] p-2 sm:p-4 overflow-hidden flex items-center justify-center">
        {/* Coordinate Grid Background */}
        <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />

        <div className="relative w-full max-w-[760px] aspect-[800/560]">
          <svg
            className="w-full h-full"
            viewBox="0 0 800 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Saudi Arabia Sovereign Infrastructure Map"
          >
            <defs>
              <linearGradient id="fiberGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e9800a" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ff9420" stopOpacity="0.9" />
              </linearGradient>
              <radialGradient id="riyadhRadarGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#e9800a" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#e9800a" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Geographical Coordinate Guide Grid */}
            <g opacity="0.08" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="3 3">
              <line x1="100" y1="150" x2="700" y2="150" />
              <line x1="100" y1="300" x2="700" y2="300" />
              <line x1="100" y1="450" x2="700" y2="450" />
              <line x1="200" y1="80" x2="200" y2="520" />
              <line x1="400" y1="80" x2="400" y2="520" />
              <line x1="600" y1="80" x2="600" y2="520" />
            </g>

            {/* Authentic Saudi Arabia Sovereign Land Border Outline */}
            <path
              d="M 140 160 
                 L 190 125 
                 L 260 105 
                 L 350 115 
                 L 450 145 
                 L 540 185 
                 L 600 240 
                 L 640 290 
                 L 615 340 
                 L 580 390 
                 L 630 430 
                 L 655 475 
                 L 590 515 
                 L 490 535 
                 L 380 520 
                 L 310 500 
                 L 270 460 
                 L 250 405 
                 L 230 335 
                 L 195 260 
                 L 165 200 Z"
              fill="#0d0d12"
              stroke="rgba(255, 255, 255, 0.22)"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Inner Topographic Region Accent Fill */}
            <path
              d="M 170 175 L 250 125 L 340 130 L 440 160 L 520 200 L 580 250 L 610 300 L 580 350 L 560 390 L 600 430 L 560 480 L 470 500 L 370 485 L 310 470 L 275 435 L 255 385 L 235 320 L 200 250 Z"
              fill="#121218"
              opacity="0.6"
            />

            {/* Central Radar Pulse Rings radiating from Riyadh */}
            <circle
              cx="470"
              cy="340"
              r="60"
              fill="url(#riyadhRadarGlow)"
              className="animate-pulse"
            />
            <circle
              cx="470"
              cy="340"
              r="110"
              stroke="#e9800a"
              strokeWidth="0.8"
              strokeDasharray="4 4"
              opacity="0.25"
            />

            {/* Redundant Fiber Mesh Connecting Lines */}
            {/* 1. Neom <-> Riyadh */}
            <line
              x1="180"
              y1="165"
              x2="470"
              y2="340"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* 2. Jeddah <-> Riyadh */}
            <line
              x1="250"
              y1="390"
              x2="470"
              y2="340"
              stroke="#e9800a"
              strokeWidth="2"
              strokeDasharray="5 3"
              opacity="0.8"
            />
            {/* 3. Dammam <-> Riyadh */}
            <line
              x1="600"
              y1="295"
              x2="470"
              y2="340"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* 4. Neom <-> Jeddah (Red Sea Western Corridor) */}
            <line
              x1="180"
              y1="165"
              x2="250"
              y2="390"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />
            {/* 5. Dammam <-> Jeddah Trans-Kingdom Highway */}
            <line
              x1="600"
              y1="295"
              x2="250"
              y2="390"
              stroke="rgba(233,128,10,0.3)"
              strokeWidth="1"
              strokeDasharray="6 6"
            />

            {/* Animated SVG Telemetry Packets travelling across routes */}
            {/* Neom to Riyadh Pulse */}
            <motion.circle
              r="3.5"
              fill="#e9800a"
              animate={{
                cx: [180, 470],
                cy: [165, 340],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Jeddah to Riyadh Pulse */}
            <motion.circle
              r="4"
              fill="#ffffff"
              animate={{
                cx: [250, 470],
                cy: [390, 340],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Dammam to Riyadh Pulse */}
            <motion.circle
              r="3.5"
              fill="#e9800a"
              animate={{
                cx: [600, 470],
                cy: [295, 340],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.0,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Regional Illuminated Nodes */}
            {SAUDI_REGIONS.map((region) => {
              const isSelected = activeRegionId === region.id;
              const { x, y } = region.coords;

              return (
                <g
                  key={region.id}
                  data-testid={`saudi-map-pin-${region.id}`}
                  onClick={() => handleSelectRegion(region.id)}
                  className="cursor-pointer"
                >
                  {/* Outer active highlight halo */}
                  {isSelected && (
                    <circle
                      cx={x}
                      cy={y}
                      r="22"
                      stroke="#e9800a"
                      strokeWidth="1.5"
                      fill="rgba(233, 128, 10, 0.15)"
                      className="animate-ping"
                    />
                  )}

                  {/* Core Base Node Circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 11 : 8}
                    fill={isSelected ? '#e9800a' : '#000000'}
                    stroke={isSelected ? '#ffffff' : '#e9800a'}
                    strokeWidth={isSelected ? '2.5' : '1.5'}
                  />

                  {/* Central Node Dot */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 4 : 3}
                    fill={isSelected ? '#000000' : '#ffffff'}
                  />

                  {/* Node Label Card */}
                  <g transform={`translate(${x}, ${y + (y > 400 ? -28 : 22)})`}>
                    <rect
                      x="-55"
                      y="-12"
                      width="110"
                      height="24"
                      rx="6"
                      fill={isSelected ? '#000000' : 'rgba(10, 10, 14, 0.85)'}
                      stroke={isSelected ? '#e9800a' : 'rgba(255, 255, 255, 0.15)'}
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="3.5"
                      textAnchor="middle"
                      fill={isSelected ? '#e9800a' : '#ffffff'}
                      fontSize="9.5"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {region.id.toUpperCase()}: {region.latency}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 4. ACTIVE REGION TELEMETRY INSPECTOR CARD */}
      <motion.div
        key={activeRegion.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="rounded-xl border border-white/15 bg-[#0e0e11] p-4 sm:p-5 space-y-4"
      >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span
                  data-testid="saudi-active-region-tag"
                  className="font-mono text-[10px] text-accent font-bold px-1.5 py-0.5 rounded bg-accent/10 border border-accent/20 uppercase"
                >
                  {`${activeRegion.id} // ${activeRegion.tag}`}
                </span>
                <span className="font-bold text-sm text-white">
                  {locale === 'ar' ? activeRegion.nameAr : activeRegion.name}
                </span>
              </div>
              <p className="mt-1 text-xs text-white/70">
                {locale === 'ar' ? activeRegion.roleAr : activeRegion.role}
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs self-start sm:self-auto">
              <span className="rounded bg-black border border-accent/40 px-2.5 py-1 text-accent font-bold">
                LATENCY: {activeRegion.latency}
              </span>
              <span className="rounded bg-white/5 border border-white/15 px-2.5 py-1 text-white/90">
                {locale === 'ar' ? activeRegion.tierAr : activeRegion.tier}
              </span>
            </div>
          </div>

          {/* 4 Specs Key-Value Grid */}
          <div>
            <div className="font-mono text-[10px] text-white/50 uppercase tracking-wider mb-2">
              {locale === 'ar' ? 'المواصفات الهندسية للنطاق السحابي:' : 'SOVEREIGN CLOUD SPECIFICATIONS:'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {activeRegion.specs.map((spec, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-white/10 bg-black/60 p-2.5 font-mono"
                >
                  <span className="text-[10px] text-white/50 block truncate">
                    {locale === 'ar' ? spec.labelAr : spec.label}
                  </span>
                  <span className="text-xs font-bold text-white block mt-0.5 truncate">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
    </div>
  );
}
