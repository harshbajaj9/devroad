import NextAuth, { DefaultSession, NextAuthResult } from "next-auth";
// import { Session } from "next-auth";
import "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import { authConfig } from "@/auth.config";
import Resend from "next-auth/providers/resend";
import { getUserById } from "@/data/user";
// import { $Enums } from "@prisma/client";
// import { $Enums } from "@repo/database";

declare module "next-auth" {
  interface Session {
    user: {
      role?: "ADMIN" | "USER";
      id: string;
      username: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    role?: "ADMIN" | "USER";
    username?: string;
  }
}

const nextAuthResult = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    ...authConfig.providers,
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "Devroad<hello@devroad.io>",
    }),
  ],
  // TODO: the below is commented as the session strategy is jwt by default, so currently sticking with it. If using database, add the session model in the schema which is commented
  // NOTE: if I dont add the below line, and import auth.ts in middleware, it says prisma client not supported on edge. If I import the authConfig middleware, it gives session as null. But as soon as I add strategy as jwt,(on importing auth.ts in middleware), it doesn't complain about prisma client not compatible on edge and also gives the session.
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;
      const user = await getUserById(token.sub);
      if (!user) return token;
      token.role = user.role;
      token.username = user.username || "";
      return token;
    },
    // Could add  { token: JWT; session: Session } for below types
    async session({ token, session, user }) {
      if (token.sub && session.user) session.user.id = token.sub;
      if (token.role && session.user) session.user.role = token.role;
      if (token.username && session.user)
        session.user.username = token.username;
      return session;

      // Below is an alternate way of adding id to the session user
      // return {
      //   ...session,
      //   user: {
      //     ...session.user,
      //     id: user.id,
      //   },
      // };
    },
    // async signIn({ user }) {
    //   if (!user.id) return false;
    //   const existingUser = await getUserById(user.id);
    //   if (!existingUser || !existingUser.emailVerified) return false;
    //   return true;
    // },
  },
  events: {
    async linkAccount({ account, user, profile }) {
      const profileObj =
        account.provider === "google"
          ? {
              googleMail: profile.email,
              googleImage: profile.image,
            }
          : {
              githubMail: profile.email,
              githubImage: profile.image,
            };
      await prisma.user.update({
        where: {
          id: user.id,
        },
        // data: {
        //   emailVerified: new Date(),
        // },
        data: profileObj,
      });
    },
  },
});
// https://github.com/nextauthjs/next-auth/discussions/9950
export const signIn: NextAuthResult["signIn"] = nextAuthResult.signIn;
export const { handlers, signOut, auth }: NextAuthResult = nextAuthResult;
