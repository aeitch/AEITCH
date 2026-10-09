import React from 'react';
import { Metadata } from 'next';
import { DedicatedSquadHero } from '@/components/services/DedicatedSquadHero';
import { SquadAnatomyBento } from '@/components/services/SquadAnatomyBento';
import { DeliveryEngineTriad } from '@/components/schematics/DeliveryEngineTriad';
import { SquadAllocationSimulator } from '@/components/services/SquadAllocationSimulator';
import { SquadOperatingCadence } from '@/components/services/SquadOperatingCadence';
import { DedicatedSquadCTA } from '@/components/services/DedicatedSquadCTA';

export const metadata: Metadata = {
  title: 'Dedicated Engineering Squads & Managed Pods | AEITCH',
  description:
    'Dedicated high-velocity product engineering pods operating in your time zone (GMT+3 Riyadh) under US architectural oversight. Full-stack developers, staff SREs, direct Slack/GitHub integration, and 100% Day-1 IP ownership.',
  openGraph: {
    title: 'Dedicated Engineering Squads & Managed Pods | AEITCH',
    description:
      'High-velocity product pods tailored for Riyadh working hours (GMT+3) under US principal architectural governance. Direct engineer access, sub-10 day deployment, and 100% Day-1 IP ownership.',
    url: 'https://aeitch.com/services/dedicated-engineering-squads',
    siteName: 'AEITCH',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aeitch.com/services/dedicated-engineering-squads',
  },
};

export default function DedicatedEngineeringSquadsPage() {
  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#080808] text-white selection:bg-[#e9800a] selection:text-black">
      {/* 1. Asymmetric Hero with Interactive 3D WebGL Managed Squad Mesh */}
      <DedicatedSquadHero />

      {/* 2. Asymmetric Bento 2.0 Squad Anatomy & Discipline Grid */}
      <SquadAnatomyBento />

      {/* 3. The 3-Pillar Triad Engine Interactive Geospatial Schematic */}
      <section className="py-24 sm:py-32 bg-[#0a0a0c] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <DeliveryEngineTriad />
        </div>
      </section>

      {/* 4. Interactive Squad Allocation, Sizing & Velocity Simulator */}
      <SquadAllocationSimulator />

      {/* 5. A Day in the Life: Daily Riyadh Cadence & Multi-Vendor Benchmark */}
      <SquadOperatingCadence />

      {/* 6. Rapid Pod Deployment Closing CTA Block */}
      <DedicatedSquadCTA />
    </div>
  );
}
