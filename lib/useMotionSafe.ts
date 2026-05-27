/**
 * useMotionSafe — animations accessibles Maison Marquise
 *
 * Framer Motion expose useReducedMotion() qui retourne true si l'utilisateur
 * a activé "Réduire les animations" dans ses préférences système (iOS, macOS,
 * Windows, Android).
 *
 * Ce hook retourne deux helpers :
 *   - motionProps(visible) : les props initial/animate/transition à passer
 *     à un motion.div selon que l'animation est réduite ou non.
 *   - shouldAnimate : boolean (false = mode réduit actif)
 *
 * Utilisation dans une section :
 *   const { shouldAnimate } = useMotionSafe();
 *   <motion.h2
 *     initial={shouldAnimate ? { opacity: 0, clipPath: "inset(0 100% 0 0)" } : false}
 *     animate={shouldAnimate && inView ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : {}}
 *   />
 *
 * En mode réduit : les éléments sont immédiatement visibles (opacity: 1),
 * sans déplacement ni découpe — les contenus restent accessibles.
 */

"use client";

import { useReducedMotion } from "framer-motion";

export function useMotionSafe() {
  // true = l'utilisateur préfère moins d'animations
  const reduced = useReducedMotion();
  // shouldAnimate = on peut animer
  const shouldAnimate = !reduced;

  return { shouldAnimate, reduced };
}
