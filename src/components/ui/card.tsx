import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-[var(--line)] bg-white/90 p-6 shadow-[0_24px_60px_rgba(69,41,18,0.08)] backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}
