export interface StackPageItem {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  category: string;
  primaryPillar: {
    name: string;
    path: string;
  };
  summaryDefinition: string;
  architecturalOverview: string;
  coreTechnologies: string[];
  whenToUse: string[];
  whenNotToUse: string[];
  comparisonTable: {
    headers: string[];
    rows: string[][];
  };
  implementationBlueprint: {
    stepTitle: string;
    description: string;
    codeOrConfig?: {
      language: string;
      code: string;
    };
  }[];
}

export const STACK_PAGES: StackPageItem[] = [
  {
    slug: 'langgraph-multi-agent-orchestration',
    title: 'LangGraph Multi-Agent Orchestration Architecture',
    seoTitle: 'LangGraph Multi-Agent Architecture & Orchestration | AEITCH',
    metaDescription: 'Production architecture blueprint for stateful multi-agent systems using LangGraph, cyclical execution graphs, and Postgres checkpointers.',
    category: 'Agent Systems',
    primaryPillar: {
      name: 'AI Automation & Agents',
      path: '/services/ai-automation',
    },
    summaryDefinition:
      'LangGraph multi-agent orchestration models complex business workflows as cyclic state machines where specialized agents coordinate via shared state, dynamic tool calling, and human-in-the-loop validation checkpoints.',
    architecturalOverview:
      'Unlike linear DAG execution frameworks, LangGraph allows agents to loop, self-reflect, and retry upon tool errors. By binding Postgres-backed checkpointers to each graph execution node, state is persisted atomically across multi-turn asynchronous human approval flows.',
    coreTechnologies: ['LangGraph', 'Python', 'FastAPI', 'PostgreSQL', 'Anthropic Claude', 'OpenAI'],
    whenToUse: [
      'Multi-step workflows requiring autonomous self-reflection and error retries',
      'Complex enterprise approvals requiring state persistence over hours or days',
      'Coordinating heterogeneous specialized agent roles (researcher, coder, reviewer)',
    ],
    whenNotToUse: [
      'Stateless, single-turn LLM completions or basic chatbots',
      'Ultra-low-latency transactional systems requiring sub-10ms response times',
    ],
    comparisonTable: {
      headers: ['Feature', 'LangGraph Graph Model', 'Traditional Linear DAG (Airflow)'],
      rows: [
        ['Cyclic Execution', 'First-class support with loop guards', 'Not natively supported (requires external triggers)'],
        ['State Memory', 'Persistent graph state with Postgres checkpoints', 'Task-level metadata without fluid conversational state'],
        ['Human Interruption', 'Built-in breakpoint and resume semantics', 'Manual task gating requiring complex pipeline pauses'],
        ['Latency Profile', '~20–40ms framework state transition overhead', 'Seconds to minutes per worker scheduling cycle'],
      ],
    },
    implementationBlueprint: [
      {
        stepTitle: 'Step 1: Define Typed State Schema',
        description: 'Enforce strict schema validation on shared graph memory.',
        codeOrConfig: {
          language: 'python',
          code: `from typing import TypedDict, Annotated, List
from langgraph.graph import StateGraph, END

class AgentSwarmState(TypedDict):
    input_prompt: str
    intermediate_artifacts: List[str]
    audit_log: List[str]
    iteration_count: int
    is_terminal: bool`,
        },
      },
      {
        stepTitle: 'Step 2: Compile Graph with Checkpointer',
        description: 'Bind PostgreSQL checkpointer to enable persistent resumable execution.',
      },
    ],
  },
  {
    slug: 'kubernetes-multi-cloud-deployment',
    title: 'Multi-Cloud Kubernetes Deployment & Service Mesh',
    seoTitle: 'Multi-Cloud Kubernetes & Service Mesh Architecture | AEITCH',
    metaDescription: 'Production architecture for resilient multi-cloud Kubernetes clusters using Cilium eBPF networking, Istio service mesh, and GitOps synchronization.',
    category: 'Cloud & Infrastructure',
    primaryPillar: {
      name: 'DevOps & Cloud',
      path: '/services/devops-cloud',
    },
    summaryDefinition:
      'Multi-cloud Kubernetes architecture establishes containerized operational parity across AWS (EKS), GCP (GKE), and on-premise clusters with federated networking, mutual TLS encryption, and unified observability.',
    architecturalOverview:
      'By decoupling application workloads from proprietary cloud APIs, teams avoid vendor lock-in while leveraging multi-region disaster recovery. Cilium eBPF provides high-performance kernel-level networking, replacing traditional iptables with minimal CPU overhead.',
    coreTechnologies: ['Kubernetes', 'AWS EKS', 'GCP GKE', 'Cilium', 'Istio', 'Terraform'],
    whenToUse: [
      'Enterprises with strict multi-region disaster recovery SLAs',
      'Organizations requiring regulatory compliance data residency across jurisdictions',
      'Workloads needing arbitrage between cloud spot pricing markets',
    ],
    whenNotToUse: [
      'Early-stage startups with simple monolithic or single-region architectures',
      'Teams without dedicated platform engineering or SRE operational staff',
    ],
    comparisonTable: {
      headers: ['Dimension', 'Multi-Cloud Kubernetes', 'Single-Provider Cloud Native'],
      rows: [
        ['Vendor Independence', 'Complete workload portability via OCI containers', 'Tightly coupled to proprietary cloud managed services'],
        ['Disaster Recovery', 'Active-active multi-cloud failover capability', 'Limited to single-vendor regional outages'],
        ['Operational Complexity', 'High (requires federated IAM & networking)', 'Low to moderate (single management console)'],
        ['Network Egress Cost', 'Requires careful traffic routing to minimize egress', 'Internal cloud backbone pricing benefits'],
      ],
    },
    implementationBlueprint: [
      {
        stepTitle: 'Step 1: Terraform Cluster Provisioning',
        description: 'Standardize modular cluster definitions across AWS and GCP.',
      },
    ],
  },
  {
    slug: 'terraform-infrastructure-automation',
    title: 'Deterministic Terraform Infrastructure as Code Automation',
    seoTitle: 'Deterministic Terraform Infrastructure Automation | AEITCH',
    metaDescription: 'Enterprise Terraform architecture guide: remote state management, OIDC authentication, automated drift detection, and modular IaC frameworks.',
    category: 'Infrastructure as Code',
    primaryPillar: {
      name: 'DevOps & Cloud',
      path: '/services/devops-cloud',
    },
    summaryDefinition:
      'Deterministic Terraform infrastructure automation codifies enterprise cloud resources into modular, version-controlled manifests deployed via automated CI/CD pipelines with zero manual console intervention.',
    architecturalOverview:
      'All cloud infrastructure is treated as software. Remote state is locked in encrypted S3/GCS buckets with DynamoDB/Firestore locking. Production access is governed via short-lived GitHub Actions OIDC tokens, eliminating permanent credential storage.',
    coreTechnologies: ['Terraform', 'OpenTofu', 'AWS', 'GCP', 'GitHub Actions', 'TFLint'],
    whenToUse: [
      'Production environments requiring 100% reproducible multi-stage parity (Dev/Staging/Prod)',
      'SOC 2 and ISO 27001 compliance audit trails for all cloud mutations',
    ],
    whenNotToUse: [
      'Disposable prototype throwaway experiments conducted in sandbox accounts',
    ],
    comparisonTable: {
      headers: ['Feature', 'Modular Terraform IaC', 'Manual Cloud Console Operations'],
      rows: [
        ['Reproducibility', '100% deterministic code execution', 'Error-prone, undocumented manual clicks'],
        ['Auditability', 'Git commit history traces every infrastructure change', 'Fragmented CloudTrail log queries'],
        ['Disaster Recovery', 'Entire infrastructure rebuildable from code in minutes', 'Days of manual reconstruction and troubleshooting'],
      ],
    },
    implementationBlueprint: [
      {
        stepTitle: 'Step 1: OIDC Authentication Configuration',
        description: 'Eliminate static AWS keys using role-based GitHub Actions OIDC federated auth.',
      },
    ],
  },
  {
    slug: 'pgvector-hybrid-search-retrieval',
    title: 'PostgreSQL & pgvector Hybrid Semantic Search Architecture',
    seoTitle: 'pgvector Hybrid Semantic Search Architecture | AEITCH',
    metaDescription: 'Building hybrid vector and keyword search backends inside PostgreSQL using pgvector, HNSW indexing, and reciprocal rank fusion.',
    category: 'Data & AI Search',
    primaryPillar: {
      name: 'AI Automation & Agents',
      path: '/services/ai-automation',
    },
    summaryDefinition:
      'pgvector hybrid search integrates dense semantic embeddings directly into relational PostgreSQL tables, enabling unified queries that combine vector similarity with relational filters and full-text keyword ranking.',
    architecturalOverview:
      'Rather than managing a separate vector database with fragmented sync mechanisms, pgvector utilizes HNSW (Hierarchical Navigable Small World) indexing inside PostgreSQL for sub-10ms query execution directly alongside business data.',
    coreTechnologies: ['PostgreSQL 16+', 'pgvector', 'HNSW Indexing', 'Python', 'FastAPI'],
    whenToUse: [
      'Enterprise RAG systems requiring strict transactional consistency and row-level security',
      'Applications with under 50 million vector embeddings seeking minimal operational overhead',
    ],
    whenNotToUse: [
      'Billion-scale embedding corpora requiring dedicated distributed vector clusters',
    ],
    comparisonTable: {
      headers: ['Capability', 'Postgres + pgvector', 'External Vector Database (Pinecone)'],
      rows: [
        ['Relational Joins', 'Native SQL joins with operational tables', 'Requires secondary HTTP queries and app-level joins'],
        ['ACID Guarantees', 'Full transactional atomicity and rollback safety', 'Eventual consistency between databases'],
        ['Infrastructure Cost', 'Utilizes existing database compute/storage', 'Separate monthly vendor subscription fees'],
      ],
    },
    implementationBlueprint: [
      {
        stepTitle: 'Step 1: HNSW Index Creation',
        description: 'Build fast cosine similarity index with tuned m and ef_construction parameters.',
      },
    ],
  },
  {
    slug: 'fastapi-async-llm-gateways',
    title: 'FastAPI Asynchronous LLM Proxy & Streaming Gateways',
    seoTitle: 'FastAPI Async LLM Streaming Gateway Architecture | AEITCH',
    metaDescription: 'Engineering high-throughput, low-latency LLM proxy gateways in Python using FastAPI, Server-Sent Events (SSE), and token rate limiters.',
    category: 'Backend & AI',
    primaryPillar: {
      name: 'Custom Software & Systems',
      path: '/services/custom-software',
    },
    summaryDefinition:
      'FastAPI async LLM gateways provide a centralized, resilient proxy layer that routes, streams, rate-limits, and caches AI model requests across Anthropic, OpenAI, and self-hosted model backends.',
    architecturalOverview:
      'By utilizing Python 3.12+ asyncio and uvloop, a single FastAPI instance can handle thousands of concurrent streaming Server-Sent Events (SSE) connections with minimal memory footprint, enforcing enterprise token quotas and semantic caching.',
    coreTechnologies: ['Python', 'FastAPI', 'uvloop', 'Redis', 'Server-Sent Events', 'Docker'],
    whenToUse: [
      'Enterprises needing multi-model failover (Claude -> GPT-4 -> Local Llama)',
      'Applications requiring centralized token budgeting and compliance auditing',
    ],
    whenNotToUse: [
      'Single-developer prototype apps with direct client-to-API access',
    ],
    comparisonTable: {
      headers: ['Metric', 'FastAPI Gateway Proxy', 'Direct SDK Calls from Frontend'],
      rows: [
        ['API Key Security', 'Keys remain hidden in private backend VPC', 'Keys exposed or tied to brittle client sessions'],
        ['Model Fallback', 'Automated instant failover on provider outage', 'Hardcoded exceptions crash user UI'],
        ['Token Analytics', 'Centralized audit log for cost attribution', 'Fragmented, untracked client billing'],
      ],
    },
    implementationBlueprint: [
      {
        stepTitle: 'Step 1: Streaming Response Generator',
        description: 'Implement async streaming generator yielding chunks as Server-Sent Events.',
      },
    ],
  },
  {
    slug: 'nextjs-typescript-enterprise-saas',
    title: 'Next.js & TypeScript Enterprise SaaS Architecture',
    seoTitle: 'Next.js & TypeScript Enterprise SaaS Architecture | AEITCH',
    metaDescription: 'Modern enterprise SaaS architecture guide using Next.js App Router, TypeScript, Tailwind CSS, Prisma, and multi-tenant database isolation.',
    category: 'Frontend & SaaS',
    primaryPillar: {
      name: 'Product Development & MVP',
      path: '/services/product-development',
    },
    summaryDefinition:
      'Next.js and TypeScript enterprise SaaS architecture pairs React Server Components with strict end-to-end type safety, automated tenant isolation, and edge-rendered user interfaces.',
    architecturalOverview:
      'Server Components execute close to the data store, drastically cutting client bundle size. Type-safe ORMs and schema validators eliminate data discrepancies between database tables, server actions, and UI components.',
    coreTechnologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma'],
    whenToUse: [
      'High-velocity B2B SaaS platforms requiring rapid iteration and SEO visibility',
      'Applications needing rich interactive dashboards with fast initial page loads',
    ],
    whenNotToUse: [
      'Pure static marketing pages with zero user authentication or backend state',
    ],
    comparisonTable: {
      headers: ['Architecture Aspect', 'Next.js Server Components', 'Traditional Client-Side SPA'],
      rows: [
        ['Initial Page Load', 'Pre-rendered HTML sent instantly from edge', 'Empty shell downloaded; requires JS execution'],
        ['Client JS Bundle Size', 'Minimal (server components stripped from client)', 'Heavy (all application code sent to browser)'],
        ['Data Security', 'Backend secrets stay entirely on server', 'API logic exposed in client browser bundles'],
      ],
    },
    implementationBlueprint: [
      {
        stepTitle: 'Step 1: Multi-Tenant Middleware',
        description: 'Extract organization context from subdomain or session headers.',
      },
    ],
  },
  {
    slug: 'apache-kafka-event-streaming-systems',
    title: 'Apache Kafka Distributed Event Streaming Backbones',
    seoTitle: 'Apache Kafka Event Streaming Architecture | AEITCH',
    metaDescription: 'Production architecture for high-throughput distributed event streaming using Apache Kafka, schema registries, and consumer group partitioning.',
    category: 'Distributed Systems',
    primaryPillar: {
      name: 'Custom Software & Systems',
      path: '/services/custom-software',
    },
    summaryDefinition:
      'Apache Kafka event streaming architecture establishes an immutable, fault-tolerant log of business domain events, enabling decoupled microservices to process high-throughput data asynchronously.',
    architecturalOverview:
      'By structuring communication as publish-subscribe event logs rather than direct HTTP requests, systems gain horizontal scalability, persistent backpressure management, and temporal replayability.',
    coreTechnologies: ['Apache Kafka', 'Kafka Connect', 'Schema Registry', 'Go', 'Docker'],
    whenToUse: [
      'Systems processing thousands of transactions per second (fintech, IoT, ecommerce)',
      'Architectures requiring audit logs where events can be replayed from any timestamp',
    ],
    whenNotToUse: [
      'Simple CRUD web applications with low concurrency and simple database reads',
    ],
    comparisonTable: {
      headers: ['Feature', 'Apache Kafka Event Log', 'Traditional Message Queue (RabbitMQ)'],
      rows: [
        ['Message Persistence', 'Immutable log retained for days, months, or years', 'Messages typically deleted upon consumer ACK'],
        ['Throughput Capacity', 'Millions of events per second with partition scaling', 'Tens of thousands of messages per second'],
        ['Event Replay', 'Consumers can reset offsets and re-read historical streams', 'Replay requires custom architectural workarounds'],
      ],
    },
    implementationBlueprint: [
      {
        stepTitle: 'Step 1: Partitioning Strategy Design',
        description: 'Key partition distribution to guarantee strict ordering for entities.',
      },
    ],
  },
  {
    slug: 'go-high-throughput-microservices',
    title: 'Go High-Throughput Concurrent Microservices Architecture',
    seoTitle: 'Go High-Throughput Microservices Architecture | AEITCH',
    metaDescription: 'Architecting ultra-low latency, concurrent enterprise microservices in Golang using goroutines, channels, gRPC, and structured logging.',
    category: 'Backend Engineering',
    primaryPillar: {
      name: 'Custom Software & Systems',
      path: '/services/custom-software',
    },
    summaryDefinition:
      'Go microservices architecture leverages compiled binaries, lightweight goroutines, and strict memory efficiency to build distributed enterprise backends capable of processing tens of thousands of requests per second.',
    architecturalOverview:
      'Go eliminates runtime virtual machine overhead while offering native CSP concurrency. Services communicate via binary gRPC protocols with Protocol Buffers, achieving 5–10x serialization speed improvements over JSON over HTTP/1.1.',
    coreTechnologies: ['Go (Golang)', 'gRPC', 'Protocol Buffers', 'PostgreSQL', 'Docker'],
    whenToUse: [
      'High-frequency API gateways, rate limiters, and telemetry aggregation engines',
      'Microservices requiring minimal memory footprints and instant container startup',
    ],
    whenNotToUse: [
      'Heavy statistical data analysis pipelines requiring Python/PyTorch/Pandas',
    ],
    comparisonTable: {
      headers: ['Attribute', 'Go Microservices', 'Java / Spring Boot'],
      rows: [
        ['Binary Startup Time', '< 20 milliseconds', '3 to 15 seconds (JVM warmup)'],
        ['Container Image Size', '~15–25MB scratch/alpine image', '~250–500MB with JRE'],
        ['Concurrency Model', 'Lightweight goroutines (~2KB stack initial)', 'OS-level kernel threads (~1MB stack)'],
      ],
    },
    implementationBlueprint: [
      {
        stepTitle: 'Step 1: Worker Pool Implementation',
        description: 'Constrain maximum concurrent goroutines using buffered channels.',
      },
    ],
  },
  {
    slug: 'rust-low-latency-backend-engineering',
    title: 'Rust Memory-Safe Low-Latency Backend Systems',
    seoTitle: 'Rust Low-Latency Backend Architecture & Memory Safety | AEITCH',
    metaDescription: 'Building mission-critical, zero-cost abstraction backend systems in Rust without garbage collection pauses for financial and real-time computing.',
    category: 'Systems Engineering',
    primaryPillar: {
      name: 'Custom Software & Systems',
      path: '/services/custom-software',
    },
    summaryDefinition:
      'Rust backend architecture delivers C-level bare-metal performance and memory safety without a garbage collector, eliminating tail latency spikes in mission-critical distributed systems.',
    architecturalOverview:
      'Through its affine type system and ownership borrow checker, Rust guarantees freedom from data races and null pointer exceptions at compile time. Actix-web and Tokio asynchronous runtimes achieve industry-leading throughput benchmarks.',
    coreTechnologies: ['Rust', 'Tokio', 'Actix-web / Axum', 'SQLx', 'gRPC'],
    whenToUse: [
      'Financial transaction engines requiring deterministic p99 latency guarantees',
      'Compute-intensive cryptography, real-time audio/video processing, and network proxies',
    ],
    whenNotToUse: [
      'Quick early-stage CRUD prototypes where developer velocity outweighs raw performance',
    ],
    comparisonTable: {
      headers: ['Performance Metric', 'Rust (Tokio / Axum)', 'Node.js / Express'],
      rows: [
        ['Garbage Collection Pauses', 'Zero (deterministic compile-time deallocation)', 'Periodic V8 GC sweeps causing latency spikes'],
        ['Memory Consumption', 'Minimal (exact byte control, no VM overhead)', 'Moderate to high (V8 heap allocation)'],
        ['CPU Bound Concurrency', 'True multi-core parallelism across OS threads', 'Single-threaded event loop (requires clustering)'],
      ],
    },
    implementationBlueprint: [
      {
        stepTitle: 'Step 1: Async Axum Router Setup',
        description: 'Initialize Tokio runtime with type-safe state extractors.',
      },
    ],
  },
  {
    slug: 'argocd-gitops-continuous-delivery',
    title: 'ArgoCD GitOps & Automated Canary Deployments',
    seoTitle: 'ArgoCD GitOps & Canary Deployment Architecture | AEITCH',
    metaDescription: 'Implementing declarative GitOps continuous delivery on Kubernetes using ArgoCD, Argo Rollouts, and automated Prometheus canary analysis.',
    category: 'CI/CD & DevOps',
    primaryPillar: {
      name: 'DevOps & Cloud',
      path: '/services/devops-cloud',
    },
    summaryDefinition:
      'ArgoCD GitOps architecture makes Git repositories the single source of truth for desired Kubernetes cluster states, synchronizing manifest changes automatically and detecting unauthorized configuration drift.',
    architecturalOverview:
      'ArgoCD runs inside the target cluster as an active reconciliation controller. When code merges to the main branch, Argo Rollouts gradually steps traffic to new canary pods, automatically rolling back if error rates exceed thresholds in Prometheus metrics.',
    coreTechnologies: ['ArgoCD', 'Argo Rollouts', 'Kubernetes', 'Prometheus', 'GitHub Actions'],
    whenToUse: [
      'Multi-cluster Kubernetes architectures requiring strict change management and instant rollbacks',
      'High-frequency deployment teams shipping dozens of microservice releases daily',
    ],
    whenNotToUse: [
      'Simple static websites or serverless applications deployed on PaaS providers',
    ],
    comparisonTable: {
      headers: ['Feature', 'ArgoCD GitOps Model', 'Traditional Push CI/CD (Jenkins/Scripts)'],
      rows: [
        ['Cluster Access Security', 'No external cluster admin credentials stored in CI runner', 'CI runners require broad administrative cluster access'],
        ['Configuration Drift', 'Automatically detected and reconciled back to Git state', 'Manual cluster edits go unnoticed until next deploy'],
        ['Automated Rollbacks', 'Instant Git revert or automated metric threshold rollback', 'Requires running full reverse deployment pipeline'],
      ],
    },
    implementationBlueprint: [
      {
        stepTitle: 'Step 1: ArgoCD Application Manifest',
        description: 'Define declarative Application resource tracking target Git repository.',
      },
    ],
  },
];
