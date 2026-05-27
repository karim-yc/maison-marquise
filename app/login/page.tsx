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
    <>
      {/* ─── MOBILE / TABLETTE : photo plein écran + carte basse ─────────── */}
      <div className="relative min-h-screen flex flex-col justify-end lg:hidden">

        {/* Photo plein écran en fond */}
        <div className="fixed inset-0 -z-10">
          <Image
            src="/assets/packaging2/cup-terracotta-single.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            quality={88}
            priority
          />
          {/* Dégradé sombre bas → transparent haut */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #1A0E07 0%, rgba(26,14,7,0.82) 32%, rgba(26,14,7,0.3) 60%, transparent 100%)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Citation flottante au-dessus de la carte */}
        <div className="px-7 pb-6 text-center">
          <p
            className="font-serif font-light italic"
            style={{ fontSize: "1.05rem", color: "rgba(244,232,214,0.85)", lineHeight: 1.6 }}
          >
            &ldquo;Bien plus qu&apos;une boulangerie.&rdquo;
          </p>
        </div>

        {/* Carte formulaire ancrée en bas */}
        <div
          className="w-full rounded-t-[20px] px-7 pt-8 pb-10"
          style={{ backgroundColor: "#F7F3EC" }}
        >
          {/* Logo */}
          <div className="w-36 mx-auto mb-6 text-noir-marquise">
            <LogoFull aria-label="Maison Marquise" />
          </div>

          {/* Filet or */}
          <div
            className="mx-auto mb-6 h-px w-10"
            style={{ background: "linear-gradient(90deg, transparent, #B8784A, transparent)" }}
            aria-hidden="true"
          />

          {/* Formulaire */}
          <FormBody
            inputRef={inputRef}
            error={error}
            loading={loading}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      {/* ─── DESKTOP : split gauche photo / droite formulaire ────────────── */}
      <div className="hidden lg:flex min-h-screen">

        {/* Gauche — photo */}
        <div className="relative flex-1 flex flex-col justify-end">
          <Image
            src="/assets/packaging2/cup-terracotta-single.jpg"
            alt=""
            fill
            sizes="55vw"
            className="object-cover object-center"
            quality={90}
            priority
          />
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(26,14,7,0.85) 0%, rgba(26,14,7,0.25) 50%, rgba(26,14,7,0.05) 100%)",
            }}
            aria-hidden="true"
          />
          {/* Citation bas gauche */}
          <div className="relative z-10 p-10 xl:p-14">
            <div
              className="w-8 h-px mb-5"
              style={{ background: "linear-gradient(90deg, #B8784A, transparent)" }}
              aria-hidden="true"
            />
            <p
              className="font-serif font-light italic mb-3"
              style={{
                fontSize: "clamp(1.05rem, 1.6vw, 1.35rem)",
                color: "rgba(244,232,214,0.9)",
                lineHeight: 1.55,
              }}
            >
              &ldquo;Bien plus qu&apos;une boulangerie.&rdquo;
            </p>
            <p
              className="font-sans font-medium"
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

        {/* Droite — formulaire */}
        <div
          className="w-[420px] xl:w-[460px] shrink-0 flex flex-col items-center justify-center px-10 xl:px-14"
          style={{ backgroundColor: "#F7F3EC" }}
        >
          {/* Logo */}
          <div className="w-44 mx-auto mb-10 text-noir-marquise">
            <LogoFull aria-label="Maison Marquise" />
          </div>

          {/* Filet or */}
          <div
            className="mx-auto mb-8 h-px w-12"
            style={{ background: "linear-gradient(90deg, transparent, #B8784A, transparent)" }}
            aria-hidden="true"
          />

          <div className="w-full">
            <FormBody
              inputRef={inputRef}
              error={error}
              loading={loading}
              onSubmit={handleSubmit}
            />
          </div>

          {/* Mention */}
          <p
            className="mt-10 font-sans text-center"
            style={{ fontSize: "0.58rem", letterSpacing: "0.1em", color: "rgba(74,74,74,0.28)" }}
          >
            Document confidentiel · Usage interne
          </p>
        </div>
      </div>
    </>
  );
}

// ── Formulaire réutilisé sur mobile et desktop ──────────────────────────────
function FormBody({
  inputRef,
  error,
  loading,
  onSubmit,
}: {
  inputRef: React.RefObject<HTMLInputElement>;
  error: boolean;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">

      <div>
        <p
          className="font-sans font-medium mb-1"
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(74,74,74,0.45)",
          }}
        >
          Accès prestataires
        </p>
        <h1
          className="font-serif font-light"
          style={{ fontSize: "1.4rem", color: "#111111", lineHeight: 1.2 }}
        >
          Brandbook officiel
        </h1>
      </div>

      <div className="pt-1 space-y-1.5">
        <label
          htmlFor="password"
          className="block font-sans font-medium"
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
          className="w-full font-sans outline-none transition-colors duration-200"
          style={{
            padding: "11px 14px",
            border: error ? "1px solid rgba(166,25,46,0.45)" : "1px solid #D8D6D1",
            borderRadius: "2px",
            backgroundColor: "#FAFAF8",
            fontSize: "0.875rem",
            color: "#111111",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = error
              ? "rgba(166,25,46,0.65)"
              : "rgba(184,120,74,0.55)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error
              ? "rgba(166,25,46,0.45)"
              : "#D8D6D1";
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

      <button
        type="submit"
        disabled={loading}
        className="w-full font-sans font-medium transition-opacity duration-200"
        style={{
          padding: "12px",
          backgroundColor: "#111111",
          color: "#F4E8D6",
          border: "none",
          borderRadius: "2px",
          fontSize: "0.62rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.55 : 1,
        }}
      >
        {loading ? "Vérification…" : "Accéder au brandbook"}
      </button>
    </form>
  );
}
