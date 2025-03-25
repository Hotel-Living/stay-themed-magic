
import React from 'react';
import QuickStats from './sections/QuickStats';
import RecentBookings from './sections/RecentBookings';
import RecentReviews from './sections/RecentReviews';
import QuickActions from './sections/QuickActions';
import { mockBookings } from './data/mockData';

export default function DashboardContent() {
  const handlePropertyTabClick = () => {
    const propertyTab = document.querySelector('button[data-tab="addProperty"]');
    if (propertyTab instanceof HTMLElement) {
      propertyTab.click();
    }
  };
  
  return (
    <>
      <QuickStats handlePropertyTabClick={handlePropertyTabClick} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <RecentBookings bookings={mockBookings} />
        <RecentReviews />
      </div>
      
      <QuickActions handlePropertyTabClick={handlePropertyTabClick} />
    </>
  );
}
