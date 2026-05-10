import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const cohortCourse = await prisma.course.upsert({
    where: { slug: "cohorte-01" },
    create: {
      slug: "cohorte-01",
      title: "Xamox Academy · Cohorte en directo",
      description:
        "Programa de alto rendimiento — Build, Deploy, Ship. 8 sesiones en directo, lunes y miércoles de 18:00 a 21:00. De la idea a tu app en producción.",
      published: true,
    },
    update: {},
  });

  const moduleCount = await prisma.module.count({ where: { courseId: cohortCourse.id } });
  if (moduleCount === 0) {
    const mod = await prisma.module.create({
      data: {
        courseId: cohortCourse.id,
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

  const mentoriaCourse = await prisma.course.upsert({
    where: { slug: "mentoria-gratuita" },
    create: {
      slug: "mentoria-gratuita",
      title: "Mentoría gratuita · Construye tu producto real",
      description:
        "Acceso gratuito a la mentoría de apertura, recursos previos y próximos pasos para entrar a la cohorte.",
      published: true,
    },
    update: { published: true },
  });

  const mentoriaModules = await prisma.module.count({
    where: { courseId: mentoriaCourse.id },
  });
  if (mentoriaModules === 0) {
    const mod = await prisma.module.create({
      data: {
        courseId: mentoriaCourse.id,
        title: "Acceso a la mentoría",
        sortOrder: 0,
      },
    });
    await prisma.lesson.createMany({
      data: [
        {
          moduleId: mod.id,
          title: "Bienvenida y preparación",
          slug: "bienvenida",
          sortOrder: 0,
          body:
            "Tu plaza está reservada. Aquí podrás añadir el enlace del directo, recordatorios y recursos previos desde el panel de administración.",
        },
        {
          moduleId: mod.id,
          title: "Después de la mentoría",
          slug: "despues-de-la-mentoria",
          sortOrder: 1,
          body:
            "La cohorte en directo continúa el proceso: lunes y miércoles de 18:00 a 21:00 durante cuatro semanas para construir y publicar tu primera app.",
        },
      ],
    });
  }

  const adminEmail =
    process.env.BOOTSTRAP_ADMIN_EMAIL?.trim().toLowerCase() ??
    "info@xamoxacademy.com";
  const adminPassword = process.env.BOOTSTRAP_ADMIN_PASSWORD;
  if (adminPassword) {
    await prisma.user.upsert({
      where: { email: adminEmail },
      create: {
        email: adminEmail,
        name: "David · Super Admin",
        role: "ADMIN",
        passwordHash: await bcrypt.hash(adminPassword, 12),
        emailVerified: new Date(),
      },
      update: {
        role: "ADMIN",
        passwordHash: await bcrypt.hash(adminPassword, 12),
        emailVerified: new Date(),
      },
    });
    console.log("Seed OK · super admin:", adminEmail);
  } else {
    console.log("Seed aviso · BOOTSTRAP_ADMIN_PASSWORD no definido");
  }

  const studentEmail =
    process.env.BOOTSTRAP_STUDENT_EMAIL?.trim().toLowerCase() ??
    "alumno.prueba@xamoxacademy.com";
  const studentPassword = process.env.BOOTSTRAP_STUDENT_PASSWORD;
  if (studentPassword) {
    const student = await prisma.user.upsert({
      where: { email: studentEmail },
      create: {
        email: studentEmail,
        name: "Alumno Prueba",
        role: "STUDENT",
        passwordHash: await bcrypt.hash(studentPassword, 12),
        emailVerified: new Date(),
      },
      update: {
        role: "STUDENT",
        passwordHash: await bcrypt.hash(studentPassword, 12),
        emailVerified: new Date(),
      },
    });

    await prisma.enrollment.upsert({
      where: {
        userId_courseId: {
          userId: student.id,
          courseId: mentoriaCourse.id,
        },
      },
      create: {
        userId: student.id,
        courseId: mentoriaCourse.id,
      },
      update: {},
    });
    console.log("Seed OK · alumno prueba:", studentEmail);
  } else {
    console.log("Seed aviso · BOOTSTRAP_STUDENT_PASSWORD no definido");
  }

  console.log("Seed OK · cursos:", cohortCourse.slug, mentoriaCourse.slug);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
