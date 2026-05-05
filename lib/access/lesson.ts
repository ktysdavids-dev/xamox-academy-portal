import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function getLessonForUser(
  lessonId: string,
  userId: string,
  role: Role
) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      materials: { orderBy: { createdAt: "asc" } },
      module: {
        include: {
          course: {
            include: {
              enrollments: { where: { userId }, select: { id: true } },
            },
          },
        },
      },
    },
  });

  if (!lesson) return null;
  if (role === Role.ADMIN) return lesson;

  const enrolled = lesson.module.course.enrollments.length > 0;
  if (!enrolled) return null;

  return lesson;
}
