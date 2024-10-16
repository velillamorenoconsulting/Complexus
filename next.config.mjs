import withVideos from "next-videos";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverComponentsExternalPackages: ["typeorm"],
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*" }],
  },
};

export default {
  ...nextConfig,
  ...withVideos(),
};
