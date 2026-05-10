"use server";

import { randomBytes } from "crypto";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { roleForEmail } from "@/lib/auth-helpers";
import { MENTORIA_COURSE_SLUG } from "@/lib/constants";

async function ensureMentoriaCourse() {
  const course = await prisma.course.upsert({
    where: { slug: MENTORIA_COURSE_SLUG },
    create: {
      slug: MENTORIA_COURSE_SLUG,
      title: "Mentoría gratuita · Construye tu producto real",
      description:
        "Sesión abierta de Xamox Academy para entender el método, reservar tu acceso y preparar el salto a la cohorte en directo.",
      published: true,
    },
    update: {
      published: true,
    },
  });

  const modules = await prisma.module.count({ where: { courseId: course.id } });
  if (modules === 0) {
    const module = await prisma.module.create({
      data: {
        courseId: course.id,
        title: "Acceso a la mentoría",
        sortOrder: 0,
      },
    });

    await prisma.lesson.createMany({
      data: [
        {
          moduleId: module.id,
          title: "Bienvenida y próximos pasos",
          slug: "bienvenida-mentoria",
          sortOrder: 0,
          body:
            "Tu plaza para la mentoría gratuita queda registrada. Aquí añadiremos el enlace del directo, recordatorios y recursos previos.",
        },
        {
          moduleId: module.id,
          title: "Después de la mentoría: pasar a la cohorte",
          slug: "pasar-a-cohorte",
          sortOrder: 1,
          body:
            "Si la mentoría confirma que esto es para ti, el siguiente paso es la cohorte en directo: 8 sesiones, lunes y miércoles de 18:00 a 21:00.",
        },
      ],
    });
  }

  return course;
}

export async function registerMentoriaAction(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const name = String(formData.get("name") ?? "").trim();
  const consent = formData.get("rgpd") === "on";

  if (!email || !email.includes("@") || !consent) {
    redirect("/mentoria?error=invalid");
  }

  const course = await ensureMentoriaCourse();
  const user = await prisma.user.upsert({
    where: { email },
    create: {
      email,
      name: name || email.split("@")[0],
      role: roleForEmail(email),
      emailVerified: new Date(),
    },
    update: {
      name: name || undefined,
      emailVerified: new Date(),
    },
  });

  await prisma.enrollment.upsert({
    where: {
      userId_courseId: { userId: user.id, courseId: course.id },
    },
    create: { userId: user.id, courseId: course.id },
    update: {},
  });

  const token = randomBytes(32).toString("hex");
  await prisma.oneTimeLogin.deleteMany({ where: { userId: user.id } });
  await prisma.oneTimeLogin.create({
    data: {
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + 20 * 60 * 1000),
    },
  });

  redirect(`/auth/continue?token=${encodeURIComponent(token)}`);
}
