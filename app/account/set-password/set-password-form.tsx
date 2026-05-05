"use client";

import { setPasswordAction } from "@/actions/password";
import { Logo } from "@/components/logo";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SetPasswordForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const result = await setPasswordAction({ error: null }, fd);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    const password = String(fd.get("password") ?? "");
    const email = session?.user?.email ?? "";
    if (!email) {
      setError("No se encontró tu correo en la sesión.");
      setLoading(false);
      return;
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    router.replace("/dashboard");
    router.refresh();
    setLoading(false);
  }

  return (
    <>
      <Logo className="mb-10" />
      <div className="w-full max-w-md rounded-[28px] border border-xa-line bg-xa-night/95 p-9 shadow-card">
        <h1 className="font-serif text-2xl font-light text-xa-ink">
          Crea tu contraseña
        </h1>
        <p className="mt-3 text-sm text-xa-ink-soft">
          Último paso para tu cuenta del campus. Guardamos tu clave y renovamos la
          sesión para que entres al panel.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          )}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-mono text-xs uppercase tracking-wider text-xa-gold"
            >
              Nueva contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              disabled={loading}
              className="w-full rounded-xl border border-xa-line bg-xa-deep px-4 py-3.5 text-xa-ink outline-none ring-xa-cyan/40 focus:ring-2 disabled:opacity-60"
            />
          </div>
          <div>
            <label
              htmlFor="confirm"
              className="mb-2 block font-mono text-xs uppercase tracking-wider text-xa-gold"
            >
              Repetir contraseña
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              disabled={loading}
              className="w-full rounded-xl border border-xa-line bg-xa-deep px-4 py-3.5 text-xa-ink outline-none ring-xa-cyan/40 focus:ring-2 disabled:opacity-60"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-xa-gold py-4 text-sm font-semibold text-xa-deep shadow-lg transition hover:bg-xa-gold-bright disabled:opacity-70"
          >
            {loading ? "Guardando…" : "Guardar y entrar al campus"}
          </button>
        </form>
      </div>
    </>
  );
}
