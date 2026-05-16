import { Activity } from "lucide-react";
import { Reveal } from "@/components/Reveal";

type MetricCardProps = {
  label: string;
  value: string;
  delay?: number;
};

export function MetricCard({ label, value, delay = 0 }: MetricCardProps) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="glass-panel h-full rounded-lg p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <span className="grid h-11 w-11 place-items-center rounded-lg border border-snow-border bg-snow-purple/20 text-snow-lilac">
            <Activity aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="rounded-full border border-snow-border bg-white/[0.05] px-3 py-1 text-xs text-snow-muted">
            editável
          </span>
        </div>
        <p className="text-lg font-black text-white">{label}</p>
        <p className="mt-4 text-sm leading-7 text-snow-muted">{value}</p>
      </article>
    </Reveal>
  );
}
