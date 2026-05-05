import { CourseCard } from "@/components/course-card";
import { DEMO_COURSES } from "@/lib/demo-courses";

export default function DashboardPage() {
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
          Aquí tienes tus programas activos. El progreso real lo conectarás con tu base
          de datos o con la herramienta con la que gestiones matrículas.
        </p>
      </div>

      <section id="cursos" aria-labelledby="cursos-heading">
        <h2
          id="cursos-heading"
          className="mb-8 font-serif text-xl font-medium tracking-tight text-xa-ink"
        >
          Mis cursos
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {DEMO_COURSES.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
