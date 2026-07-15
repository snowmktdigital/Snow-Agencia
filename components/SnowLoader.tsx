"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Snowflake } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type LoaderState = {
  visible: boolean;
  docked: boolean;
  start: { x: number; y: number };
  target: { x: number; y: number };
  size: number;
};

export function SnowLoader() {
  const reduceMotion = useReducedMotion();
  const [state, setState] = useState<LoaderState | null>(null);

  const isMobile = useMemo(
    () => typeof window !== "undefined" && window.innerWidth < 768,
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.sessionStorage.getItem("snow-intro-seen") === "true") {
      return;
    }

    const size = window.innerWidth < 768 ? 78 : 102;
    const headerMark = document.getElementById("snow-header-mark");
    const rect = headerMark?.getBoundingClientRect();
    const target = rect
      ? {
          x: rect.left + rect.width / 2 - size / 2,
          y: rect.top + rect.height / 2 - size / 2
        }
      : { x: 112 - size / 2, y: 40 - size / 2 };

    const start = {
      x: window.innerWidth / 2 - size / 2,
      y: window.innerHeight / 2 - size / 2
    };
    const showFrame = window.requestAnimationFrame(() => {
      setState({
        visible: true,
        docked: false,
        start,
        target,
        size
      });
    });
    const hold = reduceMotion ? 420 : window.innerWidth < 768 ? 820 : 1350;
    const dockTimer = window.setTimeout(() => {
      setState((current) => (current ? { ...current, docked: true } : current));
    }, hold);
    const endTimer = window.setTimeout(() => {
      window.sessionStorage.setItem("snow-intro-seen", "true");
      setState((current) => (current ? { ...current, visible: false } : current));
    }, hold + (reduceMotion ? 520 : window.innerWidth < 768 ? 850 : 1050));
    const removeTimer = window.setTimeout(() => setState(null), hold + (reduceMotion ? 900 : 1500));

    return () => {
      window.cancelAnimationFrame(showFrame);
      window.clearTimeout(dockTimer);
      window.clearTimeout(endTimer);
      window.clearTimeout(removeTimer);
    };
  }, [reduceMotion]);

  if (!state) return null;

  return (
    <AnimatePresence>
      {state.visible ? (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden bg-snow-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="absolute inset-0 snow-grid opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(123,63,242,0.34),transparent_34%),linear-gradient(180deg,#09001F,#120030)]" />
          <motion.div
            className="fixed grid place-items-center"
            style={{ width: state.size, height: state.size }}
            initial={{ x: state.start.x, y: state.start.y, scale: isMobile ? 1.05 : 1.22 }}
            animate={{
              x: state.docked ? state.target.x : state.start.x,
              y: state.docked ? state.target.y : state.start.y,
              scale: state.docked ? 0.43 : [1.08, 1.22, 1.08]
            }}
            transition={{
              duration: state.docked ? (reduceMotion ? 0.45 : 0.95) : reduceMotion ? 0.7 : 1.2,
              ease: [0.22, 1, 0.36, 1],
              repeat: state.docked || reduceMotion ? 0 : Infinity,
              repeatType: "mirror"
            }}
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-[-42%] rounded-full border border-snow-lilac/20"
              animate={{ rotate: 360, opacity: reduceMotion ? [0.42, 0.56, 0.42] : [0.28, 0.72, 0.28] }}
              transition={{ duration: reduceMotion ? 8 : 4.8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute inset-[-18%] rounded-full bg-snow-lilac/20 blur-2xl"
              animate={{ opacity: reduceMotion ? [0.42, 0.58, 0.42] : [0.32, 0.76, 0.32], scale: reduceMotion ? [0.98, 1.02, 0.98] : [0.9, 1.08, 0.9] }}
              transition={{ duration: reduceMotion ? 3.2 : 1.7, repeat: Infinity, ease: "easeInOut" }}
            />
            {[0, 1, 2, 3, 4, 5].map((dot) => (
              <motion.span
                key={dot}
                aria-hidden="true"
                className="absolute h-1.5 w-1.5 rounded-full bg-snow-lilac shadow-[0_0_18px_rgba(184,140,255,0.8)]"
                style={{
                  left: "50%",
                  top: "50%",
                  transformOrigin: `${isMobile ? 34 : 48}px center`
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3.2 + dot * 0.16,
                  repeat: Infinity,
                  ease: "linear"
                }}
                initial={{ rotate: dot * 60 }}
              />
            ))}
            <motion.div
              className="relative grid h-full w-full place-items-center rounded-2xl border border-snow-border bg-white/[0.07] text-snow-lilac shadow-glow backdrop-blur-2xl"
              animate={{ rotate: 360 }}
              transition={{ duration: reduceMotion ? 8 : 3.4, repeat: Infinity, ease: "linear" }}
            >
              <Snowflake className="h-1/2 w-1/2" />
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
