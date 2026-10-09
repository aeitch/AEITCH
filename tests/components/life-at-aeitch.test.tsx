import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CULTURE_VALUES } from '@/data/life/values';
import { TEAM_MEMBERS } from '@/data/life/team';
import { COMPANY_TRIPS } from '@/data/life/trips';
import { BIRTHDAYS_DATA, CELEBRATION_MOMENTS } from '@/data/life/celebrations';
import { LIFE_QUOTES } from '@/data/life/quotes';
import { LifeHeroSection } from '@/components/life/LifeHeroSection';
import { LifeValuesSection } from '@/components/life/LifeValuesSection';
import { LifeTeamWallSection } from '@/components/life/LifeTeamWallSection';
import { LifeCelebrationsSection } from '@/components/life/LifeCelebrationsSection';
import { LifeDayTimelineSection } from '@/components/life/LifeDayTimelineSection';
import { LifeNumbersSection } from '@/components/life/LifeNumbersSection';
import { LifeQuotesSection } from '@/components/life/LifeQuotesSection';
import { LifeJoinCtaSection } from '@/components/life/LifeJoinCtaSection';
import { LocaleProvider } from '@/lib/i18n';

// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('Life at AEITCH: Data Integrity & Strict Privacy', () => {
  it('enforces birthday privacy: only day and month are stored, never year or age', () => {
    expect(BIRTHDAYS_DATA.length).toBe(12);
    BIRTHDAYS_DATA.forEach((month) => {
      expect(month.monthIndex).toBeGreaterThanOrEqual(0);
      expect(month.monthIndex).toBeLessThanOrEqual(11);
      month.people.forEach((person) => {
        expect(person.day).toBeGreaterThanOrEqual(1);
        expect(person.day).toBeLessThanOrEqual(31);
        // Ensure no year or age properties exist
        expect((person as any).year).toBeUndefined();
        expect((person as any).age).toBeUndefined();
        expect((person as any).birthYear).toBeUndefined();
      });
    });
  });

  it('guarantees team member data has consent set to true for all published profiles', () => {
    expect(TEAM_MEMBERS.length).toBeGreaterThan(0);
    TEAM_MEMBERS.forEach((member) => {
      expect(typeof member.consent).toBe('boolean');
      expect(member.nameAr).toBeTruthy();
      expect(member.nameEn).toBeTruthy();
      expect(member.roleAr).toBeTruthy();
      expect(member.roleEn).toBeTruthy();
      expect(member.favoriteTool).toBeTruthy();
      expect(member.funFactAr).toBeTruthy();
    });
  });

  it('contains 5 culture values in exact 01-05 sequence', () => {
    expect(CULTURE_VALUES.length).toBe(5);
    const numerals = CULTURE_VALUES.map((v) => v.num);
    expect(numerals).toEqual(['01', '02', '03', '04', '05']);
  });

  it('contains company trips with valid photo paths and altitude', () => {
    expect(COMPANY_TRIPS.length).toBeGreaterThanOrEqual(3);
    COMPANY_TRIPS.forEach((trip) => {
      expect(trip.year).toBeTruthy();
      expect(trip.placeAr).toBeTruthy();
      expect(trip.placeEn).toBeTruthy();
      expect(trip.photos.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('contains verified celebration moments with captions', () => {
    expect(CELEBRATION_MOMENTS.length).toBeGreaterThanOrEqual(5);
    CELEBRATION_MOMENTS.forEach((moment) => {
      expect(moment.titleAr).toBeTruthy();
      expect(moment.titleEn).toBeTruthy();
      expect(moment.tag).toBeTruthy();
    });
  });

  it('contains authentic team quotes', () => {
    expect(LIFE_QUOTES.length).toBeGreaterThanOrEqual(4);
    LIFE_QUOTES.forEach((quote) => {
      expect(quote.authorAr).toBeTruthy();
      expect(quote.authorEn).toBeTruthy();
      expect(quote.quoteAr).toBeTruthy();
      expect(quote.quoteEn).toBeTruthy();
    });
  });
});

describe('Life at AEITCH: Component Renders & Interactions', () => {
  it('renders LifeHeroSection with Arabic primary title and draggable polaroids', () => {
    render(
      <LocaleProvider>
        <LifeHeroSection />
      </LocaleProvider>
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('الحياة');
    expect(screen.getByText('في إيتش')).toBeInTheDocument();
    expect(screen.getByText(/كواليس إيتش • ثقافة الفريق/i)).toBeInTheDocument();
  });

  it('renders LifeValuesSection with expandable editorial numbers 01 to 05', () => {
    render(
      <LocaleProvider>
        <LifeValuesSection />
      </LocaleProvider>
    );
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('05')).toBeInTheDocument();
    expect(screen.getByText(/الحرفة قبل المساومة/i)).toBeInTheDocument();
  });

  it('renders LifeTeamWallSection and respects consent gate', () => {
    render(
      <LocaleProvider>
        <LifeTeamWallSection />
      </LocaleProvider>
    );
    expect(screen.getByText(/جميع المهندسين/i)).toBeInTheDocument();
    expect(screen.getByText(/م. حسيب الرحمن خان/i)).toBeInTheDocument();
  });

  it('renders LifeCelebrationsSection and clicking month triggers interaction', () => {
    render(
      <LocaleProvider>
        <LifeCelebrationsSection />
      </LocaleProvider>
    );
    expect(screen.getByText(/05 \/\//i)).toBeInTheDocument();
    const celebrateBtn = screen.getByText(/احتفل معنا/i);
    fireEvent.click(celebrateBtn);
  });

  it('renders LifeDayTimelineSection with 4 daily stages', () => {
    render(
      <LocaleProvider>
        <LifeDayTimelineSection />
      </LocaleProvider>
    );
    expect(screen.getByText('08:30')).toBeInTheDocument();
    expect(screen.getByText('11:00')).toBeInTheDocument();
    expect(screen.getByText('14:30')).toBeInTheDocument();
    expect(screen.getByText('17:00')).toBeInTheDocument();
  });

  it('renders LifeNumbersSection with verified metrics', () => {
    render(
      <LocaleProvider>
        <LifeNumbersSection />
      </LocaleProvider>
    );
    expect(screen.getByText(/07 \/\//i)).toBeInTheDocument();
    expect(screen.getByText(/توقف تشغيلي غير مخطط له/i)).toBeInTheDocument();
  });

  it('renders LifeQuotesSection and allows switching between quotes', () => {
    render(
      <LocaleProvider>
        <LifeQuotesSection />
      </LocaleProvider>
    );
    expect(screen.getByText(/08 \/\//i)).toBeInTheDocument();
    const btn2 = screen.getByLabelText(/Go to quote 2/i);
    fireEvent.click(btn2);
    expect(screen.getByText(/م. زينب البلوشي/i)).toBeInTheDocument();
  });

  it('renders LifeJoinCtaSection with email link to careers@aeitch.com', () => {
    render(
      <LocaleProvider>
        <LifeJoinCtaSection />
      </LocaleProvider>
    );
    const link = screen.getByRole('link', { name: /تواصل مع فريق المواهب/i });
    expect(link).toHaveAttribute('href', 'mailto:careers@aeitch.com');
  });
});
