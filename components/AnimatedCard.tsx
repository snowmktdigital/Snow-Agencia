"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, rgba(184, 140, 255, 0.17), transparent 42%)`;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={
        hover && !reduceMotion
          ? { y: -8, scale: 1.015 }
          : undefined
      }
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
      }}
      className={cn(
        "group/card relative overflow-hidden rounded-lg border border-snow-border bg-panel-gradient shadow-soft backdrop-blur-2xl transition-colors duration-300 hover:border-snow-lilac/70",
        className
      )}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{ background: spotlight }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-snow-lilac/70 to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
      />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}
