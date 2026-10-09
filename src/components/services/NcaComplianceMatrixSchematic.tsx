"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  FileCode,
  Copy,
  Check,
  Server,
  Terminal,
  Activity,
  ChevronRight,
  Database,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface ComplianceDomain {
  id: string;
  codeNumber: string;
  titleEn: string;
  titleAr: string;
  mandateEn: string;
  mandateAr: string;
  controlsCount: string;
  enforcementMode: string;
  manifestFile: string;
  manifestCode: string;
}

const DOMAINS: ComplianceDomain[] = [
  {
    id: 'nca-ecc',
    codeNumber: 'NCA ECC-1:2018',
    titleEn: 'Identity, Access & Ephemeral Secret Governance',
    titleAr: 'إدارة الهوية والوصول وحوكمة الأسرار المؤقتة',
    mandateEn: 'Mandates multi-factor authentication, least privilege access policies, short-lived credentials, and the absolute elimination of hardcoded secrets across all environments.',
    mandateAr: 'يفرض المصادقة متعددة العوامل، وسياسات الحد الأدنى من الصلاحيات، واستخدام أسرار مؤقتة قصيرة العمر، مع الإلغاء الكامل لأي بيانات اعتماد ثابتة.',
    controlsCount: '38 Sub-Controls Automated',
    enforcementMode: 'OPA Rego Policy Gate in CI/CD',
    manifestFile: 'policies/nca-ecc-iam-guardrail.rego',
    manifestCode: `package nca.ecc.iam

# Rule: Deny hardcoded static credentials or permanent access keys
default allow = false

allow {
    count(violation) == 0
}

violation[msg] {
    some resource in input.resource_changes
    resource.type == "aws_iam_access_key"
    msg := sprintf("NCA ECC-1:2018 (Control 2-3-3): Static IAM access keys are strictly prohibited for resource '%v'. Use Vault OIDC role assumption instead.", [resource.address])
}

violation[msg] {
    some resource in input.resource_changes
    resource.type == "aws_db_instance"
    resource.change.after.password != null
    msg := "NCA ECC-1:2018 (Control 2-3-4): Static master DB passwords forbidden. Use HashiCorp Vault dynamic database engine."
}`,
  },
  {
    id: 'nca-ccc',
    codeNumber: 'NCA CCC-1:2020',
    titleEn: 'Cloud Cybersecurity Controls & Network Boundary',
    titleAr: 'ضوابط الأمن السيبراني السحابي والعزل الشبكي',
    mandateEn: 'Requires complete network isolation, default-deny egress policies, private transit gateways, and absolute prevention of public cloud storage exposures.',
    mandateAr: 'يتطلب عزلاً شبكياً كاملاً، وسياسات حظر الخروج الافتراضية، وبوابات عبور خاصة، مع المنع التام لأي وصول عام إلى حاويات التخزين السحابية.',
    controlsCount: '42 Sub-Controls Automated',
    enforcementMode: 'Terraform Sentinel & Conftest',
    manifestFile: 'terraform/sentinel/nca-ccc-network-boundary.sentinel',
    manifestCode: `import "tfplan/v2" as tfplan

# NCA CCC-1:2020: Enforce private subnets and block public IP assignment
public_ips_denied = rule {
    all tfplan.resource_changes as _, rc {
        rc.type is "aws_instance" and
        rc.change.after.associate_public_ip_address is false
    }
}

# Block unencrypted S3 Buckets in KSA Hyperscaler regions
s3_encrypted_in_kingdom = rule {
    all tfplan.resource_changes as _, rc {
        rc.type is "aws_s3_bucket" and
        rc.change.after.server_side_encryption_configuration is not null
    }
}

main = rule {
    public_ips_denied and s3_encrypted_in_kingdom
}`,
  },
  {
    id: 'saudi-pdpl',
    codeNumber: 'SAUDI PDPL (M/19)',
    titleEn: 'Article 29 Data Sovereignty & HSM Enclave',
    titleAr: 'المادة 29: سيادة البيانات والتشفير عبر وحدات HSM',
    mandateEn: 'Mandates strict in-kingdom cryptographic boundaries, AES-256 field-level encryption for sensitive PII, and automated blocking of cross-border data replication.',
    mandateAr: 'يفرض حفظ وتشفير البيانات الحساسة داخل الحدود الجغرافية للمملكة عبر مفاتيح HSM سيادية، مع منع التكرار العابر للحدود دون إذن نظامي مسبق.',
    controlsCount: '24 Legal Data Rules Enforced',
    enforcementMode: 'In-Kingdom Cloud KMS & Field Cipher',
    manifestFile: 'security/pdpl-class3-envelope-encryption.tf',
    manifestCode: `resource "aws_kms_key" "ksa_pdpl_master_key" {
  description             = "Saudi PDPL Class 3 Dedicated HSM Master Key (Riyadh)"
  deletion_window_in_days = 30
  enable_key_rotation     = true
  customer_master_key_spec = "SYMMETRIC_DEFAULT"

  tags = {
    ComplianceMandate   = "Saudi-PDPL-Royal-Decree-M19"
    DataClassification  = "Class-3-Strict-Sovereignty"
    GeographicResidency = "sa-central-1-riyadh"
  }
}

resource "aws_kms_alias" "ksa_pdpl_alias" {
  name          = "alias/ksa-pdpl-pii-envelope"
  target_key_id = aws_kms_key.ksa_pdpl_master_key.key_id
}`,
  },
  {
    id: 'sama-csf',
    codeNumber: 'SAMA CYBER FRAMEWORK',
    titleEn: 'Financial Grade CI/CD & Secret Rotation',
    titleAr: 'حوكمة الأمان للمؤسسات المالية والتدوير التلقائي للأسرار',
    mandateEn: 'Enforces dual-custody access policies, short-lived CI/CD runner identities, immutable WORM audit logs, and continuous vulnerability remediation within 24 hours.',
    mandateAr: 'يفرض الحيازة المزدوجة للأسرار، وهويات تشغيل مؤقتة لخطوط CI/CD، وتسجيل سجلات غير قابلة للتعديل (WORM)، ومعالجة الثغرات الحرجة خلال 24 ساعة.',
    controlsCount: '22 Financial Controls Automated',
    enforcementMode: 'HashiCorp Vault Dynamic DB Engine',
    manifestFile: 'vault/config/sama-dynamic-database-engine.hcl',
    manifestCode: `path "database/creds/sama-fintech-rw" {
  capabilities = ["read"]
}

# Dynamic PostgreSQL Secret Engine with 15-Minute Auto-Revoke TTL
path "database/config/ksa-core-banking-db" {
  capabilities = ["create", "update", "read"]
  allowed_parameters = {
    plugin_name    = ["postgresql-database-plugin"]
    allowed_roles  = ["sama-fintech-rw", "sama-readonly-audit"]
    connection_url = "postgresql://{{username}}:{{password}}@db-cluster.internal:5432/fintech_prod?sslmode=verify-full"
    default_ttl    = "15m"
    max_ttl        = "1h"
  }
}`,
  },
];

