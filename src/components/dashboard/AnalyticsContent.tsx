
import React from 'react';
import { BarChart3 } from 'lucide-react';
import EmptyState from './EmptyState';

export const AnalyticsContent = () => {
  return (
    <EmptyState 
      icon={<BarChart3 className="w-8 h-8" />}
      title="Analytics Coming Soon"
      description="Detailed analytics about your properties, bookings, and revenue will be available here. Check back soon for insights into your business performance."
    />
  );
};

export default AnalyticsContent;
