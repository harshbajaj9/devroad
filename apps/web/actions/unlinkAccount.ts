"use server";

import { auth, signIn } from "@/auth";
import { prisma } from "@/lib/db";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { EmailVerificationSchema, LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const unlinkAccount = async (provider: string) => {
  try {
    console.log("hello");
    const session = await auth();
    const user = await prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
    });

    if (!user) return;
    await prisma.account.deleteMany({
      where: {
        user: user,
      },
    });
    const updateObj =
      provider === "google"
        ? {
            googleMail: null,
            googleImage: null,
          }
        : {
            githubMail: null,
            githubImage: null,
          };
    await prisma.user.update({
      where: {
        id: session?.user.id,
      },
      data: updateObj,
    });
  } catch (err) {
    console.log("hello1");
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw err;
  }
  return { success: "email sent" };
};
