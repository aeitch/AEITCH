import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Seed Admin User
  const defaultAdminEmail = 'admin@aeitch.com';
  const defaultPassword = 'AeitchAdmin2026!';
  const passwordHash = bcrypt.hashSync(defaultPassword, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email: defaultAdminEmail },
    update: {
      passwordHash,
      name: 'AEITCH Administrator',
      role: 'superadmin',
    },
    create: {
      email: defaultAdminEmail,
      passwordHash,
      name: 'AEITCH Administrator',
      role: 'superadmin',
    },
  });
  console.log(`✅ Admin seeded: ${admin.email}`);

  // 2. Seed Services
  const services = [
    {
      slug: 'ai-consulting',
      title: 'AI Consulting & Systems',
      tagline: 'Enterprise Generative AI, Custom LLMs & Autonomous Agents',
      category: 'AI & Machine Learning',
      description:
        'We architect and deploy production-grade Generative AI, fine-tuned domain models, RAG vector pipelines, and autonomous agent swarms engineered for high-throughput enterprise workflows.',
      fullContent:
        '# AI Consulting & Production Systems\n\nTransform your enterprise operations with sovereign, high-precision AI architectures. From tailored domain-specific LLM fine-tuning to autonomous multi-agent pipelines, AEITCH delivers end-to-end intelligence systems with uncompromising accuracy, data privacy, and sub-second inference.',
      icon: 'Cpu',
      features: JSON.stringify([
        'Custom LLM Fine-Tuning & Domain Adaptation',
        'Enterprise RAG Pipelines with Hybrid Vector Search',
        'Autonomous Multi-Agent Workflow Orchestration',
        'Private On-Prem & Sovereign Inference Deployment',
        'Continuous Model Evaluation & Guardrails',
      ]),
      techStack: JSON.stringify([
        'Python',
        'PyTorch',
        'LangChain',
        'LlamaIndex',
        'vLLM',
        'Pinecone',
        'Qdrant',
        'PostgreSQL pgvector',
      ]),
      order: 1,
      isActive: true,
    },
    {
      slug: 'cloud-devops',
      title: 'Cloud Architecture & DevOps',
      tagline: 'Resilient Multi-Cloud, Kubernetes & Zero-Downtime CI/CD',
      category: 'Cloud & Infrastructure',
      description:
        'Multi-cloud infrastructure engineered for 99.99% availability, automated infrastructure-as-code deployment, Kubernetes orchestration, and proactive FinOps cloud cost optimization.',
      fullContent:
        '# Cloud Architecture & Zero-Downtime DevOps\n\nEliminate single points of failure and deploy with extreme velocity. Our cloud architects design resilient, multi-region cloud foundations with automated GitOps pipelines, robust Kubernetes orchestration, and rigorous FinOps controls yielding 35-50% infrastructure cost savings.',
      icon: 'Cloud',
      features: JSON.stringify([
        'Multi-Cloud Architecture (AWS, GCP, Azure)',
        'Infrastructure as Code (Terraform & Terragrunt)',
        'Kubernetes Container Orchestration & GitOps',
        'FinOps Cloud Cost Optimization (35-50% savings)',
        '24/7 Automated SRE Observability & Self-Healing',
      ]),
      techStack: JSON.stringify([
        'AWS',
        'Google Cloud',
        'Azure',
        'Terraform',
        'Kubernetes',
        'Docker',
        'ArgoCD',
        'Prometheus',
        'Grafana',
      ]),
      order: 2,
      isActive: true,
    },
    {
      slug: 'custom-software',
      title: 'Custom Software Engineering',
      tagline: 'High-Throughput Enterprise Platforms & Distributed Systems',
      category: 'Software Engineering',
      description:
        'Architecting mission-critical enterprise applications, ultra-low latency APIs, multi-tenant SaaS platforms, and distributed microservices with zero architectural debt.',
      fullContent:
        '# Custom Enterprise Software Engineering\n\nWhen off-the-shelf software fails to scale, AEITCH engineers bespoke enterprise backends, high-throughput microservices, and modern web applications built on clean architectural patterns, robust concurrency management, and distributed caching.',
      icon: 'Code',
      features: JSON.stringify([
        'High-Throughput Distributed Microservices',
        'Multi-Tenant Enterprise SaaS Architecture',
        'Ultra-Low Latency REST & GraphQL APIs',
        'Event-Driven Streaming & Message Brokers',
        'Database Optimization & Distributed Caching',
      ]),
      techStack: JSON.stringify([
        'Next.js',
        'TypeScript',
        'Node.js',
        'Go',
        'PostgreSQL',
        'Redis',
        'Kafka',
        'Prisma',
        'Docker',
      ]),
      order: 3,
      isActive: true,
    },
    {
      slug: 'new-product-development',
      title: 'Rapid MVP & Product Engineering',
      tagline: 'From Concept to Scaled Production in 6 to 8 Weeks',
      category: 'Product Development',
      description:
        'High-velocity startup and venture engineering. We transform initial vision into production-ready web and mobile products in weeks, built on foundations that scale seamlessly.',
      fullContent:
        '# Rapid MVP & Scalable Product Development\n\nAccelerate time-to-market without compromising code quality, security, or architectural scalability. We operate as your dedicated venture engineering team, taking product concepts through rigorous discovery, UI/UX prototyping, iterative development, and public launch.',
      icon: 'Rocket',
      features: JSON.stringify([
        '6-8 Week Rapid MVP Delivery Framework',
        'Interactive UX/UI Wireframes & High-Fidelity Design',
        'Scalable Cloud-Native Foundation',
        'Telemetry, Analytics & Conversion Instrumentation',
        'Continuous Post-Launch Iteration & Scaling',
      ]),
      techStack: JSON.stringify([
        'Next.js',
        'React Native',
        'TypeScript',
        'Tailwind CSS',
        'Prisma',
        'PostgreSQL',
        'Stripe',
        'Supabase',
      ]),
      order: 4,
      isActive: true,
    },
  ];

  for (const s of services) {
    const service = await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
    console.log(`✅ Service seeded: ${service.title}`);
  }

  // 3. Seed Case Studies & MVP Showcase
  const caseStudies = [
    {
      slug: 'fintech-realtime-settlement',
      title: 'Ultra-Low Latency Real-Time Settlement Engine',
      clientName: 'ApexPay Global',
      clientIndustry: 'Financial Technology',
      type: 'CASE_STUDY',
      summary:
        'Re-architected cross-border payment settlement processing 12M+ daily transactions with sub-50ms latency.',
      challenge:
        'Legacy settlement pipelines suffered from locking bottlenecks and transaction delays during high-volume trading surges.',
      solution:
        'Designed distributed event-driven settlement architecture with Go microservices, Kafka event streaming, and Redis caching.',
      results: JSON.stringify([
        { metric: '99.999%', label: 'System Availability' },
        { metric: '< 35ms', label: 'P99 Processing Latency' },
        { metric: '12M+', label: 'Daily Transactions Handled' },
      ]),
      techStack: JSON.stringify([
        'Go',
        'Kafka',
        'Redis',
        'PostgreSQL',
        'Kubernetes',
        'AWS',
      ]),
      coverImage:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      liveUrl: 'https://apexpay.example.com',
      order: 1,
      isFeatured: true,
      isActive: true,
    },
    {
      slug: 'healthcare-autonomous-rag',
      title: 'HIPAA-Compliant Enterprise RAG Diagnostic Assistant',
      clientName: 'MedPulse Health',
      clientIndustry: 'Healthcare & Biotech',
      type: 'CASE_STUDY',
      summary:
        'Built private, sovereign clinical intelligence system indexing 4M+ medical journals and patient records with zero data leakage.',
      challenge:
        'Physicians needed instant synthesis across multi-gigabyte clinical trials while maintaining strict HIPAA isolation.',
      solution:
        'Implemented on-prem hybrid vector search with Qdrant, custom Llama-3 fine-tuned models, and strict RBAC verification.',
      results: JSON.stringify([
        { metric: '85%', label: 'Faster Diagnosis Synthesis' },
        { metric: '0', label: 'Zero External Cloud Leaks' },
        { metric: '4M+', label: 'Indexed Medical Artifacts' },
      ]),
      techStack: JSON.stringify([
        'Python',
        'PyTorch',
        'Qdrant',
        'vLLM',
        'Next.js',
        'Docker',
      ]),
      coverImage:
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
      liveUrl: 'https://medpulse.example.com',
      order: 2,
      isFeatured: true,
      isActive: true,
    },
    {
      slug: 'logistics-fleet-telemetry',
      title: 'Autonomous Fleet Telemetry & Predictive Routing',
      clientName: 'Vanguard Freight',
      clientIndustry: 'Supply Chain & Logistics',
      type: 'CASE_STUDY',
      summary:
        'Engineered real-time IoT ingestion pipeline managing 25,000 active commercial freight vehicles across North America.',
      challenge:
        'High-frequency GPS and vehicle sensor telemetry was overwhelming traditional database storage, causing delayed dispatch alerts.',
      solution:
        'Built auto-scaling streaming pipeline with Kafka, TimescaleDB, and predictive fuel optimization algorithms.',
      results: JSON.stringify([
        { metric: '-32%', label: 'Fuel Consumption Reduction' },
        { metric: '25K+', label: 'Simultaneous Connected Vehicles' },
        { metric: '99.95%', label: 'Dispatch SLA Met' },
      ]),
      techStack: JSON.stringify([
        'Node.js',
        'Kafka',
        'TimescaleDB',
        'AWS EKS',
        'Terraform',
      ]),
      coverImage:
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
      liveUrl: 'https://vanguardfreight.example.com',
      order: 3,
      isFeatured: true,
      isActive: true,
    },
    {
      slug: 'nexus-ai-workspace',
      title: 'Nexus: Collaborative Autonomous AI Canvas',
      clientName: 'Nexus Labs',
      clientIndustry: 'Productivity SaaS',
      type: 'MVP_SHOWCASE',
      summary:
        'Shipped an end-to-end multi-agent collaborative workspace from concept to 50K active users in 7 weeks.',
      challenge:
        'Startup needed to validate product-market fit before next venture round with an ultra-polished, reactive web app.',
      solution:
        'Rapid full-stack execution using Next.js 15, WebSockets, Prisma, and customized LLM agent workflows.',
      results: JSON.stringify([
        { metric: '7 Weeks', label: 'Concept to Public Launch' },
        { metric: '50K+', label: 'Active First-Month Users' },
        { metric: '$3.5M', label: 'Seed Funding Secured' },
      ]),
      techStack: JSON.stringify([
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Prisma',
        'PostgreSQL',
        'WebSockets',
      ]),
      coverImage:
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop',
      liveUrl: 'https://nexus-workspace.example.com',
      order: 4,
      isFeatured: true,
      isActive: true,
    },
  ];

  for (const cs of caseStudies) {
    const caseStudy = await prisma.caseStudy.upsert({
      where: { slug: cs.slug },
      update: cs,
      create: cs,
    });
    console.log(`✅ Case Study seeded: ${caseStudy.title}`);
  }

  // 4. Seed Homepage Metrics Counters
  const metrics = [
    {
      label: 'Enterprise Uptime SLA',
      value: '99.9',
      prefix: '',
      suffix: '%',
      description: 'High-availability cloud architectures with multi-region redundancy.',
      icon: 'ShieldCheck',
      order: 1,
      isActive: true,
    },
    {
      label: 'Production Platforms Shipped',
      value: '40',
      prefix: '',
      suffix: '+',
      description: 'Full-cycle scalable software platforms and AI systems delivered to production.',
      icon: 'Rocket',
      order: 2,
      isActive: true,
    },
    {
      label: 'Deployment Velocity Gain',
      value: '5',
      prefix: '',
      suffix: 'x',
      description: 'Automated GitOps pipelines accelerating feature delivery cycles.',
      icon: 'Zap',
      order: 3,
      isActive: true,
    },
    {
      label: 'Client Satisfaction Score',
      value: '100',
      prefix: '',
      suffix: '%',
      description: 'Clutch 5.0 rating backed by verified enterprise client partnerships.',
      icon: 'Star',
      order: 4,
      isActive: true,
    },
  ];

  for (const m of metrics) {
    const existing = await prisma.metricCounter.findFirst({
      where: { label: m.label },
    });
    if (existing) {
      await prisma.metricCounter.update({
        where: { id: existing.id },
        data: m,
      });
    } else {
      await prisma.metricCounter.create({
        data: m,
      });
    }
    console.log(`✅ Metric seeded: ${m.label}`);
  }

  // 5. Seed Testimonials
  const testimonials = [
    {
      clientName: 'Marcus Vance',
      clientRole: 'Chief Technology Officer',
      clientCompany: 'ApexPay Global',
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      quote:
        'AEITCH re-engineered our core settlement infrastructure from the ground up. Their deep mastery of distributed systems and zero-downtime architecture allowed us to scale 10x without a hitch.',
      rating: 5,
      verified: true,
      order: 1,
      isActive: true,
    },
    {
      clientName: 'Dr. Elena Rostova',
      clientRole: 'VP of AI & Digital Health',
      clientCompany: 'MedPulse Health',
      avatarUrl:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop',
      quote:
        'Deploying sovereign, on-prem AI within healthcare is notoriously difficult. AEITCH delivered a high-precision RAG assistant that meets our strict clinical and HIPAA standards.',
      rating: 5,
      verified: true,
      order: 2,
      isActive: true,
    },
    {
      clientName: 'David Chen',
      clientRole: 'Founder & CEO',
      clientCompany: 'Nexus Labs',
      avatarUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
      quote:
        'We went from a blank repository to 50,000 active users in under two months. AEITCH builds with relentless velocity while maintaining production-grade software architecture.',
      rating: 5,
      verified: true,
      order: 3,
      isActive: true,
    },
  ];

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { clientName: t.clientName, clientCompany: t.clientCompany },
    });
    if (existing) {
      await prisma.testimonial.update({
        where: { id: existing.id },
        data: t,
      });
    } else {
      await prisma.testimonial.create({
        data: t,
      });
    }
    console.log(`✅ Testimonial seeded: ${t.clientName} (${t.clientCompany})`);
  }

  console.log('🌟 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
