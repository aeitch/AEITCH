"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Lock,
  KeyRound,
  FileCheck,
  ShieldCheck,
  Activity,
  Terminal,
  Server,
  Cpu,
  Layers,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { viewportOnce } from '@/lib/motion';

export function SecurityDisciplinesBento() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';

  return (
    <section className="relative py-24 sm:py-32 bg-[#09090b] text-white overflow-hidden border-b border-white/10" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#1f1408]/30 via-transparent to-transparent" />

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
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{isAr ? 'منهجيات الأمن والامتثال السيادي' : 'DEVSECOPS DISCIPLINES'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
              {isAr ? 'حراسة برمجية متكاملة من سطر الكود إلى السحابة' : 'Zero-Trust Guardrails from Code to Cloud'}
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              {isAr
                ? 'تحويل الأمان والامتثال من عقبة تبطئ دورات الإطلاق إلى بوابات برمجية مؤتمتة تضمن الحماية التامة وتسريع تسليم البرمجيات المؤسسية.'
                : 'Transforming compliance from a pre-release roadblock into automated, continuous gates that enforce NCA, PDPL, and SAMA controls without slowing engineering velocity.'}
            </p>
          </motion.div>

          <div className="font-mono text-xs text-white/50 border-s-2 border-[#e9800a] ps-4 py-1">
            <span>SHIFT_LEFT • CONTINUOUS_AUDIT</span>
            <span className="block text-[#e9800a] font-bold">SOVEREIGN_SECURITY</span>
          </div>
        </div>

        {/* Asymmetric Bento Grid (2.0 Architecture) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: HashiCorp Vault Dynamic Secrets (8 cols) */}
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
                  <KeyRound className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                  DYNAMIC 15-MIN TTL
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'إدارة الأسرار الديناميكية عبر HashiCorp Vault' : 'HashiCorp Vault Dynamic Secrets & Ephemeral Identity'}
              </h3>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xl mb-6">
                {isAr
                  ? 'القضاء التام على المفاتيح وكلمات المرور الثابتة في ملفات التكوين. توليد مستخدمي قواعد بيانات مؤقتين بمهلة زمنية قصيرة (TTL)، مع تجديد آلي وإلغاء فوري بعد انتهاء المهام.'
                  : 'Elimination of static credentials and hardcoded secrets. Applications authenticate via short-lived OIDC tokens to receive just-in-time database credentials with automatic 15-minute lease expiration.'}
              </p>

              {/* Dynamic Vault Secret Mock Visual */}
              <div className="rounded-2xl border border-white/10 bg-black/60 p-4 font-mono text-xs text-white/80 space-y-2">
                <div className="flex items-center justify-between text-white/40 text-[11px] border-b border-white/5 pb-2">
                  <span>VAULT_SECRET_ENGINE • DATABASE/CREDS/APP-RW</span>
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LEASE_ACTIVE
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <span className="text-white/60">lease_id:</span>
                  <span className="text-white/90">database/creds/ksa-prod-rw/h89a2b7...</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <span className="text-white/60">lease_duration:</span>
                  <span className="text-[#e9800a]">900s (15m 00s remaining)</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <span className="text-white/60">in_kingdom_kms:</span>
                  <span className="text-white/90">arn:aws:kms:me-central-1:ksa-master-key</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-6 mt-6 border-t border-white/10 font-mono text-xs text-white/60">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>{isAr ? 'صفر مفاتيح ثابتة في مستودعات Git' : 'Zero Static Secrets Committed to Git'}</span>
            </div>
          </motion.div>

          {/* Card 2: Shift-Left CI/CD Pipeline Scanning (4 cols) */}
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
                  <Terminal className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                  0-CVE THRESHOLD
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'بوابات فحص الأمان المبكر في CI/CD' : 'Shift-Left CI/CD Security Gates'}
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'فحص استباقي للكود المصدري عبر SonarQube، وتحليل حزم الطرف الثالث عبر Snyk، وفحص طبقات الحاويات بواسطة Trivy لمنع دمج أي ثغرة في الفرع الرئيسي.'
                  : 'Automated SAST, SCA, and container security scans integrated into pull request checks. Pull requests with high or critical CVEs are automatically blocked.'}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between text-white/60">
                <span>SonarQube Gate:</span>
                <span className="text-emerald-400 font-bold">Passed (Rating A)</span>
              </div>
              <div className="flex items-center justify-between text-white/60">
                <span>Trivy Container Scan:</span>
                <span className="text-emerald-400 font-bold">0 High / 0 Crit</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Multi-Cloud CSPM & CIS Benchmarking (4 cols) */}
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
                  <Activity className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                  REAL-TIME CSPM
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'مراقبة أمن السحابة ومعايير CIS' : 'Continuous Multi-Cloud CSPM'}
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'تدقيق مستمر على مدار الساعة لإعدادات السحابة مقابل معايير CIS العالمية، مع تنبيهات فورية لأي حاويات تخزين عامة أو صلاحيات IAM غير آمنة.'
                  : 'Real-time multi-cloud configuration auditing against CIS Benchmarks. Instant automated alerts for public S3 buckets, permissive security groups, or unencrypted storage volumes.'}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between text-white/60">
                <span>CIS Level 2 Benchmark:</span>
                <span className="text-emerald-400 font-bold">100% Compliant</span>
              </div>
              <div className="flex items-center justify-between text-white/60">
                <span>Configuration Drift:</span>
                <span className="text-white/90 font-bold">&lt; 30s Alert Time</span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: NCA ECC & CCC Policy as Code (4 cols) */}
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
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#e9800a] bg-[#e9800a]/15 border border-[#e9800a]/30 px-3 py-1 rounded-full">
                  TERRAFORM OPA
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'ضوابط NCA البرمجية ككود' : 'NCA ECC & CCC Policy as Code'}
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'سياسات Open Policy Agent (OPA) مدمجة في تيرفورم لفرض معايير الهيئة الوطنية للأمن السيبراني، ومنع نشر أي خادم غير مطابق برمجياً.'
                  : 'Automated Open Policy Agent (OPA) guardrails evaluated during terraform plan. Any infrastructure commit violating NCA controls is automatically halted.'}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between text-white/60">
                <span>NCA Controls Automated:</span>
                <span className="text-[#e9800a] font-bold">126 Rule Gates</span>
              </div>
              <div className="flex items-center justify-between text-white/60">
                <span>OPA Rego Verification:</span>
                <span className="text-emerald-400 font-bold">Sub-Second Execution</span>
              </div>
            </div>
          </motion.div>

          {/* Card 5: Saudi PDPL Class 3 Cryptographic HSM (4 cols) */}
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
                  <Cpu className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                  PDPL ARTICLE 29
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'تشفير PDPL السيادي وحماية البيانات' : 'Saudi PDPL Class 3 Cryptographic HSM'}
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'تشفير شامل للبيانات الشخصية على مستوى الحقول (AES-256-GCM) مع حفظ مفاتيح التشفير داخل وحدات HSM سيادية داخل المملكة ومنع خروج البيانات.'
                  : 'Field-level AES-256 encryption for PII data backed by dedicated in-kingdom Cloud HSMs. In-country cryptographic boundaries prevent illicit cross-border exfiltration.'}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between text-white/60">
                <span>Encryption Cipher:</span>
                <span className="text-white/90 font-bold">AES-256-GCM</span>
              </div>
              <div className="flex items-center justify-between text-white/60">
                <span>Key Enclave:</span>
                <span className="text-[#e9800a] font-bold">FIPS 140-3 Level 3</span>
              </div>
            </div>
          </motion.div>

          {/* Card 6: Single-Click CISO Audit & Regulatory Documentation (12 cols) */}
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
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#e9800a] font-bold">
                    EXECUTIVE AUDIT DOSSIERS
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                  {isAr
                    ? 'منظومة تقارير التدقيق المؤتمتة للرؤساء التنفيذيين للأمن السيبراني'
                    : 'Single-Click CISO Audit & Regulatory Evidence Engine'}
                </h3>

                <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl mb-6">
                  {isAr
                    ? 'توليد ملفات وبراهين الإثبات الرقمية بضغطة زر واحدة، جاهزة لفرق التدقيق الداخلي ومفتشي الهيئة الوطنية للأمن السيبراني (NCA) والبنك المركزي السعودي (SAMA).'
                    : 'Generate immutable cryptographic proof and compliance evidence dossiers on demand. Certified for internal CISO risk committees, NCA inspections, and external ISO/SOC2 auditor verification.'}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>NCA ECC-1:2018 Evidence Binder</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Saudi PDPL RoPA Register</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>SAMA Cyber Framework Dossier</span>
                  </span>
                </div>
              </div>

              {/* Right Mini Dashboard */}
              <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-black/60 p-5 font-mono text-xs text-white/80 space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[11px] text-white/40">
                  <span>AUDIT_TELEMETRY_ENGINE</span>
                  <span className="text-emerald-400 font-bold">ALL_CONTROLS_VERIFIED</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/60">NCA Essential Controls:</span>
                  <span className="text-emerald-400 font-bold">100% Automated Evidence</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/60">Static Secrets Detected:</span>
                  <span className="text-emerald-400 font-bold">0 in Production</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/60">Export Formats:</span>
                  <span className="text-[#e9800a] font-bold">PDF • OSCAL • JSON</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
