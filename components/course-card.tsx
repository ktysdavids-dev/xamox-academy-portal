import Link from "next/link";

export type CourseSummary = {
  id: string;
  title: string;
  description: string;
  progress: number;
  lessonsTotal: number;
  lessonsDone: number;
};

export function CourseCard({ course }: { course: CourseSummary }) {
  return (
    <article className="group flex flex-col rounded-3xl border border-xa-line bg-xa-night/90 p-6 shadow-card backdrop-blur-sm transition hover:border-xa-gold/25 hover:shadow-glow">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="font-serif text-lg font-medium tracking-tight text-xa-ink">
          {course.title}
        </h3>
        <span className="rounded-full bg-xa-gold-soft px-2.5 py-0.5 font-mono text-xs font-medium text-xa-gold">
          {course.progress}%
        </span>
      </div>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-xa-ink-soft">
        {course.description}
      </p>
      <div className="mb-5">
        <div className="mb-1.5 flex justify-between font-mono text-xs text-xa-ink-dim">
          <span>Progreso</span>
          <span>
            {course.lessonsDone}/{course.lessonsTotal} sesiones
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-xa-deep ring-1 ring-xa-line">
          <div
            className="h-full rounded-full bg-gradient-xa shadow-[0_0_12px_rgba(45,212,255,0.35)] transition-all duration-500"
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>
      <Link
        href={`/dashboard/cursos/${course.id}`}
        className="inline-flex items-center justify-center rounded-full bg-xa-gold px-4 py-2.5 text-sm font-semibold text-xa-deep shadow-md transition hover:bg-xa-gold-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-xa-cyan"
      >
        Continuar
      </Link>
    </article>
  );
}
