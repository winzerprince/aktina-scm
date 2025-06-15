
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
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Home, ShoppingCart, Users, BarChart3, TrendingUp, Settings, Package, Star, MessageSquare, Search, Filter, Eye, Phone, Mail, MapPin } from 'lucide-react';
import useOrders from '../../hooks/useOrders';
import useCustomers from '../../hooks/useCustomers';

const RetailerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const { toast } = useToast();

  // Hook for dynamic orders
  const {
    orders,
    allOrders,
    acceptOrder,
    rejectOrder,
    undoOrder,
    startProcessing,
    shipOrder,
    updatePriority,
    searchTerm: orderSearchTerm,
    setSearchTerm: setOrderSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    orderCount,
    pendingCount,
    processingCount,
    shippedCount,
    deliveredCount,
    acceptedCount,
    rejectedCount,
    totalValue,
    highPriorityCount
  } = useOrders();

  // Hook for dynamic customers
  const {
    customers,
    searchTerm: customerSearchTerm,
    setSearchTerm: setCustomerSearchTerm,
    statusFilter: customerStatusFilter,
    setStatusFilter: setCustomerStatusFilter,
    updateCustomerStatus,
    updateCustomerRating,
    totalCustomers,
    activeCustomers,
    premiumCustomers,
    averageRating,
    totalRevenue
  } = useCustomers();

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'accepted': return 'bg-emerald-100 text-emerald-800';
      case 'rejected': return 'bg-red-100 text-red-800';
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

  const getCustomerStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleOrderAction = (action: string, orderId: string, extraData?: any) => {
    switch (action) {
      case 'accept':
        acceptOrder(orderId);
        toast({ title: "Order Accepted", description: `Order ${orderId} has been accepted successfully.` });
        break;
      case 'reject':
        rejectOrder(orderId);
        toast({ title: "Order Rejected", description: `Order ${orderId} has been rejected.`, variant: "destructive" });
        break;
      case 'undo':
        undoOrder(orderId);
        toast({ title: "Action Undone", description: `Previous action on order ${orderId} has been undone.` });
        break;
      case 'process':
        startProcessing(orderId);
        toast({ title: "Processing Started", description: `Order ${orderId} is now being processed.` });
        break;
      case 'ship':
        shipOrder(orderId);
        toast({ title: "Order Shipped", description: `Order ${orderId} has been shipped with tracking number.` });
        break;
      case 'priority':
        updatePriority(orderId, extraData);
        toast({ title: "Priority Updated", description: `Order ${orderId} priority changed to ${extraData}.` });
        break;
    }
  };

  const handleCustomerAction = (action: string, customerId: string, extraData?: any) => {
    switch (action) {
      case 'contact':
        toast({ title: "Contact Initiated", description: `Contacting customer ${customerId} via email.` });
        break;
      case 'updateStatus':
        updateCustomerStatus(customerId, extraData);
        toast({ title: "Status Updated", description: `Customer ${customerId} status changed to ${extraData}.` });
        break;
      case 'updateRating':
        updateCustomerRating(customerId, extraData);
        toast({ title: "Rating Updated", description: `Customer ${customerId} rating updated.` });
        break;
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
              <div className="text-2xl font-bold text-aktina-blue">{totalCustomers}</div>
              <div className="text-sm text-muted-foreground">Total Customers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-aktina-purple">{orderCount}</div>
              <div className="text-sm text-muted-foreground">Total Orders</div>
              <Progress value={Math.min((orderCount / 50) * 100, 100)} className="mt-2" />
            </div>
            <div>
              <div className="text-2xl font-bold text-aktina-amber">${totalValue.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Revenue</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-aktina-forest">{averageRating.toFixed(1)}/5</div>
              <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Monthly Revenue"
          value={totalValue}
          prefix="$"
          icon={<TrendingUp className="w-4 h-4" />}
          trend="up"
          trendValue="12% vs last month"
          delay={0}
        />
        <MetricCard
          title="Order Volume"
          value={orderCount}
          icon={<Package className="w-4 h-4" />}
          trend="up"
          trendValue={`${pendingCount} pending`}
          delay={100}
        />
        <MetricCard
          title="Customer Growth"
          value={totalCustomers}
          icon={<Users className="w-4 h-4" />}
          trend="up"
          trendValue={`${premiumCustomers} premium`}
          delay={200}
        />
        <MetricCard
          title="Avg Order Value"
          value={Math.round(totalValue / orderCount)}
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
          <CardDescription>Latest orders requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {allOrders.slice(0, 4).map((order, index) => (
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
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
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
            {customers.slice(0, 4).map((customer, index) => (
              <Card key={customer.id} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">{customer.orders} orders • ${customer.revenue.toLocaleString()}</div>
                  </div>
                  <Badge className={getCustomerStatusColor(customer.status)}>
                    {customer.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Rating: {customer.rating} ⭐</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
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
          {/* Order Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
            <AnalyticsCard title="Pending" value={pendingCount} trend="neutral" trendValue="requires action" />
            <AnalyticsCard title="Processing" value={processingCount} trend="up" trendValue="in progress" />
            <AnalyticsCard title="Shipped" value={shippedCount} trend="up" trendValue="on the way" />
            <AnalyticsCard title="Delivered" value={deliveredCount} trend="up" trendValue="completed" />
            <AnalyticsCard title="Accepted" value={acceptedCount} trend="up" trendValue="confirmed" />
            <AnalyticsCard title="High Priority" value={highPriorityCount} trend="down" trendValue="urgent" />
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders, customers, products..."
                value={orderSearchTerm}
                onChange={(e) => setOrderSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Orders List */}
          <div className="space-y-4">
            {orders.map((order, index) => (
              <Card key={order.id} className="p-4 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-semibold text-lg">
                      {order.id} - {order.customer}
                    </div>
                    <div className="text-sm text-muted-foreground">{order.products}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Tracking: {order.trackingNumber} • Delivery: {order.estimatedDelivery}
                    </div>
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
                    <div className="text-sm text-muted-foreground">Order Date</div>
                    <div className="font-semibold">{order.date}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {order.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        className="bg-aktina-primary hover:bg-aktina-primary/90"
                        onClick={() => handleOrderAction('accept', order.id)}
                      >
                        Accept Order
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleOrderAction('reject', order.id)}
                      >
                        Reject Order
                      </Button>
                    </>
                  )}
                  {order.status === 'accepted' && (
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => handleOrderAction('process', order.id)}
                    >
                      Start Processing
                    </Button>
                  )}
                  {order.status === 'processing' && (
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => handleOrderAction('ship', order.id)}
                    >
                      Ship Order
                    </Button>
                  )}
                  {(order.status === 'accepted' || order.status === 'rejected') && order.previousStatus && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleOrderAction('undo', order.id)}
                    >
                      Undo
                    </Button>
                  )}
                  <Select onValueChange={(value) => handleOrderAction('priority', order.id, value)}>
                    <SelectTrigger className="w-32 h-8">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Details
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleCustomerAction('contact', order.customer)}
                  >
                    Contact
                  </Button>
                </div>
              </Card>
            ))}
            {orders.length === 0 && (
              <div className="text-center py-8">
                <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No orders match your search criteria.</p>
              </div>
            )}
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
          {/* Customer Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <AnalyticsCard
              title="Total Customers"
              value={totalCustomers}
              trend="up"
              trendValue="growing base"
            />
            <AnalyticsCard
              title="Active Customers"
              value={activeCustomers}
              trend="up"
              trendValue={`${Math.round((activeCustomers/totalCustomers)*100)}% active`}
            />
            <AnalyticsCard
              title="Premium Customers"
              value={premiumCustomers}
              trend="up"
              trendValue="high value"
            />
            <AnalyticsCard
              title="Avg Rating"
              value={averageRating}
              unit="/5"
              trend="up"
              trendValue="excellent service"
            />
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers by name, email, location..."
                value={customerSearchTerm}
                onChange={(e) => setCustomerSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={customerStatusFilter} onValueChange={setCustomerStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Customers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customers.map((customer) => (
              <Card key={customer.id} className="p-4 hover:shadow-lg transition-all">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-aktina-blue/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-aktina-blue" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{customer.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      {customer.rating} rating
                    </div>
                  </div>
                  <Badge className={getCustomerStatusColor(customer.status)}>
                    {customer.status}
                  </Badge>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Orders:</span>
                    <span className="font-medium">{customer.orders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Revenue:</span>
                    <span className="font-medium">${customer.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Location:</span>
                    <span className="font-medium">{customer.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Last Order:</span>
                    <span className="font-medium">{customer.lastOrder}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleCustomerAction('contact', customer.id)}
                  >
                    <Mail className="w-3 h-3 mr-1" />
                    Contact
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Select onValueChange={(value) => handleCustomerAction('updateStatus', customer.id, value)}>
                    <SelectTrigger className="w-20 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Card>
            ))}
            {customers.length === 0 && (
              <div className="col-span-full text-center py-8">
                <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No customers match your search criteria.</p>
              </div>
            )}
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

      {/* Order Details Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
            <DialogDescription>Complete order information and tracking</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Customer Information</h4>
                  <p><strong>Name:</strong> {selectedOrder.customer}</p>
                  <p><strong>Order Date:</strong> {selectedOrder.date}</p>
                  <p><strong>Tracking:</strong> {selectedOrder.trackingNumber}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Order Details</h4>
                  <p><strong>Products:</strong> {selectedOrder.products}</p>
                  <p><strong>Quantity:</strong> {selectedOrder.quantity} units</p>
                  <p><strong>Value:</strong> ${selectedOrder.value.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(selectedOrder.status)}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </Badge>
                <Badge className={getPriorityColor(selectedOrder.priority)}>
                  {selectedOrder.priority} Priority
                </Badge>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Estimated Delivery</h4>
                <p>{selectedOrder.estimatedDelivery}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Customer Details Modal */}
      <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Customer Profile - {selectedCustomer?.name}</DialogTitle>
            <DialogDescription>Complete customer information and history</DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Contact Information</h4>
                  <p className="flex items-center"><Mail className="w-4 h-4 mr-2" />{selectedCustomer.email}</p>
                  <p className="flex items-center"><Phone className="w-4 h-4 mr-2" />{selectedCustomer.phoneNumber}</p>
                  <p className="flex items-center"><MapPin className="w-4 h-4 mr-2" />{selectedCustomer.location}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Account Summary</h4>
                  <p><strong>Total Orders:</strong> {selectedCustomer.orders}</p>
                  <p><strong>Total Revenue:</strong> ${selectedCustomer.revenue.toLocaleString()}</p>
                  <p><strong>Rating:</strong> {selectedCustomer.rating}/5 ⭐</p>
                  <p><strong>Last Order:</strong> {selectedCustomer.lastOrder}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getCustomerStatusColor(selectedCustomer.status)}>
                  {selectedCustomer.status}
                </Badge>
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => handleCustomerAction('contact', selectedCustomer.id)}>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Customer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RetailerDashboard;
