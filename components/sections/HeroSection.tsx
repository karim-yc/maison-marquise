"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowDown, BookOpen, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { HeroLogo } from "@/components/brand/HeroLogo";

// ─────────────────────────────────────────────────────────────────────────────
// HeroSection — Plein écran d'accueil du brandbook Maison Marquise.
//
// Composition (de haut en bas) :
//   · Eyebrow label centré
//   · Logo officiel (ou placeholder)
//   · Titre H1 en Cormorant — "Maison Marquise"
//   · Filet or champagne animé
//   · Sous-titre Cormorant italic
//   · Corps Montserrat sobre
//   · Deux CTA discrets
//   · Scroll indicator
//
// Effets :
//   · Fond ivoire avec grain SVG + vignette radiale subtile
//   · Grand M fantôme en fond (parallax léger au scroll)
//   · Séquence d'entrée orchestrée (stagger 7 éléments)
//   · Parallax doux sur le M fantôme + fade-out de la section au scroll
// ─────────────────────────────────────────────────────────────────────────────

// Durées et délais de la séquence d'entrée (en secondes)
const SEQUENCE = {
  eyebrow:   { delay: 0.15, duration: 0.7 },
  logo:      { delay: 0.35, duration: 1.0 },
  title:     { delay: 0.55, duration: 1.0 },
  line:      { delay: 0.80, duration: 1.1 },
  subtitle:  { delay: 0.95, duration: 0.8 },
  body:      { delay: 1.10, duration: 0.8 },
  ctas:      { delay: 1.28, duration: 0.7 },
  scroll:    { delay: 1.60, duration: 0.6 },
};

