import { Metadata } from 'next';
import { InsightsIndexView } from '@/components/insights/InsightsIndexView';

export const metadata: Metadata = {
  title: 'المدونة الهندسية | رؤى في الذكاء الاصطناعي والسحابة وتطوير المنتجات | AEITCH',
  description:
    'أوراق تقنية وتجارب تطبيقية في الذكاء الاصطناعي وهندسة السحابة وتطوير المنتجات للمؤسسات في المملكة العربية السعودية والخليج.',
  alternates: {
    canonical: 'https://aeitch.com/insights',
  },
  openGraph: {
    title: 'المدونة الهندسية | رؤى من واقع التنفيذ | AEITCH',
    description:
      'أوراق تقنية وتجارب تطبيقية في الذكاء الاصطناعي وهندسة السحابة وتطوير المنتجات للمؤسسات في المملكة العربية السعودية والخليج.',
    url: 'https://aeitch.com/insights',
  },
};

export default function InsightsPage() {
  return <InsightsIndexView />;
}
