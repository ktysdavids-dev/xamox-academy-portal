import Link from "next/link";
import { Logo } from "@/components/logo";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="xa-content min-h-screen bg-xa-deep">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-xa-line px-6 py-5">
        <Logo href="/admin" />
        <nav className="flex flex-wrap gap-6 font-mono text-xs uppercase tracking-wider text-xa-ink-soft">
          <Link href="/admin/courses" className="hover:text-xa-gold">
            Cursos
          </Link>
          <Link href="/dashboard" className="hover:text-xa-cyan">
            Vista alumno
          </Link>
        </nav>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
    </div>
  );
}
