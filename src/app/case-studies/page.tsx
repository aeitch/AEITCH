import React from 'react';
import { Metadata } from 'next';
import { CaseStudiesIndexView } from '@/components/case-studies/CaseStudiesIndexView';

export const metadata: Metadata = {
  title: 'Case Studies | AEITCH Work in AI, Product, Cloud & Software | دراسات الحالة',
  description:
    'Proven engineering. Documented results. Explore real case studies in AI Automation, Product Development, DevOps & Cloud Engineering, and Custom Software.',
  openGraph: {
    title: 'Case Studies | AEITCH Work in AI, Product, Cloud and Software',
    description:
      'Real engineering projects delivered over weeks and months, sorted across our four core disciplines.',
    url: 'https://aeitch.com/case-studies',
    siteName: 'AEITCH',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aeitch.com/case-studies',
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesIndexView />;
}
