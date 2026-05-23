import { HeroSection }        from "@/components/sections/HeroSection";
import { AdnSection }         from "@/components/sections/AdnSection";
import { LogoSection }        from "@/components/sections/LogoSection";
import { CouleursSection }        from "@/components/sections/CouleursSection";
import { TypographiesSection }    from "@/components/sections/TypographiesSection";
import { PackagingSection }       from "@/components/sections/PackagingSection";
import { UniversSection }         from "@/components/sections/UniversSection";
import { ApplicationsSection }    from "@/components/sections/ApplicationsSection";
import { BrandSection }       from "@/components/brand/BrandSection";
import { BrandCard }          from "@/components/brand/BrandCard";
import { ColorSwatch }        from "@/components/brand/ColorSwatch";
import { TypographySample }   from "@/components/brand/TypographySample";
import { FormulaCard }        from "@/components/brand/FormulaCard";
import { GuidelineCard }      from "@/components/brand/GuidelineCard";
import { PackagingMockupCard } from "@/components/brand/PackagingMockupCard";
import { LogoFull, LogoVariant, LogoMonogram } from "@/components/brand/LogoSvg";
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
      <ApplicationsSection />
    </>
  );
}
