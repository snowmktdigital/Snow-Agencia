"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

export function HeroVisual() {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 22, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 22, mass: 0.4 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);
  const imageX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const imageY = useTransform(springY, [-0.5, 0.5], [-14, 14]);

  return (
    <motion.div
      className="relative mx-auto mt-2 aspect-[1.05] w-full max-w-[34rem] lg:mt-0 lg:max-w-none"
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
        className="absolute inset-8 bg-snow-lilac/22 blur-3xl"
        style={{ clipPath: "polygon(18% 10%, 100% 24%, 84% 88%, 6% 72%)" }}
        animate={reduceMotion ? undefined : { opacity: [0.34, 0.62, 0.34], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-8 border border-snow-lilac/20 blur-sm" aria-hidden="true" />
      <motion.div
        className="absolute inset-0"
        style={{
          x: reduceMotion ? 0 : imageX,
          y: reduceMotion ? 0 : imageY,
          WebkitMaskImage:
            "radial-gradient(ellipse at 66% 50%, black 0%, black 30%, rgba(0,0,0,0.72) 48%, transparent 70%)",
          maskImage:
            "radial-gradient(ellipse at 66% 50%, black 0%, black 30%, rgba(0,0,0,0.72) 48%, transparent 70%)"
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={reduceMotion ? undefined : { y: [0, -10, 0], scale: [1, 1.025, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/snow-hero-orb.png"
            alt="Esfera futurista com glow lilás representando crescimento digital da Snow"
            fill
            priority
            sizes="(min-width: 1024px) 46vw, 92vw"
            className="object-cover opacity-95 mix-blend-screen drop-shadow-[0_0_70px_rgba(184,140,255,0.56)]"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
