import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
}
  module.exports = {
    images: {
      domains: ['via.placeholder.com'],
      remotePatterns: [new URL('https://cdn.pixabay.com')],
    }
  }
// next.config.js




export default nextConfig;
