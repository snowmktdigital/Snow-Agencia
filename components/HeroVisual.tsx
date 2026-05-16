"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function HeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto aspect-[1.05] w-full max-w-[34rem] lg:max-w-none"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
      animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
    >
      <div className="absolute inset-8 rounded-full border border-snow-lilac/20 blur-sm" aria-hidden="true" />
      <motion.div
        className="absolute inset-0"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 0%, black 48%, transparent 76%)",
          maskImage:
            "radial-gradient(ellipse at center, black 0%, black 48%, transparent 76%)"
        }}
        animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/images/snow-hero-orb.png"
          alt="Esfera futurista com glow lilás representando crescimento digital da Snow"
          fill
          priority
          sizes="(min-width: 1024px) 46vw, 92vw"
          className="object-cover opacity-95 mix-blend-screen drop-shadow-[0_0_60px_rgba(184,140,255,0.48)]"
        />
      </motion.div>
    </motion.div>
  );
}
