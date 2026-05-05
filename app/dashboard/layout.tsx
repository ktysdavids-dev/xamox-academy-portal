import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard-shell";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (!session.user.hasPassword) {
    redirect("/account/set-password");
  }

  const isAdmin = session.user.role === "ADMIN";

  return <DashboardShell isAdmin={isAdmin}>{children}</DashboardShell>;
}
