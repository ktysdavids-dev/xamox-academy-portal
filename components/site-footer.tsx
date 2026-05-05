import Link from "next/link";
import { MARKETING_SITE_URL } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="xa-content border-t border-xa-line bg-xa-deeper/80 py-10 text-center text-sm text-xa-ink-soft backdrop-blur-md">
      <p>
        ¿Necesitas ayuda?{" "}
        <Link
          href={MARKETING_SITE_URL}
          className="font-medium text-xa-gold underline-offset-4 transition hover:text-xa-gold-bright hover:underline"
        >
          Volver a la web principal
        </Link>
      </p>
      <p className="mt-3 font-mono text-xs text-xa-ink-dim">
        © {new Date().getFullYear()} Xamox Academy · Build · Deploy · Ship
      </p>
    </footer>
  );
}
