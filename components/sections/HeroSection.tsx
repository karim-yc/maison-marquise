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
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => setMounted(true), []);

  const scrollToContent   = () => document.getElementById("adn")?.scrollIntoView({ behavior: "smooth" });
  const scrollToPackaging = () => document.getElementById("packaging")?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.section
      ref={sectionRef}
      className={cn(
        "relative w-full overflow-hidden bg-ivoire-maison",
        "h-[calc(100dvh-4rem)] md:h-[calc(100dvh-72px)]",
        "flex flex-col items-center justify-center",
        className,
      )}
      style={mounted ? { opacity: sectionOpacity } : undefined}
      aria-label="Accueil du brandbook Maison Marquise"
    >
      {/* Fond marbre */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Image
          src="/assets/texture-marble-white.jpg"
          alt="" fill sizes="100vw"
          className="object-cover opacity-30"
          quality={60} priority
        />
        <div className="absolute inset-0 bg-ivoire-maison/72" />
      </div>

      {/* ── Bloc central unique — tout ensemble, bien groupé ── */}
      <div className="relative z-raised w-full max-w-[min(420px,88vw)] mx-auto px-4 flex flex-col items-center text-center">

        <h1 className="sr-only">Maison Marquise — Brandbook Digital</h1>

        {/* Eyebrow collé au logo — même groupe visuel */}
        <motion.div
          className="inline-flex items-center gap-2 mb-3"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
        >
          <span className="block w-4 h-px bg-or-champagne/60" aria-hidden="true" />
          <span className="font-sans text-[0.58rem] font-medium tracking-[0.22em] uppercase text-gris-texte">
            Identité de marque
          </span>
          <span className="block w-4 h-px bg-or-champagne/60" aria-hidden="true" />
        </motion.div>

        {/* Logo officiel */}
        <motion.div
          className="w-full mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroLogo
            variant="full"
            colorClass="text-noir-marquise"
            className="w-full"
          />
        </motion.div>

        {/* Filet or */}
        <motion.div
          className="flex items-center gap-3 w-4/5 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          aria-hidden="true"
        >
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, #B99A5F)" }} />
          <div className="w-1.5 h-1.5 bg-or-champagne rotate-45 shrink-0" />
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, #B99A5F)" }} />
        </motion.div>

        {/* Sous-titre */}
        <motion.p
          className="font-serif italic font-light text-gris-texte mb-2 text-lg md:text-xl"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6, ease: EASE }}
        >
          Maison Marquise — Brandbook officiel.
        </motion.p>

        {/* Phrase secondaire */}
        <motion.p
          className="font-sans font-light text-gris-texte/70 leading-snug text-sm mb-7"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
        >
          Charte graphique à l&apos;usage des graphistes,
          imprimeurs et prestataires.
        </motion.p>

        {/* CTAs — empilés sur mobile (<640px), côte à côte au-delà */}
        <motion.div
          className="w-full flex flex-col md:flex-row gap-2.5"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6, ease: EASE }}
        >
          <button
            onClick={scrollToContent}
            className="btn-mm w-full md:flex-1 flex items-center justify-center gap-2"
            aria-label="Découvrir la charte graphique"
          >
            <BookOpen size={12} strokeWidth={1.5} aria-hidden="true" />
            <span>Découvrir la charte</span>
          </button>
          <button
            onClick={scrollToPackaging}
            className="btn-mm-gold w-full md:flex-1 flex items-center justify-center gap-2"
            aria-label="Explorer la charte graphique complète"
          >
            <Package size={12} strokeWidth={1.5} aria-hidden="true" />
            <span>Explorer la charte</span>
          </button>
        </motion.div>

      </div>

      {/* Scroll indicator — ancré en bas */}
      <motion.button
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gris-texte/35 hover:text-or-champagne transition-colors duration-300"
        onClick={scrollToContent}
        aria-label="Défiler vers le contenu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
      >
        <span className="font-sans text-[0.48rem] tracking-[0.25em] uppercase">Explorer</span>
        <motion.div animate={{ y: [0, 3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown size={10} strokeWidth={1.5} aria-hidden="true" />
        </motion.div>
      </motion.button>

    </motion.section>
  );
}
