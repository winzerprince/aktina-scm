
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import SupplierDashboard from './SupplierDashboard';
import ProductionDashboard from './ProductionDashboard';
import HRDashboard from './HRDashboard';
import AdminDashboard from './AdminDashboard';
import WholesalerDashboard from './WholesalerDashboard';
import RetailerDashboard from './RetailerDashboard';

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

export default DashboardRouter;
