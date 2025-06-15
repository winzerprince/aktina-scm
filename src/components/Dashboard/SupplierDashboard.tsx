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
import { Home, Package, TrendingUp, BarChart3, Settings, Truck, Clock, CheckCircle, MessageSquare } from 'lucide-react';

const SupplierDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'orders', label: 'Orders', badge: 12, icon: <Package className="w-4 h-4" /> },
    { id: 'logistics', label: 'Logistics', icon: <Truck className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'forecasting', label: 'Demand Forecasting', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'communication', label: 'Communication', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  const supplyData = [
    { name: 'Jan', orders: 120, fulfillment: 95, shipping: 88 },
    { name: 'Feb', orders: 135, fulfillment: 92, shipping: 90 },
    { name: 'Mar', orders: 148, fulfillment: 98, shipping: 94 },
    { name: 'Apr', orders: 155, fulfillment: 96, shipping: 92 },
    { name: 'May', orders: 162, fulfillment: 99, shipping: 95 },
    { name: 'Jun', orders: 170, fulfillment: 97, shipping: 93 }
  ];

  const orders = [
    { id: 'ORD-001', products: 'Smartphones', quantity: 1500, value: 750000, status: 'confirmed', priority: 'High', delivery: '2024-07-15' },
    { id: 'ORD-002', products: 'Laptops', quantity: 800, value: 1200000, status: 'processing', priority: 'Medium', delivery: '2024-07-20' },
    { id: 'ORD-003', products: 'Audio Equipment', quantity: 2000, value: 600000, status: 'pending', priority: 'High', delivery: '2024-07-25' },
    { id: 'ORD-004', products: 'Gaming Devices', quantity: 600, value: 900000, status: 'shipped', priority: 'Low', delivery: '2024-07-10' }
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
      {/* Supply Chain Overview */}
      <Card className="bg-gradient-to-r from-aktina-green/10 to-aktina-blue/10 border-0">
        <CardHeader>
          <CardTitle className="text-xl">Supply Chain Overview</CardTitle>
          <CardDescription>Real-time supply chain status and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold text-aktina-green">4</div>
              <div className="text-sm text-muted-foreground">Active Contracts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-aktina-primary">170</div>
              <div className="text-sm text-muted-foreground">Orders This Month</div>
              <Progress value={92} className="mt-2" />
            </div>
            <div>
              <div className="text-2xl font-bold text-aktina-blue">97%</div>
              <div className="text-sm text-muted-foreground">Fulfillment Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-aktina-amber">93%</div>
              <div className="text-sm text-muted-foreground">On-Time Delivery</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Order Volume"
          value={170}
          icon={<Package className="w-4 h-4" />}
          trend="up"
          trendValue="12% vs last month"
          delay={0}
        />
        <MetricCard
          title="Fulfillment Rate"
          value={97}
          suffix="%"
          icon={<CheckCircle className="w-4 h-4" />}
          trend="up"
          trendValue="Above target"
          delay={100}
        />
        <MetricCard
          title="On-Time Delivery"
          value={93}
          suffix="%"
          icon={<Clock className="w-4 h-4" />}
          trend="down"
          trendValue="Slight decrease"
          delay={200}
        />
        <MetricCard
          title="Contract Value"
          value={2850000}
          prefix="$"
          icon={<TrendingUp className="w-4 h-4" />}
          trend="up"
          trendValue="Bulk discounts"
          delay={300}
        />
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest orders and status updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.slice(0, 4).map((order, index) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="font-semibold">{order.id}</div>
                    <div className="text-sm text-muted-foreground">{order.products}</div>
                  </div>
                  <div>
                    <div className="font-medium">Qty: {order.quantity}</div>
                    <div className="text-sm text-muted-foreground">${order.value.toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-semibold">{order.delivery}</div>
                    <div className="flex space-x-1">
                      <Badge className={getPriorityColor(order.priority)}>
                        {order.priority}
                      </Badge>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fulfillment Performance */}
      <ChartCard
        title="Fulfillment Performance"
        description="Monthly order fulfillment and shipping trends"
        data={supplyData}
        type="line"
        dataKey="fulfillment"
        xAxisKey="name"
        color="hsl(var(--aktina-green))"
      />
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>Manage and track orders from Aktina</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnalyticsCard
              title="Total Orders"
              value={170}
              trend="up"
              trendValue="12% increase"
            />
            <AnalyticsCard
              title="Fulfillment Rate"
              value={97}
              unit="%"
              trend="up"
              trendValue="Above target"
            />
            <AnalyticsCard
              title="On-Time Delivery"
              value={93}
              unit="%"
              trend="down"
              trendValue="Slight decrease"
            />
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Order Details</h3>
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold">{order.id}</div>
                      <div className="text-sm text-muted-foreground">{order.products}</div>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Quantity</div>
                      <div className="font-medium">{order.quantity}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Value</div>
                      <div className="font-medium">${order.value.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Delivery Date</div>
                      <div className="font-medium">{order.delivery}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLogisticsTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Logistics Management</CardTitle>
          <CardDescription>Track shipments and manage logistics partners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnalyticsCard
              title="Shipments Today"
              value={28}
              trend="up"
              trendValue="8 new shipments"
            />
            <AnalyticsCard
              title="Average Transit Time"
              value={3.2}
              unit=" days"
              trend="down"
              trendValue="Faster delivery"
            />
            <AnalyticsCard
              title="Delivery Success Rate"
              value={98}
              unit="%"
              trend="up"
              trendValue="High reliability"
            />
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Shipment Tracking</h3>
            <div className="space-y-4">
              {[
                { id: 'SHP-001', products: 'Smartphones', status: 'in-transit', location: 'Chicago', eta: '2024-07-18' },
                { id: 'SHP-002', products: 'Laptops', status: 'delivered', location: 'New York', eta: '2024-07-15' },
                { id: 'SHP-003', products: 'Audio Equipment', status: 'in-transit', location: 'Los Angeles', eta: '2024-07-22' }
              ].map((shipment) => (
                <Card key={shipment.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold">{shipment.id}</div>
                      <div className="text-sm text-muted-foreground">{shipment.products}</div>
                    </div>
                    <Badge className={getStatusColor(shipment.status)}>
                      {shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Current Location</div>
                      <div className="font-medium">{shipment.location}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">ETA</div>
                      <div className="font-medium">{shipment.eta}</div>
                    </div>
                  </div>
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
          title="Order Fulfillment"
          value={97}
          unit="%"
          trend="up"
          trendValue="Above target"
        />
        <AnalyticsCard
          title="Delivery Performance"
          value={93}
          unit="%"
          trend="down"
          trendValue="Slight decrease"
        />
        <AnalyticsCard
          title="Customer Satisfaction"
          value={4.8}
          unit="/5"
          trend="up"
          trendValue="Excellent feedback"
        />
      </div>

      <ChartCard
        title="Supply Chain Performance"
        description="Monthly order fulfillment and shipping trends"
        data={supplyData}
        type="line"
        dataKey="fulfillment"
        xAxisKey="name"
        color="hsl(var(--aktina-green))"
      />

      <Card>
        <CardHeader>
          <CardTitle>Detailed Analytics</CardTitle>
          <CardDescription>Comprehensive supply chain analytics and insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Fulfillment Metrics</h4>
              <div className="space-y-3">
                {[
                  { metric: 'Order Volume', value: 170, change: '+12%' },
                  { metric: 'Fulfillment Rate', value: 97, change: '+2%' },
                  { metric: 'Shipping Accuracy', value: 99, change: '0%' },
                  { metric: 'Delivery Time', value: 3.2, change: '-0.5 days' }
                ].map((item) => (
                  <div key={item.metric} className="flex items-center justify-between">
                    <span className="text-sm">{item.metric}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{item.value}{typeof item.value === 'number' ? (item.metric === 'Delivery Time' ? ' days' : (item.metric === 'Order Volume' ? '' : '%')) : ''}</span>
                      <Badge variant="secondary" className="text-xs">
                        {item.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Supplier Performance</h4>
              <div className="space-y-3">
                {[
                  { supplier: 'Electronics Inc', fulfillment: 98, delivery: 95 },
                  { supplier: 'Global Tech', fulfillment: 95, delivery: 92 },
                  { supplier: 'Audio Systems', fulfillment: 99, delivery: 97 }
                ].map((supplier) => (
                  <div key={supplier.supplier} className="flex items-center justify-between">
                    <span className="text-sm">{supplier.supplier}</span>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-aktina-primary text-white text-xs">
                        Fulfillment: {supplier.fulfillment}%
                      </Badge>
                      <Badge className="bg-aktina-blue text-white text-xs">
                        Delivery: {supplier.delivery}%
                      </Badge>
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

  const renderForecastingTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Demand Forecasting</CardTitle>
          <CardDescription>Predictive analytics for supply chain planning</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Upcoming Demand</h3>
              <div className="space-y-4">
                {[
                  { product: 'Smartphones', demand: 'High', change: '+15%' },
                  { product: 'Laptops', demand: 'Moderate', change: '+8%' },
                  { product: 'Audio Equipment', demand: 'Stable', change: '+2%' }
                ].map((forecast) => (
                  <Card key={forecast.product} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{forecast.product}</div>
                      <Badge className="bg-aktina-primary text-white">{forecast.demand}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Expected Change: {forecast.change}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Inventory Levels</h3>
              <div className="space-y-4">
                {[
                  { product: 'Smartphones', level: 'Low', days: 15 },
                  { product: 'Laptops', level: 'Optimal', days: 30 },
                  { product: 'Audio Equipment', level: 'High', days: 45 }
                ].map((inventory) => (
                  <Card key={inventory.product} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{inventory.product}</div>
                      <Badge className={
                        inventory.level === 'Low' ? 'bg-red-100 text-red-800' :
                        inventory.level === 'Optimal' ? 'bg-green-100 text-green-800' :
                        'bg-amber-100 text-amber-800'
                      }>
                        {inventory.level}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Days Remaining: {inventory.days}
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
          <CardDescription>Chat with Aktina procurement team, logistics partners, and get AI assistance for supply operations</CardDescription>
        </CardHeader>
        <CardContent>
          <ChatInterface userRole="Supplier" />
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home': return renderHomeTab();
      case 'orders': return renderOrdersTab();
      case 'logistics': return renderLogisticsTab();
      case 'analytics': return renderAnalyticsTab();
      case 'forecasting': return renderForecastingTab();
      case 'communication': return renderCommunicationTab();
      case 'profile': return <ProfileSettings />;
      default: return renderHomeTab();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-aktina-green to-aktina-blue bg-clip-text text-transparent">
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
