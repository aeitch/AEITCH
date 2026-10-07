import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TechCarousel } from '@/components/home/tech-carousel';
import { TestimonialsSection, TestimonialData } from '@/components/home/testimonials-section';
import { StatsCounter, MetricItem } from '@/components/home/stats-counter';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import HomePage from '@/app/page';

describe('Milestone 3 Challenger 2: Tech Stack Marquee Exact Enumeration & Hover Pause', () => {
  const CANONICAL_15_TECH = [
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
  ] as const;

  it('strictly contains the 15 required enterprise technologies in exact canonical sequence', () => {
    const { container } = render(<TechCarousel />);

    const marqueeTrack = container.querySelector('.animate-marquee');
    expect(marqueeTrack).not.toBeNull();

    const techItems = marqueeTrack!.querySelectorAll('.group\\/item');
    // Seamless infinite scroll requires exactly 2 duplicate sets of the 15 technologies (30 cards)
    expect(techItems.length).toBe(30);

    // Extract names from primary loop (indices 0..14)
    const primaryLoopNames = Array.from(techItems)
      .slice(0, 15)
      .map((el) => el.querySelector('span.font-bold')?.textContent?.trim());

    expect(primaryLoopNames).toEqual(CANONICAL_15_TECH);

    // Extract names from duplicate loop (indices 15..29)
    const duplicateLoopNames = Array.from(techItems)
      .slice(15, 30)
      .map((el) => el.querySelector('span.font-bold')?.textContent?.trim());

    expect(duplicateLoopNames).toEqual(CANONICAL_15_TECH);

    // Ensure no unexpected tech was sneaked in
    expect(new Set(primaryLoopNames).size).toBe(15);
  });

  it('confirms pause-on-hover configuration on the marquee elements', () => {
    const { container } = render(<TechCarousel />);

    const outerGroup = container.querySelector('.group.mask-marquee-edges');
    expect(outerGroup).not.toBeNull();

    const innerTrack = outerGroup?.querySelector('.animate-marquee');
    expect(innerTrack).not.toBeNull();
    // Must possess the exact Tailwind arbitrary variant for pausing animation on container hover
    expect(innerTrack?.className).toContain('group-hover:[animation-play-state:paused]');
  });
});

