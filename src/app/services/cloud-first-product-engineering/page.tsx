import React from 'react';
import { Metadata } from 'next';
import { CloudArchitectureHero } from '@/components/services/CloudArchitectureHero';
import { CloudDisciplinesBento } from '@/components/services/CloudDisciplinesBento';
import { PolyglotTechStackHub } from '@/components/services/PolyglotTechStackHub';
import { SovereignMicroservicesTopology } from '@/components/schematics/SovereignMicroservicesTopology';
import { ArchitectureFeasibilityTool } from '@/components/services/ArchitectureFeasibilityTool';
import { CloudEngineeringCTA } from '@/components/services/CloudEngineeringCTA';

export const metadata: Metadata = {
  title: 'Cloud-First Product Engineering | Microservices & Event-Driven Systems | AEITCH',
  description:
    'End-to-end greenfield SaaS build, monolith-to-microservices strangler decomposition, contract-first API ecosystems, and event-driven architectures aligned with Saudi Arabia hyperscalers (AWS Riyadh, Azure KSA, Google Cloud Dammam).',
  keywords: [
    'Cloud-First Engineering',
    'Microservices Architecture',
    'Strangler Fig Migration',
    'Apache Kafka KSA',
    'SaaS Engineering Riyadh',
    'AWS me-central-1',
    'Azure Riyadh',
    'Sovereign Cloud Saudi Arabia',
  ],
};

export default function CloudFirstProductEngineeringPage() {
  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#080808] text-white selection:bg-[#e9800a] selection:text-black">
      {/* 1. ASYMMETRIC HERO WITH 3D WEBGL DISTRIBUTED MESH */}
      <CloudArchitectureHero />

      {/* 2. BENTO 2.0 ARCHITECTURAL DISCIPLINES MATRIX */}
      <CloudDisciplinesBento />

      {/* 3. INTERACTIVE POLYGLOT TOOLCHAIN & RUNTIMES */}
      <PolyglotTechStackHub />

      {/* 4. SOVEREIGN MICROSERVICES & KAFKA TOPOLOGY SCHEMATIC */}
      <section
        id="topology-blueprint"
        className="relative py-24 sm:py-32 bg-[#0a0a0c] border-b border-white/10 overflow-hidden"
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              SCHEMATIC BLUEPRINT // REGULATORY HARDENED
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Sovereign Microservices & Event Mesh Topology
            </h2>
            <p className="text-sm sm:text-base text-white/70">
              Interactive architectural schematic detailing ingress gateways, Kafka event streaming brokers,
              polyglot worker pods, and KSA data residency compliance.
            </p>
          </div>

          <SovereignMicroservicesTopology />
        </div>
      </section>

      {/* 5. INTERACTIVE FEASIBILITY & ROADMAP SIMULATOR */}
      <ArchitectureFeasibilityTool />

      {/* 6. EXECUTIVE ACTION & SOVEREIGN GOVERNANCE CLOSING */}
      <CloudEngineeringCTA />
    </div>
  );
}
