"use server";

import { signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const logout = async () => {
  try {
    console.log("hello");
    await signOut({
      // redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT_URL,
      redirectTo: "/auth/login",
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
