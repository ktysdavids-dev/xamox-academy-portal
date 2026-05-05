import { prisma } from "@/lib/prisma";
import { fulfillCheckoutSession } from "@/lib/stripe/fulfill-checkout";
import { getStripe } from "@/lib/stripe";
import type Stripe from "stripe";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return Response.json({ error: "STRIPE_WEBHOOK_SECRET no configurada" }, { status: 500 });
  }

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return Response.json({ error: "Sin firma" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, secret);
  } catch {
    return Response.json({ error: "Firma inválida" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const dup = await prisma.stripeEvent.findUnique({
      where: { eventId: event.id },
    });
    if (dup) {
      return Response.json({ received: true, duplicate: true });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    try {
      await fulfillCheckoutSession(session, { createLoginToken: false });
      await prisma.stripeEvent.create({ data: { eventId: event.id } });
    } catch (e) {
      console.error("[stripe webhook]", e);
      return Response.json({ error: "Fulfillment fallido" }, { status: 500 });
    }
  }

  return Response.json({ received: true });
}
