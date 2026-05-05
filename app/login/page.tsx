"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Logo } from "@/components/logo";
import { SiteFooter } from "@/components/site-footer";
import { MARKETING_SITE_URL } from "@/lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    /** MVP: sin backend de auth — redirige al panel. Sustituye por NextAuth, Clerk, etc. */
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface-muted">
      <header className="border-b border-border-subtle bg-surface px-4 py-4 lg:px-8">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <Link
            href={MARKETING_SITE_URL}
            className="text-sm font-medium text-muted hover:text-foreground"
          >
            Volver al sitio web
          </Link>
        </div>
      </header>

      <main
        id="contenido-principal"
        className="flex flex-1 flex-col items-center justify-center px-4 py-12"
      >
        <div className="w-full max-w-md rounded-2xl border border-border-subtle bg-surface p-8 shadow-card">
          <h1 className="mb-2 text-2xl font-bold text-foreground">
            Iniciar sesión
          </h1>
          <p className="mb-8 text-sm text-muted">
            Usa el correo con el que compraste el curso. La autenticación real la
            conectarás después (proveedor de pagos, magic link, etc.).
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-foreground"
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
                className="w-full rounded-xl border border-border-subtle bg-background px-4 py-3 text-foreground outline-none ring-brand/30 placeholder:text-muted focus:ring-2"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-border-subtle bg-background px-4 py-3 text-foreground outline-none ring-brand/30 placeholder:text-muted focus:ring-2"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brand py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-hover disabled:opacity-70"
            >
              {loading ? "Entrando…" : "Entrar al campus"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-muted">
            ¿Aún no eres alumno?{" "}
            <a
              href={MARKETING_SITE_URL}
              className="font-medium text-brand hover:underline"
            >
              Ver cursos en la web
            </a>
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
