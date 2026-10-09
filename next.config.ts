import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/blogs',
        destination: '/insights',
        permanent: true,
      },
      {
        source: '/blogs/:path*',
        destination: '/insights/:path*',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/insights/:path*',
        permanent: true,
      },
      {
        source: '/category/:path*',
        destination: '/insights',
        permanent: true,
      },
      {
        source: '/tag/:path*',
        destination: '/insights',
        permanent: true,
      },
      {
        source: '/services/across-usa-:slug',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/services/ai-consulting',
        destination: '/services/ai-automation',
        permanent: true,
      },
      {
        source: '/services/cloud-first-product-engineering',
        destination: '/services/product-development',
        permanent: true,
      },
      {
        source: '/services/new-product-development',
        destination: '/services/product-development',
        permanent: true,
      },
      {
        source: '/services/platform-engineering-devops',
        destination: '/services/cloud-devops',
        permanent: true,
      },
      {
        source: '/services/devsecops-ksa-compliance',
        destination: '/services/cloud-devops',
        permanent: true,
      },
      {
        source: '/services/dedicated-engineering-squads',
        destination: '/services/product-development',
        permanent: true,
      },
      {
        source: '/solutions',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/solutions/:path*',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/services/ai-automation-integration',
        destination: '/services/ai-automation',
        permanent: true,
      },
      {
        source: '/services/devops-cloud-engineering',
        destination: '/services/cloud-devops',
        permanent: true,
      },
      {
        source: '/services/custom-software-development',
        destination: '/services/custom-software',
        permanent: true,
      },
      {
        source: '/our-mvp-showcase',
        destination: '/our-products',
        permanent: true,
      },
      {
        source: '/saudi-hub',
        destination: '/vision-2030',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
