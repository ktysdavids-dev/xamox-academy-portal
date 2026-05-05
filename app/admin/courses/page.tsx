import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      _count: { select: { enrollments: true, modules: true } },
    },
  });

  return (
    <div>
      <h1 className="font-serif text-3xl font-light text-xa-ink">Cursos</h1>
      <p className="mt-2 text-sm text-xa-ink-soft">
        El slug debe coincidir con el metadata{" "}
        <code className="font-mono text-xa-cyan">courseSlug</code> en Stripe (por
        defecto <code className="font-mono">cohorte-01</code>).
      </p>

      <ul className="mt-10 space-y-4">
        {courses.map((c) => (
          <li key={c.id}>
            <Link
              href={`/admin/courses/${c.id}`}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-xa-line bg-xa-night/80 px-6 py-5 transition hover:border-xa-gold/40"
            >
              <div>
                <p className="font-medium text-xa-ink">{c.title}</p>
                <p className="font-mono text-xs text-xa-ink-dim">
                  slug: {c.slug} · {c.published ? "Publicado" : "Borrador"}
                </p>
              </div>
              <span className="font-mono text-xs text-xa-gold">
                {c._count.modules} módulos · {c._count.enrollments} matriculados
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {courses.length === 0 && (
        <p className="mt-8 text-xa-ink-dim">
          Ejecuta{" "}
          <code className="font-mono text-xa-cyan">npm run db:seed</code> tras crear la
          base de datos.
        </p>
      )}
    </div>
  );
}
