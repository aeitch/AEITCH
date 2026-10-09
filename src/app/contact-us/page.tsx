import React from 'react';
import { Metadata } from 'next';
import { ContactUsDetailView } from '@/components/contact/ContactUsDetailView';

export const metadata: Metadata = {
  title: 'Contact AEITCH | Book a Free Technical Consultation | تواصل مع إيتش',
  description:
    'Let’s engineer what’s next. Whether you are launching a product, optimizing cloud infrastructure, or exploring AI automation, book a consultation with our senior engineering team.',
  openGraph: {
    title: 'Contact AEITCH | Book a Free Technical Consultation',
    description:
      'Whether you are launching a product, improving your cloud infrastructure, or exploring AI automation, our team is ready to collaborate.',
    url: 'https://aeitch.com/contact-us',
    siteName: 'AEITCH',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aeitch.com/contact-us',
  },
};

export default function ContactUsPage() {
  return <ContactUsDetailView />;
}
