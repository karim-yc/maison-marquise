# CLAUDE.md — Brief permanent Maison Marquise

> Ce fichier est la **source de vérité** pour toutes les interactions avec Claude sur ce projet.
> À lire en priorité avant chaque session de travail.

---

## 🏛️ Identité de la marque

**Nom :** Maison Marquise
**Secteur :** *(à compléter par le client – ex. : Haute Pâtisserie, Joaillerie, Mode, Art de vivre)*
**Positionnement :** Maison artisanale française à l'excellence reconnue. Entre tradition savoir-faire et sensibilité contemporaine.

---

## 🎨 Direction artistique

### Ambiance générale
Premium · Sobre · Chaleureux · Poétique · Intemporel

### Palette
| Rôle        | Couleur          | Hex        |
|-------------|------------------|------------|
| Fond        | Ivoire chaud     | `#FAF7F2`  |
| Surface     | Ivoire profond   | `#F2EBE0`  |
| Bordure     | Pierre           | `#E8E0D5`  |
| Texte       | Charbon          | `#2A2724`  |
| Muted       | Gris taupe       | `#6B6560`  |
| Accent      | Or chaud         | `#C9A96E`  |
| Highlight   | Terracotta       | `#B5705A`  |
| Douceur     | Blush            | `#E8D5CC`  |

### Typographie
| Usage        | Police              | Caractère              |
|--------------|---------------------|------------------------|
| Titres       | Cormorant Garamond  | Élégance éditoriale    |
| Corps/UI     | Montserrat          | Lisibilité & clarté    |
| Signature    | Parisienne          | Poésie & singularité   |

---

## 🛠️ Stack technique

```
Next.js 14 (App Router) · TypeScript strict · Tailwind CSS
shadcn/ui · lucide-react · framer-motion · Google Fonts
```

---

## 📐 Principes de développement

### Mobile-first
- Toujours écrire les styles base (mobile) en premier
- Utiliser `clamp()` pour la typographie fluide
- Breakpoints : `md` (768px) → `lg` (1024px) → `xl` (1280px)

### Accessibilité
- Ratio de contraste WCAG AA minimum (4.5:1 pour le texte)
- `aria-label` sur tous les éléments interactifs sans texte visible
- Navigation clavier complète (focus-visible stylisé)
- Attribut `lang="fr"` sur les éléments en français

### Performance
- Images : `next/image` obligatoire, formats AVIF/WebP
- Fonts : `display: swap` + `variable` font quand possible
- Animations : `framer-motion` uniquement pour les entrées/sorties, CSS pour les micro-interactions

### Code
- TypeScript strict (`noImplicitAny`, `strictNullChecks`)
- Composants : fonctionnels + `forwardRef` pour les UI primitives
- Nommage : `PascalCase` composants, `camelCase` fonctions/variables, `kebab-case` fichiers
- Commentaires : uniquement sur la logique non évidente

---

## 📁 Structure du projet

```
/app                    → Pages & layouts (App Router)
/components
  /ui                   → Primitives shadcn/ui adaptées
  /sections             → Sections de la charte (hero, couleurs, typo…)
  /brand                → Composants spécifiques à la marque
/lib
  utils.ts              → cn(), helpers
  brand-tokens.ts       → Source de vérité des tokens
/public
  /assets
    /fonts              → Polices locales si besoin
    /images             → Images de référence
    /icons              → Icônes SVG custom
```

---

## ✍️ Ton éditorial

- Français impeccable, registre soigné sans être ampoulé
- Labels : toujours en majuscules espacées (`COLLECTION AUTOMNE`)
- Titres : Cormorant, poids léger, pas de gras
- Éviter : superlatives vides ("unique", "exceptionnel") sans contenu
- Préférer : la précision sensorielle et l'évocation

---

## ⚠️ Contraintes absolues

1. **Jamais** de MUI, Ant Design, Bootstrap ou équivalents
2. **Jamais** de couleurs saturées ou flashy hors palette
3. **Jamais** de border-radius > 4px (esthétique architecturale sobre)
4. **Toujours** tester le rendu mobile avant desktop
5. **Toujours** vérifier les contrastes avant de valider une couleur

---

*Dernière mise à jour : à compléter lors du prochain prompt.*
