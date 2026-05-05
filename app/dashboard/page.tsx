import { CourseCard } from "@/components/course-card";
import { DEMO_COURSES } from "@/lib/demo-courses";

export default function DashboardPage() {
  return (
    <div id="contenido-principal">
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          Hola de nuevo
        </h1>
        <p className="mt-2 max-w-2xl text-muted">
          Aquí tienes tus cursos activos. El progreso se sincronizará cuando conectes tu
          backend o plataforma de venta (Hotmart, Teachable, API propia, etc.).
        </p>
      </div>

      <section id="cursos" aria-labelledby="cursos-heading">
        <h2 id="cursos-heading" className="mb-6 text-lg font-semibold text-foreground">
          Mis cursos
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {DEMO_COURSES.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
