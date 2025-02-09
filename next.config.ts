import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ["./styles"],
    additionalData: `@use 'abstracts' as *; @use 'core/utilities' as *; @use 'sass:map';`,
  },
  images: {
    remotePatterns: [
      {
        hostname: "image.tmdb.org",
      },
    ],
  },
};

export default nextConfig;
