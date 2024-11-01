"use client";
import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui";
import {
  ArrowUpRight,
  Bookmark,
  Heart,
  HelpCircle,
  Link,
  MessageCircleMore,
} from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import React from "react";

const font = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const Post2 = () => {
  const [open, setOpen] = React.useState(false);

  return (
    // <div className="relative w-80 rounded-xl overflow-hidden dark:bg-[#232224] dark:bg-[linear-gradient(139deg,rgba(123,66,255,0.06),rgba(96,55,195,0)_21%,rgba(59,39,112,0)_61%,rgba(123,66,255,0)_88%,rgba(123,66,255,0.06))]">
    // <div className="relative w-80 rounded-3xl overflow-hidden dark:bg-[#171820] dark:bg-[linear-gradient(hsla(0,0%,100%,0.06),hsla(0,0%,100%,0.03))] border  dark:border-gray-700 dark:hover:border-gray-600 duration-200">
    <div className="relative w-80 rounded-3xl overflow-hidden dark:bg-[#171820] dark:bg-[linear-gradient(hsla(0,0%,100%,0.06),hsla(0,0%,100%,0.03))] border border-border hover:border-borderhover duration-200">
      <Avatar className="absolute left-0 top-0 m-4">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-full h-60">
        <img
          src="https://images.pexels.com/photos/2801312/pexels-photo-2801312.jpeg"
          width={240}
          height={124}
          alt="Authentication"
          className="block w-full h-full"
        />
      </div>

      <div className="w-full p-4 text-sm  text-ellipsis overflow-hidden rounded-br-xl rounded-bl-xl  ">
        <div className={cn(" text-gray-300 mb-3", font.className)}>
          <a className="flex w-fit hover:cursor-pointer hover:underline">
            <p className="">Lucide: icons</p>
            <ArrowUpRight size={10} />
          </a>
        </div>
        <div className="text-gray-400">
          Officia excepteur ea laborum laborum velit elit ut excepteur
          consectetur laboris. Mollit aliqua pariatur velit laboris ad et veniam
          excepteur cupidatat et. Eiusmod velit Lorem commodo Lorem veniam
          cupidatat sunt fugiat aute cupidatat sit. Id quis irure incididunt
          velit reprehenderit esse commodo mollit duis sit eu. Duis aliquip amet
          ea excepteur.
        </div>
        <div className="border-b my-2"></div>
        <div className="flex justify-around">
          <div className="group flex gap-1 items-center cursor-pointer ">
            {/* <Heart className=" text-[#c3bccf]  group-hover:text-[#f2295d] duration-200" /> */}
            {/* <p className="text-[#c3bccf] group-hover:text-[#f2295d] duration-200">
              1.4k
            </p> */}
            <Heart fill="#f2295d" className="text-[#f2295d] drop-shadow-md" />
            <p className="text-[#f2295d] duration-200 font-semibold">1.4k</p>
          </div>
          <div className="group flex gap-1 items-center cursor-pointer">
            <div className="group-hover:bg-[#255643] rounded-xl p-1 duration-200">
              <MessageCircleMore className="text-[#c3bccf] group-hover:text-[#2ab327] duration-200" />
            </div>
            <p className="text-[#c3bccf] group-hover:text-[#2ab327] duration-200">
              137
            </p>
          </div>
          <div>
            <TooltipProvider>
              <Tooltip open={open}>
                <TooltipTrigger asChild>
                  <Link
                    className="cursor-pointer  text-[#c3bccf] hover:text-[#ff4a37] duration-200"
                    onClick={() => setOpen(!open)}
                    // onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                    // onTouchStart={() => setOpen(!open)}
                    onKeyDown={(e) => {
                      e.preventDefault();
                      e.key === "Enter" && setOpen(!open);
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent className="dark:bg-[#]">
                  <p>Link Copied!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Bookmark className="cursor-pointer text-[#b7a8cf] hover:text-[#7474ff] duration-200" />
        </div>
      </div>
    </div>
  );
};

export default Post2;
