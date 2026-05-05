import Link from "next/link";
import { Logo } from "@/components/logo";
import { SiteFooter } from "@/components/site-footer";
import {
  MARKETING_SITE_URL,
  PORTAL_DISPLAY_NAME,
  PORTAL_TAGLINE,
} from "@/lib/constants";

export default function PortalHomePage() {
  return (
    <div id="contenido-principal" className="flex min-h-screen flex-col">
      <header className="border-b border-border-subtle bg-surface/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-8">
          <Logo />
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link
              href={MARKETING_SITE_URL}
              className="text-muted transition hover:text-foreground"
            >
              Sitio web
            </Link>
            <Link
              href="/login"
              className="rounded-xl bg-brand px-4 py-2 text-white shadow-sm transition hover:bg-brand-hover"
            >
              Iniciar sesión
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative flex flex-1 flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand/15 via-transparent to-transparent" />
        <div className="relative mx-auto flex max-w-6xl flex-1 flex-col justify-center px-4 py-16 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          <div className="max-w-xl flex-1">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">
              Campus online
            </p>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              Bienvenido al portal de{" "}
              <span className="text-brand">{PORTAL_DISPLAY_NAME}</span>
            </h1>
            <p className="mb-10 text-lg leading-relaxed text-muted">
              {PORTAL_TAGLINE}. Aquí verás tus cursos, el progreso y los materiales
              cuando completes la compra en{" "}
              <a
                href={MARKETING_SITE_URL}
                className="font-medium text-brand underline-offset-4 hover:underline"
              >
                xamoxacademy.com
              </a>
              .
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-hover"
              >
                Acceder al campus
              </Link>
              <Link
                href={MARKETING_SITE_URL}
                className="inline-flex items-center justify-center rounded-xl border border-border-subtle bg-surface px-6 py-3.5 text-base font-medium text-foreground transition hover:bg-surface-muted"
              >
                Ver oferta formativa
              </Link>
            </div>
          </div>
          <div className="mt-14 flex flex-1 justify-center lg:mt-0">
            <div className="relative w-full max-w-md rounded-3xl border border-border-subtle bg-surface p-8 shadow-card">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-red-400" aria-hidden />
                <span className="h-3 w-3 rounded-full bg-amber-400" aria-hidden />
                <span className="h-3 w-3 rounded-full bg-green-400" aria-hidden />
              </div>
              <div className="space-y-4 text-sm">
                <div className="rounded-xl bg-surface-muted p-4">
                  <p className="font-medium text-foreground">Tu próxima lección</p>
                  <p className="mt-1 text-muted">
                    Continúa donde lo dejaste en el módulo principal.
                  </p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-muted">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-brand to-brand-muted" />
                </div>
                <p className="text-xs text-muted">
                  El acceso real se activará cuando integres pagos y usuarios (Hotmart,
                  Stripe, auth, etc.).
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
