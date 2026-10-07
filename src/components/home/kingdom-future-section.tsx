"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Workflow,
  Bot,
  Shield,
  Rocket,
  Users2,
  CheckCircle2,
  Activity,
  Terminal,
  Server,
  Radio,
  Lock,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface RegionNode {
  id: string;
  name: string;
  nameAr: string;
  coords: { x: number; y: number };
  latency: string;
  status: string;
  tier: string;
}

const SAUDI_REGIONS: RegionNode[] = [
  {
    id: 'riyadh',
    name: 'Riyadh Central (Primary Datacenter Hub)',
    nameAr: 'الرياض (مركز البيانات السحابي الرئيسي)',
    coords: { x: 58, y: 48 },
    latency: '3.8ms',
    status: 'ONLINE // OPTIMAL',
    tier: 'Tier-IV Redundant',
  },
  {
    id: 'jeddah',
    name: 'Jeddah / Western Edge (Red Sea Cable Gateway)',
    nameAr: 'جدة (بوابة الكابلات البحرية والمنطقة الغربية)',
    coords: { x: 30, y: 58 },
    latency: '6.4ms',
    status: 'ONLINE // DUAL-AZ',
    tier: 'Tier-III+ Sovereign',
  },
  {
    id: 'neom',
    name: 'Neom / North Cognitive Grid',
    nameAr: 'نيوم (الشبكة الإدراكية الشمالية)',
    coords: { x: 22, y: 22 },
    latency: '5.1ms',
    status: 'ONLINE // ACCELERATED',
    tier: 'GPU Accelerated Core',
  },
  {
    id: 'dammam',
    name: 'Eastern Province / Industrial SCADA',
    nameAr: 'المنطقة الشرقية (الأنظمة الصناعية والنفطية)',
    coords: { x: 74, y: 40 },
    latency: '4.2ms',
    status: 'ONLINE // AIR-GAPPED READY',
    tier: 'Industrial High-Throughput',
  },
];

