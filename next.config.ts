import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // React Compiler 활성화 (자동 메모이제이션)
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
