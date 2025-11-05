import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["avatar.vercel.sh", "res.cloudinary.com"],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home',
      },
      // {
      //   source: '/auth/profile-completion',
      //   destination: '/auth/profile-completion/parents',
      // },
    ]
  },
};

export default nextConfig;