// Ease doux et élégant
const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_SPRING = [0.16, 1, 0.3, 1] as const;

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const sectionRef  = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  // Parallax du M fantôme + fade-out de la section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const mY       = useTransform(scrollYProgress, [0, 1], ["0%",   "18%"]);
  const mOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Éviter hydration mismatch sur les transforms
  useEffect(() => setMounted(true), []);

  const scrollToContent = () => {
    document.getElementById("adn")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToPackaging = () => {
    document.getElementById("packaging")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.section
      ref={sectionRef}
      className={cn(
        "relative min-h-screen-safe w-full overflow-hidden",
        "flex flex-col items-center justify-center",
        // Fond ivoire chaud
        "bg-ivoire-maison",
        className,
      )}
      style={mounted ? { opacity: sectionOpacity } : undefined}
      aria-label="Accueil du brandbook Maison Marquise"
    >

      {/* ── Fond : texture marbre officielle ──────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Image
          src="/assets/texture-marble-white.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.35]"
          quality={60}
          priority
        />
        {/* Overlay ivoire pour adoucir */}
        <div className="absolute inset-0 bg-ivoire-maison/70" />
      </div>

      {/* ── Fond : vignette radiale très subtile ──────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 40%, rgba(17,17,17,0.032) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Fond : lignes de grille très légères (optionnel) ─────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage: "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* ── Grand M fantôme en fond (parallax) ───────────────────────────── */}
      <motion.span
        className={cn(
          "absolute select-none pointer-events-none",
          "font-serif font-light leading-none",
          "text-gris-marbre/25",
          // Position légèrement off-center vers la droite — asymétrie éditoriale
          "right-[-8vw] bottom-[-6vh]",
        )}
        style={{
          fontSize: "clamp(18rem, 45vw, 50rem)",
          ...(mounted ? { y: mY, opacity: mOpacity } : {}),
        }}
        aria-hidden="true"
      >
        M
      </motion.span>

      {/* ── Ligne décorative gauche (desktop uniquement) ──────────────────── */}
      <motion.div
        className="hidden lg:block absolute left-10 xl:left-16 top-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 1.4, duration: 1.2, ease: EASE_SPRING }}
        style={{ transformOrigin: "top" }}
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-or-champagne/40" />
          <span
            className="label-mm text-[0.55rem] text-gris-marbre/60 [writing-mode:vertical-rl] tracking-[0.3em]"
          >
            Identité visuelle officielle
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-or-champagne/40 to-transparent" />
        </div>
      </motion.div>

      {/* ── Numérotation droite (desktop) ─────────────────────────────────── */}
      <motion.div
        className="hidden lg:flex absolute right-10 xl:right-16 top-1/2 -translate-y-1/2 flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="font-serif text-[0.65rem] font-light text-gris-marbre/40 [writing-mode:vertical-rl] tracking-[0.2em]">
          2025
        </span>
        <div className="w-px h-12 bg-gris-marbre/20" />
        <span className="font-serif text-[0.65rem] font-light text-gris-marbre/30 [writing-mode:vertical-rl] tracking-[0.2em]">
          Brandbook v1
        </span>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════════════
          CONTENU PRINCIPAL
      ══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="relative z-raised w-full max-w-2xl xl:max-w-3xl mx-auto px-6 md:px-10"
        style={mounted ? { y: contentY } : undefined}
      >
        <div className="flex flex-col items-center text-center gap-0">

          {/* ── 1. Eyebrow ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SEQUENCE.eyebrow, ease: EASE }}
            className="mb-10 md:mb-12"
          >
            <div className="inline-flex items-center gap-3">
              {/* Trait or gauche */}
              <motion.span
                className="block h-px bg-or-champagne/60"
                initial={{ width: 0 }}
                animate={{ width: 24 }}
                transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
                aria-hidden="true"
              />
              <span className="label-mm text-gris-texte tracking-[0.25em]">
                Identité de marque
              </span>
              {/* Trait or droit */}
              <motion.span
                className="block h-px bg-or-champagne/60"
                initial={{ width: 0 }}
                animate={{ width: 24 }}
                transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
                aria-hidden="true"
              />
            </div>
          </motion.div>

          {/* ── 2. Logo ─────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ ...SEQUENCE.logo, ease: EASE_SPRING }}
            className="w-full mb-10 md:mb-12"
          >
            <HeroLogo
              variant="full"
              colorClass="text-noir-marquise"
              className="mx-auto max-w-[320px] sm:max-w-sm md:max-w-md"
            />
          </motion.div>

          {/* ── 3. Titre H1 ─────────────────────────────────────────────── */}
          {/*
            Note : le titre H1 est masqué visuellement (sr-only) quand le logo
            est en mode "official" pour éviter la duplication SEO. En mode
            placeholder, il reste visible pour compenser l'absence du vrai logo.
          */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SEQUENCE.title, ease: EASE_SPRING }}
            className="w-full mb-8 md:mb-10"
          >
            <h1
              className={cn(
                "font-serif font-light text-noir-marquise text-balance",
                "leading-none tracking-tight",
                // Taille fluide généreuse
                "text-[clamp(3rem,8vw,6.5rem)]",
              )}
            >
              Maison Marquise
            </h1>
          </motion.div>

          {/* ── 4. Filet or animé ───────────────────────────────────────── */}
          <motion.div
            className="w-full mb-8 md:mb-10 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: SEQUENCE.line.delay, duration: 0.3 }}
            aria-hidden="true"
          >
            {/* Bras gauche */}
            <motion.div
              className="h-px bg-gradient-to-r from-transparent to-or-champagne flex-1 max-w-24"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: SEQUENCE.line.delay, duration: SEQUENCE.line.duration, ease: EASE_SPRING }}
              style={{ transformOrigin: "right" }}
            />
            {/* Losange central */}
            <motion.div
              className="w-1.5 h-1.5 bg-or-champagne rotate-45 shrink-0"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: SEQUENCE.line.delay + 0.3, duration: 0.5, ease: EASE_SPRING }}
            />
            {/* Bras droit */}
            <motion.div
              className="h-px bg-gradient-to-l from-transparent to-or-champagne flex-1 max-w-24"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: SEQUENCE.line.delay, duration: SEQUENCE.line.duration, ease: EASE_SPRING }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>

          {/* ── 5. Sous-titre ───────────────────────────────────────────── */}
          <motion.p
            className={cn(
              "font-serif italic font-light text-gris-texte text-balance",
              "text-[clamp(1.25rem,3vw,1.75rem)]",
              "mb-5 md:mb-6",
            )}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SEQUENCE.subtitle, ease: EASE }}
          >
            Pâtisserie fine, généreuse et accessible.
          </motion.p>

          {/* ── 6. Phrase secondaire ────────────────────────────────────── */}
          <motion.p
            className={cn(
              "font-sans font-light text-gris-texte/80 text-balance mx-auto",
              "text-[clamp(0.875rem,1.8vw,1rem)]",
              "leading-relaxed max-w-md",
              "mb-12 md:mb-14",
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SEQUENCE.body, ease: EASE }}
          >
            Une maison gourmande, élégante et proche —
            bien plus qu'une boulangerie.
          </motion.p>

          {/* ── 7. CTA ──────────────────────────────────────────────────── */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SEQUENCE.ctas, ease: EASE }}
          >
            {/* CTA 1 — Primaire */}
            <button
              onClick={scrollToContent}
              className={cn(
                "btn-mm group w-full sm:w-auto",
                "flex items-center justify-center gap-2.5",
              )}
              aria-label="Découvrir la charte graphique"
            >
              <BookOpen
                size={13}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:rotate-6"
                aria-hidden="true"
              />
              Découvrir la charte
            </button>

            {/* CTA 2 — Secondaire or */}
            <button
              onClick={scrollToPackaging}
              className={cn(
                "btn-mm-gold group w-full sm:w-auto",
                "flex items-center justify-center gap-2.5",
              )}
              aria-label="Voir le système packaging"
            >
              <Package
                size={13}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
              Voir le packaging
            </button>
          </motion.div>

        </div>
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <motion.button
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2",
          "flex flex-col items-center gap-2",
          "text-gris-texte/40 hover:text-or-champagne",
          "transition-colors duration-300",
          "focus-visible:outline-2 focus-visible:outline-or-champagne focus-visible:outline-offset-4",
          "group",
        )}
        onClick={scrollToContent}
        aria-label="Défiler vers le contenu"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SEQUENCE.scroll, ease: EASE }}
      >
        {/* Label */}
        <span className="label-mm text-[0.55rem] tracking-[0.3em] text-inherit">
          Explorer
        </span>

        {/* Ligne animée */}
        <div className="relative w-px h-10 overflow-hidden">
          <motion.div
            className="absolute top-0 w-full bg-or-champagne/60"
            animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
            aria-hidden="true"
          />
          {/* Fond ligne */}
          <div className="absolute inset-0 bg-gris-marbre/30" aria-hidden="true" />
        </div>

        {/* Icône flèche */}
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown
            size={12}
            strokeWidth={1.5}
            className="text-inherit"
            aria-hidden="true"
          />
        </motion.div>
      </motion.button>

      {/* ── Coins décoratifs (desktop) ─────────────────────────────────────── */}
      <CornerDecor position="top-left"     delay={1.2} />
      <CornerDecor position="top-right"    delay={1.3} />
      <CornerDecor position="bottom-left"  delay={1.4} />
      <CornerDecor position="bottom-right" delay={1.5} />

    </motion.section>
  );
}

