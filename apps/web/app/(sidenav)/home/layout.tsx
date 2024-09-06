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
      <div className="min-h-[58px] bg-backgroundalt"></div>
      {/* <nav className="h-[58px] bg-backgroundalt flex items-center justify-start gap-8 pl-8">
        <div className={cn("text-sm cursor-pointer", font.className)}>
          <Link href={"/learn/problem-sets"}>My Problem Sets</Link>
        </div>
        <div className={cn("text-sm cursor-pointer", font.className)}>
          <Link href={"/learn/collections"}>My Collections</Link>
        </div>
        <div className={cn("text-sm cursor-pointer", font.className)}>
          <Link href={"/learn/roadmaps"}>My Roadmaps</Link>
        </div>
        <div className={cn("text-sm cursor-pointer ", font.className)}>
          <Link href={"/learn/guides"}>My Guides</Link>
        </div>
        <div className={cn("text-sm cursor-pointer", font.className)}>
          <Link href={"/learn/tutorials"}>My Tutorials</Link>
        </div>
      </nav> */}
      <div className="rounded-md p-8 mr-2 mb-2 bg-backgroundalt border">
        {children}
      </div>
    </div>
  );
}
