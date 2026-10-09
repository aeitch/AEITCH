import React from 'react';
import { Metadata } from 'next';
import { OurProductsDetailView } from '@/components/products/OurProductsDetailView';

export const metadata: Metadata = {
  title: 'Our Products | Digital Products We Built & Launched | منتجاتنا',
  description:
    'Products we built and launched. The best proof of what we can do is real products in the market, including ParkKaro and Paylink.',
  openGraph: {
    title: 'Our Products | Digital Products We Built and Launched | AEITCH',
    description:
      'The best proof of what we can do is real products in the market: ParkKaro (smart parking sharing) and Paylink (payment infrastructure).',
    url: 'https://aeitch.com/our-products',
    siteName: 'AEITCH',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aeitch.com/our-products',
  },
};

export default function OurProductsPage() {
  return <OurProductsDetailView />;
}
