import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fusionne des classes Tailwind en gérant les conflits.
 * Combine clsx (logique conditionnelle) + tailwind-merge (déduplication).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formate une valeur hexadécimale de couleur en RGB.
 * Utile pour construire des rgba() dynamiques.
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Génère un délai d'animation en cascade (stagger).
 * @param index – position de l'élément dans la liste
 * @param base  – délai de base en ms (défaut : 100)
 */
export function staggerDelay(index: number, base = 100): string {
  return `${index * base}ms`;
}

/**
 * Retourne un extrait de texte tronqué avec ellipse.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}
