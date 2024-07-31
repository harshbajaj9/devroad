"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { EmailVerificationSchema, LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) return { error: "invalid fields" };
  // TODO: check if emailVerfied is false for the db user, then don't allow login
  const { email, password } = validatedFields.data;
  try {
    console.log("hello");
    await signIn("credentials", {
      email,
      password,
      // redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT_URL,
      redirectTo: DEFAULT_LOGIN_REDIRECT_URL,
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

export const resendLogin = async (
  values: z.infer<typeof EmailVerificationSchema>,
) => {
  const validatedFields = EmailVerificationSchema.safeParse(values);
  if (!validatedFields.success) return { error: "invalid fields" };
  // TODO: check if emailVerfied is false for the db user, then don't allow login
  const { email } = validatedFields.data;
  try {
    console.log("hello");
    await signIn("resend", {
      email,
      // redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT_URL,
      // redirectTo: DEFAULT_LOGIN_REDIRECT_URL,
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
