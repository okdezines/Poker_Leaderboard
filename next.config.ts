import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
};
module.exports = {
  images: {
    remotePatterns: [
      {
        
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        pathname: '/photo/**',
      }
      ],
  },
}

export default nextConfig;
