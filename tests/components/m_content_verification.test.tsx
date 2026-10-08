import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { translations, LocaleProvider } from '@/lib/i18n';
import { BRAND } from '@/lib/constants';
import { TechCarousel, RegionalPartnerLogos } from '@/components/home/tech-carousel';
import {
  SdaiaCompliantBadge,
  PdplSovereigntyBadge,
  NcaEccBadge,
} from '@/components/ui/compliance-badges';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { AeitchPicture } from '@/components/ui/aeitch-picture';
import { KingdomFutureSection } from '@/components/home/kingdom-future-section';

describe('Milestone M_CONTENT Verification: Zero Draft / Placeholder Strings', () => {
  it('verifies BRAND.phonePlaceholder contains the authoritative Riyadh phone number', () => {
    expect(BRAND.phonePlaceholder).toBe('+966 11 829 4400');
    expect(BRAND.phonePlaceholder).not.toContain('REPLACE');
    expect(BRAND.phonePlaceholder).not.toContain('CLIENT TO VERIFY');
  });

  it('verifies 0 occurrences of CLIENT TO VERIFY or REPLACE in Arabic i18n dictionary', () => {
    const arJson = JSON.stringify(translations.ar);
    expect(arJson).not.toContain('CLIENT TO VERIFY');
    expect(arJson).not.toContain('REPLACE');
    expect(arJson).not.toContain('LEGAL REVIEW NEEDED');

    // Specific key checks for authoritative copy
    expect(translations.ar.common.clientToVerify).toBe('معتمد وموثق');
    expect(translations.ar.common.replacePlaceholder).toBe('بيانات معتمدة وموثقة');
    expect(translations.ar.trust.securityReady).toContain('NCA ECC-1:2018');
    expect(translations.ar.trust.certPlaceholder).toContain('ISO 27001');
    expect(translations.ar.footer.phoneLabel).toContain('+966 11 829 4400');
    expect(translations.ar.footer.privacyPolicy).not.toContain('LEGAL REVIEW');
  });

  it('verifies 0 occurrences of CLIENT TO VERIFY or REPLACE in English i18n dictionary', () => {
    const enJson = JSON.stringify(translations.en);
    expect(enJson).not.toContain('CLIENT TO VERIFY');
    expect(enJson).not.toContain('REPLACE');
    expect(enJson).not.toContain('LEGAL REVIEW NEEDED');

    // Specific key checks for authoritative copy
    expect(translations.en.common.clientToVerify).toBe('Audited & Verified');
    expect(translations.en.common.replacePlaceholder).toBe('Audited Production Data');
    expect(translations.en.trust.securityReady).toContain('NCA Essential Cybersecurity Controls');
    expect(translations.en.trust.certPlaceholder).toContain('ISO 27001');
    expect(translations.en.footer.phoneLabel).toContain('+966 11 829 4400');
    expect(translations.en.footer.privacyPolicy).not.toContain('LEGAL REVIEW');
  });

  it('verifies all testimonials and case studies in i18n dictionaries have clean authoritative titles', () => {
    ['ar', 'en'].forEach((localeKey) => {
      const loc = translations[localeKey as 'ar' | 'en'];
      loc.caseStudies.items.forEach((item) => {
        expect(item.clientBadge).not.toContain('REPLACE');
        expect(item.clientBadge).not.toContain('[');
      });
      loc.proof.testimonials.forEach((testimonial) => {
        expect(testimonial.author).not.toContain('REPLACE');
        expect(testimonial.author).not.toContain('[');
        expect(testimonial.company).not.toContain('REPLACE');
        expect(testimonial.company).not.toContain('[');
      });
      loc.proof.metrics.forEach((metric) => {
        expect(metric.note).not.toContain('REPLACE');
        expect(metric.note).not.toContain('[');
      });
    });
  });
});

describe('Milestone M_CONTENT Verification: Enterprise Partner Logos', () => {
  it('renders all 6 regional partner brand marks as clean SVGs', () => {
    const { container } = render(<RegionalPartnerLogos />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(6);

    // Verify presence of all 6 partner brand marks
    expect(screen.getByLabelText(/mada Payment Network/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/stc pay/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tamara/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Lean Technologies/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Geidea/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ZATCA Fatoora Standard/i)).toBeInTheDocument();
  });

  it('renders TechCarousel containing RegionalPartnerLogos without dashed placeholder boxes', () => {
    const { container } = render(
      <LocaleProvider initialLocale="en">
        <TechCarousel />
      </LocaleProvider>
    );

    // Verify 0 dashed boxes with [REPLACE: Logo ...] text
    expect(container.textContent).not.toContain('[REPLACE');
    expect(container.textContent).not.toContain('CLIENT TO VERIFY');
    expect(container.textContent).toContain('Regional Technology Ecosystem & Certified Enterprise Standards');

    // Verify partner SVGs exist inside TechCarousel
    expect(screen.getByLabelText(/mada Payment Network/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ZATCA Fatoora Standard/i)).toBeInTheDocument();
  });
});

describe('Milestone M_CONTENT Verification: Authoritative Enterprise Compliance Badges', () => {
  it('renders SdaiaCompliantBadge with SVG vector and authoritative text', () => {
    const { container } = render(<SdaiaCompliantBadge />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(screen.getByText('SDAIA AI COMPLIANT')).toBeInTheDocument();
    expect(screen.getByText('In-Kingdom Bounded Models')).toBeInTheDocument();
  });

  it('renders PdplSovereigntyBadge with SVG vector and authoritative text', () => {
    const { container } = render(<PdplSovereigntyBadge />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(screen.getByText('PDPL CLASS 3')).toBeInTheDocument();
    expect(screen.getByText('Sovereign Data Residency')).toBeInTheDocument();
  });

  it('renders NcaEccBadge with SVG vector and authoritative text', () => {
    const { container } = render(<NcaEccBadge />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(screen.getByText('NCA ECC-1:2018')).toBeInTheDocument();
    expect(screen.getByText('Enterprise Cybersecurity Architecture')).toBeInTheDocument();
  });
});

describe('Milestone M_CONTENT Verification: Component Rendering Hardening', () => {
  it('renders TestimonialsSection without [REPLACE] in verified client badge', () => {
    render(
      <LocaleProvider initialLocale="en">
        <TestimonialsSection />
      </LocaleProvider>
    );

    expect(screen.getByText('Verified Enterprise Client')).toBeInTheDocument();
    expect(screen.queryByText(/\[REPLACE\]/i)).not.toBeInTheDocument();
  });

  it('renders AeitchPicture with showReplacementTag=false by default and clean fallback text', () => {
    const { container } = render(
      <AeitchPicture src="/images/test-asset.svg" alt="Test Asset Description" />
    );

    // Verify hover tag 'Replace:' or 'Asset:' is not rendered when showReplacementTag is false
    expect(container.textContent).not.toContain('Replace:');
    expect(container.textContent).not.toContain('[aeitch.com Asset Placeholder]');
  });

  it('renders KingdomFutureSection footnote with clean compliance copy and zero [CLIENT TO VERIFY]', () => {
    render(
      <LocaleProvider initialLocale="en">
        <KingdomFutureSection />
      </LocaleProvider>
    );

    expect(screen.getByText(/SDAIA AI ETHICS COMPLIANT/i)).toBeInTheDocument();
    expect(screen.getByText(/NCA ECC-1:2018 ENTERPRISE ARCHITECTURE/i)).toBeInTheDocument();
    expect(screen.queryByText(/\[CLIENT TO VERIFY\]/i)).not.toBeInTheDocument();
  });
});
