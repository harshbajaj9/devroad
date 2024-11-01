import { getEmailVerificationToken } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "./db";
import { Prisma } from "@prisma/client";

export const generateVerificationToken = async (email: string) => {
  const existingVerificationToken = await getEmailVerificationToken(email);
  if (existingVerificationToken)
    await prisma.emailVerificationToken.delete({
      where: {
        identifier: existingVerificationToken.identifier,
      },
    });

  // const data : Prisma.EmailVerificationTokenUncheckedCreateInput = {
  //   email,
  //   expires: new Date(new Date().getTime() + 3600 * 1000),
  //   token: uuidv4(),
  // };
  const newEmailVerificationToken = await prisma.emailVerificationToken.create({
    data: {
      email,
      expires: new Date(new Date().getTime() + 3600 * 1000),
      token: uuidv4(),
    },
  });
  return newEmailVerificationToken;
};
