"use client";

import { useState, useRef } from "react";
import { LogoFull } from "@/components/brand/LogoSvg";

export default function LoginPage() {
  const [error, setError]   = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef            = useRef<HTMLInputElement>(null);

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
    <div className="min-h-screen bg-ivoire-maison flex flex-col items-center justify-center px-5">

      {/* Fond marbre très discret */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(216,214,209,0.2) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-sm flex flex-col items-center gap-8">

        {/* Logo */}
        <div className="w-48 text-noir-marquise">
          <LogoFull aria-label="Maison Marquise" />
        </div>

        {/* Formulaire */}
        <div className="w-full bg-blanc-marbre border border-gris-marbre rounded-[3px] overflow-hidden">

          {/* En-tête */}
          <div className="px-7 py-5 border-b border-gris-marbre">
            <p className="font-sans text-[0.6rem] font-medium tracking-[0.2em] uppercase text-gris-texte/50">
              Document confidentiel
            </p>
            <h1 className="font-serif font-light text-noir-marquise mt-1 text-xl">
              Accès prestataires
            </h1>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block font-sans text-[0.65rem] font-medium tracking-[0.14em] uppercase text-gris-texte/60"
              >
                Mot de passe
              </label>
              <input
                ref={inputRef}
                id="password"
                type="password"
                autoFocus
                autoComplete="current-password"
                className={[
                  "w-full px-4 py-2.5 rounded-[2px] border bg-blanc-marbre",
                  "font-sans text-sm text-noir-marquise",
                  "outline-none transition-colors duration-200",
                  "focus:border-or-champagne/60",
                  error
                    ? "border-framboise/40 focus:border-framboise/60"
                    : "border-gris-marbre",
                ].join(" ")}
                placeholder="••••••••"
                aria-describedby={error ? "pwd-error" : undefined}
              />
              {error && (
                <p
                  id="pwd-error"
                  className="font-sans text-[0.68rem] text-framboise"
                  role="alert"
                >
                  Mot de passe incorrect.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-mm justify-center"
            >
              {loading ? "Vérification…" : "Accéder au brandbook"}
            </button>
          </form>
        </div>

        {/* Mention */}
        <p className="font-sans text-[0.6rem] text-gris-texte/35 text-center tracking-wide">
          Maison Marquise · Brandbook confidentiel · Prestataires uniquement
        </p>

        {/* Filet or */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-12 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #B99A5F, transparent)" }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
