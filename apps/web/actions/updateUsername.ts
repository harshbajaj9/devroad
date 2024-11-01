"use server";

import { auth, signIn } from "@/auth";
import { prisma } from "@/lib/db";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { EmailVerificationSchema, LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";
import { generateVerificationToken } from "@/lib/email-verification-token";
import { sendVerificiationEmail } from "@/lib/mail";

export const updateUsername = async (username: string) => {
  try {
    const session = await auth();
    const user = await prisma.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        username: username,
      },
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
  return { success: "username updated" };
};

export const updateUserEmail = async (email: string) => {
  try {
    const session = await auth();
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser && existingUser.id !== session?.user.id)
      return { error: "Account with email already exists" };
    const user = await prisma.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        newEmail: email,
      },
    });
    const emailVerificationToken = await generateVerificationToken(email);
    await sendVerificiationEmail(
      emailVerificationToken.email,
      emailVerificationToken.token
    );
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
  return { success: "Verification mail sent" };
};
