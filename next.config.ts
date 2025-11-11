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
  transpilePackages: ["@emotion/react", "@emotion/styled"],
};

export default nextConfig;
