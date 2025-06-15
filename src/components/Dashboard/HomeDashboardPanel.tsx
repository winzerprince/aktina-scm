
import React from "react";
import ExecutiveOverview from "./ExecutiveOverview";
import MetricCard from "./MetricCard";
import ChartCard from "./ChartCard";
import CustomerSegmentationChart from "./CustomerSegmentationChart";
import DepartmentPerformanceCard from "./DepartmentPerformanceCard";
import DashboardSectionCard from "./DashboardSectionCard";
import { DollarSign, BarChart3, Building, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const kpiData = [
  { name: 'Jan', revenue: 2400000, costs: 1800000, profit: 600000 },
  { name: 'Feb', revenue: 2800000, costs: 2000000, profit: 800000 },
  { name: 'Mar', revenue: 2600000, costs: 1900000, profit: 700000 },
  { name: 'Apr', revenue: 3200000, costs: 2200000, profit: 1000000 },
  { name: 'May', revenue: 3000000, costs: 2100000, profit: 900000 },
  { name: 'Jun', revenue: 3500000, costs: 2300000, profit: 1200000 }
];

const departmentPerformance = [
  { department: 'Production', efficiency: 94, budget: 85, satisfaction: 92 },
  { department: 'Sales', efficiency: 97, budget: 78, satisfaction: 89 },
  { department: 'HR', efficiency: 91, budget: 92, satisfaction: 95 },
  { department: 'IT', efficiency: 88, budget: 89, satisfaction: 87 }
];

const HomeDashboardPanel: React.FC = () => (
  <div className="space-y-6 animate-fade-in">
    <ExecutiveOverview />

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Total Revenue"
        value={3500000}
        prefix="$"
        icon={<DollarSign className="w-4 h-4" />}
        trend="up"
        trendValue="12% vs last month"
        delay={0}
      />
      <MetricCard
        title="Operational Efficiency"
        value={94}
        suffix="%"
        icon={<BarChart3 className="w-4 h-4" />}
        trend="up"
        trendValue="2% improvement"
        delay={100}
      />
      <MetricCard
        title="Customer Satisfaction"
        value={96}
        suffix="%"
        icon={<Building className="w-4 h-4" />}
        trend="up"
        trendValue="Excellent rating"
        delay={200}
      />
      <MetricCard
        title="Market Share"
        value={18}
        suffix="%"
        icon={<TrendingUp className="w-4 h-4" />}
        trend="up"
        trendValue="Industry leading"
        delay={300}
      />
    </div>

    <CustomerSegmentationChart />

    <ChartCard
      title="Financial Performance"
      description="Monthly revenue, costs, and profit analysis"
      data={kpiData}
      type="bar"
      dataKey="profit"
      xAxisKey="name"
      color="hsl(var(--aktina-red))"
    />

    <DashboardSectionCard>
      <div>
        <div className="text-lg font-semibold mb-4">Department Performance Overview</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departmentPerformance.map((dept) => (
            <DepartmentPerformanceCard key={dept.department} {...dept} />
          ))}
        </div>
      </div>
    </DashboardSectionCard>
  </div>
);

export default HomeDashboardPanel;
