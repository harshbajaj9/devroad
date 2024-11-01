"use client";

import React from "react";
import { toast } from "sonner";

interface ToastProps {
  message?: React.ReactNode;
  title: React.ReactNode;
  type?: "success" | "error" | "message";
  duration?: number;
}

// default duration is 4000 for the toast
export function Toast({ message, title, type, duration = 4000 }: ToastProps) {
  const showToast = (
    type: "success" | "error" | "message",
    title: string | React.ReactNode,
    message?: string | React.ReactNode
  ) => {
    toast[type](
      <div>
        <h1 className="text-md font-bold">{title}</h1>
        {message && <p>{message}</p>}
      </div>,
      {
        duration: duration,
      }
    );
  };
  return showToast(type ?? "success", title, message);
}

export { toast as SonnerToast } from "sonner";
