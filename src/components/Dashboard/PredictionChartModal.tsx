
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
} from "@/components/ui/chart";

// Import required recharts components
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer
} from "recharts";

interface PredictionChartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chartType?: "line" | "bar";
  metricLabel: string;
  history: { date: string; real: number; predicted?: number }[];
  unit?: string;
}

const getColor = (type: "real" | "predicted") =>
  type === "real" ? "hsl(var(--aktina-blue))" : "hsl(var(--aktina-primary))";

export const PredictionChartModal: React.FC<PredictionChartModalProps> = ({
  open,
  onOpenChange,
  chartType = "line",
  metricLabel,
  history,
  unit,
}) => {
  // Only line chart for now for clarity.
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-lg bg-white/90 backdrop-blur-md border-0 relative">
        <Card className="bg-white/40 backdrop-blur rounded-lg border-0 shadow-lg">
          <CardHeader>
            <CardTitle>{metricLabel} history and prediction</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              id="predictions-modal"
              config={{
                real: { color: getColor("real"), label: "Actual" },
                predicted: { color: getColor("predicted"), label: "Predicted" },
              }}
            >
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={history}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="real"
                    stroke={getColor("real")}
                    name="Actual"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    isAnimationActive={true}
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke={getColor("predicted")}
                    name="Predicted"
                    strokeDasharray="4 4"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
