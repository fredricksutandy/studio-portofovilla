import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'], // Add the Sanity image CDN domain here
  },
};

export default nextConfig;
