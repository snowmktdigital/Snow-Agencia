import {
  BadgeCheck,
  Building2,
  CircleDot,
  Crosshair,
  Dumbbell,
  Eye,
  MapPin,
  MessageSquareWarning,
  Pizza,
  Scissors,
  Store,
  Utensils,
  Zap
} from "lucide-react";
import { AnimatedCard } from "@/components/AnimatedCard";
import { CTASection } from "@/components/CTASection";
import { ClientCard } from "@/components/ClientCard";
import { HeroVisual } from "@/components/HeroVisual";
import { MetricCard } from "@/components/MetricCard";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/Button";
import {
  authorityPills,
  businessTypes,
  clients,
  metrics,
  painPoints,
  services,
  snowMethod,
  WHATSAPP_URL
} from "@/data/site";

const painIcons = [
  MessageSquareWarning,
  Crosshair,
  Eye,
  Zap,
  BadgeCheck,
  CircleDot
];

const businessIcons = [
  Dumbbell,
  Utensils,
  Eye,
  Pizza,
  Scissors,
  Store,
  Building2,
  MapPin
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden pt-24 sm:pt-32 lg:pt-40">
        <div className="container-snow grid min-h-[calc(100svh-4rem)] items-center gap-8 pb-12 sm:gap-10 sm:pb-16 lg:grid-cols-[0.96fr_1.04fr] lg:gap-14">
          <div>
            <Reveal>
              <p className="mb-4 inline-flex rounded-full border border-snow-border bg-white/[0.06] px-3 py-1.5 text-[0.66rem] font-bold uppercase text-snow-lilac sm:mb-5 sm:px-4 sm:py-2 sm:text-sm">
                Snow Agência de Crescimento em São José dos Pinhais
              </p>
              <h1 className="max-w-[19rem] text-balance text-[2.65rem] font-black leading-[0.98] text-white sm:max-w-3xl sm:text-6xl lg:text-[4.9rem]">
                <span className="sm:hidden">Precisa vender mais?</span>
                <span className="hidden sm:inline">Seu negócio local precisa vender mais?</span>
              </h1>
              <p className="mt-6 max-w-[20rem] text-pretty text-[0.95rem] leading-7 text-snow-muted sm:mt-8 sm:max-w-xl sm:text-lg sm:leading-8">
                <span className="sm:hidden">Estratégia, conteúdo e tráfego pago para gerar oportunidades reais de venda.</span>
                <span className="hidden sm:inline">Unimos estratégia, conteúdo e tráfego pago para transformar presença digital em oportunidades reais de venda.</span>
              </p>
            </Reveal>

            <Reveal delay={0.14} className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Button href={WHATSAPP_URL} size="lg" showArrow>
                Quero crescer com a Snow
              </Button>
              <Button href="/#servicos" variant="secondary" size="lg" className="max-sm:h-12 max-sm:text-sm">
                Conhecer serviços
              </Button>
            </Reveal>

            <Reveal delay={0.26} className="mt-7 flex max-w-xl flex-wrap gap-2 sm:mt-9 sm:gap-3">
              {authorityPills.map((pill, index) => (
                <span
                  key={pill}
                  className={`${index > 1 ? "hidden sm:inline-flex" : "inline-flex"} rounded-full border border-snow-border bg-white/[0.06] px-3 py-1.5 text-[0.72rem] font-semibold text-snow-muted backdrop-blur-xl sm:px-3.5 sm:py-2 sm:text-sm`}
                >
                  {pill}
                </span>
              ))}
            </Reveal>
          </div>

          <HeroVisual />
        </div>
      </section>

      <section className="container-snow py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionTitle
            eyebrow="Diagnóstico"
            title="Seu negócio aparece na internet, mas ainda não gera o resultado que poderia?"
            description="Muitos comércios locais postam sem estratégia, impulsionam sem direção e perdem oportunidades todos os dias por falta de posicionamento, conteúdo profissional e um processo comercial mais claro."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {painPoints.map((pain, index) => {
              const Icon = painIcons[index];
              return (
                <AnimatedCard key={pain} delay={index * 0.115} className="h-full p-5">
                  <Icon aria-hidden="true" className="h-5 w-5 text-snow-lilac transition duration-300 group-hover/card:scale-110 group-hover/card:rotate-3" />
                  <h3 className="mt-4 text-base font-black text-white">{pain}</h3>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      <section id="servicos" className="container-snow scroll-mt-28 py-24 lg:py-28">
        <SectionTitle
          eyebrow="Serviços"
          title="Soluções para transformar presença digital em crescimento"
          description="A Snow combina posicionamento, conteúdo, performance e páginas digitais para criar um caminho mais profissional entre a sua marca e o cliente local."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
              delay={index * 0.115}
            />
          ))}
        </div>
      </section>

      <section className="container-snow py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <SectionTitle
            eyebrow="Para quem é"
            title="Feito para negócios locais que querem crescer de verdade"
            description="Se o seu cliente está na sua cidade, no seu bairro ou na sua região, sua comunicação precisa ser local, estratégica e feita para gerar confiança."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {businessTypes.map((type, index) => {
              const Icon = businessIcons[index];
              return (
                <AnimatedCard key={type} delay={index * 0.095} className="p-5">
                  <div className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-snow-purple/20 text-snow-lilac transition duration-300 group-hover/card:scale-110 group-hover/card:rotate-3">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h3 className="font-bold text-white">{type}</h3>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-snow py-24 lg:py-28">
        <SectionTitle
          eyebrow="Método Snow"
          title="Um processo claro para tirar seu marketing do improviso"
          align="center"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          {snowMethod.map((item, index) => (
            <AnimatedCard key={item.title} delay={index * 0.125} className="h-full p-6">
              <span className="text-sm font-black text-snow-lilac transition duration-300 group-hover/card:text-white">
                {item.step}
              </span>
              <h3 className="mt-5 text-xl font-black text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-snow-muted">{item.description}</p>
            </AnimatedCard>
          ))}
        </div>
      </section>

      <section className="container-snow py-24 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            eyebrow="Portfólio"
            title="Marcas locais que já caminham com a Snow"
            description="Projetos em que conteúdo, campanhas e presença digital ajudam a construir autoridade local com mais consistência."
          />
          <Button href="/portfolio" variant="secondary" showArrow className="w-full sm:w-auto">
            Ver portfólio completo
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {clients.map((client, index) => (
            <ClientCard
              key={client.name}
              name={client.name}
              segment={client.segment}
              description={client.description}
              badge={client.badge}
              logo={client.logo}
              delay={index * 0.12}
            />
          ))}
        </div>
      </section>

      <section className="container-snow py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionTitle
            eyebrow="Resultados"
            title="Resultado começa com estratégia"
            description="Dados reais de campanhas, conteúdos e projetos desenvolvidos para negócios locais que confiaram na Snow para profissionalizar sua presença digital."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {metrics.map((metric, index) => (
              <MetricCard
                key={metric.label}
                label={metric.label}
                value={metric.value}
                description={metric.description}
                delay={index * 0.105}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Seu negócio não precisa apenas postar mais. Precisa crescer com estratégia."
        description="A Snow une conteúdo, tráfego pago, vídeos e posicionamento para ajudar negócios locais a se destacarem, atraírem clientes e venderem com mais profissionalismo."
      />
    </>
  );
}
