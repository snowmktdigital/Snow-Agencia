"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AnimatedCardProps = {
  children: ReactNode;
  delay?: number;
  hover?: boolean;
  className?: string;
};

export function AnimatedCard({
  children,
  className,
  delay = 0,
  hover = true
}: AnimatedCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.34, margin: "0px 0px -18% 0px" }}
      transition={{ duration: 0.92, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={
        hover && !reduceMotion
          ? { y: -11, scale: 1.024 }
          : undefined
      }
      className={cn(
        "group/card relative overflow-hidden rounded-lg border border-snow-border bg-panel-gradient shadow-soft backdrop-blur-2xl transition-all duration-300 hover:border-snow-lilac/85 hover:shadow-[0_24px_90px_rgba(123,63,242,0.34)]",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,140,255,0.18),rgba(123,63,242,0.08)_32%,transparent_70%)] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-snow-lilac to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
      />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}
