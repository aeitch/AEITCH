import React from 'react';
import { Metadata } from 'next';
import { PlatformEngineeringHero } from '@/components/services/PlatformEngineeringHero';
import { PlatformDisciplinesBento } from '@/components/services/PlatformDisciplinesBento';
import { GitOpsPipelineSchematic } from '@/components/services/GitOpsPipelineSchematic';
import { PlatformFeasibilitySimulator } from '@/components/services/PlatformFeasibilitySimulator';
import { PlatformEngineeringCTA } from '@/components/services/PlatformEngineeringCTA';

export const metadata: Metadata = {
  title: 'Platform Engineering & Enterprise DevOps | Kubernetes & GitOps | AEITCH',
  description:
    'Internal Developer Platforms (IDPs), zero-drift Terraform/OpenTofu Infrastructure as Code, multi-cluster Kubernetes on Saudi cloud regions (AWS EKS Riyadh, Azure AKS, Google GKE Dammam), and automated ArgoCD GitOps delivery pipelines.',
  keywords: [
    'Platform Engineering',
    'Enterprise DevOps',
    'Kubernetes Riyadh',
    'ArgoCD GitOps KSA',
    'Terraform Infrastructure as Code',
    'Internal Developer Platforms',
    'AWS EKS me-central-1',
    'FinOps Cloud Optimization',
  ],
};

export default function PlatformEngineeringDevopsPage() {
  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#080808] text-white selection:bg-[#e9800a] selection:text-black">
      {/* 1. ASYMMETRIC HERO WITH 3D WEBGL KUBERNETES & GITOPS CLUSTER */}
      <PlatformEngineeringHero />

      {/* 2. BENTO 2.0 PLATFORM DISCIPLINES & SRE MATRIX */}
      <PlatformDisciplinesBento />

      {/* 3. BESPOKE GITOPS PROGRESSIVE DELIVERY FABRIC & LIVE MANIFEST INSPECTOR */}
      <GitOpsPipelineSchematic />

      {/* 4. INTERACTIVE DEVOPS & FINOPS ROI SIMULATOR */}
      <PlatformFeasibilitySimulator />

      {/* 5. EXECUTIVE ACTION & SOVEREIGN GOVERNANCE CLOSING */}
      <PlatformEngineeringCTA />
    </div>
  );
}
