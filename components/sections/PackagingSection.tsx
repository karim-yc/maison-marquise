"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// PackagingSection — Direction artistique packaging Maison Marquise
//
// Quatre mockups HTML/CSS inline — aucune image externe.
// Chaque mockup est un composant SVG + CSS autonome.
// ─────────────────────────────────────────────────────────────────────────────

const EASE        = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_SPRING = [0.16, 1, 0.3, 1]        as const;

// ── Données des 4 packagings ──────────────────────────────────────────────────
const ITEMS = [
  {
    id:      "cup-coffee",
    index:   "01",
    name:    "Cup Coffee",
    tagline: "Une pause préparée avec soin",
    desc:    "Sobre, quotidien premium. La cup de tous les jours — reconnaissable au premier regard.",
    usage:   "Café, espresso, americano, boissons chaudes standard",
    colors:  [
      { hex: "#F7F3EC", label: "Ivoire Maison" },
      { hex: "#111111", label: "Noir Marquise" },
      { hex: "#B99A5F", label: "Or Champagne" },
    ],
    finish:  "Impression offset · Vernis satiné",
    level:   "Quotidien premium",
    levelColor: "#B99A5F",
  },
  {
    id:      "cup-latte",
    index:   "02",
    name:    "Cup Latte",
    tagline: "Le goût d'une pause douce",
    desc:    "Chaleur caramel et courbe douce. La cup du coffee time — chaude, gourmande, reconnaissable.",
    usage:   "Latte, cappuccino, flat white, chocolat chaud",
    colors:  [
      { hex: "#C7843E", label: "Caramel Pâtissier" },
      { hex: "#6F5A2E", label: "Brun Marquis" },
      { hex: "#F7F3EC", label: "Ivoire Maison" },
    ],
    finish:  "Impression flexo · Finition mate douce",
    level:   "Coffee premium",
    levelColor: "#C7843E",
  },
  {
    id:      "cup-iced",
    index:   "03",
    name:    "Cup Transparent",
    tagline: "Maison Marquise",
    desc:    "Fraîcheur et modernité. La boisson visible à travers le cup — effet premium, approche saisonnière.",
    usage:   "Iced latte, cold brew, cocktails, limonades",
    colors:  [
      { hex: "#FAFAF8", label: "Transparent givré" },
      { hex: "#B99A5F", label: "Or Champagne" },
      { hex: "#6F5A2E", label: "Brun Doré" },
    ],
    finish:  "PET transparent · Impression sérigraphie · Bande dépoli",
    level:   "Saisonnier premium",
    levelColor: "#9A9B55",
  },
  {
    id:      "box-patisserie",
    index:   "04",
    name:    "Boîte Pâtissière 16×16",
    tagline: "Préparé avec soin pour vous",
    desc:    "L'écrin de la création. Ivoire mat, or discret, signature Marquise. Le packaging qui fait l'occasion.",
    usage:   "Macarons, petits fours, pâtisseries individuelles, coffrets cadeaux",
    colors:  [
      { hex: "#F7F3EC", label: "Ivoire mat" },
      { hex: "#B99A5F", label: "Or Champagne" },
      { hex: "#111111", label: "Noir Marquise" },
    ],
    finish:  "Carton 350g · Ivoire mat · Dorure à chaud or champagne",
    level:   "Premium cadeau",
    levelColor: "#B99A5F",
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// MOCKUPS SVG/CSS — un par packaging
// ─────────────────────────────────────────────────────────────────────────────

// ── Cup Coffee ────────────────────────────────────────────────────────────────
function CupCoffeeMockup() {
  return (
    <svg
      viewBox="0 0 200 260"
      className="w-full h-auto drop-shadow-lg"
      aria-label="Mockup cup coffee Maison Marquise"
      style={{ filter: "drop-shadow(0 12px 24px rgba(17,17,17,0.12))" }}
    >
      <defs>
        <linearGradient id="cc-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#EDE8DF" />
          <stop offset="50%"  stopColor="#F7F3EC" />
          <stop offset="100%" stopColor="#E8E2D8" />
        </linearGradient>
        <linearGradient id="cc-lid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#2A2724" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
        <linearGradient id="cc-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="rgba(17,17,17,0)" />
          <stop offset="100%" stopColor="rgba(17,17,17,0.08)" />
        </linearGradient>
      </defs>

      {/* Ombre portée */}
      <ellipse cx="100" cy="255" rx="52" ry="5" fill="rgba(17,17,17,0.10)" />

      {/* Corps du cup */}
      <path
        d="M 52 60 L 42 228 Q 42 238 100 238 Q 158 238 158 228 L 148 60 Z"
        fill="url(#cc-body)"
      />

      {/* Ombre intérieure droite */}
      <path
        d="M 148 60 L 158 228 Q 158 238 130 238 L 148 228 Z"
        fill="rgba(17,17,17,0.045)"
      />

      {/* Reflet gauche */}
      <path
        d="M 62 68 L 55 200 Q 55 210 65 213 L 70 213 L 75 68 Z"
        fill="rgba(255,255,255,0.35)"
      />

      {/* Couvercle */}
      <ellipse cx="100" cy="62" rx="52" ry="10" fill="url(#cc-lid)" />
      <path
        d="M 55 62 Q 100 58 145 62 Q 100 67 55 62"
        fill="rgba(255,255,255,0.08)"
      />
      {/* Bouton couvercle */}
      <ellipse cx="100" cy="52" rx="20" ry="5" fill="#1A1816" />
      <ellipse cx="100" cy="50" rx="16" ry="3.5" fill="#2A2724" />
      {/* Encoche de buvette */}
      <path d="M 82 60 Q 100 55 118 60" stroke="#0A0A0A" strokeWidth="1.5" fill="none" />

      {/* Logo textuel — Maison Marquise */}
      <text
        x="100" y="130"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="11"
        fontWeight="400"
        fontStyle="italic"
        fill="#111111"
        opacity="0.85"
        letterSpacing="0.3"
      >
        Maison Marquise
      </text>

      {/* Filet or */}
      <line x1="68" y1="137" x2="132" y2="137" stroke="#B99A5F" strokeWidth="0.6" opacity="0.7" />

      {/* Tagline */}
      <text
        x="100" y="150"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="5.5"
        fontWeight="500"
        fill="#111111"
        opacity="0.40"
        letterSpacing="1.2"
      >
        UNE PAUSE PRÉPARÉE AVEC SOIN
      </text>

      {/* Monogramme fantôme bas */}
      <text
        x="100" y="210"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="38"
        fontWeight="300"
        fontStyle="italic"
        fill="#111111"
        opacity="0.04"
        letterSpacing="-1"
      >
        M
      </text>

      {/* Filet or bas du cup */}
      <line x1="50" y1="218" x2="150" y2="218" stroke="#B99A5F" strokeWidth="0.5" opacity="0.25" />
    </svg>
  );
}

// ── Cup Latte ─────────────────────────────────────────────────────────────────
function CupLatteMockup() {
  return (
    <svg
      viewBox="0 0 200 260"
      className="w-full h-auto"
      aria-label="Mockup cup latte Maison Marquise"
      style={{ filter: "drop-shadow(0 12px 28px rgba(111,90,46,0.20))" }}
    >
      <defs>
        <linearGradient id="cl-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#A86A28" />
          <stop offset="45%"  stopColor="#C7843E" />
          <stop offset="100%" stopColor="#9A5E20" />
        </linearGradient>
        <linearGradient id="cl-top" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#8C5225" />
          <stop offset="50%"  stopColor="#A8682E" />
          <stop offset="100%" stopColor="#7A4820" />
        </linearGradient>
        <linearGradient id="cl-wave" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="rgba(247,243,236,0.28)" />
          <stop offset="100%" stopColor="rgba(247,243,236,0.05)" />
        </linearGradient>
        <clipPath id="cl-clip">
          <path d="M 52 60 L 42 228 Q 42 238 100 238 Q 158 238 158 228 L 148 60 Z" />
        </clipPath>
      </defs>

      {/* Ombre portée */}
      <ellipse cx="100" cy="255" rx="52" ry="5" fill="rgba(111,90,46,0.15)" />

      {/* Corps */}
      <path
        d="M 52 60 L 42 228 Q 42 238 100 238 Q 158 238 158 228 L 148 60 Z"
        fill="url(#cl-body)"
      />

      {/* Courbe café/crème — motif signature */}
      <g clipPath="url(#cl-clip)">
        <path
          d="M 30 155 Q 60 135 100 148 Q 140 161 170 142 L 170 238 Q 42 238 30 238 Z"
          fill="url(#cl-wave)"
        />
        {/* Deuxième courbe plus subtile */}
        <path
          d="M 30 175 Q 65 158 100 170 Q 135 182 170 165 L 170 200 Q 65 200 30 200 Z"
          fill="rgba(247,243,236,0.10)"
        />
      </g>

      {/* Reflet gauche */}
      <path
        d="M 60 68 L 52 200 Q 52 210 62 212 L 67 212 L 72 68 Z"
        fill="rgba(255,255,255,0.15)"
      />

      {/* Couvercle brun */}
      <ellipse cx="100" cy="62" rx="52" ry="10" fill="#6F5A2E" />
      <ellipse cx="100" cy="60" rx="48" ry="7" fill="#8C7240" />
      <ellipse cx="100" cy="58" rx="20" ry="4" fill="#6F5A2E" />
      <ellipse cx="100" cy="56.5" rx="16" ry="3" fill="#7A6232" />
      <path d="M 82 60 Q 100 56 118 60" stroke="#4A3A1A" strokeWidth="1.5" fill="none" />

      {/* Logo ivoire */}
      <text
        x="100" y="126"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="11"
        fontWeight="400"
        fontStyle="italic"
        fill="#F7F3EC"
        opacity="0.9"
        letterSpacing="0.3"
      >
        Maison Marquise
      </text>

      {/* Filet or champagne */}
      <line x1="65" y1="133" x2="135" y2="133" stroke="#B99A5F" strokeWidth="0.7" opacity="0.8" />

      {/* Tagline ivoire */}
      <text
        x="100" y="146"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="5"
        fontWeight="500"
        fill="#F7F3EC"
        opacity="0.45"
        letterSpacing="1.2"
      >
        LE GOÛT D'UNE PAUSE DOUCE
      </text>

      {/* Monogramme or fantôme */}
      <text
        x="100" y="210"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="40"
        fontWeight="300"
        fontStyle="italic"
        fill="#B99A5F"
        opacity="0.07"
      >
        M
      </text>
    </svg>
  );
}

// ── Cup Transparent Iced ──────────────────────────────────────────────────────
function CupIcedMockup() {
  return (
    <svg
      viewBox="0 0 200 280"
      className="w-full h-auto"
      aria-label="Mockup cup transparent iced latte Maison Marquise"
      style={{ filter: "drop-shadow(0 14px 30px rgba(17,17,17,0.14))" }}
    >
      <defs>
        <linearGradient id="ci-drink" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#D4A96A" stopOpacity="0.55" />
          <stop offset="40%"  stopColor="#C7843E" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#8C5C28" stopOpacity="0.60" />
        </linearGradient>
        <linearGradient id="ci-band" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="rgba(247,243,236,0.65)" />
          <stop offset="50%"  stopColor="rgba(199,132,62,0.40)" />
          <stop offset="100%" stopColor="rgba(111,90,46,0.50)" />
        </linearGradient>
        <linearGradient id="ci-glass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.20)" />
          <stop offset="30%"  stopColor="rgba(255,255,255,0.06)" />
          <stop offset="70%"  stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
        </linearGradient>
        <clipPath id="ci-clip">
          <path d="M 55 55 L 45 240 Q 45 250 100 250 Q 155 250 155 240 L 145 55 Z" />
        </clipPath>
        <filter id="ci-blur">
          <feGaussianBlur stdDeviation="0.8" />
        </filter>
      </defs>

      {/* Ombre portée */}
      <ellipse cx="100" cy="267" rx="50" ry="5" fill="rgba(17,17,17,0.12)" />

      {/* Boisson visible — fond caramel translucide */}
      <path
        d="M 55 55 L 45 240 Q 45 250 100 250 Q 155 250 155 240 L 145 55 Z"
        fill="url(#ci-drink)"
      />

      {/* Glaçons */}
      <g clipPath="url(#ci-clip)">
        {/* Glaçon 1 */}
        <rect x="62" y="72" width="22" height="18" rx="2" fill="rgba(255,255,255,0.42)" transform="rotate(-8 73 81)" />
        <rect x="62" y="72" width="22" height="18" rx="2" fill="none" stroke="rgba(255,255,255,0.20)" strokeWidth="0.5" transform="rotate(-8 73 81)" />
        {/* Reflet glaçon 1 */}
        <rect x="64" y="74" width="8" height="4" rx="1" fill="rgba(255,255,255,0.25)" transform="rotate(-8 73 81)" />

        {/* Glaçon 2 */}
        <rect x="112" y="78" width="25" height="20" rx="2" fill="rgba(255,255,255,0.38)" transform="rotate(6 124 88)" />
        <rect x="112" y="78" width="25" height="20" rx="2" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" transform="rotate(6 124 88)" />
        <rect x="114" y="80" width="9" height="4" rx="1" fill="rgba(255,255,255,0.22)" transform="rotate(6 124 88)" />

        {/* Glaçon 3 — partiellement visible */}
        <rect x="78" y="95" width="18" height="14" rx="2" fill="rgba(255,255,255,0.30)" transform="rotate(-3 87 102)" />
        <rect x="78" y="95" width="18" height="14" rx="2" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" transform="rotate(-3 87 102)" />

        {/* Glaçon 4 */}
        <rect x="115" y="100" width="20" height="16" rx="2" fill="rgba(255,255,255,0.26)" transform="rotate(10 125 108)" />
      </g>

      {/* Bande centrale semi-opaque */}
      <path
        d="M 51 145 L 48 195 Q 48 200 100 200 Q 152 200 152 195 L 149 145 Z"
        fill="url(#ci-band)"
      />

      {/* Verre transparent — paroi */}
      <path
        d="M 55 55 L 45 240 Q 45 250 100 250 Q 155 250 155 240 L 145 55 Z"
        fill="url(#ci-glass)"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1"
      />

      {/* Reflet vertical gauche du verre */}
      <path
        d="M 56 62 L 49 225 Q 49 230 57 232 L 62 232 L 67 62 Z"
        fill="rgba(255,255,255,0.18)"
      />

      {/* Logo sur la bande */}
      <text
        x="100" y="167"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="10.5"
        fontWeight="400"
        fontStyle="italic"
        fill="#111111"
        opacity="0.80"
        letterSpacing="0.3"
      >
        Maison Marquise
      </text>

      {/* Filet or */}
      <line x1="68" y1="173" x2="132" y2="173" stroke="#B99A5F" strokeWidth="0.6" opacity="0.75" />

      {/* Couvercle transparent dôme */}
      <ellipse cx="100" cy="56" rx="50" ry="9" fill="rgba(255,255,255,0.30)" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
      <ellipse cx="100" cy="54" rx="42" ry="5" fill="rgba(255,255,255,0.15)" />
      {/* Encoche */}
      <path d="M 82 56 Q 100 52 118 56" stroke="rgba(255,255,255,0.40)" strokeWidth="1" fill="none" />

      {/* Paille */}
      <rect x="126" y="8" width="5" height="68" rx="2.5"
        fill="#B99A5F" opacity="0.85" />
      {/* Reflet paille */}
      <rect x="127.5" y="10" width="1.5" height="64" rx="0.75"
        fill="rgba(255,255,255,0.30)" />
    </svg>
  );
}

// ── Boîte pâtissière 16×16 ────────────────────────────────────────────────────
function BoxPatisserieMockup() {
  return (
    <svg
      viewBox="0 0 240 220"
      className="w-full h-auto"
      aria-label="Mockup boîte pâtissière 16×16 Maison Marquise"
      style={{ filter: "drop-shadow(0 16px 36px rgba(17,17,17,0.14))" }}
    >
      <defs>
        <linearGradient id="bp-face" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#EDE7DC" />
          <stop offset="50%"  stopColor="#F7F3EC" />
          <stop offset="100%" stopColor="#E8E2D5" />
        </linearGradient>
        <linearGradient id="bp-top" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#F9F6EF" />
          <stop offset="100%" stopColor="#EDE7DC" />
        </linearGradient>
        <linearGradient id="bp-side" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#D9D3C8" />
          <stop offset="100%" stopColor="#CEC8BC" />
        </linearGradient>
        <linearGradient id="bp-gold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="transparent" />
          <stop offset="20%"  stopColor="#B99A5F" />
          <stop offset="80%"  stopColor="#B99A5F" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* Ombre portée boîte */}
      <ellipse cx="130" cy="213" rx="78" ry="6" fill="rgba(17,17,17,0.10)" />

      {/* ── Côté droit (perspective) */}
      <path
        d="M 195 52 L 218 72 L 218 192 L 195 172 Z"
        fill="url(#bp-side)"
        stroke="rgba(185,154,95,0.15)"
        strokeWidth="0.5"
      />
      {/* Monogramme M latéral droit */}
      <text
        x="208" y="130"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="22"
        fontWeight="300"
        fontStyle="italic"
        fill="#B99A5F"
        opacity="0.12"
        transform="skewY(-8)"
      >
        M
      </text>

      {/* ── Face principale */}
      <rect x="52" y="72" width="143" height="100" rx="1.5"
        fill="url(#bp-face)"
        stroke="rgba(185,154,95,0.20)"
        strokeWidth="0.7"
      />

      {/* Filet or haut face */}
      <line x1="60" y1="85" x2="187" y2="85" stroke="url(#bp-gold)" strokeWidth="0.65" />
      {/* Filet or bas face */}
      <line x1="60" y1="158" x2="187" y2="158" stroke="url(#bp-gold)" strokeWidth="0.65" />

      {/* Logo principal */}
      <text
        x="123" y="117"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="16"
        fontWeight="400"
        fontStyle="italic"
        fill="#111111"
        opacity="0.82"
        letterSpacing="0.2"
      >
        Maison Marquise
      </text>

      {/* Filet or sous logo */}
      <line x1="78" y1="124" x2="168" y2="124" stroke="#B99A5F" strokeWidth="0.6" opacity="0.65" />

      {/* Tagline */}
      <text
        x="123" y="137"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="5.5"
        fontWeight="500"
        fill="#111111"
        opacity="0.35"
        letterSpacing="1.5"
      >
        PRÉPARÉ AVEC SOIN POUR VOUS
      </text>

      {/* Monogramme M discret face */}
      <text
        x="123" y="155"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="18"
        fontWeight="300"
        fontStyle="italic"
        fill="#B99A5F"
        opacity="0.08"
      >
        M
      </text>

      {/* ── Dessus de la boîte (perspective) */}
      <path
        d="M 52 72 L 75 52 L 218 52 L 195 72 Z"
        fill="url(#bp-top)"
        stroke="rgba(185,154,95,0.20)"
        strokeWidth="0.7"
      />

      {/* Filet or sur le dessus */}
      <path
        d="M 82 58 L 210 58"
        stroke="#B99A5F"
        strokeWidth="0.55"
        opacity="0.45"
      />
      <path
        d="M 80 65 L 208 65"
        stroke="#B99A5F"
        strokeWidth="0.55"
        opacity="0.25"
      />

      {/* Logo discret dessus */}
      <text
        x="144" y="63"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="8"
        fontWeight="300"
        fontStyle="italic"
        fill="#111111"
        opacity="0.30"
        transform="skewX(-14) translate(-15, 0)"
        letterSpacing="0.2"
      >
        Maison Marquise
      </text>

      {/* ── Ruban de fermeture — détail haut de gamme */}
      <rect x="108" y="52" width="30" height="5" rx="0.5"
        fill="#B99A5F" opacity="0.6" />
      <rect x="108" y="52" width="30" height="2" rx="0.5"
        fill="rgba(255,255,255,0.20)" />

      {/* ── Languette côté droit boîte */}
      <rect x="195" y="172" width="23" height="8" rx="1"
        fill="#D9D3C8"
        stroke="rgba(185,154,95,0.15)"
        strokeWidth="0.5"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PackagingCard — carte packaging complète
// ─────────────────────────────────────────────────────────────────────────────

const MOCKUP_MAP = {
  "cup-coffee":    CupCoffeeMockup,
  "cup-latte":     CupLatteMockup,
  "cup-iced":      CupIcedMockup,
  "box-patisserie": BoxPatisserieMockup,
} as const;

type ItemId = keyof typeof MOCKUP_MAP;

function PackagingCard({
  item,
  index,
}: {
  item: typeof ITEMS[number];
  index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const Mockup = MOCKUP_MAP[item.id as ItemId];

  const isBox   = item.id === "box-patisserie";
  const isIced  = item.id === "cup-iced";

  return (
    <motion.article
      ref={ref}
      className="flex flex-col rounded-[3px] overflow-hidden border border-gris-marbre bg-blanc-marbre hover:shadow-lg transition-shadow duration-500"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: EASE_SPRING }}
      aria-label={`Packaging ${item.name}`}
    >
      {/* ── Zone mockup ─────────────────────────────────────────────── */}
      <div className={cn(
        "relative flex items-center justify-center overflow-hidden",
        "min-h-64 md:min-h-72",
        isBox  ? "bg-gradient-to-br from-gris-marbre/20 to-ivoire-maison/60 pt-8 pb-4" :
        isIced ? "bg-gradient-to-br from-[#1A3A4A] to-[#0D2030] pt-6 pb-4" :
        item.id === "cup-latte" ? "bg-gradient-to-br from-[#2C1A0A] to-[#1A0E05] pt-6 pb-4" :
                  "bg-gradient-to-br from-gris-marbre/30 to-ivoire-maison/70 pt-6 pb-4",
      )}>
        {/* Fond texture grain */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
          aria-hidden="true"
        />

        {/* Halo de lumière centré */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        {/* Mockup SVG */}
        <div className={cn(
          "relative z-raised",
          isBox ? "w-4/5 max-w-[240px]" : "w-2/5 max-w-[120px]",
        )}>
          <Mockup />
        </div>

        {/* Index en coin */}
        <span
          className={cn(
            "absolute top-4 left-4 font-serif font-light text-2xl leading-none select-none",
            isIced || item.id === "cup-latte"
              ? "text-white/15"
              : "text-gris-marbre/40",
          )}
          aria-hidden="true"
        >
          {item.index}
        </span>
      </div>

      {/* ── Informations ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col gap-4 p-5 md:p-6">

        {/* Titre + badge niveau */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-d-sm font-light text-noir-marquise leading-tight">
              {item.name}
            </h3>
            <p className="font-serif italic text-sm text-gris-texte mt-0.5">
              « {item.tagline} »
            </p>
          </div>
          <span
            className="chip-mm shrink-0"
            style={{ borderColor: `${item.levelColor}50`, color: item.levelColor }}
          >
            {item.level}
          </span>
        </div>

        {/* Description */}
        <p className="font-sans text-ui text-gris-texte leading-relaxed">
          {item.desc}
        </p>

        <div className="mt-auto space-y-4 pt-4 border-t border-gris-marbre/50">
          {/* Couleurs */}
          <div className="flex items-center gap-3">
            <span className="label-mm text-gris-texte/50 w-16 shrink-0">Couleurs</span>
            <div className="flex items-center gap-1.5">
              {item.colors.map((c) => (
                <div
                  key={c.hex}
                  className="w-5 h-5 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: c.hex }}
                  title={c.label}
                  aria-label={c.label}
                />
              ))}
            </div>
          </div>

          {/* Usage */}
          <div className="flex items-start gap-3">
            <span className="label-mm text-gris-texte/50 w-16 shrink-0 pt-0.5">Usage</span>
            <p className="font-sans text-ui text-gris-texte leading-snug">{item.usage}</p>
          </div>

          {/* Finition */}
          <div className="flex items-start gap-3">
            <span className="label-mm text-gris-texte/50 w-16 shrink-0 pt-0.5">Finition</span>
            <p className="font-sans text-ui text-gris-texte leading-snug">{item.finish}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Panneau DA — principes transversaux
// ─────────────────────────────────────────────────────────────────────────────

function DAPrinciples() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  const principles = [
    { title: "Lisibilité immédiate",    desc: "Le logo et la tagline doivent être identifiables en moins de 2 secondes sur chaque support." },
    { title: "Cohérence des matières",  desc: "Ivoire mat, or à chaud, noir profond — les matières parlent avant les couleurs." },
    { title: "Zone de respiration",     desc: "Le logo bénéficie d'un espace équivalent à la hauteur du M tout autour, même sur cup." },
    { title: "Sobriété des éléments",  desc: "Un seul élément graphique fort par support. La simplicité est le luxe accessible." },
  ] as const;

  return (
    <motion.div
      ref={ref}
      className="rounded-[3px] border border-gris-marbre bg-blanc-marbre overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* En-tête */}
      <div className="px-6 md:px-8 py-5 border-b border-gris-marbre bg-ivoire-maison flex items-center justify-between gap-4">
        <div>
          <span className="label-mm text-gris-texte">Direction artistique</span>
          <h3 className="font-serif text-d-md font-light text-noir-marquise mt-1">
            Principes transversaux
          </h3>
        </div>
        <span className="font-script text-3xl text-or-champagne/30 select-none" aria-hidden="true">
          M
        </span>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {principles.map((p, i) => (
          <motion.div
            key={p.title}
            className="flex gap-4"
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.55, ease: EASE }}
          >
            <span
              className="font-serif font-light text-2xl text-or-champagne/30 leading-none shrink-0 mt-0.5 select-none w-8 text-right"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="font-sans text-ui-lg font-medium text-noir-marquise">
                {p.title}
              </p>
              <p className="font-sans text-ui text-gris-texte leading-relaxed mt-1">
                {p.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
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

      {/* M fantôme décoratif */}
      <div
        className="absolute -bottom-20 -left-10 font-serif font-light leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(18rem, 40vw, 48rem)", color: "rgba(185,154,95,0.05)", lineHeight: 1 }}
        aria-hidden="true"
      />

      <div className="container-mm py-section relative">

        {/* ══ EN-TÊTE ══════════════════════════════════════════════════ */}
        <div ref={headerRef} className="mb-14 md:mb-20 max-w-2xl">
          <motion.span
            className="label-mm text-gris-texte"
            initial={{ opacity: 0, y: -8 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Direction packaging
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
              06
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
                L'objet Maison Marquise
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
            Chaque support raconte la même histoire — sobre, chaleureuse, soignée.
            La marque Maison Marquise s'exprime aussi dans l'objet qu'on tient en main.
          </motion.p>
        </div>

        {/* ══ GRILLE PACKAGING — 2×2 ══════════════════════════════════ */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14 md:mb-20"
          role="list"
          aria-label="Direction artistique des packagings Maison Marquise"
        >
          {ITEMS.map((item, i) => (
            <div key={item.id} role="listitem">
              <PackagingCard item={item} index={i} />
            </div>
          ))}
        </div>

        {/* ══ PRINCIPES TRANSVERSAUX ══════════════════════════════════ */}
        <DAPrinciples />

      </div>

      <div className="line-gold w-full" aria-hidden="true" />
    </section>
  );
}
