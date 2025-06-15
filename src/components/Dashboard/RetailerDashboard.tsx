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
    <div className="space-y-8 animate-fade-in">
      {/* Sales Overview */}
      <Card className="relative overflow-hidden border-0 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-aktina-blue/10 via-aktina-purple/10 to-aktina-pink/10" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-20 translate-x-20" />
        
        <CardHeader className="relative z-10">
          <CardTitle className="text-2xl bg-gradient-to-r from-aktina-blue to-aktina-purple bg-clip-text text-transparent">
            Sales Overview
          </CardTitle>
          <CardDescription>Real-time sales metrics and customer engagement</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-lg glass-effect">
              <div className="text-3xl font-bold bg-gradient-to-r from-aktina-blue to-aktina-cyan bg-clip-text text-transparent animate-counter">
                {totalCustomers}
              </div>
              <div className="text-sm text-muted-foreground mt-2">Total Customers</div>
            </div>
            <div className="text-center p-4 rounded-lg glass-effect">
              <div className="text-3xl font-bold bg-gradient-to-r from-aktina-purple to-aktina-pink bg-clip-text text-transparent animate-counter">
                {orderCount}
              </div>
              <div className="text-sm text-muted-foreground mt-2">Total Orders</div>
              <Progress value={Math.min((orderCount / 50) * 100, 100)} className="mt-3 h-2" />
            </div>
            <div className="text-center p-4 rounded-lg glass-effect">
              <div className="text-3xl font-bold bg-gradient-to-r from-aktina-amber to-aktina-orange bg-clip-text text-transparent animate-counter">
                ${totalValue.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground mt-2">Total Revenue</div>
            </div>
            <div className="text-center p-4 rounded-lg glass-effect">
              <div className="text-3xl font-bold bg-gradient-to-r from-aktina-forest to-emerald-500 bg-clip-text text-transparent animate-counter">
                {averageRating.toFixed(1)}/5
              </div>
              <div className="text-sm text-muted-foreground mt-2">Customer Satisfaction</div>
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
      <Card className="glass-effect border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-aktina-primary to-aktina-purple bg-clip-text text-transparent">
            Recent Orders
          </CardTitle>
          <CardDescription>Latest orders requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {allOrders.slice(0, 4).map((order, index) => (
              <div 
                key={order.id} 
                className="flex items-center justify-between p-6 border border-border/50 rounded-xl hover:shadow-xl transition-all duration-300 glass-effect animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-aktina-blue to-aktina-purple rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{order.id}</div>
                    <div className="text-sm text-muted-foreground">{order.customer}</div>
                    <div className="text-xs text-muted-foreground mt-1">{order.products}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-bold text-xl bg-gradient-to-r from-aktina-amber to-aktina-orange bg-clip-text text-transparent">
                      ${order.value.toLocaleString()}
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <Badge className={`${getPriorityColor(order.priority)} border-0`}>
                        {order.priority}
                      </Badge>
                      <Badge className={`${getStatusColor(order.status)} border-0`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedOrder(order)}
                    className="button-hover glass-effect border-border/50"
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
      <Card className="glass-effect border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-aktina-primary to-aktina-purple bg-clip-text text-transparent">
            Top Customers
          </CardTitle>
          <CardDescription>Revenue and engagement metrics for key customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customers.slice(0, 4).map((customer, index) => (
              <Card 
                key={customer.id} 
                className="p-6 glass-effect border-border/50 card-hover animate-bounce-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-aktina-indigo to-aktina-purple rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {customer.orders} orders • ${customer.revenue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getCustomerStatusColor(customer.status)} border-0`}>
                    {customer.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center">
                    <Star className="w-4 h-4 text-amber-400 mr-1" />
                    {customer.rating} rating
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedCustomer(customer)}
                    className="button-hover glass-effect border-border/50"
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
        type="area"
        dataKey="sales"
        xAxisKey="name"
        color="hsl(var(--aktina-blue))"
        gradient={true}
      />
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-8 animate-fade-in">
      <Card className="glass-effect border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-aktina-primary to-aktina-purple bg-clip-text text-transparent">
            Order Management
          </CardTitle>
          <CardDescription>Manage and track customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Order Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <AnalyticsCard 
              title="Pending" 
              value={pendingCount} 
              trend="neutral" 
              trendValue="requires action"
              gradient="from-amber-500 to-orange-500"
              delay={0}
            />
            <AnalyticsCard 
              title="Processing" 
              value={processingCount} 
              trend="up" 
              trendValue="in progress"
              gradient="from-blue-500 to-indigo-500"
              delay={100}
            />
            <AnalyticsCard 
              title="Shipped" 
              value={shippedCount} 
              trend="up" 
              trendValue="on the way"
              gradient="from-purple-500 to-pink-500"
              delay={200}
            />
            <AnalyticsCard 
              title="Delivered" 
              value={deliveredCount} 
              trend="up" 
              trendValue="completed"
              gradient="from-green-500 to-emerald-500"
              delay={300}
            />
            <AnalyticsCard 
              title="Accepted" 
              value={acceptedCount} 
              trend="up" 
              trendValue="confirmed"
              gradient="from-teal-500 to-cyan-500"
              delay={400}
            />
            <AnalyticsCard 
              title="High Priority" 
              value={highPriorityCount} 
              trend="down" 
              trendValue="urgent"
              gradient="from-red-500 to-rose-500"
              delay={500}
            />
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders, customers, products..."
                value={orderSearchTerm}
                onChange={(e) => setOrderSearchTerm(e.target.value)}
                className="pl-10 glass-effect border-border/50"
              />
            </div>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as typeof statusFilter)}>
              <SelectTrigger className="w-40 glass-effect border-border/50">
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
            <Select value={priorityFilter} onValueChange={(value) => setPriorityFilter(value as typeof priorityFilter)}>
              <SelectTrigger className="w-40 glass-effect border-border/50">
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
          <div className="space-y-6">
            {orders.map((order, index) => (
              <Card 
                key={order.id} 
                className="p-6 glass-effect border-border/50 card-hover animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
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
              <div className="text-center py-12">
                <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                <p className="text-muted-foreground text-lg">No orders match your search criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCustomersTab = () => (
    <div className="space-y-8 animate-fade-in">
      <Card className="glass-effect border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-aktina-primary to-aktina-purple bg-clip-text text-transparent">
            Customer Management
          </CardTitle>
          <CardDescription>Manage customer relationships and profiles</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Customer Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <AnalyticsCard
              title="Total Customers"
              value={totalCustomers}
              trend="up"
              trendValue="growing base"
              gradient="from-blue-500 to-purple-500"
              delay={0}
            />
            <AnalyticsCard
              title="Active Customers"
              value={activeCustomers}
              trend="up"
              trendValue={`${Math.round((activeCustomers/totalCustomers)*100)}% active`}
              gradient="from-green-500 to-teal-500"
              delay={100}
            />
            <AnalyticsCard
              title="Premium Customers"
              value={premiumCustomers}
              trend="up"
              trendValue="high value"
              gradient="from-purple-500 to-pink-500"
              delay={200}
            />
            <AnalyticsCard
              title="Avg Rating"
              value={averageRating}
              unit="/5"
              trend="up"
              trendValue="excellent service"
              gradient="from-amber-500 to-orange-500"
              delay={300}
            />
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers by name, email, location..."
                value={customerSearchTerm}
                onChange={(e) => setCustomerSearchTerm(e.target.value)}
                className="pl-10 glass-effect border-border/50"
              />
            </div>
            <Select value={customerStatusFilter} onValueChange={(value) => setCustomerStatusFilter(value as typeof customerStatusFilter)}>
              <SelectTrigger className="w-40 glass-effect border-border/50">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customers.map((customer) => (
              <Card key={customer.id} className="p-6 glass-effect border-border/50 card-hover animate-bounce-in">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-aktina-indigo to-aktina-purple rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
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
              <div className="col-span-full text-center py-12">
                <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                <p className="text-muted-foreground text-lg">No customers match your search criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsCard
          title="Revenue Growth"
          value={28}
          unit="%"
          trend="up"
          trendValue="vs last quarter"
          gradient="from-green-500 to-emerald-500"
          delay={0}
        />
        <AnalyticsCard
          title="Market Penetration"
          value={15}
          unit="%"
          trend="up"
          trendValue="Regional leader"
          gradient="from-blue-500 to-indigo-500"
          delay={100}
        />
        <AnalyticsCard
          title="Customer Retention"
          value={94}
          unit="%"
          trend="up"
          trendValue="Industry best"
          gradient="from-purple-500 to-pink-500"
          delay={200}
        />
      </div>

      <ChartCard
        title="Sales Performance Analytics"
        description="Comprehensive business metrics and trend analysis"
        data={salesData}
        type="area"
        dataKey="sales"
        xAxisKey="name"
        color="hsl(var(--aktina-blue))"
        gradient={true}
      />

      <Card className="glass-effect border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-aktina-primary to-aktina-purple bg-clip-text text-transparent">
            Detailed Business Analytics
          </CardTitle>
          <CardDescription>In-depth analysis of sales operations and market performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-aktina-indigo to-aktina-purple bg-clip-text text-transparent">
                Customer Demographics
              </h3>
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
                className="h-80"
                gradient={true}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-aktina-amber to-aktina-orange bg-clip-text text-transparent">
                Sales by Product Category
              </h3>
              <div className="space-y-4">
                {[
                  { category: 'Laptops', revenue: 425000, growth: 23, gradient: 'from-blue-500 to-indigo-500' },
                  { category: 'Desktops', revenue: 380000, growth: 18, gradient: 'from-purple-500 to-pink-500' },
                  { category: 'Tablets', revenue: 295000, growth: 31, gradient: 'from-green-500 to-teal-500' },
                  { category: 'Accessories', revenue: 240000, growth: 15, gradient: 'from-amber-500 to-orange-500' }
                ].map((cat, index) => (
                  <div 
                    key={cat.category} 
                    className="flex items-center justify-between p-4 border border-border/50 rounded-xl glass-effect animate-slide-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${cat.gradient}`} />
                      <div>
                        <div className="font-semibold text-lg">{cat.category}</div>
                        <div className="text-sm text-muted-foreground">${cat.revenue.toLocaleString()}</div>
                      </div>
                    </div>
                    <Badge className={`bg-gradient-to-r ${cat.gradient} text-white border-0`}>
                      +{cat.growth}%
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

  const renderInsightsTab = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsCard
          title="Market Share"
          value={18}
          unit="%"
          trend="up"
          trendValue="vs last quarter"
          gradient="from-green-500 to-emerald-500"
          delay={0}
        />
        <AnalyticsCard
          title="Brand Awareness"
          value={65}
          unit="%"
          trend="up"
          trendValue="Regional leader"
          gradient="from-blue-500 to-indigo-500"
          delay={100}
        />
        <AnalyticsCard
          title="Customer Loyalty"
          value={82}
          unit="%"
          trend="up"
          trendValue="Industry best"
          gradient="from-purple-500 to-pink-500"
          delay={200}
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
        gradient={true}
      />

      <Card className="glass-effect border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-aktina-primary to-aktina-purple bg-clip-text text-transparent">
            Market Trend Analysis
          </CardTitle>
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
                gradient={true}
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
    <div className="space-y-8 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-aktina-primary to-aktina-purple bg-clip-text text-transparent">
            Communication Center
          </CardTitle>
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
    <div className="space-y-6 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-aktina-blue via-aktina-purple to-aktina-pink bg-clip-text text-transparent animate-fade-in">
          Retailer Dashboard
        </h1>
      </div>

      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="w-fit glass-effect border-border/50"
      />

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-aktina-blue/5 via-aktina-purple/5 to-aktina-pink/5 rounded-3xl" />
        <div className="relative z-10 p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Order Details Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl glass-effect border-border/50">
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
        <DialogContent className="max-w-2xl glass-effect border-border/50">
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
