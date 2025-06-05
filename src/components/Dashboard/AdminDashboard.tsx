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
import { Home, BarChart3, TrendingUp, MessageSquare, Users, Settings, DollarSign, Building, Shield, Bell } from 'lucide-react';

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

  const renderHomeTab = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Executive Summary */}
      <Card className="bg-gradient-to-r from-aktina-red/10 to-aktina-purple/10 border-0">
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
      </Card>

      {/* Key Performance Indicators */}
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

      {/* Financial Performance Chart */}
      <ChartCard
        title="Financial Performance"
        description="Monthly revenue, costs, and profit analysis"
        data={kpiData}
        type="bar"
        dataKey="profit"
        xAxisKey="name"
        color="hsl(var(--aktina-red))"
      />

      {/* Department Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance Overview</CardTitle>
          <CardDescription>Cross-functional efficiency and satisfaction metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departmentPerformance.map((dept, index) => (
              <Card key={dept.department} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">{dept.department}</h3>
                  <Badge className="bg-aktina-primary text-white">
                    {Math.round((dept.efficiency + dept.budget + dept.satisfaction) / 3)}% Overall
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Efficiency</span>
                      <span>{dept.efficiency}%</span>
                    </div>
                    <Progress value={dept.efficiency} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Budget Performance</span>
                      <span>{dept.budget}%</span>
                    </div>
                    <Progress value={dept.budget} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Team Satisfaction</span>
                      <span>{dept.satisfaction}%</span>
                    </div>
                    <Progress value={dept.satisfaction} className="h-2" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

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

  const renderPredictionsTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Strategic Predictions & AI Insights</CardTitle>
          <CardDescription>Market intelligence, growth projections, and strategic recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Market Predictions</h3>
              <div className="space-y-4">
                {[
                  { period: 'Q3 2024', prediction: 'Strong Growth', confidence: 94, impact: 'Revenue +23%' },
                  { period: 'Q4 2024', prediction: 'Market Expansion', confidence: 87, impact: 'Market Share +5%' },
                  { period: 'Q1 2025', prediction: 'Technology Shift', confidence: 76, impact: 'Investment Needed' },
                  { period: 'H1 2025', prediction: 'Consolidation', confidence: 82, impact: 'Competitive Advantage' }
                ].map((pred) => (
                  <Card key={pred.period} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold">{pred.period}</div>
                      <Badge className="bg-aktina-blue text-white">{pred.confidence}% Confidence</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium text-aktina-primary">{pred.prediction}</div>
                      <div className="text-sm text-muted-foreground">{pred.impact}</div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Strategic Recommendations</h3>
              <div className="space-y-4">
                {[
                  { title: 'Expand Production Capacity', priority: 'High', impact: 'Revenue Growth', timeline: '6 months' },
                  { title: 'Invest in AI Technology', priority: 'High', impact: 'Efficiency +25%', timeline: '12 months' },
                  { title: 'New Market Entry', priority: 'Medium', impact: 'Market Share +8%', timeline: '18 months' },
                  { title: 'Sustainability Initiative', priority: 'Medium', impact: 'Brand Value +15%', timeline: '24 months' }
                ].map((rec) => (
                  <Card key={rec.title} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold">{rec.title}</div>
                      <Badge className={
                        rec.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                      }>
                        {rec.priority} Priority
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-green-600">{rec.impact}</div>
                      <div className="text-sm text-muted-foreground">Timeline: {rec.timeline}</div>
                    </div>
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
