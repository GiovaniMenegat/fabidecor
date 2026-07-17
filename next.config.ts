import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // WebP is next/image's default; AVIF is opt-in and compresses further
    // for browsers that support it (see AGENTS.md "SEO").
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
