import React from 'react';
import { Metadata } from 'next';
import { LifeAtAeitchView } from '@/components/life/LifeAtAeitchView';

export const metadata: Metadata = {
  title: 'الحياة في إيتش | ثقافة العمل، مهندسو النخبة، والرحلات الاستكشافية | Life at AEITCH',
  description:
    'استكشف كواليس العمل الهندسي في إيتش: مبادئنا التشغيلية الخمسة، العقول الهندسية، رحلات الاستكشاف الجبلية السنوية، واحتفالات محطات الإنجاز.',
  alternates: {
    canonical: 'https://aeitch.com/about-us/life-at-aeitch',
    languages: {
      'ar-SA': 'https://aeitch.com/about-us/life-at-aeitch',
      'en-US': 'https://aeitch.com/about-us/life-at-aeitch?lang=en',
      'x-default': 'https://aeitch.com/about-us/life-at-aeitch',
    },
  },
  openGraph: {
    title: 'الحياة في إيتش | ثقافة العمل، مهندسو النخبة، والرحلات الاستكشافية',
    description:
      'كواليس بناء الأنظمة السيادية في إيتش: مبادئ الثقافة، ملفات المهندسين، رحلات الجبال والمخيمات، وأيام الاحتفال بالإنجاز.',
    url: 'https://aeitch.com/about-us/life-at-aeitch',
    siteName: 'AEITCH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Life at AEITCH | Engineering Culture & Expeditions',
    description:
      'Zero ego, extreme ownership, sovereign systems craft. Inside the team, trips, and daily rhythm at AEITCH.',
  },
};

export default function LifeAtAeitchPage() {
  return <LifeAtAeitchView />;
}
