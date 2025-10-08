import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: '/dashboard/marketplace',
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [{ protocol: 'https', hostname: 'placehold.co', pathname: '/**' }],
  },
  
};

export default nextConfig;