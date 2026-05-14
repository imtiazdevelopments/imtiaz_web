import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    dangerouslyAllowSVG:true,
    unoptimized:true,
    domains: ["globalsurf.digital"] // Add Dropbox domain here
  },
};

export default nextConfig;
