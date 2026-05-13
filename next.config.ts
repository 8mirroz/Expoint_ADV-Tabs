import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // @ts-ignore - Turbopack root config for multi-lockfile environments
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
