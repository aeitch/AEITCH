import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HeroSection } from '@/components/home/hero-section';
import { TechCarousel } from '@/components/home/tech-carousel';
import { ServicesShowcase } from '@/components/home/services-showcase';
import { StatsCounter, MetricItem } from '@/components/home/stats-counter';
import { WhyAeitch } from '@/components/home/why-aeitch';
import { TestimonialsSection, TestimonialData } from '@/components/home/testimonials-section';
import { CtaBanner } from '@/components/home/cta-banner';
import HomePage from '@/app/page';
import { prisma } from '@/lib/prisma';

describe('Milestone 3 Empirical Stress Challenge: CTA Routing & Navigation Targets', () => {
  it('HeroSection: Primary CTA "Schedule a Consultation" points strictly to /contact-us#consultation', () => {
    render(<HeroSection />);

    const consultLink = screen.getByRole('link', { name: /Schedule a Consultation/i });
    expect(consultLink).toBeInTheDocument();
    expect(consultLink).toHaveAttribute('href', '/contact-us#consultation');
    expect(consultLink).not.toHaveAttribute('aria-disabled', 'true');
  });

  it('HeroSection: Secondary CTA "Explore Case Studies" points strictly to /case-studies', () => {
    render(<HeroSection />);

    const caseStudiesLink = screen.getByRole('link', { name: /Explore Case Studies/i });
    expect(caseStudiesLink).toBeInTheDocument();
    expect(caseStudiesLink).toHaveAttribute('href', '/case-studies');
    expect(caseStudiesLink).not.toHaveAttribute('aria-disabled', 'true');
  });

  it('CtaBanner: High-impact banner CTA "Schedule a Consultation" points strictly to /contact-us#consultation', () => {
    render(<CtaBanner />);

    const consultLink = screen.getByRole('link', { name: /Schedule a Consultation/i });
    expect(consultLink).toBeInTheDocument();
    expect(consultLink).toHaveAttribute('href', '/contact-us#consultation');
    expect(consultLink).not.toHaveAttribute('aria-disabled', 'true');
  });

  it('CtaBanner: Direct mailto link has valid protocol and address', () => {
    render(<CtaBanner />);

    const mailLink = screen.getByRole('link', { name: /contact@aeitch.com/i });
    expect(mailLink).toBeInTheDocument();
    expect(mailLink).toHaveAttribute('href', 'mailto:contact@aeitch.com');
  });

  it('ServicesShowcase: All 4 service cards render valid, distinct, canonical routes', () => {
    render(<ServicesShowcase />);

    const expectedServices = [
      {
        title: 'AI Consulting & Systems',
        href: '/services/ai-consulting',
      },
      {
        title: 'Cloud Architecture & DevOps',
        href: '/services/cloud-devops',
      },
      {
        title: 'Custom Software Engineering',
        href: '/services/custom-software',
      },
      {
        title: 'Rapid MVP & Product Engineering',
        href: '/services/new-product-development',
      },
    ];

    expectedServices.forEach((svc) => {
      // Find the card container containing the service title
      const titleEl = screen.getByRole('heading', { level: 3, name: svc.title });
      expect(titleEl).toBeInTheDocument();

      // Find the card containing this title
      const card = titleEl.closest('div');
      expect(card).not.toBeNull();
    });

    // Check all 4 "Explore Service" links
    const exploreLinks = screen.getAllByRole('link', { name: /Explore Service/i });
    expect(exploreLinks.length).toBe(4);

    const actualHrefs = exploreLinks.map((link) => link.getAttribute('href'));
    expect(actualHrefs).toEqual([
      '/services/ai-consulting',
      '/services/cloud-devops',
      '/services/custom-software',
      '/services/new-product-development',
    ]);

    // Verify all hrefs are distinct (no accidental copy-paste duplicates)
    const uniqueHrefs = new Set(actualHrefs);
    expect(uniqueHrefs.size).toBe(4);

    // Verify format: must start with /services/ and have no trailing slash or whitespace
    actualHrefs.forEach((href) => {
      expect(href).toMatch(/^\/services\/[a-z0-9-]+$/);
    });
  });

  it('Assembled HomePage: Comprehensive audit of all interactive navigation targets', async () => {
    const Component = await HomePage();
    const { container } = render(Component);

    const allAnchorTags = container.querySelectorAll('a');
    expect(allAnchorTags.length).toBeGreaterThanOrEqual(7);

    const hrefs = Array.from(allAnchorTags).map((a) => a.getAttribute('href'));

    // Verify no broken or empty hrefs
    hrefs.forEach((h) => {
      expect(h).toBeTruthy();
      expect(h).not.toBe('#');
      expect(h).not.toBe('javascript:void(0)');
      expect(h).not.toBe('undefined');
    });

    // Verify at least two consultation links (Hero and CTA Banner)
    const consultationLinks = hrefs.filter((h) => h === '/contact-us#consultation');
    expect(consultationLinks.length).toBe(2);

    // Verify case studies link
    expect(hrefs).toContain('/case-studies');

    // Verify all 4 service links
    expect(hrefs).toContain('/services/ai-consulting');
    expect(hrefs).toContain('/services/cloud-devops');
    expect(hrefs).toContain('/services/custom-software');
    expect(hrefs).toContain('/services/new-product-development');
  });
});

