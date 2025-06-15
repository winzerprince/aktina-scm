
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface AnalyticsCardProps {
  title: string;
  description?: string;
  value: number;
  target?: number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  percentage?: number;
  unit?: string;
  prefix?: string;
  className?: string;
  delay?: number;
  gradient?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  description,
  value,
  target,
  trend = 'neutral',
  trendValue,
  percentage,
  unit = '',
  prefix = '',
  className = '',
  delay = 0,
  gradient = 'from-aktina-blue to-aktina-purple'
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'bg-gradient-to-r from-emerald-500 to-green-500 text-white';
      case 'down': return 'bg-gradient-to-r from-red-500 to-rose-500 text-white';
      default: return 'bg-gradient-to-r from-slate-500 to-gray-500 text-white';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  };

  const progressPercentage = target ? (value / target) * 100 : percentage || 0;

  return (
    <Card 
      className={`animate-bounce-in card-hover relative overflow-hidden ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`} />
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-10 translate-x-10" />
      
      <CardHeader className="pb-3 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
          {title}
          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${gradient} animate-pulse`} />
        </CardTitle>
        {description && <CardDescription className="text-xs">{description}</CardDescription>}
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className={`text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
              {prefix}{value.toLocaleString()}{unit}
            </span>
            {target && (
              <span className="text-sm text-muted-foreground">
                / {prefix}{target.toLocaleString()}{unit}
              </span>
            )}
          </div>
          
          {(target || percentage !== undefined) && (
            <div className="space-y-2">
              <Progress 
                value={progressPercentage} 
                className="h-2 bg-muted"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{progressPercentage.toFixed(1)}% Complete</span>
                {target && <span>Target: {prefix}{target.toLocaleString()}{unit}</span>}
              </div>
            </div>
          )}
          
          {trendValue && (
            <Badge className={`text-xs ${getTrendColor()} border-0 shadow-lg`}>
              <span className="mr-1 text-sm">{getTrendIcon()}</span>
              {trendValue}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
