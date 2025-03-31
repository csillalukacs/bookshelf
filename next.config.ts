import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
        port: '',
        pathname: '/b/isbn/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'd2ny5gwn5yvzj8.cloudfront.net',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
        search: ''
      }
    ],
  },
};

export default nextConfig;
