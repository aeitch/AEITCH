import type { Metadata, Viewport } from 'next';
import { Inter, IBM_Plex_Sans_Arabic } from 'next/font/google';
import './globals.css';
import { MainSiteChrome } from '@/components/layout/main-site-chrome';
import { LocaleProvider } from '@/lib/i18n';
import { BRAND } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'إيتش للحلول الرقمية | أنظمة الذكاء الاصطناعي والسحابة السيادية للمملكة',
  description:
    'شريك هندسة البرمجيات والذكاء الاصطناعي للمؤسسات والشركات الناشئة في المملكة العربية السعودية ودول الخليج. بنى سحابية آمنة، وكلاء ذكاء اصطناعي، وتطوير MVPs في 8 أسابيع.',
  metadataBase: new URL('https://aeitch.com'),
  keywords: [
    'التحول الرقمي السعودي',
    'الذكاء الاصطناعي في السعودية',
    'هندسة السحابة وحلول ديف أوبس',
    'تطوير البرمجيات المؤسسية الرياض',
    'تطوير النماذج الأولية MVPs جدة',
    'نظام حماية البيانات الشخصية PDPL',
    'Saudi Vision 2030 Digital Transformation',
    'Enterprise AI Agents GCC',
    'Sovereign Cloud Engineering',
  ],
  authors: [{ name: BRAND.name, url: 'https://aeitch.com' }],
  creator: BRAND.name,
  alternates: {
    canonical: 'https://aeitch.com',
    languages: {
      'ar-SA': 'https://aeitch.com',
      'en-US': 'https://aeitch.com/?lang=en',
      'x-default': 'https://aeitch.com',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: ['en_US'],
    url: 'https://aeitch.com',
    title: 'إيتش للحلول الرقمية | هندسة نظم الذكاء الاصطناعي والسحابة السيادية',
    description: BRAND.description,
    siteName: BRAND.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'إيتش (AEITCH) | الشريك الهندسي للتحول الرقمي بالمملكة',
    description: BRAND.description,
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: '/apple-icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema markup for Organization and Professional Service
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'AEITCH - إيتش للحلول الرقمية والهندسية',
    alternateName: 'AEITCH Digital Engineering',
    url: 'https://aeitch.com',
    logo: 'https://aeitch.com/logo.svg',
    description:
      'Premier software engineering consultancy delivering sovereign AI, cloud infrastructure, and rapid digital products across Saudi Arabia and the GCC.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'SA',
      addressLocality: 'Riyadh',
    },
    areaServed: ['SA', 'AE', 'QA', 'KW', 'BH', 'OM'],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: ['https://linkedin.com/company/aeitch'],
  };

  return (
    <html
      lang="ar"
      dir="rtl"
      translate="no"
      className={`dark notranslate ${inter.variable} ${ibmPlexArabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="google" content="notranslate" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="flex min-h-screen flex-col bg-bg text-fg antialiased selection:bg-accent selection:text-black notranslate relative"
        suppressHydrationWarning
      >
        <div className="noise-overlay" aria-hidden="true" />
        <LocaleProvider>
          <MainSiteChrome>{children}</MainSiteChrome>
        </LocaleProvider>
      </body>
    </html>
  );
}
