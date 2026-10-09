import React from 'react';
import { Metadata } from 'next';
import { ServicesHubView } from '@/components/services/ServicesHubView';

export const metadata: Metadata = {
  title: 'AEITCH Services | AI, Product Development, DevOps & Cloud, Custom Software | خدمات إيتش',
  description:
    'We focus on what we do best: AI Automation & Integration, Product Development, DevOps & Cloud Engineering, and Custom Software Development. Built for Saudi enterprise digital transformation.',
  openGraph: {
    title: 'AEITCH Services | AI, Product Development, DevOps & Cloud, Custom Software',
    description:
      'We focus on what we do best: AI Automation & Integration, Product Development, DevOps & Cloud Engineering, and Custom Software Development.',
    url: 'https://aeitch.com/services',
    siteName: 'AEITCH',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aeitch.com/services',
  },
};

export default function ServicesPage() {
  return <ServicesHubView />;
}
