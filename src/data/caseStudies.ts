export interface CaseStudyPhase {
  phase: string;
  title: string;
  details: string;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudyItem {
  slug: string;
  caseNumber: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  service: string;
  servicePath: string;
  color: string;
  borderColor: string;
  badge: string;
  impact: string;
  desc: string;
  tech: string[];
  executiveSummary: string;
  challenge: string[];
  architectureDesign: string[];
  implementationPhases: CaseStudyPhase[];
  safeguards: string[];
  targetBenchmarks: CaseStudyMetric[];
  relatedStack: { title: string; path: string }[];
}

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    slug: 'supportpilot',
    caseNumber: 'CASE #1',
    title: 'Support Pilot — Enterprise Agentic Support Architecture',
    seoTitle: 'Support Pilot: Enterprise Agentic AI Case Study | AEITCH',
    metaDescription:
      'Reference architecture case study for Support Pilot: multi-agent AI customer support built with LangGraph, Anthropic Claude, pgvector, and FastAPI.',
    service: 'AI Automation',
    servicePath: '/services/ai-automation',
    color: '#F7C059',
    borderColor: 'rgba(247, 192, 89, 0.25)',
    badge: 'Reference Architecture',
    impact: 'Multi-agent swarm with hybrid pgvector retrieval & human-in-the-loop escalation',
    desc: 'Architectural blueprint for a multi-agent autonomous swarm connected to hybrid vector retrieval (pgvector) with deterministic guardrails and automated human-in-the-loop escalation.',
    tech: ['LangGraph', 'Anthropic Claude', 'pgvector', 'FastAPI', 'PostgreSQL', 'Redis'],
    executiveSummary:
      'Support Pilot is AEITCH’s reference architecture for multi-channel enterprise support automation. Instead of wrapping a single LLM prompt around an unrestricted vector store, it coordinates specialized triage, retrieval, and policy-verification agents inside a stateful LangGraph state machine with tenant-isolated pgvector lookup and confidence-gated human handoff.',
    challenge: [
      'Traditional customer support chatbots fail on complex enterprise inquiries because single-pass RAG retrieves stale or cross-tenant documents and hallucinates refund, SLA, or compliance commitments.',
      'Enterprise teams require deterministic tool execution, strict Row-Level Security (RLS) on knowledge bases, sub-2-second first-token streaming, and seamless escalation to human agents with full conversation state intact.',
    ],
    architectureDesign: [
      'A FastAPI async gateway terminates incoming webhook and WebSocket streams from Slack, Zendesk, and web widgets, hydrating session context from Redis before dispatching into a compiled LangGraph workflow.',
      'The orchestrator routes queries across three bounded worker nodes: a Policy & Intent Classifier, a Hybrid pgvector + BM25 Retriever enforcing organization-level ACL filters, and a Tool-Execution Validator that gates side-effecting CRM/billing actions behind confidence thresholds and human approval interrupts.',
    ],
    implementationPhases: [
      {
        phase: 'Phase 01',
        title: 'Tenant-Isolated Knowledge Ingestion',
        details:
          'Configured chunking pipelines generating 1536-dim embeddings alongside PostgreSQL tsvector columns, tagging every row with organization_id and authorized_roles for zero-leakage SQL retrieval.',
      },
      {
        phase: 'Phase 02',
        title: 'Stateful LangGraph Agent Topology',
        details:
          'Implemented cyclic supervisor routing with PostgreSQL checkpointing so escalated tickets pause cleanly and resume without losing tool-call history or customer context.',
      },
      {
        phase: 'Phase 03',
        title: 'Guardrails & Evaluation Harness',
        details:
          'Integrated automated hallucination scoring, PII redaction filters, and regression evaluation suites against golden enterprise support transcripts prior to production rollout.',
      },
    ],
    safeguards: [
      'SQL-enforced Row-Level Security filters permissions before vector similarity ranking.',
      'Confidence thresholds automatically trigger LangGraph human-in-the-loop interrupts for refunds or account mutations.',
      'Full OpenTelemetry tracing logs every prompt, retrieved chunk ID, token count, and tool payload for auditability.',
    ],
    targetBenchmarks: [
      { label: 'Retrieval Mode', value: 'Hybrid Vector + BM25' },
      { label: 'State Persistence', value: 'Durable Checkpoints' },
      { label: 'Isolation Boundary', value: 'PostgreSQL RLS' },
      { label: 'Streaming Protocol', value: 'FastAPI SSE / WS' },
    ],
    relatedStack: [
      { title: 'LangGraph Multi-Agent Orchestration', path: '/stack/langgraph-multi-agent-orchestration' },
      { title: 'pgvector Hybrid Semantic Search', path: '/stack/pgvector-hybrid-search-retrieval' },
      { title: 'FastAPI Async LLM Gateways', path: '/stack/fastapi-async-llm-gateways' },
    ],
  },
  {
    slug: 'finscale',
    caseNumber: 'CASE #2',
    title: 'FinScale — Institutional Liquidity Dashboard',
    seoTitle: 'FinScale: Institutional Liquidity Dashboard Study | AEITCH',
    metaDescription:
      'Reference architecture case study for FinScale: institutional financial dashboard engineered with Next.js, TypeScript, WebSockets, and tenant isolation.',
    service: 'Product Development',
    servicePath: '/services/product-development',
    color: '#76E3DC',
    borderColor: 'rgba(118, 227, 220, 0.25)',
    badge: 'Reference Architecture',
    impact: 'Real-time WebSocket reconciliation, immutable audit trails & multi-tenant isolation',
    desc: 'Full-stack architecture blueprint for institutional financial interfaces featuring real-time WebSocket reconciliation, automated audit trails, and multi-tenant ledger isolation.',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'GraphQL', 'PostgreSQL'],
    executiveSummary:
      'FinScale demonstrates how AEITCH architects high-trust institutional SaaS products. Combining an end-to-end type-safe Next.js and TypeScript frontend with multi-tenant ledger isolation and real-time WebSocket delta streaming, the blueprint eliminates stale treasury views and race conditions during concurrent settlements.',
    challenge: [
      'Institutional treasury and liquidity operators juggle multiple custodian feeds, currency corridors, and approval workflows where stale UI state or floating-point rounding bugs cause costly operational errors.',
      'Teams launching financial SaaS platforms need rapid 4–8 week delivery velocity without sacrificing double-entry ledger invariants, strict RBAC permissions, or SOC2-ready auditability.',
    ],
    architectureDesign: [
      'The presentation layer uses Next.js App Router with Server Components for deterministic initial hydration, paired with a multiplexed WebSocket subscriber that streams reconciled balance updates directly into normalized React state.',
      'Backend GraphQL and REST mutations enforce idempotency keys, integer minor-unit arithmetic (zero floating-point math), and append-only audit logs capturing actor identity, IP metadata, and before/after ledger snapshots.',
    ],
    implementationPhases: [
      {
        phase: 'Phase 01',
        title: 'Domain Modeling & Multi-Tenant Schema',
        details:
          'Designed double-entry ledger tables with database-level tenant isolation and immutable event logs for every treasury transfer and reconciliation state transition.',
      },
      {
        phase: 'Phase 02',
        title: 'Type-Safe Full-Stack Contract & Design System',
        details:
          'Built shared TypeScript schemas across API and UI layers alongside high-contrast data grid components engineered for dense financial workflows.',
      },
      {
        phase: 'Phase 03',
        title: 'Live WebSocket Reconciliation & RBAC',
        details:
          'Implemented real-time settlement stream consumers with optimistic locking and multi-signature approval gates for high-value disbursements.',
      },
    ],
    safeguards: [
      'Strict integer minor-unit currency representation eliminates floating-point drift.',
      'Idempotent mutation endpoints prevent duplicate settlement execution across retries.',
      'Role-based maker-checker workflows isolate initiation from institutional sign-off.',
    ],
    targetBenchmarks: [
      { label: 'Codebase Typing', value: '100% Type-Safe TS' },
      { label: 'Delivery Cadence', value: '4–8 Week Sprints' },
      { label: 'Ledger Model', value: 'Append-Only Audit' },
      { label: 'Live Updates', value: 'WebSocket Deltas' },
    ],
    relatedStack: [
      { title: 'Next.js & TypeScript Enterprise SaaS', path: '/stack/nextjs-typescript-enterprise-saas' },
      { title: 'Go High-Throughput Microservices', path: '/stack/go-high-throughput-microservices' },
    ],
  },
  {
    slug: 'cloudpulse',
    caseNumber: 'CASE #3',
    title: 'CloudPulse — Multi-Region Kubernetes Migration',
    seoTitle: 'CloudPulse: Multi-Region Kubernetes Migration Study | AEITCH',
    metaDescription:
      'Reference architecture case study for CloudPulse: zero-downtime multi-region Amazon EKS migration using Terraform, ArgoCD GitOps, and Prometheus telemetry.',
    service: 'DevOps & Cloud',
    servicePath: '/services/devops-cloud',
    color: '#FF9CAA',
    borderColor: 'rgba(255, 156, 170, 0.25)',
    badge: 'Reference Architecture',
    impact: 'Zero-downtime canary deployments, multi-region EKS & deterministic Terraform IaC',
    desc: 'Cloud-native infrastructure blueprint demonstrating automated zero-downtime canary deployments, multi-region Amazon EKS orchestration, and deterministic Terraform modules.',
    tech: ['Kubernetes', 'Terraform', 'AWS EKS', 'ArgoCD', 'Prometheus', 'Karpenter'],
    executiveSummary:
      'CloudPulse outlines AEITCH’s repeatable migration playbook for moving brittle, manually configured cloud workloads onto deterministic multi-region Kubernetes. Combining modular Terraform IaC, ArgoCD GitOps progressive delivery, and Karpenter right-sizing removes snowflake servers while cutting idle compute waste.',
    challenge: [
      'Growing engineering teams often inherit manually provisioned cloud VMs, unversioned security groups, and fragile bash deploy scripts that make regional failover impossible and inflate monthly cloud spend.',
      'Migrating live production workloads cannot afford maintenance windows, dropped in-flight requests, or configuration drift between staging and production clusters.',
    ],
    architectureDesign: [
      'All VPC topologies, IAM roles (IRSA), KMS encryption keys, and EKS node groups are codified in versioned Terraform modules backed by remote state locking and automated plan checks in CI.',
      'Application rollouts flow exclusively through ArgoCD watching a signed GitOps config repository. Argo Rollouts executes automated canary traffic shifting while Prometheus error-budget alerts trigger instant rollbacks if P99 latency or 5xx rates spike.',
    ],
    implementationPhases: [
      {
        phase: 'Phase 01',
        title: 'Infrastructure Audit & Terraform Baseline',
        details:
          'Mapped existing IAM policies, VPC peering, and egress bottlenecks, then codified isolated staging and production environments via reusable Terraform modules.',
      },
      {
        phase: 'Phase 02',
        title: 'Multi-Region EKS & Karpenter Provisioning',
        details:
          'Deployed federated Amazon EKS clusters across primary and failover regions with Karpenter bin-packing and Spot interruption handling for stateless workloads.',
      },
      {
        phase: 'Phase 03',
        title: 'GitOps Canary & SRE Observability Cutover',
        details:
          'Migrated traffic incrementally via weighted DNS and ingress rules while wiring Prometheus, Grafana SLO dashboards, and automated rollback gates.',
      },
    ],
    safeguards: [
      'Zero manual kubectl apply in production — every cluster mutation is Git-audited via ArgoCD.',
      'Automated canary analysis halts and reverts deployments if SLO burn rates exceed thresholds.',
      'Pod Security Standards, network policies, and least-privilege IRSA isolate every namespace.',
    ],
    targetBenchmarks: [
      { label: 'Deploy Strategy', value: 'GitOps Canary' },
      { label: 'Infra Parity', value: 'Deterministic IaC' },
      { label: 'Node Scaling', value: 'Karpenter Spot/On-Demand' },
      { label: 'Observability', value: 'SLO Telemetry' },
    ],
    relatedStack: [
      { title: 'Multi-Cloud Kubernetes Deployment', path: '/stack/kubernetes-multi-cloud-deployment' },
      { title: 'Terraform Infrastructure Automation', path: '/stack/terraform-infrastructure-automation' },
      { title: 'ArgoCD GitOps Continuous Delivery', path: '/stack/argocd-gitops-continuous-delivery' },
    ],
  },
  {
    slug: 'transactcore',
    caseNumber: 'CASE #4',
    title: 'TransactCore — Low-Latency Order Processing Engine',
    seoTitle: 'TransactCore: Low-Latency Order Engine Case Study | AEITCH',
    metaDescription:
      'Reference architecture case study for TransactCore: high-throughput Go and Apache Kafka order processing engine designed for sub-15ms P99 latency.',
    service: 'Custom Software',
    servicePath: '/services/custom-software',
    color: '#74C8FC',
    borderColor: 'rgba(116, 200, 252, 0.25)',
    badge: 'Reference Architecture',
    impact: 'Event-driven Go & Kafka order routing designed for sub-15ms transactional pipelines',
    desc: 'High-throughput event-driven order processing engine architecture designed in Go and Apache Kafka with sub-15ms transactional guarantees and zero data loss constraints.',
    tech: ['Go', 'Apache Kafka', 'PostgreSQL', 'Docker', 'gRPC', 'Redis'],
    executiveSummary:
      'TransactCore is AEITCH’s distributed systems blueprint for mission-critical transaction pipelines where synchronous monoliths collapse under burst load. Built in Go over gRPC and partitioned Apache Kafka topics with transactional outbox guarantees, it sustains predictable tail latency without dropping or duplicating events.',
    challenge: [
      'Synchronous HTTP monoliths bottleneck on database row locks and third-party downstream timeouts during traffic spikes, causing cascading retry storms and inconsistent order states.',
      'High-concurrency order engines require strict per-account ordering, idempotent deduplication, deterministic backpressure handling, and full replayability on failure.',
    ],
    architectureDesign: [
      'Edge Go services accept inbound requests over protobuf/gRPC, validate payload schemas in microseconds, and persist state alongside an outbox event within a single atomic PostgreSQL transaction.',
      'Partitioned Apache Kafka topics keyed by customer/instrument ID guarantee strict sequential ordering per partition while horizontally scaling stateless Go consumer worker pools.',
    ],
    implementationPhases: [
      {
        phase: 'Phase 01',
        title: 'Domain Boundaries & Protobuf Contracts',
        details:
          'Decomposed monolithic order paths into bounded intake, risk validation, routing, and settlement services communicating over strongly typed gRPC contracts.',
      },
      {
        phase: 'Phase 02',
        title: 'Transactional Outbox & Kafka Partitioning',
        details:
          'Implemented atomic outbox event publishing to Kafka with idempotent consumer keys and dead-letter queues for isolated poison-pill inspection.',
      },
      {
        phase: 'Phase 03',
        title: 'Load Profiling & Tail-Latency Tuning',
        details:
          'Executed sustained synthetic burst testing with Go pprof profiling, connection pool tuning, and circuit breakers around downstream dependencies.',
      },
    ],
    safeguards: [
      'Transactional outbox guarantees zero dual-write divergence between PostgreSQL and Kafka.',
      'Idempotent consumer deduplication eliminates duplicate side effects during network partitions.',
      'Dead-letter topic isolation protects healthy partitions from malformed upstream payloads.',
    ],
    targetBenchmarks: [
      { label: 'Target P99 Latency', value: 'Sub-15ms Core' },
      { label: 'Delivery Semantics', value: 'Outbox + Idempotent' },
      { label: 'Transport Layer', value: 'gRPC / Protobuf' },
      { label: 'Event Backbone', value: 'Partitioned Kafka' },
    ],
    relatedStack: [
      { title: 'Apache Kafka Event Streaming', path: '/stack/apache-kafka-event-streaming-systems' },
      { title: 'Go High-Throughput Microservices', path: '/stack/go-high-throughput-microservices' },
      { title: 'Rust Low-Latency Backends', path: '/stack/rust-low-latency-backend-engineering' },
    ],
  },
];
