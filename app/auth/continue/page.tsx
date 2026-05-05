"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

function ContinueInner() {
  const token = useSearchParams().get("token");
  const router = useRouter();
  const [msg, setMsg] = useState("Preparando tu acceso al campus…");

  useEffect(() => {
    if (!token) {
      setMsg("Enlace incompleto. Vuelve desde el correo o desde la página de pago.");
      return;
    }

    signIn("credentials", { token, redirect: false }).then((res) => {
      if (res?.error) {
        setMsg("No se pudo validar el acceso. Solicita un nuevo enlace o entra con tu cuenta.");
        return;
      }
      router.replace("/dashboard");
    });
  }, [token, router]);

  return (
    <div className="xa-content flex min-h-screen flex-col items-center justify-center px-6">
      <p className="font-serif text-xl text-xa-ink">{msg}</p>
      {!token && (
        <Link href="/login" className="mt-8 text-xa-cyan hover:text-xa-gold">
          Ir al inicio de sesión
        </Link>
      )}
    </div>
  );
}

export default function AuthContinuePage() {
  return (
    <Suspense
      fallback={
        <div className="xa-content flex min-h-screen items-center justify-center text-xa-ink">
          Cargando…
        </div>
      }
    >
      <ContinueInner />
    </Suspense>
  );
}
