import React, { useState } from 'react';
import TabNavigation from '../Navigation/TabNavigation';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';
import AnalyticsCard from './AnalyticsCard';
import ProfileSettings from '../Profile/ProfileSettings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Home, ShoppingCart, Send, Users, BarChart3, MessageSquare, Settings, Package, TrendingUp, Building } from 'lucide-react';

const WholesalerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'incoming', label: 'Incoming Orders', badge: 15, icon: <ShoppingCart className="w-4 h-4" /> },
    { id: 'outgoing', label: 'Outgoing Orders', badge: 8, icon: <Send className="w-4 h-4" /> },
    { id: 'retailers', label: 'Retailers', icon: <Users className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'communication', label: 'Communication', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  const distributionData = [
    { name: 'Jan', orders: 245, revenue: 980000, retailers: 45 },
    { name: 'Feb', orders: 278, revenue: 1120000, retailers: 48 },
    { name: 'Mar', orders: 267, revenue: 1080000, retailers: 52 },
    { name: 'Apr', orders: 312, revenue: 1250000, retailers: 55 },
    { name: 'May', orders: 298, revenue: 1190000, retailers: 58 },
    { name: 'Jun', orders: 334, revenue: 1340000, retailers: 62 }
  ];

  const incomingOrders = [
    { id: 'RET-001', retailer: 'TechMart Electronics', products: 'Smartphones, Tablets', quantity: 250, value: 125000, priority: 'High', status: 'pending' },
    { id: 'RET-002', retailer: 'Digital World Store', products: 'Laptops, Accessories', quantity: 180, value: 95000, priority: 'Medium', status: 'processing' },
    { id: 'RET-003', retailer: 'Gadget Paradise', products: 'Wearables, Audio', quantity: 320, value: 78000, priority: 'High', status: 'pending' },
    { id: 'RET-004', retailer: 'Electronics Plus', products: 'Gaming, VR', quantity: 150, value: 165000, priority: 'Low', status: 'confirmed' }
  ];

  const topRetailers = [
    { name: 'TechMart Electronics', orders: 45, revenue: 890000, growth: 23, rating: 4.8 },
    { name: 'Digital World Store', orders: 38, revenue: 720000, growth: 18, rating: 4.6 },
    { name: 'Gadget Paradise', orders: 42, revenue: 810000, growth: 31, rating: 4.9 },
    { name: 'Electronics Plus', orders: 35, revenue: 650000, growth: 15, rating: 4.5 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
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
      {/* Distribution Overview */}
      <Card className="bg-gradient-to-r from-aktina-amber/10 to-aktina-primary/10 border-0">
        <CardHeader>
          <CardTitle className="text-xl">Distribution Overview</CardTitle>
          <CardDescription>Real-time distribution metrics and business performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold text-aktina-amber">62</div>
              <div className="text-sm text-muted-foreground">Active Retailers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-aktina-primary">334</div>
              <div className="text-sm text-muted-foreground">Orders This Month</div>
              <Progress value={89} className="mt-2" />
            </div>
            <div>
              <div className="text-2xl font-bold text-aktina-blue">$1.34M</div>
              <div className="text-sm text-muted-foreground">Monthly Revenue</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-aktina-forest">96%</div>
              <div className="text-sm text-muted-foreground">Fulfillment Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Monthly Revenue"
          value={1340000}
          prefix="$"
          icon={<TrendingUp className="w-4 h-4" />}
          trend="up"
          trendValue="12% vs last month"
          delay={0}
        />
        <MetricCard
          title="Order Volume"
          value={334}
          icon={<Package className="w-4 h-4" />}
          trend="up"
          trendValue="23 orders today"
          delay={100}
        />
        <MetricCard
          title="Retailer Growth"
          value={8}
          suffix="% MoM"
          icon={<Building className="w-4 h-4" />}
          trend="up"
          trendValue="4 new partners"
          delay={200}
        />
        <MetricCard
          title="Avg Order Value"
          value={4012}
          prefix="$"
          icon={<ShoppingCart className="w-4 h-4" />}
          trend="up"
          trendValue="5% increase"
          delay={300}
        />
      </div>

      {/* Recent Incoming Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Incoming Orders</CardTitle>
          <CardDescription>Latest orders from retail partners requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {incomingOrders.slice(0, 4).map((order, index) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="font-semibold">{order.id}</div>
                    <div className="text-sm text-muted-foreground">{order.retailer}</div>
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

      {/* Top Retailers Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Retailers</CardTitle>
          <CardDescription>Revenue and performance metrics for key retail partners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topRetailers.map((retailer, index) => (
              <Card key={retailer.name} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold">{retailer.name}</div>
                    <div className="text-sm text-muted-foreground">{retailer.orders} orders • ${retailer.revenue.toLocaleString()}</div>
                  </div>
                  <Badge className="bg-aktina-primary text-white">
                    {retailer.rating} ⭐
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Growth: {retailer.growth}%</span>
                  <Progress value={retailer.growth} className="w-20 h-2" />
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Trend Chart */}
      <ChartCard
        title="Business Performance Trends"
        description="Monthly revenue, orders, and retailer growth trends"
        data={distributionData}
        type="line"
        dataKey="revenue"
        xAxisKey="name"
        color="hsl(var(--aktina-amber))"
      />
    </div>
  );

  const renderIncomingTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Incoming Orders Management</CardTitle>
          <CardDescription>Process and manage orders from retail partners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <AnalyticsCard
              title="Pending Orders"
              value={15}
              trend="down"
              trendValue="3 processed today"
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
              value={463000}
              prefix="$"
              trend="up"
              trendValue="High value orders"
            />
          </div>
          
          <div className="space-y-4">
            {incomingOrders.map((order, index) => (
              <Card key={order.id} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-semibold text-lg">{order.id} - {order.retailer}</div>
                    <div className="text-sm text-muted-foreground">{order.products}</div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className={getPriorityColor(order.priority)}>
                      {order.priority} Priority
                    </Badge>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
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
                <div className="flex space-x-2">
                  {order.status === 'pending' && (
                    <>
                      <Button size="sm" className="bg-aktina-primary hover:bg-aktina-primary/90">
                        Accept Order
                      </Button>
                      <Button size="sm" variant="outline">
                        Request Changes
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Contact Retailer
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderOutgoingTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Outgoing Orders to Aktina</CardTitle>
          <CardDescription>Consolidated orders and procurement management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <AnalyticsCard
              title="Active Orders"
              value={8}
              trend="up"
              trendValue="2 new this week"
            />
            <AnalyticsCard
              title="Lead Time"
              value={12}
              unit=" days"
              trend="down"
              trendValue="2 days faster"
            />
            <AnalyticsCard
              title="Order Value"
              value={2850000}
              prefix="$"
              trend="up"
              trendValue="Bulk discount applied"
            />
          </div>
          
          <div className="space-y-4">
            {[
              { id: 'AKT-W001', products: 'Smartphones Bundle', quantity: 1500, value: 750000, status: 'confirmed', delivery: '2024-01-20' },
              { id: 'AKT-W002', products: 'Laptop Collection', quantity: 800, value: 1200000, status: 'processing', delivery: '2024-01-25' },
              { id: 'AKT-W003', products: 'Audio Equipment', quantity: 2000, value: 600000, status: 'pending', delivery: '2024-01-30' },
              { id: 'AKT-W004', products: 'Gaming Devices', quantity: 600, value: 900000, status: 'shipped', delivery: '2024-01-18' }
            ].map((order) => (
              <Card key={order.id} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-semibold text-lg">{order.id} - {order.products}</div>
                    <div className="text-sm text-muted-foreground">Consolidated order from {Math.floor(Math.random() * 15 + 5)} retailers</div>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Quantity</div>
                    <div className="font-semibold">{order.quantity} units</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Total Value</div>
                    <div className="font-semibold">${order.value.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Expected Delivery</div>
                    <div className="font-semibold">{order.delivery}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Status</div>
                    <div className="font-semibold">{order.status}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRetailersTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Retailer Management</CardTitle>
          <CardDescription>Manage relationships with retail partners and onboard new retailers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <AnalyticsCard
              title="Total Retailers"
              value={62}
              trend="up"
              trendValue="4 new this month"
            />
            <AnalyticsCard
              title="Active Partners"
              value={58}
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
            {topRetailers.concat([
              { name: 'Tech Solutions Hub', orders: 28, revenue: 520000, growth: 19, rating: 4.4 },
              { name: 'Future Electronics', orders: 31, revenue: 580000, growth: 27, rating: 4.7 }
            ]).map((retailer) => (
              <Card key={retailer.name} className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-aktina-amber/10 rounded-full flex items-center justify-center">
                    <Building className="w-6 h-6 text-aktina-amber" />
                  </div>
                  <div>
                    <div className="font-semibold">{retailer.name}</div>
                    <div className="text-sm text-muted-foreground">{retailer.rating} ⭐ Rating</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Monthly Orders:</span>
                    <span className="font-medium">{retailer.orders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Revenue:</span>
                    <span className="font-medium">${retailer.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Growth:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{retailer.growth}%</span>
                      <Progress value={retailer.growth} className="w-16 h-2" />
                    </div>
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
        title="Distribution Performance Analytics"
        description="Comprehensive business metrics and trend analysis"
        data={distributionData}
        type="bar"
        dataKey="orders"
        xAxisKey="name"
        color="hsl(var(--aktina-amber))"
      />

      <Card>
        <CardHeader>
          <CardTitle>Detailed Business Analytics</CardTitle>
          <CardDescription>In-depth analysis of distribution operations and market performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Territory Performance</h3>
              <ChartCard
                title="Sales by Region"
                data={[
                  { name: 'North', value: 35 },
                  { name: 'South', value: 28 },
                  { name: 'East', value: 22 },
                  { name: 'West', value: 15 }
                ]}
                type="pie"
                dataKey="value"
                className="h-64"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product Category Performance</h3>
              <div className="space-y-3">
                {[
                  { category: 'Smartphones', revenue: 425000, growth: 23 },
                  { category: 'Laptops', revenue: 380000, growth: 18 },
                  { category: 'Audio Equipment', revenue: 295000, growth: 31 },
                  { category: 'Gaming Devices', revenue: 240000, growth: 15 }
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

  const renderCommunicationTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Communication Center</CardTitle>
          <CardDescription>Manage communications with Aktina and retail partners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Aktina Communications</h3>
              <div className="space-y-3">
                {[
                  { subject: 'Q4 Volume Discount Available', from: 'Aktina Sales', date: '2 hours ago', priority: 'High' },
                  { subject: 'New Product Line Launch', from: 'Aktina Marketing', date: '1 day ago', priority: 'Medium' },
                  { subject: 'Delivery Schedule Update', from: 'Aktina Logistics', date: '2 days ago', priority: 'Low' },
                  { subject: 'Payment Terms Adjustment', from: 'Aktina Finance', date: '3 days ago', priority: 'Medium' }
                ].map((comm, index) => (
                  <Card key={index} className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{comm.subject}</div>
                      <Badge className={getPriorityColor(comm.priority)}>
                        {comm.priority}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{comm.from}</span>
                      <span>{comm.date}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Retailer Support</h3>
              <div className="space-y-3">
                {[
                  { retailer: 'TechMart Electronics', issue: 'Delivery Inquiry', status: 'Open', time: '30 min ago' },
                  { retailer: 'Digital World Store', issue: 'Product Specification', status: 'Resolved', time: '2 hours ago' },
                  { retailer: 'Gadget Paradise', issue: 'Payment Question', status: 'In Progress', time: '4 hours ago' },
                  { retailer: 'Electronics Plus', issue: 'Bulk Order Request', status: 'Open', time: '6 hours ago' }
                ].map((ticket, index) => (
                  <Card key={index} className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{ticket.issue}</div>
                      <Badge className={getStatusColor(ticket.status.toLowerCase())}>
                        {ticket.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{ticket.retailer}</span>
                      <span>{ticket.time}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <Button className="bg-aktina-primary hover:bg-aktina-primary/90">
              New Message to Aktina
            </Button>
            <Button variant="outline">
              Broadcast to Retailers
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home': return renderHomeTab();
      case 'incoming': return renderIncomingTab();
      case 'outgoing': return renderOutgoingTab();
      case 'retailers': return renderRetailersTab();
      case 'analytics': return renderAnalyticsTab();
      case 'communication': return renderCommunicationTab();
      case 'profile': return <ProfileSettings />;
      default: return renderHomeTab();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-aktina-amber to-aktina-primary bg-clip-text text-transparent">
          Wholesaler Dashboard
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

export default WholesalerDashboard;
