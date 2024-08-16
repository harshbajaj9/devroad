import React from "react";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});
interface HeaderProps {
  label: string;
}
const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1 className={cn("text-3xl font-semibold", font.className)}>Welcome</h1>
      {/* <p className="text-sm text-muted-foreground">{label}</p> */}
    </div>
  );
};

export default Header;
