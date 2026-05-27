"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// BrandCursor — curseur Maison Marquise
//
// TAILLES :  default 44px · hover-lien 50px · hover-image 64px
// COULEUR :  terracotta #A84F2A sur fond clair
//            crème #F4E8D6 sur fond sombre (Hero, Univers sombre)
// ANNEAU  :  cuivre-or #B8784A constant
//
// Le M est simplifié (Cormorant letter-path) à cette taille pour rester
// lisible — le path SVG complexe du FAVICON à 949.8×742.5 devient
// trop fin et illisible en dessous de 80px. On dessine un M typographique
// clair directement en SVG text avec la police Cormorant.
// ─────────────────────────────────────────────────────────────────────────────

const SPRING = { damping: 26, stiffness: 280, mass: 0.6 };

type CursorMode = "default" | "hover-link" | "hover-image";

export function BrandCursor() {
  const [mounted,  setMounted]  = useState(false);
  const [visible,  setVisible]  = useState(false);
  const [onDark,   setOnDark]   = useState(false);
  const [mode,     setMode]     = useState<CursorMode>("default");

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const x = useSpring(mouseX, SPRING);
  const y = useSpring(mouseY, SPRING);

  useEffect(() => {
    setMounted(true);

    // Masquer curseur natif
    const style = document.createElement("style");
    style.id = "mm-cursor-hide";
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    const detectDark = (el: Element | null): boolean => {
      let node = el as HTMLElement | null;
      for (let i = 0; i < 8 && node && node !== document.body; i++) {
        const bg = window.getComputedStyle(node).backgroundColor;
        const m = bg.match(/[\d.]+/g);
        if (m && m.length >= 3) {
          const [r, g, b, a = 1] = m.map(Number);
          if (a > 0.15) {
            return 0.299 * r + 0.587 * g + 0.114 * b < 80;
          }
        }
        node = node.parentElement;
      }
      return false;
    };

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      setOnDark(detectDark(el));

      // Mode
      if (el?.closest("[data-cursor='image'], .PackPhoto, .ArchPhoto, figure, [data-photo]")) {
        setMode("hover-image");
      } else if (el?.closest("a, button, [role='button'], label, input, select, textarea")) {
        setMode("hover-link");
      } else {
        setMode("default");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", () => setVisible(false));
    document.addEventListener("mouseenter", () => setVisible(true));

    return () => {
      document.getElementById("mm-cursor-hide")?.remove();
      window.removeEventListener("mousemove", onMove);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  // ── Tailles selon le mode ──────────────────────────────────────────────────
  const SIZE   = mode === "hover-image" ? 64 : mode === "hover-link" ? 50 : 44;
  const FILL   = onDark ? "#F4E8D6" : "#A84F2A";
  const RING   = "#B8784A";
  // Opacité anneau : plus visible sur image
  const RING_OPACITY = mode === "hover-image" ? 0.85 : mode === "hover-link" ? 0.7 : 0.5;
  // Épaisseur anneau : 1px par défaut, 1.5px sur image
  const RING_W = mode === "hover-image" ? 1.5 : 1;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0, left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        x, y,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.12 } }}
    >
      <motion.div
        style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
        animate={{ width: SIZE, height: SIZE }}
        initial={{ width: 44, height: 44 }}
        transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Anneau cuivre-or */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `${RING_W}px solid ${RING}`,
          }}
          animate={{ opacity: RING_OPACITY }}
          transition={{ duration: 0.18 }}
        />

        {/* Monogramme M — SVG text lisible à toutes les tailles ──────────── */}
        {/* On utilise un <text> SVG avec la police serif du système         */}
        {/* pour avoir un M propre, centré, lisible à 44px comme à 64px.     */}
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {/* M dessiné en paths géométriques — 5 traits, proportions premium */}
          {/* Plus lisible que le path complexe du FAVICON à cette résolution */}
          <path
            fill={FILL}
            d={[
              // Jambe gauche (montante)
              "M 22 78 L 22 22",
              // Diagonale gauche (descend vers centre)
              "L 50 58",
              // Diagonale droite (remonte depuis centre)
              "L 78 22",
              // Jambe droite (descendante)
              "L 78 78",
              // Pied droit (serif discret)
              "L 74 78 L 74 26 L 50 62 L 26 26 L 26 78 Z",
            ].join(" ")}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Label "Explorer" sur les images — discret, en dessous du M */}
        {mode === "hover-image" && (
          <motion.span
            style={{
              position: "absolute",
              bottom: -18,
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "sans-serif",
              fontSize: "7px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: FILL,
              whiteSpace: "nowrap",
              opacity: 0.8,
            }}
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.15 }}
          >
            voir
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
