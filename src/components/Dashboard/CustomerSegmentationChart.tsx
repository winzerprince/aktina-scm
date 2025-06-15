
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Scatter, ScatterChart, ZAxis } from 'recharts';
import { Users, DollarSign, ShoppingCart, Star, TrendingUp, Zap } from 'lucide-react';
import useCustomers from '@/hooks/useCustomers';

type SegmentationType = 'value' | 'orders' | 'rating' | 'status' | 'location' | 'rfm';
type ChartType = 'pie' | 'bar' | 'scatter';

const CustomerSegmentationChart: React.FC = () => {
  const [segmentationType, setSegmentationType] = useState<SegmentationType>('value');
  const [chartType, setChartType] = useState<ChartType>('pie');
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const { allCustomers } = useCustomers();

  const segmentationOptions = [
    { value: 'value', label: 'Customer Value', icon: <DollarSign className="w-4 h-4" /> },
    { value: 'orders', label: 'Order Frequency', icon: <ShoppingCart className="w-4 h-4" /> },
    { value: 'rating', label: 'Rating Segments', icon: <Star className="w-4 h-4" /> },
    { value: 'status', label: 'Customer Status', icon: <Users className="w-4 h-4" /> },
    { value: 'location', label: 'Geographic', icon: <TrendingUp className="w-4 h-4" /> },
    { value: 'rfm', label: 'RFM Analysis', icon: <Zap className="w-4 h-4" /> }
  ];

  const colors = [
    'hsl(var(--aktina-primary))',
    'hsl(var(--aktina-blue))',
    'hsl(var(--aktina-purple))',
    'hsl(var(--aktina-amber))',
    'hsl(var(--aktina-red))',
    'hsl(var(--aktina-forest))',
    'hsl(var(--aktina-indigo))',
    'hsl(var(--aktina-pink))',
    'hsl(var(--aktina-cyan))',
    'hsl(var(--aktina-orange))'
  ];

  const segmentedData = useMemo(() => {
    switch (segmentationType) {
      case 'value':
        return [
          { 
            name: 'High Value', 
            value: allCustomers.filter(c => c.revenue > 12000).length,
            revenue: allCustomers.filter(c => c.revenue > 12000).reduce((sum, c) => sum + c.revenue, 0),
            avgRevenue: allCustomers.filter(c => c.revenue > 12000).reduce((sum, c) => sum + c.revenue, 0) / allCustomers.filter(c => c.revenue > 12000).length || 0
          },
          { 
            name: 'Medium Value', 
            value: allCustomers.filter(c => c.revenue >= 9000 && c.revenue <= 12000).length,
            revenue: allCustomers.filter(c => c.revenue >= 9000 && c.revenue <= 12000).reduce((sum, c) => sum + c.revenue, 0),
            avgRevenue: allCustomers.filter(c => c.revenue >= 9000 && c.revenue <= 12000).reduce((sum, c) => sum + c.revenue, 0) / allCustomers.filter(c => c.revenue >= 9000 && c.revenue <= 12000).length || 0
          },
          { 
            name: 'Low Value', 
            value: allCustomers.filter(c => c.revenue < 9000).length,
            revenue: allCustomers.filter(c => c.revenue < 9000).reduce((sum, c) => sum + c.revenue, 0),
            avgRevenue: allCustomers.filter(c => c.revenue < 9000).reduce((sum, c) => sum + c.revenue, 0) / allCustomers.filter(c => c.revenue < 9000).length || 0
          }
        ];

      case 'orders':
        return [
          { 
            name: 'Frequent Buyers', 
            value: allCustomers.filter(c => c.orders > 12).length,
            avgOrders: allCustomers.filter(c => c.orders > 12).reduce((sum, c) => sum + c.orders, 0) / allCustomers.filter(c => c.orders > 12).length || 0
          },
          { 
            name: 'Regular Buyers', 
            value: allCustomers.filter(c => c.orders >= 8 && c.orders <= 12).length,
            avgOrders: allCustomers.filter(c => c.orders >= 8 && c.orders <= 12).reduce((sum, c) => sum + c.orders, 0) / allCustomers.filter(c => c.orders >= 8 && c.orders <= 12).length || 0
          },
          { 
            name: 'Occasional Buyers', 
            value: allCustomers.filter(c => c.orders < 8).length,
            avgOrders: allCustomers.filter(c => c.orders < 8).reduce((sum, c) => sum + c.orders, 0) / allCustomers.filter(c => c.orders < 8).length || 0
          }
        ];

      case 'rating':
        return [
          { 
            name: 'Highly Satisfied', 
            value: allCustomers.filter(c => c.rating >= 4.7).length,
            avgRating: allCustomers.filter(c => c.rating >= 4.7).reduce((sum, c) => sum + c.rating, 0) / allCustomers.filter(c => c.rating >= 4.7).length || 0
          },
          { 
            name: 'Satisfied', 
            value: allCustomers.filter(c => c.rating >= 4.3 && c.rating < 4.7).length,
            avgRating: allCustomers.filter(c => c.rating >= 4.3 && c.rating < 4.7).reduce((sum, c) => sum + c.rating, 0) / allCustomers.filter(c => c.rating >= 4.3 && c.rating < 4.7).length || 0
          },
          { 
            name: 'Neutral', 
            value: allCustomers.filter(c => c.rating < 4.3).length,
            avgRating: allCustomers.filter(c => c.rating < 4.3).reduce((sum, c) => sum + c.rating, 0) / allCustomers.filter(c => c.rating < 4.3).length || 0
          }
        ];

      case 'status':
        return [
          { 
            name: 'Premium', 
            value: allCustomers.filter(c => c.status === 'premium').length,
            avgRevenue: allCustomers.filter(c => c.status === 'premium').reduce((sum, c) => sum + c.revenue, 0) / allCustomers.filter(c => c.status === 'premium').length || 0
          },
          { 
            name: 'Active', 
            value: allCustomers.filter(c => c.status === 'active').length,
            avgRevenue: allCustomers.filter(c => c.status === 'active').reduce((sum, c) => sum + c.revenue, 0) / allCustomers.filter(c => c.status === 'active').length || 0
          },
          { 
            name: 'Inactive', 
            value: allCustomers.filter(c => c.status === 'inactive').length,
            avgRevenue: allCustomers.filter(c => c.status === 'inactive').reduce((sum, c) => sum + c.revenue, 0) / allCustomers.filter(c => c.status === 'inactive').length || 0
          }
        ];

      case 'location':
        const locationGroups = allCustomers.reduce((acc, customer) => {
          acc[customer.location] = (acc[customer.location] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        return Object.entries(locationGroups).map(([location, count]) => ({
          name: location,
          value: count,
          revenue: allCustomers.filter(c => c.location === location).reduce((sum, c) => sum + c.revenue, 0)
        }));

      case 'rfm':
        return allCustomers.map(customer => {
          const recency = Math.floor(Math.random() * 30) + 1; // Days since last order
          const frequency = customer.orders;
          const monetary = customer.revenue;
          
          return {
            name: customer.name,
            recency,
            frequency,
            monetary,
            value: frequency,
            x: recency,
            y: frequency,
            z: monetary / 1000
          };
        });

      default:
        return [];
    }
  }, [segmentationType, allCustomers]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-xl space-y-2">
          <p className="font-semibold text-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            Customers: <span className="font-medium text-foreground">{data.value}</span>
          </p>
          {data.revenue && (
            <p className="text-sm text-muted-foreground">
              Total Revenue: <span className="font-medium text-green-600">${data.revenue.toLocaleString()}</span>
            </p>
          )}
          {data.avgRevenue && (
            <p className="text-sm text-muted-foreground">
              Avg Revenue: <span className="font-medium text-blue-600">${data.avgRevenue.toLocaleString()}</span>
            </p>
          )}
          {data.avgOrders && (
            <p className="text-sm text-muted-foreground">
              Avg Orders: <span className="font-medium text-purple-600">{data.avgOrders.toFixed(1)}</span>
            </p>
          )}
          {data.avgRating && (
            <p className="text-sm text-muted-foreground">
              Avg Rating: <span className="font-medium text-amber-600">{data.avgRating.toFixed(2)} ⭐</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const handleSegmentClick = (data: any) => {
    setSelectedSegment(selectedSegment === data.name ? null : data.name);
  };

  const renderChart = () => {
    if (segmentationType === 'rfm' && chartType !== 'scatter') {
      setChartType('scatter');
    }

    switch (chartType) {
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <defs>
                {colors.map((color, index) => (
                  <linearGradient key={index} id={`pieGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.4} />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={segmentedData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={60}
                paddingAngle={5}
                dataKey="value"
                onClick={handleSegmentClick}
                className="cursor-pointer"
              >
                {segmentedData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#pieGradient${index})`}
                    stroke={selectedSegment === entry.name ? colors[index] : 'transparent'}
                    strokeWidth={selectedSegment === entry.name ? 3 : 0}
                    className="transition-all duration-300 hover:opacity-80"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={segmentedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--aktina-primary))" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="hsl(var(--aktina-purple))" stopOpacity={0.4} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                fill="url(#barGradient)"
                radius={[8, 8, 0, 0]}
                onClick={handleSegmentClick}
                className="cursor-pointer transition-all duration-300 hover:opacity-80"
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={segmentedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Recency (Days)"
                className="text-xs"
                label={{ value: 'Days Since Last Order', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Frequency"
                className="text-xs"
                label={{ value: 'Order Frequency', angle: -90, position: 'insideLeft' }}
              />
              <ZAxis type="number" dataKey="z" range={[50, 400]} name="Monetary Value" />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-xl">
                        <p className="font-semibold">{data.name}</p>
                        <p className="text-sm">Recency: {data.recency} days</p>
                        <p className="text-sm">Frequency: {data.frequency} orders</p>
                        <p className="text-sm">Monetary: ${data.monetary.toLocaleString()}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter 
                dataKey="y" 
                fill="hsl(var(--aktina-primary))"
                fillOpacity={0.7}
                className="hover:opacity-100 transition-opacity duration-200"
              />
            </ScatterChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const selectedOption = segmentationOptions.find(opt => opt.value === segmentationType);

  return (
    <Card className="animate-scale-in glass-effect">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl bg-gradient-to-r from-aktina-primary to-aktina-purple bg-clip-text text-transparent">
              Customer Segmentation Analytics
            </CardTitle>
            <CardDescription>
              Advanced customer insights with interactive segmentation
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {selectedOption?.icon}
            <Badge className="bg-gradient-to-r from-aktina-primary to-aktina-blue text-white">
              {selectedOption?.label}
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <Select value={segmentationType} onValueChange={(value) => setSegmentationType(value as SegmentationType)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select segmentation" />
            </SelectTrigger>
            <SelectContent>
              {segmentationOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    {option.icon}
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {segmentationType !== 'rfm' && (
            <div className="flex gap-2">
              <Button
                variant={chartType === 'pie' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChartType('pie')}
                className="transition-all duration-200"
              >
                Pie Chart
              </Button>
              <Button
                variant={chartType === 'bar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChartType('bar')}
                className="transition-all duration-200"
              >
                Bar Chart
              </Button>
            </div>
          )}

          {segmentationType === 'rfm' && (
            <Badge className="bg-gradient-to-r from-aktina-amber to-aktina-orange text-white">
              RFM Scatter Plot
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {renderChart()}
          
          {selectedSegment && (
            <div className="p-4 bg-gradient-to-r from-aktina-primary/10 to-aktina-blue/10 rounded-lg border border-aktina-primary/20">
              <h4 className="font-semibold text-aktina-primary mb-2">
                Selected Segment: {selectedSegment}
              </h4>
              <p className="text-sm text-muted-foreground">
                Click on another segment to compare, or click the same segment to deselect.
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-aktina-primary">{allCustomers.length}</div>
              <div className="text-sm text-muted-foreground">Total Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-aktina-blue">
                {segmentedData.length > 0 ? segmentedData.length : 'N/A'}
              </div>
              <div className="text-sm text-muted-foreground">Segments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-aktina-purple">
                ${(allCustomers.reduce((sum, c) => sum + c.revenue, 0) / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-muted-foreground">Total Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-aktina-amber">
                {(allCustomers.reduce((sum, c) => sum + c.rating, 0) / allCustomers.length).toFixed(1)}⭐
              </div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerSegmentationChart;
