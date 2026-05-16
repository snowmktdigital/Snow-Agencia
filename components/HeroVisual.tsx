"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

export function HeroVisual() {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 22, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 22, mass: 0.4 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);
  const imageX = useTransform(springX, [-0.5, 0.5], [-16, 16]);
  const imageY = useTransform(springY, [-0.5, 0.5], [-12, 12]);

  return (
    <motion.div
      className="relative mx-auto -mt-1 aspect-[1.02] w-full max-w-[21rem] opacity-80 sm:mt-2 sm:max-w-[34rem] sm:opacity-100 lg:mt-0 lg:max-w-none"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
      animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={reduceMotion ? undefined : { rotateX, rotateY }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-[8%] rounded-full bg-snow-lilac/28 blur-3xl"
        animate={reduceMotion ? undefined : { opacity: [0.34, 0.7, 0.34], scale: [0.92, 1.08, 0.92] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div aria-hidden="true" className="absolute inset-[18%] rounded-full bg-snow-purple/20 blur-[70px]" />

      <motion.div
        className="absolute -inset-[14%] overflow-hidden"
        style={{
          x: reduceMotion ? 0 : imageX,
          y: reduceMotion ? 0 : imageY,
          WebkitMaskImage:
            "radial-gradient(ellipse 46% 54% at 64% 50%, #000 0%, #000 34%, rgba(0,0,0,0.72) 48%, rgba(0,0,0,0.28) 60%, transparent 73%)",
          maskImage:
            "radial-gradient(ellipse 46% 54% at 64% 50%, #000 0%, #000 34%, rgba(0,0,0,0.72) 48%, rgba(0,0,0,0.28) 60%, transparent 73%)"
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={reduceMotion ? undefined : { y: [0, -10, 0], scale: [1.04, 1.075, 1.04] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
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
