
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import SupplierDashboard from './SupplierDashboard';
import ProductionDashboard from './ProductionDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardRouter: React.FC = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'supplier':
        return <SupplierDashboard />;
      case 'production':
        return <ProductionDashboard />;
      case 'hr':
        return <HRDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'wholesaler':
        return <WholesalerDashboard />;
      case 'retailer':
        return <RetailerDashboard />;
      default:
        return <SupplierDashboard />;
    }
  };

  return renderDashboard();
};

// Placeholder components for other roles
const HRDashboard: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold bg-gradient-to-r from-aktina-purple to-aktina-blue bg-clip-text text-transparent">
      HR Manager Dashboard
    </h1>
    <Card>
      <CardHeader>
        <CardTitle>Workforce Management</CardTitle>
        <CardDescription>Employee management, distribution, and analytics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-muted-foreground">HR dashboard with workforce analytics, staff allocation, and predictive insights would be implemented here</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

const AdminDashboard: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold bg-gradient-to-r from-aktina-red to-aktina-purple bg-clip-text text-transparent">
      System Administrator Dashboard
    </h1>
    <Card>
      <CardHeader>
        <CardTitle>Executive Overview</CardTitle>
        <CardDescription>Company-wide KPIs, economic analytics, and strategic insights</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Executive dashboard with financial analytics, performance metrics, and strategic AI would be implemented here</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

const WholesalerDashboard: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold bg-gradient-to-r from-aktina-amber to-aktina-primary bg-clip-text text-transparent">
      Wholesaler Dashboard
    </h1>
    <Card>
      <CardHeader>
        <CardTitle>Distribution Management</CardTitle>
        <CardDescription>Order processing, retailer management, and business analytics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Wholesaler dashboard with order management, retailer analytics, and market insights would be implemented here</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

const RetailerDashboard: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold bg-gradient-to-r from-aktina-forest to-aktina-blue bg-clip-text text-transparent">
      Retailer Dashboard
    </h1>
    <Card>
      <CardHeader>
        <CardTitle>Retail Operations</CardTitle>
        <CardDescription>Sales tracking, customer feedback, and market insights</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Retailer dashboard with sales analytics, customer feedback, and market intelligence would be implemented here</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default DashboardRouter;
