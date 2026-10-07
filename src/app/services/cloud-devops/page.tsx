import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Cloud,
  Server,
  Terminal,
  Activity,
  ShieldCheck,
  Zap,
  ArrowRight,
  Calendar,
  Lock,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { RadialGlowCard } from '@/components/ui/radial-glow-card';

export const metadata: Metadata = {
  title: 'Cloud Architecture & DevOps Engineering | AEITCH',
  description:
    'Resilient multi-cloud engineering, Kubernetes orchestration, zero-drift Infrastructure as Code (Terraform), and automated GitOps CI/CD pipelines.',
};

export default function CloudDevOpsPage() {
  const pillars = [
    {
      icon: Terminal,
      title: 'Infrastructure as Code (IaC)',
      description:
        'Zero-drift, immutable infrastructure provisioning using Terraform, OpenTofu, and Pulumi across AWS, GCP, and Azure environments.',
    },
    {
      icon: Cloud,
      title: 'Kubernetes & Container Orchestration',
      description:
        'Production-grade EKS, GKE, and bare-metal Kubernetes clusters with autoscaling, service mesh (Istio), and GitOps rollouts via ArgoCD.',
    },
    {
      icon: Zap,
      title: 'Automated CI/CD GitOps Delivery',
      description:
        'Sub-10-minute continuous delivery pipelines with automated testing, image scanning, canary deployments, and zero-downtime upgrades.',
    },
    {
      icon: Activity,
      title: 'Full-Stack Observability & Telemetry',
      description:
        'Distributed tracing, real-time metrics, and anomaly alerting engineered with Prometheus, Grafana, OpenTelemetry, and Datadog.',
    },
    {
      icon: ShieldCheck,
      title: 'SOC2 & HIPAA Compliant Security',
      description:
        'Hardened cloud security posture with automated compliance policies, least-privilege IAM, secret management (Vault), and KMS encryption.',
    },
    {
      icon: Server,
      title: 'FinOps & Cloud Cost Optimization',
      description:
        'Granular cloud spend profiling, spot instance orchestration, and architectural rightsizing delivering sustained 30-50% cloud cost reductions.',
    },
  ];

  const technologies = [
    'AWS',
    'Google Cloud',
    'Azure',
    'Terraform',
    'Kubernetes',
    'Docker',
    'ArgoCD',
    'GitHub Actions',
    'Prometheus',
    'Grafana',
    'OpenTelemetry',
    'Istio',
  ];

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#000000] text-white selection:bg-[#e9800a] selection:text-black">
      {/* 1. HERO SECTION (PURE BLACK) */}
      <section className="relative min-h-[70vh] w-full flex items-center justify-center overflow-hidden bg-[#000000] py-24 sm:py-32 border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        >
          <div className="h-[500px] w-[500px] rounded-full bg-[#e9800a]/10 blur-[150px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <ScrollReveal delay={0.05} yOffset={20}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
              <Cloud className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                CLOUD & PLATFORM ENGINEERING
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} yOffset={25}>
            <h1 className="mt-8 max-w-4xl text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              Architecting Resilient,{' '}
              <span className="text-[#e9800a]">
                Multi-Region Cloud Infrastructure
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.25} yOffset={20}>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/70 leading-relaxed">
              We eliminate deployment bottlenecks, enforce zero-downtime reliability, and scale enterprise workloads with production-grade Kubernetes and GitOps automation.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.35} yOffset={20}>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact-us#consultation"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#e9800a] px-8 py-4 text-base font-bold text-black transition-all hover:bg-white"
              >
                <Calendar className="h-4 w-4" />
                Schedule Cloud Audit
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. PILLARS BENTO (PURE WHITE CONTRAST SECTION) */}
      <section className="relative w-full py-24 sm:py-32 bg-[#ffffff] text-[#000000]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <ScrollReveal delay={0.05} yOffset={20}>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#e9800a] bg-black/5 border border-black/10 mb-3">
                CLOUD DISCIPLINES
              </span>
              <h2 className="mt-2 text-3xl sm:text-5xl font-black text-black">
                Engineered for 99.99% Availability
              </h2>
              <p className="mt-4 text-base sm:text-lg text-black/70">
                From container orchestration to automated multi-region disaster recovery.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <ScrollReveal key={pillar.title} delay={0.1 * idx} yOffset={25}>
                  <div className="h-full rounded-2xl border-2 border-black/10 bg-white p-8 transition-all duration-300 hover:border-[#e9800a] shadow-lg">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-[#e9800a] mb-6">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-black text-black mb-3">{pillar.title}</h3>
                    <p className="text-sm sm:text-base text-black/70 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. TECH STACK (PURE BLACK) */}
      <section className="relative w-full py-20 bg-[#000000] border-t border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal delay={0.05} yOffset={20}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#e9800a] bg-white/5 border border-white/10 mb-4">
              ENTERPRISE DEVOPS ECOSYSTEM
            </span>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:border-[#e9800a] hover:text-[#e9800a]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. CTA SECTION (PURE BLACK) */}
      <section className="relative w-full py-24 sm:py-32 bg-[#000000]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-4xl rounded-3xl border border-white/15 bg-[#000000] p-10 sm:p-14 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ready to Modernize Your Cloud Infrastructure?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
              Get an in-depth infrastructure review with our Principal Cloud Architect to uncover cost-saving opportunities and reliability risks.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/contact-us#consultation"
                className="inline-flex items-center gap-3 rounded-xl bg-[#e9800a] px-8 py-3.5 font-bold text-black transition-all hover:bg-white"
              >
                <Calendar className="h-4 w-4" />
                Schedule Your Cloud Strategy Session
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
