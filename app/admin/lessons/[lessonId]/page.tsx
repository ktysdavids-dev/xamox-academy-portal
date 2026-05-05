import {
  addMaterialLinkAction,
  deleteMaterialAction,
  updateLessonAction,
  uploadMaterialFileAction,
} from "@/actions/admin";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ lessonId: string }> };

export default async function AdminLessonPage({ params }: Props) {
  const { lessonId } = await params;

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      materials: { orderBy: { createdAt: "asc" } },
      module: { include: { course: true } },
    },
  });

  if (!lesson) notFound();

  const course = lesson.module.course;

  return (
    <div>
      <div className="flex flex-wrap gap-4 text-sm">
        <Link
          href={`/admin/courses/${course.id}`}
          className="font-mono text-xa-cyan hover:text-xa-gold"
        >
          ← {course.title}
        </Link>
        <Link
          href={`/dashboard/leccion/${lesson.id}`}
          className="font-mono text-xa-ink-dim hover:text-xa-gold"
        >
          Vista previa alumno
        </Link>
      </div>

      <h1 className="mt-8 font-serif text-3xl font-light text-xa-ink">
        Editar lección
      </h1>

      <form action={updateLessonAction} className="mt-8 max-w-3xl space-y-5">
        <input type="hidden" name="lessonId" value={lesson.id} />
        <div>
          <label className="block font-mono text-xs uppercase text-xa-gold">
            Título
          </label>
          <input
            name="title"
            defaultValue={lesson.title}
            required
            className="mt-2 w-full rounded-xl border border-xa-line bg-xa-deep px-4 py-3 text-xa-ink"
          />
        </div>
        <div>
          <label className="block font-mono text-xs uppercase text-xa-gold">
            Slug (URL)
          </label>
          <input
            name="slug"
            defaultValue={lesson.slug}
            required
            className="mt-2 w-full rounded-xl border border-xa-line bg-xa-deep px-4 py-3 font-mono text-sm text-xa-ink"
          />
        </div>
        <div>
          <label className="block font-mono text-xs uppercase text-xa-gold">
            Vídeo (YouTube o URL)
          </label>
          <input
            name="videoUrl"
            defaultValue={lesson.videoUrl ?? ""}
            placeholder="https://www.youtube.com/watch?v=..."
            className="mt-2 w-full rounded-xl border border-xa-line bg-xa-deep px-4 py-3 text-xa-ink"
          />
        </div>
        <div>
          <label className="block font-mono text-xs uppercase text-xa-gold">
            Contenido (Markdown)
          </label>
          <textarea
            name="body"
            rows={14}
            defaultValue={lesson.body ?? ""}
            placeholder="## Encabezado&#10;&#10;Texto con **negrita**."
            className="mt-2 w-full rounded-xl border border-xa-line bg-xa-deep px-4 py-3 font-mono text-sm text-xa-ink"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-xa-gold px-8 py-3 text-sm font-semibold text-xa-deep hover:bg-xa-gold-bright"
        >
          Guardar lección
        </button>
      </form>

      <section className="mt-16 border-t border-xa-line pt-12">
        <h2 className="font-serif text-xl text-xa-ink">Material descargable / enlaces</h2>
        <p className="mt-2 text-sm text-xa-ink-soft">
          Añade enlaces (Drive, Notion, Vimeo público) o sube archivos si tienes
          configurado Vercel Blob (
          <code className="font-mono text-xa-cyan">BLOB_READ_WRITE_TOKEN</code>).
        </p>

        <form action={addMaterialLinkAction} className="mt-8 grid gap-4 md:grid-cols-2">
          <input type="hidden" name="lessonId" value={lesson.id} />
          <input
            name="title"
            placeholder="Título del recurso"
            required
            className="rounded-xl border border-xa-line bg-xa-deep px-4 py-3 text-xa-ink md:col-span-2"
          />
          <input
            name="url"
            placeholder="https://..."
            required
            className="rounded-xl border border-xa-line bg-xa-deep px-4 py-3 text-xa-ink md:col-span-2"
          />
          <select
            name="kind"
            defaultValue="LINK"
            className="rounded-xl border border-xa-line bg-xa-deep px-4 py-3 text-xa-ink"
          >
            <option value="LINK">Enlace</option>
            <option value="PDF">PDF</option>
            <option value="VIDEO">Vídeo</option>
            <option value="IMAGE">Imagen</option>
            <option value="OTHER">Otro</option>
          </select>
          <button
            type="submit"
            className="rounded-full border border-xa-gold/50 px-6 py-3 text-sm font-medium text-xa-gold hover:bg-xa-night"
          >
            Añadir enlace
          </button>
        </form>

        <form action={uploadMaterialFileAction} className="mt-10 rounded-2xl border border-dashed border-xa-line p-6">
          <input type="hidden" name="lessonId" value={lesson.id} />
          <p className="font-mono text-xs uppercase text-xa-gold">Subir archivo</p>
          <input
            type="file"
            name="file"
            required
            className="mt-4 block w-full text-sm text-xa-ink-soft file:mr-4 file:rounded-lg file:border-0 file:bg-xa-gold file:px-4 file:py-2 file:text-xa-deep"
          />
          <button
            type="submit"
            className="mt-4 rounded-full bg-xa-gold px-6 py-2.5 text-sm font-semibold text-xa-deep"
          >
            Subir a almacenamiento
          </button>
        </form>

        <ul className="mt-10 space-y-3">
          {lesson.materials.map((m) => (
            <li
              key={m.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-xa-line bg-xa-night/80 px-4 py-3"
            >
              <div>
                <span className="font-mono text-xs text-xa-gold">{m.kind}</span>
                <span className="ml-2 text-xa-ink">{m.title}</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={m.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-xa-cyan hover:underline"
                >
                  Abrir
                </a>
                <form action={deleteMaterialAction}>
                  <input type="hidden" name="materialId" value={m.id} />
                  <input type="hidden" name="lessonId" value={lesson.id} />
                  <button
                    type="submit"
                    className="text-sm text-red-300 hover:underline"
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
