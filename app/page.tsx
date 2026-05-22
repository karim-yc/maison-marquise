// Page principale — vitrine du design system + sections placeholder pour tester la nav.
// Les sections seront remplacées par leur contenu définitif étape par étape.

import { BrandSection }       from "@/components/brand/BrandSection";
import { BrandCard }          from "@/components/brand/BrandCard";
import { ColorSwatch }        from "@/components/brand/ColorSwatch";
import { TypographySample }   from "@/components/brand/TypographySample";
import { FormulaCard }        from "@/components/brand/FormulaCard";
import { GuidelineCard }      from "@/components/brand/GuidelineCard";
import { PackagingMockupCard } from "@/components/brand/PackagingMockupCard";
import {
  premiumColors, gourmandColors, menuExamples, packaging,
} from "@/lib/tokens";

export default function HomePage() {
  return (
    <>

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative flex flex-col items-center justify-center min-h-[90vh] bg-blanc-marbre overflow-hidden bg-marble-subtle"
        aria-label="Accueil brandbook Maison Marquise"
      >
        {/* Grand M fantôme en fond */}
        <span
          className="absolute -bottom-12 -right-12 font-serif font-light leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(12rem, 30vw, 22rem)", color: "rgba(216,214,209,0.18)" }}
          aria-hidden="true"
        >
          M
        </span>

        <div className="container-mm flex flex-col items-center text-center gap-6 relative">

          <span className="label-mm animate-fade-down delay-100">Brandbook Digital — 2025</span>

          <h1
            className="font-script text-noir-marquise animate-fade-up delay-200 leading-none"
            style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
          >
            Maison Marquise
          </h1>

          <div
            className="line-gold animate-line-grow delay-300"
            style={{ width: "clamp(4rem, 10vw, 7rem)" }}
            aria-hidden="true"
          />

          <p className="label-mm tracking-[0.3em] text-or-champagne animate-fade-up delay-400">
            Bien plus qu'une boulangerie
          </p>

          <p className="font-serif text-lg md:text-xl font-light italic text-gris-texte max-w-md text-balance text-center mx-auto animate-fade-up delay-500">
            Pâtisserie fine, généreuse et accessible.
          </p>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-700">
            <span className="label-mm text-gris-marbre text-[0.55rem]">Découvrir</span>
            <div className="w-px h-8 bg-gradient-to-b from-gris-marbre to-transparent" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          01 — ADN
      ══════════════════════════════════════════════════════════════════ */}
      <BrandSection
        id="adn"
        index="01"
        label="Identité de marque"
        title="L'ADN Maison Marquise"
        intro="Une maison gourmande contemporaine, entre pâtisserie fine, boulangerie premium et expérience accessible. Élégante sans être élitiste."
        bg="ivory"
        bottomLine
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Élégante", "Sobre", "Premium", "Proche", "Gourmande", "Chaleureuse", "Accessible", "Généreuse"].map((kw, i) => (
            <BrandCard key={kw} variant="ghost" animDelay={i * 60} noHover>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-2xl text-or-champagne/40 font-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-d-sm font-light text-noir-marquise">
                  {kw}
                </span>
              </div>
            </BrandCard>
          ))}
        </div>
      </BrandSection>

      {/* ══════════════════════════════════════════════════════════════════
          02 — LOGO
      ══════════════════════════════════════════════════════════════════ */}
      <BrandSection
        id="logo"
        index="02"
        label="Système logo"
        title="Le logo Maison Marquise"
        intro="Quatre déclinaisons officielles. Chaque usage respecte une zone de respiration équivalente à la hauteur du M."
        bg="white"
        bottomLine
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { bg: "ivory" as const, label: "Complet",      desc: "Usage principal" },
            { bg: "dark"  as const, label: "Inversé",      desc: "Sur fond sombre" },
            { bg: "white" as const, label: "Sans baseline", desc: "Usage compact" },
            { bg: "gold"  as const, label: "Monogramme",   desc: "Favicon · Packaging" },
          ].map(({ bg, label, desc }, i) => (
            <BrandCard key={label} variant={bg === "dark" ? "dark" : bg === "gold" ? "gold" : "default"} animDelay={i * 80} noHover className="p-0 overflow-hidden">
              <div
                className={`flex items-center justify-center min-h-36 md:min-h-44 ${
                  bg === "dark" ? "bg-noir-marquise" :
                  bg === "gold" ? "bg-or-champagne" :
                  bg === "ivory" ? "bg-ivoire-maison" : "bg-blanc-marbre"
                }`}
              >
                <span className={`font-script text-3xl md:text-4xl leading-none ${
                  bg === "dark" ? "text-ivoire-maison" :
                  bg === "gold" ? "text-blanc-marbre" : "text-noir-marquise"
                }`}>
                  {label === "Monogramme" ? "M" : "Maison Marquise"}
                </span>
              </div>
              <div className="px-4 py-3 border-t border-gris-marbre">
                <p className="label-mm text-gris-texte">{label}</p>
                <p className="font-sans text-[0.65rem] text-gris-texte/60 mt-0.5">{desc}</p>
              </div>
            </BrandCard>
          ))}
        </div>
      </BrandSection>

      {/* ══════════════════════════════════════════════════════════════════
          03 — COULEURS
      ══════════════════════════════════════════════════════════════════ */}
      <BrandSection
        id="couleurs"
        index="03"
        label="Palette officielle"
        title="Les couleurs Maison Marquise"
        intro="80 % sobre et premium — ivoire, blanc marbre, noir, or champagne. 20 % gourmand et chaleureux — caramel, framboise, pistache, brun."
        bg="ivory"
        bottomLine
      >
        <div className="space-y-10">
          <div>
            <p className="label-mm text-gris-texte mb-6">Premium — 80 %</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5 md:gap-7">
              {premiumColors.map((c, i) => (
                <ColorSwatch key={c.token} color={c} size="lg" animDelay={i * 70} />
              ))}
            </div>
          </div>
          <div className="h-px w-full bg-gris-marbre/50" />
          <div>
            <p className="label-mm text-gris-texte mb-6">Gourmand — 20 %</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 md:gap-7">
              {gourmandColors.map((c, i) => (
                <ColorSwatch key={c.token} color={c} size="lg" animDelay={i * 70} />
              ))}
            </div>
          </div>
        </div>
      </BrandSection>

      {/* ══════════════════════════════════════════════════════════════════
          04 — TYPOGRAPHIES
      ══════════════════════════════════════════════════════════════════ */}
      <BrandSection
        id="typographies"
        index="04"
        label="Système typographique"
        title="Trois polices, une voix"
        intro="Cormorant Garamond pour l'élégance des titres. Montserrat pour la clarté du corps. Parisienne pour la signature poétique."
        bg="white"
        bottomLine
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <TypographySample family="serif"  animDelay={0}   />
          <TypographySample family="sans"   animDelay={100} />
          <TypographySample family="script" bg="dark" animDelay={200} />
        </div>
      </BrandSection>

      {/* ══════════════════════════════════════════════════════════════════
          05 — MENUS
      ══════════════════════════════════════════════════════════════════ */}
      <BrandSection
        id="menus"
        index="05"
        label="Menus & Formules"
        title="La structure des formules"
        intro="Six éléments ordonnés : nom, prix, contenu principal, inclus, supplément. Une hiérarchie claire pour une lecture immédiate."
        bg="ivory"
        bottomLine
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          {menuExamples.map((f, i) => (
            <FormulaCard key={f.name} formula={f} dark={i === 1} animDelay={i * 100} />
          ))}
        </div>
      </BrandSection>

      {/* ══════════════════════════════════════════════════════════════════
          06 — PACKAGING
      ══════════════════════════════════════════════════════════════════ */}
      <BrandSection
        id="packaging"
        index="06"
        label="Direction packaging"
        title="L'objet Maison Marquise"
        intro="Quatre formats emblématiques. Chaque support raconte la même histoire — sobre, chaleureuse, soignée — avec ses propres matières et contraintes."
        bg="white"
        bottomLine
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {packaging.map((item, i) => (
            <PackagingMockupCard key={item.id} item={item} animDelay={i * 100} />
          ))}
        </div>
      </BrandSection>

      {/* ══════════════════════════════════════════════════════════════════
          07 — UNIVERS
      ══════════════════════════════════════════════════════════════════ */}
      <BrandSection
        id="univers"
        index="07"
        label="Univers visuels"
        title="Trois univers, un territoire"
        intro="Maison, Gourmand, Signature. Chaque univers a sa palette, son énergie, son contexte d'usage. Ensemble, ils forment le territoire visuel de la marque."
        bg="ivory"
        bottomLine
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { name: "Univers Maison",    colors: ["#FAFAF8","#D8D6D1","#111111","#B99A5F"], mood: "Sobre · Architectural · Intemporel",   desc: "Le quotidien premium. Blanc, marbre, noir, doré subtil.", bg: "bg-blanc-marbre" },
            { name: "Univers Gourmand",  colors: ["#F7F3EC","#C7843E","#A6192E","#9A9B55"], mood: "Chaleureux · Appétissant · Généreux",   desc: "La chaleur de la maison. Ivoire, caramel, framboise, pistache.", bg: "bg-ivoire-maison" },
            { name: "Univers Signature", colors: ["#111111","#B99A5F","#A6192E","#F7F3EC"], mood: "Fort · Contrasté · Collectible",         desc: "L'édition limitée. Noir, photo forte, contraste assumé.", bg: "bg-noir-marquise" },
          ].map((u, i) => (
            <BrandCard key={u.name} variant={u.name.includes("Signature") ? "dark" : "default"} animDelay={i * 100} noHover className="p-0 overflow-hidden">
              <div className={`${u.bg} p-8 space-y-4`}>
                <div className="flex gap-2">
                  {u.colors.map((hex) => (
                    <div key={hex} className="w-6 h-6 rounded-full border border-black/8 shrink-0" style={{ backgroundColor: hex }} />
                  ))}
                </div>
                <p className={`font-serif text-d-sm font-light ${u.name.includes("Signature") ? "text-ivoire-maison" : "text-noir-marquise"}`}>
                  {u.name}
                </p>
              </div>
              <div className="p-6 space-y-2">
                <p className="label-mm text-gris-texte/60">{u.mood}</p>
                <p className="font-sans text-ui text-gris-texte">{u.desc}</p>
              </div>
            </BrandCard>
          ))}
        </div>
      </BrandSection>

      {/* ══════════════════════════════════════════════════════════════════
          08 — APPLICATIONS
      ══════════════════════════════════════════════════════════════════ */}
      <BrandSection
        id="applications"
        index="08"
        label="Dos & Don'ts"
        title="Règles d'application"
        intro="La marque vit dans ses détails. Ces règles garantissent la cohérence à travers tous les supports et tous les interlocuteurs."
        bg="white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          <GuidelineCard type="do"   title="Utiliser des formules sobres et sincères"      description="« Préparé avec soin chaque matin » — direct, chaleureux, vrai."                              animDelay={0}   />
          <GuidelineCard type="dont" title="Abuser des superlatifs creux"                  description="« Une expérience exceptionnelle et incroyable » — vague, impersonnel."                        animDelay={80}  />
          <GuidelineCard type="do"   title="Laisser respirer la composition"                description="Les blancs et les silences font partie du langage visuel Marquise."                           animDelay={160} />
          <GuidelineCard type="dont" title="Surcharger les supports"                       description="Un message fort vaut mieux que dix messages moyens sur un même espace."                        animDelay={240} />
          <GuidelineCard type="do"   title="Respecter la zone de respiration du logo"      description="Un espace libre équivalent à la hauteur du M encadre toujours le logo."                       animDelay={320} />
          <GuidelineCard type="dont" title="Déformer ou recoloriser le logo"               description="Ni ombre portée, ni couleur hors palette, ni proportion modifiée."                            animDelay={400} />
        </div>
      </BrandSection>

    </>
  );
}
