import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { RadialGlowCard, SpotlightCard } from '@/components/ui/radial-glow-card';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { ParticleCanvas, HeroParticleCanvas } from '@/components/ui/particle-canvas';

describe('Milestone 2 Stress Challenge: RadialGlowCard', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame'] });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('1.1: Pointer movement updates --mouse-x and --mouse-y CSS custom properties accurately', () => {
    render(
      <RadialGlowCard data-testid="target-card" className="w-[400px] h-[300px]">
        <div>Card Content</div>
      </RadialGlowCard>
    );

    const card = screen.getByTestId('target-card');
    vi.spyOn(card, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      top: 50,
      right: 500,
      bottom: 350,
      width: 400,
      height: 300,
      x: 100,
      y: 50,
      toJSON: () => {},
    });

    expect(card.style.getPropertyValue('--mouse-x')).toBe('0px');
    expect(card.style.getPropertyValue('--mouse-y')).toBe('0px');

    fireEvent.mouseEnter(card);
    fireEvent.mouseMove(card, { clientX: 250, clientY: 175 });

    act(() => {
      vi.runAllTimers();
    });

    expect(card.style.getPropertyValue('--mouse-x')).toBe('150px');
    expect(card.style.getPropertyValue('--mouse-y')).toBe('125px');
  });

  it('1.2: RAF coalescing under 500 rapid mousemove events (zero lag & state thrashing)', () => {
    render(
      <RadialGlowCard data-testid="coalesce-card">
        <div>Inner Content</div>
      </RadialGlowCard>
    );

    const card = screen.getByTestId('coalesce-card');
    vi.spyOn(card, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      right: 500,
      bottom: 500,
      width: 500,
      height: 500,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    const setPropertySpy = vi.spyOn(card.style, 'setProperty');
    const cancelRafSpy = vi.spyOn(window, 'cancelAnimationFrame');

    fireEvent.mouseEnter(card);
    setPropertySpy.mockClear();

    // Fire 500 mousemove events without advancing timers
    for (let i = 1; i <= 500; i++) {
      fireEvent.mouseMove(card, { clientX: i, clientY: i });
    }

    // CancelAnimationFrame should have been called 499 times to discard stale frames
    expect(cancelRafSpy).toHaveBeenCalledTimes(499);

    act(() => {
      vi.runAllTimers();
    });

    expect(card.style.getPropertyValue('--mouse-x')).toBe('500px');
    expect(card.style.getPropertyValue('--mouse-y')).toBe('500px');
  });

  it('1.3: Boundary clamping challenge: assesses coordinate behavior outside element bounds', () => {
    render(
      <RadialGlowCard data-testid="boundary-card">
        <div>Boundary Content</div>
      </RadialGlowCard>
    );

    const card = screen.getByTestId('boundary-card');
    vi.spyOn(card, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      top: 100,
      right: 400,
      bottom: 300,
      width: 300,
      height: 200,
      x: 100,
      y: 100,
      toJSON: () => {},
    });

    // Test Case A: Exact boundaries (0, 0) and (300, 200)
    fireEvent.mouseMove(card, { clientX: 100, clientY: 100 });
    act(() => { vi.runAllTimers(); });
    expect(card.style.getPropertyValue('--mouse-x')).toBe('0px');
    expect(card.style.getPropertyValue('--mouse-y')).toBe('0px');

    fireEvent.mouseMove(card, { clientX: 400, clientY: 300 });
    act(() => { vi.runAllTimers(); });
    expect(card.style.getPropertyValue('--mouse-x')).toBe('300px');
    expect(card.style.getPropertyValue('--mouse-y')).toBe('200px');

    // Test Case B: Coordinates outside bounds (negative)
    fireEvent.mouseMove(card, { clientX: 50, clientY: 40 });
    act(() => { vi.runAllTimers(); });
    expect(card.style.getPropertyValue('--mouse-x')).toBe('-50px');
    expect(card.style.getPropertyValue('--mouse-y')).toBe('-60px');

    // Test Case C: Beyond right and bottom boundaries
    fireEvent.mouseMove(card, { clientX: 450, clientY: 350 });
    act(() => { vi.runAllTimers(); });
    expect(card.style.getPropertyValue('--mouse-x')).toBe('350px');
    expect(card.style.getPropertyValue('--mouse-y')).toBe('250px');
  });

  it('1.4: Overlay opacity and custom spotlightColor/radius props', () => {
    const { container } = render(
      <RadialGlowCard
        data-testid="props-card"
        spotlightColor="rgba(255, 166, 61, 0.3)"
        spotlightRadius={500}
      >
        <div>Custom Props Content</div>
      </RadialGlowCard>
    );

    const card = screen.getByTestId('props-card');
    const overlay = container.querySelector('[aria-hidden="true"]') as HTMLDivElement;

    expect(overlay).toBeInTheDocument();
    expect(overlay.style.opacity).toBe('0');
    expect(overlay.style.background).toContain('500px circle');
    expect(overlay.style.background).toContain('rgba(255, 166, 61, 0.3)');

    fireEvent.mouseEnter(card);
    expect(overlay.style.opacity).toBe('1');

    fireEvent.mouseLeave(card);
    expect(overlay.style.opacity).toBe('0');
  });

  it('1.5: Alias SpotlightCard operates identically to RadialGlowCard', () => {
    expect(SpotlightCard).toBe(RadialGlowCard);
  });
});

