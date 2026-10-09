import React from 'react';
import { Metadata } from 'next';
import { OurProductsDetailView } from '@/components/products/OurProductsDetailView';

export const metadata: Metadata = {
  title: 'Our Products | Digital Products We Built & Launched | AEITCH',
  description:
    'Products we built and launched. The best proof of what we can do is real products in the market, including ParkKaro and Paylink.',
  alternates: {
    canonical: 'https://aeitch.com/our-products',
  },
};

export default function OurMvpShowcasePage() {
  return <OurProductsDetailView />;
}
