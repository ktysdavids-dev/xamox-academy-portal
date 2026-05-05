import { randomBytes } from "crypto";
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { roleForEmail } from "@/lib/auth-helpers";

const DEFAULT_COURSE_SLUG = "cohorte-01";

function extractEmail(session: Stripe.Checkout.Session): string | null {
  const a = session.customer_details?.email?.trim().toLowerCase();
  if (a) return a;
  const b = session.customer_email?.trim().toLowerCase();
  if (b) return b;
  const cust = session.customer;
  if (cust && typeof cust === "object" && "deleted" in cust && cust.deleted) {
    return null;
  }
  if (cust && typeof cust === "object" && "email" in cust && cust.email) {
    return String(cust.email).trim().toLowerCase();
  }
  return null;
}

export async function fulfillCheckoutSession(
  session: Stripe.Checkout.Session,
  options?: { createLoginToken: boolean }
): Promise<{ userId: string; loginToken?: string; courseSlug: string }> {
  const createLoginToken = options?.createLoginToken ?? false;

  if (session.payment_status !== "paid") {
    throw new Error("La sesión no está pagada");
  }

  const email = extractEmail(session);
  if (!email) {
    throw new Error("No se encontró email en la sesión de Stripe");
  }

  const courseSlug =
    session.metadata?.courseSlug?.trim() || DEFAULT_COURSE_SLUG;

  const name =
    session.customer_details?.name ??
    session.metadata?.studentName ??
    email.split("@")[0];

  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer && typeof session.customer === "object"
        ? session.customer.id
        : null;

  const course = await prisma.course.findUnique({ where: { slug: courseSlug } });
  if (!course) {
    throw new Error(`Curso no encontrado en campus: ${courseSlug}`);
  }

  const user = await prisma.user.upsert({
    where: { email },
    create: {
      email,
      name,
      role: roleForEmail(email),
      stripeCustomerId: customerId ?? undefined,
      emailVerified: new Date(),
    },
    update: {
      name: name ?? undefined,
      stripeCustomerId: customerId ?? undefined,
    },
  });

  await prisma.enrollment.upsert({
    where: {
      userId_courseId: { userId: user.id, courseId: course.id },
    },
    create: { userId: user.id, courseId: course.id },
    update: {},
  });

  let loginToken: string | undefined;
  if (createLoginToken) {
    const raw = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 20 * 60 * 1000);
    await prisma.oneTimeLogin.deleteMany({ where: { userId: user.id } });
    await prisma.oneTimeLogin.create({
      data: {
        token: raw,
        userId: user.id,
        expiresAt,
      },
    });
    loginToken = raw;
  }

  return { userId: user.id, loginToken, courseSlug };
}
