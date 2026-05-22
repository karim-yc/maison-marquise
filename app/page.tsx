/**
 * Page d'accueil — Charte Graphique Maison Marquise
 *
 * Point d'entrée de la charte digitale interactive.
 * Les sections seront ajoutées progressivement.
 */

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ivory" aria-label="Charte graphique Maison Marquise">
      {/* Les sections visuelles seront intégrées ici */}
      <div className="container-brand flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-caps text-taupe tracking-widest">En cours de construction</p>
          <h1 className="font-parisienne text-6xl text-champagne">Maison Marquise</h1>
          <p className="font-cormorant text-display-lg text-charbon italic">
            Charte Graphique Digitale
          </p>
        </div>
      </div>
    </main>
  );
}
