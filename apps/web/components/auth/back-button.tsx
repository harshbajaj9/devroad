"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@repo/ui";

interface BackButtonProps {
  label: string;
  href: string;
}
const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button variant={"link"} className="w-full font-normal" size={"sm"} asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
