import Link from "next/link";
import { notFound } from "next/navigation";
import { DEMO_COURSES } from "@/lib/demo-courses";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return DEMO_COURSES.map((c) => ({ id: c.id }));
}

export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params;
  const course = DEMO_COURSES.find((c) => c.id === id);
  if (!course) notFound();

  return (
    <div id="contenido-principal" className="mx-auto max-w-3xl">
      <Link
        href="/dashboard"
        className="mb-8 inline-flex font-mono text-sm font-medium text-xa-cyan transition hover:text-xa-gold"
      >
        ← Volver a mis cursos
      </Link>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-xa-gold">
        Programa en curso
      </p>
      <h1 className="mt-2 font-serif text-3xl font-light tracking-tight text-xa-ink md:text-4xl">
        {course.title}
      </h1>
      <p className="mt-4 text-lg text-xa-ink-soft">{course.description}</p>

      <div className="mt-12 rounded-[28px] border border-xa-line bg-xa-night/90 p-8 shadow-card backdrop-blur-sm">
        <p className="font-medium text-xa-ink">Contenido del programa</p>
        <p className="mt-3 text-sm leading-relaxed text-xa-ink-soft">
          Esta vista es el marco para tus sesiones en directo, grabaciones y recursos.
          Enlaza aquí tu vídeo (Vimeo, Meet grabado, etc.) y materiales por semana.
        </p>
        <ul className="mt-8 space-y-3 text-sm">
          <li className="flex items-center gap-3 rounded-2xl border border-xa-line bg-xa-deep/90 px-5 py-4">
            <span className="font-mono text-xa-cyan">01</span>
            <span className="text-xa-ink">Sesión · Fundamentos y stack</span>
          </li>
          <li className="rounded-2xl border border-dashed border-xa-line px-5 py-4 text-xa-ink-dim">
            Más sesiones según calendario de cohorte
          </li>
        </ul>
      </div>
    </div>
  );
}
