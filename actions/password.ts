"use server";

import { auth } from "@/auth";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export type PasswordFormState = { error: string | null; success?: boolean };

export async function setPasswordAction(
  _prev: PasswordFormState,
  formData: FormData
): Promise<PasswordFormState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Sesión no válida." };
  }

  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (password.length < 8) {
    return { error: "La contraseña debe tener al menos 8 caracteres." };
  }
  if (password !== confirm) {
    return { error: "Las contraseñas no coinciden." };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { passwordHash: await bcrypt.hash(password, 12) },
  });

  return { error: null, success: true };
}
