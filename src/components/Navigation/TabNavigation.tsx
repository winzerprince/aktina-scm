
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Tab {
  id: string;
  label: string;
  badge?: number;
  icon?: React.ReactNode;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = ''
}) => {
  return (
    <div className={`flex space-x-1 bg-muted p-1 rounded-lg ${className}`}>
      {tabs.map((tab, index) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "ghost"}
          size="sm"
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center space-x-2 transition-all duration-200 ${
            activeTab === tab.id 
              ? 'bg-aktina-primary text-white shadow-md scale-105' 
              : 'hover:bg-card hover:shadow-sm'
          }`}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
          <span>{tab.label}</span>
          {tab.badge && tab.badge > 0 && (
            <Badge 
              variant="secondary" 
              className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-aktina-red text-white"
            >
              {tab.badge}
            </Badge>
          )}
        </Button>
      ))}
    </div>
  );
};

export default TabNavigation;