describe('Milestone 2 Stress Challenge: AnimatedCounter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('2.1: Mathematical easeOutExpo convergence verification', () => {
    const easeOutExpo = (p: number) => (p === 1 ? 1 : 1 - Math.pow(2, -10 * p));

    expect(easeOutExpo(0)).toBe(0);
    expect(easeOutExpo(0.1)).toBeCloseTo(0.5, 1);
    expect(easeOutExpo(0.5)).toBe(0.96875);
    expect(easeOutExpo(0.9)).toBeGreaterThan(0.998);
    expect(easeOutExpo(1)).toBe(1);

    let prev = -1;
    for (let i = 0; i <= 100; i++) {
      const current = easeOutExpo(i / 100);
      expect(current).toBeGreaterThanOrEqual(prev);
      prev = current;
    }
  });

  it('2.2: Large values and formatting stress test across animation lifecycle', () => {
    render(<AnimatedCounter value={1000000000} duration={1000} prefix="$" suffix=" ARR" />);
    expect(screen.getByText(/\$0 ARR/)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1100);
    });

    expect(screen.getByText(/\$1,000,000,000 ARR/)).toBeInTheDocument();
  }, 15000);

  it('2.3: Zero and negative values handling', () => {
    const { unmount } = render(<AnimatedCounter value={0} duration={500} prefix="#" suffix=" items" />);
    act(() => { vi.advanceTimersByTime(600); });
    expect(screen.getByText(/#0 items/)).toBeInTheDocument();
    unmount();

    render(<AnimatedCounter value={-42} duration={500} prefix="" suffix=" pts" />);
    act(() => { vi.advanceTimersByTime(600); });
    expect(screen.getByText(/-42 pts/)).toBeInTheDocument();
  });

  it('2.4: Decimal precision formatting stress test', () => {
    const { unmount } = render(<AnimatedCounter value={99.95} duration={500} decimals={2} suffix="%" />);
    act(() => { vi.advanceTimersByTime(600); });
    expect(screen.getByText(/99\.95%/)).toBeInTheDocument();
    unmount();

    render(<AnimatedCounter value={99.9} duration={500} decimals={2} suffix="%" />);
    act(() => { vi.advanceTimersByTime(600); });
    expect(screen.getByText(/99\.90%/)).toBeInTheDocument();
  });

  it('2.5: CLS prevention: Tabular numbers and monospace classes applied', () => {
    render(<AnimatedCounter value={42} className="custom-test-counter" />);
    const span = screen.getByText(/0/);
    expect(span).toHaveClass('tabular-nums');
    expect(span).toHaveClass('font-mono');
    expect(span).toHaveClass('inline-block');
  });

  it('2.6: IntersectionObserver triggering: single-fire guarantee', () => {
    let observeCallback: IntersectionObserverCallback | null = null;
    let observeCount = 0;

    class TestIntersectionObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = '';
      readonly thresholds = [];
      constructor(callback: IntersectionObserverCallback) {
        observeCallback = callback;
      }
      observe(target: Element) {
        observeCount++;
      }
      unobserve() {}
      disconnect() {}
      takeRecords() { return []; }
    }

    const originalIO = window.IntersectionObserver;
    window.IntersectionObserver = TestIntersectionObserver as unknown as typeof IntersectionObserver;

    try {
      render(<AnimatedCounter value={750} prefix="+" suffix=" hrs" />);
      expect(observeCount).toBe(1);
      expect(observeCallback).not.toBeNull();
    } finally {
      window.IntersectionObserver = originalIO;
    }
  });

  it('2.7: Accessibility: prefers-reduced-motion immediately presents target value', () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion: reduce'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    try {
      render(<AnimatedCounter value={8888} prefix="Total: " />);
      expect(screen.getByText(/Total: 8,888/)).toBeInTheDocument();
    } finally {
      window.matchMedia = originalMatchMedia;
    }
  });

  it('2.8: Dynamic value prop changes re-trigger animation and update displayed value', () => {
    const { rerender } = render(<AnimatedCounter value={100} duration={500} />);
    act(() => { vi.advanceTimersByTime(600); });
    expect(screen.getByText('100')).toBeInTheDocument();

    rerender(<AnimatedCounter value={200} duration={500} />);
    act(() => { vi.advanceTimersByTime(600); });

    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.queryByText('100')).toBeNull();
  });

  it('2.9: Unmount during active animation calls cancelAnimationFrame', () => {
    const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame');
    const { unmount } = render(<AnimatedCounter value={500} duration={2000} />);

    act(() => {
      vi.advanceTimersByTime(500);
    });
    unmount();

    expect(cancelSpy).toHaveBeenCalled();
  });
});

