import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificiationEmail = async (email: string, token: string) => {
  const confirmationLink = `${process.env.NEXT_URL}/auth/email-change-verification/${token}`;
  await resend.emails.send({
    from: "hola@devroad.io",
    to: email,
    subject: "Verify email",
    html: `<p>Click <a href="${confirmationLink}">here</a> to confirm email.</p>`,
  });
};
