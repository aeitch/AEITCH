import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { CANONICAL_CASE_STUDIES, CaseStudyData } from '@/lib/case-studies-data';
import { CaseStudyDetailView } from '@/components/case-studies/CaseStudyDetailView';

interface CaseStudyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CANONICAL_CASE_STUDIES.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const canonical = CANONICAL_CASE_STUDIES.find((c) => c.slug === slug);
  if (canonical) {
    return {
      title: `${canonical.titleEn} | Case Study | AEITCH`,
      description: canonical.approachEn,
      openGraph: {
        title: `${canonical.titleEn} | AEITCH Case Study`,
        description: canonical.outcomeEn,
        url: `https://aeitch.com/case-studies/${slug}`,
        siteName: 'AEITCH',
        type: 'article',
      },
      alternates: {
        canonical: `https://aeitch.com/case-studies/${slug}`,
      },
    };
  }

  // Fallback to database if existing
  try {
    const dbItem = await prisma.caseStudy.findUnique({ where: { slug } });
    if (dbItem) {
      return {
        title: `${dbItem.title} | Case Study | AEITCH`,
        description: dbItem.summary,
      };
    }
  } catch {
    // Database fallback catch
  }

  return { title: 'Case Study Not Found | AEITCH' };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const { slug } = await params;

  // 1. Look up from canonical dataset first
  const canonical = CANONICAL_CASE_STUDIES.find((c) => c.slug === slug);
  if (canonical) {
    return <CaseStudyDetailView study={canonical} />;
  }

  // 2. Database lookup fallback
  try {
    const dbItem = await prisma.caseStudy.findUnique({ where: { slug } });
    if (dbItem && dbItem.isActive) {
      const fallbackStudy: CaseStudyData = {
        id: dbItem.id,
        slug: dbItem.slug,
        serviceCategory: 'custom-software',
        serviceNameAr: 'البرمجيات المخصصة',
        serviceNameEn: 'Custom Software Development',
        clientName: dbItem.clientName,
        clientIndustryAr: dbItem.clientIndustry,
        clientIndustryEn: dbItem.clientIndustry,
        durationAr: '8 أسابيع',
        durationEn: '8 weeks',
        titleAr: dbItem.title,
        titleEn: dbItem.title,
        challengeAr: dbItem.challenge,
        challengeEn: dbItem.challenge,
        approachAr: dbItem.solution,
        approachEn: dbItem.solution,
        outcomeAr: dbItem.summary,
        outcomeEn: dbItem.summary,
        techStack: typeof dbItem.techStack === 'string' ? JSON.parse(dbItem.techStack) : (dbItem.techStack as unknown as string[]) || [],
        websiteUrl: dbItem.liveUrl || undefined,
      };
      return <CaseStudyDetailView study={fallbackStudy} />;
    }
  } catch {
    // Fallback catch
  }

  notFound();
}
