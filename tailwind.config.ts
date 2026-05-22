import type { Config } from "tailwindcss";

// ─────────────────────────────────────────────────────────────────────────────
// MAISON MARQUISE — Tailwind Design System
// Source de vérité unique pour tous les tokens visuels.
// Ces valeurs sont mirrorées dans /lib/tokens.ts pour usage JS/TSX.
// ─────────────────────────────────────────────────────────────────────────────

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],

  theme: {
    // ── On surcharge les defaults pour rester 100% dans le système Marquise
    screens: {
      sm:  "375px",
      md:  "768px",
      lg:  "1024px",
      xl:  "1280px",
      "2xl": "1440px",
    },

    extend: {
      // ════════════════════════════════════════════════════════════════════════
      // 1. COULEURS OFFICIELLES
      // ════════════════════════════════════════════════════════════════════════
      colors: {
        // ── Palette nommée (noms officiels du brief) ─────────────────────────
        "noir-marquise":   "#111111",
        "ivoire-maison":   "#F7F3EC",
        "blanc-marbre":    "#FAFAF8",
        "or-champagne":    "#B99A5F",
        "brun-marquis":    "#6F5A2E",
        "caramel":         "#C7843E",
        "framboise":       "#A6192E",
        "pistache":        "#9A9B55",
        "gris-marbre":     "#D8D6D1",
        "gris-texte":      "#4A4A4A",

        // ── Alias sémantiques (usage dans les composants) ────────────────────
        // Ces alias évitent de coupler les composants aux noms de palette.
        mm: {
          bg:       "#FAFAF8",  // fond principal
          surface:  "#F7F3EC",  // cartes, surfaces élevées
          border:   "#D8D6D1",  // bordures neutres
          "border-gold": "#B99A5F", // bordures accent
          text:     "#111111",  // texte principal
          subtle:   "#4A4A4A",  // texte secondaire
          faint:    "#D8D6D1",  // texte très discret
          gold:     "#B99A5F",  // accent or
          warm:     "#C7843E",  // accent caramel
          bold:     "#A6192E",  // accent framboise
          fresh:    "#9A9B55",  // accent pistache
          earth:    "#6F5A2E",  // accent brun
        },
      },

      // ════════════════════════════════════════════════════════════════════════
      // 2. TYPOGRAPHIE
      // ════════════════════════════════════════════════════════════════════════
      fontFamily: {
        // Variables CSS injectées dans RootLayout via next/font/google
        serif:  ["var(--font-cormorant)", "Georgia", "serif"],
        sans:   ["var(--font-montserrat)", "system-ui", "sans-serif"],
        script: ["var(--font-parisienne)", "cursive"],
      },

      // Échelle typographique fluide — desktop large → mobile compact
      fontSize: {
        // Display — Cormorant (titres de section, hero)
        "d-2xl": ["clamp(3.5rem, 8vw, 8rem)",    { lineHeight: "0.95", letterSpacing: "-0.025em" }],
        "d-xl":  ["clamp(2.5rem, 6vw, 5.5rem)",  { lineHeight: "1.0",  letterSpacing: "-0.02em"  }],
        "d-lg":  ["clamp(2rem, 4.5vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
        "d-md":  ["clamp(1.5rem, 3vw, 2.5rem)",  { lineHeight: "1.1",  letterSpacing: "-0.01em"  }],
        "d-sm":  ["clamp(1.25rem, 2.5vw, 1.75rem)", { lineHeight: "1.2" }],

        // Body — Montserrat
        "body-lg": ["1.125rem",  { lineHeight: "1.7" }],
        "body":    ["1rem",      { lineHeight: "1.65" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.6" }],

        // UI
        "ui-lg":   ["0.875rem",  { lineHeight: "1.5",  letterSpacing: "0.02em"  }],
        "ui":      ["0.8125rem", { lineHeight: "1.45", letterSpacing: "0.03em"  }],
        "label":   ["0.6875rem", { lineHeight: "1.4",  letterSpacing: "0.18em"  }],
        "label-lg":["0.75rem",   { lineHeight: "1.4",  letterSpacing: "0.2em"   }],

        // Prix — Cormorant (lisibilité maximale)
        "price-xl": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1", letterSpacing: "-0.01em" }],
        "price":    ["1.75rem",  { lineHeight: "1" }],
        "price-sm": ["1.375rem", { lineHeight: "1" }],
      },

      fontWeight: {
        light:    "300",
        normal:   "400",
        medium:   "500",
        semibold: "600",
      },

      // ════════════════════════════════════════════════════════════════════════
      // 3. ESPACEMENT & LAYOUT
      // ════════════════════════════════════════════════════════════════════════
      spacing: {
        // Espacement sectionnel fluide
        "section-sm": "clamp(3rem, 8vw, 5rem)",
        "section":    "clamp(5rem, 12vw, 9rem)",
        "section-lg": "clamp(7rem, 16vw, 13rem)",
        // Zone de respiration logo (clear space = x-height du M)
        "logo-clearance": "clamp(1rem, 3vw, 2rem)",
      },

      maxWidth: {
        "brand":   "1320px",
        "reading": "68ch",
        "narrow":  "52ch",
      },

      // ════════════════════════════════════════════════════════════════════════
      // 4. BORDURES & RAYONS
      // ════════════════════════════════════════════════════════════════════════
      borderRadius: {
        // Esthétique architecturale Marquise : quasi-zéro arrondi
        "brand": "2px",
        "card":  "3px",
        "pill":  "100px",
      },

      borderWidth: {
        "px": "1px",
        "2":  "2px",
      },

      // ════════════════════════════════════════════════════════════════════════
      // 5. OMBRES
      // ════════════════════════════════════════════════════════════════════════
      boxShadow: {
        // Ombres chaudes — base noir Marquise, pas de bleu
        "xs":   "0 1px 3px 0 rgba(17, 17, 17, 0.04)",
        "sm":   "0 2px 8px 0 rgba(17, 17, 17, 0.06)",
        "md":   "0 4px 16px 0 rgba(17, 17, 17, 0.08)",
        "lg":   "0 8px 32px 0 rgba(17, 17, 17, 0.10)",
        "xl":   "0 16px 64px 0 rgba(17, 17, 17, 0.12)",
        // Lueur or champagne (packaging, hover cartes premium)
        "gold": "0 0 0 1px rgba(185, 154, 95, 0.3), 0 4px 20px 0 rgba(185, 154, 95, 0.12)",
        "gold-lg": "0 0 0 1px rgba(185, 154, 95, 0.4), 0 8px 40px 0 rgba(185, 154, 95, 0.18)",
        // Inset pour champs de formulaire
        "inset": "inset 0 1px 3px 0 rgba(17, 17, 17, 0.06)",
        // Suppression d'ombre
        "none": "none",
      },

      // ════════════════════════════════════════════════════════════════════════
      // 6. TRANSITIONS & ANIMATIONS
      // ════════════════════════════════════════════════════════════════════════
      transitionTimingFunction: {
        "brand":   "cubic-bezier(0.25, 0.46, 0.45, 0.94)",  // ease-out doux
        "reveal":  "cubic-bezier(0.16, 1, 0.3, 1)",          // spring léger
        "elegant": "cubic-bezier(0.4, 0, 0.2, 1)",           // material-like
      },
      transitionDuration: {
        "200": "200ms",
        "300": "300ms",
        "400": "400ms",
        "500": "500ms",
        "700": "700ms",
        "900": "900ms",
      },

      keyframes: {
        // Entrée texte par masque vertical
        "reveal-up": {
          "0%":   { clipPath: "inset(100% 0 0 0)", transform: "translateY(12px)" },
          "100%": { clipPath: "inset(0% 0 0 0)",   transform: "translateY(0)" },
        },
        // Fondu montée standard
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-down": {
          "0%":   { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Ligne or qui s'étire
        "line-grow-x": {
          "0%":   { transform: "scaleX(0)", transformOrigin: "left" },
          "100%": { transform: "scaleX(1)", transformOrigin: "left" },
        },
        "line-grow-center": {
          "0%":   { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        // Pulsation douce (dot indicateur)
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.4" },
        },
        // Shimmer (squelette de chargement)
        "shimmer": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },

      animation: {
        "reveal-up":         "reveal-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-up":           "fade-up 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
        "fade-up-slow":      "fade-up 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
        "fade-in":           "fade-in 0.6s ease both",
        "fade-down":         "fade-down 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
        "line-grow":         "line-grow-x 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
        "line-grow-center":  "line-grow-center 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
        "pulse-soft":        "pulse-soft 2.5s ease-in-out infinite",
        "shimmer":           "shimmer 2s linear infinite",
      },

      // ════════════════════════════════════════════════════════════════════════
      // 7. Z-INDEX SYSTEM
      // ════════════════════════════════════════════════════════════════════════
      zIndex: {
        "below":    "-1",
        "base":     "0",
        "raised":   "10",
        "overlay":  "20",
        "sticky":   "30",
        "nav":      "40",
        "modal":    "50",
        "tooltip":  "60",
        "top":      "9999",
      },

      // ════════════════════════════════════════════════════════════════════════
      // 8. GRADIENTS PERSONNALISÉS
      // ════════════════════════════════════════════════════════════════════════
      backgroundImage: {
        // Filet or champagne dégradé (séparateurs, lignes décoratives)
        "gold-line":    "linear-gradient(90deg, transparent, #B99A5F, transparent)",
        "gold-line-l":  "linear-gradient(90deg, #B99A5F, transparent)",
        "gold-line-r":  "linear-gradient(90deg, transparent, #B99A5F)",
        // Fond grain ivoire (texture papier)
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
        // Shimmer squelette
        "shimmer": "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
};

export default config;
