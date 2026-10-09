import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Cloud,
  Terminal,
  Activity,
  Layers,
  ArrowRight,
  CheckCircle2,
  Server,
  Zap,
  GitBranch,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { RadialGlowCard } from '@/components/ui/radial-glow-card';
import { SovereignMicroservicesTopology } from '@/components/schematics';

export const metadata: Metadata = {
  title: 'Platform Engineering & Enterprise DevOps | AEITCH',
  description:
    'Internal Developer Platforms (IDPs), Terraform/Pulumi Infrastructure as Code, Kubernetes multi-cluster orchestration, and full-stack SRE telemetry.',
};

export default function PlatformEngineeringDevopsPage() {
  const capabilities = [
    {
      title: 'Internal Developer Platforms (IDPs)',
      desc: 'Self-service developer portals empowering product squads to provision environments, database instances, and secure CI/CD pipelines in minutes without operational tickets.',
    },
    {
      title: 'Immutable Infrastructure as Code (IaC)',
      desc: 'Zero-drift cloud provisioning using Terraform, OpenTofu, and Pulumi with automated state locking, policy-as-code guardrails, and modular architectural blueprints.',
    },
    {
      title: 'Multi-Cloud Kubernetes Orchestration',
      desc: 'Certified Kubernetes (CKA) architectures deployed across AWS EKS, Google Cloud GKE, Azure AKS, and Red Hat OpenShift with automated cluster autoscaling and Istio service mesh.',
    },
    {
      title: 'GitOps CI/CD Delivery Pipelines',
      desc: 'ArgoCD and GitHub Actions pipelines enforcing progressive delivery: automated canary rollouts, blue-green deployments, and sub-10-minute automated test cycles.',
    },
    {
      title: 'Full-Stack SRE & Distributed Tracing',
      desc: 'End-to-end telemetry engineered with OpenTelemetry, Prometheus, Grafana, and Datadog, providing real-time visibility and automated incident response alerting.',
    },
    {
      title: 'FinOps Cloud Spend Governance',
      desc: 'Continuous cloud cost governance, Spot instance orchestration, and workload rightsizing delivering sustained 30-50% infrastructure OPEX reductions.',
    },
  ];

  const outcomes = [
    { metric: 'Weeks → Mins', label: 'Deployment Lead Time' },
    { metric: '99.95%+', label: 'Production SLA Guarantees' },
    { metric: 'Zero Drift', label: 'Terraform State Governance' },
    { metric: '-40%', label: 'Average Cloud Cost Savings' },
  ];

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#000000] text-white selection:bg-[#e9800a] selection:text-black">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[60vh] w-full flex items-center justify-center overflow-hidden bg-[#000000] py-24 sm:py-32 border-b border-white/10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
          <div className="h-[500px] w-[500px] rounded-full bg-[#e9800a]/10 blur-[150px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <ScrollReveal delay={0.05} yOffset={20}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-6">
              <Cloud className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                PLATFORM ENGINEERING & DEVOPS
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} yOffset={20}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Deployment Lead Time Reduced from Weeks to Minutes
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15} yOffset={20}>
            <p className="text-base sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              We build Internal Developer Platforms, production-grade Kubernetes environments, and automated GitOps
              pipelines that turn infrastructure from an enterprise bottleneck into a high-speed competitive advantage.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} yOffset={20}>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-6 py-3 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
              >
                <span>Request DevOps & Platform Assessment</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <span>All Capabilities</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. QUANTIFIED OUTCOMES */}
      <section className="py-12 bg-[#0a0a0a] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {outcomes.map((o, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#e9800a] font-mono">{o.metric}</div>
                <div className="text-xs text-white/60 mt-1">{o.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CAPABILITIES */}
      <section className="py-24 bg-[#000000] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              PLATFORM DISCIPLINES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Internal Developer Platforms & SRE Rigor
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap, idx) => (
              <RadialGlowCard key={idx} className="p-8 flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e9800a]/10 border border-[#e9800a]/30 text-[#e9800a] mb-6">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{cap.title}</h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{cap.desc}</p>
                </div>
              </RadialGlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SCHEMATIC */}
      <section className="py-24 bg-[#0a0a0a] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              KUBERNETES & GITOPS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Automated Microservices Delivery Fabric
            </h2>
          </div>
          <SovereignMicroservicesTopology />
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 bg-[#000000]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Accelerate Your Deployment Cadence
          </h2>
          <p className="text-sm text-white/70 mb-8">
            Let our Certified Kubernetes & Terraform architects audit your infrastructure and design an automated developer platform.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
          >
            <span>Consult Platform Architect</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
