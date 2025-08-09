import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
}
// ✅ New way (next.config.js)
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
};


// next.config.js




export default nextConfig;
