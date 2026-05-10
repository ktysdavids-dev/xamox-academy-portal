import Link from "next/link";
import { Logo } from "@/components/logo";
import { SiteFooter } from "@/components/site-footer";
import {
  MARKETING_SITE_URL,
  PORTAL_DISPLAY_NAME,
  PORTAL_TAGLINE,
  STRIPE_PAYMENT_LINK,
} from "@/lib/constants";

export default function PortalHomePage() {
  return (
    <div id="contenido-principal" className="xa-content flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-xa-line bg-xa-deep/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 lg:px-8">
          <Logo href="/" />
          <nav className="flex items-center gap-4 sm:gap-8">
            <Link
              href={MARKETING_SITE_URL}
              className="text-sm font-medium text-xa-ink-soft transition hover:text-xa-gold"
            >
              Sitio web
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-xa-gold px-5 py-2.5 text-sm font-semibold text-xa-deep shadow-lg transition hover:bg-xa-gold-bright"
            >
              Iniciar sesión
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative flex flex-1 flex-col overflow-hidden">
        <div className="relative mx-auto flex max-w-6xl flex-1 flex-col justify-center px-4 py-16 lg:flex-row lg:items-center lg:gap-20 lg:px-8 lg:py-28">
          <div className="max-w-xl flex-1">
            <p className="mb-8 inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.25em] text-xa-gold">
              <span className="h-px w-8 bg-xa-gold" aria-hidden />
              Campus online · Cohorte en directo
            </p>
            <h1 className="font-serif text-4xl font-light leading-[1.05] tracking-tight text-xa-ink md:text-5xl lg:text-6xl">
              Tu espacio{" "}
              <em className="italic text-xa-gold">Xamox</em>
              <br />
              para construir en serio.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-xa-ink-soft">
              {PORTAL_TAGLINE} Aquí se une todo el sistema: mentoría gratuita,
              compra de cohorte, acceso de alumno y panel privado de contenidos. Entra al campus cuando hayas completado tu matrícula en{" "}
              <a
                href={MARKETING_SITE_URL}
                className="font-medium text-xa-cyan underline-offset-4 transition hover:text-xa-gold hover:underline"
              >
                xamoxacademy.com
              </a>
              .
            </p>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/mentoria"
                className="inline-flex items-center justify-center rounded-full bg-xa-gold px-8 py-4 text-base font-semibold text-xa-deep shadow-xl transition hover:bg-xa-gold-bright"
              >
                Mentoría gratis
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full border border-xa-line-strong bg-transparent px-8 py-4 text-base font-medium text-xa-ink transition hover:border-xa-gold/50 hover:text-xa-gold"
              >
                Acceder al campus
              </Link>
              <Link
                href={STRIPE_PAYMENT_LINK}
                className="inline-flex items-center justify-center rounded-full border border-xa-line-strong bg-transparent px-8 py-4 text-base font-medium text-xa-ink transition hover:border-xa-gold/50 hover:text-xa-gold"
              >
                Comprar cohorte
              </Link>
            </div>
          </div>

          <div className="mt-16 flex flex-1 justify-center lg:mt-0">
            <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-xa-line bg-xa-night/90 p-8 shadow-card backdrop-blur-md">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-xa-cyan/10 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-xa-magenta/10 blur-3xl"
                aria-hidden
              />

              <div className="relative mb-6 flex items-center gap-2 border-b border-xa-line pb-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-xa-gold">
                  {PORTAL_DISPLAY_NAME}
                </span>
              </div>

              <div className="relative space-y-5 text-sm">
                <div className="rounded-2xl border border-xa-line bg-xa-deep/80 p-5">
                  <p className="font-medium text-xa-ink">Sistema único</p>
                  <p className="mt-2 text-xa-ink-soft">
                    Mentoria gratuita → campus → compra → contenidos del curso,
                    todo centralizado en una sola app.
                  </p>
                </div>
                <div>
                  <div className="mb-2 flex justify-between font-mono text-xs text-xa-ink-dim">
                    <span>Ruta del builder</span>
                    <span className="text-xa-cyan">En curso</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-xa-deep ring-1 ring-xa-line">
                    <div className="h-full w-2/3 rounded-full bg-gradient-xa shadow-[0_0_16px_rgba(45,212,255,0.35)]" />
                  </div>
                </div>
                <p className="font-mono text-xs leading-relaxed text-xa-ink-dim">
                  Si entras desde la mentoría tendrás acceso gratuito. Si compras la
                  cohorte, Stripe activa automáticamente tu curso completo.
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
