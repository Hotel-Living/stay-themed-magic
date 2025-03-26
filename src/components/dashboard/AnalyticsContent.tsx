
import React from 'react';
import { AnalyticsContainer } from './analytics/AnalyticsContainer';

export function AnalyticsContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <p className="text-foreground/70">
          Track performance metrics for your properties
        </p>
      </div>
      
      <AnalyticsContainer />
    </div>
  );
}

export default AnalyticsContent;
