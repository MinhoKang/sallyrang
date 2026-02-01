import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // React Compiler 활성화 (자동 메모이제이션)
  reactCompiler: true,

  // 이미지 최적화 설정
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Notion 이미지 (S3)
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
