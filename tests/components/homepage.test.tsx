import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HeroSection } from '@/components/home/hero-section';
import { TechCarousel } from '@/components/home/tech-carousel';
import { ServicesShowcase } from '@/components/home/services-showcase';
import { StatsCounter, MetricItem } from '@/components/home/stats-counter';
import { WhyAeitch } from '@/components/home/why-aeitch';
import { TestimonialsSection, TestimonialData } from '@/components/home/testimonials-section';
import { CtaBanner } from '@/components/home/cta-banner';
import HomePage from '@/app/page';

describe('Home Section: HeroSection', () => {
  it('renders the high-tech badge, headline, and subhead', () => {
    render(<HeroSection />);

    expect(screen.getByText(/ENTERPRISE SOFTWARE & AI SYSTEMS/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /We build digital products that scale/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We engineer resilient cloud architectures, production-grade AI agents/i)
    ).toBeInTheDocument();
  });

  it('renders primary and secondary CTAs with correct navigation targets', () => {
    render(<HeroSection />);

    const consultLink = screen.getByRole('link', { name: /Schedule a Consultation/i });
    expect(consultLink).toBeInTheDocument();
    expect(consultLink).toHaveAttribute('href', '/contact-us#consultation');

    const caseStudiesLink = screen.getByRole('link', { name: /Explore Case Studies/i });
    expect(caseStudiesLink).toBeInTheDocument();
    expect(caseStudiesLink).toHaveAttribute('href', '/case-studies');
  });

  it('renders enterprise telemetry trust signals', () => {
    render(<HeroSection />);

    expect(screen.getByText(/5.0 ★ CLUTCH/i)).toBeInTheDocument();
    expect(screen.getByText(/99.9% UPTIME/i)).toBeInTheDocument();
    expect(screen.getByText(/SOVEREIGN AI/i)).toBeInTheDocument();
    expect(screen.getByText(/ZERO DEBT/i)).toBeInTheDocument();
  });
});

describe('Home Section: TechCarousel', () => {
  it('renders the tech marquee header and key enterprise technologies', () => {
    render(<TechCarousel />);

    expect(screen.getByText(/ENTERPRISE TECHNOLOGY ECOSYSTEM/i)).toBeInTheDocument();
    expect(screen.getByText(/PRODUCTION-HARDENED STACK/i)).toBeInTheDocument();

    const requiredTechs = [
      'Next.js',
      'React',
      'TypeScript',
      'Python',
      'PyTorch',
      'LangChain',
      'AWS',
      'Google Cloud',
      'Azure',
      'Docker',
      'Kubernetes',
      'Terraform',
      'PostgreSQL',
      'Redis',
      'GraphQL',
    ];

    requiredTechs.forEach((tech) => {
      const elements = screen.getAllByText(tech);
      expect(elements.length).toBeGreaterThanOrEqual(1);
    });
  });
});

describe('Home Section: ServicesShowcase', () => {
  it('renders all 4 core service pillars with direct links', () => {
    render(<ServicesShowcase />);

    expect(screen.getByText(/CORE SERVICE PILLARS/i)).toBeInTheDocument();
    expect(screen.getByText(/Engineering Disciplines Designed for/i)).toBeInTheDocument();

    expect(screen.getByText('AI Consulting & Systems')).toBeInTheDocument();
    expect(screen.getByText('Cloud Architecture & DevOps')).toBeInTheDocument();
    expect(screen.getByText('Custom Software Engineering')).toBeInTheDocument();
    expect(screen.getByText('Rapid MVP & Product Engineering')).toBeInTheDocument();

    const links = screen.getAllByRole('link', { name: /Explore Service/i });
    expect(links.length).toBe(4);

    const hrefs = links.map((link) => link.getAttribute('href'));
    expect(hrefs).toContain('/services/ai-consulting');
    expect(hrefs).toContain('/services/cloud-devops');
    expect(hrefs).toContain('/services/custom-software');
    expect(hrefs).toContain('/services/new-product-development');
  });

  it('renders feature bullets and flagship badge', () => {
    render(<ServicesShowcase />);

    expect(screen.getByText('Flagship')).toBeInTheDocument();
    expect(screen.getByText(/Custom LLM Fine-Tuning & Domain Adaptation/i)).toBeInTheDocument();
    expect(screen.getByText(/Multi-Cloud Architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/High-Throughput Distributed Microservices/i)).toBeInTheDocument();
    expect(screen.getByText(/6-8 Week Rapid MVP Delivery Framework/i)).toBeInTheDocument();
  });
});

describe('Home Section: StatsCounter', () => {
  it('renders default statistics counters when no initialMetrics provided', () => {
    render(<StatsCounter />);

    expect(screen.getByText(/PROVEN TRACK RECORD/i)).toBeInTheDocument();
    expect(screen.getByText(/Enterprise Uptime SLA/i)).toBeInTheDocument();
    expect(screen.getByText(/Production Platforms Shipped/i)).toBeInTheDocument();
    expect(screen.getByText(/Deployment Velocity Gain/i)).toBeInTheDocument();
    expect(screen.getByText(/Client Satisfaction Score/i)).toBeInTheDocument();
  });

  it('renders custom metrics passed via initialMetrics prop', () => {
    const customMetrics: MetricItem[] = [
      {
        id: 'metric-1',
        label: 'Active Cloud Nodes',
        value: '500',
        prefix: '',
        suffix: '+',
        description: 'Simultaneously running Kubernetes nodes',
      },
      {
        id: 'metric-2',
        label: 'Zero-Downtime Releases',
        value: '1200',
        prefix: '',
        suffix: '',
        description: 'Automated releases executed in production',
      },
    ];

    render(<StatsCounter initialMetrics={customMetrics} />);

    expect(screen.getByText('Active Cloud Nodes')).toBeInTheDocument();
    expect(screen.getByText('Zero-Downtime Releases')).toBeInTheDocument();
    expect(screen.getByText(/Simultaneously running Kubernetes nodes/i)).toBeInTheDocument();
  });
});

