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
      <section className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-40">
        <div className="container-snow grid min-h-[calc(100vh-5rem)] items-center gap-12 pb-16 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <Reveal>
              <p className="mb-5 inline-flex rounded-full border border-snow-border bg-white/[0.06] px-4 py-2 text-sm font-bold text-snow-lilac">
                Snow Agência de Crescimento em São José dos Pinhais
              </p>
              <h1 className="text-balance text-4xl font-black leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                Estratégia, conteúdo e tráfego pago.
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-snow-muted sm:text-lg">
                A Snow Agência de Crescimento ajuda academias, restaurantes, óticas, hamburguerias, lojas e prestadores de serviço a transformarem presença digital em autoridade, relacionamento e oportunidades reais de venda.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href={WHATSAPP_URL} size="lg" showArrow>
                Quero crescer com a Snow
              </Button>
              <Button href="/#servicos" variant="secondary" size="lg">
                Conhecer serviços
              </Button>
            </Reveal>

            <Reveal delay={0.18} className="mt-8 flex flex-wrap gap-3">
              {authorityPills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-snow-border bg-white/[0.06] px-4 py-2 text-sm font-semibold text-snow-muted"
                >
                  {pill}
                </span>
              ))}
            </Reveal>
          </div>

          <HeroVisual />
        </div>
      </section>

      <section className="container-snow py-20">
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
                <Reveal key={pain} delay={index * 0.04}>
                  <article className="glass-panel rounded-lg p-5">
                    <Icon aria-hidden="true" className="h-5 w-5 text-snow-lilac" />
                    <h3 className="mt-4 text-base font-black text-white">{pain}</h3>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="servicos" className="container-snow scroll-mt-28 py-20">
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
              delay={index * 0.05}
            />
          ))}
        </div>
      </section>

      <section className="container-snow py-20">
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
                <Reveal key={type} delay={index * 0.04}>
                  <article className="flex items-center gap-4 rounded-lg border border-snow-border bg-white/[0.05] p-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-snow-purple/20 text-snow-lilac">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h3 className="font-bold text-white">{type}</h3>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-snow py-20">
        <SectionTitle
          eyebrow="Método Snow"
          title="Um processo claro para tirar seu marketing do improviso"
          align="center"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          {snowMethod.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <article className="glass-panel h-full rounded-lg p-6">
                <span className="text-sm font-black text-snow-lilac">{item.step}</span>
                <h3 className="mt-5 text-xl font-black text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-snow-muted">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-snow py-20">
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
              delay={index * 0.05}
            />
          ))}
        </div>
      </section>

      <section className="container-snow py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionTitle
            eyebrow="Resultados"
            title="Resultado começa com estratégia"
            description="Esta área está preparada para receber números reais de campanhas, vídeos e oportunidades geradas. Resultados variam conforme investimento, segmento e estratégia aplicada."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {metrics.map((metric, index) => (
              <MetricCard
                key={metric.label}
                label={metric.label}
                value={metric.value}
                delay={index * 0.04}
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
