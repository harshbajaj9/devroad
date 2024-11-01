"use server";

import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) return { error: "invalid fields" };
  // console.log(validateFields);
  const { email, password, name } = validateFields.data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (existingUser) {
    return { error: "Email already in use" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      // name: name.replace(/\s/g, "").toLowerCase(),
      name: name,
      email,
      password: hashedPassword,
    },
  });
  // TODO: Send verification token mail

  return { success: "email sent" };
};
