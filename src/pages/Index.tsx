
import React from 'react';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';
import Header from '../components/Layout/Header';
import DashboardRouter from '../components/Dashboard/DashboardRouter';

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-aktina-primary/10 to-aktina-blue/10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-aktina-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <DashboardRouter />
      </main>
    </div>
  );
};

export default Index;
