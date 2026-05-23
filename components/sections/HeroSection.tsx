"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDown, BookOpen, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { HeroLogo } from "@/components/brand/HeroLogo";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function HeroSection({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY      = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => setMounted(true), []);

  const scrollToContent  = () => document.getElementById("adn")?.scrollIntoView({ behavior: "smooth" });
  const scrollToPackaging = () => document.getElementById("packaging")?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.section
      ref={sectionRef}
      className={cn(
        "relative w-full overflow-hidden",
        "flex flex-col items-center justify-center",
        "min-h-[100dvh]",
        "bg-ivoire-maison",
        className,
      )}
      style={mounted ? { opacity: sectionOpacity } : undefined}
      aria-label="Accueil du brandbook Maison Marquise"
    >
      {/* Texture marbre */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Image
          src="/assets/texture-marble-white.jpg"
          alt="" fill sizes="100vw"
          className="object-cover opacity-30"
          quality={60} priority
        />
        <div className="absolute inset-0 bg-ivoire-maison/72" />
      </div>

      {/* Vignette radiale */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 50%, rgba(17,17,17,0.04) 100%)" }}
        aria-hidden="true"
      />

      {/* Contenu centré */}
      <motion.div
        className="relative z-raised w-full px-6 md:px-10 flex flex-col items-center text-center"
        style={mounted ? { y: contentY } : undefined}
      >

        {/* Eyebrow */}
        <motion.div
          className="inline-flex items-center gap-3 mb-8 md:mb-10"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
        >
          <span className="block w-5 h-px bg-or-champagne/60" aria-hidden="true" />
          <span className="label-mm text-gris-texte tracking-[0.25em]">Identité de marque</span>
          <span className="block w-5 h-px bg-or-champagne/60" aria-hidden="true" />
        </motion.div>

        {/* Logo officiel — contient déjà MAISON MARQUISE + baseline */}
        <motion.div
          className="w-full mb-8 md:mb-10"
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroLogo
            variant="full"
            colorClass="text-noir-marquise"
            className="mx-auto max-w-[260px] sm:max-w-[320px] md:max-w-[380px]"
          />
          {/* H1 accessible mais invisible — le logo contient le texte visuellement */}
          <h1 className="sr-only">Maison Marquise — Brandbook Digital</h1>
        </motion.div>

        {/* Filet or */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-7 md:mb-8 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          aria-hidden="true"
        >
          <div
            className="h-px flex-1 max-w-20"
            style={{ background: "linear-gradient(to right, transparent, #B99A5F)" }}
          />
          <div className="w-1.5 h-1.5 bg-or-champagne rotate-45 shrink-0" />
          <div
            className="h-px flex-1 max-w-20"
            style={{ background: "linear-gradient(to left, transparent, #B99A5F)" }}
          />
        </motion.div>

        {/* Sous-titre */}
        <motion.p
          className="font-serif italic font-light text-gris-texte mb-4 md:mb-5"
          style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7, ease: EASE }}
        >
          Pâtisserie fine, généreuse et accessible.
        </motion.p>

        {/* Phrase secondaire */}
        <motion.p
          className="font-sans font-light text-gris-texte/70 max-w-sm mx-auto leading-relaxed mb-10 md:mb-12"
          style={{ fontSize: "clamp(0.8rem, 1.6vw, 0.9375rem)" }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7, ease: EASE }}
        >
          Une maison gourmande, élégante et proche —
          bien plus qu&apos;une boulangerie.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6, ease: EASE }}
        >
          <button
            onClick={scrollToContent}
            className="btn-mm group flex items-center justify-center gap-2.5 w-full sm:w-auto"
            aria-label="Découvrir la charte graphique"
          >
            <BookOpen size={13} strokeWidth={1.5} aria-hidden="true" />
            Découvrir la charte
          </button>
          <button
            onClick={scrollToPackaging}
            className="btn-mm-gold group flex items-center justify-center gap-2.5 w-full sm:w-auto"
            aria-label="Voir le système packaging"
          >
            <Package size={13} strokeWidth={1.5} aria-hidden="true" />
            Voir le packaging
          </button>
        </motion.div>

      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gris-texte/40 hover:text-or-champagne transition-colors duration-300 group"
        onClick={scrollToContent}
        aria-label="Défiler vers le contenu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6, ease: EASE }}
      >
        <span className="label-mm text-[0.5rem] tracking-[0.28em] text-inherit">Explorer</span>
        <div className="relative w-px h-8 overflow-hidden">
          <motion.div
            className="absolute top-0 w-full bg-or-champagne/60"
            animate={{ height: ["0%","100%","0%"], top: ["0%","0%","100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gris-marbre/25" aria-hidden="true" />
        </div>
        <motion.div animate={{ y: [0, 3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown size={11} strokeWidth={1.5} className="text-inherit" aria-hidden="true" />
        </motion.div>
      </motion.button>

    </motion.section>
  );
}
