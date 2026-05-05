import Link from "next/link";
import { MARKETING_SITE_URL } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-border-subtle bg-surface-muted/50 py-8 text-center text-sm text-muted">
      <p>
        ¿Necesitas ayuda?{" "}
        <Link
          href={MARKETING_SITE_URL}
          className="font-medium text-brand underline-offset-4 hover:underline"
        >
          Volver a la web principal
        </Link>
      </p>
      <p className="mt-2 text-xs">
        © {new Date().getFullYear()} Xamox Academy. Todos los derechos reservados.
      </p>
    </footer>
  );
}
