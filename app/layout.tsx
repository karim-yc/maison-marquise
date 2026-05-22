import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat, Parisienne } from "next/font/google";
import { Navbar }    from "@/components/layout/Navbar";
import { Footer }    from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import "./globals.css";

// ── Google Fonts ───────────────────────────────────────────────────────────────
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight:  ["300", "400", "500", "600"],
  style:   ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight:  ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight:  ["400"],
  variable: "--font-parisienne",
  display: "swap",
});

// ── Métadonnées ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default:  "Maison Marquise — Brandbook Digital",
    template: "%s | Maison Marquise",
  },
  description:
    "Charte graphique digitale interactive de Maison Marquise. " +
    "Bien plus qu'une boulangerie — pâtisserie fine, généreuse et accessible.",
  authors:  [{ name: "Maison Marquise" }],
  robots:   { index: false, follow: false },
  openGraph: {
    type:        "website",
    locale:      "fr_FR",
    title:       "Maison Marquise — Brandbook Digital",
    description: "Identité visuelle officielle. Bien plus qu'une boulangerie.",
    siteName:    "Maison Marquise",
  },
};

export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  themeColor:   "#FAFAF8",
};

// ── Root Layout ────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={[
        cormorant.variable,
        montserrat.variable,
        parisienne.variable,
      ].join(" ")}
    >
      <body className="antialiased bg-blanc-marbre text-noir-marquise">

        {/* Navigation sticky */}
        <Navbar />

        {/* Contenu principal — décalé de la hauteur navbar */}
        <main
          id="main-content"
          className="pt-16 md:pt-[72px]"
          role="main"
          aria-label="Contenu du brandbook Maison Marquise"
        >
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Bouton retour en haut */}
        <BackToTop />

      </body>
    </html>
  );
}
