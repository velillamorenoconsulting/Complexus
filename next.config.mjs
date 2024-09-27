import withVideos from "next-videos";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverComponentsExternalPackages: ["typeorm"],
  },
};

export default {
  ...nextConfig,
  ...withVideos(),
};
