import type { Metadata } from "next";
import { Clock, Globe2, Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import {
  CONTACT_EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SITE_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL
} from "@/data/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Snow Agência de Crescimento pelo WhatsApp ou formulário de contato para planejar o crescimento digital do seu negócio local.",
  alternates: {
    canonical: "/contato"
  }
};

const contactItems = [
  {
    label: "WhatsApp",
    value: WHATSAPP_DISPLAY,
    href: WHATSAPP_URL,
    icon: MessageCircle
  },
  {
    label: "Instagram",
    value: INSTAGRAM_HANDLE,
    href: INSTAGRAM_URL,
    icon: Instagram
  },
  {
    label: "E-mail",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: Mail
  },
  {
    label: "Site",
    value: SITE_URL,
    href: "https://snowagencia.com/",
    icon: Globe2
  },
  {
    label: "Localização",
    value: "São José dos Pinhais - PR",
    icon: MapPin
  },
  {
    label: "Horário",
    value: "Segunda a sexta, das 08h às 18h",
    icon: Clock
  }
];

export default function ContatoPage() {
  return (
    <section className="container-snow pt-32 sm:pt-36 lg:pt-40">
      <div className="grid gap-10 pb-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <div>
          <SectionTitle
            eyebrow="Contato"
            title="Vamos conversar sobre o crescimento do seu negócio?"
            description="Preencha o formulário abaixo ou fale direto pelo WhatsApp. Vamos entender seu momento e indicar o melhor caminho para sua empresa."
          />
          <Reveal delay={0.1} className="mt-10">
            <ContactForm />
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <aside className="glass-panel sticky top-28 rounded-lg p-6 sm:p-8">
            <h2 className="text-2xl font-black text-white">Canais da Snow</h2>
            <p className="mt-4 text-sm leading-7 text-snow-muted">
              Atendimento para negócios locais que querem organizar marketing, conteúdo, tráfego e presença digital com mais clareza.
            </p>
            <div className="mt-8 divide-y divide-snow-border">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-snow-border bg-snow-purple/20 text-snow-lilac">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs font-bold text-snow-lilac">{item.label}</span>
                      <span className="block text-sm font-semibold leading-6 text-white">{item.value}</span>
                    </span>
                  </>
                );

                if (item.href) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className="flex items-center gap-4 py-4 transition hover:text-snow-lilac"
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <div key={item.label} className="flex items-center gap-4 py-4">
                    {content}
                  </div>
                );
              })}
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
