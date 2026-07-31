import type { NextConfig } from "next";

const localBackendUrl = process.env.BACKEND_INTERNAL_URL;

const nextConfig: NextConfig = {
  async rewrites() {
    if (process.env.NODE_ENV !== "development" && !localBackendUrl) {
      return [];
    }

    return [
      {
        source: "/api/backend/:path*",
        destination: `${localBackendUrl || "http://127.0.0.1:8000"}/:path*`,
      },
    ];
  },
};

export default nextConfig;
