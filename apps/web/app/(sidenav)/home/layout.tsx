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
export const metadata: Metadata = {
  title: "My Space | devroad.io",
  description:
    "All in one super app to share your Roadmaps, Experiences, Insights and Collections.",
};

export default function MySpaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="absolute top-0 left-0 ml-[72px] z-20 flex flex-col w-[calc(100%-72px)]">
      <div className="h-[58px] bg-[#F5F5F5] flex items-center justify-start gap-8 pl-8">
        <div className={cn("text-sm cursor-pointer", font.className)}>
          My Repositories
        </div>
        <div className={cn("text-sm cursor-pointer", font.className)}>
          My Collections
        </div>
        <div className={cn("text-sm cursor-pointer", font.className)}>
          My Projects
        </div>
      </div>
      <div className="shadow-[-2px_-2px_120px_rgba(0,0,0,0.25)] rounded-md p-8 mr-2 mb-2 bg-[#FFFFFF]">
        {children}
      </div>
    </div>
  );
}
