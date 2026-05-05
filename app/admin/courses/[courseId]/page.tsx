import {
  createLessonAction,
  createModuleAction,
  updateCourseAction,
} from "@/actions/admin";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ courseId: string }> };

export default async function AdminCourseDetailPage({ params }: Props) {
  const { courseId } = await params;

  const course = await prisma.course.findUnique({
    where: { id: courseId },
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
    <div>
      <Link
        href="/admin/courses"
        className="font-mono text-sm text-xa-cyan hover:text-xa-gold"
      >
        ← Cursos
      </Link>

      <h1 className="mt-6 font-serif text-3xl font-light text-xa-ink">
        Editar curso
      </h1>

      <form action={updateCourseAction} className="mt-8 max-w-2xl space-y-5">
        <input type="hidden" name="courseId" value={course.id} />
        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-xa-gold">
            Título
          </label>
          <input
            name="title"
            defaultValue={course.title}
            required
            className="mt-2 w-full rounded-xl border border-xa-line bg-xa-deep px-4 py-3 text-xa-ink"
          />
        </div>
        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-xa-gold">
            Descripción
          </label>
          <textarea
            name="description"
            rows={4}
            defaultValue={course.description ?? ""}
            className="mt-2 w-full rounded-xl border border-xa-line bg-xa-deep px-4 py-3 text-xa-ink"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-xa-ink-soft">
          <input
            type="checkbox"
            name="published"
            defaultChecked={course.published}
            className="rounded border-xa-line"
          />
          Visible en listados públicos (los matriculados siempre ven su curso)
        </label>
        <button
          type="submit"
          className="rounded-full bg-xa-gold px-6 py-2.5 text-sm font-semibold text-xa-deep hover:bg-xa-gold-bright"
        >
          Guardar curso
        </button>
      </form>

      <section className="mt-16 border-t border-xa-line pt-12">
        <h2 className="font-serif text-xl text-xa-ink">Módulos</h2>

        <form action={createModuleAction} className="mt-6 flex flex-wrap gap-3">
          <input type="hidden" name="courseId" value={course.id} />
          <input
            name="title"
            placeholder="Nuevo módulo"
            required
            className="min-w-[200px] flex-1 rounded-xl border border-xa-line bg-xa-deep px-4 py-3 text-xa-ink"
          />
          <button
            type="submit"
            className="rounded-full border border-xa-line px-5 py-3 text-sm font-medium text-xa-gold hover:bg-xa-night"
          >
            Añadir módulo
          </button>
        </form>

        <div className="mt-10 space-y-10">
          {course.modules.map((mod) => (
            <div key={mod.id} className="rounded-2xl border border-xa-line bg-xa-night/60 p-6">
              <h3 className="font-medium text-xa-ink">{mod.title}</h3>

              <ul className="mt-4 space-y-2">
                {mod.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <Link
                      href={`/admin/lessons/${lesson.id}`}
                      className="flex justify-between rounded-xl bg-xa-deep/80 px-4 py-3 text-sm text-xa-ink hover:text-xa-gold"
                    >
                      <span>{lesson.title}</span>
                      <span className="font-mono text-xs text-xa-ink-dim">
                        /{lesson.slug}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <form action={createLessonAction} className="mt-4 flex flex-wrap gap-3">
                <input type="hidden" name="moduleId" value={mod.id} />
                <input
                  name="title"
                  placeholder="Nueva lección"
                  required
                  className="min-w-[180px] flex-1 rounded-xl border border-xa-line bg-xa-deep px-4 py-2 text-sm text-xa-ink"
                />
                <input
                  name="slug"
                  placeholder="slug-opcional"
                  className="w-40 rounded-xl border border-xa-line bg-xa-deep px-4 py-2 font-mono text-sm text-xa-ink"
                />
                <button
                  type="submit"
                  className="rounded-full bg-xa-gold/90 px-4 py-2 text-sm font-semibold text-xa-deep"
                >
                  Añadir lección
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
