"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { clients } from "@/data/site";
import { ClientCard } from "@/components/ClientCard";
import { cn } from "@/lib/utils";

const categories = ["Todos", "Academias", "Alimentação", "Óticas", "Serviços", "Varejo"];

export function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredClients = useMemo(() => {
    if (activeCategory === "Todos") {
      return clients;
    }

    return clients.filter((client) => client.category === activeCategory);
  }, [activeCategory]);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition",
              activeCategory === category
                ? "border-snow-lilac bg-snow-lilac text-snow-bg"
                : "border-snow-border bg-white/[0.05] text-snow-muted hover:border-snow-lilac/70 hover:text-white"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredClients.map((client, index) => (
          <div key={client.name} className="flex h-full flex-col gap-4">
            <ClientCard
              {...client}
              compact
              delay={index * 0.05}
            />
            <button
              type="button"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-snow-border bg-white/[0.05] text-sm font-bold text-snow-muted transition hover:border-snow-lilac/70 hover:text-white"
              aria-label={`Ver detalhes de ${client.name}`}
            >
              Em breve
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
