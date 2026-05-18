import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // @ts-ignore - Turbopack root config for multi-lockfile environments
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/services/lightbox',
        destination: '/services/lightboxes',
        permanent: true,
      },
      {
        source: '/services/flex-neon',
        destination: '/services/neon',
        permanent: true,
      },
      {
        source: '/services/pylon-signs',
        destination: '/services/wayfinding',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