export function KingdomFutureSection() {
  const { t, direction, locale } = useTranslation();
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [activeRegion, setActiveRegion] = useState<RegionNode>(SAUDI_REGIONS[0]);

  const activePillar = t.vision2030.pillars[activePillarIndex] || t.vision2030.pillars[0];

  const pillarIcons = [
    <Workflow key="0" className="h-4 w-4" />,
    <Bot key="1" className="h-4 w-4" />,
    <Shield key="2" className="h-4 w-4" />,
    <Rocket key="3" className="h-4 w-4" />,
    <Users2 key="4" className="h-4 w-4" />,
  ];

  // Concrete Code/Architecture mock snippets per pillar
  const pillarBlueprints = [
    `// ENTERPRISE BACKBONE REFACTOR
resource "aws_vpc_peering_connection" "sa_sovereign" {
  peer_region = "me-central-1" // Riyadh AWS Region
  auto_accept = true
  tags = { Compliance = "SDAIA-Gov-Standard" }
}`,
    `// DETERMINISTIC AGENT DAG TOPOLOGY
const AgentSwarm = new BoundedAgentMesh({
  region: "sa-riyadh-az1",
  dataBoundary: "STRICT_LOCAL_IN_MEMORY",
  maxHallucinationDelta: 0.001,
  fallback: "GRACEFUL_CIRCUIT_BREAKER"
});`,
    `// SOVEREIGN CLOUD ISOLATION AUDIT
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: pdpl-enforcement-mesh
spec:
  action: ALLOW
  rules: [{ from: [{ source: { principals: ["sa-cloud.aeitch.internal"] } }] }]`,
    `// RAPID MVP 8-WEEK SPRINT CADENCE
const sprintMilestones = [
  { week: "01-02", phase: "Architecture Spec & DB Schema" },
  { week: "03-05", phase: "Core Engine & Agent Pipeline" },
  { week: "06-07", phase: "PDPL Compliance & Security Audit" },
  { week: "08",    phase: "100% IP Transfer & Handover" }
];`,
    `// SAUDI TALENT ENGINEERING MENTORSHIP
pod.integrateLocalTeam({
  pairProgramming: "Daily Sync (GMT+3)",
  documentationStandard: "Enterprise Architecture ADRs",
  fullCodeOwnership: true
});`,
  ];

  return (
    <section id="vision-2030" className="relative py-24 bg-bg overflow-hidden border-t border-border" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-20" />
      <div className="pointer-events-none absolute top-1/2 end-0 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 font-mono text-xs font-semibold text-accent mb-4">
            <Radio className="h-3.5 w-3.5 text-accent animate-pulse" />
            <span>{t.vision2030.sectionTag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {t.vision2030.heading}
          </h2>

          <p className="text-sm sm:text-base text-fg-muted leading-relaxed font-normal">
            {t.vision2030.description}
          </p>
        </div>

        {/* 5 Tactical Mode Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
          {t.vision2030.pillars.map((pillar, idx) => {
            const isActive = activePillarIndex === idx;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillarIndex(idx)}
                className={`relative flex items-center gap-2.5 rounded-xl border p-3 text-start transition-all duration-200 ${
                  isActive
                    ? 'border-accent bg-surface-2 text-white shadow-glow-sm'
                    : 'border-border bg-surface text-fg-muted hover:border-white/20 hover:text-white'
                }`}
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                    isActive ? 'bg-accent text-black font-bold' : 'bg-bg text-accent'
                  }`}
                >
                  {pillarIcons[idx]}
                </div>
                <div className="truncate">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
                    PILLAR 0{idx + 1}
                  </div>
                  <div className="truncate text-xs font-bold">{pillar.title}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Telemetry Cockpit (Concept 3: Orbital Silicon & Regional Network Mesh) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Visual Slate: Saudi Sovereign Cloud Topology Map (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-border bg-surface p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Top Cockpit Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border z-10">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-accent animate-ping" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  SOVEREIGN TOPOLOGY // IN-KINGDOM NODES
                </span>
              </div>
              <span className="font-mono text-[11px] text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                PDPL CLASS 3 VERIFIED
              </span>
            </div>

            {/* Saudi Arabia Schematic Vector Topology Display */}
            <div className="relative my-8 h-72 sm:h-80 w-full rounded-xl bg-black border border-white/10 flex items-center justify-center overflow-hidden">
              {/* Coordinate Grid Lines */}
              <div className="absolute inset-0 bg-tech-grid opacity-30" />

              {/* Glowing Pulse Rings around Central Riyadh Node */}
              <div
                className="absolute h-36 w-36 rounded-full border border-accent/20 animate-ping opacity-25"
                style={{ top: '35%', left: '50%' }}
              />
              <div
                className="absolute h-64 w-64 rounded-full border border-white/5"
                style={{ top: '18%', left: '38%' }}
              />

              {/* Fiber Interconnect Lines connecting the Nodes */}
              <svg className="absolute inset-0 h-full w-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                {/* Neom to Riyadh */}
                <line x1="22%" y1="22%" x2="58%" y2="48%" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
                {/* Jeddah to Riyadh */}
                <line x1="30%" y1="58%" x2="58%" y2="48%" stroke="#e9800a" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                {/* Dammam to Riyadh */}
                <line x1="74%" y1="40%" x2="58%" y2="48%" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
                {/* Neom to Jeddah */}
                <line x1="22%" y1="22%" x2="30%" y2="58%" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" opacity="0.2" />
              </svg>

              {/* Regional Node Pins */}
              {SAUDI_REGIONS.map((region) => {
                const isSelected = activeRegion.id === region.id;
                return (
                  <button
                    key={region.id}
                    onClick={() => setActiveRegion(region)}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-transform hover:scale-110 focus:outline-none"
                    style={{ left: `${region.coords.x}%`, top: `${region.coords.y}%` }}
                  >
                    <div
                      className={`relative flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
                        isSelected
                          ? 'border-accent bg-accent text-black shadow-glow-md'
                          : 'border-white/30 bg-surface text-white hover:border-accent'
                      }`}
                    >
                      <Server className="h-3.5 w-3.5" />
                    </div>
                    <span
                      className={`mt-1 font-mono text-[10px] px-1.5 py-0.5 rounded backdrop-blur-md border ${
                        isSelected
                          ? 'border-accent bg-black text-accent font-bold'
                          : 'border-white/10 bg-black/80 text-white/70'
                      }`}
                    >
                      {region.id.toUpperCase()}: {region.latency}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Active Node Telemetry Card */}
            <div className="rounded-xl border border-border bg-bg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-mono text-fg-subtle text-[11px]">SELECTED COMPUTE ZONE:</div>
                <div className="font-bold text-white text-sm">
                  {locale === 'ar' ? activeRegion.nameAr : activeRegion.name}
                </div>
              </div>
              <div className="flex items-center gap-4 font-mono">
                <div>
                  <span className="text-fg-subtle text-[10px] block">LATENCY:</span>
                  <span className="text-accent font-bold">{activeRegion.latency}</span>
                </div>
                <div>
                  <span className="text-fg-subtle text-[10px] block">TIER:</span>
                  <span className="text-white font-bold">{activeRegion.tier}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Architecture Slate: Dynamic Metric & Blueprint Inspector (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-border bg-surface p-6 sm:p-8 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Pillar Header & Tag */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
                      PILLAR 0{activePillarIndex + 1} ARCHITECTURE
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-white/70 bg-bg px-2 py-0.5 rounded border border-border">
                      <Lock className="h-3 w-3 text-accent" />
                      LOCALIZED IP
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white leading-tight">
                    {activePillar.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-fg-muted leading-relaxed">
                    {activePillar.description}
                  </p>
                </div>

                {/* Primary Metric Outcome Card (Punchy, Zero Fluff) */}
                <div className="rounded-xl border border-accent/30 bg-accent/5 p-4 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-accent block mb-0.5">
                      MEASURED TARGET
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-white">
                      {activePillar.outcomeMetric}
                    </span>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-black font-bold">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                </div>

                {/* Concrete Blueprint Code Slate */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-fg-subtle mb-2">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="h-3.5 w-3.5 text-accent" />
                      {locale === 'ar' ? 'المخطط الهندسي للتنفيذ:' : 'Architecture Blueprint:'}
                    </span>
                    <span className="text-white/40">HCL // TS // YAML</span>
                  </div>
                  <pre className="rounded-xl border border-white/10 bg-black p-3.5 font-mono text-[11px] text-white/80 overflow-x-auto leading-relaxed">
                    <code>{pillarBlueprints[activePillarIndex]}</code>
                  </pre>
                </div>

                {/* Concrete Deliverable Hook */}
                <div className="rounded-lg border border-border bg-bg p-3 text-xs text-fg-muted">
                  <span className="text-white font-bold block mb-1">
                    {locale === 'ar' ? 'التطبيق التشغيلي الميداني:' : 'Operational Scope:'}
                  </span>
                  {activePillar.concreteExample}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Legal Verification Footnote */}
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-[11px] text-fg-subtle font-mono">
              <span>SDAIA / PDPL AUDITED</span>
              <span className="text-accent font-semibold">[CLIENT TO VERIFY]</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
