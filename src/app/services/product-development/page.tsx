import React from 'react';
import { Metadata } from 'next';
import { ProductDevelopmentDetailView } from '@/components/services/ProductDevelopmentDetailView';

export const metadata: Metadata = {
  title: 'Digital Product Development | Idea to MVP and SaaS Platforms | تطوير المنتجات الرقمية',
  description:
    'From idea to a real product in users’ hands. We plan, design, build and evolve secure, scalable digital products and investor-grade MVPs for startups and enterprises.',
  openGraph: {
    title: 'Digital Product Development | Idea to MVP and SaaS Platforms | AEITCH',
    description:
      'From idea to a real product in users’ hands. We plan, design, build and evolve secure, scalable digital products, so they become a long-term asset for your business.',
    url: 'https://aeitch.com/services/product-development',
    siteName: 'AEITCH',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aeitch.com/services/product-development',
  },
};

export default function ProductDevelopmentPage() {
  return <ProductDevelopmentDetailView />;
}
