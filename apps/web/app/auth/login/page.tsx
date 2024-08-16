import LoginForm from "@/components/auth/login-form";
import React from "react";
import styles from "../../page.module.css";

// const page = () => {
//   return <LoginForm />;
// };

// export default page;

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Bricolage_Grotesque, Poppins } from "next/font/google";
// import { buttonVariants } from "@/registry/new-york/ui/button";
// import { UserAuthForm } from "@/app/(app)/examples/authentication/components/user-auth-form";

export const metadata: Metadata = {
  title: "devroad.io | Authentication",
  description: "Sign in to devroad.io",
};
const font = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
const font2 = Bricolage_Grotesque({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
export default function AuthenticationPage() {
  return (
    <>
      <div className="relative min-h-[100vh] w-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="flex items-center justify-start text-lg font-medium">
            <div className={cn(" mx-4 drop-shadow-md")}>
              <a
                className={styles.primary}
                href={`${process.env.NEXT_URL}`}
                // target="_blank"
                // rel="noopener noreferrer"
              >
                <img
                  className={styles.logo}
                  src="/devroad5.png"
                  alt="devroad logomark"
                  width={40}
                  height={40}
                />
              </a>
            </div>

            <div
              className={cn(
                "font-bold text-white text-3xl drop-shadow-md align-bottom pt-[2px]",
                font.className
              )}
            >
              dev<span className="font-light">road</span>.io
            </div>
          </div>
          <div className="p-8 pt-16 relative z-20">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <LoginForm />
              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-secondary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-secondary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-md">
                &ldquo;This app has saved me countless hours of search for
                meaningful resources and preparation and helped me in getting
                the job faster than ever before.&rdquo;
              </p>
              <footer className="text-sm text-end">Sofia Davis</footer>
            </blockquote>
            <blockquote className="space-y-2">
              <p className="text-md">
                &ldquo;I use this app to capture all my inspiration and
                resources for my new side project.&rdquo;
              </p>
              <footer className="text-sm text-end">Sam Jackson</footer>
            </blockquote>
          </div>
        </div>
        <div className="relative hidden h-full flex-col bg-muted text-white dark:border-r lg:flex">
          {/* <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <LoginForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div> */}
          <Image
            src="/loginbg.jpg"
            width={1280}
            height={843}
            alt="Authentication"
            className="block dark:hidden w-full h-full"
          />
        </div>
      </div>
    </>
  );
}
