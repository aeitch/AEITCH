import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getInsightBySlug, getAllInsightSlugs } from '@/lib/insights-data';
import { InsightDetailView } from '@/components/insights/InsightDetailView';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllInsightSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    return {
      title: 'المقال غير موجود | AEITCH',
    };
  }

  return {
    title: `${article.title.ar} | ${article.title.en} | AEITCH`,
    description: article.excerpt.ar,
    alternates: {
      canonical: `https://aeitch.com/insights/${article.slug}`,
    },
    openGraph: {
      title: article.title.ar,
      description: article.excerpt.ar,
      url: `https://aeitch.com/insights/${article.slug}`,
      type: 'article',
    },
  };
}

export default async function InsightSlugPage({ params }: Props) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    notFound();
  }

  return <InsightDetailView article={article} />;
}
