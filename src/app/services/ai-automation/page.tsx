import React from 'react';
import { Metadata } from 'next';
import { AiAutomationDetailView } from '@/components/services/AiAutomationDetailView';

export const metadata: Metadata = {
  title: 'AI Automation & Integration for Enterprises | AI Agents & System Integration | إيتش',
  description:
    'AI that works inside your business, not next to it. We design and build automation, AI agents and predictive analytics, connected to your existing systems under Saudi PDPL regulations.',
  openGraph: {
    title: 'AI Automation & Integration for Enterprises | AI Agents & System Integration | AEITCH',
    description:
      'We design and build automation, AI agents and predictive analytics, and connect them to your existing systems and data, so the impact shows up in time, cost and decision quality.',
    url: 'https://aeitch.com/services/ai-automation',
    siteName: 'AEITCH',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aeitch.com/services/ai-automation',
  },
};

export default function AiAutomationPage() {
  return <AiAutomationDetailView />;
}
