import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { Role } from "@prisma/client";

async function getPrisma() {
  const { prisma } = await import("@/lib/prisma");
  return prisma;
}

async function refreshUserClaims(userId: string) {
  const prisma = await getPrisma();
  const u = await prisma.user.findUnique({ where: { id: userId } });
  if (!u) return null;
  return {
    sub: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    hasPassword: !!u.passwordHash,
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        const prisma = await getPrisma();
        const token = String(credentials?.token ?? "").trim();
        if (token) {
          const ot = await prisma.oneTimeLogin.findUnique({
            where: { token },
            include: { user: true },
          });
          if (!ot || ot.expiresAt < new Date()) return null;
          await prisma.oneTimeLogin.delete({ where: { id: ot.id } });
          return {
            id: ot.user.id,
            email: ot.user.email,
            name: ot.user.name,
          };
        }

        const email = String(credentials?.email ?? "")
          .trim()
          .toLowerCase();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash) return null;

        const bcrypt = await import("bcryptjs");
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const id = (user?.id as string | undefined) ?? (token.sub as string | undefined);
      if (!id) return token;

      const claims = await refreshUserClaims(id);
      if (!claims) return token;

      token.sub = claims.sub;
      token.email = claims.email;
      token.name = claims.name;
      token.role = claims.role;
      token.hasPassword = claims.hasPassword;

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.role = token.role as Role;
      session.user.hasPassword = !!token.hasPassword;
      return session;
    },
  },
});
