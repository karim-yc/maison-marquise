import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Montserrat,
  Parisienne,
} from "next/font/google";
import "@/styles/globals.css";

// ─── Fonts Google ────────────────────────────────────────────────────────────
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-montserrat",
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-parisienne",
});

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Maison Marquise — Charte Graphique",
    template: "%s | Maison Marquise",
  },
  description:
    "Charte graphique digitale de Maison Marquise. Identité visuelle, typographie, palette couleurs et composants UI.",
  keywords: ["Maison Marquise", "charte graphique", "identité visuelle", "brand design"],
  robots: { index: false, follow: false }, // Document interne
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF7F2",
};

// ─── Layout racine ───────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${montserrat.variable} ${parisienne.variable}`}
    >
      <body className="bg-ivory text-charbon font-montserrat antialiased">
        {children}
      </body>
    </html>
  );
}
