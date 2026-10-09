"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Terminal,
  Workflow,
  Server,
  Activity,
  Layers,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Cpu,
  GitBranch,
  Sparkles,
  Lock,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { viewportOnce } from '@/lib/motion';

export function PlatformDisciplinesBento() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';

  return (
    <section className="relative py-24 sm:py-32 bg-[#09090b] text-white overflow-hidden border-b border-white/10" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#1c1208]/30 via-transparent to-transparent" />

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
              <span>{isAr ? 'منهجيات هندسة المنصات' : 'PLATFORM DISCIPLINES'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
              {isAr ? 'بنية تحتية ذاتية الخدمة ومعايير SRE صارمة' : 'Self-Service Platforms & SRE Engineering Rigor'}
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              {isAr
                ? 'تحويل البنية التحتية إلى منصة برمجية موحدة تمكن فرق المنتجات من إطلاق الميزات باستقلالية وأمان تام دون الاعتماد على طلبات الدعم اليدوية.'
                : 'Empowering product squads with self-service developer portals, automated GitOps canary rollouts, and zero-drift infrastructure as code.'}
            </p>
          </motion.div>

          <div className="font-mono text-xs text-white/50 border-s-2 border-[#e9800a] ps-4 py-1">
            <span>SRE_CADENCE • ZERO TICKETS</span>
            <span className="block text-[#e9800a] font-bold">AUTOMATION-FIRST</span>
          </div>
        </div>

        {/* Asymmetric Bento Grid (2.0 Architecture) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Internal Developer Platforms (IDPs) (8 cols) */}
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
                  SELF-SERVICE IDP
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'منصات المطورين الداخلية (IDPs)' : 'Internal Developer Platforms (IDPs)'}
              </h3>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xl mb-6">
                {isAr
                  ? 'بوابات خدمة ذاتية للمطورين تمكن فرق المنتجات من إنشاء بيئات تجريبية، قواعد بيانات معزولة، وخطوط نشر CI/CD مؤتمتة في دقائق دون الحاجة لفتح تذاكر عمليات يدوية.'
                  : 'Self-service developer portals empowering product squads to provision isolated preview environments, database instances, and secure CI/CD pipelines in minutes without operational ticket delays.'}
              </p>
            </div>

            {/* Technical Sub-badges */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-white/80">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e9800a]" />
                <span>Ephemeral Environments</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e9800a]" />
                <span>Automated PR Sandboxes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e9800a]" />
                <span>RBAC & Secrets Injection</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Immutable Infrastructure as Code (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="md:col-span-4 group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#121114] to-[#0c0c0e] p-8 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                  <Workflow className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#e9800a] bg-[#e9800a]/10 border border-[#e9800a]/30 px-3 py-1 rounded-full">
                  ZERO DRIFT
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'البنية التحتية ككود ثابت (IaC)' : 'Immutable Infrastructure as Code'}
              </h3>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'إدارة السحابة بدون أي انحراف (Zero-Drift) باستخدام Terraform و OpenTofu، مع قفل الحالة عن بعد وحوكمة السياسات ككود (Policy-as-Code) لضمان الأمان المؤسسي.'
                  : 'Zero-drift cloud provisioning using Terraform, OpenTofu, and Pulumi with automated state locking, policy-as-code guardrails (OPA), and modular blueprints.'}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-white/60">
              <span>Terraform Modules • OPA Policy Gates</span>
            </div>
          </motion.div>

          {/* Card 3: Multi-Cloud Kubernetes Orchestration (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="md:col-span-4 group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#121114] to-[#0c0c0e] p-8 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                  <Server className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                  EKS / AKS / GKE
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'إدارة كوبرنيتس متعدد السحابات' : 'Multi-Cluster Kubernetes Orchestration'}
              </h3>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'معماريات كوبرنيتس معتمدة من CKA في مناطق الرياض والدمام السحابية مع تحجيم تلقائي فائق السرعة عبر Karpenter وشبكة Istio mTLS.'
                  : 'Certified CKA Kubernetes multi-cluster architectures deployed on AWS EKS Riyadh, Azure AKS, and GKE with sub-second Karpenter autoscaling and Istio mesh.'}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-white/60">
              <span>Karpenter Spot Scaling • Istio mTLS</span>
            </div>
          </motion.div>

          {/* Card 4: GitOps Progressive Delivery Fabric (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="md:col-span-4 group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#121114] to-[#0c0c0e] p-8 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                  <GitBranch className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                  ARGOCD GITOPS
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'خطوط تسليم GitOps المؤتمتة' : 'GitOps Progressive Delivery Fabric'}
              </h3>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'خطوط تسليم تعتمد على ArgoCD تدعم نشر الكناري التدريجي (Canary) والتبديل الأزرق/الأخضر (Blue-Green) مع اختبارات آلية تحت 10 دقائق.'
                  : 'ArgoCD declarative delivery pipelines enforcing progressive delivery: automated canary rollouts, blue-green cutovers, and sub-10-minute automated test cycles.'}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-white/60">
              <span>Canary Analysis • Automated Rollback</span>
            </div>
          </motion.div>

          {/* Card 5: Full-Stack SRE & Distributed Tracing (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="md:col-span-4 group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#121114] to-[#0c0c0e] p-8 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                  <Activity className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                  OPENTELEMETRY
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'هندسة موثوقية الأنظمة (SRE) والتتبع' : 'Full-Stack SRE & Distributed Tracing'}
              </h3>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'مراقبة وتتبع شامل للنظام باستخدام OpenTelemetry و Prometheus و Grafana، مع إشعارات ذكية وأدلة تشغيل مؤتمتة لمعالجة الحوادث.'
                  : 'End-to-end telemetry engineered with OpenTelemetry, Prometheus, and Grafana, providing real-time distributed tracing and automated incident response.'}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-white/60">
              <span>SLO Alerting • Synthetic Canary Probes</span>
            </div>
          </motion.div>

          {/* Card 6: FinOps Cloud Spend Governance (12 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="md:col-span-12 group relative rounded-3xl border border-[#e9800a]/30 bg-gradient-to-r from-[#171410] via-[#12100d] to-[#0d0c0b] p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_-20px_rgba(233,128,10,0.15)]"
          >
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#e9800a]">
                  {isAr ? 'حوكمة النفقات السحابية FINOPS' : 'FINOPS CLOUD OPEX OPTIMIZATION'}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#e9800a]" />
                <span className="font-mono text-xs text-white/60">
                  SUSTAINED 35% - 50% SAVINGS
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                {isAr
                  ? 'حوكمة التكاليف وضبط استهلاك الموارد السحابية'
                  : 'Continuous Cloud Spend Governance & Rightsizing'}
              </h3>

              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                {isAr
                  ? 'إيقاف الهدر المالي السحابي عبر جدولة الخوادم غير النشطة، وإدارة عقود الحجز المسبق، واستخدام الحاويات المؤقتة (Spot Instances) المضمونة، مما يوفر 30% إلى 50% شهرياً في فواتير الحوسبة.'
                  : 'Automated cluster rightsizing, Karpenter Spot instance orchestration, and continuous idle resource reclamation delivering sustained 30-50% infrastructure OPEX reductions without sacrificing production headroom.'}
              </p>
            </div>

            <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 shrink-0 font-mono">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-center">
                <span className="text-2xl font-bold text-emerald-400 block">-42%</span>
                <span className="text-[10px] text-white/50 uppercase">Compute OPEX</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-center">
                <span className="text-2xl font-bold text-white block">Spot</span>
                <span className="text-[10px] text-white/50 uppercase">Karpenter Pool</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-center">
                <span className="text-2xl font-bold text-[#e9800a] block">Zero</span>
                <span className="text-[10px] text-white/50 uppercase">Idle Waste</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
