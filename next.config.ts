import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  compiler: {
    emotion: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://uoscholar-server.store/sogong-api/api/:path*",
      },
    ];
  },
};

export default nextConfig;
