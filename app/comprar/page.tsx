import { redirect } from "next/navigation";
import { STRIPE_PAYMENT_LINK } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default function ComprarPage() {
  redirect(STRIPE_PAYMENT_LINK);
}
