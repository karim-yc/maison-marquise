"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// BrandCursor — curseur personnalisé Maison Marquise
// Monogramme M qui suit la souris avec spring inertiel.
// ─────────────────────────────────────────────────────────────────────────────

// Path complet du monogramme M (FAVICON.svg officiel)
const M_PATH = "M946.4,0v6.7h-65.9c-1.2,0-19,7.3-21.6,8.7-23.8,13.1-30.3,42.1-34.1,66.9-2.2,193.1-2.2,384.8-.2,574.6.3,25.3,9,58,32.8,71.6,3.6,2.1,27.6,10.6,29.9,10.6h62.5v3.4h-338v-3.4h59.2c13.4,0,38.3-12.8,47.4-23.4,8.3-9.7,18.5-36.9,18.5-48.8V13.4l-256.2,381.9,127.7,194.3v152.9l-9.6-5.6L127.9,32.4c-9.8-10.7-37.9-25.7-51.9-25.7H0V0h211.2l263.6,389.7L738.5,0h207.9Z";

const SPRING = { damping: 28, stiffness: 300, mass: 0.5 };

export function BrandCursor() {
  const [mounted, setMounted]   = useState(false);
  const [visible, setVisible]   = useState(false);
  const [onDark, setOnDark]     = useState(false);
  const [isHover, setIsHover]   = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const x = useSpring(mouseX, SPRING);
  const y = useSpring(mouseY, SPRING);

  useEffect(() => {
    setMounted(true);

    // Masquer le curseur natif
    const style = document.createElement("style");
    style.id = "mm-cursor-hide";
    style.textContent = `html, html * { cursor: none !important; }`;
    document.head.appendChild(style);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);

      // Détecter fond sombre
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (el) {
        let node: HTMLElement | null = el;
        let isDark = false;
        for (let i = 0; i < 6 && node; i++) {
          const bg = window.getComputedStyle(node).backgroundColor;
          const m = bg.match(/[\d.]+/g);
          if (m && m.length >= 3) {
            const [r, g, b, a = 1] = m.map(Number);
            if (a > 0.1) {
              isDark = (0.299 * r + 0.587 * g + 0.114 * b) < 100;
              break;
            }
          }
          node = node.parentElement;
        }
        setOnDark(isDark);

        // Hover sur éléments interactifs
        setIsHover(!!el.closest("a, button, [role=button], label, .group\\/sw, .group\\/chip"));
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.getElementById("mm-cursor-hide")?.remove();
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  const SIZE     = isHover ? 38 : 30;
  const FILL     = onDark ? "#F4E8D6" : "#A84F2A";   // crème / terracotta
  const RING_CLR = "#B8784A";                          // cuivre-or constant

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.15 } }}
    >
      <motion.div
        style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
        animate={{ width: SIZE, height: SIZE }}
        initial={{ width: 30, height: 30 }}
        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Anneau cuivre-or */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `1px solid ${RING_CLR}`,
          }}
          animate={{ opacity: isHover ? 0.8 : 0.5 }}
          transition={{ duration: 0.2 }}
        />

        {/* Monogramme M officiel */}
        <svg
          viewBox="0 0 949.8 742.5"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            padding: "22%",
          }}
        >
          <path fill={FILL} d={M_PATH} />
        </svg>
      </motion.div>
    </motion.div>
  );
}
