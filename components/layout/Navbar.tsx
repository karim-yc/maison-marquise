"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoMonogram, LogoFull } from "@/components/brand/LogoSvg";
import { NAV_ITEMS, BRAND } from "./nav-config";

// ─────────────────────────────────────────────────────────────────────────────
// Navbar — sticky, fond ivoire au scroll, barre de progression or,
//          monogramme desktop/mobile, menu mobile overlay sobre.
// ─────────────────────────────────────────────────────────────────────────────

export function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeId,    setActiveId]    = useState<string>("");
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  // Barre de progression or
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  // Fond navbar au scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section active par IntersectionObserver
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Fermer le menu mobile si on dépasse md
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => { if (e.matches) setMobileOpen(false); };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Bloquer le scroll body quand menu ouvert
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleAnchorClick = useCallback((id: string) => {
    setMobileOpen(false);
    // Léger délai pour laisser l'overlay se fermer avant de scroller
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 260);
  }, []);

  return (
    <>
      {/* ── Barre principale ──────────────────────────────────────────────── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-nav",
          "transition-all duration-500",
          scrolled
            ? "bg-blanc-marbre/96 backdrop-blur-sm shadow-sm"
            : "bg-transparent",
        )}
        role="banner"
      >
        {/* Barre de progression or */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-or-champagne origin-left"
          style={{ scaleX }}
          aria-hidden="true"
        />

        <div className="container-mm">
          <nav
            className="flex items-center justify-between h-16 md:h-[72px]"
            aria-label="Navigation principale du brandbook"
          >
            {/* ── Logo / monogramme ─────────────────────────────────────── */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-3 group focus-visible:outline-or-champagne"
              aria-label="Maison Marquise — retour en haut"
            >
              {/* Monogramme M officiel SVG */}
              <div
                className={cn(
                  "w-8 h-8 md:w-10 md:h-10 transition-colors duration-300",
                  "group-hover:text-or-champagne text-noir-marquise",
                )}
              >
                <LogoMonogram aria-hidden={true} />
              </div>

              {/* Séparateur + nom complet — desktop uniquement */}
              <span className="hidden lg:flex items-center gap-3" aria-hidden="true">
                <span className="w-px h-5 bg-gris-marbre" />
                <span className={cn(
                  "font-sans text-[0.625rem] font-medium tracking-[0.22em] uppercase",
                  "transition-colors duration-300",
                  scrolled ? "text-gris-texte" : "text-gris-texte",
                )}>
                  Maison Marquise
                </span>
              </span>
            </a>

            {/* ── Liens desktop ─────────────────────────────────────────── */}
            <ul
              className="hidden md:flex items-center gap-0.5"
              role="list"
              aria-label="Sections du brandbook"
            >
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <NavLink
                    item={item}
                    active={activeId === item.id}
                    onClick={() => handleAnchorClick(item.id)}
                  />
                </li>
              ))}
            </ul>

            {/* ── Bouton menu mobile ────────────────────────────────────── */}
            <button
              ref={menuBtnRef}
              className={cn(
                "md:hidden flex items-center justify-center",
                "w-10 h-10 -mr-1",
                "text-gris-texte hover:text-noir-marquise transition-colors duration-200",
                "focus-visible:outline-2 focus-visible:outline-or-champagne focus-visible:rounded",
              )}
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X size={18} strokeWidth={1.5} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu size={18} strokeWidth={1.5} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </nav>
        </div>
      </header>

      {/* ── Menu mobile overlay ───────────────────────────────────────────── */}
      <MobileMenu
        open={mobileOpen}
        activeId={activeId}
        onItemClick={handleAnchorClick}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}

// ── NavLink (desktop) ─────────────────────────────────────────────────────────
interface NavLinkProps {
  item:   (typeof NAV_ITEMS)[number];
  active: boolean;
  onClick: () => void;
}

function NavLink({ item, active, onClick }: NavLinkProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative px-3 py-3 group",
        "font-sans text-[0.625rem] font-medium tracking-[0.18em] uppercase",
        "transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-or-champagne focus-visible:ring-offset-2 rounded-[2px]",
        active ? "text-noir-marquise" : "text-gris-texte hover:text-noir-marquise",
      )}
      aria-current={active ? "location" : undefined}
    >
      {item.label}

      {/* Indicateur actif — filet or sous le lien */}
      <motion.span
        className="absolute bottom-0 left-3 right-3 h-px bg-or-champagne"
        initial={false}
        animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformOrigin: "left" }}
        aria-hidden="true"
      />

      {/* Hover — filet gris discret */}
      <span
        className={cn(
          "absolute bottom-0 left-3 right-3 h-px bg-gris-marbre",
          "scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left",
          active && "hidden",
        )}
        aria-hidden="true"
      />
    </button>
  );
}

// ── MobileMenu ────────────────────────────────────────────────────────────────
interface MobileMenuProps {
  open:       boolean;
  activeId:   string;
  onItemClick: (id: string) => void;
  onClose:    () => void;
}

function MobileMenu({ open, activeId, onItemClick, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-overlay bg-noir-marquise/30 backdrop-blur-[2px] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel — glisse depuis le haut */}
          <motion.div
            id="mobile-menu"
            className={cn(
              "fixed top-16 left-0 right-0 z-modal md:hidden",
              "bg-blanc-marbre border-b border-gris-marbre shadow-lg",
            )}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu du brandbook"
          >
            {/* Filet or en haut du panel */}
            <div
              className="h-px w-full"
              style={{ background: "linear-gradient(90deg, transparent, #B99A5F 40%, #B99A5F 60%, transparent)" }}
              aria-hidden="true"
            />

            <nav className="px-6 py-4" aria-label="Sections du brandbook (mobile)">
              <ul className="space-y-0.5" role="list">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <button
                      autoFocus={i === 0}
                      className={cn(
                        "w-full flex items-center gap-4 py-3 px-2 rounded-[2px]",
                        "transition-colors duration-200",
                        "focus-visible:outline-2 focus-visible:outline-or-champagne",
                        activeId === item.id
                          ? "text-noir-marquise"
                          : "text-gris-texte hover:text-noir-marquise hover:bg-ivoire-maison",
                      )}
                      onClick={() => onItemClick(item.id)}
                      aria-current={activeId === item.id ? "location" : undefined}
                    >
                      {/* Index */}
                      <span className={cn(
                        "font-serif text-xs font-light w-6 text-right shrink-0",
                        activeId === item.id ? "text-or-champagne" : "text-gris-marbre",
                      )}>
                        {item.index}
                      </span>

                      {/* Séparateur vertical */}
                      <span className="w-px h-4 bg-gris-marbre shrink-0" aria-hidden="true" />

                      {/* Label */}
                      <span className="font-sans text-xs font-medium tracking-[0.16em] uppercase flex-1 text-left">
                        {item.label}
                      </span>

                      {/* Indicateur actif */}
                      {activeId === item.id && (
                        <span className="w-1 h-1 rounded-full bg-or-champagne shrink-0" aria-hidden="true" />
                      )}
                    </button>
                  </motion.li>
                ))}
              </ul>

              {/* Signature en bas du menu mobile */}
              <div className="mt-4 pt-4 border-t border-gris-marbre/60 flex items-center justify-between">
                <div className="w-28 text-gris-marbre"><LogoFull aria-hidden={true} /></div>
                <span className="label-mm text-gris-marbre/60 text-[0.55rem]">Brandbook 2025</span>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
