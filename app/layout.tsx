import type { Metadata, Viewport } from "next";
import { Navbar }         from "@/components/layout/Navbar";
import { Footer }         from "@/components/layout/Footer";
import { BackToTop }      from "@/components/layout/BackToTop";
import { MotionProvider } from "@/components/layout/MotionProvider";
import "./globals.css";

// ── Métadonnées SEO ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default:  "Maison Marquise — Brandbook Digital",
    template: "%s | Maison Marquise",
  },
  description:
    "Charte graphique digitale interactive de Maison Marquise. " +
    "Pâtisserie fine, généreuse et accessible. " +
    "Identité visuelle, typographie, couleurs, packaging et direction artistique.",
  keywords: [
    "Maison Marquise",
    "charte graphique",
    "brandbook",
    "identité visuelle",
    "pâtisserie",
    "boulangerie premium",
  ],
  authors:  [{ name: "Maison Marquise" }],
  creator:  "Maison Marquise",
  robots:   { index: false, follow: false },
  openGraph: {
    type:        "website",
    locale:      "fr_FR",
    title:       "Maison Marquise — Brandbook Digital",
    description: "Bien plus qu'une boulangerie. Identité visuelle officielle.",
    siteName:    "Maison Marquise",
    images: [{
      url:    "/assets/LOGO_1.svg",
      width:  1200,
      height: 630,
      alt:    "Maison Marquise — logo officiel",
    }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Maison Marquise — Brandbook Digital",
    description: "Bien plus qu'une boulangerie.",
  },
  icons: {
    icon:  "/assets/FAVICON.svg",
    apple: "/assets/FAVICON.svg",
  },
};

export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  themeColor:   "#FAFAF8",
};

// ── Root Layout ────────────────────────────────────────────────────────────────
// Les polices sont chargées via @fontsource dans globals.css :
// - Cormorant Garamond → var(--font-cormorant)
// - Montserrat         → var(--font-montserrat)
// - Parisienne         → var(--font-parisienne)
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="antialiased bg-blanc-marbre text-noir-marquise">
        <MotionProvider>

          {/* Lien d'évitement — accessibilité clavier */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-noir-marquise focus:text-ivoire-maison focus:text-sm focus:font-sans focus:font-medium focus:tracking-wide focus:rounded-[2px] focus:outline-none focus:ring-2 focus:ring-or-champagne"
          >
            Aller au contenu principal
          </a>

          {/* Navigation sticky */}
          <Navbar />

          {/* Contenu principal */}
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

        </MotionProvider>
      </body>
    </html>
  );
}
