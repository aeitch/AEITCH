import React from 'react';
import { Metadata } from 'next';
import { CloudDevopsDetailView } from '@/components/services/CloudDevopsDetailView';

export const metadata: Metadata = {
  title: 'DevOps & Cloud Engineering for Enterprises | CI/CD, IaC, Cloud Migration | إيتش',
  description:
    'Ship faster. Cut downtime. Control your cloud bill. We design, implement and run reliable, secure cloud infrastructure and automated delivery pipelines aligned with Saudi NCA CCC controls.',
  openGraph: {
    title: 'DevOps & Cloud Engineering for Enterprises | CI/CD, IaC, Cloud Migration | AEITCH',
    description:
      'We design, implement and run reliable, secure cloud infrastructure and automated delivery pipelines, so your updates reach users quickly and safely.',
    url: 'https://aeitch.com/services/cloud-devops',
    siteName: 'AEITCH',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aeitch.com/services/cloud-devops',
  },
};

export default function CloudDevopsPage() {
  return <CloudDevopsDetailView />;
}
