import { cn } from "@/lib/utils";
import {
  ArrowUpRightIcon,
  BookmarkIcon,
  BookOpenIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckBadgeIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentListIcon,
  FolderArrowDownIcon,
  FolderIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { Badge, Separator } from "@repo/ui";
import { Poppins } from "next/font/google";
import React from "react";
import Illustration1 from "./svgs/illustration1";

const font = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const ProblemSetCard = () => {
  return (
    <div className="w-72 overflow-hidden border border-border hover:border-borderhover rounded-xl select-none">
      {/* <div className="h-40">
        <a
          // className={styles.primary}
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            // src="https://images.pexels.com/photos/2801312/pexels-photo-2801312.jpeg"
            src="https://picsum.photos/200"
            width={240}
            height={124}
            alt="Authentication"
            className="block w-full h-full"
          />
        </a>
      </div>
      <div className="py-5 ">
        <div className={cn("px-4 text-muted-foreground mb-3", font.className)}>
          <a className="flex w-fit hover:cursor-pointer hover:underline">
            <p className="">LoveBabbar's DSA sheet 169</p>
            <ArrowUpRightIcon className="size-2 stroke-2" />
          </a>
        </div> */}
      <div className="relative h-40 bg-green-300 dark:bg-green-600">
        <div className="absolute overflow-hidden opacity-20 left-1/2">
          <Illustration1 />
        </div>
        <div className={cn("absolute z-10 p-6  ", font.className)}>
          <a className="">
            <p className="text-foreground/80">Love Babbar's</p>
            <p className="text-2xl text-foreground/80 dark:text-foreground">
              Faang DSA sheet 169
            </p>
          </a>
        </div>
        <div
          className={cn(
            "absolute bottom-0 pb-4 px-4 flex gap-2",
            font.className
          )}
        >
          <Badge className="rounded-md text-xs text-foreground bg-muted border-background cursor-pointer">
            Faang
          </Badge>
          <Badge className="rounded-md text-xs text-foreground bg-muted border-background cursor-pointer">
            Graphs
          </Badge>
          <Badge className="rounded-md text-xs text-foreground bg-muted border-background cursor-pointer">
            Trees
          </Badge>
        </div>
      </div>
      <div className="pb-5 ">
        {/* <div className="border-t border-t-border my-2"></div> */}
        <div className="px-5 h-16 flex gap-3 justify-center border-y border-y-border py-2">
          <div className="w-14 flex flex-col gap-2 items-center justify-center text-muted-foreground">
            <ClipboardDocumentListIcon className="size-4 " />
            <p className="text-xs">
              <span className="font-semibold">120</span> items
            </p>
            {/* <p className="text-[10px]">items</p> */}
          </div>
          <Separator orientation="vertical" />

          <div className="w-14 flex flex-col gap-2 items-center justify-center text-muted-foreground">
            <FolderIcon className="size-4" />
            <p className="text-xs">
              <span className="font-semibold">7</span> sections
            </p>
            {/* <p className="text-[10px]">items</p> */}
          </div>
          <Separator orientation="vertical" />

          <div className="w-14 flex flex-col gap-2 items-center justify-center text-muted-foreground">
            <CheckBadgeIcon className="size-4" />
            <p className="text-xs">
              <span className="font-semibold">Verified</span>
            </p>
            {/* <p className="text-[10px]">items</p> */}
          </div>
        </div>
        {/* <div className="border-t border-t-border my-2"></div> */}
        {/* <div className="mb-4"></div> */}
        {/* <div
          className={cn(
            "pt-4 px-4 text-muted-foreground flex gap-2",
            font.className
          )}
        >
          <Badge className="text-xs bg-muted-foreground cursor-pointer">
            Faang
          </Badge>
          <Badge className="text-xs bg-muted-foreground cursor-default">
            Graphs
          </Badge>
          <Badge className="text-xs bg-muted-foreground">Trees</Badge>
        </div> */}

        {/* <div className="p-4 text-xs text-muted-foreground line-clamp-3">
          Love Babbar is a youtuber known for his expertise in Data Structures
          and Algorithms (DSA). He has created a comprehensive love babbar dsa
          sheet that is widely used by students to prepare for coding
          interviews. The love Babbar dsa sheet contains a curated list of
          important DSA topics. Practice love babbar dsa sheet here to enhance
          your dsa knowledge.
        </div> */}

        {/* <div className="border-t border-t-border my-2"></div> */}
        <div className="my-4"></div>
        <div className="flex justify-around text-muted-foreground">
          <div>
            <HeartIcon className="size-5 hover:text-pink-500 hover:drop-shadow-[0_1px_5px_rgba(255,0,0,1)]" />
          </div>
          <div>
            <ChatBubbleBottomCenterTextIcon className="size-5 hover:text-primary hover:drop-shadow-[0_1px_5px_rgba(255,0,255,1)]" />
          </div>
          <div>
            <BookmarkIcon className="size-5 hover:text-foreground hover:drop-shadow-[0_1px_5px_hsl(var(--foreground))]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSetCard;
