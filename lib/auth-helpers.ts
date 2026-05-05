import { Role } from "@prisma/client";

export function parseAdminEmails(): Set<string> {
  const raw = process.env.ADMIN_EMAILS ?? "";
  return new Set(
    raw
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean)
  );
}

export function roleForEmail(email: string): Role {
  return parseAdminEmails().has(email.toLowerCase()) ? Role.ADMIN : Role.STUDENT;
}
