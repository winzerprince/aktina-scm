
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type PredictionMetric = "sales" | "supply" | "revenue";
type PredictionTimeframe = "day" | "week" | "month";
type PredictionData = {
  value: number;
  previous: number;
  timeframe: PredictionTimeframe;
  metric: PredictionMetric;
  unit: string;
  label: string;
};

export interface PredictionCardProps {
  metric: PredictionMetric;
  value: number;
  previous: number;
  timeframe: PredictionTimeframe;
  unit?: string;
  label?: string;
  onClick?: () => void;
  className?: string;
}

const ICONS: Record<PredictionMetric, React.ReactNode> = {
  sales: (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-blue-500">
      <path d="M4 17V7c0-1.1.9-2 2-2h2.5M20 17V7c0-1.1-.9-2-2-2h-2.5M12 22v-8" stroke="currentColor" strokeWidth={1.5} />
      <rect x="7" y="14" width="3" height="5" rx="1.5" fill="currentColor" className="opacity-40" />
      <rect x="14" y="11" width="3" height="8" rx="1.5" fill="currentColor" className="opacity-80" />
    </svg>
  ),
  supply: (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-green-500">
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth={1.5} />
      <path d="M8 15l4-6 4 6" stroke="currentColor" strokeWidth={1.5} />
    </svg>
  ),
  revenue: (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-purple-500">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={1.5} />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth={1.5} />
    </svg>
  ),
};

export const PredictionCard: React.FC<PredictionCardProps> = ({
  metric,
  value,
  previous,
  timeframe,
  unit,
  label,
  onClick,
  className
}) => {
  const diff = value - previous;
  const diffLabel = diff >= 0 ? `+${diff}` : `${diff}`;
  const diffColor = diff > 0 ? "text-green-600" : diff < 0 ? "text-red-600" : "text-neutral-600";
  const prettyLabel =
    label || (metric === "sales"
      ? "Predicted Sales"
      : metric === "supply"
      ? "Predicted Supply Demand"
      : "Predicted Revenue");

  return (
    <Card
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-white/80 to-blue-50/80 hover:shadow-2xl rounded-lg border-0 transition transform hover:scale-105 hover:from-blue-100/80 cursor-pointer group shadow-sky-100",
        className
      )}
      onClick={onClick}
      tabIndex={0}
      aria-label={prettyLabel}
    >
      <CardHeader className="flex flex-row items-center gap-2 mb-2">
        <span className="inline-block bg-white bg-opacity-50 rounded-full p-2 shadow">
          {ICONS[metric]}
        </span>
        <CardTitle className="text-base font-bold text-aktina-blue tracking-tight">
          {prettyLabel}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-end gap-2">
          <span className="text-3xl font-extrabold text-aktina-primary drop-shadow">
            {value.toLocaleString("en-US", { maximumFractionDigits: 1 })}{unit}
          </span>
          <span className={cn("font-semibold", diffColor, "ml-1 text-xs mb-1")}>
            ({diffLabel})
          </span>
        </div>
        <div className="text-sm text-muted-foreground pt-0.5">
          Compared to last {timeframe}
        </div>
      </CardContent>
      <div className="absolute right-3 bottom-2 transition-opacity opacity-0 group-hover:opacity-100">
        <span className="text-xs px-2 py-1 rounded-full bg-blue-200/70">
          Click to see chart
        </span>
      </div>
    </Card>
  );
};
