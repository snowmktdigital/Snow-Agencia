import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  showArrow?: boolean;
};

const variants = {
  primary:
    "border-transparent bg-snow-gradient text-snow-white shadow-glow hover:shadow-[0_0_48px_rgba(184,140,255,0.46)]",
  secondary:
    "border-snow-border bg-white/[0.06] text-snow-white hover:border-snow-lilac/70 hover:bg-white/[0.1]",
  ghost:
    "border-transparent bg-transparent text-snow-muted hover:bg-white/[0.06] hover:text-snow-white"
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-6 text-base"
};

export function Button({
  href,
  children,
  className,
  variant = "primary",
  size = "md",
  showArrow = false,
  ...props
}: ButtonProps) {
  const isExternal = href.startsWith("http");
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full border font-semibold transition duration-300",
    sizes[size],
    variants[variant],
    className
  );

  const content = (
    <>
      {children}
      {showArrow ? <ArrowRight aria-hidden="true" className="h-4 w-4" /> : null}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );
}
