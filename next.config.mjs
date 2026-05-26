/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Sécurité
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "X-Frame-Options",           value: "DENY" },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
          // Confidentialité — interdit l'indexation et le cache des proxys
          { key: "X-Robots-Tag",              value: "noindex, nofollow, noarchive, nosnippet" },
          { key: "Cache-Control",             value: "no-store, no-cache, must-revalidate" },
        ],
      },
      {
        // Cache long terme pour les assets statiques (logos, polices, images)
        source: "/assets/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "X-Robots-Tag",  value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
