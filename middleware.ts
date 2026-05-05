import { auth } from "@/auth";
import { NextResponse } from "next/server";

/** Solo rutas admin en Edge: el resto se protege en layouts (Node). */
export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  if (pathname.startsWith("/admin")) {
    if (!session) {
      const url = new URL("/login", req.nextUrl);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    if (session.user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
