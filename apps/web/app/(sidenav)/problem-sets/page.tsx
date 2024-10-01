import ProblemSetCard from "@/components/ps-card";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";

const Tag = ({ title, count }: { title: string; count: string }) => {
  return (
    <div className="group flex items-center">
      <a
        href={"/problem-sets/tag/dsa"}
        className="inline-flex items-center gap-1"
      >
        <p className="dark:group-hover:text-yellow-500 text-md">{title}</p>
        <div className="dark:group-hover:bg-yellow-800 text-xs bg-muted rounded-full px-2 ">
          {count}
        </div>
      </a>
    </div>
  );
};

const tagsList = [
  { title: "DSA", count: "231" },
  { title: "Guesstimates", count: "140" },
  { title: "Database", count: "95" },
  { title: "ML", count: "42" },
  { title: "System Design", count: "77" },
  { title: "Data Science", count: "56" },
];
const ProblemSets = () => {
  return (
    <div className="h-[1600px]">
      {/* <div className="my-8 text-2xl">Popular Tags</div> */}
      <div className=" border-b border-border">
        <div className="flex gap-4 items-center">
          {tagsList.map((tag) => (
            <Tag title={tag.title} count={tag.count} />
          ))}
          {/* <a className="inline-flex items-center" href="/tag/string">
            <span className="whitespace-nowrap  group-hover:text-blue dark:group-hover:text-dark-blue text-label-1 dark:text-dark-label-1">
              String
            </span>
            <span className="ml-1 flex h-[18px] items-center justify-center rounded-[10px] px-1.5 text-xs font-normal text-label-3 dark:text-dark-label-3 bg-fill-3 dark:bg-muted group-hover:text-blue dark:group-hover:text-dark-blue group-hover:bg-blue-0 dark:group-hover:bg-dark-blue-0">
              713
            </span>
          </a> */}
        </div>
        <div className="flex justify-center mt-4 -mb-3">
          <div className="flex justify-center items-center rounded-full h-6 w-6 bg-foreground">
            <ChevronDownIcon className="size-4 text-background stroke-2" />
          </div>
        </div>
      </div>

      <div className="my-8 flex gap-2 m-4">
        <ProblemSetCard />
        <ProblemSetCard />
        <ProblemSetCard />
        <ProblemSetCard />
      </div>
    </div>
  );
};

export default ProblemSets;
