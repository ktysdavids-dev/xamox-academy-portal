import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Edge middleware: lee el JWT directamente con getToken (sin invocar callbacks
 * con Prisma, que rompen en Edge runtime). Solo protege /admin.
 *
 * Auth.js v5 usa el cookie name como salt para derivar la clave de
 * encriptación, así que ambos parámetros deben coincidir con la config
 * runtime (HTTPS → "__Secure-authjs.session-token", HTTP → "authjs.session-token").
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const isSecure = req.nextUrl.protocol === "https:";
  const cookieName = isSecure
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
    salt: cookieName,
    cookieName,
    secureCookie: isSecure,
  });

  if (!token) {
    const url = new URL("/login", req.nextUrl);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
