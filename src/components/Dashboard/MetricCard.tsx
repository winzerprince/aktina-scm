
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AnimatedCounter from './AnimatedCounter';

interface MetricCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  className?: string;
  delay?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  prefix = '',
  suffix = '',
  trend = 'neutral',
  trendValue,
  icon,
  className = '',
  delay = 0
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

  return (
    <Card 
      className={`card-hover border-0 shadow-md ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="h-4 w-4 text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          <AnimatedCounter
            end={value}
            prefix={prefix}
            suffix={suffix}
            duration={1500}
          />
        </div>
        {trendValue && (
          <div className="flex items-center pt-1">
            <Badge variant="secondary" className={`text-xs ${getTrendColor()}`}>
              <span className="mr-1">{getTrendIcon()}</span>
              {trendValue}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
