import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./styles'],
    additionalData: `@use 'abstracts' as *; @use 'core/utilities' as *;`, 
  }

};

export default nextConfig;
