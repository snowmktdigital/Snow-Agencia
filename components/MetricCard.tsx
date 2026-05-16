import { Activity } from "lucide-react";
import { AnimatedCard } from "@/components/AnimatedCard";

type MetricCardProps = {
  label: string;
  value: string;
  description: string;
  delay?: number;
};

export function MetricCard({ label, value, description, delay = 0 }: MetricCardProps) {
  return (
    <AnimatedCard delay={delay} className="h-full p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="grid h-11 w-11 place-items-center rounded-lg border border-snow-border bg-snow-purple/20 text-snow-lilac transition duration-300 group-hover/card:scale-110 group-hover/card:border-snow-lilac/70">
          <Activity aria-hidden="true" className="h-5 w-5" />
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-snow-lilac/50 to-transparent" />
      </div>
      <p className="text-3xl font-black tracking-normal text-white sm:text-4xl">{value}</p>
      <p className="mt-2 text-base font-bold text-snow-lilac">{label}</p>
      <p className="mt-4 text-sm leading-7 text-snow-muted">{description}</p>
    </AnimatedCard>
  );
}
