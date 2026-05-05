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
        className="mb-6 inline-flex text-sm font-medium text-brand hover:underline"
      >
        ← Volver a mis cursos
      </Link>
      <h1 className="mb-2 text-3xl font-bold text-foreground">{course.title}</h1>
      <p className="mb-10 text-muted">{course.description}</p>

      <div className="rounded-2xl border border-border-subtle bg-surface p-8 shadow-card">
        <p className="mb-4 text-sm font-medium text-foreground">
          Contenido del curso
        </p>
        <p className="text-sm leading-relaxed text-muted">
          Esta página es un marcador de posición. Aquí enlazarás vídeos (Vimeo,
          YouTube privado, Bunny, etc.), PDFs y lecciones desde tu sistema de gestión
          o LMS.
        </p>
        <ul className="mt-6 space-y-3 text-sm text-foreground">
          <li className="flex items-center gap-2 rounded-xl bg-surface-muted px-4 py-3">
            <span className="font-medium">Lección 1</span>
            <span className="text-muted">— Introducción</span>
          </li>
          <li className="flex items-center gap-2 rounded-xl border border-dashed border-border-subtle px-4 py-3 text-muted">
            Próximas lecciones al publicar contenido
          </li>
        </ul>
      </div>
    </div>
  );
}
