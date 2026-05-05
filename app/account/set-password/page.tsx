import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SetPasswordForm } from "./set-password-form";

export const dynamic = "force-dynamic";

export default async function SetPasswordPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }
  if (session.user.hasPassword) {
    redirect("/dashboard");
  }

  return (
    <div className="xa-content flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <SetPasswordForm />
    </div>
  );
}