// ── Décoration coins — filets or dans les coins ───────────────────────────────
interface CornerDecorProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  delay: number;
}

function CornerDecor({ position, delay }: CornerDecorProps) {
  const isTop    = position.startsWith("top");
  const isLeft   = position.endsWith("left");

  return (
    <motion.div
      className={cn(
        "absolute hidden md:block pointer-events-none",
        isTop    ? "top-8 xl:top-12"    : "bottom-8 xl:bottom-12",
        isLeft   ? "left-8 xl:left-12"  : "right-8 xl:right-12",
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.8 }}
      aria-hidden="true"
    >
      <div
        className={cn(
          "w-6 h-6 border-or-champagne/25",
          "border-t border-l",
          isTop    ? "border-t border-l" : "",
          !isTop   ? "border-b border-l" : "",
          !isLeft  ? "border-r"          : "",
          isTop  && !isLeft  ? "border-t border-r border-l-0" : "",
          !isTop && !isLeft  ? "border-b border-r border-l-0" : "",
          !isTop &&  isLeft  ? "border-b border-l border-t-0" : "",
        )}
        style={{
          borderTopWidth:    isTop    ? "1px" : "0",
          borderBottomWidth: !isTop   ? "1px" : "0",
          borderLeftWidth:   isLeft   ? "1px" : "0",
          borderRightWidth:  !isLeft  ? "1px" : "0",
          borderColor: "rgba(185, 154, 95, 0.25)",
        }}
      />
    </motion.div>
  );
}
