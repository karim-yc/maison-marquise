// Page d'accueil – placeholder en attente des sections visuelles.
import { Logo } from "@/components/brand/logo";

export default function HomePage() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center bg-blanc-marbre">
      <div className="container-brand text-center py-24 space-y-8">

        {/* Logo provisoire */}
        <Logo variant="full" size="lg" />

        {/* Séparateur or */}
        <div className="line-gold w-32 mx-auto animate-line-grow" />

        {/* Sous-titre charte */}
        <p className="label-brand text-gris-texte tracking-[0.3em]">
          Brandbook Digital — Charte Graphique Interactive
        </p>

        {/* Statut */}
        <div className="chip-brand mx-auto mt-6">
          <span className="w-1.5 h-1.5 rounded-full bg-or-champagne animate-pulse" aria-hidden="true" />
          Initialisation en cours
        </div>

      </div>
    </main>
  );
}
