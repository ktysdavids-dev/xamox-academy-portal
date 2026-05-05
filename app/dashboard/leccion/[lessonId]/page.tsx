import { auth } from "@/auth";
import { getLessonForUser } from "@/lib/access/lesson";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

type Props = { params: Promise<{ lessonId: string }> };

function youtubeId(url: string): string | null {
  const m =
    url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/) ??
    url.match(/youtube\.com\/embed\/([\w-]{11})/);
  return m?.[1] ?? null;
}

export default async function LessonPage({ params }: Props) {
  const { lessonId } = await params;
  const session = await auth();
  const lesson = await getLessonForUser(
    lessonId,
    session!.user.id,
    session!.user.role
  );

  if (!lesson) notFound();

  const courseSlug = lesson.module.course.slug;
  const yt = lesson.videoUrl ? youtubeId(lesson.videoUrl) : null;

  return (
    <div id="contenido-principal">
      <div className="mb-8 flex flex-wrap gap-4 text-sm">
        <Link
          href={`/dashboard/cursos/${courseSlug}`}
          className="font-mono text-xa-cyan hover:text-xa-gold"
        >
          ← Volver al programa
        </Link>
      </div>

      <p className="font-mono text-xs uppercase tracking-[0.2em] text-xa-gold">
        {lesson.module.title}
      </p>
      <h1 className="mt-2 font-serif text-3xl font-light tracking-tight text-xa-ink md:text-4xl">
        {lesson.title}
      </h1>

      {lesson.videoUrl && (
        <div className="mt-10">
          {yt ? (
            <div className="aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border border-xa-line shadow-card">
              <iframe
                title={lesson.title}
                src={`https://www.youtube.com/embed/${yt}`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <a
              href={lesson.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-xa-line px-5 py-3 text-xa-cyan hover:border-xa-gold hover:text-xa-gold"
            >
              Abrir vídeo en nueva pestaña
            </a>
          )}
        </div>
      )}

      {lesson.body && (
        <article className="prose prose-invert prose-lg mt-12 max-w-3xl prose-headings:font-serif prose-a:text-xa-cyan prose-strong:text-xa-gold">
          <ReactMarkdown>{lesson.body}</ReactMarkdown>
        </article>
      )}

      {lesson.materials.length > 0 && (
        <section className="mt-14 border-t border-xa-line pt-10">
          <h2 className="font-serif text-xl font-medium text-xa-ink">
            Material del programa
          </h2>
          <ul className="mt-6 space-y-3">
            {lesson.materials.map((m) => (
              <li key={m.id}>
                <a
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-xa-line bg-xa-night/80 px-5 py-4 transition hover:border-xa-gold/40"
                >
                  <span>
                    <span className="font-mono text-xs text-xa-gold">{m.kind}</span>
                    <span className="ml-3 font-medium text-xa-ink">{m.title}</span>
                  </span>
                  <span className="text-xa-ink-dim">Descargar / ver →</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
