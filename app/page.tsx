import { HeroSection }        from "@/components/sections/HeroSection";
import { AdnSection }         from "@/components/sections/AdnSection";
import { LogoSection }        from "@/components/sections/LogoSection";
import { CouleursSection }        from "@/components/sections/CouleursSection";
import { TypographiesSection }    from "@/components/sections/TypographiesSection";
import { PackagingSection }       from "@/components/sections/PackagingSection";
import { BrandSection }       from "@/components/brand/BrandSection";
import { BrandCard }          from "@/components/brand/BrandCard";
import { ColorSwatch }        from "@/components/brand/ColorSwatch";
import { TypographySample }   from "@/components/brand/TypographySample";
import { FormulaCard }        from "@/components/brand/FormulaCard";
import { GuidelineCard }      from "@/components/brand/GuidelineCard";
import { PackagingMockupCard } from "@/components/brand/PackagingMockupCard";
import { premiumColors, gourmandColors, menuExamples, packaging } from "@/lib/tokens";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AdnSection />

      {/* 02 — LOGO */}
      <LogoSection />

      {/* 03 — COULEURS */}
      <CouleursSection />

      {/* 04 — TYPOGRAPHIES */}
      <TypographiesSection />

      {/* 05 — MENUS */}
      <BrandSection id="menus" index="05" label="Menus & Formules" title="La structure des formules"
        intro="Six éléments ordonnés : nom, prix, contenu principal, inclus, supplément. Une hiérarchie claire pour une lecture immédiate."
        bg="ivory" bottomLine>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          {menuExamples.map((f, i) => <FormulaCard key={f.name} formula={f} dark={i === 1} animDelay={i * 100} />)}
        </div>
      </BrandSection>

      {/* 06 — PACKAGING */}
      <PackagingSection />

      {/* 07 — UNIVERS */}
      <BrandSection id="univers" index="07" label="Univers visuels" title="Trois univers, un territoire"
        intro="Maison, Gourmand, Signature. Chaque univers a sa palette, son énergie et son contexte d'usage."
        bg="ivory" bottomLine>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { name: "Univers Maison",    colors: ["#FAFAF8","#D8D6D1","#111111","#B99A5F"], mood: "Sobre · Architectural · Intemporel",  desc: "Blanc, marbre, noir, doré subtil.",            dark: false, bg: "bg-blanc-marbre"  },
            { name: "Univers Gourmand",  colors: ["#F7F3EC","#C7843E","#A6192E","#9A9B55"], mood: "Chaleureux · Appétissant · Généreux",  desc: "Ivoire, caramel, framboise, pistache.",        dark: false, bg: "bg-ivoire-maison" },
            { name: "Univers Signature", colors: ["#111111","#B99A5F","#A6192E","#F7F3EC"], mood: "Fort · Contrasté · Collectible",        desc: "Noir, photo forte, contraste assumé.",         dark: true,  bg: "bg-noir-marquise" },
          ].map((u, i) => (
            <BrandCard key={u.name} variant={u.dark ? "dark" : "default"} animDelay={i * 100} noHover className="p-0 overflow-hidden">
              <div className={`${u.bg} p-7 space-y-4`}>
                <div className="flex gap-2">{u.colors.map(hex => <div key={hex} className="w-5 h-5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: hex }} />)}</div>
                <p className={`font-serif text-d-sm font-light ${u.dark ? "text-ivoire-maison" : "text-noir-marquise"}`}>{u.name}</p>
              </div>
              <div className="p-6 space-y-2">
                <p className="label-mm text-gris-texte/60">{u.mood}</p>
                <p className="font-sans text-ui text-gris-texte leading-relaxed">{u.desc}</p>
              </div>
            </BrandCard>
          ))}
        </div>
      </BrandSection>

      {/* 08 — APPLICATIONS */}
      <BrandSection id="applications" index="08" label="Dos & Don'ts" title="Règles d'application"
        intro="La marque vit dans ses détails. Ces règles garantissent la cohérence à travers tous les supports."
        bg="white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          <GuidelineCard type="do"   title="Utiliser des formules sobres et sincères"   description="« Préparé avec soin chaque matin » — direct, chaleureux, vrai."             animDelay={0}   />
          <GuidelineCard type="dont" title="Abuser des superlatifs creux"               description="« Une expérience exceptionnelle et incroyable » — vague, impersonnel."       animDelay={80}  />
          <GuidelineCard type="do"   title="Laisser respirer la composition"             description="Les blancs et silences font partie du langage visuel Marquise."              animDelay={160} />
          <GuidelineCard type="dont" title="Surcharger les supports"                    description="Un message fort vaut mieux que dix messages moyens sur un même espace."       animDelay={240} />
          <GuidelineCard type="do"   title="Respecter la zone de respiration du logo"   description="Un espace libre équivalent à la hauteur du M encadre toujours le logo."      animDelay={320} />
          <GuidelineCard type="dont" title="Déformer ou recoloriser le logo"            description="Ni ombre portée, ni couleur hors palette, ni proportion modifiée."           animDelay={400} />
        </div>
      </BrandSection>
    </>
  );
}
