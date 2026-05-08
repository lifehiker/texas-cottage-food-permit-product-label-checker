import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import type { Provider } from "next-auth/providers";
import { z } from "zod";

import { db } from "@/lib/db";
import { env, hasGoogleAuth } from "@/lib/env";

process.env.AUTH_TRUST_HOST ??= "true";
if (env.authUrl) {
  process.env.AUTH_URL ??= env.authUrl;
  process.env.NEXTAUTH_URL ??= env.authUrl;
}
process.env.NEXTAUTH_URL_INTERNAL ??= env.internalAuthUrl;

const credentialsSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      name: { label: "Name", type: "text" },
    },
    authorize: async (rawCredentials) => {
      const parsed = credentialsSchema.safeParse(rawCredentials);
      if (!parsed.success) {
        return null;
      }

      const email = parsed.data.email.toLowerCase();
      const name = parsed.data.name?.trim() || email.split("@")[0];
      const user = await db.user.upsert({
        where: { email },
        create: { email, name },
        update: { name },
      });

      return { id: user.id, email: user.email, name: user.name, role: user.role };
    },
  }),
];

if (hasGoogleAuth()) {
  providers.push(
    Google({
      clientId: env.googleClientId!,
      clientSecret: env.googleClientSecret!,
    }),
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  secret: env.authSecret,
  trustHost: true,
  session: { strategy: "jwt" },
  providers,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        if (typeof token.id === "string") {
          session.user.id = token.id;
        }
        if (typeof token.role === "string") {
          session.user.role = token.role;
        }
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
