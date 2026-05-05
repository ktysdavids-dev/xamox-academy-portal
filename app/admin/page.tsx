import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminHomePage() {
  const [courses, users, enrollments] = await Promise.all([
    prisma.course.count(),
    prisma.user.count(),
    prisma.enrollment.count(),
  ]);

  return (
    <div>
      <h1 className="font-serif text-3xl font-light text-xa-ink">
        Panel de administración
      </h1>
      <p className="mt-3 max-w-2xl text-xa-ink-soft">
        Gestiona cursos, módulos, lecciones y materiales. Los alumnos solo ven lo que
        publiques aquí y solo si están matriculados (Stripe).
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-xa-line bg-xa-night/80 p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-xa-gold">
            Cursos
          </p>
          <p className="mt-2 font-serif text-4xl text-xa-ink">{courses}</p>
        </div>
        <div className="rounded-2xl border border-xa-line bg-xa-night/80 p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-xa-gold">
            Usuarios
          </p>
          <p className="mt-2 font-serif text-4xl text-xa-ink">{users}</p>
        </div>
        <div className="rounded-2xl border border-xa-line bg-xa-night/80 p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-xa-gold">
            Matrículas
          </p>
          <p className="mt-2 font-serif text-4xl text-xa-ink">{enrollments}</p>
        </div>
      </div>

      <Link
        href="/admin/courses"
        className="mt-12 inline-flex rounded-full bg-xa-gold px-8 py-3 text-sm font-semibold text-xa-deep hover:bg-xa-gold-bright"
      >
        Ir a cursos
      </Link>
    </div>
  );
}
