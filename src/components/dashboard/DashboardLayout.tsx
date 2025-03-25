
import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <div className="container mx-auto">{children}</div>;
}
