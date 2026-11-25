import { renderToString } from 'react-dom/server';
import { App } from './App';
import { INSIGHTS_ARTICLES } from './data/insightsArticles';
import { STACK_PAGES } from './data/stackPages';

export { INSIGHTS_ARTICLES };

export interface RouteDefinition {
  path: string;
  outputPath: string; // relative to dist/, e.g. "index.html", "services/ai-automation/index.html", "404.html"
  title: string;
  description: string;
  canonical: string;
  noindex?: boolean;
  ogType?: 'website' | 'article';
  isCanonical200: boolean;
}

export interface RenderResult {
  html: string;
}

export function render(url: string): RenderResult {
  const html = renderToString(<App initialPath={url} />);
  return { html };
}

export function getAllRoutes(): RouteDefinition[] {
  const baseRoutes: RouteDefinition[] = [
    {
      path: '/',
      outputPath: 'index.html',
      title: 'AEITCH — Enterprise AI & Software Engineering Collective',
      description: 'AEITCH is an enterprise engineering collective architecting autonomous AI agents, full-cycle SaaS products, multi-cloud backbones, and custom software.',
      canonical: 'https://www.aeitch.com/',
      ogType: 'website',
      isCanonical200: true,
    },
    {
      path: '/services/ai-automation',
      outputPath: 'services/ai-automation/index.html',
      title: 'Enterprise AI Automation Agency & Custom Agents | AEITCH',
      description: 'Scale enterprise operations with autonomous multi-agent systems, private RAG knowledge retrieval, and custom LLM pipelines engineered for zero data leakage.',
      canonical: 'https://www.aeitch.com/services/ai-automation',
      ogType: 'website',
      isCanonical200: true,
    },
    {
      path: '/services/product-development',
      outputPath: 'services/product-development/index.html',
      title: 'SaaS Product Development Company & MVP Engineering | AEITCH',
      description: 'Accelerate SaaS product development in 4–8 week sprints. We engineer scalable cloud-native architectures, type-safe full-stack platforms, and intuitive UX.',
      canonical: 'https://www.aeitch.com/services/product-development',
      ogType: 'website',
      isCanonical200: true,
    },
    {
      path: '/services/devops-cloud',
      outputPath: 'services/devops-cloud/index.html',
      title: 'Enterprise DevOps Consulting & Kubernetes Services | AEITCH',
      description: 'Modernize enterprise cloud infrastructure with deterministic Terraform IaC, multi-cloud Kubernetes orchestration, automated CI/CD, and FinOps audits.',
      canonical: 'https://www.aeitch.com/services/devops-cloud',
      ogType: 'website',
      isCanonical200: true,
    },
    {
      path: '/services/custom-software',
      outputPath: 'services/custom-software/index.html',
      title: 'Enterprise Custom Software Development Company | AEITCH',
      description: 'Bespoke enterprise backend engineering in Go and Rust. Event-driven architectures, distributed data pipelines, and microservices built for long-term scale.',
      canonical: 'https://www.aeitch.com/services/custom-software',
      ogType: 'website',
      isCanonical200: true,
    },
    {
      path: '/solutions',
      outputPath: 'solutions/index.html',
      title: 'Enterprise Software Solutions & Architecture | AEITCH',
      description: 'Explore purpose-built enterprise engineering solutions: autonomous agent swarms, cloud backbones, low-latency transaction engines, and modern SaaS platforms.',
      canonical: 'https://www.aeitch.com/solutions',
      ogType: 'website',
      isCanonical200: true,
    },
    {
      path: '/about',
      outputPath: 'about/index.html',
      title: 'About AEITCH — Engineering Collective Behind Modern AI',
      description: 'AEITCH SMC PVT LTD is an engineering collective uniting senior software architects with autonomous AI systems to build production-grade enterprise software.',
      canonical: 'https://www.aeitch.com/about',
      ogType: 'website',
      isCanonical200: true,
    },
    {
      path: '/pricing',
      outputPath: 'pricing/index.html',
      title: 'Transparent Engineering Pod & MVP Sprint Pricing | AEITCH',
      description: 'Transparent engineering pod retainers, fixed-price MVP sprints, and dedicated architecture advisory. Zero bloated management overhead or vendor lock-in.',
      canonical: 'https://www.aeitch.com/pricing',
      ogType: 'website',
      isCanonical200: true,
    },
    {
      path: '/contact',
      outputPath: 'contact/index.html',
      title: 'Contact AEITCH | Book a Technical Architecture Call',
      description: 'Connect directly with AEITCH engineers to evaluate technical feasibility and receive a customized architecture implementation roadmap for your project.',
      canonical: 'https://www.aeitch.com/contact',
      ogType: 'website',
      isCanonical200: true,
    },
    {
      path: '/insights',
      outputPath: 'insights/index.html',
      title: 'Technical Engineering Insights & Architecture Guides | AEITCH',
      description: 'Deep technical analysis, architecture blueprints, and benchmarks on enterprise RAG, multi-agent systems, FinOps, and distributed backend engineering.',
      canonical: 'https://www.aeitch.com/insights',
      ogType: 'website',
      isCanonical200: true,
    },
    {
      path: '/stack',
      outputPath: 'stack/index.html',
      title: 'Engineering Tech Stack & Architecture Blueprints | AEITCH',
      description: 'Explore production-grade tech stack specifications: LangGraph, Kubernetes, pgvector, Terraform, Kafka, Go, Rust, and Next.js architecture blueprints.',
      canonical: 'https://www.aeitch.com/stack',
      ogType: 'website',
      isCanonical200: true,
    },
    {
      path: '/case-studies',
      outputPath: 'case-studies/index.html',
      title: 'Engineering Case Studies & Production Benchmarks | AEITCH',
      description: 'Explore how AEITCH deploys mission-critical software across autonomous AI, full-stack product development, cloud backbones, and bespoke systems.',
      canonical: 'https://www.aeitch.com/case-studies',
      noindex: true,
      ogType: 'website',
      isCanonical200: false,
    },
    {
      path: '/404',
      outputPath: '404.html',
      title: '404: Page Not Found | AEITCH Software Collective',
      description: 'The page you requested could not be found or has been relocated. Return to the AEITCH homepage or explore our enterprise AI and engineering services.',
      canonical: 'https://www.aeitch.com/404',
      noindex: true,
      ogType: 'website',
      isCanonical200: false,
    },
  ];

  const insightRoutes: RouteDefinition[] = INSIGHTS_ARTICLES.map((article) => ({
    path: `/insights/${article.slug}`,
    outputPath: `insights/${article.slug}/index.html`,
    title: article.seoTitle,
    description: article.metaDescription,
    canonical: `https://www.aeitch.com/insights/${article.slug}`,
    ogType: 'article',
    isCanonical200: true,
  }));

  const stackRoutes: RouteDefinition[] = STACK_PAGES.map((stack) => ({
    path: `/stack/${stack.slug}`,
    outputPath: `stack/${stack.slug}/index.html`,
    title: stack.seoTitle,
    description: stack.metaDescription,
    canonical: `https://www.aeitch.com/stack/${stack.slug}`,
    ogType: 'article',
    isCanonical200: true,
  }));

  return [...baseRoutes, ...insightRoutes, ...stackRoutes];
}
