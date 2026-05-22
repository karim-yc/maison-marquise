import { HeroSection }        from "@/components/sections/HeroSection";
import { AdnSection }         from "@/components/sections/AdnSection";
import { LogoSection }        from "@/components/sections/LogoSection";
import { CouleursSection }        from "@/components/sections/CouleursSection";
import { TypographiesSection }    from "@/components/sections/TypographiesSection";
import { PackagingSection }       from "@/components/sections/PackagingSection";
import { UniversSection }         from "@/components/sections/UniversSection";
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
      <UniversSection />

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
