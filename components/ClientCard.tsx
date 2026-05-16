"use client";

import { ImageIcon, Layers3 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

type ClientCardProps = {
  name: string;
  segment: string;
  description: string;
  badge: string;
  services?: string[];
  metrics?: string[];
  compact?: boolean;
  delay?: number;
};

export function ClientCard({
  name,
  segment,
  description,
  badge,
  services,
  metrics,
  compact = false,
  delay = 0
}: ClientCardProps) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="glass-panel flex h-full flex-col overflow-hidden rounded-lg transition duration-300 hover:-translate-y-1 hover:border-snow-lilac/[0.55]">
        <div className={cn("relative grid place-items-center border-b border-snow-border bg-snow-deep/[0.55]", compact ? "h-40" : "h-52")}>
          <div className="absolute inset-0 snow-grid opacity-35" />
          <div className="relative grid h-16 w-16 place-items-center rounded-lg border border-snow-border bg-white/[0.08] text-snow-lilac">
            <ImageIcon aria-hidden="true" className="h-7 w-7" />
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
            <Layers3 aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-snow-lilac" />
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
      </article>
    </Reveal>
  );
}
