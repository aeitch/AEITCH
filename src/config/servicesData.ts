export interface ServiceFeature {
  title: string;
  description: string;
  badge?: string;
}

export interface ServiceStep {
  number: string;
  title: string;
  description: string;
}

export interface ServiceMetric {
  value: string;
  label: string;
}

export interface ServiceDetail {
  id: string;
  slug: string;
  path: string;
  title: string;
  shortDescription: string;
  tag: string;
  heroHeadline: string;
  heroSubhead: string;
  accentColor: string;
  accentColorHex: string;
  tagBorderColor: string;
  backlightGradient: string;
  videoSrc: string;
  cardActiveBorder: string;
  cardActiveBg: string;
  primaryCTA: {
    label: string;
    href: string;
  };
  metrics: ServiceMetric[];
  capabilities: ServiceFeature[];
  processSteps: ServiceStep[];
  techStack: string[];
  caseStudyPreview: {
    badge: string;
    title: string;
    impact: string;
    href: string;
  };
}

export const SERVICES_CONFIG: Record<string, ServiceDetail> = {
  'ai-automation': {
    id: 'ai-automation',
    slug: 'ai-automation',
    path: '/services/ai-automation',
    title: 'AI Automation',
    shortDescription: 'Autonomous agent swarms, enterprise RAG, and intelligent workflow automation.',
    tag: 'Autonomous Systems & Intelligence',
    heroHeadline: 'Scale Operations with Agentic AI & Enterprise Automation',
    heroSubhead:
      'We architect self-correcting agent systems, customized LLM pipelines, and deep API orchestrations that turn complex business workflows into seamless autonomous operations.',
    accentColor: 'rgb(247, 192, 89)',
    accentColorHex: '#F7C059',
    tagBorderColor: 'rgba(171, 135, 73, 0.5)',
    backlightGradient: 'radial-gradient(50% 50% at 50% 50%, rgb(247, 192, 89) 0%, rgb(0, 0, 0) 100%)',
    videoSrc: '/videos/video-53.mp4',
    cardActiveBorder: 'rgba(247, 192, 89, 0.25)',
    cardActiveBg: 'linear-gradient(180deg, rgba(247, 192, 89, 0.08) 0%, rgba(247, 192, 89, 0.02) 100%)',
    primaryCTA: {
      label: 'Deploy AI Automation',
      href: '/contact?service=ai-automation#contact-form',
    },
    metrics: [
      { value: '78%', label: 'Routine Ticket Deflection' },
      { value: '10x', label: 'Workflow Execution Speed' },
      { value: '< 1.2s', label: 'Average Pipeline Latency' },
      { value: '99.4%', label: 'Output Precision & Accuracy' },
    ],
    capabilities: [
      {
        title: 'Multi-Agent Autonomous Swarms',
        description:
          'Design and deployment of specialized agent swarms with stateful memory, dynamic tool calling, and automated self-reflection loops.',
        badge: 'Agentic Core',
      },
      {
        title: 'Enterprise RAG & Knowledge Retrieval',
        description:
          'Production-grade hybrid semantic vector retrieval with real-time sync, zero data leakage, and role-based document access controls.',
        badge: 'Private & Secure',
      },
      {
        title: 'End-to-End Workflow Orchestration',
        description:
          'Seamless integration across CRMs, ERPs, internal databases, and communication channels with robust fault-tolerance and retry logic.',
        badge: 'Zero Overhead',
      },
      {
        title: 'Custom Model Tuning & Guardrails',
        description:
          'Domain-adapted small language models (SLMs) and strict safety guardrails engineered to minimize latency and token expenditure.',
        badge: 'High Precision',
      },
    ],
    processSteps: [
      {
        number: '01',
        title: 'Audit & Workflow Mapping',
        description:
          'We inspect operational bottlenecks, audit existing toolsets, and identify high-leverage workflows ripe for agentic automation.',
      },
      {
        number: '02',
        title: 'Architecture & Agent Tooling',
        description:
          'We architect sandboxed agent environments, define precise function schemas, and link semantic knowledge bases.',
      },
      {
        number: '03',
        title: 'Evaluation & Guardrail Validation',
        description:
          'Rigorous automated benchmark testing against edge cases, hallucinations, security bounds, and latency SLAs.',
      },
      {
        number: '04',
        title: 'Production Rollout & Telemetry',
        description:
          'Continuous monitoring via real-time tracing, automated drift alerts, and persistent model refinement.',
      },
    ],
    techStack: [
      'LangChain & LangGraph',
      'LlamaIndex',
      'Anthropic Claude 3.5',
      'OpenAI Models',
      'Pinecone / Qdrant',
      'FastMCP',
      'vLLM',
      'Python / FastAPI',
      'PostgreSQL / pgvector',
    ],
    caseStudyPreview: {
      badge: 'Featured AI Success',
      title: 'Support Pilot — Multichannel AI Customer Assistant',
      impact: 'Automated 120,000+ monthly customer inquiries with 99.4% resolution accuracy and 78% deflection.',
      href: '/case-studies/supportpilot',
    },
  },
  'product-development': {
    id: 'product-development',
    slug: 'product-development',
    path: '/services/product-development',
    title: 'Product Development',
    shortDescription: 'Full-cycle MVP to scale, product architecture, SaaS platforms, and modern UX.',
    tag: 'Product Engineering & Innovation',
    heroHeadline: 'Turn High-Stakes Visions into Market-Defining Software',
    heroSubhead:
      'From zero-to-one product launches to high-scale digital platforms, we engineer intuitive user experiences backed by resilient distributed architectures.',
    accentColor: 'rgb(118, 227, 220)',
    accentColorHex: '#76E3DC',
    tagBorderColor: 'rgb(9, 61, 58)',
    backlightGradient: 'radial-gradient(50% 50% at 50% 50%, rgb(118, 227, 220) 0%, rgb(0, 0, 0) 100%)',
    videoSrc: '/videos/video-55.mp4',
    cardActiveBorder: 'rgba(47, 194, 184, 0.25)',
    cardActiveBg: 'linear-gradient(180deg, rgba(47, 194, 184, 0.08) 0%, rgba(47, 194, 184, 0.02) 100%)',
    primaryCTA: {
      label: 'Build Your Product',
      href: '/contact?service=product-development#contact-form',
    },
    metrics: [
      { value: '4-8 Wks', label: 'MVP Delivery Sprint' },
      { value: '99.9%', label: 'Application Availability' },
      { value: '100%', label: 'Type-Safe Architecture' },
      { value: '500K+', label: 'Active End Users Handled' },
    ],
    capabilities: [
      {
        title: 'Full-Cycle MVP Acceleration',
        description: 'Rapid product scoping, prototype validation, and production deployment in 4 to 8 weeks.',
        badge: 'High Velocity',
      },
      {
        title: 'Scalable SaaS & Web Platforms',
        description: 'Multi-tenant cloud-native architectures built with modern React, Next.js, Node, and Go.',
        badge: 'Modern Stack',
      },
      {
        title: 'Intuitive Design Systems',
        description: 'Pixel-perfect, accessible, and delightful interfaces crafted with interactive micro-animations.',
        badge: 'Design First',
      },
      {
        title: 'API-First Microservices',
        description: 'Extensible REST & GraphQL backend services engineered for modular growth and high throughput.',
        badge: 'Modular',
      },
    ],
    processSteps: [
      { number: '01', title: 'Product Scoping & Strategy', description: 'Deconstruct vision, prioritize MVP feature sets, and map user journeys.' },
      { number: '02', title: 'Interactive Design & Prototyping', description: 'High-fidelity Figma prototypes and design token alignment.' },
      { number: '03', title: 'Agile Engineering Sprints', description: 'Two-week iterative releases with continuous client demos and reviews.' },
      { number: '04', title: 'Scale & User Handoff', description: 'Production hardening, load testing, and comprehensive documentation.' },
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Go', 'Tailwind CSS', 'GraphQL', 'PostgreSQL'],
    caseStudyPreview: {
      badge: 'Product Launch',
      title: 'FinScale — Next-Gen B2B Treasury & Liquidity Dashboard',
      impact: 'Built and scaled MVP to $40M+ in processed transactions within 90 days of launch.',
      href: '/case-studies/finscale',
    },
  },
  'devops-cloud': {
    id: 'devops-cloud',
    slug: 'devops-cloud',
    path: '/services/devops-cloud',
    title: 'DevOps & Cloud',
    shortDescription: 'Kubernetes orchestration, CI/CD automation, cloud cost reduction, and SRE reliability.',
    tag: 'Cloud Infrastructure & SRE',
    heroHeadline: 'Resilient Cloud Infrastructure Built for Zero Downtime',
    heroSubhead:
      'We modernize infrastructure with Infrastructure-as-Code, multi-region Kubernetes clusters, hardened security postures, and automated zero-downtime CI/CD pipelines.',
    accentColor: 'rgb(255, 156, 170)',
    accentColorHex: '#FF9CAA',
    tagBorderColor: 'rgb(79, 19, 53)',
    backlightGradient: 'radial-gradient(50% 50% at 50% 50%, rgb(255, 156, 170) 0%, rgb(0, 0, 0) 100%)',
    videoSrc: '/videos/video-48.mp4',
    cardActiveBorder: 'rgba(252, 106, 128, 0.25)',
    cardActiveBg: 'linear-gradient(180deg, rgba(252, 106, 128, 0.08) 0%, rgba(252, 106, 128, 0.02) 100%)',
    primaryCTA: {
      label: 'Optimize Infrastructure',
      href: '/contact?service=devops-cloud#contact-form',
    },
    metrics: [
      { value: '99.99%', label: 'Infrastructure Uptime SLA' },
      { value: '35%+', label: 'Average Cloud Cost Reduction' },
      { value: '0 sec', label: 'Deployment Downtime' },
      { value: '< 5 min', label: 'Incident MTTD' },
    ],
    capabilities: [
      {
        title: 'Kubernetes & Container Orchestration',
        description: 'Production-hardened EKS/GKE cluster design, autoscaling, and service mesh governance.',
        badge: 'High Availability',
      },
      {
        title: 'Infrastructure as Code (IaC)',
        description: 'Deterministic Terraform & Pulumi setups ensuring fully reproducible multi-environment parity.',
        badge: 'Deterministic',
      },
      {
        title: 'Automated CI/CD Pipelines',
        description: 'Blazing-fast deployment workflows with automated canary releases, linting, and rollback safety.',
        badge: 'Continuous Delivery',
      },
      {
        title: 'Cloud FinOps & Cost Reduction',
        description: 'Comprehensive cost audits, spot instance orchestration, and resource sizing yielding 30-50% savings.',
        badge: 'FinOps Audit',
      },
    ],
    processSteps: [
      { number: '01', title: 'Infra & Security Audit', description: 'Deep analysis of cloud topologies, IAM policies, and billing bottlenecks.' },
      { number: '02', title: 'Architecture Blueprint', description: 'Formulation of zero-trust IaC templates and resilient networking maps.' },
      { number: '03', title: 'Automated Migration', description: 'Phased, non-disruptive migration with zero user-facing downtime.' },
      { number: '04', title: '24/7 Telemetry & SRE', description: 'Prometheus, Grafana, and automated incident escalation playbooks.' },
    ],
    techStack: ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'GCP', 'GitHub Actions', 'ArgoCD', 'Prometheus', 'Datadog'],
    caseStudyPreview: {
      badge: 'Cloud Modernization',
      title: 'CloudPulse — Multi-Region Kubernetes Migration',
      impact: 'Migrated 40+ microservices to multi-region EKS with zero downtime and 42% cost savings.',
      href: '/case-studies/cloudpulse',
    },
  },
  'custom-software': {
    id: 'custom-software',
    slug: 'custom-software',
    path: '/services/custom-software',
    title: 'Custom Software',
    shortDescription: 'High-performance bespoke backends, distributed systems, and enterprise engineering.',
    tag: 'Bespoke Enterprise Systems',
    heroHeadline: 'Mission-Critical Software Engineered for Complex Challenges',
    heroSubhead:
      'Off-the-shelf software falls short when scale is non-negotiable. We engineer bespoke backend architectures, high-frequency transaction engines, and tailored enterprise workflows.',
    accentColor: 'rgb(116, 200, 252)',
    accentColorHex: '#74C8FC',
    tagBorderColor: 'rgb(6, 59, 92)',
    backlightGradient: 'radial-gradient(50% 50% at 50% 50%, rgb(116, 200, 252) 0%, rgb(0, 0, 0) 100%)',
    videoSrc: '/videos/video-51.mp4',
    cardActiveBorder: 'rgba(116, 200, 252, 0.25)',
    cardActiveBg: 'linear-gradient(180deg, rgba(116, 200, 252, 0.08) 0%, rgba(116, 200, 252, 0.02) 100%)',
    primaryCTA: {
      label: 'Engineer Bespoke System',
      href: '/contact?service=custom-software#contact-form',
    },
    metrics: [
      { value: '50K+', label: 'Queries Per Second Handled' },
      { value: 'sub-10ms', label: 'P99 Backend Latency' },
      { value: '100%', label: 'Custom Tailored Codebase' },
      { value: '0 Lock-in', label: 'Full Intellectual Property' },
    ],
    capabilities: [
      {
        title: 'High-Throughput Distributed Engines',
        description: 'Event-driven architectures designed with Kafka, Go, and Rust for ultra-low latency transaction processing.',
        badge: 'Ultra High Speed',
      },
      {
        title: 'Legacy System Modernization',
        description: 'Safely refactoring monolithic legacy codebases into decoupled, maintainable cloud-native services.',
        badge: 'Zero Risk',
      },
      {
        title: 'Custom Internal Tooling & ERPs',
        description: 'Tailor-made dashboards, administrative consoles, and operational suites mapped to your exact team workflows.',
        badge: 'Productivity',
      },
      {
        title: 'Complex Data Pipelines & ETL',
        description: 'Streaming and batch data processing pipelines delivering real-time business intelligence at scale.',
        badge: 'Data Integrity',
      },
    ],
    processSteps: [
      { number: '01', title: 'Technical Problem Deconstruction', description: 'Deep discovery into domain models, data flows, and performance constraints.' },
      { number: '02', title: 'Domain-Driven System Design', description: 'Formal architectural specifications, database schemas, and API contracts.' },
      { number: '03', title: 'Clean-Code Engineering', description: 'Test-driven development, continuous peer review, and comprehensive benchmark suites.' },
      { number: '04', title: 'Deployment & Knowledge Transfer', description: 'Seamless handoff with thorough documentation, automated tests, and training.' },
    ],
    techStack: ['Go', 'Rust', 'TypeScript', 'PostgreSQL', 'Redis', 'Apache Kafka', 'gRPC', 'Docker'],
    caseStudyPreview: {
      badge: 'Enterprise Architecture',
      title: 'TransactCore — Sub-millisecond Order Processing Engine',
      impact: 'Engineered high-frequency transaction processor handling 45,000 requests/sec at 8ms P99 latency.',
      href: '/case-studies/transactcore',
    },
  },
};
