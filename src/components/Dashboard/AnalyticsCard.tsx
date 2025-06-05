
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
  className = ''
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'down': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
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
    <Card className={`animate-fade-in ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {description && <CardDescription className="text-xs">{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{prefix}{value.toLocaleString()}{unit}</span>
            {target && (
              <span className="text-sm text-muted-foreground">/ {prefix}{target.toLocaleString()}{unit}</span>
            )}
          </div>
          
          {(target || percentage !== undefined) && (
            <div className="space-y-1">
              <Progress value={progressPercentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{progressPercentage.toFixed(1)}% Complete</span>
                {target && <span>Target: {prefix}{target.toLocaleString()}{unit}</span>}
              </div>
            </div>
          )}
          
          {trendValue && (
            <Badge variant="secondary" className={`text-xs ${getTrendColor()}`}>
              <span className="mr-1">{getTrendIcon()}</span>
              {trendValue}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
