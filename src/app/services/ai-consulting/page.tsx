import React from 'react';
import { Metadata } from 'next';
import { AiConsultingHero } from '@/components/services/AiConsultingHero';
import { AiDisciplinesBento } from '@/components/services/AiDisciplinesBento';
import { AiArchitectureSchematic } from '@/components/services/AiArchitectureSchematic';
import { AiFeasibilitySimulator } from '@/components/services/AiFeasibilitySimulator';
import { AiConsultingCTA } from '@/components/services/AiConsultingCTA';

export const metadata: Metadata = {
  title: 'Enterprise AI Consulting & Autonomous Systems | AEITCH',
  description:
    'Production-grade sovereign AI, private in-kingdom LLM serving (vLLM / TensorRT), zero-hallucination enterprise RAG, and autonomous agent clusters engineered for Saudi data sovereignty (PDPL & NDMO).',
  openGraph: {
    title: 'Enterprise AI Consulting & Autonomous Systems | AEITCH',
    description:
      'Private generative AI and autonomous agent systems engineered for Saudi data sovereignty. In-kingdom GPU execution, hybrid vector RAG, and deterministic NeMo guardrails.',
    url: 'https://aeitch.com/services/ai-consulting',
    siteName: 'AEITCH',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aeitch.com/services/ai-consulting',
  },
};

export default function AiConsultingPage() {
  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#080808] text-white selection:bg-[#e9800a] selection:text-black">
      {/* 1. Asymmetric Hero with Interactive 3D WebGL Sovereign AI Neural Core */}
      <AiConsultingHero />

      {/* 2. Asymmetric Bento 2.0 AI Disciplines Grid */}
      <AiDisciplinesBento />

      {/* 3. 4-Tier Sovereign AI Pipeline & Agent Topology Schematic */}
      <AiArchitectureSchematic />

      {/* 4. Interactive AI Feasibility, GPU Sizing & Compute Simulator */}
      <AiFeasibilitySimulator />

      {/* 5. Sovereign AI Enterprise Closing CTA Block */}
      <AiConsultingCTA />
    </div>
  );
}
