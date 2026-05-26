"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// PackagingSection — Documentation packaging officiel Maison Marquise
// 6 supports documentés à partir des références fournies.
// Ne pas réinventer. Ne pas modifier les formes.
// ─────────────────────────────────────────────────────────────────────────────

const EASE        = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_SPRING = [0.16, 1, 0.3, 1]        as const;

// ── Palette packaging ─────────────────────────────────────────────────────────
const PALETTE = [
  { name: "Terracotta Marquise", hex: "#A84F2A", usage: "Cups terracotta, porte-gobelets, boîte pâtisserie", texture: "Papier mat légèrement grainé" },
  { name: "Crème Maison",        hex: "#F4E8D6", usage: "Cup chaude crème, couvercles, fonds doux", texture: "Papier crème mat, toucher doux" },
  { name: "Blanc Marbre",        hex: "#F8F3EA", usage: "Bande marbre, base claire, détails premium", texture: "Marbre clair, veines beige/gris subtiles" },
  { name: "Cuivre-Or",           hex: "#B8784A", usage: "Logo, filets, dorure, embossage — avec retenue", texture: "Foil cuivre-or légèrement réfléchissant" },
  { name: "Noyer Foncé",         hex: "#4A2E20", usage: "Plateaux bois, mobilier, arrière-plans", texture: "Bois noyer foncé, veinage visible" },
  { name: "Noir Subtil",         hex: "#1F1A17", usage: "Textes, détails fins, contraste", texture: "Noir mat doux" },
] as const;

// ── Règles générales ──────────────────────────────────────────────────────────
const REGLES = [
  "Le packaging doit toujours rester lisible.",
  "Le logo ne doit jamais être caché, déformé ou déplacé.",
  "Les proportions doivent rester fidèles aux références.",
  "Les couleurs ne doivent pas être recolorisées librement.",
  "La terracotta ne doit jamais devenir orange vif.",
  "Le cuivre-or ne doit jamais devenir jaune brillant.",
  "Le marbre doit rester clair, subtil et élégant.",
  "Les finitions doivent rester sobres, premium et réalistes.",
] as const;

