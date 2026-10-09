import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aeitch.com';
  const currentDate = new Date();

  const routes = [
    '',
    '/services',
    '/services/ai-automation',
    '/services/product-development',
    '/services/cloud-devops',
    '/services/custom-software',
    '/delivery-engine',
    '/delivery-engine/security-ip-protection',
    '/vision-2030',
    '/our-products',
    '/case-studies',
    '/insights',
    '/insights/ai-agents-saudi-enterprise',
    '/insights/pdpl-compliant-cloud-architecture',
    '/insights/mvp-velocity-gcc-startups',
    '/about-us',
    '/about-us/life-at-aeitch',
    '/contact-us',
    '/privacy-policy',
    '/terms-of-service',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority:
      route === ''
        ? 1.0
        : route.startsWith('/solutions') ||
          route.startsWith('/services') ||
          route === '/delivery-engine' ||
          route === '/saudi-hub'
        ? 0.9
        : 0.8,
    alternates: {
      languages: {
        'ar-SA': `${baseUrl}${route}`,
        'en-US': `${baseUrl}${route}?lang=en`,
      },
    },
  }));
}
