import React from 'react';
import { Metadata } from 'next';
import { AboutUsDetailView } from '@/components/about/AboutUsDetailView';

export const metadata: Metadata = {
  title: 'About AEITCH | Product Engineering in AI, Cloud & Software | من نحن',
  description:
    'From vision to execution. AEITCH is a product-focused engineering company delivering AI Automation, Product Development, DevOps & Cloud, and Custom Software.',
  openGraph: {
    title: 'About | AEITCH: a product-focused engineering company in AI, cloud and software',
    description:
      'We work with startups and enterprises to turn bold ideas into high-performing digital products built to scale from day one.',
    url: 'https://aeitch.com/about-us',
    siteName: 'AEITCH',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aeitch.com/about-us',
  },
};

export default function AboutPage() {
  return <AboutUsDetailView />;
}
