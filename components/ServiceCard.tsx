import {
  Clapperboard,
  Compass,
  Megaphone,
  MonitorSmartphone,
  MousePointerClick,
  Palette
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

const iconMap = {
  social: Megaphone,
  traffic: MousePointerClick,
  video: Clapperboard,
  brand: Palette,
  site: MonitorSmartphone,
  consulting: Compass
};

type ServiceCardProps = {
  title: string;
  description: string;
  icon: string;
  delay?: number;
};

export function ServiceCard({ title, description, icon, delay = 0 }: ServiceCardProps) {
  const Icon = iconMap[icon as keyof typeof iconMap] ?? Megaphone;

  return (
    <Reveal delay={delay} className="h-full">
      <article className="glass-panel group h-full rounded-lg p-6 transition duration-300 hover:-translate-y-1 hover:border-snow-lilac/[0.55]">
        <div className="mb-7 grid h-14 w-14 place-items-center rounded-lg border border-snow-border bg-snow-purple/20 text-snow-lilac shadow-glow">
          <Icon aria-hidden="true" className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-black text-white">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-snow-muted">{description}</p>
      </article>
    </Reveal>
  );
}
