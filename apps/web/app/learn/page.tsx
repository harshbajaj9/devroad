import Post2 from "@/components/post2";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage, Badge, Button } from "@repo/ui";
import { Poppins } from "next/font/google";
import Image from "next/image";
import React from "react";

const roadmaps = [
  { text: "DSA Problem Sets" },
  { text: "Frontend Roadmaps" },
  { text: "UI/UX Roadmaps" },
  { text: "SDE Interview Roadmaps" },
  { text: "PM Interview Roadmap" },
  { text: "System Design Roadmaps" },
];
const font = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
const page = () => {
  return (
    <div className="">
      <div className="flex flex-wrap gap-6">
        <Post2 />
        <Post2 />
        <Post2 />
        <Post2 />
      </div>
      <div className={cn("text-3xl font-semibold m-4", font.className)}>
        Top Categories
      </div>
      <div className="flex gap-4 flex-wrap m-4">
        {roadmaps.map((roadmap, id) => (
          <Badge key={id} className="cursor-pointer">
            {roadmap.text}
          </Badge>
        ))}
      </div>
      <div className="flex">roadmaplists</div>
      <div className="flex">
        <Button className="">Let's go</Button>
      </div>
      <div className="w-full border my-8"></div>
      <div className="flex gap-4 justify-center">
        <div>
          <div className="flex justify-center">
            <div className="rounded m-2 min-w-40 min-h-40 bg-yellow-400"></div>
            <div className="rounded m-2 min-w-40 min-h-40 bg-orange-500"></div>
            <div className="rounded m-2 min-w-40 min-h-40 bg-[#ff4a37]"></div>
          </div>
          <div className="flex  justify-center">
            <div className="rounded m-2 min-w-40 min-h-40 bg-[#f2295d]"></div>
            <div className="rounded m-2 min-w-40 min-h-40 bg-[#ae1b8e]"></div>
            <div className="rounded m-2 min-w-40 min-h-40 bg-[#6366f1]"></div>
          </div>
          <div className="flex  justify-center">
            <div className="rounded m-2 min-w-40 min-h-40 bg-[#2ab327]"></div>
            <div className="rounded m-2 min-w-40 min-h-40 bg-[#8037ff]"></div>
            <div className="rounded m-2 min-w-40 min-h-40 bg-[#7474ff]"></div>
          </div>
          <div className="flex  justify-center">
            <div className="rounded m-2 min-w-40 min-h-40 bg-[#3aff37]"></div>
            <div className="rounded m-2 min-w-40 min-h-40 bg-[#2ab327]"></div>
            <div className="rounded m-2 min-w-40 min-h-40 bg-[#3d65ff]"></div>
          </div>
        </div>
        <div>
          <div className="flex justify-center">
            <div className="rounded m-2 min-w-40 min-h-40 bg-[#ff8e10]"></div>
            <div className="rounded m-2 min-w-40 min-h-40 bg-[#ff6b23]"></div>
            <div className="rounded m-2 min-w-40 min-h-40 bg-[#ff4a37]"></div>
          </div>
          <div className="flex  justify-center">
            <div className="rounded m-2 min-w-40 min-h-40 bg-[#f2295d]"></div>
            <div className="rounded m-2 min-w-40 min-h-40 bg-[#ae1b8e]"></div>
            <div className="rounded m-2 min-w-40 min-h-40 bg-[#6366f1]"></div>
          </div>
          <div className="flex  justify-center">
            <div className="rounded m-2 min-w-40 min-h-40 bg-[#2ab327]"></div>
            <div className="rounded m-2 min-w-40 min-h-40 bg-[#8037ff]"></div>
            <div className="rounded m-2 min-w-40 min-h-40 bg-[#7474ff]"></div>
          </div>
          <div className="flex  justify-center">
            <div className="rounded m-2 min-w-40 min-h-40 bg-[#3aff37]"></div>
            <div className="rounded m-2 min-w-40 min-h-40 bg-[#2ab327]"></div>
            <div className="rounded m-2 min-w-40 min-h-40 bg-[#3d65ff]"></div>
          </div>
        </div>
      </div>

      <div className="my-6 border-b"></div>

      <div className="flex justify-center">
        <div className="rounded m-2 min-w-40 min-h-40 bg-[#3d65ff]"></div>
        <div className="rounded m-2 min-w-40 min-h-40 bg-[#4733d1]"></div>
        <div className="rounded m-2 min-w-40 min-h-40 bg-[#a823dc]"></div>
      </div>
      <div className="flex  justify-center">
        <div className="rounded m-2 min-w-40 min-h-40 bg-[#ff4fa0]"></div>
        <div className="rounded m-2 min-w-40 min-h-40 bg-[#4ee4c9]"></div>
        <div className="rounded m-2 min-w-40 min-h-40 bg-[#6366f1]"></div>
      </div>
      <div className="flex  justify-center">
        <div className="rounded m-2 min-w-40 min-h-40 bg-[#2ab327]"></div>
        <div className="rounded m-2 min-w-40 min-h-40 bg-[#8037ff]"></div>
        <div className="rounded m-2 min-w-40 min-h-40 bg-[#7474ff]"></div>
      </div>
      <div className="flex  justify-center">
        <div className="rounded m-2 min-w-40 min-h-40 bg-[#3aff37]"></div>
        <div className="rounded m-2 min-w-40 min-h-40 bg-[#2ab327]"></div>
        <div className="rounded m-2 min-w-40 min-h-40 bg-[#7474ff]"></div>
      </div>
    </div>
  );
};

export default page;
