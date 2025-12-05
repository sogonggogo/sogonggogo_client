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
        source: "/staff",
        destination: "https://sogonggogo-staff.vercel.app/staff",
      },
      {
        source: "/staff/:path*",
        destination: "https://sogonggogo-staff.vercel.app/staff/:path*",
      },
    ];
  },
};

export default nextConfig;
