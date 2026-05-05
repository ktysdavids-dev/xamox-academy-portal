import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function CourseOverviewPage({ params }: Props) {
  const { slug } = await params;
  const session = await auth();
  const userId = session!.user.id;
  const isAdmin = session!.user.role === "ADMIN";

  const course = await prisma.course.findFirst({
    where: isAdmin
      ? { slug }
      : {
          slug,
          enrollments: { some: { userId } },
        },
    include: {
      modules: {
        orderBy: { sortOrder: "asc" },
        include: {
          lessons: { orderBy: { sortOrder: "asc" } },
        },
      },
    },
  });

  if (!course) notFound();

  return (
    <div id="contenido-principal">
      <Link
        href="/dashboard"
        className="mb-8 inline-flex font-mono text-sm font-medium text-xa-cyan hover:text-xa-gold"
      >
        ← Volver a mis cursos
      </Link>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-xa-gold">
        Programa
      </p>
      <h1 className="mt-2 font-serif text-3xl font-light tracking-tight text-xa-ink md:text-4xl">
        {course.title}
      </h1>
      {course.description && (
        <p className="mt-4 max-w-3xl text-lg text-xa-ink-soft">
          {course.description}
        </p>
      )}

      <div className="mt-14 space-y-12">
        {course.modules.map((mod) => (
          <section key={mod.id}>
            <h2 className="font-serif text-xl font-medium text-xa-ink">
              {mod.title}
            </h2>
            <ul className="mt-6 space-y-3">
              {mod.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link
                    href={`/dashboard/leccion/${lesson.id}`}
                    className="flex items-center justify-between rounded-2xl border border-xa-line bg-xa-night/80 px-5 py-4 transition hover:border-xa-gold/30 hover:text-xa-gold"
                  >
                    <span className="font-medium text-xa-ink">{lesson.title}</span>
                    <span className="font-mono text-xs text-xa-ink-dim">Abrir →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
