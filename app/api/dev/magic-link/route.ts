import { NextResponse, type NextRequest } from "next/server";
import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Endpoint de soporte: genera un magic link de un solo uso para un email.
 * Se protege con el header `x-bootstrap-secret` que debe coincidir con
 * BOOTSTRAP_ADMIN_PASSWORD (env var ya existente y secreta).
 *
 * Uso:
 *   curl -H "x-bootstrap-secret: $SECRET" \
 *        "https://campus.xamoxacademy.com/api/dev/magic-link?email=ktysdavids@gmail.com"
 */
export async function GET(req: NextRequest) {
  const expected = process.env.BOOTSTRAP_ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const provided = req.headers.get("x-bootstrap-secret") ?? "";
  if (provided !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const email = (req.nextUrl.searchParams.get("email") ?? "").trim().toLowerCase();
  if (!email) {
    return NextResponse.json({ error: "missing_email" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "user_not_found", email }, { status: 404 });
  }

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1h

  await prisma.oneTimeLogin.create({
    data: {
      token,
      userId: user.id,
      expiresAt,
    },
  });

  const origin = req.nextUrl.origin;
  const url = `${origin}/auth/continue?token=${token}`;

  return NextResponse.json({
    email: user.email,
    role: user.role,
    expiresAt: expiresAt.toISOString(),
    url,
  });
}
