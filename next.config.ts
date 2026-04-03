import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/fta',
        destination: '/fta.html',
      },
    ];
  },
};

export default nextConfig;
