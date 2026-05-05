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
    <article className="group flex flex-col rounded-2xl border border-border-subtle bg-surface p-6 shadow-card transition hover:border-brand/30 hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-foreground">{course.title}</h3>
        <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand">
          {course.progress}%
        </span>
      </div>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">
        {course.description}
      </p>
      <div className="mb-4">
        <div className="mb-1 flex justify-between text-xs text-muted">
          <span>Progreso</span>
          <span>
            {course.lessonsDone}/{course.lessonsTotal} lecciones
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-surface-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand to-brand-muted transition-all duration-500"
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>
      <Link
        href={`/dashboard/cursos/${course.id}`}
        className="inline-flex items-center justify-center rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        Continuar
      </Link>
    </article>
  );
}
