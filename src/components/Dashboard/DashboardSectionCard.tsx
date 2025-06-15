
import React from "react";
import { Card } from "@/components/ui/card";

interface DashboardSectionCardProps {
  children: React.ReactNode;
  className?: string;
}

const DashboardSectionCard: React.FC<DashboardSectionCardProps> = ({ children, className = "" }) => (
  <Card className={`rounded-3xl bg-white/70 backdrop-blur-lg border-0 shadow-2xl animate-scale-in glass-effect overflow-hidden ${className}`}>
    <div className="relative">
      {/* Glass/Liquid effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-aktina-blue/20 via-white/30 to-aktina-purple/10 blur-sm opacity-80" aria-hidden="true" />
      {/* Animated light spot */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-tr from-white/40 to-aktina-blue/10 rounded-full blur-2xl opacity-50 animate-pulse-slow" aria-hidden="true" />
      <div className="relative p-6">{children}</div>
    </div>
  </Card>
);

export default DashboardSectionCard;
