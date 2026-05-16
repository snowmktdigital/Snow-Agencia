import type { Metadata } from "next";
import { BarChart2, ClipboardList, Construction, Layers3 } from "lucide-react";
import { AnimatedCard } from "@/components/AnimatedCard";
import { CTASection } from "@/components/CTASection";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Portfólio e Resultados",
  description:
    "Conheça negócios locais que contam com a Snow para fortalecer presença digital, conteúdo, campanhas e posicionamento.",
  alternates: {
    canonical: "/portfolio"
  }
};

const caseStructure = [
  {
    title: "Desafio",
    icon: ClipboardList,
    text: "Contexto inicial do cliente, gargalos de comunicação, concorrência e oportunidades identificadas."
  },
  {
    title: "Estratégia",
    icon: Layers3,
    text: "Direção de posicionamento, canais, mensagens, campanhas e formatos de conteúdo prioritários."
  },
  {
    title: "Execução",
    icon: Construction,
    text: "Produção de criativos, vídeos, páginas, anúncios, calendário editorial e melhorias no caminho comercial."
  },
  {
    title: "Resultado",
    icon: BarChart2,
    text: "Métricas, aprendizados e evolução gerada a partir da estratégia aplicada."
  }
];

export default function PortfolioPage() {
  return (
    <>
      <section className="container-snow pt-32 sm:pt-36 lg:pt-40">
        <SectionTitle
          eyebrow="Portfólio"
          title="Portfólio e resultados"
          description="Conheça alguns negócios locais que contam com a Snow para fortalecer sua presença digital."
        />
      </section>

      <section className="container-snow py-14">
        <PortfolioGrid />
      </section>

      <section className="container-snow py-20">
        <SectionTitle
          eyebrow="Estudos de caso"
          title="Estrutura pronta para apresentar resultados completos"
          description="A área abaixo já está preparada para receber estudos de caso com contexto, estratégia, execução e evolução em métricas reais."
          align="center"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {caseStructure.map((item, index) => {
            const Icon = item.icon;
            return (
              <AnimatedCard key={item.title} delay={index * 0.055} className="h-full p-6">
                <Icon aria-hidden="true" className="h-6 w-6 text-snow-lilac transition duration-300 group-hover/card:scale-110 group-hover/card:rotate-3" />
                <h2 className="mt-6 text-xl font-black text-white">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-snow-muted">{item.text}</p>
              </AnimatedCard>
            );
          })}
        </div>
      </section>

      <CTASection
        title="Quer transformar seu negócio no próximo case local da Snow?"
        description="A jornada começa com diagnóstico, direção estratégica e uma execução que respeita o momento do seu negócio."
        buttonLabel="Iniciar conversa"
      />
    </>
  );
}
