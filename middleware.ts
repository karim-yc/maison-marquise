import { NextRequest, NextResponse } from "next/server";

// Mot de passe stocké dans une variable d'environnement Vercel
// → Settings → Environment Variables → SITE_PASSWORD
const PASSWORD = process.env.SITE_PASSWORD ?? "marquise";
const COOKIE   = "mm_access";
const MAX_AGE  = 60 * 60 * 24 * 7; // 7 jours

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ne pas bloquer les assets statiques (logos, polices, images)
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/assets/") ||
    pathname === "/favicon.ico" ||
    pathname === "/icon.svg"
  ) {
    return NextResponse.next();
  }

  // Vérifier le cookie de session
  const cookie = req.cookies.get(COOKIE);
  if (cookie?.value === PASSWORD) {
    return NextResponse.next();
  }

  // Vérifier si c'est la soumission du formulaire (POST)
  if (req.method === "POST") {
    return NextResponse.next();
  }

  // Afficher la page de connexion
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
