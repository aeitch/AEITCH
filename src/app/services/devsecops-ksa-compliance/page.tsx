import React from 'react';
import { Metadata } from 'next';
import { DevSecOpsHero } from '@/components/services/DevSecOpsHero';
import { SecurityDisciplinesBento } from '@/components/services/SecurityDisciplinesBento';
import { NcaComplianceMatrixSchematic } from '@/components/services/NcaComplianceMatrixSchematic';
import { KsaComplianceAuditSimulator } from '@/components/services/KsaComplianceAuditSimulator';
import { DevSecOpsCTA } from '@/components/services/DevSecOpsCTA';
import { LeadMagnetCard } from '@/components/ui/lead-magnet-card';

export const metadata: Metadata = {
  title: 'DevSecOps & Saudi Compliance (NCA ECC/CCC & PDPL) | AEITCH',
  description:
    'Shift-left security aligned with Saudi NCA ECC-1:2018, NCA CCC-1:2020, and Saudi PDPL mandates. Automated HashiCorp Vault secret leasing, CI/CD pipeline scanning, multi-cloud CSPM, and in-kingdom cryptographic HSM isolation.',
  openGraph: {
    title: 'DevSecOps & Saudi Compliance (NCA ECC/CCC & PDPL) | AEITCH',
    description:
      'Shift-left security aligned with Saudi NCA ECC-1:2018, NCA CCC-1:2020, and Saudi PDPL mandates. Zero hardcoded secrets, automated CI/CD gates, and sovereign in-kingdom encryption.',
    url: 'https://aeitch.com/services/devsecops-ksa-compliance',
    siteName: 'AEITCH',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aeitch.com/services/devsecops-ksa-compliance',
  },
};

export default function DevSecOpsKsaCompliancePage() {
  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#080808] text-white selection:bg-[#e9800a] selection:text-black">
      {/* 1. Asymmetric Hero with Interactive 3D WebGL Sovereign Security Vault */}
      <DevSecOpsHero />

      {/* 2. Asymmetric Bento 2.0 Disciplines Grid */}
      <SecurityDisciplinesBento />

      {/* 3. Interactive NCA ECC/CCC & PDPL Policy-as-Code Matrix Schematic */}
      <NcaComplianceMatrixSchematic />

      {/* 4. CISO Compliance Gap Analysis & Remediation Sprint Simulator */}
      <KsaComplianceAuditSimulator />

      {/* 5. CISO Compliance Audit Checklist Toolkit */}
      <section className="py-24 bg-[#0a0a0c] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              COMPLIANCE AUDIT TOOLKIT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Enterprise DevSecOps & NCA Audit Checklist
            </h2>
            <p className="text-sm sm:text-base text-white/70">
              Download our comprehensive 42-point regulatory readiness checklist covering HashiCorp Vault architectures, CI/CD pipeline security gates, and Saudi PDPL encryption mandates.
            </p>
          </div>
          <LeadMagnetCard type="checklist" />
        </div>
      </section>

      {/* 6. Sovereign Governance Closing CTA Block */}
      <DevSecOpsCTA />
    </div>
  );
}
