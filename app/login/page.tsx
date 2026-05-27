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
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ password }),
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
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ── GAUCHE — photo pleine hauteur ───────────────────────────────── */}
      <div className="relative lg:flex-1 h-56 sm:h-72 lg:h-auto overflow-hidden">

        {/* Photo packaging réelle */}
        <Image
          src="/assets/packaging2/cup-terracotta-single.jpg"
          alt="Cup terracotta Maison Marquise sur comptoir marbre"
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover object-center"
          quality={90}
          priority
        />

        {/* Overlay dégradé sombre pour lisibilité du texte bas */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(26,14,7,0.88) 0%, rgba(26,14,7,0.35) 40%, rgba(26,14,7,0.05) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Texte en bas à gauche — visible uniquement sur desktop */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 hidden lg:block">
          {/* Filet or */}
          <div
            className="w-8 h-px mb-5"
            style={{ background: "linear-gradient(90deg, #B8784A, transparent)" }}
            aria-hidden="true"
          />
          <p
            className="font-serif font-light italic leading-snug mb-3"
            style={{
              fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
              color: "rgba(244, 232, 214, 0.92)",
            }}
          >
            &ldquo;Bien plus qu&apos;une boulangerie.&rdquo;
          </p>
          <p
            className="font-sans font-medium"
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(184, 120, 74, 0.75)",
            }}
          >
            Pâtisserie fine · Généreuse · Accessible
          </p>
        </div>
      </div>

      {/* ── DROITE — formulaire ──────────────────────────────────────────── */}
      <div
        className="flex flex-col items-center justify-center lg:w-[420px] xl:w-[460px] shrink-0 px-8 py-12 lg:py-0"
        style={{ backgroundColor: "#F7F3EC" }}
      >
        <div className="w-full max-w-[320px]">

          {/* Logo officiel */}
          <div className="w-44 mx-auto mb-8 text-noir-marquise">
            <LogoFull aria-label="Maison Marquise" />
          </div>

          {/* Filet or centré */}
          <div
            className="mx-auto mb-8 h-px w-12"
            style={{ background: "linear-gradient(90deg, transparent, #B8784A, transparent)" }}
            aria-hidden="true"
          />

          {/* Badge discret */}
          <p
            className="text-center font-sans font-medium mb-6"
            style={{
              fontSize: "0.58rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(74, 74, 74, 0.45)",
            }}
          >
            Accès prestataires
          </p>

          {/* Titre */}
          <h1
            className="font-serif font-light text-center mb-8"
            style={{ fontSize: "1.5rem", color: "#111111" }}
          >
            Brandbook officiel
          </h1>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block font-sans font-medium"
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(74, 74, 74, 0.55)",
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
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: error ? "1px solid rgba(166,25,46,0.4)" : "1px solid #D8D6D1",
                  borderRadius: "2px",
                  backgroundColor: "#FAFAF8",
                  fontSize: "0.875rem",
                  color: "#111111",
                  outline: "none",
                  fontFamily: "inherit",
                  transition: "border-color 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = error
                    ? "rgba(166,25,46,0.6)"
                    : "rgba(184,120,74,0.5)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = error
                    ? "rgba(166,25,46,0.4)"
                    : "#D8D6D1";
                }}
              />
              {error && (
                <p
                  id="pwd-error"
                  role="alert"
                  className="font-sans"
                  style={{ fontSize: "0.68rem", color: "#A6192E" }}
                >
                  Mot de passe incorrect.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "11px",
                backgroundColor: "#111111",
                color: "#F4E8D6",
                border: "none",
                borderRadius: "2px",
                fontSize: "0.62rem",
                fontFamily: "inherit",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
                transition: "opacity 0.2s",
              }}
            >
              {loading ? "Vérification…" : "Accéder au brandbook"}
            </button>
          </form>

          {/* Mention confidentielle */}
          <p
            className="text-center font-sans mt-8"
            style={{
              fontSize: "0.58rem",
              letterSpacing: "0.1em",
              color: "rgba(74, 74, 74, 0.3)",
            }}
          >
            Document confidentiel · Usage interne
          </p>
        </div>
      </div>

    </div>
  );
}
