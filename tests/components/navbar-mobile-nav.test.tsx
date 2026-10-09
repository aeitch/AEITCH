import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Navbar } from '@/components/layout/navbar';
import { MobileNav } from '@/components/layout/mobile-nav';
import { LocaleProvider } from '@/lib/i18n';

describe('Milestone M_NAV: Persistent Dark Glass Navbar', () => {
  it('renders <header> with persistent solid dark glass styling classes', () => {
    const { container } = render(
      <LocaleProvider initialLocale="en">
        <Navbar />
      </LocaleProvider>
    );

    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();

    // Verify all 5 required dark glass and contrast classes are present unconditionally
    expect(header).toHaveClass('bg-black/95');
    expect(header).toHaveClass('backdrop-blur-xl');
    expect(header).toHaveClass('border-b');
    expect(header).toHaveClass('border-white/15');
    expect(header).toHaveClass('shadow-2xl');
    expect(header).toHaveClass('sticky');
    expect(header).toHaveClass('top-0');
    expect(header).toHaveClass('z-50');
  });

  it('renders AEITCH brand mark, navigation links, and action buttons', () => {
    render(
      <LocaleProvider initialLocale="en">
        <Navbar />
      </LocaleProvider>
    );

    expect(screen.getByText(/AEITCH/i)).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Vision 2030')).toBeInTheDocument();
    expect(screen.getByText('Our Work')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /book a consultation|book consultation/i })).toBeInTheDocument();
  });

  it('toggles mobile drawer when clicking the mobile menu button', () => {
    render(
      <LocaleProvider initialLocale="en">
        <Navbar />
      </LocaleProvider>
    );

    const toggleButton = screen.getByLabelText(/Open Navigation Menu|Toggle Mobile Navigation/i);
    expect(toggleButton).toBeInTheDocument();

    // Initially mobile drawer dialog is not present
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Click toggle button to open
    fireEvent.click(toggleButton);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Drawer has required isolated overlay styling
    expect(dialog).toHaveClass('fixed');
    expect(dialog).toHaveClass('inset-x-0');
    expect(dialog).toHaveClass('top-16');
    expect(dialog).toHaveClass('sm:top-20');
    expect(dialog).toHaveClass('bottom-0');
    expect(dialog).toHaveClass('bg-black/98');
    expect(dialog).toHaveClass('backdrop-blur-2xl');
    expect(dialog).toHaveClass('z-50');
    expect(dialog).toHaveClass('overflow-y-auto');
    expect(dialog).toHaveClass('p-6');
  });
});

describe('Milestone M_NAV: Decoupled Isolated MobileNav Drawer', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('renders nothing when isOpen is false', () => {
    render(
      <LocaleProvider initialLocale="en">
        <MobileNav isOpen={false} onClose={vi.fn()} />
      </LocaleProvider>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders isolated opaque overlay when isOpen is true with exact required classes', () => {
    render(
      <LocaleProvider initialLocale="en">
        <MobileNav isOpen={true} onClose={vi.fn()} />
      </LocaleProvider>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Verbatim requirement classes:
    // fixed inset-x-0 top-16 sm:top-20 bottom-0 bg-black/98 backdrop-blur-2xl z-50 overflow-y-auto p-6
    expect(dialog).toHaveClass('fixed');
    expect(dialog).toHaveClass('inset-x-0');
    expect(dialog).toHaveClass('top-16');
    expect(dialog).toHaveClass('sm:top-20');
    expect(dialog).toHaveClass('bottom-0');
    expect(dialog).toHaveClass('bg-black/98');
    expect(dialog).toHaveClass('backdrop-blur-2xl');
    expect(dialog).toHaveClass('z-50');
    expect(dialog).toHaveClass('overflow-y-auto');
    expect(dialog).toHaveClass('p-6');
  });

  it('locks body scroll when opened and restores body scroll on close/unmount', () => {
    expect(document.body.style.overflow).toBe('');

    const { rerender, unmount } = render(
      <LocaleProvider initialLocale="en">
        <MobileNav isOpen={true} onClose={vi.fn()} />
      </LocaleProvider>
    );

    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <LocaleProvider initialLocale="en">
        <MobileNav isOpen={false} onClose={vi.fn()} />
      </LocaleProvider>
    );

    expect(document.body.style.overflow).toBe('');

    // Re-open and unmount
    rerender(
      <LocaleProvider initialLocale="en">
        <MobileNav isOpen={true} onClose={vi.fn()} />
      </LocaleProvider>
    );
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('triggers onOpenConsultation and onClose when Book Consultation is clicked', () => {
    const onClose = vi.fn();
    const onOpenConsultation = vi.fn();

    render(
      <LocaleProvider initialLocale="en">
        <MobileNav
          isOpen={true}
          onClose={onClose}
          onOpenConsultation={onOpenConsultation}
        />
      </LocaleProvider>
    );

    const ctaButton = screen.getByRole('button', { name: /book a consultation|book consultation/i });
    expect(ctaButton).toBeInTheDocument();

    fireEvent.click(ctaButton);

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onOpenConsultation).toHaveBeenCalledTimes(1);
  });

  it('triggers onClose when Escape key is pressed', () => {
    const onClose = vi.fn();

    render(
      <LocaleProvider initialLocale="en">
        <MobileNav isOpen={true} onClose={onClose} />
      </LocaleProvider>
    );

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('triggers onClose when a navigation link is clicked', () => {
    const onClose = vi.fn();

    render(
      <LocaleProvider initialLocale="en">
        <MobileNav isOpen={true} onClose={onClose} />
      </LocaleProvider>
    );

    const ourWorkLink = screen.getByText('Our Work');
    expect(ourWorkLink).toBeInTheDocument();

    fireEvent.click(ourWorkLink);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders core service links and operational telemetry with zero draft placeholders', () => {
    const { container } = render(
      <LocaleProvider initialLocale="en">
        <MobileNav isOpen={true} onClose={vi.fn()} />
      </LocaleProvider>
    );

    expect(screen.getByText('AI Automation & Integration')).toBeInTheDocument();
    expect(screen.getByText('Product Development')).toBeInTheDocument();
    expect(screen.getByText('DevOps & Cloud Engineering')).toBeInTheDocument();
    expect(screen.getByText('Custom Software Development')).toBeInTheDocument();

    // Verify zero occurrences of draft or placeholder text
    const textContent = container.textContent || '';
    expect(textContent).not.toContain('[REPLACE');
    expect(textContent).not.toContain('[CLIENT TO VERIFY');
  });
});