describe('Milestone 3 Challenger 2: Testimonials Carousel Circular Wrap-Around & Initials Fallbacks', () => {
  const STRESS_DATA: TestimonialData[] = [
    {
      id: 'usr-1',
      clientName: 'Sarah Foster',
      clientRole: 'VP of Product',
      clientCompany: 'FinTech Alpha',
      quote: 'AEITCH re-architected our transaction processing pipeline.',
      rating: 5,
      verified: true,
      avatarUrl: null, // Test "SF" initials
    },
    {
      id: 'usr-2',
      clientName: 'Alexander Hamilton',
      clientRole: 'Chief Technology Officer',
      clientCompany: 'Treasury Systems',
      quote: 'Incredible speed, absolute zero downtime.',
      rating: 5,
      verified: true,
      avatarUrl: 'https://images.unsplash.com/photo-alexander', // Has avatar URL
    },
    {
      id: 'usr-3',
      clientName: 'Aristotle',
      clientRole: 'Founding Philosopher',
      clientCompany: 'Lyceum Tech',
      quote: 'Excellence is not an act, but a habit in this codebase.',
      rating: 5,
      verified: false,
      avatarUrl: null, // Single word name -> "A" initials
    },
    {
      id: 'usr-4',
      clientName: 'Jean Luc Picard',
      clientRole: 'Fleet Admiral',
      clientCompany: 'Starfleet Systems',
      quote: 'Make it scale.',
      rating: 5,
      verified: true,
      avatarUrl: '', // Empty string -> Should fall back to "JL" initials
    },
  ];

  it('renders avatar initials fallback "SF" when avatarUrl is null', () => {
    render(<TestimonialsSection initialTestimonials={STRESS_DATA} />);

    expect(screen.getByText('Sarah Foster')).toBeInTheDocument();
    const initialsBadge = screen.getByText('SF');
    expect(initialsBadge).toBeInTheDocument();
    expect(initialsBadge.className).toContain('rounded-full');
    expect(initialsBadge.className).toContain('bg-accent/20');
  });

  it('renders <img> and suppresses initials fallback when avatarUrl is provided', () => {
    render(<TestimonialsSection initialTestimonials={STRESS_DATA} />);

    const nextBtn = screen.getByRole('button', { name: /Next Testimonial/i });
    fireEvent.click(nextBtn); // Move to Alexander Hamilton

    expect(screen.getByText('Alexander Hamilton')).toBeInTheDocument();
    expect(screen.queryByText('AH')).not.toBeInTheDocument();

    const avatarImg = screen.getByAltText('Alexander Hamilton');
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).toHaveAttribute('src', 'https://images.unsplash.com/photo-alexander');
  });

  it('correctly handles single-word name ("Aristotle" -> "A") and multi-word name ("Jean Luc Picard" -> "JL")', () => {
    render(<TestimonialsSection initialTestimonials={STRESS_DATA} />);

    const nextBtn = screen.getByRole('button', { name: /Next Testimonial/i });

    // Step to Aristotle
    fireEvent.click(nextBtn); // index 1
    fireEvent.click(nextBtn); // index 2
    expect(screen.getByText('Aristotle')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();

    // Step to Jean Luc Picard
    fireEvent.click(nextBtn); // index 3
    expect(screen.getByText('Jean Luc Picard')).toBeInTheDocument();
    expect(screen.getByText('JL')).toBeInTheDocument();
  });

  it('stress-tests bidirectional circular wrap-around across multiple full rotations', () => {
    render(<TestimonialsSection initialTestimonials={STRESS_DATA} />);

    const nextBtn = screen.getByRole('button', { name: /Next Testimonial/i });
    const prevBtn = screen.getByRole('button', { name: /Previous Testimonial/i });

    // Initial is index 0: Sarah Foster
    expect(screen.getByText('Sarah Foster')).toBeInTheDocument();

    // Wrap backward immediately from index 0 -> index 3 (Jean Luc Picard)
    fireEvent.click(prevBtn);
    expect(screen.getByText('Jean Luc Picard')).toBeInTheDocument();

    // Wrap backward again -> index 2 (Aristotle)
    fireEvent.click(prevBtn);
    expect(screen.getByText('Aristotle')).toBeInTheDocument();

    // Wrap backward again -> index 1 (Alexander Hamilton)
    fireEvent.click(prevBtn);
    expect(screen.getByText('Alexander Hamilton')).toBeInTheDocument();

    // Wrap backward again -> index 0 (Sarah Foster)
    fireEvent.click(prevBtn);
    expect(screen.getByText('Sarah Foster')).toBeInTheDocument();

    // Complete 3 full forward cycles (12 forward clicks)
    for (let cycle = 0; cycle < 12; cycle++) {
      fireEvent.click(nextBtn);
    }
    // After 12 forward clicks (multiple of 4), should be back at index 0 (Sarah Foster)
    expect(screen.getByText('Sarah Foster')).toBeInTheDocument();

    // Complete 3 full backward cycles (12 backward clicks)
    for (let cycle = 0; cycle < 12; cycle++) {
      fireEvent.click(prevBtn);
    }
    expect(screen.getByText('Sarah Foster')).toBeInTheDocument();
  });

  it('boundary resilience: 2-item array toggles cleanly between indices 0 and 1 in both directions', () => {
    const twoItems = STRESS_DATA.slice(0, 2);
    render(<TestimonialsSection initialTestimonials={twoItems} />);

    const nextBtn = screen.getByRole('button', { name: /Next Testimonial/i });
    const prevBtn = screen.getByRole('button', { name: /Previous Testimonial/i });

    expect(screen.getByText('Sarah Foster')).toBeInTheDocument();

    fireEvent.click(nextBtn);
    expect(screen.getByText('Alexander Hamilton')).toBeInTheDocument();

    fireEvent.click(nextBtn);
    expect(screen.getByText('Sarah Foster')).toBeInTheDocument();

    fireEvent.click(prevBtn);
    expect(screen.getByText('Alexander Hamilton')).toBeInTheDocument();

    fireEvent.click(prevBtn);
    expect(screen.getByText('Sarah Foster')).toBeInTheDocument();
  });
});

