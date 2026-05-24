import { HeroSection }         from "@/components/sections/HeroSection";
import { AdnSection }          from "@/components/sections/AdnSection";
import { LogoSection }         from "@/components/sections/LogoSection";
import { CouleursSection }     from "@/components/sections/CouleursSection";
import { TypographiesSection } from "@/components/sections/TypographiesSection";
import { PackagingSection }    from "@/components/sections/PackagingSection";
import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { UniversSection }      from "@/components/sections/UniversSection";

export default function HomePage() {
  return (
    <>
      {/* 00 — HERO */}
      <HeroSection />

      {/* 01 — ADN */}
      <AdnSection />

      {/* 02 — LOGO */}
      <LogoSection />

      {/* 03 — COULEURS */}
      <CouleursSection />

      {/* 04 — TYPOGRAPHIES */}
      <TypographiesSection />

      {/* 05 — PACKAGING */}
      <PackagingSection />

      {/* 06 — ARCHITECTURE */}
      <ArchitectureSection />

      {/* 07 — UNIVERS */}
      <UniversSection />
    </>
  );
}
