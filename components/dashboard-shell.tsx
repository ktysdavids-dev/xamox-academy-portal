import Link from "next/link";
import { Logo } from "@/components/logo";
import { SignOutButton } from "@/components/sign-out-button";
import { MARKETING_SITE_URL, PORTAL_DISPLAY_NAME } from "@/lib/constants";

const nav = [
  { href: "/dashboard", label: "Campus" },
  { href: "/dashboard#cursos", label: "Mis cursos" },
];

export function DashboardShell({
  children,
  isAdmin,
}: {
  children: React.ReactNode;
  isAdmin: boolean;
}) {
  return (
    <div className="xa-content min-h-screen bg-xa-deep">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-xa-line bg-xa-deeper/95 backdrop-blur-xl lg:flex">
        <div className="flex h-[72px] items-center border-b border-xa-line px-5">
          <Logo href="/dashboard" />
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-4">
          {nav.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-xa-ink-soft transition hover:bg-xa-night hover:text-xa-gold"
            >
              {item.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              className="rounded-xl px-3 py-2.5 text-sm font-semibold text-xa-gold transition hover:bg-xa-night"
            >
              Administración
            </Link>
          )}
          <Link
            href={MARKETING_SITE_URL}
            className="mt-auto rounded-xl px-3 py-2.5 text-sm text-xa-ink-dim transition hover:text-xa-cyan"
          >
            Web de la academia
          </Link>
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-xa-line bg-xa-deep/85 px-4 backdrop-blur-xl lg:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <Logo href="/dashboard" />
          </div>
          <p className="hidden font-mono text-xs uppercase tracking-[0.2em] text-xa-ink-dim lg:block">
            {PORTAL_DISPLAY_NAME}
          </p>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link
                href="/admin"
                className="hidden text-sm font-medium text-xa-gold lg:inline"
              >
                Admin
              </Link>
            )}
            <SignOutButton />
          </div>
        </header>
        <main className="p-4 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
