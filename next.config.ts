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
    ];
  },
};

export default nextConfig;
