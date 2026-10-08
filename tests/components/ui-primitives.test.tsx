import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { GlowingConicBorder, GlowingConicCard } from '@/components/ui/glowing-conic-border';
import { RadialGlowCard, SpotlightCard } from '@/components/ui/radial-glow-card';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { LocaleProvider } from '@/lib/i18n';

describe('UI Primitives: Button', () => {
  it('renders correctly with primary variant by default', () => {
    render(<Button>Click Me</Button>);
    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toBeInTheDocument();
    expect(btn.className).toContain('bg-accent');
  });

  it('renders glow, outline, and secondary variants', () => {
    const { rerender } = render(<Button variant="glow">Glow Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('shadow-glow-md');

    rerender(<Button variant="outline">Outline Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-accent/60');

    rerender(<Button variant="secondary">Secondary Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-surface-2');
  });

  it('supports disabled and loading states', () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('UI Primitives: Badge', () => {
  it('renders with children text and default styles', () => {
    render(<Badge>Beta</Badge>);
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('renders with ping dot indicator when dot=true', () => {
    const { container } = render(
      <Badge variant="glow" dot>
        Active
      </Badge>
    );
    expect(screen.getByText('Active')).toBeInTheDocument();
    const pingDot = container.querySelector('.animate-ping');
    expect(pingDot).toBeInTheDocument();
  });
});

describe('UI Primitives: Input', () => {
  it('renders label, input, and hint', () => {
    render(<Input label="Email Address" hint="We will never share your email" placeholder="you@company.com" />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByText(/we will never share your email/i)).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    render(<Input label="Name" error="Name is required" />);
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
  });
});

describe('UI Primitives: GlowingConicBorder & GlowingConicCard', () => {
  it('renders children wrapped in dual conic gradient layers', () => {
    render(
      <GlowingConicBorder glowIntensity="high">
        <div data-testid="card-content">High Tech Content</div>
      </GlowingConicBorder>
    );
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
  });

  it('works identically via GlowingConicCard alias', () => {
    render(
      <GlowingConicCard>
        <div data-testid="alias-content">Alias Works</div>
      </GlowingConicCard>
    );
    expect(screen.getByTestId('alias-content')).toBeInTheDocument();
  });
});

describe('UI Primitives: RadialGlowCard & SpotlightCard', () => {
  it('renders card content and handles mouse movement', () => {
    render(
      <RadialGlowCard data-testid="spotlight-card">
        <div>Spotlight Inner Content</div>
      </RadialGlowCard>
    );
    const card = screen.getByTestId('spotlight-card');
    expect(card).toBeInTheDocument();

    fireEvent.mouseEnter(card);
    fireEvent.mouseMove(card, { clientX: 100, clientY: 100 });
    fireEvent.mouseLeave(card);
  });

  it('works identically via SpotlightCard alias', () => {
    render(
      <SpotlightCard>
        <div>Spotlight Alias Content</div>
      </SpotlightCard>
    );
    expect(screen.getByText('Spotlight Alias Content')).toBeInTheDocument();
  });
});

describe('UI Primitives: AnimatedCounter', () => {
  it('renders formatted counter with prefix and suffix', () => {
    render(<AnimatedCounter value={150} prefix="+" suffix="%" />);
    const counter = screen.getByText(/\+.*%/);
    expect(counter).toBeInTheDocument();
  });
});

describe('UI Primitives: ScrollReveal & Stagger', () => {
  it('renders ScrollReveal wrapper with children', () => {
    render(
      <ScrollReveal>
        <div data-testid="revealed">Motion Content</div>
      </ScrollReveal>
    );
    expect(screen.getByTestId('revealed')).toBeInTheDocument();
  });

  it('renders StaggerContainer and StaggerItem', () => {
    render(
      <StaggerContainer>
        <StaggerItem>
          <div>Item 1</div>
        </StaggerItem>
        <StaggerItem>
          <div>Item 2</div>
        </StaggerItem>
      </StaggerContainer>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});

describe('Layout Components: Navbar & Footer', () => {
  it('renders Navbar with AEITCH branding, links, and Consultation CTA', () => {
    render(
      <LocaleProvider initialLocale="en">
        <Navbar />
      </LocaleProvider>
    );
    expect(screen.getByText(/AEITCH/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /book consultation/i })).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Case Studies')).toBeInTheDocument();
  });

  it('renders Footer with description, links, and operational status', () => {
    render(
      <LocaleProvider initialLocale="en">
        <Footer />
      </LocaleProvider>
    );
    expect(screen.getByText(/engineering@aeitch.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Riyadh • Jeddah • Eastern Province/i)).toBeInTheDocument();
  });
});
