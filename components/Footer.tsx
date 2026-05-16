import Link from "next/link";
import { Instagram, Mail, MapPin, MessageCircle, Snowflake } from "lucide-react";
import {
  CONTACT_EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  navLinks,
  services,
  SITE_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL
} from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-snow-border bg-snow-bg/[0.82]">
      <div className="container-snow grid gap-10 py-14 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg border border-snow-border bg-white/[0.07]">
              <Snowflake aria-hidden="true" className="h-5 w-5 text-snow-lilac" />
            </span>
            <span>
              <span className="block text-lg font-black text-white">Snow Agência de Crescimento</span>
              <span className="block text-sm text-snow-muted">{SITE_URL}</span>
            </span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-snow-muted">
            Estratégia, conteúdo e tráfego pago.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white">Links rápidos</h2>
          <ul className="mt-4 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-snow-muted transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white">Serviços</h2>
          <ul className="mt-4 space-y-3">
            {services.slice(0, 6).map((service) => (
              <li key={service.title} className="text-sm text-snow-muted">
                {service.title}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white">Contato</h2>
          <ul className="mt-4 space-y-4 text-sm text-snow-muted">
            <li>
              <a className="inline-flex items-center gap-2 transition hover:text-white" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" className="h-4 w-4 text-snow-lilac" />
                {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 transition hover:text-white" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                <Instagram aria-hidden="true" className="h-4 w-4 text-snow-lilac" />
                {INSTAGRAM_HANDLE}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <Mail aria-hidden="true" className="h-4 w-4 text-snow-lilac" />
              {CONTACT_EMAIL}
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin aria-hidden="true" className="h-4 w-4 text-snow-lilac" />
              São José dos Pinhais - PR
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-snow-border py-5">
        <div className="container-snow flex flex-col gap-2 text-xs text-snow-muted/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Snow Agência de Crescimento. Todos os direitos reservados.</p>
          <p>Marketing digital para negócios locais da região metropolitana de Curitiba.</p>
        </div>
      </div>
    </footer>
  );
}
