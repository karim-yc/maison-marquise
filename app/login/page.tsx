"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { LogoFull } from "@/components/brand/LogoSvg";

export default function LoginPage() {
  const [error, setError]     = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef              = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const password = inputRef.current?.value ?? "";
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      window.location.href = "/";
    } else {
      setError(true);
      setLoading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    }
  }

  return (
    /* Conteneur racine — photo en fond absolu, contenu par-dessus */
    <div className="relative min-h-screen flex flex-col lg:flex-row">

      {/* ── PHOTO FOND — toujours plein écran ────────────────────── */}
      <div className="absolute inset-0 lg:relative lg:flex-1">
        <Image
          src="/assets/packaging2/cup-terracotta-single.jpg"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover object-center"
          quality={90}
          priority
          aria-hidden="true"
        />
        {/* Overlay : sombre en bas (mobile) + léger partout (desktop) */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              /* mobile : gradient de bas en haut pour lisibilité de la carte */
              "linear-gradient(to top,",
              "  rgba(20,10,4,0.96) 0%,",
              "  rgba(20,10,4,0.75) 28%,",
              "  rgba(20,10,4,0.2) 55%,",
              "  transparent 100%)",
            ].join(" "),
          }}
          aria-hidden="true"
        />
        {/* Citation — visible uniquement desktop, bas gauche */}
        <div className="absolute bottom-0 left-0 right-0 p-10 xl:p-14 hidden lg:block">
          <div
            className="w-8 h-px mb-4"
            style={{ background: "linear-gradient(90deg,#B8784A,transparent)" }}
            aria-hidden="true"
          />
          <p
            className="font-serif font-light italic mb-2"
            style={{ fontSize: "1.2rem", color: "rgba(244,232,214,0.9)", lineHeight: 1.55 }}
          >
            &ldquo;Bien plus qu&apos;une boulangerie.&rdquo;
          </p>
          <p
            className="font-sans"
            style={{
              fontSize: "0.58rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(184,120,74,0.7)",
            }}
          >
            Pâtisserie fine · Généreuse · Accessible
          </p>
        </div>
      </div>

      {/* ── PANNEAU FORMULAIRE ────────────────────────────────────── */}
      {/*
        Mobile : position relative, pousse la carte vers le bas.
          La photo (absolute) est visible derrière via mt-auto.
        Desktop : colonne fixe 400px sur fond ivoire.
      */}
      <div
        className="
          relative z-10
          mt-auto w-full rounded-t-[24px]
          lg:mt-0 lg:rounded-none lg:w-[400px] xl:w-[440px] lg:shrink-0
          flex flex-col justify-center
          px-6 sm:px-10 pt-9 pb-10
          lg:px-10 xl:px-14 lg:py-0
        "
        style={{ backgroundColor: "#F7F3EC" }}
      >
        {/* Indicateur de glissement — mobile uniquement */}
        <div className="flex justify-center mb-6 lg:hidden" aria-hidden="true">
          <div
            className="w-10 h-[3px] rounded-full"
            style={{ backgroundColor: "rgba(74,46,32,0.18)" }}
          />
        </div>

        {/* Logo officiel */}
        <div className="w-36 sm:w-40 mx-auto mb-7 text-noir-marquise">
          <LogoFull aria-label="Maison Marquise" />
        </div>

        {/* Filet or */}
        <div
          className="mx-auto mb-7 h-px w-10"
          style={{ background: "linear-gradient(90deg,transparent,#B8784A,transparent)" }}
          aria-hidden="true"
        />

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">

          {/* Eyebrow + titre */}
          <div className="mb-5">
            <p
              className="font-sans mb-1"
              style={{
                fontSize: "0.58rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(74,74,74,0.4)",
              }}
            >
              Accès prestataires
            </p>
            <h1
              className="font-serif font-light"
              style={{ fontSize: "1.45rem", color: "#111111", lineHeight: 1.2 }}
            >
              Brandbook officiel
            </h1>
          </div>

          {/* Champ mot de passe */}
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block font-sans"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(74,74,74,0.5)",
              }}
            >
              Mot de passe
            </label>
            <input
              ref={inputRef}
              id="password"
              type="password"
              autoFocus
              autoComplete="current-password"
              placeholder="••••••••"
              aria-describedby={error ? "pwd-error" : undefined}
              className="w-full outline-none font-sans transition-colors duration-200"
              style={{
                padding: "11px 14px",
                border: error
                  ? "1px solid rgba(166,25,46,0.5)"
                  : "1px solid rgba(216,198,165,0.8)",
                borderRadius: "2px",
                backgroundColor: "#FAFAF8",
                fontSize: "0.9rem",
                color: "#111111",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = error
                  ? "rgba(166,25,46,0.7)"
                  : "rgba(184,120,74,0.6)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = error
                  ? "rgba(166,25,46,0.5)"
                  : "rgba(216,198,165,0.8)";
              }}
            />
            {error && (
              <p
                id="pwd-error"
                role="alert"
                className="font-sans"
                style={{ fontSize: "0.7rem", color: "#A6192E" }}
              >
                Mot de passe incorrect.
              </p>
            )}
          </div>

          {/* Bouton */}
          <button
            type="submit"
            disabled={loading}
            className="w-full font-sans transition-opacity duration-200"
            style={{
              padding: "13px",
              marginTop: "4px",
              backgroundColor: "#111111",
              color: "#F4E8D6",
              border: "none",
              borderRadius: "2px",
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.5 : 1,
            }}
          >
            {loading ? "Vérification…" : "Accéder au brandbook"}
          </button>
        </form>

        {/* Mention */}
        <p
          className="text-center font-sans mt-7 lg:mt-8"
          style={{
            fontSize: "0.57rem",
            letterSpacing: "0.1em",
            color: "rgba(74,74,74,0.28)",
          }}
        >
          Document confidentiel · Usage interne
        </p>
      </div>
    </div>
  );
}
