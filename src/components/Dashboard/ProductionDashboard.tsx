import React, { useState } from 'react';
import TabNavigation from '../Navigation/TabNavigation';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';
import ProfileSettings from '../Profile/ProfileSettings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Home, Package, Boxes, Factory, BarChart3, MessageSquare, TrendingUp, Settings } from 'lucide-react';

const ProductionDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'orders', label: 'Orders', badge: 8, icon: <Package className="w-4 h-4" /> },
    { id: 'inventory', label: 'Inventory', badge: 3, icon: <Boxes className="w-4 h-4" /> },
    { id: 'production', label: 'Production', icon: <Factory className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'ai-chat', label: 'AI Chat', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'sales', label: 'Sales', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  const productionLines = [
    { id: 'Line-A', name: 'Assembly Line A', status: 'active', efficiency: 94, output: 450 },
    { id: 'Line-B', name: 'Assembly Line B', status: 'active', efficiency: 87, output: 380 },
    { id: 'Line-C', name: 'Quality Control', status: 'maintenance', efficiency: 0, output: 0 },
    { id: 'Line-D', name: 'Packaging Line', status: 'active', efficiency: 92, output: 520 }
  ];

  const productionData = [
    { name: 'Mon', target: 1000, actual: 950, efficiency: 95 },
    { name: 'Tue', target: 1000, actual: 1050, efficiency: 105 },
    { name: 'Wed', target: 1000, actual: 980, efficiency: 98 },
    { name: 'Thu', target: 1000, actual: 1020, efficiency: 102 },
    { name: 'Fri', target: 1000, actual: 990, efficiency: 99 },
    { name: 'Sat', target: 800, actual: 820, efficiency: 102 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-aktina-primary text-white';
      case 'maintenance': return 'bg-aktina-amber text-white';
      case 'offline': return 'bg-aktina-red text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const renderHomeTab = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Production Overview Banner */}
      <Card className="bg-gradient-to-r from-aktina-primary/10 to-aktina-blue/10 border-0">
        <CardHeader>
          <CardTitle className="text-xl">Production Overview</CardTitle>
          <CardDescription>Real-time production line status and daily targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-aktina-primary">3/4</div>
              <div className="text-sm text-muted-foreground">Active Lines</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-aktina-forest">1,850</div>
              <div className="text-sm text-muted-foreground">Units Today</div>
              <Progress value={77} className="mt-2" />
            </div>
            <div>
              <div className="text-2xl font-bold text-aktina-blue">96%</div>
              <div className="text-sm text-muted-foreground">Overall Efficiency</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Overall Equipment Effectiveness"
          value={87}
          suffix="%"
          icon={<Factory className="w-4 h-4" />}
          trend="up"
          trendValue="3% improvement"
          delay={0}
        />
        <MetricCard
          title="Inventory Alerts"
          value={3}
          icon={<Boxes className="w-4 h-4" />}
          trend="down"
          trendValue="2 resolved today"
          delay={100}
        />
        <MetricCard
          title="Quality Score"
          value={98}
          suffix="%"
          icon={<BarChart3 className="w-4 h-4" />}
          trend="up"
          trendValue="0.5% increase"
          delay={200}
        />
        <MetricCard
          title="Daily Output"
          value={1850}
          icon={<TrendingUp className="w-4 h-4" />}
          trend="up"
          trendValue="Target: 2400"
          delay={300}
        />
      </div>

      {/* Production Lines Status */}
      <Card className="animate-slide-up">
        <CardHeader>
          <CardTitle>Production Lines Status</CardTitle>
          <CardDescription>Real-time status of all production lines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productionLines.map((line, index) => (
              <Card 
                key={line.id}
                className="p-4 card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold">{line.name}</div>
                    <div className="text-sm text-muted-foreground">{line.id}</div>
                  </div>
                  <Badge className={getStatusColor(line.status)}>
                    {line.status.charAt(0).toUpperCase() + line.status.slice(1)}
                  </Badge>
                </div>
                {line.status === 'active' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Efficiency</span>
                      <span className="font-medium">{line.efficiency}%</span>
                    </div>
                    <Progress value={line.efficiency} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>Output Today</span>
                      <span className="font-medium">{line.output} units</span>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Production Performance Chart */}
      <ChartCard
        title="Weekly Production Performance"
        description="Target vs actual production output with efficiency metrics"
        data={productionData}
        type="bar"
        dataKey="actual"
        xAxisKey="name"
        color="hsl(var(--aktina-primary))"
      />
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Orders Management</CardTitle>
          <CardDescription>Incoming orders from wholesalers and outgoing orders to suppliers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Order management interface would be implemented here</p>
            <p className="text-sm text-muted-foreground mt-2">
              Including order processing, supplier coordination, and batch management
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderInventoryTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Inventory Control</CardTitle>
          <CardDescription>Stock levels, reorder management, and inventory movements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Inventory control interface would be implemented here</p>
            <p className="text-sm text-muted-foreground mt-2">
              Including stock grids, reorder automation, and movement tracking
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProductionTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Production Planning</CardTitle>
          <CardDescription>Production scheduling, line management, and BOM control</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Production planning interface would be implemented here</p>
            <p className="text-sm text-muted-foreground mt-2">
              Including Kanban boards, scheduling tools, and BOM management
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Production Analytics</CardTitle>
          <CardDescription>Efficiency trends, quality metrics, and cost analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Analytics dashboard would be implemented here</p>
            <p className="text-sm text-muted-foreground mt-2">
              Including efficiency charts, quality dashboards, and cost analysis tools
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAiChatTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>AI Assistant</CardTitle>
          <CardDescription>Intelligent production optimization and predictive insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">AI chat interface would be implemented here</p>
            <p className="text-sm text-muted-foreground mt-2">
              Including conversational AI, recommendations, and anomaly detection
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSalesTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Sales Tracking</CardTitle>
          <CardDescription>Revenue analytics, product performance, and financial metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Sales tracking dashboard would be implemented here</p>
            <p className="text-sm text-muted-foreground mt-2">
              Including revenue charts, product rankings, and financial analysis
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home': return renderHomeTab();
      case 'orders': return renderOrdersTab();
      case 'inventory': return renderInventoryTab();
      case 'production': return renderProductionTab();
      case 'analytics': return renderAnalyticsTab();
      case 'ai-chat': return renderAiChatTab();
      case 'sales': return renderSalesTab();
      case 'profile': return <ProfileSettings />;
      default: return renderHomeTab();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-aktina-primary to-aktina-forest bg-clip-text text-transparent">
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
