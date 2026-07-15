"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

export function HeroVisual() {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: reduceMotion ? 120 : 80, damping: reduceMotion ? 30 : 22, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: reduceMotion ? 120 : 80, damping: reduceMotion ? 30 : 22, mass: 0.4 });
  const rotateX = useTransform(springY, [-0.5, 0.5], reduceMotion ? [0, 0] : [3, -3]);
  const rotateY = useTransform(springX, [-0.5, 0.5], reduceMotion ? [0, 0] : [-4, 4]);
  const imageX = useTransform(springX, [-0.5, 0.5], reduceMotion ? [-4, 4] : [-16, 16]);
  const imageY = useTransform(springY, [-0.5, 0.5], reduceMotion ? [-3, 3] : [-12, 12]);

  return (
    <motion.div
      className="relative mx-auto -mt-1 aspect-[1.02] w-full max-w-[21rem] opacity-80 sm:mt-2 sm:max-w-[34rem] sm:opacity-100 lg:mt-0 lg:max-w-none"
      initial={{ opacity: 0, scale: reduceMotion ? 0.99 : 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reduceMotion ? 0.36 : 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{ rotateX, rotateY }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-[8%] rounded-full bg-snow-lilac/28 blur-3xl"
        animate={{ opacity: reduceMotion ? [0.42, 0.56, 0.42] : [0.34, 0.7, 0.34], scale: reduceMotion ? [0.98, 1.02, 0.98] : [0.92, 1.08, 0.92] }}
        transition={{ duration: reduceMotion ? 5.8 : 4.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div aria-hidden="true" className="absolute inset-[18%] rounded-full bg-snow-purple/20 blur-[70px]" />

      <motion.div
        className="absolute -inset-[14%] overflow-hidden"
        style={{
          x: imageX,
          y: imageY,
          WebkitMaskImage:
            "radial-gradient(ellipse 46% 54% at 64% 50%, #000 0%, #000 34%, rgba(0,0,0,0.72) 48%, rgba(0,0,0,0.28) 60%, transparent 73%)",
          maskImage:
            "radial-gradient(ellipse 46% 54% at 64% 50%, #000 0%, #000 34%, rgba(0,0,0,0.72) 48%, rgba(0,0,0,0.28) 60%, transparent 73%)"
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ y: reduceMotion ? [0, -3, 0] : [0, -10, 0], scale: reduceMotion ? [1.04, 1.05, 1.04] : [1.04, 1.075, 1.04] }}
          transition={{ duration: reduceMotion ? 7.5 : 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/snow-hero-orb.png"
            alt="Esfera futurista com glow lilás representando crescimento digital da Snow"
            fill
            priority
            sizes="(min-width: 1024px) 48vw, 92vw"
            className="scale-[1.18] object-cover object-[66%_48%] opacity-95 mix-blend-screen blur-[0.35px] drop-shadow-[0_0_86px_rgba(184,140,255,0.68)]"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
