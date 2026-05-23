"use client";

import { MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Respecte prefers-reduced-motion — désactive toutes les transitions
 * Framer Motion si l'utilisateur a activé la réduction de mouvement.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <MotionConfig reducedMotion={reduced ? "always" : "never"}>
      {children}
    </MotionConfig>
  );
}
