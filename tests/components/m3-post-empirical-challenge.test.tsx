import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TechCarousel } from '@/components/home/tech-carousel';
import { TestimonialsSection, TestimonialData } from '@/components/home/testimonials-section';
import { StatsCounter, MetricItem } from '@/components/home/stats-counter';
import { AnimatedCounter } from '@/components/ui/animated-counter';

describe('Milestone 3 Post-Remediation Challenge 1: Infinite Tech Stack Marquee', () => {
  const EXPECTED_15_TECH = [
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

  it('contains strictly the 15 required enterprise technologies in exact order', () => {
    const { container } = render(<TechCarousel />);

    // Query all rendered tech item labels
    const marqueeContainer = container.querySelector('.animate-marquee');
    expect(marqueeContainer).not.toBeNull();

    // Query all tech name elements within the first loop
    const allTechCards = marqueeContainer!.querySelectorAll('.group\\/item');
    // Two full loops rendered for seamless marquee
    expect(allTechCards.length).toBe(30);

    const firstLoopCards = Array.from(allTechCards).slice(0, 15);
    const firstLoopNames = firstLoopCards.map((card) => {
      const nameEl = card.querySelector('span.font-bold');
      return nameEl ? nameEl.textContent?.trim() : null;
    });

    // Check exact length and order
    expect(firstLoopNames.length).toBe(15);
    expect(firstLoopNames).toEqual(EXPECTED_15_TECH);

    // Verify second loop is an exact replica
    const secondLoopCards = Array.from(allTechCards).slice(15, 30);
    const secondLoopNames = secondLoopCards.map((card) => {
      const nameEl = card.querySelector('span.font-bold');
      return nameEl ? nameEl.textContent?.trim() : null;
    });
    expect(secondLoopNames).toEqual(EXPECTED_15_TECH);
  });

  it('confirms pause-on-hover is implemented via Tailwind group-hover utilities', () => {
    const { container } = render(<TechCarousel />);

    // Outer wrapper must have 'group' class to establish hover context
    const marqueeWrapper = container.querySelector('.group.mask-marquee-edges');
    expect(marqueeWrapper).not.toBeNull();
    expect(marqueeWrapper?.className).toContain('group');
    expect(marqueeWrapper?.className).toContain('mask-marquee-edges');

    // Inner scrolling track must have 'group-hover:[animation-play-state:paused]'
    const scrollingTrack = container.querySelector('.animate-marquee');
    expect(scrollingTrack).not.toBeNull();
    expect(scrollingTrack?.className).toContain('group-hover:[animation-play-state:paused]');
  });
});

describe('Milestone 3 Post-Remediation Challenge 2: Testimonials Carousel Stress Harness', () => {
  const TEST_SET: TestimonialData[] = [
    {
      id: 't-1',
      clientName: 'Alpha Archer',
      clientRole: 'VP Architecture',
      clientCompany: 'A-Corp',
      quote: 'Quote one from Alpha Archer at A-Corp.',
      rating: 5,
      verified: true,
      avatarUrl: 'https://images.unsplash.com/photo-alpha',
    },
    {
      id: 't-2',
      clientName: 'Solo Founder',
      clientRole: 'CEO',
      clientCompany: 'B-Labs',
      quote: 'Quote two from Solo Founder at B-Labs with null avatar.',
      rating: 5,
      verified: true,
      avatarUrl: null, // Test initials fallback
    },
    {
      id: 't-3',
      clientName: 'Charlie Chaplin Jr',
      clientRole: 'Head of AI',
      clientCompany: 'C-AI',
      quote: 'Quote three with multi-word name.',
      rating: 4,
      verified: false,
      avatarUrl: null, // Test initials fallback with 3 words
    },
  ];

  it('renders initials fallback ("SF") when avatarUrl is null', () => {
    render(<TestimonialsSection initialTestimonials={TEST_SET} />);

    // Initial slide is Alpha Archer (has avatarUrl)
    expect(screen.getByText('Alpha Archer')).toBeInTheDocument();
    expect(screen.queryByText('AA')).not.toBeInTheDocument();

    // Advance to Solo Founder
    const nextBtn = screen.getByRole('button', { name: /Next Testimonial/i });
    fireEvent.click(nextBtn);

    expect(screen.getByText('Solo Founder')).toBeInTheDocument();
    // Must render initials "SF"
    const initialsBadge = screen.getByText('SF');
    expect(initialsBadge).toBeInTheDocument();
    expect(initialsBadge.className).toContain('rounded-full');
  });

  it('handles multi-word name initials truncation to 2 characters (e.g. "Charlie Chaplin Jr" -> "CC")', () => {
    render(<TestimonialsSection initialTestimonials={TEST_SET} />);

    const nextBtn = screen.getByRole('button', { name: /Next Testimonial/i });
    fireEvent.click(nextBtn); // To Solo Founder
    fireEvent.click(nextBtn); // To Charlie Chaplin Jr

    expect(screen.getByText('Charlie Chaplin Jr')).toBeInTheDocument();
    expect(screen.getByText('CC')).toBeInTheDocument();
  });

  it('circular wrap-around forward slide navigation (0 -> 1 -> 2 -> 0 -> 1 ...)', () => {
    render(<TestimonialsSection initialTestimonials={TEST_SET} />);

    const nextBtn = screen.getByRole('button', { name: /Next Testimonial/i });

    // Step 0: Alpha Archer
    expect(screen.getByText('Alpha Archer')).toBeInTheDocument();

    // Step 1: Solo Founder
    fireEvent.click(nextBtn);
    expect(screen.getByText('Solo Founder')).toBeInTheDocument();

    // Step 2: Charlie Chaplin Jr
    fireEvent.click(nextBtn);
    expect(screen.getByText('Charlie Chaplin Jr')).toBeInTheDocument();

    // Step 3 (wrap-around to 0): Alpha Archer
    fireEvent.click(nextBtn);
    expect(screen.getByText('Alpha Archer')).toBeInTheDocument();

    // Step 4: Solo Founder
    fireEvent.click(nextBtn);
    expect(screen.getByText('Solo Founder')).toBeInTheDocument();
  });

  it('circular wrap-around backward slide navigation (0 -> 2 -> 1 -> 0 -> 2 ...)', () => {
    render(<TestimonialsSection initialTestimonials={TEST_SET} />);

    const prevBtn = screen.getByRole('button', { name: /Previous Testimonial/i });

    // Step 0: Alpha Archer
    expect(screen.getByText('Alpha Archer')).toBeInTheDocument();

    // Step backward from 0: wraps to index 2 (Charlie Chaplin Jr)
    fireEvent.click(prevBtn);
    expect(screen.getByText('Charlie Chaplin Jr')).toBeInTheDocument();

    // Step backward from 2: to index 1 (Solo Founder)
    fireEvent.click(prevBtn);
    expect(screen.getByText('Solo Founder')).toBeInTheDocument();

    // Step backward from 1: to index 0 (Alpha Archer)
    fireEvent.click(prevBtn);
    expect(screen.getByText('Alpha Archer')).toBeInTheDocument();

    // Step backward from 0 again: wraps to index 2 (Charlie Chaplin Jr)
    fireEvent.click(prevBtn);
    expect(screen.getByText('Charlie Chaplin Jr')).toBeInTheDocument();
  });

  it('high-frequency rapid stress clicks alternating forward and backward', () => {
    render(<TestimonialsSection initialTestimonials={TEST_SET} />);

    const nextBtn = screen.getByRole('button', { name: /Next Testimonial/i });
    const prevBtn = screen.getByRole('button', { name: /Previous Testimonial/i });

    // Rapidly alternate 20 clicks
    for (let i = 0; i < 10; i++) {
      fireEvent.click(nextBtn);
      fireEvent.click(prevBtn);
    }

    // Must return safely to start position without error or state drift
    expect(screen.getByText('Alpha Archer')).toBeInTheDocument();
  });

  it('single-item array boundary condition: next and prev buttons do not freeze or crash', () => {
    const single = [TEST_SET[0]];
    render(<TestimonialsSection initialTestimonials={single} />);

    const nextBtn = screen.getByRole('button', { name: /Next Testimonial/i });
    const prevBtn = screen.getByRole('button', { name: /Previous Testimonial/i });

    for (let i = 0; i < 5; i++) {
      fireEvent.click(nextBtn);
      fireEvent.click(prevBtn);
    }

    expect(screen.getByText('Alpha Archer')).toBeInTheDocument();
  });
});

describe('Milestone 3 Post-Remediation Challenge 3: Animated Statistics Counters Zero CLS Verification', () => {
  const TEST_METRICS: MetricItem[] = [
    {
      label: 'Enterprise Uptime SLA',
      value: '99.9',
      prefix: '',
      suffix: '%',
      description: 'High-availability cloud architectures',
    },
    {
      label: 'Production Platforms Shipped',
      value: '50',
      prefix: '',
      suffix: '+',
      description: 'Full-cycle scalable software platforms',
    },
    {
      label: 'Deployment Velocity Gain',
      value: '4.2',
      prefix: '',
      suffix: 'x',
      description: 'Automated GitOps pipelines',
    },
    {
      label: 'Client Satisfaction Score',
      value: '99.4',
      prefix: '',
      suffix: '%',
      description: 'Clutch 5.0 rating',
    },
  ];

  it('reserves space and applies tabular-nums & min-w to eliminate horizontal layout shifts', () => {
    const { container } = render(<StatsCounter initialMetrics={TEST_METRICS} />);

    // Each metric container must have tabular-nums on its parent font wrapper
    const metricContainers = container.querySelectorAll('.tabular-nums');
    expect(metricContainers.length).toBeGreaterThanOrEqual(4);

    // Every AnimatedCounter element must contain min-w-[3ch] and tabular-nums
    const animatedCounters = container.querySelectorAll('.min-w-\\[3ch\\]');
    expect(animatedCounters.length).toBe(4);

    animatedCounters.forEach((el) => {
      expect(el.className).toContain('min-w-[3ch]');
      expect(el.className).toContain('tabular-nums');
      expect(el.className).toContain('font-mono');
      expect(el.className).toContain('inline-block');
    });
  });

  it('AnimatedCounter initializes with zero formatted with correct decimal precision', () => {
    // For integer values (decimals = 0), initial display is "0"
    const { unmount: unmount1 } = render(
      <AnimatedCounter value={50} decimals={0} prefix="" suffix="+" className="min-w-[3ch]" />
    );
    expect(screen.getByText(/0\+/)).toBeInTheDocument();
    unmount1();

    // For decimal values (decimals = 1), initial display is "0.0" (preventing shift when decimal appears)
    const { unmount: unmount2 } = render(
      <AnimatedCounter value={99.9} decimals={1} prefix="" suffix="%" className="min-w-[3ch]" />
    );
    expect(screen.getByText(/0\.0%/)).toBeInTheDocument();
    unmount2();

    // For velocity gain (decimals = 1), initial display is "0.0x"
    const { unmount: unmount3 } = render(
      <AnimatedCounter value={4.2} decimals={1} prefix="" suffix="x" className="min-w-[3ch]" />
    );
    expect(screen.getByText(/0\.0x/)).toBeInTheDocument();
    unmount3();
  });

  it('StatsCounter layout is structured with fixed CSS grid tracks preventing card reflow', () => {
    const { container } = render(<StatsCounter initialMetrics={TEST_METRICS} />);

    const grid = container.querySelector('.grid');
    expect(grid).not.toBeNull();
    // Grid defines static track divisions across breakpoints
    expect(grid?.className).toContain('grid-cols-1');
    expect(grid?.className).toContain('sm:grid-cols-2');
    expect(grid?.className).toContain('lg:grid-cols-4');
  });
});
