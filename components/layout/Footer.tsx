import { LogoFull } from "@/components/brand/LogoSvg";
// ─────────────────────────────────────────────────────────────────────────────
// Footer — Server component sobre.
// Composition : filet or · logo script · baseline · copyright
// ─────────────────────────────────────────────────────────────────────────────

import { BRAND } from "./nav-config";

export function Footer() {
  return (
    <footer
      className="relative bg-noir-marquise text-ivoire-maison"
      role="contentinfo"
      aria-label="Pied de page Maison Marquise"
    >
      {/* Filet or en haut */}
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent, #B99A5F 30%, #B99A5F 70%, transparent)" }}
        aria-hidden="true"
      />

      <div className="container-mm py-12 md:py-16">

        {/* Colonne centrale */}
        <div className="flex flex-col items-center text-center gap-5">

          {/* Logo officiel */}
          <div className="w-48 md:w-56 mx-auto text-ivoire-maison/85">
            <LogoFull aria-label="Maison Marquise" />
          </div>

          {/* Filet court */}
          <div
            className="w-16 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #B99A5F, transparent)" }}
            aria-hidden="true"
          />

          {/* Baseline officielle */}
          <p className="font-sans text-[0.6rem] font-medium tracking-[0.35em] uppercase text-or-champagne">
            {BRAND.baseline}
          </p>

          {/* Description */}
          <p className="font-serif text-lg font-light text-ivoire-maison/50 italic max-w-xs text-balance">
            Pâtisserie fine, généreuse et accessible.
          </p>
        </div>

        {/* Séparateur bas */}
        <div className="w-full h-px bg-ivoire-maison/8 mt-10 mb-6" aria-hidden="true" />

        {/* Bas de footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-[0.6rem] tracking-[0.15em] uppercase text-ivoire-maison/30">
            © {BRAND.year} {BRAND.name} — Brandbook Digital
          </p>
          <p className="font-sans text-[0.6rem] tracking-[0.12em] uppercase text-ivoire-maison/20">
            Usage interne · Confidentiel
          </p>
        </div>

      </div>
    </footer>
  );
}
