export interface Service {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  accentColor: string;
  iconPath: string;
}

export interface ServicesContentData {
  eyebrow: string;
  heading: string;
  subheading: string;
  services: Service[];
}

export const servicesContent: ServicesContentData = {
  eyebrow: "What We Build",
  heading: "End-to-End Engineering",
  subheading:
    "From concept to deployment, AEITCH delivers production-grade systems that scale. Our full-stack expertise spans intelligent automation, cloud infrastructure, and mission-critical software.",

  services: [
    {
      id: "ai-automation",
      title: "AI Automation",
      description:
        "Transform operations with intelligent workflows and agentic systems that learn, adapt, and execute at scale.",
      deliverables: [
        "Custom AI agents and multi-agent orchestration",
        "LLM integration and prompt engineering",
        "Workflow automation and process optimization",
        "RAG systems and knowledge base integration",
      ],
      accentColor: "rgb(247, 192, 89)",
      iconPath: "M13 2L3 14h8l-1 8 10-12h-8l1-8z", // Lightning bolt
    },
    {
      id: "product-development",
      title: "Product Development",
      description:
        "Full-lifecycle product engineering from MVP to market-ready SaaS platforms with modern architectures.",
      deliverables: [
        "MVP development and rapid prototyping",
        "Full-stack web and mobile applications",
        "API design and microservices architecture",
        "Database design and optimization",
      ],
      accentColor: "rgb(118, 227, 220)",
      iconPath: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", // Layers/Shield concept
    },
    {
      id: "devops-cloud",
      title: "DevOps & Cloud",
      description:
        "Zero-downtime infrastructure with Kubernetes orchestration, automated CI/CD, and enterprise-grade reliability.",
      deliverables: [
        "Kubernetes cluster setup and management",
        "CI/CD pipeline design and automation",
        "Infrastructure as Code (Terraform, CloudFormation)",
        "Monitoring, logging, and observability",
      ],
      accentColor: "rgb(255, 156, 170)",
      iconPath: "M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 3v12", // Cloud upload
    },
    {
      id: "custom-software",
      title: "Custom Software",
      description:
        "Bespoke enterprise systems engineered for performance, security, and long-term maintainability.",
      deliverables: [
        "Enterprise application development",
        "Legacy system modernization and migration",
        "High-performance backend systems",
        "Integration with third-party services and APIs",
      ],
      accentColor: "rgb(116, 200, 252)",
      iconPath: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z", // Tool/wrench
    },
  ],
};
