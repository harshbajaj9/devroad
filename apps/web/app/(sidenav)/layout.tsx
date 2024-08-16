import type { Metadata } from "next";
import localFont from "next/font/local";
// import "./globals.css";
import styles from "./page.module.css";

import "@repo/ui/styles/globals.css";
import { Bricolage_Grotesque, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button, Input } from "@repo/ui";
import Sidebar from "@/components/sidebar";

const font = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
const font2 = Bricolage_Grotesque({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
// });

export const metadata: Metadata = {
  title: "devroad.io",
  description:
    "All in one super app to share your Roadmaps, Experiences, Insights and Collections.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-start justify-between">
      <Sidebar />
      {/* <div className="relative w-full h-full bg-[#F5F5F5] dark:bg-[#120e17]"> */}
      {/* <div className="relative w-full h-full bg-[#F5F5F5] dark:bg-[#1a1b1c]"> */}
      <div className="relative w-full h-full bg-[#F5F5F5] dark:bg-[#17181d]">
        {children}
      </div>
    </div>
  );
}
