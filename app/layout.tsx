import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat, Parisienne } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-parisienne",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Maison Marquise — Brandbook Digital",
    template: "%s | Maison Marquise",
  },
  description: "Charte graphique digitale interactive de Maison Marquise. Pâtisserie fine, généreuse et accessible.",
  authors: [{ name: "Maison Marquise" }],
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Maison Marquise — Brandbook Digital",
    description: "Bien plus qu'une boulangerie. Identité visuelle officielle.",
    siteName: "Maison Marquise",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAFAF8",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${montserrat.variable} ${parisienne.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
