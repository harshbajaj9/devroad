import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";

interface CustomTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  type?: "static" | "link";
}

const tooltipVariants = cva("w-fill rounded-lg px-2 py-2 text-white z-50", {
  variants: {
    intent: {
      static: "bg-black",
      link: "bg-white shadow-md",
    },
  },
  defaultVariants: {
    intent: "static",
  },
});

export function CustomTooltip({
  children,
  content,
  side = "top",
  align = "center",
  delayDuration,
  type = "static",
  ...props
}: CustomTooltipProps) {
  return (
    <TooltipPrimitive.TooltipProvider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.TooltipPortal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            {...props}
            className={tooltipVariants({ intent: type })}
          >
            {content}
            {type == "static" ? (
              <TooltipPrimitive.Arrow width={12} height={8} />
            ) : (
              <></>
            )}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.TooltipPortal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.TooltipProvider>
  );
}
