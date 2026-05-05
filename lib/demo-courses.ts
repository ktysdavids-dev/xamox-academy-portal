import type { CourseSummary } from "@/components/course-card";

/** Datos de ejemplo — sustituir por CMS, base de datos o API del proveedor de cursos */
export const DEMO_COURSES: CourseSummary[] = [
  {
    id: "fundamentos",
    title: "Fundamentos del programa",
    description:
      "Primeros pasos, configuración y visión general del método que seguirás en la academia.",
    progress: 35,
    lessonsTotal: 12,
    lessonsDone: 4,
  },
  {
    id: "modulo-principal",
    title: "Módulo principal",
    description:
      "Contenido central del curso con ejercicios prácticos y material descargable.",
    progress: 0,
    lessonsTotal: 24,
    lessonsDone: 0,
  },
];
