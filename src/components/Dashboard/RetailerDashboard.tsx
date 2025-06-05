
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
import { Home, ShoppingCart, MessageSquare, TrendingUp, Settings, Star, Package, Users, DollarSign } from 'lucide-react';

const RetailerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'orders', label: 'Orders', badge: 3, icon: <ShoppingCart className="w-4 h-4" /> },
    { id: 'feedback', label: 'Customer Feedback', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'insights', label: 'Market Insights', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  const salesData = [
    { name: 'Jan', sales: 125000, customers: 450, satisfaction: 4.6 },
    { name: 'Feb', sales: 138000, customers: 485, satisfaction: 4.7 },
    { name: 'Mar', sales: 142000, customers: 520, satisfaction: 4.5 },
    { name: 'Apr', sales: 156000, customers: 550, satisfaction: 4.8 },
    { name: 'May', sales: 148000, customers: 535, satisfaction: 4.7 },
    { name: 'Jun', sales: 167000, customers: 580, satisfaction: 4.9 }
  ];

  const recentOrders = [
    { id: 'ORD-R001', products: 'Smartphone Bundle', quantity: 50, status: 'delivered', value: 25000, date: '2024-01-15' },
    { id: 'ORD-R002', products: 'Laptop Collection', quantity: 25, status: 'in-transit', value: 37500, date: '2024-01-12' },
    { id: 'ORD-R003', products: 'Audio Equipment', quantity: 80, status: 'processing', value: 24000, date: '2024-01-10' },
    { id: 'ORD-R004', products: 'Gaming Devices', quantity: 30, status: 'pending', value: 45000, date: '2024-01-08' }
  ];

  const customerFeedback = [
    { id: 1, customer: 'John Smith', product: 'Smartphone X1', rating: 5, comment: 'Excellent product and fast delivery!', date: '2024-01-14' },
    { id: 2, customer: 'Sarah Johnson', product: 'Laptop Pro', rating: 4, comment: 'Great performance, minor shipping delay.', date: '2024-01-13' },
    { id: 3, customer: 'Mike Chen', product: 'Wireless Headphones', rating: 5, comment: 'Amazing sound quality, highly recommended!', date: '2024-01-12' },
    { id: 4, customer: 'Lisa Rodriguez', product: 'Gaming Console', rating: 4, comment: 'Good value for money, satisfied with purchase.', date: '2024-01-11' }
  ];

  const topProducts = [
    { name: 'Smartphone X1', sales: 145, revenue: 72500, rating: 4.8, trend: 'up' },
    { name: 'Laptop Pro 15"', sales: 89, revenue: 133500, rating: 4.6, trend: 'up' },
    { name: 'Wireless Headphones', sales: 234, revenue: 35100, rating: 4.9, trend: 'up' },
    { name: 'Gaming Console', sales: 67, revenue: 100500, rating: 4.7, trend: 'down' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in-transit': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-amber-100 text-amber-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingStars = (rating: number) => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 ? '⭐' : '');
  };

  const renderHomeTab = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Retail Overview */}
      <Card className="bg-gradient-to-r from-aktina-forest/10 to-aktina-blue/10 border-0">
        <CardHeader>
          <CardTitle className="text-xl">Retail Performance Overview</CardTitle>
          <CardDescription>Daily sales summary and customer satisfaction metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold text-aktina-forest">$167K</div>
              <div className="text-sm text-muted-foreground">Monthly Sales</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-aktina-blue">580</div>
              <div className="text-sm text-muted-foreground">Active Customers</div>
              <Progress value={78} className="mt-2" />
            </div>
            <div>
              <div className="text-2xl font-bold text-aktina-primary">4.9</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-aktina-amber">3</div>
              <div className="text-sm text-muted-foreground">Pending Orders</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Daily Sales"
          value={5400}
          prefix="$"
          icon={<DollarSign className="w-4 h-4" />}
          trend="up"
          trendValue="8% vs yesterday"
          delay={0}
        />
        <MetricCard
          title="Transaction Volume"
          value={47}
          icon={<ShoppingCart className="w-4 h-4" />}
          trend="up"
          trendValue="12 transactions today"
          delay={100}
        />
        <MetricCard
          title="Customer Satisfaction"
          value={98}
          suffix="%"
          icon={<Star className="w-4 h-4" />}
          trend="up"
          trendValue="Excellent feedback"
          delay={200}
        />
        <MetricCard
          title="Inventory Turnover"
          value={6.8}
          suffix="x"
          icon={<Package className="w-4 h-4" />}
          trend="up"
          trendValue="Above industry avg"
          delay={300}
        />
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest orders and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="font-semibold">{order.id}</div>
                    <div className="text-sm text-muted-foreground">{order.products}</div>
                  </div>
                  <div>
                    <div className="font-medium">Qty: {order.quantity}</div>
                    <div className="text-sm text-muted-foreground">{order.date}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-semibold">${order.value.toLocaleString()}</div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline">Track Order</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
          <CardDescription>Best-selling products and their performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topProducts.map((product, index) => (
              <Card key={product.name} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold">{product.name}</div>
                    <div className="text-sm text-muted-foreground">{product.sales} units sold</div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-aktina-primary text-white mb-1">
                      {product.rating} ⭐
                    </Badge>
                    <div className="text-sm font-medium">${product.revenue.toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Performance</span>
                  <div className="flex items-center space-x-1">
                    <span className={`text-sm font-medium ${product.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {product.trend === 'up' ? '↗' : '↘'} Trending
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sales Performance Chart */}
      <ChartCard
        title="Sales Performance Trends"
        description="Monthly sales, customer count, and satisfaction trends"
        data={salesData}
        type="line"
        dataKey="sales"
        xAxisKey="name"
        color="hsl(var(--aktina-forest))"
      />
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>Place new orders and track existing ones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <AnalyticsCard
              title="Order Status"
              value={3}
              trend="down"
              trendValue="1 delivered today"
            />
            <AnalyticsCard
              title="Order Value"
              value={132000}
              prefix="$"
              trend="up"
              trendValue="High value orders"
            />
            <AnalyticsCard
              title="Delivery Time"
              value={4.2}
              unit=" days"
              trend="down"
              trendValue="Faster delivery"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Active Orders</h3>
              <div className="space-y-4">
                {recentOrders.filter(order => order.status !== 'delivered').map((order) => (
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
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Quantity</div>
                        <div className="font-medium">{order.quantity} units</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Value</div>
                        <div className="font-medium">${order.value.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" variant="outline" className="flex-1">
                        Track Order
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Contact Support
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Place New Order</h3>
              <Card className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Product Category</label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                      <option>Smartphones</option>
                      <option>Laptops</option>
                      <option>Audio Equipment</option>
                      <option>Gaming Devices</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Quantity</label>
                    <input type="number" className="w-full mt-1 p-2 border rounded-md" placeholder="Enter quantity" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Special Requirements</label>
                    <textarea className="w-full mt-1 p-2 border rounded-md" rows={3} placeholder="Any special requirements..."></textarea>
                  </div>
                  <Button className="w-full bg-aktina-primary hover:bg-aktina-primary/90">
                    Submit Order Request
                  </Button>
                </div>
              </Card>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Recent Product Catalog</h4>
                <div className="space-y-2">
                  {topProducts.slice(0, 3).map((product) => (
                    <div key={product.name} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm font-medium">{product.name}</span>
                      <Button size="sm" variant="outline">Add to Cart</Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFeedbackTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Customer Feedback Management</CardTitle>
          <CardDescription>Collect, analyze, and respond to customer feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <AnalyticsCard
              title="Average Rating"
              value={4.7}
              unit="/5"
              trend="up"
              trendValue="Excellent service"
            />
            <AnalyticsCard
              title="Total Reviews"
              value={842}
              trend="up"
              trendValue="21 new this week"
            />
            <AnalyticsCard
              title="Response Rate"
              value={94}
              unit="%"
              trend="up"
              trendValue="Above target"
            />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Customer Feedback</h3>
            <div className="space-y-4">
              {customerFeedback.map((feedback) => (
                <Card key={feedback.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold">{feedback.customer}</div>
                      <div className="text-sm text-muted-foreground">{feedback.product} • {feedback.date}</div>
                    </div>
                    <div className="text-amber-400">
                      {getRatingStars(feedback.rating)}
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded-md italic text-sm">
                    "{feedback.comment}"
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      Reply
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Flag for Review
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Feedback Collection</h3>
            <Card className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Contact Method</label>
                  <div className="flex space-x-4 mt-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="contact" defaultChecked />
                      <span>Email</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="contact" />
                      <span>SMS</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="contact" />
                      <span>QR Code</span>
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Feedback Request Template</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Post-Purchase Survey</option>
                    <option>Product Review Request</option>
                    <option>Customer Satisfaction Survey</option>
                  </select>
                </div>
                <Button className="w-full bg-aktina-primary hover:bg-aktina-primary/90">
                  Send Feedback Request
                </Button>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderInsightsTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Market Insights & Analytics</CardTitle>
          <CardDescription>Consumer trends, competitive analysis, and market intelligence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <AnalyticsCard
              title="Market Growth"
              value={12.5}
              unit="%"
              trend="up"
              trendValue="Expanding market"
            />
            <AnalyticsCard
              title="Competitive Position"
              value={2}
              unit="nd"
              trend="up"
              trendValue="In local market"
            />
            <AnalyticsCard
              title="Market Share"
              value={18}
              unit="%"
              trend="up"
              trendValue="2% gain YoY"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Consumer Trends</h3>
              <ChartCard
                title="Consumer Preferences"
                data={[
                  { name: 'Performance', value: 45 },
                  { name: 'Price', value: 30 },
                  { name: 'Brand', value: 15 },
                  { name: 'Features', value: 10 }
                ]}
                type="pie"
                dataKey="value"
                className="h-64"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Seasonal Analysis</h3>
              <div className="space-y-3">
                {[
                  { season: 'Spring', trend: 'Moderate Growth', products: 'Audio, Wearables', change: '+8%' },
                  { season: 'Summer', trend: 'Strong Growth', products: 'Smartphones, Cameras', change: '+15%' },
                  { season: 'Fall', trend: 'Peak Season', products: 'Laptops, Tablets', change: '+23%' },
                  { season: 'Winter', trend: 'High Activity', products: 'Gaming, Smart Home', change: '+18%' }
                ].map((season, index) => (
                  <Card key={index} className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{season.season} - {season.trend}</div>
                      <Badge className="bg-aktina-primary text-white">{season.change}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Top Categories: {season.products}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Competitive Analysis</h3>
            <div className="space-y-4">
              <ChartCard
                title="Market Share Comparison"
                data={[
                  { name: 'Your Store', share: 18 },
                  { name: 'Main Competitor', share: 22 },
                  { name: 'Local Shop A', share: 15 },
                  { name: 'Local Shop B', share: 12 },
                  { name: 'Others', share: 33 }
                ]}
                type="bar"
                dataKey="share"
                xAxisKey="name"
                color="hsl(var(--aktina-forest))"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { metric: 'Price Competitiveness', score: 87, trend: 'up', benchmark: 'Above avg' },
                  { metric: 'Selection Range', score: 92, trend: 'up', benchmark: 'Industry leading' },
                  { metric: 'Customer Experience', score: 94, trend: 'up', benchmark: 'Best in class' },
                  { metric: 'Brand Recognition', score: 78, trend: 'up', benchmark: 'Improving' }
                ].map((metric, index) => (
                  <Card key={index} className="p-3">
                    <div className="text-sm text-muted-foreground">{metric.metric}</div>
                    <div className="font-semibold text-lg">{metric.score}%</div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{metric.benchmark}</span>
                      <Badge variant="secondary" className="text-xs">
                        {metric.trend === 'up' ? '↗' : '↘'} Trend
                      </Badge>
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home': return renderHomeTab();
      case 'orders': return renderOrdersTab();
      case 'feedback': return renderFeedbackTab();
      case 'insights': return renderInsightsTab();
      case 'profile': return <ProfileSettings />;
      default: return renderHomeTab();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-aktina-forest to-aktina-blue bg-clip-text text-transparent">
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
