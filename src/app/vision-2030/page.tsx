import React from 'react';
import { Metadata } from 'next';
import { Vision2030DetailView } from '@/components/vision/Vision2030DetailView';

export const metadata: Metadata = {
  title: 'Saudi Vision 2030 & Digital Transformation | AI, Cloud, Products & Software | رؤية السعودية 2030',
  description:
    'Engineering the digital foundation for the Kingdom’s vision. How AEITCH’s 4 core services align with Saudi Vision 2030 priorities, SDAIA AI strategy, and NCA cybersecurity controls.',
  openGraph: {
    title: 'Saudi Vision 2030 and Digital Transformation | AEITCH',
    description:
      'Three themes (a vibrant society, a thriving economy, an ambitious nation) with technology as the shared engine. How our four services serve those priorities.',
    url: 'https://aeitch.com/vision-2030',
    siteName: 'AEITCH',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aeitch.com/vision-2030',
  },
};

export default function Vision2030Page() {
  return <Vision2030DetailView />;
}
