# Maison Marquise — Charte Graphique Digitale

Charte graphique interactive de la marque **Maison Marquise**, construite avec Next.js 14.

## Stack technique

| Outil | Rôle |
|---|---|
| Next.js 14 (App Router) | Framework React, SSR |
| TypeScript (strict) | Typage statique |
| Tailwind CSS | Styles utilitaires |
| shadcn/ui | Composants UI accessibles |
| Framer Motion | Animations légères |
| lucide-react | Icônes |
| Google Fonts | Cormorant Garamond · Montserrat · Parisienne |

## Démarrage

```bash
npm install
npm run dev
```

Accéder à [http://localhost:3000](http://localhost:3000)

## Structure

```
/app                    → Pages Next.js (App Router)
/components
  /ui                   → Composants UI génériques (boutons, badges…)
  /sections             → Sections de la charte (couleurs, typo, etc.)
  /brand                → Composants identité (Logo, ColorSwatch…)
/lib
  utils.ts              → Fonctions utilitaires + helpers animation
  brand-tokens.ts       → Tokens de marque (couleurs, typo, espacements)
/styles
  globals.css           → Variables CSS, reset, classes brand
/public/assets          → Images, icônes, fonts locales
```

## Tokens de marque

Voir [`/lib/brand-tokens.ts`](./lib/brand-tokens.ts) pour la palette complète.

| Couleur | Hex | Usage |
|---|---|---|
| Ivoire | `#FAF7F2` | Fond principal |
| Champagne | `#C9A96E` | Accent signature |
| Bordeaux | `#5C1A1A` | Titres, accents forts |
| Taupe | `#8A7E72` | Textes secondaires |
| Charbon | `#1C1C1C` | Corps de texte |
| Crème | `#F5F0E8` | Fonds alternés |

## Brief permanent

Voir [`CLAUDE.md`](./CLAUDE.md) pour le brief complet de la marque.
