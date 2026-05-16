import type { Metadata } from "next";
import { Clock, MapPin, Phone, Radar } from "lucide-react";
import { AnimatedCard } from "@/components/AnimatedCard";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/Button";
import { MAP_EMBED_URL, MAP_URL, WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "Localização",
  description:
    "Snow Agência de Crescimento em São José dos Pinhais - PR, com atendimento para negócios locais de Curitiba e região metropolitana.",
  alternates: {
    canonical: "/localizacao"
  }
};

const infoCards = [
  {
    label: "Localização",
    value: "São José dos Pinhais - PR",
    icon: MapPin
  },
  {
    label: "Atendimento",
    value: "Curitiba e região metropolitana",
    icon: Radar
  },
  {
    label: "Horário",
    value: "Segunda a sexta, das 08h às 18h",
    icon: Clock
  },
  {
    label: "WhatsApp",
    value: WHATSAPP_DISPLAY,
    icon: Phone
  }
];

export default function LocalizacaoPage() {
  return (
    <>
      <section className="container-snow pt-32 sm:pt-36 lg:pt-40">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionTitle
            eyebrow="Localização"
            title="Snow Agência de Crescimento em São José dos Pinhais"
            description="Atendemos negócios locais de São José dos Pinhais, Curitiba e região metropolitana, criando estratégias digitais conectadas com a realidade de cada cidade, bairro e público."
          />
          <Reveal delay={0.1}>
            <div className="glass-panel overflow-hidden rounded-lg p-2">
              <div className="relative min-h-80 overflow-hidden rounded-lg border border-snow-border bg-snow-deep/70">
                <div className="absolute inset-0 snow-grid opacity-20" aria-hidden="true" />
                <iframe
                  title="Mapa de São José dos Pinhais - PR"
                  src={MAP_EMBED_URL}
                  className="relative h-80 w-full grayscale invert-[0.92] saturate-[0.55] hue-rotate-[225deg] opacity-75 mix-blend-screen md:h-[27rem]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="pointer-events-none absolute inset-0 border border-snow-lilac/20 shadow-[inset_0_0_42px_rgba(184,140,255,0.18)]" />
              </div>
              <p className="px-3 pb-2 pt-4 text-xs leading-6 text-snow-muted">
                Atendimento estratégico para negócios locais de São José dos Pinhais, Curitiba e região metropolitana.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-snow py-24 lg:py-28">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {infoCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <AnimatedCard key={card.label} delay={index * 0.12} className="h-full p-6">
                <Icon aria-hidden="true" className="h-6 w-6 text-snow-lilac transition duration-300 group-hover/card:scale-110 group-hover/card:rotate-3" />
                <p className="mt-5 text-sm font-bold text-snow-lilac">{card.label}</p>
                <h2 className="mt-2 text-lg font-black leading-7 text-white">{card.value}</h2>
              </AnimatedCard>
            );
          })}
        </div>

        <Reveal delay={0.15} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href={WHATSAPP_URL} size="lg" showArrow>
            Falar no WhatsApp
          </Button>
          <Button href={MAP_URL} variant="secondary" size="lg">
            Ver no mapa
          </Button>
        </Reveal>
      </section>

      <CTASection
        title="Sua estratégia digital precisa conversar com o público da sua região."
        description="A Snow constrói comunicação local para marcas que querem ser vistas, lembradas e escolhidas em São José dos Pinhais, Curitiba e região metropolitana."
      />
    </>
  );
}
