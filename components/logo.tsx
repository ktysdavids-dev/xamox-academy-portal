import Link from "next/link";
import { XamoxMark } from "@/components/xamox-mark";

type LogoProps = {
  className?: string;
  /** Si hay href, el logo envuelve un link */
  href?: string;
  /** Marca más grande en cabeceras hero */
  size?: "default" | "lg";
};

export function Logo({ className = "", href, size = "default" }: LogoProps) {
  const markSize = size === "lg" ? 52 : 40;
  const inner = (
    <div className={`flex items-center gap-3 ${className}`}>
      <XamoxMark size={markSize} className="shrink-0 drop-shadow-[0_0_12px_rgba(45,212,255,0.35)]" />
      <div className="flex flex-col leading-none">
        <span className="font-serif text-xl font-medium tracking-tight text-xa-ink md:text-2xl">
          X<span className="italic text-xa-gold">amox</span>
        </span>
        <span className="mt-1 flex items-center gap-2">
          <span className="h-px w-4 bg-xa-gold/50" aria-hidden />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-xa-gold md:text-[11px]">
            Academy
          </span>
          <span className="h-px w-4 bg-xa-gold/50" aria-hidden />
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="transition-opacity hover:opacity-90">
        {inner}
      </Link>
    );
  }
  return inner;
}
