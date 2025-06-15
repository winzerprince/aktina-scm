import React, { useState } from 'react';
import TabNavigation from '../Navigation/TabNavigation';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';
import AnalyticsCard from './AnalyticsCard';
import CustomerSegmentationChart from './CustomerSegmentationChart';
import ProfileSettings from '../Profile/ProfileSettings';
import ChatInterface from '../Chat/ChatInterface';
import PendingRequestsPanel from './PendingRequestsPanel';
import { PredictionCard } from './PredictionCard';
import { PredictionChartModal } from './PredictionChartModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Home, BarChart3, TrendingUp, MessageSquare, Users, Settings, DollarSign, Building, Shield, Bell } from 'lucide-react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from "recharts";
import HomeDashboardPanel from './HomeDashboardPanel';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'economics', label: 'Economics', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'performance', label: 'Performance', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'predictions', label: 'Predictions', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'communication', label: 'Communication', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'users', label: 'User Management', icon: <Users className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile Settings', icon: <Settings className="w-4 h-4" /> }
  ];

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

  const [predictionMetric, setPredictionMetric] = useState<"sales" | "supply" | "revenue">("sales");
  const [predictionTimeframe, setPredictionTimeframe] = useState<"day" | "week" | "month">("month");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{ metric: string; history: any[]; unit: string } | null>(null);

  // Mock data for predictions
  const predictions = {
    sales: {
      day: { value: 105, previous: 96, unit: "", label: "Predicted Sales (Day)", history: [
        { date: "3d ago", real: 91 },
        { date: "2d ago", real: 96 },
        { date: "Yesterday", real: 99 },
        { date: "Today", real: 98, predicted: 105 }
      ] },
      week: { value: 755, previous: 700, unit: "", label: "Predicted Sales (Week)", history: [
        { date: "2w ago", real: 650 },
        { date: "1w ago", real: 700 },
        { date: "Current", real: 701 },
        { date: "Next week", predicted: 755 }
      ] },
      month: { value: 3120, previous: 2990, unit: "", label: "Predicted Sales (Month)", history: [
        { date: "April", real: 2990 },
        { date: "May", real: 3120, predicted: 3120 }
      ] }
    },
    supply: {
      day: { value: 530, previous: 500, unit: "kg", label: "Predicted Raw Materials (Day)", history: [
        { date: "3d ago", real: 488 },
        { date: "2d ago", real: 500 },
        { date: "Yesterday", real: 510 },
        { date: "Today", real: 512, predicted: 530 }
      ] },
      week: { value: 3700, previous: 3500, unit: "kg", label: "Predicted Raw Materials (Week)", history: [
        { date: "2w ago", real: 3450 },
        { date: "1w ago", real: 3500 },
        { date: "Current", real: 3550 },
        { date: "Next week", predicted: 3700 }
      ] },
      month: { value: 14800, previous: 14100, unit: "kg", label: "Predicted Raw Materials (Month)", history: [
        { date: "April", real: 14100 },
        { date: "May", real: 14800, predicted: 14800 }
      ] }
    },
    revenue: {
      day: { value: 10500, previous: 10100, unit: "$", label: "Predicted Revenue (Day)", history: [
        { date: "3d ago", real: 9800 },
        { date: "2d ago", real: 10100 },
        { date: "Yesterday", real: 10350 },
        { date: "Today", real: 10450, predicted: 10500 }
      ] },
      week: { value: 72000, previous: 69000, unit: "$", label: "Predicted Revenue (Week)", history: [
        { date: "2w ago", real: 66000 },
        { date: "1w ago", real: 69000 },
        { date: "Current", real: 69500 },
        { date: "Next week", predicted: 72000 }
      ] },
      month: { value: 312000, previous: 303000, unit: "$", label: "Predicted Revenue (Month)", history: [
        { date: "April", real: 303000 },
        { date: "May", real: 312000, predicted: 312000 }
      ] }
    }
  };

  const predictionMetrics: Array<{ key: "sales" | "supply" | "revenue"; label: string }> = [
    { key: "sales", label: "Sales" },
    { key: "supply", label: "Supply Demand" },
    { key: "revenue", label: "Revenue" }
  ];

  const predictionTimeframes: Array<{ key: "day" | "week" | "month"; label: string }> = [
    { key: "day", label: "Day" },
    { key: "week", label: "Week" },
    { key: "month", label: "Month" }
  ];

  const openChartModal = (metric: "sales" | "supply" | "revenue", timeframe: "day" | "week" | "month") => {
    const data = predictions[metric][timeframe];
    setModalData({
      metric: data.label,
      history: data.history,
      unit: data.unit,
    });
    setModalOpen(true);
  };

  const renderHomeTab = () => <HomeDashboardPanel />;

  const renderEconomicsTab = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsCard
          title="Revenue Growth"
          value={23}
          unit="%"
          trend="up"
          trendValue="Year over year"
        />
        <AnalyticsCard
          title="Cost Optimization"
          value={156000}
          unit=" saved"
          prefix="$"
          trend="up"
          trendValue="This quarter"
        />
        <AnalyticsCard
          title="ROI"
          value={245}
          unit="%"
          trend="up"
          trendValue="Above industry avg"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Economic Analytics</CardTitle>
          <CardDescription>Comprehensive financial analysis and economic insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Revenue Breakdown</h3>
              <ChartCard
                title="Revenue by Source"
                data={[
                  { name: 'Direct Sales', value: 45 },
                  { name: 'Wholesale', value: 35 },
                  { name: 'Retail Partnerships', value: 20 }
                ]}
                type="pie"
                dataKey="value"
                className="h-64"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Cost Analysis</h3>
              <div className="space-y-4">
                {[
                  { category: 'Production Costs', amount: 1200000, percentage: 52 },
                  { category: 'Personnel', amount: 650000, percentage: 28 },
                  { category: 'Operations', amount: 300000, percentage: 13 },
                  { category: 'Marketing', amount: 150000, percentage: 7 }
                ].map((cost) => (
                  <div key={cost.category} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{cost.category}</div>
                      <div className="text-sm text-muted-foreground">${cost.amount.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{cost.percentage}%</div>
                      <Progress value={cost.percentage} className="w-20 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPerformanceTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>System Performance Analytics</CardTitle>
          <CardDescription>Platform metrics, user engagement, and operational efficiency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <AnalyticsCard
              title="System Uptime"
              value={99.97}
              unit="%"
              trend="up"
              trendValue="Industry leading"
            />
            <AnalyticsCard
              title="Response Time"
              value={145}
              unit="ms"
              trend="down"
              trendValue="15% faster"
            />
            <AnalyticsCard
              title="Active Sessions"
              value={1247}
              trend="up"
              trendValue="Peak usage"
            />
            <AnalyticsCard
              title="Error Rate"
              value={0.03}
              unit="%"
              trend="down"
              trendValue="Minimal errors"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">User Engagement</h3>
              <div className="space-y-3">
                {[
                  { role: 'Suppliers', active: 45, total: 52, engagement: 87 },
                  { role: 'Production', active: 23, total: 25, engagement: 92 },
                  { role: 'Wholesalers', active: 78, total: 89, engagement: 88 },
                  { role: 'Retailers', active: 156, total: 178, engagement: 88 }
                ].map((role) => (
                  <div key={role.role} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{role.role}</div>
                      <div className="text-sm text-muted-foreground">{role.active} / {role.total} active</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{role.engagement}%</div>
                      <div className="text-sm text-muted-foreground">Engagement</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Process Efficiency</h3>
              <ChartCard
                title="Process Cycle Times"
                data={[
                  { name: 'Order Processing', time: 2.3 },
                  { name: 'Production Planning', time: 4.7 },
                  { name: 'Quality Control', time: 1.8 },
                  { name: 'Shipping', time: 3.2 }
                ]}
                type="bar"
                dataKey="time"
                xAxisKey="name"
                color="hsl(var(--aktina-blue))"
                className="h-64"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPredictionsTab = () => {
    const selectedPrediction = predictions[predictionMetric][predictionTimeframe];

    return (
      <div className="space-y-6 animate-fade-in">
        <Card className="bg-white/60 backdrop-blur rounded-2xl border-0 shadow">
          <CardHeader>
            <CardTitle>Sales & Supply Predictions</CardTitle>
            <div className="flex gap-3 flex-wrap mt-3">
              {/* SWITCH METRIC */}
              {predictionMetrics.map((m) => (
                <button
                  key={m.key}
                  className={`px-4 py-1 rounded-full font-medium transition-all border ${
                    predictionMetric === m.key
                      ? "bg-gradient-to-br from-blue-200 to-blue-400 text-blue-900 border-blue-400 shadow"
                      : "bg-white/60 border-neutral-200 text-neutral-700"
                  }`}
                  onClick={() => setPredictionMetric(m.key)}
                >
                  {m.label}
                </button>
              ))}
              {/* SWITCH TIMEFRAME */}
              {predictionTimeframes.map((t) => (
                <button
                  key={t.key}
                  className={`px-4 py-1 rounded-full font-medium transition-all border ${
                    predictionTimeframe === t.key
                      ? "bg-gradient-to-br from-aktina-red/60 to-aktina-primary/80 text-white border-aktina-red shadow"
                      : "bg-white/60 border-neutral-200 text-neutral-700"
                  }`}
                  onClick={() => setPredictionTimeframe(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <div>
                <PredictionCard
                  metric={predictionMetric}
                  value={selectedPrediction.value}
                  previous={selectedPrediction.previous}
                  timeframe={predictionTimeframe}
                  unit={selectedPrediction.unit}
                  label={selectedPrediction.label}
                  // No more onClick for modal!
                />
              </div>
              {/* Inline Graph beside the prediction */}
              <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white/80 p-3 shadow border border-blue-100 h-full">
                  <div className="text-base font-semibold mb-2 text-aktina-blue">{selectedPrediction.label} - Trend</div>
                  <div style={{ minWidth: 250, minHeight: 240 }}>
                    {/* Inline chart logic, using the same chart as in PredictionChartModal.tsx */}
                    <div className="w-full h-80">
                      <div className="bg-white/80 rounded-lg p-2 shadow-sm border border-blue-50">
                        <ResponsiveContainer width="100%" height={230}>
                          <LineChart data={selectedPrediction.history}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="real"
                              stroke="hsl(var(--aktina-blue))"
                              name="Actual"
                              strokeWidth={3}
                              dot={{ r: 5 }}
                              isAnimationActive={true}
                            />
                            <Line
                              type="monotone"
                              dataKey="predicted"
                              stroke="hsl(var(--aktina-primary))"
                              name="Predicted"
                              strokeDasharray="4 4"
                              strokeWidth={3}
                              dot={{ r: 5 }}
                              isAnimationActive={true}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderCommunicationTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Communication Center</CardTitle>
          <CardDescription>Connect with users across the platform and get AI assistance</CardDescription>
        </CardHeader>
        <CardContent>
          <ChatInterface userRole="System Administrator" />
        </CardContent>
      </Card>
    </div>
  );

  const renderUsersTab = () => (
    <div className="space-y-6 animate-fade-in">
      {/* PENDING REQUESTS */}
      <PendingRequestsPanel />

      {/* Existing Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Comprehensive user administration and access control</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <AnalyticsCard
              title="Total Users"
              value={248}
              trend="up"
              trendValue="12 new this month"
            />
            <AnalyticsCard
              title="Active Sessions"
              value={186}
              trend="up"
              trendValue="Peak activity"
            />
            <AnalyticsCard
              title="Pending Approvals"
              value={7}
              trend="down"
              trendValue="3 processed today"
            />
            <AnalyticsCard
              title="Security Alerts"
              value={2}
              trend="down"
              trendValue="Low risk"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">User Distribution by Role</h3>
              <ChartCard
                title="Users by Role"
                data={[
                  { name: 'Retailers', value: 156 },
                  { name: 'Wholesalers', value: 45 },
                  { name: 'Suppliers', value: 23 },
                  { name: 'Production', value: 18 },
                  { name: 'HR', value: 4 },
                  { name: 'Admin', value: 2 }
                ]}
                type="pie"
                dataKey="value"
                className="h-64"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Recent User Activity</h3>
              <div className="space-y-3">
                {[
                  { user: 'john.doe@supplier.com', action: 'Order Submitted', time: '5 min ago', role: 'Supplier' },
                  { user: 'sarah.manager@prod.com', action: 'Production Update', time: '12 min ago', role: 'Production' },
                  { user: 'mike.wholesale@dist.com', action: 'Bulk Order', time: '25 min ago', role: 'Wholesaler' },
                  { user: 'lisa.retail@store.com', action: 'Inventory Check', time: '1 hour ago', role: 'Retailer' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{activity.user}</div>
                      <div className="text-sm text-muted-foreground">{activity.action}</div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-aktina-primary text-white mb-1">{activity.role}</Badge>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home': return renderHomeTab();
      case 'economics': return renderEconomicsTab();
      case 'performance': return renderPerformanceTab();
      case 'predictions': return renderPredictionsTab();
      case 'communication': return renderCommunicationTab();
      case 'users': return renderUsersTab();
      case 'profile': return <ProfileSettings />;
      default: return renderHomeTab();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-aktina-red to-aktina-purple bg-clip-text text-transparent">
          System Administrator Dashboard
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

export default AdminDashboard;
