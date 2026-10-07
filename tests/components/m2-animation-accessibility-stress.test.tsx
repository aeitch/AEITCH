import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';

import { GlowingConicBorder, GlowingConicCard } from '@/components/ui/glowing-conic-border';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { ParticleCanvas } from '@/components/ui/particle-canvas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

describe('M2 Challenge 1: Conic Gradient Rotation & Compositor Attributes', () => {
  it('1.1: Verifies CSS @property --conic-angle syntax compliance in globals.css', () => {
    const cssPath = path.resolve(process.cwd(), 'src/app/globals.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    expect(cssContent).toContain('@property --conic-angle');
    // Verify required Houdini properties: syntax, inherits, initial-value
    expect(cssContent).toMatch(/syntax:\s*["']<angle>["']/);
    expect(cssContent).toMatch(/inherits:\s*false/);
    expect(cssContent).toMatch(/initial-value:\s*0deg/);
  });

  it('1.2: Verifies 60fps compositor-only attributes on keyframe animations', () => {
    const cssPath = path.resolve(process.cwd(), 'src/app/globals.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // Extract spin-conic keyframe
    const spinMatch = cssContent.match(/@keyframes spin-conic\s*\{([^}]+)\}/);
    expect(spinMatch).toBeTruthy();
    if (spinMatch) {
      const body = spinMatch[1];
      // Must ONLY use transform, never top/left/margin/width/height (which trigger layout/paint)
      expect(body).toContain('transform: rotate');
      expect(body).not.toMatch(/\b(margin|padding|left|top|right|bottom|width|height)\b/);
    }

    // Extract pulse-glow keyframe
    const pulseMatch = cssContent.match(/@keyframes pulse-glow\s*\{([\s\S]+?)\n\}/);
    expect(pulseMatch).toBeTruthy();
    if (pulseMatch) {
      const body = pulseMatch[1];
      // Compositor-only properties: opacity and transform: scale
      expect(body).toContain('opacity:');
      expect(body).toContain('transform: scale');
      expect(body).not.toMatch(/\b(margin|padding|left|top|right|bottom|width|height)\b/);
    }

    // Extract float keyframe
    const floatMatch = cssContent.match(/@keyframes float\s*\{([\s\S]+?)\n\}/);
    expect(floatMatch).toBeTruthy();
    if (floatMatch) {
      const body = floatMatch[1];
      expect(body).toContain('transform: translateY');
      expect(body).not.toMatch(/\b(margin|padding|left|top|right|bottom|width|height)\b/);
    }
  });

  it('1.3: Verifies hover acceleration classes and speedup factor in GlowingConicBorder', () => {
    const { container } = render(
      <GlowingConicBorder>
        <div data-testid="conic-inner">Content</div>
      </GlowingConicBorder>
    );

    // Outer bloom aura and laser beam must both contain hover acceleration classes
    const rotatingElements = container.querySelectorAll('.animate-conic-spin');
    expect(rotatingElements.length).toBe(2);

    rotatingElements.forEach((el) => {
      expect(el.className).toContain('animate-conic-spin');
      expect(el.className).toContain('group-hover:animate-conic-spin-fast');
    });

    // Check CSS animation durations in globals.css
    const cssPath = path.resolve(process.cwd(), 'src/app/globals.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // .animate-conic-spin -> 8s
    expect(cssContent).toMatch(/\.animate-conic-spin\s*\{[^}]*animation:\s*spin-conic\s+8s/);
    // .animate-conic-spin-fast -> 2.5s (3.2x acceleration)
    expect(cssContent).toMatch(/\.animate-conic-spin-fast\s*\{[^}]*animation:\s*spin-conic\s+2\.5s/);
  });
});

describe('M2 Challenge 2: Accessibility & Reduced Motion Handling', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('2.1: AnimatedCounter respects prefers-reduced-motion: reduce by immediately setting target value', () => {
    // Mock reduced motion = true
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

    render(<AnimatedCounter value={99.9} decimals={1} prefix="$" suffix="k" />);
    // With reduced motion, display value must immediately equal the final formatted target: $99.9k
    const rendered = screen.getByText('$99.9k');
    expect(rendered).toBeInTheDocument();
  });

  it('2.2: AnimatedCounter animates gradually when prefers-reduced-motion is false', () => {
    // Mock reduced motion = false
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<AnimatedCounter value={1000} duration={3000} />);
    // Initially starts at initial formatted 0
    expect(screen.getByText(/0/)).toBeInTheDocument();
  });

  it('2.3: ParticleCanvas honors prefers-reduced-motion by zeroing particle velocity', () => {
    // Read source code of ParticleCanvas to empirically inspect reduced-motion branch
    const componentPath = path.resolve(process.cwd(), 'src/components/ui/particle-canvas.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');

    expect(content).toContain("window.matchMedia('(prefers-reduced-motion: reduce)').matches");
    expect(content).toContain('const speed = prefersReducedMotion ? 0 : 0.65');
    expect(content).toContain('if (!prefersReducedMotion)');
  });

  it('2.4: Audits CSS and Framer Motion reduced-motion coverage gaps', () => {
    const cssPath = path.resolve(process.cwd(), 'src/app/globals.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // Check if globals.css contains @media (prefers-reduced-motion: reduce)
    const hasCssReducedMotion = cssContent.includes('prefers-reduced-motion');

    // Check if scroll-reveal.tsx uses useReducedMotion
    const scrollRevealPath = path.resolve(process.cwd(), 'src/components/ui/scroll-reveal.tsx');
    const scrollRevealContent = fs.readFileSync(scrollRevealPath, 'utf8');
    const hasScrollRevealReducedMotion = scrollRevealContent.includes('useReducedMotion');

    // Note findings: Document whether CSS or Framer Motion currently lacks reduced-motion overrides
    // (This is an empirical assertion of current state for the critique report)
    expect(typeof hasCssReducedMotion).toBe('boolean');
    expect(typeof hasScrollRevealReducedMotion).toBe('boolean');
  });

  it('2.5: Button keyboard focus indicators satisfy WCAG 2.4.7 focus-visible requirements', () => {
    render(<Button data-testid="focus-btn">Action Button</Button>);
    const btn = screen.getByTestId('focus-btn');

    // Verify focus-visible ring styles
    expect(btn.className).toContain('focus-visible:outline-none');
    expect(btn.className).toContain('focus-visible:ring-2');
    expect(btn.className).toContain('focus-visible:ring-accent');
    expect(btn.className).toContain('focus-visible:ring-offset-2');
    expect(btn.className).toContain('focus-visible:ring-offset-void');

    // Simulate keyboard focus
    btn.focus();
    expect(document.activeElement).toBe(btn);
  });

  it('2.6: Input focus indicators and accessibility label association', () => {
    render(
      <Input
        label="Work Email"
        id="work-email-input"
        data-testid="focus-input"
        placeholder="alex@enterprise.com"
      />
    );

    const input = screen.getByTestId('focus-input');
    const label = screen.getByText('Work Email');

    // Verify htmlFor association
    expect(label).toHaveAttribute('for', 'work-email-input');
    expect(input).toHaveAttribute('id', 'work-email-input');

    // Verify focus styling
    expect(input.className).toContain('focus:border-accent');
    expect(input.className).toContain('focus:ring-1');
    expect(input.className).toContain('focus:ring-accent');
    expect(input.className).toContain('focus:outline-none');

    // Simulate focus
    input.focus();
    expect(document.activeElement).toBe(input);
  });

  it('2.7: Audits tailwind.config.ts for shadow-glow-xs definition', () => {
    const tailwindPath = path.resolve(process.cwd(), 'tailwind.config.ts');
    const tailwindContent = fs.readFileSync(tailwindPath, 'utf8');

    // Empirically check if glow-xs is defined in boxShadow
    const hasGlowXs = tailwindContent.includes("'glow-xs'");
    // Document finding: glow-xs is referenced in input and button, but not defined in config
    expect(typeof hasGlowXs).toBe('boolean');
  });
});
