"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// BrandCursor — curseur Maison Marquise
// Monogramme M qui suit la souris avec inertie spring.
// Ivoire sur fond sombre · Terracotta sur fond clair · Cuivre-Or toujours.
// ─────────────────────────────────────────────────────────────────────────────

type CursorState = "default" | "hover-link" | "hover-image";

const SPRING_FAST = { damping: 32, stiffness: 350, mass: 0.4 };

function isDarkBackground(el: Element | null): boolean {
  let node = el as HTMLElement | null;
  let depth = 0;
  while (node && node !== document.body && depth < 8) {
    const bg = getComputedStyle(node).backgroundColor;
    const m = bg.match(/\d+/g);
    if (m && m.length >= 3) {
      const [r, g, b] = m.map(Number);
      if (r + g + b < 250) { // pas transparent
        return (0.299 * r + 0.587 * g + 0.114 * b) < 110;
      }
    }
    node = node.parentElement;
    depth++;
  }
  return false;
}

export function BrandCursor() {
  const [mounted, setMounted] = useState(false);
  const [raw, setRaw]         = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [dark, setDark]       = useState(false);

  const x = useSpring(raw.x, SPRING_FAST);
  const y = useSpring(raw.y, SPRING_FAST);

  const handleMove = useCallback((e: MouseEvent) => {
    setRaw({ x: e.clientX, y: e.clientY });
    setVisible(true);

    const el = document.elementFromPoint(e.clientX, e.clientY);
    setDark(isDarkBackground(el));

    if (el?.closest("[data-cursor='image'], .PackPhoto, .ArchPhoto")) {
      setCursorState("hover-image");
    } else if (el?.closest("a, button, [role='button'], label")) {
      setCursorState("hover-link");
    } else {
      setCursorState("default");
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    // Cacher le curseur natif globalement
    const style = document.createElement("style");
    style.id = "brand-cursor-hide";
    style.textContent = "* { cursor: none !important; }";
    document.head.appendChild(style);

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", () => setVisible(false));
    document.addEventListener("mouseenter", () => setVisible(true));

    return () => {
      document.getElementById("brand-cursor-hide")?.remove();
      window.removeEventListener("mousemove", handleMove);
    };
  }, [handleMove]);

  // Ne pas rendre côté serveur ni sur mobile (touch)
  if (!mounted) return null;

  const isImg    = cursorState === "hover-image";
  const isLink   = cursorState === "hover-link";
  const size     = isImg ? 56 : isLink ? 34 : 30;
  const fill     = dark ? "#F4E8D6" : "#A84F2A";
  const ringColor = "#B8784A";

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-normal"
      style={{ x, y, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      <motion.div
        className="relative flex items-center justify-center"
        animate={{ width: size, height: size }}
        transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Anneau cuivre-or */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: `1px solid ${ringColor}` }}
          animate={{ opacity: isImg ? 0.9 : isLink ? 0.7 : 0.45 }}
          transition={{ duration: 0.2 }}
        />

        {/* Monogramme M officiel */}
        <motion.svg
          viewBox="0 0 949.8 742.5"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full p-[18%]"
          animate={{ opacity: isImg ? 1 : 0.9, scale: isImg ? 0.85 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <path
            fill={fill}
            d="M946.4,0v6.7h-65.9c-1.2,0-19,7.3-21.6,8.7-23.8,13.1-30.3,42.1-34.1,66.9-2.2,193.1-2.2,384.8,0,575.9,0,25.3,9,58,32.6,71.5,3.8,2.1,27.5,10.7,30.2,10.7h62.5v3.5H615.3v-3.5h59.1c13.7,0,38.3-12.9,47.3-23.4,8.3-9.9,18.4-36.8,18.4-49.1V13.8L483.2,396l127.5,194.7v153l-9.5-5.5L149.7,29.3C139.9,19.8,111.5,3.5,97.8,3.5H22.3V0h211.2L497,390.2,738.4,0h208Z"
          />
        </motion.svg>

        {/* Label image */}
        {isImg && (
          <motion.span
            className="absolute inset-0 flex items-end justify-center pb-1.5"
            style={{ fontFamily: "var(--font-montserrat)", fontSize: "5px", letterSpacing: "0.18em", textTransform: "uppercase", color: fill }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            voir
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
