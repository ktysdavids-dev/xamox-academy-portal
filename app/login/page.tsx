"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { SiteFooter } from "@/components/site-footer";
import { MARKETING_SITE_URL } from "@/lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    router.push("/dashboard");
  }

  return (
    <div className="xa-content flex min-h-screen flex-col">
      <header className="border-b border-xa-line bg-xa-deep/80 px-4 py-5 backdrop-blur-xl lg:px-8">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <Logo href="/" />
          <Link
            href={MARKETING_SITE_URL}
            className="text-sm font-medium text-xa-ink-soft transition hover:text-xa-gold"
          >
            Volver al sitio web
          </Link>
        </div>
      </header>

      <main
        id="contenido-principal"
        className="flex flex-1 flex-col items-center justify-center px-4 py-14"
      >
        <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-xa-line bg-xa-night/95 p-9 shadow-card backdrop-blur-md">
          <div
            className="pointer-events-none absolute right-0 top-0 h-32 w-32 translate-x-1/3 -translate-y-1/3 rounded-full bg-xa-cyan/15 blur-2xl"
            aria-hidden
          />

          <h1 className="font-serif text-3xl font-light tracking-tight text-xa-ink">
            Iniciar sesión
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-xa-ink-soft">
            Usa el correo con el que compraste la cohorte. Podrás enlazar aquí tu
            proveedor de pagos y auth (Stripe, magic link, etc.).
          </p>

          <form onSubmit={handleSubmit} className="relative mt-10 space-y-6">
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
                className="w-full rounded-xl border border-xa-line bg-xa-deep px-4 py-3.5 text-xa-ink outline-none ring-xa-cyan/40 placeholder:text-xa-ink-dim focus:border-xa-cyan/50 focus:ring-2"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block font-mono text-xs uppercase tracking-wider text-xa-gold"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-xa-line bg-xa-deep px-4 py-3.5 text-xa-ink outline-none ring-xa-cyan/40 placeholder:text-xa-ink-dim focus:border-xa-cyan/50 focus:ring-2"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-xa-gold py-4 text-sm font-semibold text-xa-deep shadow-lg transition hover:bg-xa-gold-bright disabled:opacity-70"
            >
              {loading ? "Entrando…" : "Entrar al campus"}
            </button>
          </form>

          <p className="relative mt-8 text-center text-sm text-xa-ink-soft">
            ¿Aún no eres alumno?{" "}
            <a
              href={MARKETING_SITE_URL}
              className="font-medium text-xa-cyan underline-offset-4 hover:text-xa-gold hover:underline"
            >
              Ver cohorte en la web
            </a>
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
