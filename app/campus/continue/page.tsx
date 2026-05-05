import { redirect } from "next/navigation";
import { fulfillCheckoutSession } from "@/lib/stripe/fulfill-checkout";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ session_id?: string }> };

/**
 * URL de éxito recomendada en Stripe Checkout / Payment Link:
 * https://app.xamoxacademy.com/campus/continue?session_id={CHECKOUT_SESSION_ID}
 */
export default async function CampusContinuePage({ searchParams }: Props) {
  const { session_id } = await searchParams;
  if (!session_id) {
    redirect("/?error=missing_session");
  }

  let checkoutSession;
  try {
    checkoutSession = await getStripe().checkout.sessions.retrieve(session_id, {
      expand: ["customer"],
    });
  } catch {
    redirect("/login?error=stripe_session");
  }

  try {
    const { loginToken } = await fulfillCheckoutSession(checkoutSession, {
      createLoginToken: true,
    });
    if (!loginToken) {
      redirect("/login?error=no_token");
    }
    redirect(`/auth/continue?token=${encodeURIComponent(loginToken)}`);
  } catch (e) {
    console.error("[campus/continue]", e);
    redirect("/login?error=fulfill");
  }
}
