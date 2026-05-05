import { auth } from "@/auth";
import { CourseCard } from "@/components/course-card";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session!.user.id;

  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    include: {
      course: {
        include: {
          modules: {
            include: { lessons: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const cards = enrollments.map((e) => {
    const totalLessons = e.course.modules.reduce(
      (acc, m) => acc + m.lessons.length,
      0
    );
    const done = 0;
    const progress =
      totalLessons > 0 ? Math.round((done / totalLessons) * 100) : 0;

    return {
      slug: e.course.slug,
      title: e.course.title,
      description:
        e.course.description ??
        "Contenido disponible en el campus — sigue las sesiones desde aquí.",
      progress,
      lessonsTotal: totalLessons || 8,
      lessonsDone: done,
    };
  });

  return (
    <div id="contenido-principal">
      <div className="mb-12">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-xa-gold">
          Build · Deploy · Ship
        </p>
        <h1 className="font-serif text-3xl font-light tracking-tight text-xa-ink md:text-4xl">
          Hola de nuevo
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-xa-ink-soft">
          Aquí tienes tus programas matriculados. El contenido lo gestionas desde el
          panel de administración.
        </p>
      </div>

      <section id="cursos" aria-labelledby="cursos-heading">
        <h2
          id="cursos-heading"
          className="mb-8 font-serif text-xl font-medium tracking-tight text-xa-ink"
        >
          Mis cursos
        </h2>
        {cards.length === 0 ? (
          <div className="rounded-3xl border border-xa-line bg-xa-night/80 p-10 text-center text-xa-ink-soft">
            <p>Aún no tienes cursos activos.</p>
            <p className="mt-2 text-sm text-xa-ink-dim">
              Cuando completes el pago en la web, podrás entrar desde el enlace de
              Stripe o iniciando sesión aquí.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
