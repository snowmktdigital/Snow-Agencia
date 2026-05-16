"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { services } from "@/data/site";

export function FooterServiceLinks() {
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const activeService = services.find((service) => service.title === activeTitle);

  return (
    <div>
      <ul className="space-y-2">
        {services.slice(0, 6).map((service) => {
          const isActive = activeTitle === service.title;
          const panelId = `footer-service-${service.title.toLowerCase().replace(/\W+/g, "-")}`;

          return (
            <li key={service.title}>
              <button
                type="button"
                onClick={() => setActiveTitle(isActive ? null : service.title)}
                className="group flex w-full items-center justify-between gap-2 rounded-lg border border-transparent px-3 py-2 text-left text-sm text-snow-muted transition duration-300 hover:border-snow-border hover:bg-white/[0.05] hover:text-white"
                aria-expanded={isActive}
                aria-controls={panelId}
              >
                <span>{service.title}</span>
                <ChevronRight
                  aria-hidden="true"
                  className={`h-4 w-4 text-snow-lilac transition duration-300 ${
                    isActive ? "translate-x-0.5 rotate-90 opacity-100" : "opacity-55 group-hover:translate-x-0.5"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <AnimatePresence mode="wait">
        {activeService ? (
          <motion.div
            id={`footer-service-${activeService.title.toLowerCase().replace(/\W+/g, "-")}`}
            key={activeService.title}
            initial={{ opacity: 0, height: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, height: "auto", y: 0, scale: 1 }}
            exit={{ opacity: 0, height: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 overflow-hidden rounded-lg border border-snow-border bg-white/[0.055] shadow-[0_0_28px_rgba(184,140,255,0.1)]"
          >
            <div className="p-4">
              <p className="text-xs font-bold uppercase text-snow-lilac">{activeService.title}</p>
              <p className="mt-2 text-xs leading-6 text-snow-muted">{activeService.description}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