describe('Milestone 3 Empirical Stress Challenge: Live SQLite & Prisma Query Integration', () => {
  it('Direct SQLite Query: MetricCounter table contains valid active records', async () => {
    const liveMetrics = await prisma.metricCounter.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    expect(liveMetrics).toBeDefined();
    expect(Array.isArray(liveMetrics)).toBe(true);
    expect(liveMetrics.length).toBeGreaterThanOrEqual(4);

    liveMetrics.forEach((m) => {
      expect(m.id).toBeDefined();
      expect(m.label.length).toBeGreaterThan(0);
      expect(m.value.length).toBeGreaterThan(0);
      expect(m.isActive).toBe(true);
      expect(typeof m.order).toBe('number');
      // Numeric parseable
      expect(Number.isNaN(parseFloat(m.value))).toBe(false);
    });
  });

  it('Direct SQLite Query: Testimonial table contains valid active records', async () => {
    const liveTestimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    expect(liveTestimonials).toBeDefined();
    expect(Array.isArray(liveTestimonials)).toBe(true);
    expect(liveTestimonials.length).toBeGreaterThanOrEqual(3);

    liveTestimonials.forEach((t) => {
      expect(t.id).toBeDefined();
      expect(t.clientName.length).toBeGreaterThan(0);
      expect(t.clientRole.length).toBeGreaterThan(0);
      expect(t.clientCompany.length).toBeGreaterThan(0);
      expect(t.quote.length).toBeGreaterThan(10);
      expect(t.rating).toBeGreaterThanOrEqual(1);
      expect(t.rating).toBeLessThanOrEqual(5);
      expect(t.isActive).toBe(true);
    });
  });

  it('Live Server Component: HomePage queries live database and passes live data to child components', async () => {
    const liveMetrics = await prisma.metricCounter.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    const liveTestimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    const Component = await HomePage();
    render(Component);

    // Verify live metrics are rendered
    liveMetrics.forEach((m) => {
      expect(screen.getByText(m.label)).toBeInTheDocument();
    });

    // Verify first live testimonial is rendered
    expect(screen.getByText(liveTestimonials[0].clientName)).toBeInTheDocument();
    expect(screen.getByText(liveTestimonials[0].clientCompany)).toBeInTheDocument();
  });
});

