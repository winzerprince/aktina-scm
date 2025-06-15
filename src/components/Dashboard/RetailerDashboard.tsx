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
import { Home, ShoppingCart, Users, BarChart3, TrendingUp, Settings, Package, Star, MessageSquare } from 'lucide-react';
import useOrders from '../../hooks/useOrders';

const RetailerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  // Hook for dynamic orders
  const {
    orders,
    acceptOrder,
    rejectOrder,
    undoOrder,
    orderCount,
    pendingCount
  } = useOrders();

  const tabs = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    {
      id: 'orders',
      label: 'Orders',
      badge: pendingCount > 0 ? pendingCount : undefined,
      icon: <ShoppingCart className="w-4 h-4" />,
    },
    { id: 'customers', label: 'Customers', icon: <Users className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'insights', label: 'Market Insights', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'communication', label: 'Communication', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  const salesData = [
    { name: 'Jan', sales: 425, customers: 120, returns: 15 },
    { name: 'Feb', sales: 480, customers: 135, returns: 10 },
    { name: 'Mar', sales: 510, customers: 145, returns: 12 },
    { name: 'Apr', sales: 550, customers: 155, returns: 8 },
    { name: 'May', sales: 580, customers: 165, returns: 14 },
    { name: 'Jun', sales: 620, customers: 175, returns: 9 }
  ];

  const customerData = [
    { name: 'New', value: 120 },
    { name: 'Returning', value: 480 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-amber-100 text-amber-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderHomeTab = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Sales Overview */}
      <Card className="bg-gradient-to-r from-aktina-blue/10 to-aktina-purple/10 border-0">
        <CardHeader>
          <CardTitle className="text-xl">Sales Overview</CardTitle>
          <CardDescription>Real-time sales metrics and customer engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold text-aktina-blue">175</div>
              <div className="text-sm text-muted-foreground">New Customers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-aktina-purple">620</div>
              <div className="text-sm text-muted-foreground">Orders This Month</div>
              <Progress value={89} className="mt-2" />
            </div>
            <div>
              <div className="text-2xl font-bold text-aktina-amber">$245K</div>
              <div className="text-sm text-muted-foreground">Monthly Revenue</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-aktina-forest">96%</div>
              <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Monthly Revenue"
          value={245000}
          prefix="$"
          icon={<TrendingUp className="w-4 h-4" />}
          trend="up"
          trendValue="12% vs last month"
          delay={0}
        />
        <MetricCard
          title="Order Volume"
          value={620}
          icon={<Package className="w-4 h-4" />}
          trend="up"
          trendValue="23 orders today"
          delay={100}
        />
        <MetricCard
          title="Customer Growth"
          value={175}
          icon={<Users className="w-4 h-4" />}
          trend="up"
          trendValue="4 new partners"
          delay={200}
        />
        <MetricCard
          title="Avg Order Value"
          value={395}
          prefix="$"
          icon={<ShoppingCart className="w-4 h-4" />}
          trend="up"
          trendValue="5% increase"
          delay={300}
        />
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest orders from customers requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.slice(0, 4).map((order, index) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="font-semibold">{order.id}</div>
                    <div className="text-sm text-muted-foreground">{order.customer}</div>
                  </div>
                  <div>
                    <div className="font-medium">{order.products}</div>
                    <div className="text-sm text-muted-foreground">Qty: {order.quantity}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-semibold">${order.value.toLocaleString()}</div>
                    <div className="flex space-x-1">
                      <Badge className={getPriorityColor(order.priority)}>
                        {order.priority}
                      </Badge>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Process</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Customers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Customers</CardTitle>
          <CardDescription>Revenue and engagement metrics for key customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customers.map((customer, index) => (
              <Card key={customer.name} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">{customer.orders} orders • ${customer.revenue.toLocaleString()}</div>
                  </div>
                  <Badge className="bg-aktina-primary text-white">
                    {customer.rating} ⭐
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Location: {customer.location}</span>
                  <Progress value={customer.rating * 20} className="w-20 h-2" />
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sales Trend Chart */}
      <ChartCard
        title="Sales Performance Trends"
        description="Monthly sales, orders, and customer growth trends"
        data={salesData}
        type="line"
        dataKey="sales"
        xAxisKey="name"
        color="hsl(var(--aktina-blue))"
      />
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>Manage and track customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <AnalyticsCard
              title="Pending Orders"
              value={pendingCount}
              trend={pendingCount < 5 ? "down" : "up"}
              trendValue={pendingCount === 1 ? "1 pending" : `${pendingCount} pending`}
            />
            <AnalyticsCard
              title="Processing Time"
              value={2.4}
              unit=" hours"
              trend="down"
              trendValue="15% faster"
            />
            <AnalyticsCard
              title="Total Value"
              value={orders.reduce((sum, o) => sum + o.value, 0)}
              prefix="$"
              trend="up"
              trendValue="High value orders"
            />
          </div>
          
          <div className="space-y-4">
            {orders.map((order, index) => (
              <Card key={order.id} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-semibold text-lg">
                      {order.id} - {order.customer}
                    </div>
                    <div className="text-sm text-muted-foreground">{order.products}</div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className={getPriorityColor(order.priority)}>
                      {order.priority} Priority
                    </Badge>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    {order.previousStatus &&
                      (order.status === "accepted" || order.status === "rejected") && (
                        <Badge className="bg-aktina-blue text-white">
                          Can Undo
                        </Badge>
                      )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Quantity</div>
                    <div className="font-semibold">{order.quantity} units</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Order Value</div>
                    <div className="font-semibold">${order.value.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Expected Delivery</div>
                    <div className="font-semibold">5-7 business days</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {order.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        className="bg-aktina-primary hover:bg-aktina-primary/90"
                        onClick={() => acceptOrder(order.id)}
                      >
                        Accept Order
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => rejectOrder(order.id)}
                      >
                        Reject Order
                      </Button>
                    </>
                  )}
                  {(order.status === 'accepted' || order.status === 'rejected') && order.previousStatus && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => undoOrder(order.id)}
                    >
                      Undo
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Contact Customer
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCustomersTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Customer Management</CardTitle>
          <CardDescription>Manage customer relationships and profiles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <AnalyticsCard
              title="Total Customers"
              value={620}
              trend="up"
              trendValue="4 new this month"
            />
            <AnalyticsCard
              title="Active Customers"
              value={580}
              trend="up"
              trendValue="94% active rate"
            />
            <AnalyticsCard
              title="Avg Rating"
              value={4.7}
              unit="/5"
              trend="up"
              trendValue="Excellent service"
            />
            <AnalyticsCard
              title="Growth Rate"
              value={23}
              unit="%"
              trend="up"
              trendValue="Year over year"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customers.concat([
              { id: 'CUS-005', name: 'David Lee', email: 'john.123@example.com', location: 'San Francisco', orders: 10, revenue: 11200, rating: 4.5 },
              { id: 'CUS-006', name: 'Karen Davis', email: 'john.123@example.com', location: 'Seattle', orders: 7, revenue: 8400, rating: 4.8 }
            ]).map((customer) => (
              <Card key={customer.name} className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-aktina-blue/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-aktina-blue" />
                  </div>
                  <div>
                    <div className="font-semibold">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">{customer.rating} ⭐ Rating</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Monthly Orders:</span>
                    <span className="font-medium">{customer.orders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Revenue:</span>
                    <span className="font-medium">${customer.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Location:</span>
                    <span className="font-medium">{customer.location}</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  <Button size="sm" variant="outline" className="flex-1">
                    Contact
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    View Details
                  </Button>
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
          title="Revenue Growth"
          value={28}
          unit="%"
          trend="up"
          trendValue="vs last quarter"
        />
        <AnalyticsCard
          title="Market Penetration"
          value={15}
          unit="%"
          trend="up"
          trendValue="Regional leader"
        />
        <AnalyticsCard
          title="Customer Retention"
          value={94}
          unit="%"
          trend="up"
          trendValue="Industry best"
        />
      </div>

      <ChartCard
        title="Sales Performance Analytics"
        description="Comprehensive business metrics and trend analysis"
        data={salesData}
        type="bar"
        dataKey="sales"
        xAxisKey="name"
        color="hsl(var(--aktina-blue))"
      />

      <Card>
        <CardHeader>
          <CardTitle>Detailed Business Analytics</CardTitle>
          <CardDescription>In-depth analysis of sales operations and market performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Demographics</h3>
              <ChartCard
                title="Customer Locations"
                data={[
                  { name: 'New York', value: 35 },
                  { name: 'Los Angeles', value: 28 },
                  { name: 'Chicago', value: 22 },
                  { name: 'Houston', value: 15 }
                ]}
                type="pie"
                dataKey="value"
                className="h-64"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Sales by Product Category</h3>
              <div className="space-y-3">
                {[
                  { category: 'Laptops', revenue: 425000, growth: 23 },
                  { category: 'Desktops', revenue: 380000, growth: 18 },
                  { category: 'Tablets', revenue: 295000, growth: 31 },
                  { category: 'Accessories', revenue: 240000, growth: 15 }
                ].map((cat) => (
                  <div key={cat.category} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{cat.category}</div>
                      <div className="text-sm text-muted-foreground">${cat.revenue.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-aktina-primary text-white">+{cat.growth}%</Badge>
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

  const renderInsightsTab = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsCard
          title="Market Share"
          value={18}
          unit="%"
          trend="up"
          trendValue="vs last quarter"
        />
        <AnalyticsCard
          title="Brand Awareness"
          value={65}
          unit="%"
          trend="up"
          trendValue="Regional leader"
        />
        <AnalyticsCard
          title="Customer Loyalty"
          value={82}
          unit="%"
          trend="up"
          trendValue="Industry best"
        />
      </div>

      <ChartCard
        title="Customer Acquisition Cost"
        description="Cost analysis for acquiring new customers"
        data={salesData}
        type="line"
        dataKey="customers"
        xAxisKey="name"
        color="hsl(var(--aktina-amber))"
      />

      <Card>
        <CardHeader>
          <CardTitle>Market Trend Analysis</CardTitle>
          <CardDescription>In-depth analysis of market trends and customer behavior</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Segmentation</h3>
              <ChartCard
                title="Customer Segments"
                data={[
                  { name: 'Loyal', value: 45 },
                  { name: 'Potential', value: 28 },
                  { name: 'New', value: 22 },
                  { name: 'Churn', value: 15 }
                ]}
                type="pie"
                dataKey="value"
                className="h-64"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product Performance</h3>
              <div className="space-y-3">
                {[
                  { product: 'Laptop', revenue: 425000, growth: 23 },
                  { product: 'Desktop', revenue: 380000, growth: 18 },
                  { product: 'Tablet', revenue: 295000, growth: 31 },
                  { product: 'Accessory', revenue: 240000, growth: 15 }
                ].map((item) => (
                  <div key={item.product} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{item.product}</div>
                      <div className="text-sm text-muted-foreground">${item.revenue.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-aktina-primary text-white">+{item.growth}%</Badge>
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

  const renderCommunicationTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Communication Center</CardTitle>
          <CardDescription>Chat with suppliers, wholesalers, customers, and get AI assistance for retail operations</CardDescription>
        </CardHeader>
        <CardContent>
          <ChatInterface userRole="Retailer" />
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home': return renderHomeTab();
      case 'orders': return renderOrdersTab();
      case 'customers': return renderCustomersTab();
      case 'analytics': return renderAnalyticsTab();
      case 'insights': return renderInsightsTab();
      case 'communication': return renderCommunicationTab();
      case 'profile': return <ProfileSettings />;
      default: return renderHomeTab();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-aktina-blue to-aktina-purple bg-clip-text text-transparent">
          Retailer Dashboard
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

export default RetailerDashboard;
