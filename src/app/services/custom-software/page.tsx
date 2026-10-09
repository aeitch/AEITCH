import React from 'react';
import { Metadata } from 'next';
import { CustomSoftwareDetailView } from '@/components/services/CustomSoftwareDetailView';

export const metadata: Metadata = {
  title: 'Custom Software Development for Enterprises | Enterprise Apps & Integration | إيتش',
  description:
    'Software built around your business, not the other way around. We engineer secure, scalable enterprise applications, API integrations, and legacy modernization.',
  openGraph: {
    title: 'Custom Software Development for Enterprises | Enterprise Apps, Integration, Legacy Modernization | AEITCH',
    description:
      'We engineer secure, scalable enterprise applications that streamline operations, strengthen customer engagement and speed up innovation.',
    url: 'https://aeitch.com/services/custom-software',
    siteName: 'AEITCH',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aeitch.com/services/custom-software',
  },
};

export default function CustomSoftwarePage() {
  return <CustomSoftwareDetailView />;
}
