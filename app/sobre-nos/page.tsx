import type { Metadata } from "next";
import { BarChart3, Compass, Film, Handshake, MapPinned, Rocket } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { differentials } from "@/data/site";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description:
    "Conheça a Snow Agência de Crescimento, uma agência criada para acelerar negócios locais com estratégia, conteúdo, tráfego pago, vídeos e presença digital profissional.",
  alternates: {
    canonical: "/sobre-nos"
  }
};

const pillars = [
  {
    title: "Nossa visão",
    icon: Compass,
    text: "Negócios locais fortes precisam ser lembrados antes da decisão de compra. A Snow trabalha para transformar presença digital em percepção de valor, relacionamento e demanda."
  },
  {
    title: "Como trabalhamos",
    icon: Rocket,
    text: "Antes de produzir, entendemos o negócio, o público, a concorrência e o caminho comercial. A execução vem com direção, calendário, campanhas e análise."
  },
  {
    title: "Por que estratégia local importa",
    icon: MapPinned,
    text: "A comunicação de um comércio local precisa conversar com a cidade, o bairro e a rotina do cliente. É essa leitura que torna o marketing mais próximo e mais eficiente."
  }
];

const proofCards = [
  {
    title: "Conteúdo com intenção",
    icon: Film,
    text: "Posts, vídeos e criativos são pensados para educar, gerar desejo, criar autoridade e abrir conversas comerciais mais qualificadas."
  },
  {
    title: "Performance acompanhada",
    icon: BarChart3,
    text: "Campanhas de tráfego pago são ajustadas por dados, comportamento e objetivo, sem depender de impulsionamentos soltos."
  },
  {
    title: "Proximidade na execução",
    icon: Handshake,
    text: "O atendimento valoriza clareza, velocidade e acompanhamento próximo para que o marketing faça sentido no dia a dia do negócio."
  }
];

export default function SobreNosPage() {
  return (
    <>
      <section className="container-snow pt-32 sm:pt-36 lg:pt-40">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <SectionTitle
            eyebrow="Sobre a Snow"
            title="Uma agência criada para acelerar o crescimento de negócios locais"
            description="A Snow Agência de Crescimento nasceu com o objetivo de ajudar comércios locais a saírem do marketing improvisado e construírem uma presença digital mais profissional, estratégica e preparada para gerar oportunidades reais."
          />
          <Reveal delay={0.1}>
            <div className="glass-panel rounded-lg p-6 sm:p-8">
              <p className="text-lg font-bold leading-8 text-white">
                Trabalhamos para empresários que querem parar de depender de postagens aleatórias e começar a construir uma comunicação que sustenta crescimento.
              </p>
              <p className="mt-5 text-base leading-8 text-snow-muted">
                A Snow une estratégia, conteúdo, tráfego pago e leitura local para posicionar marcas com mais autoridade diante da concorrência e mais clareza para vender.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-snow py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={index * 0.06}>
                <article className="glass-panel h-full rounded-lg p-7">
                  <Icon aria-hidden="true" className="h-6 w-6 text-snow-lilac" />
                  <h2 className="mt-6 text-2xl font-black text-white">{pillar.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-snow-muted">{pillar.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="container-snow py-20">
        <SectionTitle
          eyebrow="Diferenciais"
          title="Marketing local com direção, intenção e acompanhamento"
          description="A Snow combina visão estratégica com execução prática para que cada canal tenha um papel claro no crescimento do negócio."
          align="center"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {differentials.map((item, index) => (
            <Reveal key={item} delay={index * 0.04}>
              <article className="rounded-lg border border-snow-border bg-white/[0.05] p-6">
                <span className="text-sm font-black text-snow-lilac">0{index + 1}</span>
                <h3 className="mt-4 text-lg font-black text-white">{item}</h3>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-snow py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {proofCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={index * 0.06}>
                <article className="glass-panel h-full rounded-lg p-7">
                  <Icon aria-hidden="true" className="h-6 w-6 text-snow-lilac" />
                  <h2 className="mt-6 text-xl font-black text-white">{card.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-snow-muted">{card.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CTASection
        title="O crescimento local precisa de consistência, não de improviso."
        description="Vamos entender o momento do seu negócio e mostrar como a Snow pode organizar sua presença digital para gerar mais autoridade, conversas e oportunidades."
        buttonLabel="Quero falar com a Snow"
      />
    </>
  );
}
