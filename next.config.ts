import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dwyd4f7lz/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/resurfacing",
        destination: "/blog/court-resurfacing",
        permanent: true,
      },
      {
        source: "/pickleball",
        destination: "/blog/pickleball-court-installation",
        permanent: true,
      },
      {
        source: "/austin",
        destination: "/blog/austin-court-surfacing",
        permanent: true,
      },
      {
        source: "/san-antonio",
        destination: "/blog/san-antonio-court-surfacing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
