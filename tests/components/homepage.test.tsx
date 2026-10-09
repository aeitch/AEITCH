import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LocaleProvider } from '@/lib/i18n';
import { HeroSection } from '@/components/home/hero-section';
import { IntroStatement } from '@/components/home/intro-statement';
import { ServicesFocused } from '@/components/home/services-focused';
import { Vision2030Focused } from '@/components/home/vision-2030-focused';
import { HowWeWorkFocused } from '@/components/home/how-we-work-focused';
import { OurWorkFocused } from '@/components/home/our-work-focused';
import { WhyAeitchFocused } from '@/components/home/why-aeitch-focused';
import { FinalCtaForm } from '@/components/home/final-cta-form';
import HomePage from '@/app/page';

describe('Home Section 1: HeroSection', () => {
  it('renders Arabic primary eyebrow, H1, subhead, and detail strip', () => {
    render(
      <LocaleProvider initialLocale="ar">
        <HeroSection />
      </LocaleProvider>
    );

    expect(screen.getByText(/إيتش — هندسة رقمية للمؤسسات/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /أربع خدمات\. هندسة واحدة متقنة\./i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/نبني حلول الذكاء الاصطناعي والمنتجات الرقمية/i)).toBeInTheDocument();

    // Hero detail strip
    expect(screen.getByText('AI')).toBeInTheDocument();
    expect(screen.getByText('PRODUCT')).toBeInTheDocument();
    expect(screen.getByText('DEVOPS & CLOUD')).toBeInTheDocument();
    expect(screen.getByText('CUSTOM SOFTWARE')).toBeInTheDocument();
    expect(screen.getByText('VISION 2030')).toBeInTheDocument();
  });

  it('renders English H1, subhead, and CTAs when in English locale', () => {
    render(
      <LocaleProvider initialLocale="en">
        <HeroSection />
      </LocaleProvider>
    );

    expect(screen.getByText(/AEITCH — Digital engineering for enterprises/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Four services\. One engineering standard\./i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We build AI automation, digital products, cloud infrastructure/i)
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Book a free technical consultation/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explore our services/i })).toBeInTheDocument();
  });
});

describe('Home Section 2: IntroStatement', () => {
  it('renders conviction statement in large editorial typography', () => {
    render(
      <LocaleProvider initialLocale="en">
        <IntroStatement />
      </LocaleProvider>
    );

    expect(
      screen.getByText(/We don't do everything for everyone\. We focus on four services we do well/i)
    ).toBeInTheDocument();
  });
});

describe('Home Section 3: ServicesFocused (4 Distinct Layouts)', () => {
  it('renders all four core services with unique numbering and headlines', () => {
    render(
      <LocaleProvider initialLocale="en">
        <ServicesFocused />
      </LocaleProvider>
    );

    expect(screen.getAllByText(/AI Automation & Integration/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Product Development/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/DevOps & Cloud Engineering/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Custom Software Development/i).length).toBeGreaterThanOrEqual(1);

    // Distinct service numbers
    expect(screen.getAllByText('01').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('02').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('03').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('04').length).toBeGreaterThanOrEqual(1);
  });
});

describe('Home Section 4: Vision2030Focused', () => {
  it('renders Vision 2030 strategic tracks and commitments', () => {
    render(
      <LocaleProvider initialLocale="en">
        <Vision2030Focused />
      </LocaleProvider>
    );

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /We engineer what the Kingdom needs to deliver its digital vision/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByText('Data under your control')).toBeInTheDocument();
    expect(screen.getByText('Full code ownership')).toBeInTheDocument();
    expect(screen.getByText('Knowledge transfer')).toBeInTheDocument();
  });
});

describe('Home Section 5: HowWeWorkFocused', () => {
  it('renders the 4 simple operational steps', () => {
    render(
      <LocaleProvider initialLocale="en">
        <HowWeWorkFocused />
      </LocaleProvider>
    );

    expect(screen.getByText('Discover')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Build')).toBeInTheDocument();
    expect(screen.getByText('Launch & support')).toBeInTheDocument();
  });
});

describe('Home Section 6: OurWorkFocused', () => {
  it('renders verified case studies from aeitch.com and link to case studies', () => {
    render(
      <LocaleProvider initialLocale="en">
        <OurWorkFocused />
      </LocaleProvider>
    );

    expect(
      screen.getByText(/RAG-Powered AI Agent Transforming Regulatory Fintech Compliance/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/High-Conversion Fintech MVP: Autonomous Investment Engine/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Microservices Transformation Accelerating System Modernization/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/API System Integration Driving Insurance Automation at Scale/i)
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /View all case studies/i })).toBeInTheDocument();
  });
});

describe('Home Section 7: WhyAeitchFocused', () => {
  it('renders the 4 core value points', () => {
    render(
      <LocaleProvider initialLocale="en">
        <WhyAeitchFocused />
      </LocaleProvider>
    );

    expect(screen.getByText('Senior engineers only')).toBeInTheDocument();
    expect(screen.getByText('Four services, done deeply')).toBeInTheDocument();
    expect(screen.getByText('Flexible engagement')).toBeInTheDocument();
    expect(screen.getByText('A clear process')).toBeInTheDocument();
  });
});

describe('Home Section 8: FinalCtaForm', () => {
  it('renders the intake form with verified contact and dropdown options', () => {
    render(
      <LocaleProvider initialLocale="en">
        <FinalCtaForm />
      </LocaleProvider>
    );

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Got a project\? Let's talk for 30 minutes\./i,
      })
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/e\.g\. Jane Doe/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/name@company\.com/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send request/i })).toBeInTheDocument();
  });
});

describe('Full HomePage Integration', () => {
  it('renders the complete 8-section focused homepage cleanly', () => {
    render(
      <LocaleProvider initialLocale="en">
        <HomePage />
      </LocaleProvider>
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Four services\. One engineering standard\./i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/We don't do everything for everyone\. We focus on four services we do well/i)
    ).toBeInTheDocument();
    expect(screen.getAllByText(/AI Automation & Integration/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Product Development/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/DevOps & Cloud/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Custom Software/i).length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /We engineer what the Kingdom needs to deliver its digital vision/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText('Senior engineers only')).toBeInTheDocument();
  });
});
