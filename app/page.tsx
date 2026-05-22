// Page d'accueil — placeholder en attente de l'assemblage des sections.
// Sert à valider visuellement le design system avant intégration complète.

import { BrandCard }        from "@/components/brand/BrandCard";
import { ColorSwatch }      from "@/components/brand/ColorSwatch";
import { TypographySample } from "@/components/brand/TypographySample";
import { FormulaCard }      from "@/components/brand/FormulaCard";
import { GuidelineCard }    from "@/components/brand/GuidelineCard";
import { palette, premiumColors, gourmandColors, menuExamples } from "@/lib/tokens";

export default function HomePage() {
  return (
    <main className="min-h-screen-safe">

      {/* ── Hero provisoire ─────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen-safe bg-blanc-marbre overflow-hidden bg-marble-subtle">
        {/* Grand M fantôme */}
        <span
          className="absolute -bottom-8 -right-8 font-serif font-light text-[20rem] text-gris-marbre/15 select-none pointer-events-none leading-none"
          aria-hidden="true"
        >
          M
        </span>

        <div className="container-mm flex flex-col items-center text-center gap-6 relative z-raised">
          <span className="label-mm animate-fade-down">Brandbook Digital</span>

          <h1 className="font-script text-d-xl text-noir-marquise animate-fade-up">
            Maison Marquise
          </h1>

          <div className="line-gold w-24 animate-line-grow" aria-hidden="true" />

          <p className="label-mm tracking-[0.3em] text-gris-texte animate-fade-up delay-200">
            Bien plus qu'une boulangerie
          </p>

          <p className="font-sans text-body text-gris-texte max-w-narrow text-center mx-auto animate-fade-up delay-300">
            Pâtisserie fine, généreuse et accessible.
            Le raffinement gourmand, accessible à tous.
          </p>
        </div>
      </section>

      {/* ── Vitrine du design system (preview) ─────────────────────────── */}
      <section className="py-section bg-ivoire-maison" aria-label="Aperçu du design system">
        <div className="container-mm space-y-20">

          {/* Palette */}
          <div>
            <div className="mb-8">
              <span className="label-mm text-gris-texte">Design System · Couleurs</span>
              <h2 className="font-serif text-d-md font-light text-noir-marquise mt-2">
                Palette officielle
              </h2>
              <div className="line-gold-l w-16 mt-4" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
              {premiumColors.map((c, i) => (
                <ColorSwatch key={c.token} color={c} animDelay={i * 80} />
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
              {gourmandColors.map((c, i) => (
                <ColorSwatch key={c.token} color={c} animDelay={i * 80} />
              ))}
            </div>
          </div>

          {/* Typographies */}
          <div>
            <div className="mb-8">
              <span className="label-mm text-gris-texte">Design System · Typographie</span>
              <h2 className="font-serif text-d-md font-light text-noir-marquise mt-2">
                Système typographique
              </h2>
              <div className="line-gold-l w-16 mt-4" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <TypographySample family="serif"  animDelay={0}   />
              <TypographySample family="sans"   animDelay={100} />
              <TypographySample family="script" bg="dark" animDelay={200} />
            </div>
          </div>

          {/* Composants */}
          <div>
            <div className="mb-8">
              <span className="label-mm text-gris-texte">Design System · Composants</span>
              <h2 className="font-serif text-d-md font-light text-noir-marquise mt-2">
                BrandCard — variantes
              </h2>
              <div className="line-gold-l w-16 mt-4" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <BrandCard variant="default" label="Default" title="Surface ivoire" subtitle="Bordure gris marbre" animDelay={0}>
                <p className="font-sans text-ui text-gris-texte">Contenu de carte standard.</p>
              </BrandCard>
              <BrandCard variant="gold" label="Gold" title="Surface or" subtitle="Bordure champagne" animDelay={80}>
                <p className="font-sans text-ui text-gris-texte">Packaging, logo, premium.</p>
              </BrandCard>
              <BrandCard variant="dark" label="Dark" title="Surface noire" subtitle="Univers Signature" animDelay={160}>
                <p className="font-sans text-ui text-gris-marbre">Éditions limitées, contraste.</p>
              </BrandCard>
              <BrandCard variant="ghost" label="Ghost" title="Surface transparente" subtitle="Discret" animDelay={240}>
                <p className="font-sans text-ui text-gris-texte">Contexte clair, sobre.</p>
              </BrandCard>
            </div>
          </div>

          {/* Formules */}
          <div>
            <div className="mb-8">
              <span className="label-mm text-gris-texte">Design System · Formules</span>
              <h2 className="font-serif text-d-md font-light text-noir-marquise mt-2">
                FormulaCard — structure officielle
              </h2>
              <div className="line-gold-l w-16 mt-4" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menuExamples.map((f, i) => (
                <FormulaCard key={f.name} formula={f} dark={i === 1} animDelay={i * 120} />
              ))}
            </div>
          </div>

          {/* Guidelines */}
          <div>
            <div className="mb-8">
              <span className="label-mm text-gris-texte">Design System · Règles</span>
              <h2 className="font-serif text-d-md font-light text-noir-marquise mt-2">
                GuidelineCard — Dos &amp; Don'ts
              </h2>
              <div className="line-gold-l w-16 mt-4" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GuidelineCard type="do" title="Utiliser des formules sobres et sincères" description="«  Préparé avec soin chaque matin » — direct, chaleureux, vrai." animDelay={0} />
              <GuidelineCard type="dont" title="Abuser des superlatifs creux" description="« Une expérience exceptionnelle et incroyable » — vague, impersonnel, oublié." animDelay={100} />
              <GuidelineCard type="do" title="Laisser respirer la composition" description="Les blancs et silences font partie du langage visuel Marquise." animDelay={200} />
              <GuidelineCard type="dont" title="Surcharger les visuels d'informations" description="Un message fort vaut mieux que dix messages moyens sur un même support." animDelay={300} />
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
