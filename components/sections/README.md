# /components/sections

Ce dossier contiendra les sections de la charte graphique interactive.
Chaque section est un composant autonome, importé dans `/app/page.tsx`.

## Sections prévues (ordre d'affichage)

| Fichier                     | Contenu                                      |
|-----------------------------|----------------------------------------------|
| `hero-section.tsx`          | Introduction animée – logo & baseline         |
| `color-section.tsx`         | Palette complète avec swatches interactifs    |
| `typography-section.tsx`    | Spécimens typographiques & hiérarchie         |
| `logo-section.tsx`          | Déclinaisons du logo & règles d'usage         |
| `spacing-section.tsx`       | Système d'espacement & grille                 |
| `components-section.tsx`    | Bibliothèque de composants UI                 |
| `tone-section.tsx`          | Ton éditorial & exemples de copy              |
| `photography-section.tsx`   | Direction artistique & exemples photo         |
| `dos-donts-section.tsx`     | Règles d'utilisation – exemples corrects/faux |

## Convention de nommage

- Fichier : `kebab-case.tsx`
- Export : `PascalCase` named export
- Props : interface `XxxSectionProps` exportée
