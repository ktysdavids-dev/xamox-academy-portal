import Link from "next/link";
import { Logo } from "@/components/logo";
import { SiteFooter } from "@/components/site-footer";
import { registerMentoriaAction } from "@/actions/mentoria";
import { MARKETING_SITE_URL, STRIPE_PAYMENT_LINK } from "@/lib/constants";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export const metadata = {
  title: "Mentoría gratuita — Xamox Academy",
  description:
    "Reserva tu plaza en la mentoría gratuita y crea tu acceso al campus de Xamox Academy.",
};

export default async function MentoriaPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <div className="xa-content flex min-h-screen flex-col">
      <header className="border-b border-xa-line bg-xa-deep/80 px-4 py-5 backdrop-blur-xl lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Logo href="/" />
          <Link
            href={MARKETING_SITE_URL}
            className="text-sm font-medium text-xa-ink-soft transition hover:text-xa-gold"
          >
            Volver a la web
          </Link>
        </div>
      </header>

      <main
        id="contenido-principal"
        className="flex flex-1 items-center justify-center px-4 py-14"
      >
        <section className="grid w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-6 inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.25em] text-xa-gold">
              <span className="h-px w-8 bg-xa-gold" aria-hidden />
              Mentoría gratuita · Lanzamiento 1
            </p>
            <h1 className="font-serif text-4xl font-light leading-[1.05] tracking-tight text-xa-ink md:text-5xl lg:text-6xl">
              Primero entiende el método.{" "}
              <em className="italic text-xa-gold">Después construyes.</em>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-xa-ink-soft">
              Reserva tu plaza para la mentoría gratuita del domingo 24 de mayo
              a las 19:00. Al registrarte creamos tu acceso al campus: ahí verás
              recordatorios, recursos previos y el camino para comprar la cohorte
              cuando estés listo.
            </p>

            <div className="mt-8 grid gap-4 text-sm text-xa-ink-soft sm:grid-cols-2">
              <div className="rounded-2xl border border-xa-line bg-xa-night/80 p-5">
                <p className="font-mono text-xs uppercase tracking-wider text-xa-gold">
                  Mentoría
                </p>
                <p className="mt-2 font-medium text-xa-ink">
                  Domingo 24 de mayo · 19:00
                </p>
                <p className="mt-1">100% online en directo · plazas limitadas.</p>
              </div>
              <div className="rounded-2xl border border-xa-line bg-xa-night/80 p-5">
                <p className="font-mono text-xs uppercase tracking-wider text-xa-gold">
                  Cohorte
                </p>
                <p className="mt-2 font-medium text-xa-ink">
                  Lunes y miércoles · 18:00-21:00
                </p>
                <p className="mt-1">8 sesiones para publicar tu primera app.</p>
              </div>
            </div>

            <a
              href={STRIPE_PAYMENT_LINK}
              className="mt-8 inline-flex rounded-full border border-xa-line-strong px-7 py-3 text-sm font-semibold text-xa-ink transition hover:border-xa-gold/50 hover:text-xa-gold"
            >
              Ya lo tengo claro: comprar la cohorte
            </a>
          </div>

          <div className="rounded-[28px] border border-xa-line bg-xa-night/95 p-8 shadow-card">
            <h2 className="font-serif text-3xl font-light text-xa-ink">
              Reserva tu plaza gratis
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-xa-ink-soft">
              Te creamos una cuenta de alumno para que puedas entrar al campus
              antes de la mentoría y continuar desde ahí.
            </p>

            {error && (
              <p className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                Revisa tu email y acepta la política de privacidad.
              </p>
            )}

            <form action={registerMentoriaAction} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-mono text-xs uppercase tracking-wider text-xa-gold"
                >
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Tu nombre"
                  className="w-full rounded-xl border border-xa-line bg-xa-deep px-4 py-3.5 text-xa-ink outline-none ring-xa-cyan/40 placeholder:text-xa-ink-dim focus:ring-2"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-mono text-xs uppercase tracking-wider text-xa-gold"
                >
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="tu@email.com"
                  className="w-full rounded-xl border border-xa-line bg-xa-deep px-4 py-3.5 text-xa-ink outline-none ring-xa-cyan/40 placeholder:text-xa-ink-dim focus:ring-2"
                />
              </div>

              <label className="flex gap-3 text-sm leading-relaxed text-xa-ink-soft">
                <input
                  name="rgpd"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-xa-line bg-xa-deep accent-xa-gold"
                />
                <span>
                  He leído y acepto la política de privacidad y el aviso legal.
                </span>
              </label>

              <button
                type="submit"
                className="w-full rounded-full bg-xa-gold py-4 text-sm font-semibold text-xa-deep shadow-lg transition hover:bg-xa-gold-bright"
              >
                Reservar plaza y crear acceso
              </button>
            </form>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
