import { FAQItem } from '../components/common/FAQSection';

export const SERVICE_FAQS: Record<string, FAQItem[]> = {
  'ai-automation': [
    {
      question: 'How do you ensure zero data leakage when integrating enterprise AI models?',
      answer:
        'We architect private inference pipelines using dedicated VPC endpoints, customer-managed encryption keys, and strict data-retention opt-outs with enterprise LLM providers. For sensitive internal corpora, we deploy self-hosted open-weights models (such as Llama 3 or Mistral) inside your private cloud boundary with zero telemetry outbound.',
    },
    {
      question: 'What is the difference between simple prompt wrappers and autonomous agent swarms?',
      answer:
        'Simple wrappers make single stateless API calls to an LLM. Autonomous agent swarms use stateful orchestrators (like LangGraph) with persistent short/long-term memory, dynamic tool execution, automated self-reflection, and deterministic fallback circuits to execute multi-step workflows across your software stack.',
    },
    {
      question: 'How do you prevent hallucinations in business-critical automated workflows?',
      answer:
        'We enforce multi-stage guardrails: hybrid semantic vector search with strict similarity thresholds, deterministic JSON schema validation (Pydantic/Zod), unit-test assertion layers, and automated human-in-the-loop escalation paths whenever model confidence drops below configured parameters.',
    },
    {
      question: 'What technologies do your AI engineering teams specialize in?',
      answer:
        'Our core stack includes Python, FastAPI, LangGraph, LlamaIndex, pgvector, Qdrant, vLLM, Docker, and enterprise foundational models from Anthropic (Claude), OpenAI, and self-hosted open-weights models.',
    },
    {
      question: 'Who owns the intellectual property and code of developed AI agents?',
      answer:
        'You retain 100% full intellectual property and source code ownership. All custom prompts, vector indexes, orchestration logic, and infrastructure templates are committed directly to your repositories with zero vendor lock-in.',
    },
  ],
  'product-development': [
    {
      question: 'What is the realistic timeline for an MVP sprint with AEITCH?',
      answer:
        'Our production-ready MVP engineering sprints typically run between 4 and 8 weeks. We focus on core architectural foundations, high-value user flows, and enterprise-grade security to ensure your product is ready for paying customers without accumulating tech debt.',
    },
    {
      question: 'What technology stack do you use for SaaS product development?',
      answer:
        'We primarily build modern cloud-native web applications using TypeScript, React, Next.js, Node.js, Go, PostgreSQL, Redis, and Tailwind CSS. We prioritize type-safety across the entire boundary to eliminate runtime bugs.',
    },
    {
      question: 'How do you structure the agile sprint communication and deliverable handoffs?',
      answer:
        'We operate in 2-week sprint cycles with weekly demo sessions, transparent asynchronous Slack/Discord communication, and direct access to senior software architects. Every sprint ends with working code deployed to a staging environment.',
    },
    {
      question: 'Can you scale an existing MVP that is experiencing performance bottlenecks?',
      answer:
        'Yes. We perform code and database audits, isolate slow queries and N+1 bottlenecks, introduce caching layers with Redis, and modularize monolithic backends into scalable microservices or event-driven pipelines.',
    },
    {
      question: 'How is code ownership and licensing handled after product delivery?',
      answer:
        'All source code, design assets, database migrations, and CI/CD pipelines are fully owned by your company upon payment. We provide comprehensive documentation and engineering handoff sessions for your in-house team.',
    },
  ],
  'devops-cloud': [
    {
      question: 'How do you achieve zero-downtime deployments for production Kubernetes workloads?',
      answer:
        'We configure automated canary and blue-green deployment strategies using ArgoCD, Kubernetes readiness and liveness probes, graceful shutdown hooks, and ingress controllers with weighted traffic splitting to eliminate end-user downtime during releases.',
    },
    {
      question: 'What is your methodology for cloud cost optimization (FinOps)?',
      answer:
        'We conduct an infrastructure utilization audit, identify orphaned disks and oversized compute instances, implement spot/preemptible instance pools for stateless workloads, optimize database IOPS provisioning, and set up automated budget guardrails and anomaly alerts.',
    },
    {
      question: 'Which cloud platforms and Infrastructure as Code tools do you support?',
      answer:
        'We support Amazon Web Services (AWS), Google Cloud Platform (GCP), and Microsoft Azure using deterministic Infrastructure as Code frameworks including Terraform, OpenTofu, and Pulumi for fully reproducible environment parity.',
    },
    {
      question: 'How do you handle secrets management and compliance in CI/CD pipelines?',
      answer:
        'We integrate automated secret scanning, HashiCorp Vault / AWS Secrets Manager, short-lived OIDC IAM tokens, and least-privilege service roles to eliminate hardcoded credentials and pass compliance audits.',
    },
    {
      question: 'What happens if our infrastructure experiences an unexpected outage?',
      answer:
        'We design self-healing architectures with automated node auto-scaling, multi-AZ failovers, distributed health checks, and alerting runbooks connected to incident management platforms like PagerDuty or Opsgenie.',
    },
  ],
  'custom-software': [
    {
      question: 'When should a company choose custom software engineering over off-the-shelf SaaS?',
      answer:
        'Custom engineering is essential when off-the-shelf tools fail to support proprietary workflows, when high-frequency data throughput demands sub-15ms latency, when licensing costs become exorbitant at scale, or when intellectual property ownership is core to enterprise valuation.',
    },
    {
      question: 'What programming languages and backend frameworks do you use for high-throughput systems?',
      answer:
        'For high-concurrency, low-latency services, we specialize in Go and Rust alongside modern TypeScript. For streaming and message brokers, we leverage Apache Kafka, RabbitMQ, and Redis Pub/Sub connected to PostgreSQL or ClickHouse.',
    },
    {
      question: 'How do you modernize legacy software without disrupting active operations?',
      answer:
        'We implement the Strangler Fig pattern: wrapping the legacy system with an API gateway, progressively extracting bounded contexts into modern microservices, and routing live traffic incrementally while running parallel validation tests.',
    },
    {
      question: 'How do you maintain software quality, documentation, and maintainability?',
      answer:
        'We enforce strict Test-Driven Development (TDD) practices, comprehensive unit and integration test coverage, automated linting and static analysis (SAST) in CI pipelines, and exhaustive architectural decision records (ADRs).',
    },
    {
      question: 'Do you provide ongoing support, maintenance, and SLA coverage?',
      answer:
        'Yes. After initial system deployment, we offer dedicated engineering pod retainers for continuous feature evolution, performance profiling, security patching, and proactive system health monitoring.',
    },
  ],
};
