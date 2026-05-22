"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// BackToTop — Bouton FAB discret, apparaît après 400px de scroll.
// Ivoire sur fond noir Marquise, icône fine, position fixe bas-droite.
// ─────────────────────────────────────────────────────────────────────────────

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className={cn(
            "fixed bottom-6 right-6 z-sticky",
            "flex flex-col items-center justify-center gap-1",
            "w-11 h-11",
            "bg-noir-marquise text-ivoire-maison",
            "border border-noir-marquise",
            "hover:bg-transparent hover:text-noir-marquise",
            "transition-colors duration-300",
            "focus-visible:outline-2 focus-visible:outline-or-champagne focus-visible:outline-offset-3",
            "group",
          )}
          onClick={handleClick}
          aria-label="Retour en haut de page"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUp
            size={14}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
