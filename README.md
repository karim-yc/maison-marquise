# Maison Marquise — Brandbook Digital

> **BIEN PLUS QU'UNE BOULANGERIE**
>
> Charte graphique digitale interactive de Maison Marquise.
> Pâtisserie fine, généreuse et accessible.

Mini-site professionnel de brand guidelines — pas un PDF statique, mais une charte vivante, navigable et exploitable par graphistes, imprimeurs et fabricants packaging.

---

## Stack technique

| Technologie | Rôle |
|---|---|
| **Next.js 14** (App Router) | Framework — rendu statique |
| **TypeScript** (strict) | Typage complet |
| **Tailwind CSS** | Design system centralisé |
| **Framer Motion** | Animations d'entrée sobres |
| **lucide-react** | Icônes |
| **@fontsource** | Polices self-hosted (pas de requête Google à runtime) |

---

## Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/votre-org/maison-marquise.git
cd maison-marquise

# 2. Installer les dépendances
npm install

# 3. Lancer en développement
npm run dev
```

Le projet est accessible sur **http://localhost:3000**

---

## Commandes

```bash
npm run dev      # Développement local (hot reload)
npm run build    # Build de production
npm run start    # Démarrer le serveur de production après build
npm run lint     # Vérification ESLint
```

---

## Structure du projet

```
maison-marquise/
│
├── app/
│   ├── globals.css          # Variables CSS brand, utilitaires, @fontsource
│   ├── icon.svg             # Favicon — monogramme M officiel
│   ├── layout.tsx           # Layout racine (metadata SEO, navigation, footer)
│   └── page.tsx             # Page principale (toutes les sections)
│
├── components/
│   ├── brand/               # Composants atomiques du design system
│   │   ├── LogoSvg.tsx      # Logos vectoriels officiels (inline SVG)
│   │   ├── HeroLogo.tsx     # Logo hero avec variantes
│   │   ├── BrandSection.tsx # Conteneur de section éditorial
│   │   ├── BrandCard.tsx    # Carte générique (4 variantes)
│   │   ├── ColorSwatch.tsx  # Swatch couleur interactif (copie hex)
│   │   ├── TypographySample.tsx
│   │   ├── FormulaCard.tsx  # Carte formule menu
│   │   ├── GuidelineCard.tsx
│   │   └── PackagingMockupCard.tsx
│   │
│   ├── sections/            # Sections de la charte (dans l'ordre de la page)
│   │   ├── HeroSection.tsx         # 00 — Hero plein écran
│   │   ├── AdnSection.tsx          # 01 — ADN de marque & 5 piliers
│   │   ├── LogoSection.tsx         # 02 — Système logo & règles
│   │   ├── CouleursSection.tsx     # 03 — Palette officielle (10 couleurs)
│   │   ├── TypographiesSection.tsx # 04 — Système typographique
│   │   ├── PackagingSection.tsx    # 06 — Direction packaging (4 formats)
│   │   ├── UniversSection.tsx      # 07 — 3 univers visuels
│   │   └── ApplicationsSection.tsx # 08 — Applications de marque
│   │
│   ├── layout/              # Composants de structure
│   │   ├── Navbar.tsx       # Navigation sticky avec progress bar or
│   │   ├── Footer.tsx       # Footer sobre
│   │   ├── BackToTop.tsx    # Bouton retour en haut
│   │   └── MotionProvider.tsx # prefers-reduced-motion Framer Motion
│   │
│   └── ui/                  # Primitives UI (Button, Badge, Card, Separator)
│
├── lib/
│   ├── tokens.ts            # Source de vérité des tokens de marque
│   └── utils.ts             # cn() helper Tailwind
│
├── public/assets/
│   ├── LOGO_1.svg           # ⭐ Logo officiel complet (mark + baseline)
│   ├── LOGO_2.svg           # ⭐ Variante logo officielle
│   ├── FAVICON.svg          # ⭐ Monogramme M — favicon
│   ├── texture-marble-white.jpg   # Texture marbre blanc (fond Hero)
│   └── texture-marble-veined.jpg  # Texture marbre veiné (Univers Maison)
│
├── tailwind.config.ts       # Design system — couleurs, typographie, animations
├── next.config.mjs          # Configuration Next.js
└── CLAUDE.md                # Brief permanent Maison Marquise (usage IA)
```

---

## Assets à remplacer / compléter

Les logos vectoriels officiels sont déjà intégrés depuis le Drive.
Le tableau ci-dessous liste ce qui peut être enrichi ultérieurement :

| Fichier | Statut | Action |
|---|---|---|
| `public/assets/LOGO_1.svg` | ✅ Officiel | — |
| `public/assets/LOGO_2.svg` | ✅ Officiel | — |
| `public/assets/FAVICON.svg` | ✅ Officiel | — |
| `public/assets/texture-marble-white.jpg` | ✅ Intégré | — |
| `public/assets/texture-marble-veined.jpg` | ✅ Intégré | — |
| Photos produits (section Applications) | ⏳ Placeholder CSS | Remplacer par vrais clichés |
| `public/assets/og-image.jpg` | ⏳ À créer | Image 1200×630 pour partage réseaux |
| Logo horizontal SVG séparé | ⏳ Optionnel | Si déclinaison distincte souhaitée |

---

## Palette officielle

| Nom | Hex | Usage |
|---|---|---|
| Noir Marquise | `#111111` | Logo, titres, contraste |
| Ivoire Maison | `#F7F3EC` | Surfaces, cartes, packaging |
| Blanc Marbre | `#FAFAF8` | Fond principal |
| Or Champagne | `#B99A5F` | Accent, filets, dorure |
| Gris Marbre | `#D8D6D1` | Bordures, séparateurs |
| Gris Texte | `#4A4A4A` | Corps de texte |
| Caramel Pâtissier | `#C7843E` | Coffee time, chaleur |
| Framboise Signature | `#A6192E` | Éditions limitées, accent fort |
| Pistache Fine | `#9A9B55` | Fraîcheur, accents doux |
| Brun Marquis | `#6F5A2E` | Profondeur, café |

---

## Typographies

| Police | Rôle | Import |
|---|---|---|
| **Cormorant Garamond** | Titres élégants | `@fontsource/cormorant-garamond` |
| **Montserrat** | Corps, menus, prix | `@fontsource/montserrat` |
| **Parisienne** | Signature, accent manuscrit | `@fontsource/parisienne` |

---

## Déploiement

Ce projet est configuré pour Vercel (détection automatique Next.js).

```bash
# Via Vercel CLI
npx vercel

# Ou connecter le repo GitHub depuis vercel.com
# Framework : Next.js (auto-détecté)
# Build command : npm run build
# Output directory : .next
```

---

## Accessibilité

- Navigation clavier complète avec `focus-visible` stylisé
- Lien skip-to-main pour les lecteurs d'écran
- `aria-labels` sur tous les éléments interactifs
- `prefers-reduced-motion` respecté (Framer Motion)
- Contrastes WCAG AA sur les textes principaux
- `lang="fr"` sur le document et les spécimens typographiques

---

*Maison Marquise — Usage interne · Confidentiel*
