
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';

interface ChartCardProps {
  title: string;
  description?: string;
  data: any[];
  type: 'line' | 'bar' | 'pie' | 'area';
  dataKey: string;
  xAxisKey?: string;
  color?: string;
  className?: string;
  gradient?: boolean;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  description,
  data,
  type,
  dataKey,
  xAxisKey = 'name',
  color = 'hsl(var(--aktina-primary))',
  className = '',
  gradient = true
}) => {
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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-xl">
          <p className="font-medium text-foreground">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={color} />
                  <stop offset="100%" stopColor="hsl(var(--aktina-purple))" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey={xAxisKey} 
                className="text-xs" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                className="text-xs" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke={gradient ? "url(#lineGradient)" : color}
                strokeWidth={3}
                dot={{ fill: color, strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: color, strokeWidth: 2, fill: 'white' }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey={xAxisKey} 
                className="text-xs" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                className="text-xs" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey={dataKey} 
                stroke={color}
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#areaGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} />
                  <stop offset="100%" stopColor="hsl(var(--aktina-purple))" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey={xAxisKey} 
                className="text-xs" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                className="text-xs" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey={dataKey} 
                fill={gradient ? "url(#barGradient)" : color}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <defs>
                {colors.map((color, index) => (
                  <linearGradient key={index} id={`pieGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={color} />
                    <stop offset="100%" stopColor={colors[(index + 1) % colors.length]} />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey={dataKey}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={gradient ? `url(#pieGradient${index})` : colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className={`animate-scale-in card-hover glass-effect ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg bg-gradient-to-r from-aktina-primary to-aktina-purple bg-clip-text text-transparent">
          {title}
        </CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