describe('Home Section: WhyAeitch', () => {
  it('renders the 4 foundational value cards with metric highlights', () => {
    render(<WhyAeitch />);

    expect(screen.getByText(/THE AEITCH ADVANTAGE/i)).toBeInTheDocument();
    expect(screen.getByText('Production-Hardened Engineering')).toBeInTheDocument();
    expect(screen.getByText('AI-Native Systems')).toBeInTheDocument();
    expect(screen.getByText('Cloud & FinOps Mastery')).toBeInTheDocument();
    expect(screen.getByText('Direct Architect Access')).toBeInTheDocument();

    expect(screen.getByText('Zero Legacy Debt')).toBeInTheDocument();
    expect(screen.getByText('100% Sovereign AI')).toBeInTheDocument();
    expect(screen.getByText('35-50% Cost Savings')).toBeInTheDocument();
    expect(screen.getByText('Principal Engineers Only')).toBeInTheDocument();
  });
});

describe('Home Section: TestimonialsSection', () => {
  it('renders client feedback with star rating and verified badge', () => {
    render(<TestimonialsSection />);

    expect(screen.getByText(/Client Testimonials/i)).toBeInTheDocument();
    expect(screen.getByText(/What Our Clients Say/i)).toBeInTheDocument();
    expect(screen.getByText(/Verified Client/i)).toBeInTheDocument();
    expect(screen.getByText('Marcus Vance')).toBeInTheDocument();
    expect(screen.getByText('ApexPay Global')).toBeInTheDocument();
  });

  it('supports carousel next and previous slide navigation', () => {
    render(<TestimonialsSection />);

    expect(screen.getByText('Marcus Vance')).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: /Next Testimonial/i });
    fireEvent.click(nextBtn);

    expect(screen.getByText('Dr. Elena Rostova')).toBeInTheDocument();
    expect(screen.getByText('MedPulse Health')).toBeInTheDocument();

    fireEvent.click(nextBtn);
    expect(screen.getByText('David Chen')).toBeInTheDocument();
    expect(screen.getByText('Nexus Labs')).toBeInTheDocument();

    const prevBtn = screen.getByRole('button', { name: /Previous Testimonial/i });
    fireEvent.click(prevBtn);
    expect(screen.getByText('Dr. Elena Rostova')).toBeInTheDocument();
  });

  it('renders custom testimonials provided via initialTestimonials prop', () => {
    const customTestimonials: TestimonialData[] = [
      {
        id: 't-custom',
        clientName: 'Sarah Jenkins',
        clientRole: 'Chief Information Officer',
        clientCompany: 'Global Logistics Co',
        quote: 'AEITCH transformed our real-time tracking architecture within weeks.',
        rating: 5,
        verified: true,
      },
    ];

    render(<TestimonialsSection initialTestimonials={customTestimonials} />);
    expect(screen.getByText('Sarah Jenkins')).toBeInTheDocument();
    expect(screen.getByText('Global Logistics Co')).toBeInTheDocument();
    expect(screen.getByText(/AEITCH transformed our real-time tracking architecture/i)).toBeInTheDocument();
  });
});

describe('Home Section: CtaBanner', () => {
  it('renders callout banner, headline, and consultation trigger link', () => {
    render(<CtaBanner />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Ready to Architect Your Next Digital Breakthrough\?/i,
      })
    ).toBeInTheDocument();

    const consultBtn = screen.getByRole('link', { name: /Schedule a Consultation/i });
    expect(consultBtn).toBeInTheDocument();
    expect(consultBtn).toHaveAttribute('href', '/contact-us#consultation');

    const emailLink = screen.getByRole('link', { name: /contact@aeitch.com/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:contact@aeitch.com');

    expect(screen.getByText(/AI Integration & Automation/i)).toBeInTheDocument();
    expect(screen.getByText(/DevOps & Cloud Engineering/i)).toBeInTheDocument();
    expect(screen.getByText(/Custom Software Development/i)).toBeInTheDocument();
    expect(screen.getByText(/Product Development Services/i)).toBeInTheDocument();
  });
});

describe('Full HomePage Integration', () => {
  it('renders the complete assembled interactive homepage', async () => {
    const Component = await HomePage();
    render(Component);

    // Verify presence of all key sections
    expect(screen.getByText(/ENTERPRISE SOFTWARE & AI SYSTEMS/i)).toBeInTheDocument();
    expect(screen.getByText(/ENTERPRISE TECHNOLOGY ECOSYSTEM/i)).toBeInTheDocument();
    expect(screen.getByText(/CORE SERVICE PILLARS/i)).toBeInTheDocument();
    expect(screen.getByText(/We don’t just build software/i)).toBeInTheDocument();
    expect(screen.getByText(/THE AEITCH ADVANTAGE/i)).toBeInTheDocument();
    expect(screen.getByText(/Client Testimonials/i)).toBeInTheDocument();
    expect(screen.getByText(/Ready to Architect Your Next Digital Breakthrough\?/i)).toBeInTheDocument();
  });
});
