"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Workflow,
  Cpu,
  Database,
  CheckCircle2,
  Activity,
  Terminal,
  Zap,
  Server,
  Lock,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export interface MicroserviceMetric {
  label: string;
  labelAr: string;
  value: string;
}

export interface MicroserviceStage {
  id: 'gateway' | 'broker' | 'workers' | 'datalake';
  stageNumber: string;
  title: string;
  titleAr: string;
  technology: string;
  role: string;
  roleAr: string;
  status: string;
  metrics: MicroserviceMetric[];
  manifestSnippet: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const TOPOLOGY_STAGES: MicroserviceStage[] = [
  {
    id: 'gateway',
    stageNumber: '01',
    title: 'API Gateway (Kong / Envoy)',
    titleAr: 'بوابة واجهات البرمجة (Kong / Envoy)',
    technology: 'Kong / Envoy Mesh',
    role: 'TLS termination, rate-limiting, Nafath OAuth2 SSO, and ultra-fast edge routing.',
    roleAr: 'إنهاء تشفير TLS وإدارة تدفق الطلبات والتوثيق الموحد نفاذ والتوجيه الحافي فائق السرعة.',
    status: 'ONLINE // OPTIMAL',
    metrics: [
      { label: 'Edge Latency', labelAr: 'زمن استجابة الحافة', value: '1.2ms' },
      { label: 'Ingress Volume', labelAr: 'معدل الطلبات الواردة', value: '124k req/s' },
      { label: 'Protocols', labelAr: 'البروتوكولات المدعومة', value: 'HTTP/3 & gRPC' },
      { label: 'Fault Tolerance', labelAr: 'احتمال الأعطال', value: 'Multi-AZ Active' },
    ],
    manifestSnippet: `# Kong Ingress Route Manifest
apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: sovereign-mtls-auth
config:
  protocols: ["grpc", "grpcs", "http", "https"]
  enforce_nafath_sso: true
  rate_limit: 50000
  fault_strategy: active-active-failover`,
    icon: Shield,
  },
  {
    id: 'broker',
    stageNumber: '02',
    title: 'Event Broker (Apache Kafka)',
    titleAr: 'ناقل الأحداث الموزع (Apache Kafka)',
    technology: 'Apache Kafka Enterprise',
    role: 'Decoupled event streaming, partition balancing, and zero-loss asynchronous queueing.',
    roleAr: 'بث الأحداث المفككة وموازنة الحزم وقوائم الانتظار غير المتزامنة عديمة الفقدان.',
    status: 'ONLINE // CLUSTERED',
    metrics: [
      { label: 'Cluster Throughput', labelAr: 'تدفق العنقود', value: '850 MB/s' },
      { label: 'Topic Lag', labelAr: 'تأخر القنوات', value: '0ms' },
      { label: 'Cluster Mode', labelAr: 'نمط العنقود', value: '3-Node Quorum' },
      { label: 'Partitions', labelAr: 'الحزم المتوازنة', value: '64 Balanced' },
    ],
    manifestSnippet: `# Kafka Topic Stream Configuration
apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaTopic
metadata:
  name: enterprise.telemetry.events
spec:
  partitions: 64
  replicas: 3
  config:
    min.insync.replicas: 2
    retention.ms: 604800000
    segment.bytes: 1073741824`,
    icon: Workflow,
  },
  {
    id: 'workers',
    stageNumber: '03',
    title: 'Isolated Worker Pods',
    titleAr: 'حاويات المعالجة المعزولة',
    technology: 'Docker / Kubernetes Pods',
    role: 'Air-gapped background task consumers, multi-agent AI pods, and sandboxed runtimes.',
    roleAr: 'معالجة خلفية معزولة وحاويات وكلاء الذكاء الاصطناعي وبيئات التشغيل الآمنة.',
    status: 'ONLINE // AUTOSCALING',
    metrics: [
      { label: 'Active Pods', labelAr: 'الحاويات النشطة', value: '32 Autoscaled' },
      { label: 'CPU Utilization', labelAr: 'استهلاك المعالج', value: '34%' },
      { label: 'Memory Footprint', labelAr: 'ذاكرة الحاويات', value: '48 GB' },
      { label: 'Sandboxing', labelAr: 'عزل الأمان', value: 'gVisor RunSC' },
    ],
    manifestSnippet: `# Sandboxed Worker Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sovereign-worker-pod
spec:
  replicas: 32
  template:
    spec:
      runtimeClassName: gvisor-runsc
      securityContext:
        readOnlyRootFilesystem: true
        allowPrivilegeEscalation: false`,
    icon: Cpu,
  },
  {
    id: 'datalake',
    stageNumber: '04',
    title: 'Sovereign Data Lake',
    titleAr: 'بحيرة البيانات السيادية',
    technology: 'PostgreSQL / MinIO / S3',
    role: 'Cryptographic tamper-proof audit trails, multi-AZ synchronous replicas, and PDPL Class-3 compliance.',
    roleAr: 'سجلات تدقيق مشفرة غير قابلة للتلاعب وتكرار متزامن وامتثال كامل لقانون حماية البيانات.',
    status: 'ONLINE // REPLICATED',
    metrics: [
      { label: 'Storage IOPS', labelAr: 'عمليات الإدخال/الإخراج', value: '45,000 IOPS' },
      { label: 'Data Residency', labelAr: 'نطاق استضافة البيانات', value: 'SA-Riyadh-AZ1' },
      { label: 'Encryption Standard', labelAr: 'معيار التشفير', value: 'AES-256-GCM' },
      { label: 'Replication Mode', labelAr: 'نمط التكرار', value: 'Synchronous 3-AZ' },
    ],
    manifestSnippet: `# Sovereign Encrypted Data Store
apiVersion: postgresql.cnpg.io/v1
kind: Cluster
metadata:
  name: sovereign-data-lake
spec:
  instances: 3
  storage:
    size: 2Ti
    storageClass: nvme-encrypted-ksa
  backup:
    target: local-sovereign-minio
    encryption: AES256-GCM`,
    icon: Database,
  },
];

export interface SovereignMicroservicesTopologyProps {
  className?: string;
  defaultActiveNode?: 'gateway' | 'broker' | 'workers' | 'datalake';
  showCodeSnippet?: boolean;
}

export function SovereignMicroservicesTopology({
  className = '',
  defaultActiveNode = 'gateway',
  showCodeSnippet = true,
}: SovereignMicroservicesTopologyProps) {
  const { locale, direction } = useTranslation();
  const [activeStageId, setActiveStageId] = useState<'gateway' | 'broker' | 'workers' | 'datalake'>(
    defaultActiveNode
  );

  const activeStage =
    TOPOLOGY_STAGES.find((s) => s.id === activeStageId) || TOPOLOGY_STAGES[0];

  return (
    <div
      data-testid="sovereign-microservices-topology"
      className={`rounded-2xl border border-white/10 bg-black p-4 sm:p-6 lg:p-7 space-y-6 text-white ${className}`}
      dir={direction}
    >
      {/* 1. TOP HEADER HUD */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 border border-accent/30 text-accent">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                {locale === 'ar'
                  ? 'طوبولوجيا الخدمات المصغرة السيادية'
                  : 'SOVEREIGN MICROSERVICES TOPOLOGY'}
              </span>
              <span className="flex h-2 w-2 rounded-full bg-accent animate-ping" />
            </div>
            <p className="font-mono text-[10px] text-white/50">
              {'4-STAGE EVENT-DRIVEN ENTERPRISE BUS // SUB-15MS LATENCY'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-[10px]">
          <span className="rounded bg-accent/10 px-2.5 py-1 text-accent border border-accent/25 font-bold">
            FAULT TOLERANCE: ACTIVE-ACTIVE
          </span>
          <span className="rounded bg-white/5 px-2.5 py-1 text-white/70 border border-white/10">
            KSA PDPL CLASS 3
          </span>
        </div>
      </div>

      {/* 2. DESKTOP / TABLET HORIZONTAL INTERACTIVE SVG TOPOLOGY BUS (md+) */}
      <div className="hidden md:block relative rounded-xl border border-white/10 bg-[#09090b] p-6 overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

        <div className="relative">
          {/* Main SVG Backplane */}
          <svg
            className="w-full h-28"
            viewBox="0 0 900 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="busGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e9800a" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#e9800a" stopOpacity="1" />
                <stop offset="100%" stopColor="#e9800a" stopOpacity="0.6" />
              </linearGradient>
              <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Glow Rail */}
            <path
              d="M 112 55 L 788 55"
              stroke="rgba(233, 128, 10, 0.2)"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Core Segmented Bus Line */}
            <path
              d="M 112 55 L 788 55"
              stroke="url(#busGradient)"
              strokeWidth="2.5"
              strokeDasharray="6 4"
            />

            {/* Continuous Animated Telemetry Packet Pulses */}
            <motion.circle
              cx="112"
              cy="55"
              r="4.5"
              fill="#ffffff"
              filter="url(#glowFilter)"
              animate={{
                cx: [112, 337, 562, 788],
                opacity: [0.2, 1, 1, 0.2],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.circle
              cx="112"
              cy="55"
              r="3.5"
              fill="#e9800a"
              filter="url(#glowFilter)"
              animate={{
                cx: [112, 337, 562, 788],
                opacity: [0.1, 1, 1, 0.1],
              }}
              transition={{
                duration: 2.4,
                delay: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Connecting Stage Anchor Nodes */}
            {[112, 337, 562, 788].map((cx, idx) => (
              <g key={idx}>
                <circle cx={cx} cy={55} r="14" fill="#000000" stroke="#e9800a" strokeWidth="1.5" />
                <circle cx={cx} cy={55} r="6" fill="#e9800a" />
              </g>
            ))}
          </svg>

          {/* Interactive Stage Node Cards Overlaid */}
          <div className="grid grid-cols-4 gap-4 mt-2">
            {TOPOLOGY_STAGES.map((stage) => {
              const isSelected = activeStageId === stage.id;
              const Icon = stage.icon;
              return (
                <button
                  key={stage.id}
                  type="button"
                  data-testid={`topology-node-${stage.id}`}
                  onClick={() => setActiveStageId(stage.id)}
                  aria-selected={isSelected}
                  role="tab"
                  className={`group relative flex flex-col text-start rounded-xl p-3.5 transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? 'border-accent bg-surface-2 ring-1 ring-accent/40 shadow-glow-sm'
                      : 'border-white/10 bg-[#0d0d10] hover:border-white/30 hover:bg-surface'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-mono text-[10px] font-bold ${
                        isSelected ? 'text-accent' : 'text-white/50'
                      }`}
                    >
                      STAGE {stage.stageNumber}
                    </span>
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isSelected ? 'bg-accent animate-pulse' : 'bg-white/20'
                      }`}
                    />
                  </div>

                  <div className="flex items-center gap-2 mb-1.5">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-md ${
                        isSelected
                          ? 'bg-accent text-black font-bold'
                          : 'bg-white/5 text-white/70 group-hover:text-accent'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-white truncate">
                      {stage.technology}
                    </span>
                  </div>

                  <span className="text-[11px] text-white/60 line-clamp-2 leading-relaxed">
                    {locale === 'ar' ? stage.titleAr : stage.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. MOBILE VERTICAL PIPELINE MODE (< md) */}
      <div className="md:hidden space-y-3">
        <div className="flex items-center justify-between pb-1">
          <span className="font-mono text-[11px] text-white/50 uppercase tracking-wider">
            {locale === 'ar' ? 'مسار التدفق الرأسي' : 'VERTICAL PIPELINE FLOW'}
          </span>
          <span className="font-mono text-[10px] text-accent">TAP NODE TO INSPECT</span>
        </div>

        <div className="relative pl-6 space-y-3 border-l-2 border-accent/40">
          {TOPOLOGY_STAGES.map((stage) => {
            const isSelected = activeStageId === stage.id;
            const Icon = stage.icon;
            return (
              <button
                key={stage.id}
                type="button"
                data-testid={`topology-node-mobile-${stage.id}`}
                onClick={() => setActiveStageId(stage.id)}
                aria-selected={isSelected}
                role="tab"
                className={`w-full text-start rounded-xl p-3 border transition-all ${
                  isSelected
                    ? 'border-accent bg-surface-2 ring-1 ring-accent'
                    : 'border-white/10 bg-[#0d0d10]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`font-mono text-[10px] font-bold ${
                      isSelected ? 'text-accent' : 'text-white/40'
                    }`}
                  >
                    {`STAGE ${stage.stageNumber} // ${stage.status}`}
                  </span>
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded ${
                      isSelected ? 'bg-accent text-black' : 'bg-white/10 text-white'
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                  </div>
                </div>

                <div className="font-bold text-xs text-white">
                  {locale === 'ar' ? stage.titleAr : stage.title}
                </div>
                <div className="font-mono text-[11px] text-accent mt-0.5">
                  {stage.technology}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. ACTIVE NODE TELEMETRY INSPECTOR SLATE */}
      <motion.div
        key={activeStage.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="rounded-xl border border-white/15 bg-[#0e0e11] p-4 sm:p-5 space-y-4"
      >
          {/* Header of Inspector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span
                  data-testid="topology-active-stage-tag"
                  className="font-mono text-[10px] text-accent font-bold px-1.5 py-0.5 rounded bg-accent/10 border border-accent/20"
                >
                  STAGE {activeStage.stageNumber} ACTIVE
                </span>
                <span className="font-bold text-sm text-white">
                  {locale === 'ar' ? activeStage.titleAr : activeStage.title}
                </span>
              </div>
              <p className="mt-1 text-xs text-white/70 leading-relaxed">
                {locale === 'ar' ? activeStage.roleAr : activeStage.role}
              </p>
            </div>

            <div className="font-mono text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded self-start sm:self-auto flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {activeStage.status}
            </div>
          </div>

          {/* 4-Metric Live Telemetry Grid */}
          <div>
            <div className="font-mono text-[10px] text-white/50 uppercase tracking-wider mb-2">
              {locale === 'ar' ? 'مؤشرات الأداء اللحظية للمرحلة' : 'LIVE STAGE TELEMETRY METRICS'}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {activeStage.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-white/10 bg-black/60 p-2.5 font-mono"
                >
                  <span className="text-[10px] text-white/50 block truncate">
                    {locale === 'ar' ? metric.labelAr : metric.label}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white block mt-0.5 truncate">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Infrastructure Manifest Snippet (CRD / HCL / K8S) */}
          {showCodeSnippet && (
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5 text-accent" />
                  {locale === 'ar'
                    ? 'بيان البنية التحتية البرمجية للمرحلة:'
                    : 'Infrastructure Manifest Spec:'}
                </span>
                <span className="text-white/40">{'YAML // K8S CRD'}</span>
              </div>
              <pre className="rounded-lg border border-white/10 bg-black p-3 font-mono text-[10px] sm:text-[11px] text-white/80 overflow-x-auto leading-relaxed">
                <code>{activeStage.manifestSnippet}</code>
              </pre>
            </div>
          )}
        </motion.div>
    </div>
  );
}
