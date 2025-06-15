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
import { Home, Settings, BarChart3, MessageSquare, Package, ListChecks } from 'lucide-react';

const ordersMock = [
  { id: 1, vendor: 'Acme Corp', item: 'Steel rods', qty: 500, status: 'pending' },
  { id: 2, vendor: 'Beta Supplies', item: 'Plastic shells', qty: 200, status: 'pending' }
];

const inventoryMock = [
  { id: 1, product: 'Widget A', stock: 1200, reorder: false },
  { id: 2, product: 'Widget B', stock: 320, reorder: true }
];

const assemblyLinesMock = [
  { id: 'AL-1', name: 'Line 1', status: 'Active', output: 400 },
  { id: 'AL-2', name: 'Line 2', status: 'Paused', output: 0 }
];

const ProductionDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [orders, setOrders] = useState(ordersMock);
  const [inventory, setInventory] = useState(inventoryMock);

  const handleOrderAction = (orderId: number, status: 'accepted' | 'denied') => {
    setOrders(prev =>
      prev.map(order => order.id === orderId ? { ...order, status } : order)
    );
  };

  const handleRestock = (itemId: number) => {
    setInventory(prev =>
      prev.map(item => item.id === itemId ? { ...item, reorder: false, stock: item.stock + 500 } : item)
    );
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'orders', label: 'Orders', icon: <Package className="w-4 h-4" /> },
    { id: 'production', label: 'Production', icon: <ListChecks className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'communication', label: 'Communication', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile Settings', icon: <Settings className="w-4 h-4" /> }
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
    </div>
  );

  // --- Orders Tab
  const renderOrdersTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card className="rounded-3xl bg-white/70 backdrop-blur-lg border-0 shadow-2xl animate-scale-in glass-effect overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl">Vendor Orders</CardTitle>
          <CardDescription>Order requests from vendors - Accept or Deny</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">No pending orders.</div>
            ) : (
              orders.map(order => (
                <div
                  key={order.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-white/60 rounded-xl mb-2 shadow-inner transition
                  border border-transparent hover:border-blue-300 hover:scale-[1.01] duration-200"
                  style={{backdropFilter: 'blur(8px)'}}
                >
                  <div>
                    <div className="font-semibold">{order.vendor}</div>
                    <div className="text-sm text-muted-foreground">{order.item} &middot; Qty {order.qty}</div>
                  </div>
                  <div className="flex gap-3 mt-3 md:mt-0">
                    {order.status === 'pending' ? (
                      <>
                        <Button variant="secondary" size="sm" onClick={() => handleOrderAction(order.id, 'accepted')}>
                          Accept
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleOrderAction(order.id, 'denied')}>
                          Deny
                        </Button>
                      </>
                    ) : (
                      <Badge className={order.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // --- Production Tab
  const renderProductionTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card className="rounded-3xl bg-white/70 backdrop-blur-lg border-0 shadow-2xl animate-scale-in glass-effect overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl">Inventory</CardTitle>
          <CardDescription>Current inventory and restocking actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {inventory.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-white/80 rounded-xl shadow-inner border border-transparent hover:border-aktina-blue/40 hover:scale-[1.01] transition duration-200"
              >
                <span>{item.product}</span>
                <span className="font-semibold">{item.stock} units</span>
                {item.reorder ? (
                  <Button size="sm" variant="outline" onClick={() => handleRestock(item.id)}>
                    Restock
                  </Button>
                ) : (
                  <Badge className="bg-green-100 text-green-800">OK</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl bg-white/70 backdrop-blur-lg border-0 shadow-2xl animate-scale-in glass-effect overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl">Assembly Lines</CardTitle>
          <CardDescription>Status and output</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {assemblyLinesMock.map(line => (
              <div
                key={line.id}
                className={`flex items-center justify-between p-3 rounded-xl transition duration-200 shadow-inner
                  border border-transparent hover:border-aktina-blue/40 hover:scale-[1.01]
                  ${line.status === 'Active' ? 'bg-green-50/70' : 'bg-amber-100/50'}`}
                >
                <div>
                  <span className="font-semibold">{line.name}</span>
                  <span className="ml-2 text-xs opacity-60">({line.id})</span>
                </div>
                <div>
                  <Badge className={line.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-amber-200 text-amber-800'}>
                    {line.status}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">{line.output} units</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // --- Analytics, Communication, Profile (unchanged)
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
      case 'orders': return renderOrdersTab();
      case 'production': return renderProductionTab();
      case 'analytics': return renderAnalyticsTab();
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
