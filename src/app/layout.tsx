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
  title: 'إيتش | الذكاء الاصطناعي وتطوير المنتجات وDevOps والبرمجيات المخصصة',
  description:
    'شريك هندسي للمؤسسات والشركات الناشئة: أتمتة بالذكاء الاصطناعي، تطوير المنتجات، DevOps وهندسة السحابة، وبرمجيات مخصصة، بما يدعم رؤية السعودية 2030.',
  metadataBase: new URL('https://aeitch.com'),
  keywords: [
    'الذكاء الاصطناعي والأتمتة',
    'تطوير المنتجات',
    'DevOps وهندسة السحابة',
    'تطوير البرمجيات المخصصة',
    'رؤية 2030',
    'AI Automation & Integration',
    'Product Development',
    'DevOps & Cloud Engineering',
    'Custom Software Development',
    'Saudi Vision 2030',
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
    title: 'إيتش | الذكاء الاصطناعي وتطوير المنتجات وDevOps والبرمجيات المخصصة',
    description:
      'شريك هندسي للمؤسسات والشركات الناشئة: أتمتة بالذكاء الاصطناعي، تطوير المنتجات، DevOps وهندسة السحابة، وبرمجيات مخصصة، بما يدعم رؤية السعودية 2030.',
    siteName: BRAND.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AEITCH | AI Automation, Product Development, DevOps & Custom Software',
    description:
      'An engineering partner for enterprises and startups: AI automation, product development, DevOps and cloud engineering, and custom software, in support of Saudi Vision 2030.',
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
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
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
