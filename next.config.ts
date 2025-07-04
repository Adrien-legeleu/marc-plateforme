import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['b3av5hide4nu2hap.public.blob.vercel-storage.com'],
  },
  eslint: {
    ignoreDuringBuilds: true, // Désactive ESLint pendant le build
  },
};

export default nextConfig;
