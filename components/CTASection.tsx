import { MessageCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { WHATSAPP_URL } from "@/data/site";

type CTASectionProps = {
  title: string;
  description: string;
  buttonLabel?: string;
};

export function CTASection({
  title,
  description,
  buttonLabel = "Falar com a Snow no WhatsApp"
}: CTASectionProps) {
  return (
    <section className="container-snow py-20">
      <Reveal>
        <div className="glass-panel relative overflow-hidden rounded-lg p-8 sm:p-10 lg:p-14">
          <div className="absolute inset-0 snow-grid opacity-20" aria-hidden="true" />
          <div className="absolute right-0 top-0 h-px w-3/5 bg-gradient-to-r from-transparent via-snow-lilac/80 to-transparent" aria-hidden="true" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-balance text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                {title}
              </h2>
              <p className="mt-5 max-w-3xl text-pretty text-base leading-8 text-snow-muted sm:text-lg">
                {description}
              </p>
            </div>
            <Button href={WHATSAPP_URL} size="lg" showArrow className="w-full sm:w-auto">
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
              {buttonLabel}
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
