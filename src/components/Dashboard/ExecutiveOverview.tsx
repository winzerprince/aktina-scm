
import React from 'react';
import { CardTitle, CardDescription, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import DashboardSectionCard from './DashboardSectionCard';

const ExecutiveOverview: React.FC = () => (
  <DashboardSectionCard className="mb-4">
    <CardHeader>
      <CardTitle className="text-xl">Executive Overview</CardTitle>
      <CardDescription>Company-wide KPIs and strategic metrics</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <div className="text-2xl font-bold text-aktina-red">$3.5M</div>
          <div className="text-sm text-muted-foreground">Monthly Revenue</div>
          <Progress value={87} className="mt-2" />
        </div>
        <div>
          <div className="text-2xl font-bold text-aktina-purple">34%</div>
          <div className="text-sm text-muted-foreground">Profit Margin</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-aktina-primary">95%</div>
          <div className="text-sm text-muted-foreground">System Uptime</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-aktina-blue">248</div>
          <div className="text-sm text-muted-foreground">Active Users</div>
        </div>
      </div>
    </CardContent>
  </DashboardSectionCard>
);

export default ExecutiveOverview;
