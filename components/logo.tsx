import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  className?: string;
  /** Si hay href, el logo envuelve un link */
  href?: string;
  /** Marca más grande en cabeceras hero */
  size?: "default" | "lg";
};

/**
 * Logo oficial Xamox Academy — wordmark descargado del CDN de Webflow
 * (cdn.prod.website-files.com/.../Logo Xamox Academy.webp).
 * Se sirve desde /public/brand para no depender de la red de Webflow.
 */
export function Logo({ className = "", href, size = "default" }: LogoProps) {
  const height = size === "lg" ? 56 : 40;
  const width = size === "lg" ? 224 : 160;

  const inner = (
    <div
      className={`flex items-center ${className}`}
      style={{ height, width }}
    >
      <Image
        src="/brand/logo-xamox-academy.webp"
        alt="Xamox Academy"
        width={width}
        height={height}
        priority
        className="h-full w-full object-contain drop-shadow-[0_0_18px_rgba(212,175,55,0.18)]"
      />
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label="Xamox Academy — Inicio"
        className="inline-flex transition-opacity hover:opacity-90"
      >
        {inner}
      </Link>
    );
  }
  return inner;
}
