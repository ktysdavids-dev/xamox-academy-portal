import Link from "next/link";
import { Logo } from "@/components/logo";
import { MARKETING_SITE_URL, PORTAL_DISPLAY_NAME } from "@/lib/constants";

const nav = [
  { href: "/dashboard", label: "Campus" },
  { href: "/dashboard#cursos", label: "Mis cursos" },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-muted">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border-subtle bg-surface lg:flex">
        <div className="flex h-16 items-center border-b border-border-subtle px-6">
          <Logo />
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-4">
          {nav.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="rounded-xl px-3 py-2 text-sm font-medium text-foreground transition hover:bg-surface-muted"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={MARKETING_SITE_URL}
            className="mt-auto rounded-xl px-3 py-2 text-sm text-muted transition hover:bg-surface-muted"
          >
            Web de la academia
          </Link>
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border-subtle bg-surface/90 px-4 backdrop-blur-md lg:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <Logo />
          </div>
          <p className="hidden text-sm text-muted lg:block">
            {PORTAL_DISPLAY_NAME}
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-muted hover:text-foreground"
            >
              Cerrar sesión
            </Link>
          </div>
        </header>
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
