import React, { useState } from 'react';
import TabNavigation from '../Navigation/TabNavigation';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';
import AnalyticsCard from './AnalyticsCard';
import ProfileSettings from '../Profile/ProfileSettings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Home, Package, Settings, Eye, CheckCircle, XCircle, BarChart3 } from 'lucide-react';

const SupplierDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'orders', label: 'Orders', badge: 5, icon: <Package className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  const recentOrders = [
    { id: 'ORD-001', product: 'Circuit Boards', quantity: 500, status: 'pending', dueDate: '2024-01-15', value: 15000 },
    { id: 'ORD-002', product: 'Resistors', quantity: 2000, status: 'accepted', dueDate: '2024-01-18', value: 2400 },
    { id: 'ORD-003', product: 'Capacitors', quantity: 1500, status: 'shipped', dueDate: '2024-01-20', value: 3200 },
    { id: 'ORD-004', product: 'Microprocessors', quantity: 200, status: 'pending', dueDate: '2024-01-22', value: 45000 }
  ];

  const performanceData = [
    { name: 'Jan', revenue: 45000, orders: 23, performance: 95 },
    { name: 'Feb', revenue: 52000, orders: 28, performance: 97 },
    { name: 'Mar', revenue: 48000, orders: 25, performance: 92 },
    { name: 'Apr', revenue: 61000, orders: 32, performance: 98 },
    { name: 'May', revenue: 55000, orders: 29, performance: 94 },
    { name: 'Jun', revenue: 67000, orders: 35, performance: 96 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-aktina-amber text-white';
      case 'accepted': return 'bg-aktina-blue text-white';
      case 'shipped': return 'bg-aktina-primary text-white';
      case 'delivered': return 'bg-aktina-forest text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const renderHomeTab = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Orders This Month"
          value={35}
          icon={<Package className="w-4 h-4" />}
          trend="up"
          trendValue="12% from last month"
          delay={0}
        />
        <MetricCard
          title="Pending Orders"
          value={5}
          icon={<Package className="w-4 h-4" />}
          trend="down"
          trendValue="3 fewer than yesterday"
          delay={100}
        />
        <MetricCard
          title="Completed Deliveries"
          value={28}
          suffix=""
          icon={<CheckCircle className="w-4 h-4" />}
          trend="up"
          trendValue="4 completed today"
          delay={200}
        />
        <MetricCard
          title="On-Time Delivery"
          value={96}
          suffix="%"
          icon={<CheckCircle className="w-4 h-4" />}
          trend="up"
          trendValue="2% improvement"
          delay={300}
        />
      </div>

      {/* Recent Orders Table */}
      <Card className="animate-slide-up">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Your latest order requests and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div 
                key={order.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-md transition-all duration-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="font-semibold">{order.id}</div>
                    <div className="text-sm text-muted-foreground">{order.product}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">Qty: {order.quantity}</div>
                    <div className="text-sm text-muted-foreground">Due: {order.dueDate}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-semibold">${order.value.toLocaleString()}</div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline" className="button-hover">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Chart */}
      <ChartCard
        title="Performance Metrics"
        description="Monthly delivery performance and revenue trends"
        data={performanceData}
        type="line"
        dataKey="performance"
        xAxisKey="name"
        color="hsl(var(--aktina-primary))"
      />
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>Manage incoming orders and update their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {recentOrders.map((order, index) => (
              <Card key={order.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-semibold">{order.id} - {order.product}</div>
                    <div className="text-sm text-muted-foreground">
                      Quantity: {order.quantity} | Due: {order.dueDate} | Value: ${order.value.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {order.status === 'pending' && (
                      <>
                        <Button size="sm" className="bg-aktina-primary button-hover">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Accept
                        </Button>
                        <Button size="sm" variant="destructive" className="button-hover">
                          <XCircle className="w-4 h-4 mr-1" />
                          Decline
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="outline" className="button-hover">
                      <Eye className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsCard
          title="Delivery Performance"
          value={96}
          unit="%"
          trend="up"
          trendValue="2% improvement"
        />
        <AnalyticsCard
          title="Quality Rating"
          value={98}
          unit="%"
          trend="up"
          trendValue="Excellent quality"
        />
        <AnalyticsCard
          title="Order Growth"
          value={23}
          unit="%"
          trend="up"
          trendValue="Year over year"
        />
      </div>

      <ChartCard
        title="Revenue & Order Trends"
        description="Monthly revenue and order volume analysis"
        data={performanceData}
        type="bar"
        dataKey="revenue"
        xAxisKey="name"
        color="hsl(var(--aktina-primary))"
      />

      <Card>
        <CardHeader>
          <CardTitle>Performance Analytics</CardTitle>
          <CardDescription>In-depth analysis of supplier performance and quality metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product Performance</h3>
              <div className="space-y-3">
                {[
                  { product: 'Circuit Boards', sales: 1250, defectRate: 0.2, rating: 4.9 },
                  { product: 'Resistors', sales: 5600, defectRate: 0.1, rating: 5.0 },
                  { product: 'Capacitors', sales: 3800, defectRate: 0.3, rating: 4.8 },
                  { product: 'Microprocessors', sales: 720, defectRate: 0.5, rating: 4.7 }
                ].map((item, index) => (
                  <Card key={index} className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold">{item.product}</div>
                      <Badge className="bg-aktina-primary text-white">
                        {item.rating} ⭐
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Sales: {item.sales} units</span>
                      <span>Defect Rate: {item.defectRate}%</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quality Metrics</h3>
              <ChartCard
                title="Quality Score by Product"
                data={[
                  { name: 'Circuit Boards', quality: 97 },
                  { name: 'Resistors', quality: 99 },
                  { name: 'Capacitors', quality: 96 },
                  { name: 'Microprocessors', quality: 94 }
                ]}
                type="bar"
                dataKey="quality"
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

  const renderProfileTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Update your company details and business information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Profile settings interface would be implemented here</p>
            <p className="text-sm text-muted-foreground mt-2">
              Including company logo upload, contact information, certifications, and business details
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
      case 'analytics': return renderAnalyticsTab();
      case 'profile': return <ProfileSettings />;
      default: return renderHomeTab();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-aktina-primary to-aktina-forest bg-clip-text text-transparent">
          Supplier Dashboard
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

export default SupplierDashboard;
