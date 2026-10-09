"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitBranch,
  Shield,
  Server,
  Activity,
  CheckCircle2,
  Workflow,
  Copy,
  Check,
  Terminal,
  Layers,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface DeliveryStage {
  id: string;
  stageNum: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  telemetryEn: string;
  telemetryAr: string;
  manifestTitle: string;
  yamlCode: string;
}

const STAGES: DeliveryStage[] = [
  {
    id: 'pr-gate',
    stageNum: '01',
    titleEn: 'GitHub Actions PR Quality Gate',
    titleAr: 'فحص الجودة التلقائي لطلبات الدمج (PR Gate)',
    descEn: 'Every pull request triggers automated linting, unit test suites, Trivy container security scans, and Open Policy Agent (OPA) policy verification.',
    descAr: 'كل طلب سحب يطلق تلقائياً اختبارات الكود، فحص الثغرات الأمنية للحاويات عبر Trivy، والتحقق من سياسات الأمان المؤسسية عبر OPA.',
    telemetryEn: 'Test Cycle: 4.2 mins • 0 CVE Threshold',
    telemetryAr: 'دورة الاختبار: 4.2 دقيقة • انعدام الثغرات الأمنية',
    manifestTitle: '.github/workflows/ci-security-gate.yaml',
    yamlCode: `name: CI Security & Quality Gate
on: [pull_request]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Static Analysis & OPA Guardrails
        run: conftest test manifests/ --policy policies/
      - name: Trivy Container Vulnerability Scan
        uses: aquasecurity/trivy-action@master
        with:
          severity: 'CRITICAL,HIGH'
          exit-code: '1'`,
  },
  {
    id: 'argocd-sync',
    stageNum: '02',
    titleEn: 'ArgoCD Declarative GitOps Reconcile',
    titleAr: 'المزامنة التصريحية عبر ArgoCD GitOps',
    descEn: 'Merged code in Git triggers instantaneous cluster state synchronization. ArgoCD detects zero drift and renders Kustomize overlays for in-kingdom VPCs.',
    descAr: 'الكود المعتمد في Git يطلق فوراً مزامنة حالة العنقود السحابي دون أي انحراف، مع تطبيق طبقات Kustomize المخصصة للبيئات السعودية.',
    telemetryEn: 'Sync Drift: 0ms • Git as Single Source of Truth',
    telemetryAr: 'زمن الانحراف: 0 ميلي ثانية • Git هو المصدر الوحيد للحقيقة',
    manifestTitle: 'gitops/apps/sovereign-mesh-app.yaml',
    yamlCode: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: sovereign-mesh-production
  namespace: argocd
spec:
  project: default
  source:
    repoURL: 'git@github.com:client-corp/platform-infra.git'
    targetRevision: HEAD
    path: overlays/ksa-riyadh-eks
  destination:
    server: 'https://kubernetes.default.svc'
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true`,
  },
  {
    id: 'canary-rollout',
    stageNum: '03',
    titleEn: 'Argo Rollouts Progressive Canary',
    titleAr: 'نشر الكناري التدريجي بدون انقطاع',
    descEn: 'Progressive traffic shifting (10% -> 25% -> 50% -> 100%) governed by real-time error rate analysis. Automated rollback within 3 seconds if 5xx errors exceed 0.05%.',
    descAr: 'تحويل تدريجي للزيارات مع تحليل لحظي للأخطاء، مع تراجع آلي فوري خلال 3 ثوانٍ في حال تجاوزت نسبة الأخطاء 0.05%.',
    telemetryEn: 'Rollback Window: < 3s • Zero User Impact',
    telemetryAr: 'نافذة التراجع الآلي: أقل من 3 ثوانٍ • بدون أي أثر على المستخدم',
    manifestTitle: 'manifests/rollouts/canary-deployment.yaml',
    yamlCode: `apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: domain-api-service
spec:
  replicas: 12
  strategy:
    canary:
      analysis:
        templates:
          - templateName: success-rate-prometheus
        args:
          - name: service-name
            value: domain-api
      steps:
        - setWeight: 10
        - pause: { duration: 5m }
        - setWeight: 50
        - pause: { duration: 10m }`,
  },
  {
    id: 'sre-telemetry',
    stageNum: '04',
    titleEn: 'OpenTelemetry & Karpenter Auto-Healing',
    titleAr: 'المراقبة المستمرة والمعالجة التلقائية',
    descEn: 'Prometheus metrics and distributed traces feed automated Karpenter autoscaling, rightsizing cluster capacity in sub-second intervals across Saudi hyperscaler AZs.',
    descAr: 'بيانات التتبع والمقاييس تغذي التحجيم التلقائي عبر Karpenter لتوفير الطاقة الحسابية المناسبة لحظياً في مناطق السحابة المحلية.',
    telemetryEn: 'SLO Tracking: 99.99% • Karpenter Spin-up: 45s',
    telemetryAr: 'تتبع مستوى الخدمة: 99.99% • تشغيل العقد: 45 ثانية',
    manifestTitle: 'observability/otel-collector-config.yaml',
    yamlCode: `apiVersion: opentelemetry.io/v1alpha1
kind: OpenTelemetryCollector
metadata:
  name: sovereign-telemetry
spec:
  config: |
    receivers:
      otlp:
        protocols:
          grpc:
          http:
    processors:
      batch:
      memory_limiter:
        check_interval: 1s
        limit_percentage: 75
    exporters:
      prometheus:
        endpoint: "0.0.0.0:8889"`,
  },
];

export function GitOpsPipelineSchematic() {
  const { locale, direction } = useTranslation();
  const [activeStageId, setActiveStageId] = useState<string>('canary-rollout');
  const [copied, setCopied] = useState<boolean>(false);

  const isAr = locale === 'ar';
  const currentStage = STAGES.find((s) => s.id === activeStageId) || STAGES[2];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentStage.yamlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="gitops-fabric" className="relative py-24 sm:py-32 bg-[#080808] text-white overflow-hidden border-b border-white/10" dir={direction}>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-3.5 py-1.5 text-xs font-mono font-semibold text-[#e9800a] mb-4">
            <Workflow className="h-3.5 w-3.5" />
            <span>{isAr ? 'مخطط تسليم البرمجيات الآلي' : 'GITOPS DELIVERY SCHEMATIC'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            {isAr ? 'نسيج النشر السحابي الآمن والكناري' : 'Automated Kubernetes & GitOps Delivery Fabric'}
          </h2>
          <p className="text-sm sm:text-base text-white/70">
            {isAr
              ? 'مخطط تسليم حقيقي يوضح مراحل النشر الآمن من طلب الدمج (PR) إلى التحويل التدريجي للزيارات مع التراجع الآلي في ثوانٍ.'
              : 'End-to-end declarative delivery pipeline enforcing automated quality gates, zero-drift GitOps reconciliation, and sub-second canary telemetry.'}
          </p>
        </div>

        {/* 4-Step Interactive Pipeline Stepper */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {STAGES.map((stg) => {
            const isActive = stg.id === activeStageId;
            return (
              <button
                key={stg.id}
                type="button"
                onClick={() => setActiveStageId(stg.id)}
                className={`p-4 sm:p-5 rounded-2xl border text-start transition-all relative overflow-hidden ${
                  isActive
                    ? 'border-[#e9800a] bg-[#e9800a]/10 shadow-[0_0_25px_-5px_rgba(233,128,10,0.3)]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePipelineIndicator"
                    className="absolute inset-x-0 bottom-0 h-1 bg-[#e9800a]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-sm font-bold ${isActive ? 'text-[#e9800a]' : 'text-white/40'}`}>
                    STAGE {stg.stageNum}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </div>
                <h4 className={`text-xs sm:text-sm font-bold truncate ${isActive ? 'text-white' : 'text-white/70'}`}>
                  {isAr ? stg.titleAr : stg.titleEn}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Split Stage Deep-Dive & Live Manifest Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Operational Stage Narrative (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-gradient-to-b from-[#121114] to-[#0c0c0e] p-6 sm:p-8 flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#e9800a] font-bold">
                  STAGE {currentStage.stageNum} • DEEP DIVE
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#e9800a] animate-pulse" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                {isAr ? currentStage.titleAr : currentStage.titleEn}
              </h3>

              <p className="text-sm text-white/75 leading-relaxed mb-6">
                {isAr ? currentStage.descAr : currentStage.descEn}
              </p>

              <div className="p-4 rounded-2xl border border-white/10 bg-black/40 font-mono text-xs space-y-1 mb-6">
                <span className="text-[#e9800a] font-bold block mb-1">
                  {isAr ? 'مؤشر الأداء التشغيلي:' : 'OPERATIONAL TELEMETRY:'}
                </span>
                <span className="text-white/90">
                  {isAr ? currentStage.telemetryAr : currentStage.telemetryEn}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-white/50 flex items-center justify-between">
              <span>SECURITY_GATE: PASS</span>
              <span className="text-emerald-400">ENFORCED IN KSA VPC</span>
            </div>
          </div>

          {/* Right: Real Declarative Manifest Inspector (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-[#e9800a]/25 bg-black/90 p-5 sm:p-7 flex flex-col justify-between shadow-[0_20px_50px_-20px_rgba(233,128,10,0.15)]">
            <div>
              {/* Header with terminal dots and filename */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2 font-mono text-xs text-white/70">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-[#e9800a] ms-2">{currentStage.manifestTitle}</span>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-white/10 bg-white/5 font-mono text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? 'Copied' : 'Copy Manifest'}</span>
                </button>
              </div>

              {/* Code display */}
              <pre className="font-mono text-xs text-emerald-400/90 leading-relaxed overflow-x-auto p-2 bg-black/60 rounded-xl border border-white/5">
                <code>{currentStage.yamlCode}</code>
              </pre>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-white/40">
              <span>DECLARATIVE GITOPS SCHEMA • V2.4</span>
              <span>100% AUDITED REPO ASSET</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
