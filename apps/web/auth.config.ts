import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
// import Resend from "next-auth/providers/resend";
// import Apple from "next-auth/providers/apple";
// import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
// import { LoginSchema } from "@/schemas";
// import { getUserByEmail } from "@/data/user";
// import bcrypt from "bcryptjs";

export const authConfig: NextAuthConfig = {
  providers: [
    // Credentials({
    //   async authorize(credentials) {
    //     const validatedFields = LoginSchema.safeParse(credentials);
    //     if (validatedFields.success) {
    //       const { email, password } = validatedFields.data;
    //       const user = await getUserByEmail(email);
    //       // no user or OAuth login
    //       if (!user || !user.password) return null;
    //       const passwordsMatch = await bcrypt.compare(password, user.password);
    //       if (passwordsMatch) return user;
    //     }
    //     return null;
    //   },
    // }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      // allowDangerousEmailAccountLinking: true,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // allowDangerousEmailAccountLinking: true,
    }),
  ],
} satisfies NextAuthConfig;
