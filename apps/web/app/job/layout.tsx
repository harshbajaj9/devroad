import type { Metadata } from "next";
import localFont from "next/font/local";
// import "./globals.css";
import styles from "./page.module.css";

import "@repo/ui/styles/globals.css";
import { Bricolage_Grotesque, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  Button,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui";
import Sidebar from "@/components/sidebar";
import { Search } from "lucide-react";
import Link from "next/link";

const font = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
const font2 = Bricolage_Grotesque({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Explore | devroad.io",
  description:
    "All in one super app to share your Roadmaps, Experiences, Insights and Collections.",
};

export default function ExploreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="absolute top-0 left-0 ml-[72px] z-20 flex flex-col w-[calc(100%-72px)]">
      <nav className="h-[58px] bg-backgroundalt flex items-center justify-start gap-8 pl-8">
        <div className={cn("text-sm cursor-pointer", font.className)}>
          <Link href={"/companies"}>Companies</Link>
        </div>
        <div className={cn("text-sm cursor-pointer", font.className)}>
          <Link href={"/interview-questions"}>Questions</Link>
        </div>
        <div className={cn("text-sm cursor-pointer", font.className)}>
          <Link href={"/interview-experiences"}>Interview Exp</Link>
        </div>
      </nav>
      {/* <div className="h-[58px] bg-[#F5F5F5] dark:bg-[#120e17] flex items-center justify-start gap-8 pl-8"> */}
      {/* <div className="h-[58px] bg-[#F5F5F5] dark:bg-[#1a1b1c] flex items-center justify-start gap-8 pl-8"> */}

      {/* <div className="h-[58px] bg-[#F5F5F5] dark:bg-[#17181d] flex items-center justify-start gap-8 pl-8">
        <div className={cn("text-sm cursor-pointer", font.className)}>
          Projects
        </div>
        <div className={cn("text-sm cursor-pointer", font.className)}>
          Collections
        </div>
        <div className={cn("text-sm cursor-pointer", font.className)}>
          Roadmaps
        </div>
      </div> */}

      {/* <div className="shadow-[-2px_-2px_120px_rgba(0,0,0,0.25)] rounded-md p-8 mr-2 mb-2 bg-[#FFFFFF] dark:bg-[#1e1726]"> */}
      {/* <div className="shadow-[-2px_-2px_120px_rgba(0,0,0,0.25)] rounded-md p-8 mr-2 mb-2 bg-[#FFFFFF] dark:bg-[#1a1b1c] border dark:border-gray-700"> */}
      <div className="shadow-[-2px_-2px_120px_rgba(0,0,0,0.25)] rounded-md p-8 mr-2 mb-2 bg-[#FFFFFF] dark:bg-[#17181d] border dark:border-gray-700">
        {children}
      </div>
    </div>
  );
}
