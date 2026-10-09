"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Cloud,
  Terminal,
  Activity,
  Server,
  Zap,
  ShieldCheck,
  CheckCircle2,
  GitBranch,
  Layers,
  ArrowRight,
  Database,
  Lock,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { viewportOnce } from '@/lib/motion';

export function CloudPillarsBento() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';

  return (
    <section className="relative py-24 sm:py-32 bg-[#09090b] text-white overflow-hidden border-b border-white/10" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#1d1408]/30 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-3.5 py-1.5 text-xs font-mono font-semibold text-[#e9800a] mb-4">
              <Layers className="h-3.5 w-3.5" />
              <span>{isAr ? 'ركائز الهندسة السحابية' : 'CLOUD DISCIPLINES & ARCHITECTURE'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
              {isAr ? 'بنية تحتية مرنة مصممة لموثوقية 99.99%' : 'Engineered for 99.99% Availability & Resilience'}
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              {isAr
                ? 'من إدارة عناقيد كوبرنيتس المتعددة إلى التعافي التلقائي من الكوارث عبر مناطق توفر متعددة داخل المملكة.'
                : 'From enterprise Kubernetes cluster orchestration to automated multi-AZ disaster recovery on in-kingdom hyperscalers.'}
            </p>
          </motion.div>

          <div className="font-mono text-xs text-white/50 border-s-2 border-[#e9800a] ps-4 py-1">
            <span>SRE_RIGOR • ZERO_DRIFT</span>
            <span className="block text-[#e9800a] font-bold">AUTOMATION_FIRST</span>
          </div>
        </div>

        {/* Asymmetric Bento Grid (2.0 Architecture) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Infrastructure as Code (IaC) & Zero-Drift Terraform (8 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45 }}
            className="md:col-span-8 group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#131215] to-[#0c0c0e] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div className="absolute top-0 end-0 -mt-10 -me-10 h-64 w-64 rounded-full bg-[#e9800a]/10 blur-[100px] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                  <Terminal className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                  ZERO-DRIFT IAC
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'البنية التحتية ككود (Terraform & OpenTofu)' : 'Infrastructure as Code (IaC) & Zero-Drift Terraform'}
              </h3>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xl mb-6">
                {isAr
                  ? 'بناء بيئات سحابية غير قابلة للانحراف ومطابقة بنسبة 100% لكود تيرفورم، مع قفل الحالة تلقائياً، وفحص السياسات البرمجية قبل النشر، ومنع التعديل اليدوي في لوحات التحكم.'
                  : 'Immutable infrastructure provisioning using modular Terraform and OpenTofu across AWS, Azure, and Google Cloud in-kingdom regions. Integrated OPA guardrails prevent manual console drift.'}
              </p>

              {/* Dynamic Terraform Plan Telemetry Visual */}
              <div className="rounded-2xl border border-white/10 bg-black/60 p-4 font-mono text-xs text-white/80 space-y-2">
                <div className="flex items-center justify-between text-white/40 text-[11px] border-b border-white/5 pb-2">
                  <span>TERRAFORM_ENGINE • KSA-PROD-VPC</span>
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    STATE_LOCKED
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <span className="text-white/60">plan_status:</span>
                  <span className="text-emerald-400">0 to add, 0 to change, 0 to destroy (Clean)</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <span className="text-white/60">conftest_policy_gate:</span>
                  <span className="text-[#e9800a]">PASSED (38 NCA & CIS Rules Enforced)</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <span className="text-white/60">remote_backend:</span>
                  <span className="text-white/90">s3://aeitch-tf-state-riyadh (AES-256)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-6 mt-6 border-t border-white/10 font-mono text-xs text-white/60">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>{isAr ? '100% إدارة برمجية للبنية التحتية دون تدخل يدوي' : '100% Immutable Git-Driven Infrastructure'}</span>
            </div>
          </motion.div>

          {/* Card 2: Production-Grade Kubernetes & Istio Mesh (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="md:col-span-4 group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#131215] to-[#0c0c0e] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                  <Cloud className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                  K8S & ISTIO
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'عناقيد كوبرنيتس وإدارة الحاويات' : 'Kubernetes & Container Mesh'}
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'عناقيد EKS و GKE للمؤسسات مع تحجيم سريع عبر Karpenter، وتشفير الاتصالات الداخلية mTLS عبر Istio، وعزل كامل للبيئات متعددة المستأجرين.'
                  : 'Production-grade EKS and GKE clusters with intelligent Karpenter autoscaling, Istio service mesh mTLS, and multi-tenant namespace isolation.'}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between text-white/60">
                <span>Pod Scaling Speed:</span>
                <span className="text-emerald-400 font-bold">&lt; 15s via Karpenter</span>
              </div>
              <div className="flex items-center justify-between text-white/60">
                <span>Service Mesh:</span>
                <span className="text-white/90 font-bold">Istio 100% mTLS</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: GitOps Delivery & ArgoCD Canary Deployments (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="md:col-span-4 group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#131215] to-[#0c0c0e] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                  <Zap className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                  SUB-10 MIN CI/CD
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'نشر برمجيات تلقائي عبر GitOps' : 'Automated CI/CD GitOps Delivery'}
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'خطوط تسليم مستمرة بأقل من 10 دقائق مع اختبارات آلية، وتوزيع حركة المرور بنمط الكناري، وتحديثات بدون أي انقطاع في الخدمة.'
                  : 'Sub-10-minute continuous delivery pipelines with automated testing, container image scanning, Argo Rollouts canary deployments, and zero downtime.'}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between text-white/60">
                <span>Deploy Engine:</span>
                <span className="text-white/90 font-bold">ArgoCD + GitHub Actions</span>
              </div>
              <div className="flex items-center justify-between text-white/60">
                <span>Downtime on Release:</span>
                <span className="text-emerald-400 font-bold">0 Seconds (Canary)</span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Full-Stack Observability & Telemetry (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="md:col-span-4 group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#131215] to-[#0c0c0e] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                  <Activity className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#e9800a] bg-[#e9800a]/15 border border-[#e9800a]/30 px-3 py-1 rounded-full">
                  OPENTELEMETRY
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'المراقبة الشاملة والتتبع الموزع' : 'Full-Stack Observability & Tracing'}
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'تتبع موزع للأداء، وسجلات موحدة، وتنبيهات فورية للشذوذ عبر Prometheus و Grafana و OpenTelemetry لاكتشاف الأعطال وحلها فوراً.'
                  : 'Distributed tracing, unified metrics, and anomaly alerting engineered with Prometheus, Grafana, OpenTelemetry, and Datadog for rapid root-cause isolation.'}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between text-white/60">
                <span>P99 Trace Granularity:</span>
                <span className="text-emerald-400 font-bold">Sub-Millisecond</span>
              </div>
              <div className="flex items-center justify-between text-white/60">
                <span>Alert Notification SLA:</span>
                <span className="text-[#e9800a] font-bold">&lt; 30s Escalation</span>
              </div>
            </div>
          </motion.div>

          {/* Card 5: FinOps & Cloud Cost Optimization (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="md:col-span-4 group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#131215] to-[#0c0c0e] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                  <Server className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                  FINOPS 30-50%
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'ترشيد التكاليف السحابية FinOps' : 'FinOps & Cloud Cost Optimization'}
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'تحليل دقيق لاستهلاك الموارد، واستغلال مثالي لحزم Spot المؤقتة، وإيقاف الموارد غير النشطة لتخفيض الفاتورة السحابية بنسبة 30-50%.'
                  : 'Granular cloud spend profiling, spot instance orchestration, and architectural rightsizing delivering sustained 30-50% cloud cost reductions.'}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between text-white/60">
                <span>Verified Cost Savings:</span>
                <span className="text-emerald-400 font-bold">30% - 50% Monthly</span>
              </div>
              <div className="flex items-center justify-between text-white/60">
                <span>Idle Resource Cut:</span>
                <span className="text-[#e9800a] font-bold">100% Auto-Shutdown</span>
              </div>
            </div>
          </motion.div>

          {/* Card 6: Multi-Region Disaster Recovery & 99.99% Availability (12 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="md:col-span-12 group relative rounded-3xl border border-white/10 bg-gradient-to-r from-[#121114] via-[#151419] to-[#121114] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#e9800a] font-bold">
                    HIGH-AVAILABILITY SLA
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                  {isAr
                    ? 'التعافي التلقائي من الكوارث وهندسة الصمود لمناطق التوفر المتعددة'
                    : 'Multi-AZ Disaster Recovery & 99.99% Availability Architecture'}
                </h3>

                <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl mb-6">
                  {isAr
                    ? 'عزل شبكي كامل وتكرار تلقائي للبيانات عبر مناطق توفر متعددة في الرياض والدمام. في حال حدوث أي خلل في منطقة معينة، يتم تحويل حركة المرور دون أي انقطاع للمستخدمين.'
                    : 'Active-active multi-AZ cluster resilience with automated database failover across in-kingdom hyperscalers (Riyadh & Dammam). Sub-minute RTO and zero data loss RPO guaranteed.'}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Sub-Minute Recovery Time (RTO)</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Zero Data Loss Aurora Dual-Replication (RPO)</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Cross-AZ Automated Traffic Failover</span>
                  </span>
                </div>
              </div>

              {/* Right Mini SRE Health Dashboard */}
              <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-black/60 p-5 font-mono text-xs text-white/80 space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[11px] text-white/40">
                  <span>DISASTER_RECOVERY_FABRIC</span>
                  <span className="text-emerald-400 font-bold">ALL_SYSTEMS_OPERATIONAL</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/60">Primary Enclave:</span>
                  <span className="text-white/90 font-bold">AWS Riyadh me-central-1a/b</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/60">Standby Replicas:</span>
                  <span className="text-emerald-400 font-bold">Synchronous In-Kingdom</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/60">Calculated Uptime:</span>
                  <span className="text-[#e9800a] font-bold">99.994% Past 12 Months</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
