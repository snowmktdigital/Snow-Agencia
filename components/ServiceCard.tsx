import {
  Clapperboard,
  Compass,
  Megaphone,
  MonitorSmartphone,
  MousePointerClick,
  Palette
} from "lucide-react";
import { AnimatedCard } from "@/components/AnimatedCard";

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
    <AnimatedCard delay={delay} className="h-full p-6">
      <div className="mb-7 grid h-14 w-14 place-items-center rounded-lg border border-snow-border bg-snow-purple/20 text-snow-lilac shadow-glow transition duration-300 group-hover/card:scale-110 group-hover/card:rotate-3 group-hover/card:border-snow-lilac/70">
        <Icon aria-hidden="true" className="h-6 w-6 drop-shadow-[0_0_10px_rgba(184,140,255,0.65)]" />
      </div>
      <h3 className="text-xl font-black text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-snow-muted">{description}</p>
    </AnimatedCard>
  );
}
