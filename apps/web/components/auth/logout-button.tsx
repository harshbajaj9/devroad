"use client";
import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";
import React from "react";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}
const LogoutButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();
  const onClick = async () => {
    console.log("onClick");
    await logout();
    router.push("/auth/login");
  };
  if (mode === "modal") {
    return (
      <span className="cursor-pointer" onClick={onClick}>
        implement modal
      </span>
    );
  }
  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};

export default LogoutButton;