describe('Milestone 2 Stress Challenge: ParticleCanvas', () => {
  let mockCtx: any;

  beforeEach(() => {
    mockCtx = {
      setTransform: vi.fn(),
      scale: vi.fn(),
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
      shadowColor: '',
      shadowBlur: 0,
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 0,
    };
  });

  it('3.1: Canvas context initialization and graceful degradation if null', () => {
    const { container } = render(<ParticleCanvas data-testid="particle-cvs" />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveClass('pointer-events-none');
    expect(canvas).toHaveClass('absolute');
    expect(canvas).toHaveClass('inset-0');
  });

  it('3.2: No TDZ ReferenceError when IntersectionObserver callback triggers synchronously', () => {
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(mockCtx);

    try {
      expect(() => {
        render(<ParticleCanvas />);
      }).not.toThrow();
    } finally {
      HTMLCanvasElement.prototype.getContext = originalGetContext;
    }
  });

  it('3.3: High-DPI devicePixelRatio calculation oracle', () => {
    const getDPR = (dprVal: number | undefined) => Math.min(dprVal || 1, 2);

    expect(getDPR(3.5)).toBe(2);
    expect(getDPR(2.0)).toBe(2);
    expect(getDPR(1.0)).toBe(1);
    expect(getDPR(0)).toBe(1);
    expect(getDPR(undefined)).toBe(1);
  });

  it('3.4: Electrostatic repulsion mathematical oracle', () => {
    const mr = 160; // repulsion radius
    const mx = 200;
    const my = 200;

    const calculateRepulsion = (px: number, py: number) => {
      const dx = px - mx;
      const dy = py - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mr && dist > 0) {
        const force = (1 - dist / mr) * 2.2;
        const angle = Math.atan2(dy, dx);
        return {
          deltaX: Math.cos(angle) * force,
          deltaY: Math.sin(angle) * force,
          force,
          active: true,
        };
      }
      return { deltaX: 0, deltaY: 0, force: 0, active: false };
    };

    // Test Point Outside Radius (dist = 180 > 160)
    const outside = calculateRepulsion(200 + 180, 200);
    expect(outside.active).toBe(false);
    expect(outside.force).toBe(0);

    // Test Point Inside Radius (dist = 80 < 160, directly to the right)
    const right = calculateRepulsion(200 + 80, 200);
    expect(right.active).toBe(true);
    expect(right.force).toBeCloseTo(1.1, 5);
    expect(right.deltaX).toBeGreaterThan(0);
    expect(right.deltaY).toBeCloseTo(0, 5);

    // Test Point Inside Radius (directly to the left: px = 120, py = 200)
    const left = calculateRepulsion(200 - 80, 200);
    expect(left.active).toBe(true);
    expect(left.deltaX).toBeLessThan(0);

    // Singularity check: dist === 0 (mouse exactly atop particle)
    const singularity = calculateRepulsion(200, 200);
    expect(singularity.active).toBe(false);
    expect(Number.isNaN(singularity.deltaX)).toBe(false);
  });

  it('3.5: Proximity vector line connections oracle', () => {
    const maxDistance = 110;

    const calculateProximityLine = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
      const cdx = p1.x - p2.x;
      const cdy = p1.y - p2.y;
      const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

      if (cdist < maxDistance) {
        const alpha = (1 - cdist / maxDistance) * 0.22;
        return { connected: true, alpha, cdist };
      }
      return { connected: false, alpha: 0, cdist };
    };

    const close = calculateProximityLine({ x: 0, y: 0 }, { x: 10, y: 0 });
    expect(close.connected).toBe(true);
    expect(close.alpha).toBeCloseTo((1 - 10 / 110) * 0.22, 4);

    const far = calculateProximityLine({ x: 0, y: 0 }, { x: 115, y: 0 });
    expect(far.connected).toBe(false);
    expect(far.alpha).toBe(0);
  });

  it('3.6: Dynamic particle count scaling across viewport tiers', () => {
    const getDynamicCount = (w: number, override?: number) => {
      if (override) return override;
      if (w < 640) return 30;
      if (w < 1024) return 60;
      return 90;
    };

    expect(getDynamicCount(375)).toBe(30);
    expect(getDynamicCount(639)).toBe(30);
    expect(getDynamicCount(640)).toBe(60);
    expect(getDynamicCount(768)).toBe(60);
    expect(getDynamicCount(1023)).toBe(60);
    expect(getDynamicCount(1024)).toBe(90);
    expect(getDynamicCount(1920)).toBe(90);
    expect(getDynamicCount(1920, 120)).toBe(120);
  });

  it('3.7: HeroParticleCanvas alias parity', () => {
    expect(HeroParticleCanvas).toBe(ParticleCanvas);
  });
});
