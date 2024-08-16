"use client";
import { cn } from "@/lib/utils";
import {
  BookOpenIcon,
  BriefcaseIcon,
  DevicePhoneMobileIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as ActiveHomeIcon,
  BookOpenIcon as ActiveBookOpenIcon,
  BriefcaseIcon as ActiveBriefcaseIcon,
  DevicePhoneMobileIcon as ActiveDevicePhoneMobileIcon,
} from "@heroicons/react/24/solid";

import { Bricolage_Grotesque, Poppins, Stick } from "next/font/google";
import React from "react";
import { ModeToggle } from "./theme-toggle-button";
import { usePathname } from "next/navigation";
import Link from "next/link";

const font = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
const font2 = Bricolage_Grotesque({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const sidenavs = [
  {
    icon: (
      <HomeIcon className="size-5 group-hover:scale-110 text-muted-foreground group-hover:text-muted duration-150" />
    ),
    title: "Home",
    href: "/home",
    activeIcon: (
      <ActiveHomeIcon className="size-5 text-background group-hover:scale-110  duration-150" />
    ),
  },
  {
    icon: (
      <BookOpenIcon className="size-5 group-hover:scale-110 text-muted-foreground group-hover:text-muted duration-150" />
    ),
    title: "Learn",
    href: "/learn",
    activeIcon: (
      <ActiveBookOpenIcon className="size-5 text-background group-hover:scale-110  duration-150" />
    ),
  },
  {
    icon: (
      <BriefcaseIcon className="size-5 group-hover:scale-110 text-muted-foreground group-hover:text-muted duration-150" />
    ),
    title: "Job",
    href: "/job",
    activeIcon: (
      <ActiveBriefcaseIcon className="size-5 text-background group-hover:scale-110  duration-150" />
    ),
  },
  {
    icon: (
      <DevicePhoneMobileIcon className="size-5 group-hover:scale-110 text-muted-foreground group-hover:text-muted duration-150" />
    ),
    title: "Explore",
    href: "/explore",
    activeIcon: (
      <ActiveDevicePhoneMobileIcon className="size-5 text-background group-hover:scale-110  duration-150" />
    ),
  },
];
const Sidebar = () => {
  const pathname = usePathname();

  return (
    // <div className="top-0 left-0 fixed z-10 h-screen min-w-[72px] bg-[#F5F5F5] dark:bg-[#120e17] p-1 pt-16 ">
    // <div className="top-0 left-0 fixed z-10 h-screen min-w-[72px] bg-[#F5F5F5] dark:bg-[#1a1b1c] p-1 pt-16 ">
    // <div className="top-0 left-0 fixed z-10 h-screen min-w-[72px] bg-[#F5F5F5] dark:bg-[#17181d]  dark:bg-[--background] p-1 pt-16 ">
    <div className="top-0 left-0 fixed z-10 h-screen min-w-[72px] bg-backgroundalt p-1 pt-16 ">
      <div className=" flex flex-col gap-4 justify-start">
        {sidenavs.map((snav) => {
          const isActive = pathname.startsWith(snav.href);
          return (
            <div
              key={snav.title}
              className="flex flex-col gap-1 items-center cursor-pointer"
            >
              <div
                className={`group hover:bg-foreground p-2 rounded-lg duration-150 ${isActive ? "bg-foreground" : ""}`}
              >
                <Link
                  className="group-hover:scale-110 duration-150"
                  href={snav.href}
                >
                  {isActive ? snav.activeIcon : snav.icon}
                </Link>
              </div>
              <div
                className={cn(
                  // "font-semibold text-[11px] text-zinc-700 dark:text-zinc-400",
                  "font-semibold text-[11px] text-muted-foreground",
                  font.className,
                  isActive ? "text-foreground" : ""
                )}
              >
                {snav.title}
              </div>
            </div>
          );
        })}
      </div>
      <div className="bottom-0 left-0 w-full absolute flex flex-col items-center gap-2 mb-2">
        <div>
          <ModeToggle />
        </div>
        <div className="w-8 h-8  bg-green-900 rounded-full flex items-center justify-center">
          <div className="text-yellow-300 text-center">
            <div className="mb-1">sp</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
