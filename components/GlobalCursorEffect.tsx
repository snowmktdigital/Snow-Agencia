"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Snowflake } from "lucide-react";

export function GlobalCursorEffect() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-120);
  const y = useMotionValue(-120);
  const springX = useSpring(x, { stiffness: 210, damping: 28, mass: 0.32 });
  const springY = useSpring(y, { stiffness: 210, damping: 28, mass: 0.32 });

  useEffect(() => {
    const canShowCursor =
      window.matchMedia("(pointer: fine)").matches &&
      window.innerWidth >= 768 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canShowCursor) return;

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    }

    function handlePointerLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [x, y]);

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-20 hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 mix-blend-screen md:block"
      style={{ left: springX, top: springY }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.72 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <div className="absolute inset-0 rounded-full bg-snow-lilac/14 blur-2xl" />
      <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-snow-lilac/24 shadow-[0_0_34px_rgba(184,140,255,0.34)]" />
      <div className="absolute left-1/2 top-1/2 h-px w-20 -translate-x-1/2 bg-gradient-to-r from-transparent via-snow-lilac/50 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-20 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-snow-lilac/44 to-transparent" />
      <Snowflake className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-snow-lilac/60 drop-shadow-[0_0_16px_rgba(184,140,255,0.8)]" />
    </motion.div>
  );
}
