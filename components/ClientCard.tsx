"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Layers3 } from "lucide-react";
import { AnimatedCard } from "@/components/AnimatedCard";
import { cn } from "@/lib/utils";

type ClientCardProps = {
  name: string;
  segment: string;
  description: string;
  badge: string;
  logo?: string;
  services?: string[];
  metrics?: string[];
  compact?: boolean;
  delay?: number;
};

function ClientCardContent({
  name,
  segment,
  description,
  badge,
  logo,
  services,
  metrics,
  compact = false,
  preview = false
}: ClientCardProps & { preview?: boolean }) {
  const isAmericanBurger = name === "American Burger";

  return (
    <>
      <div
        className={cn(
          "relative grid place-items-center border-b border-snow-border bg-snow-deep/[0.55]",
          compact ? "h-40" : "h-52",
          preview && "h-48"
        )}
      >
        <div className="absolute inset-0 snow-grid opacity-35" />
        <div className="absolute inset-8 bg-snow-lilac/15 blur-3xl" />
        <div
          className={cn(
            "relative grid h-24 w-4/5 place-items-center rounded-lg border border-snow-border bg-white/[0.08] px-5 py-4 shadow-[0_0_36px_rgba(184,140,255,0.16)] backdrop-blur-xl transition duration-300 group-hover/card:border-snow-lilac/60 group-hover/card:shadow-glow",
            isAmericanBurger && "bg-white/[0.13] shadow-[0_0_46px_rgba(255,255,255,0.11),0_0_36px_rgba(184,140,255,0.2)]"
          )}
        >
          {logo ? (
            <Image
              src={logo}
              alt={`Logo ${name}`}
              fill
              sizes="(min-width: 1024px) 260px, 70vw"
              className={cn(
                "object-contain p-4 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)] transition duration-300 group-hover/card:scale-105 group-hover/card:drop-shadow-[0_0_22px_rgba(184,140,255,0.55)]",
                isAmericanBurger && "brightness-0 invert contrast-125 drop-shadow-[0_0_18px_rgba(255,255,255,0.38)]"
              )}
            />
          ) : (
            <Layers3 aria-hidden="true" className="h-7 w-7 text-snow-lilac" />
          )}
        </div>
        <span className="absolute bottom-4 left-4 rounded-full border border-snow-border bg-snow-bg/80 px-3 py-1 text-xs font-bold text-snow-lilac backdrop-blur-xl">
          {badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-white">{name}</h3>
            <p className="mt-1 text-sm font-semibold text-snow-lilac">{segment}</p>
          </div>
          <Layers3 aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-snow-lilac transition duration-300 group-hover/card:rotate-6 group-hover/card:scale-110" />
        </div>
        <p className="mt-5 flex-1 text-sm leading-7 text-snow-muted">{description}</p>

        {services?.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {services.map((service) => (
              <span key={service} className="rounded-full border border-snow-border bg-white/[0.05] px-3 py-1 text-xs text-snow-muted">
                {service}
              </span>
            ))}
          </div>
        ) : null}

        {metrics?.length ? (
          <div className="mt-6 grid gap-2">
            {metrics.map((metric) => (
              <div key={metric} className="rounded-lg border border-snow-border bg-white/[0.04] px-3 py-2 text-xs text-snow-muted">
                {metric}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}

export function ClientCard(props: ClientCardProps) {
  const reduceMotion = useReducedMotion();
  const { delay = 0 } = props;

  return (
    <div className="group/client h-full" data-client-card={props.name}>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 hidden bg-snow-bg/45 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/client:opacity-100 md:block"
      />
      <AnimatedCard
        delay={delay}
        className="relative z-10 flex h-full flex-col"
        hover={false}
      >
        <motion.article
          className="flex h-full flex-col"
          whileHover={{ scale: reduceMotion ? 1.015 : 1.045, y: reduceMotion ? -3 : -8 }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <ClientCardContent {...props} />
        </motion.article>
      </AnimatedCard>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 hidden place-items-center opacity-0 transition-opacity duration-300 group-hover/client:opacity-100 md:grid"
      >
        <motion.article
          className="glass-panel flex w-[min(31rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-lg"
          initial={{ opacity: 0, scale: reduceMotion ? 0.99 : 0.94, y: reduceMotion ? 6 : 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <ClientCardContent {...props} preview compact={false} />
        </motion.article>
      </div>
    </div>
  );
}
