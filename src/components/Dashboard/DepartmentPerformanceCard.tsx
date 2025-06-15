
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface DepartmentPerformanceCardProps {
  department: string;
  efficiency: number;
  budget: number;
  satisfaction: number;
}

const DepartmentPerformanceCard: React.FC<DepartmentPerformanceCardProps> = ({
  department,
  efficiency,
  budget,
  satisfaction
}) => (
  <Card className="p-4 rounded-2xl bg-white/50 shadow hover:scale-105 transition-transform glass-effect border-0">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold">{department}</h3>
      <Badge className="bg-aktina-primary text-white">
        {Math.round((efficiency + budget + satisfaction) / 3)}% Overall
      </Badge>
    </div>
    <div className="space-y-3">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Efficiency</span>
          <span>{efficiency}%</span>
        </div>
        <Progress value={efficiency} className="h-2" />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Budget Performance</span>
          <span>{budget}%</span>
        </div>
        <Progress value={budget} className="h-2" />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Team Satisfaction</span>
          <span>{satisfaction}%</span>
        </div>
        <Progress value={satisfaction} className="h-2" />
      </div>
    </div>
  </Card>
);

export default DepartmentPerformanceCard;
