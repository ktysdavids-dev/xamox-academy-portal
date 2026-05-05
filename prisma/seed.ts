import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const course = await prisma.course.upsert({
    where: { slug: "cohorte-01" },
    create: {
      slug: "cohorte-01",
      title: "Xamox Academy · Cohorte en directo",
      description:
        "Programa de alto rendimiento — Build, Deploy, Ship. De la idea a tu app en producción.",
      published: true,
    },
    update: {},
  });

  const moduleCount = await prisma.module.count({ where: { courseId: course.id } });
  if (moduleCount === 0) {
    const mod = await prisma.module.create({
      data: {
        courseId: course.id,
        title: "Módulo 1 · Fundamentos",
        sortOrder: 0,
      },
    });
    await prisma.lesson.create({
      data: {
        moduleId: mod.id,
        title: "Bienvenida al método",
        slug: "bienvenida",
        sortOrder: 0,
        body:
          "Aquí subirás el contenido desde el **panel de administración**. Los alumnos matriculados verán vídeo, PDFs y enlaces que publiques.",
      },
    });
  }

  console.log("Seed OK · curso:", course.slug);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
