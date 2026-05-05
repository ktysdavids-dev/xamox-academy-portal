"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { MaterialKind } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

async function revalidateCourse(slug: string) {
  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/cursos/${slug}`);
  revalidatePath("/admin/courses");
}

export async function updateCourseAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("courseId"));
  const title = String(formData.get("title")).trim();
  const description = String(formData.get("description") ?? "").trim();
  const published = formData.get("published") === "on";

  const course = await prisma.course.update({
    where: { id },
    data: { title, description: description || null, published },
  });
  await revalidateCourse(course.slug);
}

export async function createModuleAction(formData: FormData) {
  await requireAdmin();
  const courseId = String(formData.get("courseId"));
  const title = String(formData.get("title")).trim();
  if (!title) return;

  const max = await prisma.module.aggregate({
    where: { courseId },
    _max: { sortOrder: true },
  });
  await prisma.module.create({
    data: {
      courseId,
      title,
      sortOrder: (max._max.sortOrder ?? -1) + 1,
    },
  });
  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (course) await revalidateCourse(course.slug);
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function createLessonAction(formData: FormData) {
  await requireAdmin();
  const moduleId = String(formData.get("moduleId"));
  const title = String(formData.get("title")).trim();
  let slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  if (!title) return;
  if (!slug) {
    slug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  const max = await prisma.lesson.aggregate({
    where: { moduleId },
    _max: { sortOrder: true },
  });

  await prisma.lesson.create({
    data: {
      moduleId,
      title,
      slug,
      sortOrder: (max._max.sortOrder ?? -1) + 1,
    },
  });

  const mod = await prisma.module.findUnique({
    where: { id: moduleId },
    include: { course: true },
  });
  if (mod?.course) {
    await revalidateCourse(mod.course.slug);
    revalidatePath(`/admin/courses/${mod.course.id}`);
  }
}

export async function updateLessonAction(formData: FormData) {
  await requireAdmin();
  const lessonId = String(formData.get("lessonId"));
  const title = String(formData.get("title")).trim();
  const slug = String(formData.get("slug")).trim().toLowerCase();
  const videoUrl = String(formData.get("videoUrl") ?? "").trim();
  const body = String(formData.get("body") ?? "");

  const lesson = await prisma.lesson.update({
    where: { id: lessonId },
    data: {
      title,
      slug,
      videoUrl: videoUrl || null,
      body: body || null,
    },
    include: { module: { include: { course: true } } },
  });

  await revalidateCourse(lesson.module.course.slug);
  revalidatePath(`/admin/lessons/${lessonId}`);
  revalidatePath(`/dashboard/leccion/${lessonId}`);
}

export async function addMaterialLinkAction(formData: FormData) {
  await requireAdmin();
  const lessonId = String(formData.get("lessonId"));
  const title = String(formData.get("title")).trim();
  const url = String(formData.get("url")).trim();
  const rawKind = String(formData.get("kind") ?? "LINK").toUpperCase();

  if (!title || !url) return;

  const values = Object.values(MaterialKind) as string[];
  const kindEnum = values.includes(rawKind)
    ? (rawKind as MaterialKind)
    : MaterialKind.LINK;

  await prisma.material.create({
    data: {
      lessonId,
      title,
      url,
      kind: kindEnum,
    },
  });

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { module: { include: { course: true } } },
  });
  if (lesson) {
    await revalidateCourse(lesson.module.course.slug);
    revalidatePath(`/dashboard/leccion/${lessonId}`);
  }
  revalidatePath(`/admin/lessons/${lessonId}`);
}

export async function deleteMaterialAction(formData: FormData) {
  await requireAdmin();
  const materialId = String(formData.get("materialId"));
  const lessonId = String(formData.get("lessonId"));
  await prisma.material.delete({ where: { id: materialId } });
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { module: { include: { course: true } } },
  });
  if (lesson) await revalidateCourse(lesson.module.course.slug);
  revalidatePath(`/dashboard/leccion/${lessonId}`);
  revalidatePath(`/admin/lessons/${lessonId}`);
}

export async function uploadMaterialFileAction(
  formData: FormData
): Promise<void> {
  const admin = await requireAdmin();
  const lessonId = String(formData.get("lessonId"));
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return;

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.warn(
      "[upload] Falta BLOB_READ_WRITE_TOKEN — configura Vercel Blob o usa enlaces."
    );
    return;
  }

  const blob = await put(file.name, file, {
    access: "public",
    token,
  });

  const mime = file.type || "application/octet-stream";
  let kind: MaterialKind = MaterialKind.OTHER;
  if (mime.startsWith("image/")) kind = MaterialKind.IMAGE;
  else if (mime.startsWith("video/")) kind = MaterialKind.VIDEO;
  else if (mime === "application/pdf") kind = MaterialKind.PDF;

  await prisma.material.create({
    data: {
      lessonId,
      title: file.name,
      url: blob.url,
      kind,
      fileName: file.name,
      mimeType: mime,
      sizeBytes: file.size,
      uploadedById: admin.id,
    },
  });

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { module: { include: { course: true } } },
  });
  if (lesson) await revalidateCourse(lesson.module.course.slug);
  revalidatePath(`/dashboard/leccion/${lessonId}`);
  revalidatePath(`/admin/lessons/${lessonId}`);
}
