import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline";
};

const styles = {
  primary: "bg-[var(--accent)] text-white hover:bg-[var(--accent-strong)]",
  secondary: "bg-[var(--sand-2)] text-[var(--ink)] hover:bg-[var(--sand-3)]",
  ghost: "bg-transparent text-[var(--ink)] hover:bg-white/60",
  outline: "border border-[var(--line)] bg-white text-[var(--ink)] hover:bg-[var(--sand)]",
};

export function buttonClassName({
  className,
  variant = "primary",
}: {
  className?: string;
  variant?: ButtonProps["variant"];
}) {
  return cn(
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-60",
    styles[variant],
    className,
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => (
    <button
      ref={ref}
      className={buttonClassName({ className, variant })}
      {...props}
    />
  ),
);

Button.displayName = "Button";