export function NcaComplianceMatrixSchematic() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';

  const [activeDomainId, setActiveDomainId] = useState<string>('nca-ecc');
  const [copied, setCopied] = useState<boolean>(false);

  const activeDomain = DOMAINS.find((d) => d.id === activeDomainId) || DOMAINS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeDomain.manifestCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="compliance-matrix" className="relative py-24 sm:py-32 bg-[#080808] text-white overflow-hidden border-b border-white/10" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#1d1408]/30 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-3.5 py-1.5 text-xs font-mono font-semibold text-[#e9800a] mb-4">
            <FileCode className="h-3.5 w-3.5" />
            <span>{isAr ? 'مصفوفة الامتثال والسياسات البرمجية' : 'NCA & PDPL POLICY AS CODE'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            {isAr ? 'حوكمة الأمن السيبراني مدمجة في كود البنية التحتية' : 'Sovereign Cybersecurity Policy as Code'}
          </h2>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            {isAr
              ? 'لا نكتفي بتقديم المشورة النظرية؛ بل نحول لوائح الأمن السيبراني الصادرة عن الهيئة الوطنية للأمن السيبراني ونظام حماية البيانات إلى سياسات برمجية قابلة للتحقق الفوري عبر OPA و Terraform.'
              : 'We do not rely on passive checklists. We encode the National Cybersecurity Authority (NCA) and Saudi PDPL regulations directly into machine-enforceable OPA Rego and Terraform policies.'}
          </p>
        </div>

        {/* Interactive Matrix Workspace: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Domain Selectors (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {DOMAINS.map((domain) => {
              const isSelected = domain.id === activeDomainId;
              return (
                <button
                  key={domain.id}
                  onClick={() => setActiveDomainId(domain.id)}
                  className={`w-full text-start p-5 rounded-2xl border transition-all relative overflow-hidden ${
                    isSelected
                      ? 'border-[#e9800a] bg-gradient-to-r from-[#17130f] to-[#121114] shadow-[0_0_25px_rgba(233,128,10,0.18)]'
                      : 'border-white/10 bg-[#0d0d0f] hover:border-white/20 hover:bg-[#121114]'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 bottom-0 start-0 w-1 bg-[#e9800a]" />
                  )}

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-[#e9800a] tracking-wider">
                      {domain.codeNumber}
                    </span>
                    <span className="font-mono text-[11px] text-white/50 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                      {domain.controlsCount}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {isAr ? domain.titleAr : domain.titleEn}
                  </h3>

                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                    {isAr ? domain.mandateAr : domain.mandateEn}
                  </p>

                  <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                    <span>{domain.enforcementMode}</span>
                    <ChevronRight className={`h-3.5 w-3.5 text-[#e9800a] transition-transform ${isSelected ? 'translate-x-1' : ''}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Policy Manifest Inspector (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-[#0c0c0e] p-6 shadow-2xl relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                    <Terminal className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-white/90 font-bold block">
                      {activeDomain.manifestFile}
                    </span>
                    <span className="font-mono text-[10px] text-white/40">
                      {activeDomain.enforcementMode}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-all active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">{isAr ? 'تم النسخ' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>{isAr ? 'نسخ الكود' : 'Copy Policy'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Snippet Area */}
              <div className="relative rounded-2xl bg-black/80 border border-white/5 p-4 sm:p-5 overflow-x-auto font-mono text-xs sm:text-[13px] leading-relaxed text-white/90">
                <pre>
                  <code>{activeDomain.manifestCode}</code>
                </pre>
              </div>

              {/* Explanatory Context Footer */}
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-white/60">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#e9800a]" />
                  <span>
                    {isAr
                      ? 'يتم التحقق آلياً قبل كل عملية دمج في بيئات الإنتاج'
                      : 'Evaluated continuously before any merge into production'}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded">
                  0-BYPASS POLICY GATE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
