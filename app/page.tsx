import { HeroSection }        from "@/components/sections/HeroSection";
import { AdnSection }         from "@/components/sections/AdnSection";
import { LogoSection }        from "@/components/sections/LogoSection";
import { CouleursSection }        from "@/components/sections/CouleursSection";
import { TypographiesSection }    from "@/components/sections/TypographiesSection";
import { PackagingSection }       from "@/components/sections/PackagingSection";
import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { UniversSection }         from "@/components/sections/UniversSection";
import { BrandSection }       from "@/components/brand/BrandSection";
import { BrandCard }          from "@/components/brand/BrandCard";
import { ColorSwatch }        from "@/components/brand/ColorSwatch";
import { TypographySample }   from "@/components/brand/TypographySample";
import { GuidelineCard }      from "@/components/brand/GuidelineCard";
import { PackagingMockupCard } from "@/components/brand/PackagingMockupCard";
import { LogoFull, LogoVariant, LogoMonogram } from "@/components/brand/LogoSvg";
import { premiumColors, gourmandColors, packaging } from "@/lib/tokens";

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


      {/* 06 — PACKAGING */}
      <PackagingSection />

      {/* 07 — UNIVERS */}
      <UniversSection />

    </>
  );
}
