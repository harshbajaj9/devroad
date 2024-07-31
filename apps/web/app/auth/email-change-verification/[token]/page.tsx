import { auth } from "@/auth";
import EmailChangeVerificationForm from "@/components/auth/email-change-verification-form";
import { getUserByEmail, getUserById } from "@/data/user";
import { getEmailVerificationTokenByToken } from "@/data/verification-token";
import { prisma } from "@/lib/db";
import React from "react";

const EmailChangeVerification = async ({
  params,
}: {
  params: { token: string };
}) => {
  const session = await auth();
  let message;
  const existingToken = await getEmailVerificationTokenByToken(params.token);
  if (!existingToken) {
    message = "Token does not exist";
  } else {
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) message = "Token expired";

    const existingUser = await getUserByEmail(existingToken.email);
    if (existingUser) message = "Email already in use";

    // const user = await getUserById(session?.user.id);
    if (existingUser) message = "Email already in use";
    else {
      await prisma.user.update({
        where: {
          id: session?.user.id,
        },
        data: {
          email: existingToken.email,
        },
      });
      message = "Email updated successfully";
    }
  }
  try {
    await prisma.emailVerificationToken.delete({
      where: { token: params.token },
    });
  } catch {}
  return <EmailChangeVerificationForm message={message} />;
};

export default EmailChangeVerification;
