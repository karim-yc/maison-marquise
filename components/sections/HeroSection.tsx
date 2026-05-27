"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
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
  // Parallax : le fond descend à 0.25× la vitesse → profondeur premium
  const marbleY  = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  // Le contenu (logo + textes) monte légèrement plus vite → effet de lift
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  useEffect(() => setMounted(true), []);

  const scrollToContent   = () => document.getElementById("adn")?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.section
      ref={sectionRef}
      className={cn(
        "relative w-full overflow-hidden",
        "h-[calc(100dvh-4rem)] md:h-[calc(100dvh-72px)]",
        "flex flex-col items-center justify-center",
        className,
      )}
      style={mounted ? { opacity: sectionOpacity } : undefined}
      aria-label="Accueil du brandbook Maison Marquise"
    >
      {/* Fond terracotta — couleur principale de marque, règle charte §01 */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: marbleY }}
        aria-hidden="true"
      >
        {/* Base terracotta mate */}
        <div className="absolute inset-0" style={{ backgroundColor: "#A84F2A" }} />
        {/* Grain papier mat — texture charte */}
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeBlend in='SourceGraphic' mode='multiply'/%3E%3C/filter%3E%3Crect width='200' height='200' fill='%23A84F2A' filter='url(%23g)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
        {/* Dégradé radial chaud — lumière centrale premium */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(184,120,74,0.25) 0%, rgba(152,58,24,0.30) 60%, rgba(63,20,8,0.45) 100%)",
          }}
        />
      </motion.div>

      {/* ── Bloc central unique — tout ensemble, bien groupé ── */}
      <motion.div
        className="relative z-raised w-full max-w-[min(420px,88vw)] mx-auto px-4 flex flex-col items-center text-center"
        style={mounted ? { y: contentY } : undefined}
      >

        <h1 className="sr-only">Maison Marquise — Brandbook Digital</h1>

        {/* Eyebrow collé au logo — même groupe visuel */}
        <motion.div
          className="inline-flex items-center gap-2 mb-3"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
        >
          <span className="block w-4 h-px" style={{ backgroundColor: "#B8784A", opacity: 0.7 }} aria-hidden="true" />
          <span className="font-sans text-[0.58rem] font-medium tracking-[0.22em] uppercase" style={{ color: "#F4E8D6", opacity: 0.75 }}>
            Identité de marque
          </span>
          <span className="block w-4 h-px" style={{ backgroundColor: "#B8784A", opacity: 0.7 }} aria-hidden="true" />
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
            colorClass="text-[#F8F3EA]"
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
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, #B8784A)" }} />
          <div className="w-1.5 h-1.5 rotate-45 shrink-0" style={{ backgroundColor: "#B8784A", opacity: 0.8 }} />
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, #B8784A)" }} />
        </motion.div>

        {/* Sous-titre */}
        <motion.p
          className="font-serif italic font-light mb-2 text-lg md:text-xl"
          style={{ color: "#F4E8D6", opacity: 0.88 }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6, ease: EASE }}
        >
          Charte graphique à l&apos;usage des graphistes,
          imprimeurs et prestataires.
        </motion.p>


      </motion.div>

      {/* Scroll indicator — ancré en bas */}
      <motion.button
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-colors duration-300"
        style={{ color: "rgba(244,232,214,0.45)" }}
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
