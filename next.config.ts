import type { NextConfig } from "next";
import path from "node:path";
const onVercel = process.env.VERCEL === "1";

const nextConfig: NextConfig = {
  ...(onVercel ? { turbopack: {
    resolveAlias: {
      "cloudflare:workers": "./lib/vercel-cloudflare-shim.ts",
    },
  }} : {}),
  webpack(config) {
    if (onVercel) config.resolve.alias["cloudflare:workers"] = path.resolve(process.cwd(), "lib/vercel-cloudflare-shim.ts");
    return config;
  },
};

export default nextConfig;