describe('Milestone 3 Challenger 2: Zero Cumulative Layout Shift (CLS) on Statistics Counters', () => {
  const BENCHMARK_METRICS: MetricItem[] = [
    {
      label: 'Enterprise Uptime SLA',
      value: '99.9',
      prefix: '',
      suffix: '%',
      description: 'High-availability architectures',
    },
    {
      label: 'Production Platforms Shipped',
      value: '50',
      prefix: '',
      suffix: '+',
      description: 'Production platforms delivered',
    },
    {
      label: 'Deployment Velocity Gain',
      value: '4.2',
      prefix: '',
      suffix: 'x',
      description: 'GitOps speed multiplier',
    },
    {
      label: 'Client Satisfaction Score',
      value: '99.4',
      prefix: '',
      suffix: '%',
      description: 'Clutch 5.0 score',
    },
  ];

  it('preserves fixed glyph dimensions and layout constraints to guarantee zero CLS', () => {
    const { container } = render(<StatsCounter initialMetrics={BENCHMARK_METRICS} />);

    // Check all metric number elements
    const counterElements = container.querySelectorAll('.tabular-nums.font-sans');
    expect(counterElements.length).toBe(4);

    // Verify each AnimatedCounter instance has min-w-[3ch] and tabular-nums applied
    BENCHMARK_METRICS.forEach((m) => {
      expect(screen.getByText(m.label)).toBeInTheDocument();
    });

    const innerCounters = container.querySelectorAll('.min-w-\\[3ch\\]');
    expect(innerCounters.length).toBe(4);

    innerCounters.forEach((counter) => {
      // Must enforce monospaced digits and inline-block containment
      expect(counter.className).toContain('tabular-nums');
      expect(counter.className).toContain('font-mono');
      expect(counter.className).toContain('inline-block');
      expect(counter.className).toContain('min-w-[3ch]');
    });
  });

  it('initializes numbers with zero-padded decimal matching target fraction length', () => {
    // 99.9 (1 decimal) -> Initial state must be "0.0" rather than "0" so decimal separator doesn't induce CLS
    const { unmount: u1 } = render(
      <AnimatedCounter value={99.9} decimals={1} prefix="" suffix="%" className="min-w-[3ch]" />
    );
    expect(screen.getByText('0.0%')).toBeInTheDocument();
    u1();

    // 50 (0 decimals) -> Initial state must be "0"
    const { unmount: u2 } = render(
      <AnimatedCounter value={50} decimals={0} prefix="" suffix="+" className="min-w-[3ch]" />
    );
    expect(screen.getByText('0+')).toBeInTheDocument();
    u2();
  });

  it('handles extreme metric inputs without layout shift or crash', () => {
    const extremeMetrics: MetricItem[] = [
      {
        id: 'ex-1',
        label: 'Zero Metric',
        value: '0',
        prefix: '',
        suffix: '',
      },
      {
        id: 'ex-2',
        label: 'High Precision Sub-Millisecond',
        value: '0.001',
        prefix: '<',
        suffix: 'ms',
      },
      {
        id: 'ex-3',
        label: 'Multi-Billion Volume',
        value: '10000000',
        prefix: '$',
        suffix: '+',
      },
    ];

    render(<StatsCounter initialMetrics={extremeMetrics} />);

    expect(screen.getByText('Zero Metric')).toBeInTheDocument();
    expect(screen.getByText('High Precision Sub-Millisecond')).toBeInTheDocument();
    expect(screen.getByText('Multi-Billion Volume')).toBeInTheDocument();
  });
});

describe('Milestone 3 Challenger 2: Full Homepage Canonical Structure & Section Hierarchy', () => {
  it('renders all 7 canonical sections in mandated sequence without rogue components', async () => {
    const Component = await HomePage();
    const { container } = render(Component);

    // Section 1: Hero
    expect(screen.getByText(/ENTERPRISE SOFTWARE & AI SYSTEMS/i)).toBeInTheDocument();
    // Section 2: Marquee
    expect(screen.getByText(/ENTERPRISE TECHNOLOGY ECOSYSTEM/i)).toBeInTheDocument();
    // Section 3: Services
    expect(screen.getByText(/CORE SERVICE PILLARS/i)).toBeInTheDocument();
    // Section 4: Stats Counters
    expect(screen.getByText(/PROVEN TRACK RECORD/i)).toBeInTheDocument();
    // Section 5: Why AEITCH
    expect(screen.getByText(/THE AEITCH ADVANTAGE/i)).toBeInTheDocument();
    // Section 6: Testimonials
    expect(screen.getByText(/Client Testimonials/i)).toBeInTheDocument();
    // Section 7: CTA Banner
    expect(screen.getByText(/Ready to Architect Your Next Digital Breakthrough\?/i)).toBeInTheDocument();

    // Verify outer container is styled with obsidian void background
    const outerWrapper = container.firstElementChild;
    expect(outerWrapper?.className).toContain('bg-void');
  });
});
