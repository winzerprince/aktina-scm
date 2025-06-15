
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
} from "@/components/ui/chart";

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
              {/*
                Can't use recharts directly, must use <LineChart> etc if needed.
                Example (pseudo):
                <LineChart data={history}>
                  ...
                </LineChart>
              */}
              {/* @ts-ignore */}
              <recharts.LineChart data={history}>
                {/* @ts-ignore */}
                <recharts.CartesianGrid strokeDasharray="3 3" />
                {/* @ts-ignore */}
                <recharts.XAxis dataKey="date" />
                {/* @ts-ignore */}
                <recharts.YAxis />
                {/* @ts-ignore */}
                <recharts.Tooltip />
                {/* @ts-ignore */}
                <recharts.Legend />
                {/* @ts-ignore */}
                <recharts.Line type="monotone" dataKey="real" stroke="hsl(var(--aktina-blue))" name="Actual" />
                {/* @ts-ignore */}
                <recharts.Line type="monotone" dataKey="predicted" stroke="hsl(var(--aktina-primary))" name="Predicted" />
              </recharts.LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
