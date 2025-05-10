
import React from 'react';
import DashboardStats from "@/components/dashboard/user/tabs/dashboard/DashboardStats";
import { useDashboardData } from './hooks/useDashboardData';

export const AnalyticsContent = () => {
  const { bookingsCount, completedStaysCount, savedHotelsCount, isLoading } = useDashboardData();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics</h2>
      <DashboardStats
        bookingsCount={bookingsCount}
        completedStaysCount={completedStaysCount}
        savedHotelsCount={savedHotelsCount}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AnalyticsContent;