// ── À ne jamais faire ─────────────────────────────────────────────────────────
const JAMAIS = [
  "Inventer un paper bag, tote bag ou coffee bean bag.",
  "Créer un nouveau cup ou une nouvelle boîte.",
  "Ajouter un sticker, illustration, doodle ou motif décoratif.",
  "Changer la position ou les proportions du logo.",
  "Utiliser des textures plates sans matière visible.",
  "Surcharger les packagings.",
  "Créer une identité café générique.",
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Composants utilitaires
// ─────────────────────────────────────────────────────────────────────────────
function SectionDivider() {
  return (
    <div className="flex items-center gap-4" aria-hidden="true">
      <div className="flex-1 h-px bg-gris-marbre/50" />
      <div className="w-1 h-1 rotate-45 bg-or-champagne/40" />
      <div className="flex-1 h-px bg-gris-marbre/50" />
    </div>
  );
}

function PackPhoto({
  src, alt, aspect = "4/3", className,
}: { src: string; alt: string; aspect?: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[3px] group", className)}>
      <div style={{ aspectRatio: aspect }} className="relative">
        <Image
          src={src} alt={alt} fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          quality={85}
        />
      </div>
    </div>
  );
}

function RuleTag({ text, variant = "or" }: { text: string; variant?: "or" | "red" }) {
  return (
    <li className="flex items-start gap-2.5">
      {variant === "red"
        ? <X size={11} strokeWidth={2} className="text-framboise shrink-0 mt-0.5" />
        : <span className="mt-1.5 w-1 h-1 rounded-full bg-or-champagne/70 shrink-0" aria-hidden="true" />
      }
      <span className="font-sans text-ui text-gris-texte leading-snug">{text}</span>
    </li>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Carte packaging individuelle
// ─────────────────────────────────────────────────────────────────────────────
interface PackCardProps {
  num: string;
  name: string;
  badge: string;
  usage: string;
  desc: string;
  couleurs: string;
  finitions: string;
  regles: readonly string[];
  photo: string;
  photoAlt: string;
  photo2?: string;
  photo2Alt?: string;
  reverse?: boolean;
  index: number;
}

function PackCard({
  num, name, badge, usage, desc, couleurs, finitions, regles,
  photo, photoAlt, photo2, photo2Alt, reverse = false, index,
}: PackCardProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.05, ease: EASE_SPRING }}
    >
      {/* Image(s) */}
      <div className={cn("space-y-3", reverse && "lg:order-2")}>
        <PackPhoto src={photo} alt={photoAlt} aspect="4/3" />
        {photo2 && (
          <PackPhoto src={photo2} alt={photo2Alt ?? ""} aspect="16/9" />
        )}
      </div>

      {/* Texte */}
      <div className={cn("space-y-5", reverse && "lg:order-1")}>
        {/* Titre */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="font-serif font-light text-gris-marbre/35 text-2xl leading-none select-none" aria-hidden="true">
              {num}
            </span>
            <span className="font-sans text-[0.55rem] font-medium tracking-[0.18em] uppercase text-or-champagne/80 border border-or-champagne/30 px-2 py-0.5 rounded-[2px]">
              {badge}
            </span>
          </div>
          <h3
            className="font-serif font-light text-noir-marquise leading-tight"
            style={{ fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)" }}
          >
            {name}
          </h3>
          <div className="h-px w-10 mt-3" style={{ background: "linear-gradient(90deg, #B99A5F, transparent)" }} aria-hidden="true" />
        </div>

        {/* Description */}
        <p className="font-sans text-body-lg text-gris-texte leading-relaxed">{desc}</p>

        {/* Specs compactes */}
        <div className="space-y-2 border-l-2 border-gris-marbre/40 pl-4">
          <div>
            <span className="label-mm text-gris-texte/40">Usage</span>
            <p className="font-sans text-[0.72rem] text-gris-texte mt-0.5">{usage}</p>
          </div>
          <div>
            <span className="label-mm text-gris-texte/40">Couleurs</span>
            <p className="font-sans text-[0.72rem] text-gris-texte mt-0.5">{couleurs}</p>
          </div>
          <div>
            <span className="label-mm text-gris-texte/40">Finitions</span>
            <p className="font-sans text-[0.72rem] text-gris-texte mt-0.5">{finitions}</p>
          </div>
        </div>

        {/* Règles */}
        <div>
          <span className="label-mm text-gris-texte/45 block mb-2">Règles d&apos;usage</span>
          <ul className="space-y-1.5">
            {regles.map(r => <RuleTag key={r} text={r} />)}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION PRINCIPALE
// ─────────────────────────────────────────────────────────────────────────────
export function PackagingSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);
  const reglesRef  = useRef<HTMLDivElement>(null);
  const headerIn   = useInView(headerRef, { once: true, margin: "-80px 0px" });
  const paletteIn  = useInView(paletteRef, { once: true, margin: "-60px 0px" });
  const reglesIn   = useInView(reglesRef, { once: true, margin: "-60px 0px" });

  return (
    <section
      id="packaging"
      className="relative w-full scroll-mt-16 md:scroll-mt-[72px] bg-ivoire-maison overflow-hidden"
      aria-labelledby="packaging-title"
    >
      <div className="line-gold w-full" aria-hidden="true" />

      <div className="container-mm py-section space-y-16 md:space-y-24">

        {/* ══ EN-TÊTE ══════════════════════════════════════════════════ */}
        <div ref={headerRef}>
          <motion.span
            className="label-mm text-gris-texte block mb-4"
            initial={{ opacity: 0, y: -8 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Packaging officiel
          </motion.span>

          <div className="flex items-start gap-5">
            <motion.span
              className="font-serif font-light text-gris-marbre/25 leading-none shrink-0 select-none hidden sm:block"
              style={{ fontSize: "clamp(5rem, 12vw, 9rem)" }}
              initial={{ opacity: 0, x: -24 }}
              animate={headerIn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.05, ease: EASE }}
              aria-hidden="true"
            >
              05
            </motion.span>

            <div className="flex-1 pt-1 md:pt-3">
              <motion.span
                className="font-serif font-light text-gris-marbre/30 leading-none select-none block sm:hidden mb-2"
                style={{ fontSize: "clamp(3rem, 10vw, 4rem)" }}
                initial={{ opacity: 0 }}
                animate={headerIn ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: EASE }}
                aria-hidden="true"
              >
                05
              </motion.span>

              <motion.h2
                id="packaging-title"
                className="font-serif font-light text-noir-marquise leading-none text-balance"
                style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
                initial={{ opacity: 0, y: 18 }}
                animate={headerIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE_SPRING }}
              >
                Packaging &amp; coffee time
              </motion.h2>

              <motion.div
                className="h-px mt-5"
                style={{ background: "linear-gradient(90deg, #B99A5F, transparent)", transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                animate={headerIn ? { scaleX: 1 } : {}}
                transition={{ duration: 1.1, delay: 0.3, ease: EASE_SPRING }}
                aria-hidden="true"
              />

              <motion.p
                className="mt-6 font-sans text-body-lg text-gris-texte leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 12 }}
                animate={headerIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
              >
                Chaque support prolonge l&apos;expérience Maison Marquise. De la cup terracotta
                à la boîte pâtisserie, le packaging est premium par la matière, la lumière,
                la précision et la retenue — jamais par la surcharge.
              </motion.p>
            </div>
          </div>
        </div>

        {/* ══ 01 — CUP CHAUDE TERRACOTTA ═══════════════════════════════ */}
        <PackCard
          index={0}
          num="01"
          name="Cup chaude terracotta"
          badge="Coffee time · Chaud"
          usage="Café, latte, cappuccino, boissons chaudes signature"
          desc="Cup chaude premium avec corps terracotta mat, couvercle blanc crème et base crème. Logo Maison Marquise centré en cuivre-or. Papier mat légèrement grainé, rendu premium et chaleureux."
          couleurs="Terracotta #A84F2A · Crème #F4E8D6 · Cuivre-Or #B8784A"
          finitions="Papier mat terracotta grainé · Logo cuivre-or · Couvercle crème"
          regles={[
            "Logo centré, lisible et élégant.",
            "La terracotta reste chaude, profonde et mate — jamais orange vif.",
            "Pas d'illustration, motif ou décor supplémentaire.",
          ]}
          photo="/assets/packaging2/cup-terracotta-single.jpg"
          photoAlt="Cup chaude terracotta Maison Marquise sur comptoir marbre"
          photo2="/assets/packaging2/cup-terracotta-duo.jpg"
          photo2Alt="Duo de cups terracotta Maison Marquise sur plateau bois"
        />

        <SectionDivider />

        {/* ══ 02 — CUP CHAUDE CRÈME ═══════════════════════════════════ */}
        <PackCard
          index={1}
          num="02"
          name="Cup chaude crème"
          badge="Coffee time · Lifestyle"
          usage="Latte, café crème, boissons chaudes premium, service lifestyle"
          desc="Cup chaude élégante en crème chaud avec logo Maison Marquise centré et filet cuivre-or fin vers la base. Papier crème mat, toucher doux. Rendu minimal et raffiné."
          couleurs="Crème #F4E8D6 · Cuivre-Or #B8784A · Noir Subtil #1F1A17"
          finitions="Papier crème mat · Filet cuivre-or · Logo cuivre-or"
          regles={[
            "La cup crème reste très sobre.",
            "Pas de bande terracotta, motif ou sticker.",
            "Logo visible, centré, sans ajout.",
          ]}
          photo="/assets/packaging2/cup-creme-main.jpg"
          photoAlt="Cup chaude crème Maison Marquise tenue en mains"
          reverse
        />

        <SectionDivider />

        {/* ══ 03 — CUP TRANSPARENTE ICED LATTE ═══════════════════════ */}
        <PackCard
          index={2}
          num="03"
          name="Cup transparente — Iced latte"
          badge="Coffee time · Glacé"
          usage="Iced latte, café glacé lacté, boissons froides premium"
          desc="Cup transparente avec couvercle dôme clair. Logo centré, boisson visible en couches crème et café. Condensation naturelle, glaçons visibles. Rendu frais, artisanal et premium."
          couleurs="Transparent · Crème lacteé · Brun café · Noir Subtil #1F1A17"
          finitions="Plastique transparent brillant · Reflets réalistes · Condensation naturelle"
          regles={[
            "Pas de sleeve, sticker ou étiquette.",
            "Ne pas cacher le logo avec la paille ou les glaçons.",
            "La boisson reste naturelle et appétissante.",
          ]}
          photo="/assets/packaging2/cup-transparente-iced-latte.jpg"
          photoAlt="Cup transparente iced latte Maison Marquise tenue en main"
        />

        <SectionDivider />

        {/* ══ 04 — CUP TRANSPARENTE MATCHA LATTE ═════════════════════ */}
        <PackCard
          index={3}
          num="04"
          name="Cup transparente — Matcha latte"
          badge="Coffee time · Signature"
          usage="Matcha latte glacé, boissons signature froides"
          desc="Cup transparente avec couvercle dôme. Logo centré, boisson visible avec couches vert matcha, crème et café. Effet marbré naturel de la boisson. Rendu frais, artisanal et premium."
          couleurs="Transparent · Vert matcha naturel · Crème · Brun café"
          finitions="Plastique transparent brillant · Condensation · Mélange naturel visible"
          regles={[
            "Pas d'étiquette, illustration ou couleur artificielle.",
            "Le mélange reste naturel, réaliste et élégant.",
            "Ne pas transformer la forme du cup.",
          ]}
          photo="/assets/packaging2/cup-transparente-matcha.jpg"
          photoAlt="Cup transparente matcha latte Maison Marquise tenue en main"
          reverse
        />

        <SectionDivider />

        {/* ══ 05 — PORTE-GOBELETS ══════════════════════════════════════ */}
        <PackCard
          index={4}
          num="05"
          name="Porte-gobelets terracotta"
          badge="Transport · Premium"
          usage="Transport premium de deux cups Maison Marquise"
          desc="Porte-gobelets premium terracotta pour deux boissons. Poignée ovale découpée, silhouette arrondie, finition mate. Marquage Maison Marquise sobre et élégant en cuivre-or."
          couleurs="Terracotta #A84F2A · Cuivre-Or #B8784A · Crème #F4E8D6"
          finitions="Carton rigide mat terracotta · Grainé · Détail cuivre-or"
          regles={[
            "Respecter la silhouette existante.",
            "Ne pas transformer en sac ou changer les poignées.",
            "Ne pas modifier la forme ni les proportions.",
          ]}
          photo="/assets/packaging2/porte-gobelets.jpg"
          photoAlt="Porte-gobelets terracotta Maison Marquise avec deux cups"
        />

        <SectionDivider />

        {/* ══ 06 — BOÎTE PÂTISSERIE ═══════════════════════════════════ */}
        <PackCard
          index={5}
          num="06"
          name="Boîte pâtisserie terracotta"
          badge="Cadeau · Premium"
          usage="Pâtisseries premium, viennoiseries, coffrets Maison Marquise"
          desc="Boîte pâtisserie premium terracotta avec logo Maison Marquise embossé cuivre-or. Carton rigide mat, texture fine. Rendu premium, architectural et cadeau."
          couleurs="Terracotta #A84F2A · Cuivre-Or #B8784A · Noir Subtil #1F1A17"
          finitions="Carton rigide mat terracotta · Embossage cuivre-or · Texture fine"
          regles={[
            "Logo sobre, centré et lisible.",
            "Pas de modification des proportions.",
            "Pas d'illustrations ou motifs décoratifs.",
          ]}
          photo="/assets/packaging2/boite-terracotta.jpg"
          photoAlt="Boîte pâtisserie terracotta Maison Marquise sur fond pierre"
          reverse
        />

        <SectionDivider />

        {/* ══ PALETTE COULEURS PACKAGING ═══════════════════════════════ */}
        <motion.div
          ref={paletteRef}
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={paletteIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_SPRING }}
        >
          <div>
            <span className="label-mm text-gris-texte block mb-1">Codes couleurs</span>
            <h3
              className="font-serif font-light text-noir-marquise"
              style={{ fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)" }}
            >
              Palette officielle packaging
            </h3>
            <div className="h-px w-10 mt-3" style={{ background: "linear-gradient(90deg, #B99A5F, transparent)" }} aria-hidden="true" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {PALETTE.map((c) => (
              <div key={c.name} className="flex flex-col rounded-[3px] overflow-hidden border border-gris-marbre bg-blanc-marbre">
                <div className="h-16 w-full shrink-0" style={{ backgroundColor: c.hex }} aria-hidden="true" />
                <div className="flex-1 p-3 space-y-1.5">
                  <p className="font-sans text-[0.65rem] font-semibold text-noir-marquise leading-snug">{c.name}</p>
                  <p className="font-mono text-[0.58rem] text-gris-texte/60">{c.hex}</p>
                  <p className="font-sans text-[0.58rem] text-gris-texte/55 leading-snug">{c.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>


        {/* ══ CONCLUSION ════════════════════════════════════════════ */}
        <motion.blockquote
          className="relative"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="border-l-2 border-or-champagne/40 pl-6">
            <p
              className="font-serif italic font-light text-noir-marquise text-balance"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
            >
              Le packaging Maison Marquise est premium par la matière, la lumière,
              la précision et la retenue — jamais par la surcharge.
            </p>
            <p className="mt-3 label-mm text-or-champagne tracking-[0.25em]">
              Règle d&apos;or · Maison Marquise
            </p>
          </div>
        </motion.blockquote>

      </div>

      <div className="line-gold w-full" aria-hidden="true" />
    </section>
  );
}
