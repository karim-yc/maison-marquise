"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// PackagingSection — Packaging & coffee time Maison Marquise
//
// Structure :
//   · En-tête
//   · Hero Écrin Marquise (pleine largeur)
//   · Grille Coffee time chaud (3 cartes)
//   · Grille Coffee time glacé (2 cartes)
//   · Principes transversaux
// ─────────────────────────────────────────────────────────────────────────────

const EASE        = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_SPRING = [0.16, 1, 0.3, 1]        as const;

// ─────────────────────────────────────────────────────────────────────────────
// Hero — Écrin Marquise (grande image + texte côte à côte)
// ─────────────────────────────────────────────────────────────────────────────
function EcrinHero() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[3px] overflow-hidden border border-gris-marbre"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE_SPRING }}
    >
      {/* Image */}
      <div className="relative h-64 sm:h-80 lg:h-full min-h-[360px]">
        <Image
          src="/assets/packaging/box_16x16.jpg"
          alt="Écrin Marquise — boîte pâtissière ivoire, marbre et or champagne"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          quality={85}
          priority
        />
      </div>

      {/* Texte */}
      <div className="bg-blanc-marbre flex flex-col justify-center px-8 md:px-12 py-10 md:py-14 gap-6">
        <div>
          <span className="label-mm text-gris-texte/60">Packaging cadeau</span>
          <h3
            className="font-serif font-light text-noir-marquise mt-2 leading-tight"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
          >
            Écrin Marquise
          </h3>
          <div
            className="h-px mt-4 w-16"
            style={{ background: "linear-gradient(90deg, #B99A5F, transparent)" }}
            aria-hidden="true"
          />
        </div>

        <p className="font-sans text-body-lg text-gris-texte leading-relaxed max-w-sm">
          L&apos;écrin signature des créations Maison Marquise. Une boîte ivoire,
          soulignée de marbre et d&apos;or champagne, pensée pour transformer chaque
          pâtisserie en cadeau.
        </p>

        <div>
          <p className="label-mm text-gris-texte/50 mb-2">Usages</p>
          <p className="font-sans text-ui text-gris-texte">
            Entremets · Macarons · Coffrets · Pâtisseries individuelles
          </p>
        </div>

        <div className="inline-flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-or-champagne" aria-hidden="true" />
          <span className="font-sans text-[0.65rem] font-medium tracking-[0.18em] uppercase text-or-champagne">
            Premium cadeau
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Carte packaging générique
// ─────────────────────────────────────────────────────────────────────────────
interface PackagingCardProps {
  image:      string;
  imageAlt:   string;
  category:   string;
  name:       string;
  text:       string;
  usages:     string;
  badge:      string;
  index:      number;
  tall?:      boolean;   // image plus haute
}

