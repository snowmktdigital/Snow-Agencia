"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { Snowflake } from "lucide-react";

export function GlobalCursorEffect() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-120);
  const y = useMotionValue(-120);

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
      className="pointer-events-none fixed left-0 top-0 z-20 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 mix-blend-screen md:block"
      style={{ left: x, top: y }}
      animate={{ opacity: visible ? 0.78 : 0, scale: visible ? 1 : 0.86 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
    >
      <div className="absolute -inset-3 rounded-full bg-[radial-gradient(circle,rgba(184,140,255,0.22)_0%,rgba(123,63,242,0.1)_34%,transparent_72%)] blur-md" />
      <Snowflake className="absolute left-1/2 top-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 text-snow-lilac/65 drop-shadow-[0_0_10px_rgba(184,140,255,0.74)]" />
    </motion.div>
  );
}
