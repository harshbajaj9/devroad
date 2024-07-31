import { prisma } from "@/lib/db";

export const getEmailVerificationToken = async (email: string) => {
  try {
    return await prisma.emailVerificationToken.findFirst({
      where: { email: email },
    });
  } catch {
    return null;
  }
};
export const getEmailVerificationTokenByToken = async (token: string) => {
  try {
    return await prisma.emailVerificationToken.findFirst({
      where: { token },
    });
  } catch {
    return null;
  }
};