function PackagingCard({
  image, imageAlt, category, name, text, usages, badge, index, tall,
}: PackagingCardProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.article
      ref={ref}
      className="flex flex-col rounded-[3px] overflow-hidden border border-gris-marbre bg-blanc-marbre group hover:shadow-md hover:border-or-champagne/30 transition-all duration-500"
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE_SPRING }}
    >
      {/* Image */}
      <div className={cn("relative overflow-hidden", tall ? "h-72 sm:h-80" : "h-56 sm:h-64")}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          quality={80}
        />
        {/* Badge en overlay */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-[2px] bg-noir-marquise/70 backdrop-blur-sm font-sans text-[0.52rem] font-medium tracking-[0.15em] uppercase text-ivoire-maison/90">
            {category}
          </span>
        </div>
      </div>

      {/* Texte */}
      <div className="flex flex-col gap-3 p-5 md:p-6 flex-1">
        <div>
          <h3 className="font-serif text-d-sm font-light text-noir-marquise leading-snug">
            {name}
          </h3>
          <div
            className="h-px mt-2 w-10 group-hover:w-20 transition-all duration-500"
            style={{ background: "linear-gradient(90deg, #B99A5F, transparent)" }}
            aria-hidden="true"
          />
        </div>

        <p className="font-sans text-ui text-gris-texte leading-relaxed flex-1">
          {text}
        </p>

        <div className="pt-3 border-t border-gris-marbre/60 space-y-2">
          <p className="label-mm text-gris-texte/45">Usages</p>
          <p className="font-sans text-[0.72rem] text-gris-texte">{usages}</p>
          <div className="inline-flex items-center gap-1.5 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-or-champagne/60" aria-hidden="true" />
            <span className="font-sans text-[0.6rem] tracking-[0.14em] uppercase text-or-champagne/70">
              {badge}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Principes transversaux
// ─────────────────────────────────────────────────────────────────────────────
const PRINCIPLES = [
  { n: "01", title: "Lisibilité immédiate",    text: "Le logo identifiable en moins de deux secondes sur chaque support." },
  { n: "02", title: "Cohérence des matières",  text: "Ivoire, noir, or champagne et marbre — les codes permanents de la marque." },
  { n: "03", title: "Expérience en main",      text: "Chaque support est pensé pour être beau à tenir, à offrir et à photographier." },
  { n: "04", title: "Sobriété premium",        text: "Un élément fort par support. La simplicité reste la signature Maison Marquise." },
] as const;

function PrinciplesPanel() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className="rounded-[3px] overflow-hidden border border-or-champagne/15 bg-noir-marquise"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent, #B99A5F 30%, #B99A5F 70%, transparent)" }}
        aria-hidden="true"
      />
      <div className="px-6 md:px-10 py-8 md:py-10">
        <div className="mb-8">
          <span className="label-mm text-gris-marbre/40">Direction artistique</span>
          <h3
            className="font-serif font-light text-ivoire-maison mt-1"
            style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
          >
            Principes transversaux
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.n}
              className="flex gap-4"
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: EASE }}
            >
              <span className="font-serif font-light text-or-champagne/30 text-xl leading-none shrink-0 w-6 text-right mt-0.5">
                {p.n}
              </span>
              <div>
                <p className="font-sans text-ui font-medium text-ivoire-maison/90">{p.title}</p>
                <p className="font-sans text-[0.78rem] text-gris-marbre/55 leading-relaxed mt-1">{p.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent, #B99A5F 30%, #B99A5F 70%, transparent)" }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION PRINCIPALE
// ─────────────────────────────────────────────────────────────────────────────
export function PackagingSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerIn  = useInView(headerRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      id="packaging"
      className="relative w-full scroll-mt-16 md:scroll-mt-[72px] bg-ivoire-maison overflow-hidden"
      aria-labelledby="packaging-title"
    >
      <div className="line-gold w-full" aria-hidden="true" />

      <div className="container-mm py-section relative">

        {/* ══ EN-TÊTE ══════════════════════════════════════════════════ */}
        <div ref={headerRef} className="mb-14 md:mb-20 max-w-2xl">
          <motion.span
            className="label-mm text-gris-texte"
            initial={{ opacity: 0, y: -8 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Packaging officiel
          </motion.span>

          <div className="flex items-start gap-4 mt-3">
            <motion.span
              className="font-serif font-light text-gris-marbre/35 leading-none shrink-0 select-none"
              style={{ fontSize: "clamp(4rem, 10vw, 7rem)" }}
              initial={{ opacity: 0, x: -20 }}
              animate={headerIn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
              aria-hidden="true"
            >
              05
            </motion.span>
            <div className="pt-1 md:pt-2">
              <motion.h2
                id="packaging-title"
                className="font-serif font-light text-noir-marquise text-balance leading-none"
                style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={headerIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.12, ease: EASE_SPRING }}
              >
                Packaging &amp; coffee time
              </motion.h2>
              <motion.div
                className="h-px mt-4"
                style={{ background: "linear-gradient(90deg, #B99A5F, transparent)", transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                animate={headerIn ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.3, ease: EASE_SPRING }}
                aria-hidden="true"
              />
            </div>
          </div>

          <motion.p
            className="mt-6 font-sans text-body-lg text-gris-texte leading-relaxed max-w-reading"
            initial={{ opacity: 0, y: 12 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          >
            Chaque support prolonge l&apos;expérience Maison Marquise. De la boîte pâtissière
            à la cup de café, le packaging devient un signe de reconnaissance : sobre,
            premium, gourmand et pensé pour être vu, tenu, offert et partagé.
          </motion.p>
        </div>

        {/* ══ BLOC 1 — ÉCRIN MARQUISE ══════════════════════════════════ */}
        <div className="mb-10 md:mb-14">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="h-px w-6 bg-or-champagne/50" aria-hidden="true" />
            <span className="label-mm text-gris-texte/60 tracking-[0.22em]">Packaging cadeau</span>
          </motion.div>
          <EcrinHero />
        </div>

        {/* ══ BLOC 2 — COFFEE TIME CHAUD ══════════════════════════════ */}
        <div className="mb-10 md:mb-14">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="h-px w-6 bg-or-champagne/50" aria-hidden="true" />
            <span className="label-mm text-gris-texte/60 tracking-[0.22em]">Coffee time — chaud</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            <PackagingCard
              index={0}
              image="/assets/packaging/cup_coffee_v2.jpg"
              imageAlt="Cup Maison sur fond carrelage vert"
              category="Coffee time"
              name="Cup Maison"
              text="La cup du quotidien Maison Marquise : sobre, claire et reconnaissable. Le monogramme M, le filet or et la base marbre signent une pause chaude simple, élégante et premium."
              usages="Café · Espresso · Americano · Thé · Boissons chaudes classiques"
              badge="Quotidien premium"
              tall
            />
            <PackagingCard
              index={1}
              image="/assets/packaging/cup_coffee.jpg"
              imageAlt="Duo de cups Maison Marquise sur support bois"
              category="Coffee time"
              name="Duo Coffee Time"
              text="Le packaging chaud pensé pour accompagner les moments de pause. Sur bois clair, l&apos;ivoire et l&apos;or champagne renforcent l&apos;univers chaleureux, naturel et premium de Maison Marquise."
              usages="Café · Cappuccino · Chocolat chaud · Boissons chaudes à emporter"
              badge="Chaleureux & élégant"
              tall
            />
            <PackagingCard
              index={2}
              image="/assets/packaging/cup_latte.jpg"
              imageAlt="Latte Signature tenu en main, cup dorée"
              category="Coffee time"
              name="Latte Signature"
              text="Une version plus affirmée et lifestyle de la cup chaude. Sa teinte dorée évoque le caramel, le latte et la gourmandise, tout en gardant une présence élégante en main."
              usages="Latte · Cappuccino · Flat white · Chocolat chaud · Boissons gourmandes"
              badge="Lifestyle premium"
              tall
            />
          </div>
        </div>

        {/* ══ BLOC 3 — COFFEE TIME GLACÉ ══════════════════════════════ */}
        <div className="mb-14 md:mb-20">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="h-px w-6 bg-or-champagne/50" aria-hidden="true" />
            <span className="label-mm text-gris-texte/60 tracking-[0.22em]">Coffee time — glacé</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <PackagingCard
              index={0}
              image="/assets/packaging/cup_iced_coffee.jpg"
              imageAlt="Iced Coffee Signature tenu en main, fond caramel"
              category="Glacé"
              name="Iced Coffee Signature"
              text="La version fraîche et urbaine du coffee time Maison Marquise. Le café se dévoile à travers le transparent, tandis que le bandeau ivoire-marbre garde l&apos;élégance de la marque."
              usages="Iced coffee · Cold brew · Café glacé"
              badge="Moderne & lifestyle"
              tall
            />
            <PackagingCard
              index={1}
              image="/assets/packaging/cup_iced_latte.jpg"
              imageAlt="Iced Latte Marquise tenu en main, fond gris clair"
              category="Glacé"
              name="Iced Latte Marquise"
              text="Une cup transparente pensée pour sublimer les boissons gourmandes. Les couches de lait et de café deviennent visibles, créant un effet généreux, frais et très identifiable."
              usages="Iced latte · Iced latte macchiato · Boissons lactées froides"
              badge="Gourmand & lumineux"
              tall
            />
          </div>
        </div>

        {/* ══ PRINCIPES TRANSVERSAUX ══════════════════════════════════ */}
        <PrinciplesPanel />

      </div>

      <div className="line-gold w-full" aria-hidden="true" />
    </section>
  );
}
