import Image from "next/image";
import styles from "./page.module.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
  Input,
} from "@repo/ui";
import LoginButton from "@/components/auth/login-button";
import { cn } from "@/lib/utils";
import { Bricolage_Grotesque, Poppins } from "next/font/google";
const font = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
const font2 = Bricolage_Grotesque({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
export default function Home() {
  return (
    <>
      <nav>
        <div className="w-[90vw] min-h-16 m-auto bg-white flex p-4 justify-between">
          <div className="flex gap-2">
            <div
              className={cn(
                "m-auto font-bold text-black text-3xl drop-shadow-md"
                // font.className
              )}
            >
              <a
                className={styles.primary}
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className={styles.logo}
                  src="/devroad3.png"
                  alt="devroad logomark"
                  width={40}
                  height={40}
                />
              </a>
            </div>

            <div
              className={cn(
                "font-bold text-black text-3xl drop-shadow-md align-bottom pt-[2px]",
                font.className
              )}
            >
              dev<span className="font-light">road</span>.io
            </div>
          </div>

          <div className="flex gap-2">
            <Input
              className="rounded-full text-md font-semibold text-gray-700 px-4 placeholder:text-gray-300"
              placeholder="john@example.com"
            ></Input>
            <Button
              // variant="test"
              className="m-y-auto rounded-full text-md font-bold"
            >
              Join the waitlist
            </Button>
            <LoginButton mode="redirect">
              <Button
                className="m-y-auto rounded-full text-md font-bold"
                variant={"ghost"}
                size={"lg"}
              >
                Login
              </Button>
            </LoginButton>
          </div>
        </div>
      </nav>
      <div className={styles.page}>
        <main className={styles.main}>
          <div className="m-20 mt-8 max-w-[1200px]  grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* <div className="mx-10 max-w-[1200px]"> */}
            <div className="">
              <h1
                className={cn(
                  "m-auto font-bold text-black text-6xl drop-shadow-md",
                  font2.className
                )}
              >
                The all in one super app for every step of your journey
                {/* <span className=" relative whitespace-nowrap">
                  <span className="absolute bg-[#f0f0f0] -left-2 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1"></span>
                  <span className="relative text-neutral italic">prep</span>
                </span>{" "}
                and{" "}
                <span className=" relative whitespace-nowrap">
                  <span className="absolute bg-[#f0f0f0] -left-2 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1"></span>
                  <span className="relative text-neutral italic">job-hunt</span>
                </span> */}
                .
              </h1>
              <div
                className={cn(
                  "m-auto mt-4 font-semibold text-gray-600 text-lg"
                )}
              >
                <p className={cn("", font2.className)}>
                  We have seen the bulls and the bears. These tough times have
                  uncovered many{" "}
                  <span className={cn("font-medium italic", font.className)}>
                    road
                  </span>
                  -blocks in our journey.
                </p>
                <br />
                <p className={cn("", font2.className)}>
                  Whether you are a solopreneur or professional looking for
                  work, this app is an attempt to assist you in your
                  preparation, be it sharpening your core skills, managing your
                  side-projects or a more deterministic job hunt.
                </p>
              </div>
              <div
                className={cn(
                  "m-auto mt-8 font-semibold text-gray-600 text-2xl"
                )}
              >
                <p className={cn("", font2.className)}>
                  Join now to experience the beta.
                </p>
              </div>
              <div className="mt-2 flex gap-2 w-96">
                <Input
                  className="rounded-full text-md font-semibold text-gray-700 px-4 placeholder:text-gray-300"
                  placeholder="john@example.com"
                ></Input>
                <Button
                  // variant="test"
                  className="m-y-auto rounded-full text-md font-bold"
                >
                  Join the waitlist
                </Button>
              </div>
            </div>
            <div className="">
              <ul>
                <li>
                  <div className="p-4 flex gap-4 items-center ">
                    <div className="">
                      <img
                        className={styles.logo}
                        src="/devroad3.png"
                        alt="devroad logomark"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">
                        Create & share repositories
                      </h2>
                      <p>Create & share roadmaps, tutorials, courses etc.</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="p-4 flex gap-4 items-center ">
                    <div className="">
                      <img
                        className={styles.logo}
                        src="/devroad3.png"
                        alt="devroad logomark"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">
                        Share repositories
                      </h2>
                      <p>Create & share roadmaps, tutorials, courses etc.</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="p-4 flex gap-4 items-center ">
                    <div className="">
                      <img
                        className={styles.logo}
                        src="/devroad3.png"
                        alt="devroad logomark"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">
                        Share repositories
                      </h2>
                      <p>Create & share roadmaps, tutorials, courses etc.</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="p-4 flex gap-4 items-center ">
                    <div className="">
                      <img
                        className={styles.logo}
                        src="/devroad3.png"
                        alt="devroad logomark"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">
                        Share repositories
                      </h2>
                      <p>Create & share roadmaps, tutorials, courses etc.</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </main>
        {/* <footer className={styles.footer}> */}
      </div>
      <footer className="px-20 flex w-full bg-white">
        <div className="">
          <div className="max-w-[1200px] h-16 m-auto bg-white flex p-3 justify-between">
            <div className="flex gap-2">
              <div
                className={cn(
                  "m-auto font-bold text-black text-3xl drop-shadow-md"
                  // font.className
                )}
              >
                <a
                  className={styles.primary}
                  href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className={styles.logo}
                    src="/devroad3.png"
                    alt="devroad logomark"
                    width={36}
                    height={36}
                  />
                </a>
              </div>

              <div
                className={cn(
                  "font-bold text-black text-2xl drop-shadow-md align-bottom pt-[4px]",
                  font.className
                )}
              >
                dev<span className="font-light">road</span>.io
              </div>
            </div>

            <div className="flex gap-2">
              <Input
                className="rounded-full text-md font-semibold text-gray-700 px-4 placeholder:text-gray-300"
                placeholder="john@example.com"
              ></Input>
              <Button
                // variant="test"
                className="m-y-auto rounded-full text-md font-bold"
              >
                Join the waitlist
              </Button>
            </div>
          </div>
        </div>
        {/* <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file-text.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a> */}
      </footer>
    </>
  );
}
