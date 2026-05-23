import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat, Parisienne } from "next/font/google";
import { Navbar }    from "@/components/layout/Navbar";
import { MotionProvider } from "@/components/layout/MotionProvider";
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
    images: [{ url: "/assets/LOGO_1.svg", width: 1200, height: 630, alt: "Maison Marquise" }],
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

        </MotionProvider>
      </body>
    </html>
  );
}
