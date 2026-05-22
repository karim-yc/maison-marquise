import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Strict mode React activé pour détecter les effets de bord
  reactStrictMode: true,

  images: {
    // Formats modernes prioritaires
    formats: ["image/avif", "image/webp"],
    // Densités pour les écrans haute résolution
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // En-têtes de sécurité & performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "X-Frame-Options",           value: "DENY" },
          { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // Cache long terme pour les assets statiques
        source: "/assets/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