describe('Milestone 3 Empirical Stress Challenge: Database Resilience & Graceful Fallbacks', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Fallback Resilience: When MetricCounter and Testimonial tables return empty arrays', async () => {
    // Simulate empty database tables
    vi.spyOn(prisma.metricCounter, 'findMany').mockResolvedValue([]);
    vi.spyOn(prisma.testimonial, 'findMany').mockResolvedValue([]);

    const Component = await HomePage();
    render(Component);

    // Should fall back to DEFAULT_METRICS without crashing
    expect(screen.getByText('Enterprise Uptime SLA')).toBeInTheDocument();
    expect(screen.getByText('Production Platforms Shipped')).toBeInTheDocument();
    expect(screen.getByText('Deployment Velocity Gain')).toBeInTheDocument();
    expect(screen.getByText('Client Satisfaction Score')).toBeInTheDocument();

    // Should fall back to DEFAULT_TESTIMONIALS without crashing
    expect(screen.getByText('Marcus Vance')).toBeInTheDocument();
    expect(screen.getByText('ApexPay Global')).toBeInTheDocument();
  });

  it('Fallback Resilience: When Prisma queries throw database exceptions (e.g. disk corruption, locked db)', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(prisma.metricCounter, 'findMany').mockRejectedValue(
      new Error('SQLITE_BUSY: database is locked')
    );
    vi.spyOn(prisma.testimonial, 'findMany').mockRejectedValue(
      new Error('PrismaClientKnownRequestError: Table `dev.MetricCounter` does not exist')
    );

    // HomePage should NOT throw an uncaught exception
    const Component = await HomePage();
    render(Component);

    // Warning should have been logged
    expect(warnSpy).toHaveBeenCalled();
    expect(warnSpy.mock.calls[0][0]).toContain('Utilizing fallback static metrics/testimonials');

    // UI should still render default fallbacks seamlessly
    expect(screen.getByText('Enterprise Uptime SLA')).toBeInTheDocument();
    expect(screen.getByText('Marcus Vance')).toBeInTheDocument();
  });

  it('StatsCounter Component Resilience: Handles boundary numeric values, zero, decimals, and missing metadata', () => {
    const edgeMetrics: MetricItem[] = [
      {
        id: 'edge-1',
        label: 'Zero Valued Metric',
        value: '0',
        prefix: '',
        suffix: '',
      },
      {
        id: 'edge-2',
        label: 'High Precision Latency',
        value: '0.005',
        prefix: '<',
        suffix: 'ms',
        description: null,
        icon: null,
      },
      {
        id: 'edge-3',
        label: 'Negative or Extreme Metric',
        value: '999999',
        prefix: '$',
        suffix: 'M',
        description: 'Venture capital valuation',
        icon: 'UnknownIconThatDoesNotExist',
      },
    ];

    render(<StatsCounter initialMetrics={edgeMetrics} />);

    expect(screen.getByText('Zero Valued Metric')).toBeInTheDocument();
    expect(screen.getByText('High Precision Latency')).toBeInTheDocument();
    expect(screen.getByText('Negative or Extreme Metric')).toBeInTheDocument();
  });

  it('TestimonialsSection Component Resilience: Handles 1 testimonial and rapid next/prev navigation without modulus errors', () => {
    const singleTestimonial: TestimonialData[] = [
      {
        id: 'single-1',
        clientName: 'Solo Founder',
        clientRole: 'CEO',
        clientCompany: 'Stealth AI',
        quote: 'AEITCH built our complete stack in record time.',
        rating: 4,
        verified: false,
        avatarUrl: null, // Test initials generation
      },
    ];

    render(<TestimonialsSection initialTestimonials={singleTestimonial} />);

    expect(screen.getByText('Solo Founder')).toBeInTheDocument();
    expect(screen.getByText('Stealth AI')).toBeInTheDocument();
    // Initials fallback should be rendered
    expect(screen.getByText('SF')).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: /Next Testimonial/i });
    const prevBtn = screen.getByRole('button', { name: /Previous Testimonial/i });

    // Click Next repeatedly - with total = 1, must remain at 0 without % 0 NaN or error
    for (let i = 0; i < 5; i++) {
      fireEvent.click(nextBtn);
    }
    expect(screen.getByText('Solo Founder')).toBeInTheDocument();

    // Click Prev repeatedly
    for (let i = 0; i < 5; i++) {
      fireEvent.click(prevBtn);
    }
    expect(screen.getByText('Solo Founder')).toBeInTheDocument();
  });

  it('TestimonialsSection: Multi-slide carousel circular wrap-around forward and backward stress test', () => {
    const multiTestimonials: TestimonialData[] = [
      {
        id: 't-1',
        clientName: 'Alice Alpha',
        clientRole: 'VP Eng',
        clientCompany: 'Alpha Corp',
        quote: 'Alpha quote text',
        rating: 5,
      },
      {
        id: 't-2',
        clientName: 'Bob Beta',
        clientRole: 'CTO',
        clientCompany: 'Beta Labs',
        quote: 'Beta quote text',
        rating: 5,
      },
      {
        id: 't-3',
        clientName: 'Charlie Gamma',
        clientRole: 'Director',
        clientCompany: 'Gamma Inc',
        quote: 'Gamma quote text',
        rating: 5,
      },
    ];

    render(<TestimonialsSection initialTestimonials={multiTestimonials} />);

    expect(screen.getByText('Alice Alpha')).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: /Next Testimonial/i });
    const prevBtn = screen.getByRole('button', { name: /Previous Testimonial/i });

    // Step forward 1: Bob Beta
    fireEvent.click(nextBtn);
    expect(screen.getByText('Bob Beta')).toBeInTheDocument();

    // Step forward 2: Charlie Gamma
    fireEvent.click(nextBtn);
    expect(screen.getByText('Charlie Gamma')).toBeInTheDocument();

    // Step forward 3: wraps to Alice Alpha
    fireEvent.click(nextBtn);
    expect(screen.getByText('Alice Alpha')).toBeInTheDocument();

    // Step backward from 0: wraps to Charlie Gamma
    fireEvent.click(prevBtn);
    expect(screen.getByText('Charlie Gamma')).toBeInTheDocument();

    // Step backward again: Bob Beta
    fireEvent.click(prevBtn);
    expect(screen.getByText('Bob Beta')).toBeInTheDocument();
  });
});
