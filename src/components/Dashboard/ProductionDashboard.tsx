import React, { useState } from 'react';
import TabNavigation from '../Navigation/TabNavigation';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';
import AnalyticsCard from './AnalyticsCard';
import ProfileSettings from '../Profile/ProfileSettings';
import ChatInterface from '../Chat/ChatInterface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Home, Settings, TrendingUp, BarChart3, Zap, Cog, Activity, MessageSquare } from 'lucide-react';

const ProductionDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'efficiency', label: 'Efficiency', icon: <Zap className="w-4 h-4" /> },
    { id: 'maintenance', label: 'Maintenance', badge: 3, icon: <Cog className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'optimization', label: 'Optimization', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'communication', label: 'Communication', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  const productionData = [
    { name: 'Jan', output: 2450, downtime: 3, quality: 98 },
    { name: 'Feb', output: 2780, downtime: 2, quality: 99 },
    { name: 'Mar', output: 2670, downtime: 4, quality: 97 },
    { name: 'Apr', output: 3120, downtime: 1, quality: 99 },
    { name: 'May', output: 2980, downtime: 3, quality: 98 },
    { name: 'Jun', output: 3340, downtime: 2, quality: 99 }
  ];

  const machineData = [
    { name: 'Machine A', efficiency: 92, status: 'active', lastMaintenance: '2024-01-15' },
    { name: 'Machine B', efficiency: 95, status: 'active', lastMaintenance: '2024-01-20' },
    { name: 'Machine C', efficiency: 88, status: 'maintenance', lastMaintenance: '2024-01-25' },
    { name: 'Machine D', efficiency: 90, status: 'active', lastMaintenance: '2024-01-28' }
  ];

  const alerts = [
    { id: 'ALT-001', machine: 'Machine C', type: 'Maintenance', description: 'Scheduled maintenance overdue', priority: 'High' },
    { id: 'ALT-002', machine: 'Machine A', type: 'Performance', description: 'Efficiency below average', priority: 'Medium' },
    { id: 'ALT-003', machine: 'Machine B', type: 'Quality', description: 'Quality control failure', priority: 'High' }
  ];

  const renderHomeTab = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Production Overview */}
      <Card className="bg-gradient-to-r from-aktina-teal/10 to-aktina-green/10 border-0">
        <CardHeader>
          <CardTitle className="text-xl">Production Overview</CardTitle>
          <CardDescription>Real-time production metrics and operational status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold text-aktina-teal">4</div>
              <div className="text-sm text-muted-foreground">Active Machines</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-aktina-primary">3340</div>
              <div className="text-sm text-muted-foreground">Units Produced This Month</div>
              <Progress value={89} className="mt-2" />
            </div>
            <div>
              <div className="text-2xl font-bold text-aktina-blue">99%</div>
              <div className="text-sm text-muted-foreground">Quality Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-aktina-amber">2</div>
              <div className="text-sm text-muted-foreground">Downtime Incidents</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Monthly Output"
          value={3340}
          icon={<Activity className="w-4 h-4" />}
          trend="up"
          trendValue="12% vs last month"
          delay={0}
        />
        <MetricCard
          title="Downtime Incidents"
          value={2}
          icon={<Cog className="w-4 h-4" />}
          trend="down"
          trendValue="23% decrease"
          delay={100}
        />
        <MetricCard
          title="Quality Score"
          value={99}
          suffix="%"
          icon={<Zap className="w-4 h-4" />}
          trend="up"
          trendValue="1% improvement"
          delay={200}
        />
        <MetricCard
          title="Overall Efficiency"
          value={93}
          suffix="%"
          icon={<TrendingUp className="w-4 h-4" />}
          trend="up"
          trendValue="5% increase"
          delay={300}
        />
      </div>

      {/* Machine Status */}
      <Card>
        <CardHeader>
          <CardTitle>Machine Status</CardTitle>
          <CardDescription>Real-time status and performance of production machines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {machineData.map((machine, index) => (
              <Card key={machine.name} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold">{machine.name}</div>
                    <div className="text-sm text-muted-foreground">Last Maintenance: {machine.lastMaintenance}</div>
                  </div>
                  <Badge className={machine.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                    {machine.status.charAt(0).toUpperCase() + machine.status.slice(1)}
                  </Badge>
                </div>
                <Progress value={machine.efficiency} className="h-2" />
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>Critical alerts requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-aktina-red/10 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-aktina-red" />
                  </div>
                  <div>
                    <div className="font-semibold">{alert.machine} - {alert.type}</div>
                    <div className="text-sm text-muted-foreground">{alert.description}</div>
                  </div>
                </div>
                <Button size="sm" variant="outline">Resolve</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEfficiencyTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Production Efficiency</CardTitle>
          <CardDescription>Track and optimize production line efficiency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnalyticsCard
              title="Overall Equipment Effectiveness"
              value={85}
              unit="%"
              trend="up"
              trendValue="2% improvement"
            />
            <AnalyticsCard
              title="Average Cycle Time"
              value={2.4}
              unit=" min"
              trend="down"
              trendValue="15% faster"
            />
            <AnalyticsCard
              title="Throughput Rate"
              value={1250}
              unit=" units/hr"
              trend="up"
              trendValue="High demand"
            />
          </div>
          
          <ChartCard
            title="Efficiency Trend"
            description="Monthly efficiency performance"
            data={productionData}
            type="line"
            dataKey="quality"
            xAxisKey="name"
            color="hsl(var(--aktina-green))"
          />
        </CardContent>
      </Card>
    </div>
  );

  const renderMaintenanceTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Management</CardTitle>
          <CardDescription>Manage machine maintenance schedules and track downtime</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnalyticsCard
              title="Scheduled Maintenance"
              value={3}
              trend="down"
              trendValue="1 completed today"
            />
            <AnalyticsCard
              title="Unscheduled Downtime"
              value={1.2}
              unit=" hours"
              trend="down"
              trendValue="Reduced downtime"
            />
            <AnalyticsCard
              title="Maintenance Cost"
              value={4500}
              prefix="$"
              trend="up"
              trendValue="Budget tracking"
            />
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Upcoming Maintenance</h3>
            <div className="space-y-4">
              {machineData.filter(machine => machine.status === 'maintenance').map(machine => (
                <Card key={machine.name} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{machine.name}</div>
                    <Badge className="bg-aktina-amber text-white">Maintenance</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">Last Maintenance: {machine.lastMaintenance}</div>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsCard
          title="Production Volume"
          value={3340}
          unit=" units"
          trend="up"
          trendValue="vs last month"
        />
        <AnalyticsCard
          title="Quality Assurance"
          value={99}
          unit="%"
          trend="up"
          trendValue="Consistent quality"
        />
        <AnalyticsCard
          title="Downtime Reduction"
          value={25}
          unit="%"
          trend="down"
          trendValue="Improved uptime"
        />
      </div>

      <ChartCard
        title="Production Performance Analytics"
        description="Comprehensive production metrics and trend analysis"
        data={productionData}
        type="bar"
        dataKey="output"
        xAxisKey="name"
        color="hsl(var(--aktina-teal))"
      />

      <Card>
        <CardHeader>
          <CardTitle>Detailed Production Analytics</CardTitle>
          <CardDescription>In-depth analysis of production operations and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Machine Efficiency</h3>
              <div className="space-y-3">
                {machineData.map((machine) => (
                  <div key={machine.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{machine.name}</div>
                      <div className="text-sm text-muted-foreground">Efficiency: {machine.efficiency}%</div>
                    </div>
                    <Progress value={machine.efficiency} className="w-20 h-2" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Downtime Analysis</h3>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{alert.machine}</div>
                      <div className="text-sm text-muted-foreground">{alert.description}</div>
                    </div>
                    <Badge className="bg-aktina-red text-white">
                      {alert.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderOptimizationTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Production Optimization</CardTitle>
          <CardDescription>AI-driven optimization recommendations and insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Efficiency Recommendations</h3>
              <div className="space-y-4">
                {[
                  { recommendation: 'Adjust machine settings', impact: 'High', potential: '+5%' },
                  { recommendation: 'Optimize material flow', impact: 'Medium', potential: '+3%' },
                  { recommendation: 'Improve operator training', impact: 'High', potential: '+4%' }
                ].map((rec) => (
                  <Card key={rec.recommendation} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{rec.recommendation}</div>
                      <Badge className="bg-aktina-primary text-white">{rec.impact} Impact</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">Potential Improvement: {rec.potential}</div>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Predictive Maintenance</h3>
              <div className="space-y-4">
                {[
                  { machine: 'Machine A', risk: 'Low', nextMaintenance: '2024-02-15' },
                  { machine: 'Machine B', risk: 'Medium', nextMaintenance: '2024-02-20' },
                  { machine: 'Machine C', risk: 'High', nextMaintenance: '2024-02-25' }
                ].map((machine) => (
                  <Card key={machine.machine} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{machine.machine}</div>
                      <Badge className={
                        machine.risk === 'High' ? 'bg-red-100 text-red-800' :
                        machine.risk === 'Medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {machine.risk} Risk
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">Next Maintenance: {machine.nextMaintenance}</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCommunicationTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Communication Center</CardTitle>
          <CardDescription>Chat with production team, quality control, maintenance staff, and get AI assistance for production operations</CardDescription>
        </CardHeader>
        <CardContent>
          <ChatInterface userRole="Production Manager" />
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home': return renderHomeTab();
      case 'efficiency': return renderEfficiencyTab();
      case 'maintenance': return renderMaintenanceTab();
      case 'analytics': return renderAnalyticsTab();
      case 'optimization': return renderOptimizationTab();
      case 'communication': return renderCommunicationTab();
      case 'profile': return <ProfileSettings />;
      default: return renderHomeTab();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-aktina-teal to-aktina-green bg-clip-text text-transparent">
          Production Manager Dashboard
        </h1>
      </div>

      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="w-fit"
      />

      {renderTabContent()}
    </div>
  );
};

export default ProductionDashboard;
