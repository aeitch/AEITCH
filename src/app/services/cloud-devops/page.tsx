import React from 'react';
import { Metadata } from 'next';
import { CloudDevOpsHero } from '@/components/services/CloudDevOpsHero';
import { CloudPillarsBento } from '@/components/services/CloudPillarsBento';
import { SovereignMicroservicesTopology } from '@/components/schematics';
import { CloudCostSizingSimulator } from '@/components/services/CloudCostSizingSimulator';
import { CloudDevOpsCTA } from '@/components/services/CloudDevOpsCTA';

export const metadata: Metadata = {
  title: 'Cloud Architecture & DevOps Engineering | AEITCH',
  description:
    'Resilient multi-cloud engineering on Saudi Hyperscaler regions (AWS Riyadh, Azure, Google Cloud Dammam). Production-grade Kubernetes orchestration, zero-drift Terraform IaC, automated GitOps CI/CD, and 30-50% FinOps cost reduction.',
  openGraph: {
    title: 'Cloud Architecture & DevOps Engineering | AEITCH',
    description:
      'Architecting resilient multi-cloud infrastructure on Saudi Hyperscalers with 99.99% availability. Zero-drift Terraform, Kubernetes clusters, and automated GitOps continuous delivery.',
    url: 'https://aeitch.com/services/cloud-devops',
    siteName: 'AEITCH',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aeitch.com/services/cloud-devops',
  },
};

export default function CloudDevOpsPage() {
  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#080808] text-white selection:bg-[#e9800a] selection:text-black">
      {/* 1. Asymmetric Hero with Interactive 3D WebGL Multi-Cloud Mesh */}
      <CloudDevOpsHero />

      {/* 2. Asymmetric Bento 2.0 Cloud Disciplines Grid */}
      <CloudPillarsBento />

      {/* 3. Sovereign Cloud & Microservices Topology Schematic */}
      <section id="architecture-topology" className="relative w-full py-24 sm:py-32 bg-[#080808] border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#e9800a] bg-[#e9800a]/10 border border-[#e9800a]/20 mb-3">
              SOVEREIGN CLOUD ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              Microservices Bus & Multi-AZ Ingress Topology
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
              Multi-AZ container orchestration with Envoy edge ingress, Kafka event backbone, and air-gapped sovereign data execution.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <SovereignMicroservicesTopology />
          </div>
        </div>
      </section>

      {/* 4. Interactive FinOps & Cloud Architecture Sizing Simulator */}
      <CloudCostSizingSimulator />

      {/* 5. Enterprise Cloud Strategy Closing CTA Block */}
      <CloudDevOpsCTA />
    </div>
  );
}
