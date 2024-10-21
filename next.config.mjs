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
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default {
  ...nextConfig,
  ...withVideos(),
};
