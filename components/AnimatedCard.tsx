"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { Snowflake } from "lucide-react";
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
  const smoothMouseX = useSpring(mouseX, { stiffness: 180, damping: 26, mass: 0.35 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 180, damping: 26, mass: 0.35 });
  const reduceMotion = useReducedMotion();
  const spotlight = useMotionTemplate`radial-gradient(430px circle at ${smoothMouseX}px ${smoothMouseY}px, rgba(184, 140, 255, 0.26), rgba(123, 63, 242, 0.12) 24%, transparent 52%)`;

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
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
      }}
      className={cn(
        "group/card relative overflow-hidden rounded-lg border border-snow-border bg-panel-gradient shadow-soft backdrop-blur-2xl transition-all duration-300 hover:border-snow-lilac/85 hover:shadow-[0_24px_90px_rgba(123,63,242,0.34)]",
        className
      )}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{ background: spotlight }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute h-28 w-28 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{ left: smoothMouseX, top: smoothMouseY }}
      >
        <div className="absolute inset-0 rounded-full bg-snow-lilac/14 blur-2xl" />
        <Snowflake className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-snow-lilac/45 drop-shadow-[0_0_18px_rgba(184,140,255,0.7)]" />
        <span className="absolute left-1/2 top-1/2 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-snow-lilac/40 to-transparent" />
        <span className="absolute left-1/2 top-1/2 h-24 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-snow-lilac/35 to-transparent" />
      </motion.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-snow-lilac to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
      />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}
