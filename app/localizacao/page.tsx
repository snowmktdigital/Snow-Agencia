import type { Metadata } from "next";
import { Clock, MapPin, Navigation, Phone, Radar } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/Button";
import { MAP_URL, WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "Localização",
  description:
    "Snow Agência de Crescimento em São José dos Pinhais - PR, com atendimento para negócios locais da região metropolitana de Curitiba.",
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
    value: "Negócios locais da região metropolitana de Curitiba",
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
            description="Atendemos negócios locais de São José dos Pinhais e região metropolitana de Curitiba, com foco em criar estratégias digitais conectadas com a realidade de cada cidade, bairro e público."
          />
          <Reveal delay={0.1}>
            <div className="glass-panel overflow-hidden rounded-lg">
              <div className="relative grid min-h-80 place-items-center bg-snow-deep/70 p-8">
                <div className="absolute inset-0 snow-grid opacity-40" />
                <div className="relative text-center">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-lg border border-snow-border bg-white/[0.08] text-snow-lilac">
                    <Navigation aria-hidden="true" className="h-7 w-7" />
                  </span>
                  <h2 className="mt-6 text-2xl font-black text-white">Mapa em preparação</h2>
                  <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-snow-muted">
                    Área pronta para incorporar o mapa oficial da Snow assim que o perfil de localização estiver definido.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-snow py-16">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {infoCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.label} delay={index * 0.05}>
                <article className="glass-panel h-full rounded-lg p-6">
                  <Icon aria-hidden="true" className="h-6 w-6 text-snow-lilac" />
                  <p className="mt-5 text-sm font-bold text-snow-lilac">{card.label}</p>
                  <h2 className="mt-2 text-lg font-black leading-7 text-white">{card.value}</h2>
                </article>
              </Reveal>
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
        description="A Snow constrói comunicação local para marcas que querem ser vistas, lembradas e escolhidas em São José dos Pinhais e região metropolitana de Curitiba."
      />
    </>
  );
}
