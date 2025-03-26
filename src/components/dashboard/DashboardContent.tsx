
import React from 'react';
import QuickStats from './sections/QuickStats';
import RecentBookings from './sections/RecentBookings';
import RecentReviews from './sections/RecentReviews';
import QuickActions from './sections/QuickActions';
import { mockBookings } from './data/mockData';
import { BarChart3Icon, MessageSquare, PresentationIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

export default function DashboardContent() {
  const location = useLocation();
  const isHotelDashboard = location.pathname !== '/dashboard';

  const handlePropertyTabClick = () => {
    const propertyTab = document.querySelector('button[data-tab="propertyManagement"]');
    if (propertyTab instanceof HTMLElement) {
      propertyTab.click();
    } else {
      const addPropertyTab = document.querySelector('button[data-tab="addProperty"]');
      if (addPropertyTab instanceof HTMLElement) {
        addPropertyTab.click();
      }
    }
  };
  
  const handleAnalyticsTabClick = () => {
    const analyticsTab = document.querySelector('button[data-tab="analytics"]');
    if (analyticsTab instanceof HTMLElement) {
      analyticsTab.click();
    }
  };
  
  const handlePromotionsTabClick = () => {
    const promotionsTab = document.querySelector('button[data-tab="promotions"]');
    if (promotionsTab instanceof HTMLElement) {
      promotionsTab.click();
    }
  };
  
  const handleReviewsTabClick = () => {
    const reviewsTab = document.querySelector('button[data-tab="reviews"]');
    if (reviewsTab instanceof HTMLElement) {
      reviewsTab.click();
    }
  };
  
  return (
    <>
      <QuickStats handlePropertyTabClick={handlePropertyTabClick} />
      
      {isHotelDashboard && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass-card rounded-xl p-4 bg-gradient-to-br from-blue-900/40 to-blue-800/20 hover:from-blue-900/50 hover:to-blue-800/30 transition-colors border border-blue-800/30">
            <div className="flex items-center space-x-2 mb-3">
              <BarChart3Icon className="w-5 h-5 text-blue-400" />
              <h3 className="font-medium">Analytics & Insights</h3>
            </div>
            <p className="text-sm text-foreground/80 mb-4">
              Track your property performance with comprehensive analytics
            </p>
            <Button 
              variant="outline" 
              className="w-full justify-center border-blue-400/30 hover:border-blue-400/60 hover:bg-blue-900/30"
              onClick={handleAnalyticsTabClick}
            >
              View Analytics
            </Button>
          </div>
          
          <div className="glass-card rounded-xl p-4 bg-gradient-to-br from-purple-900/40 to-purple-800/20 hover:from-purple-900/50 hover:to-purple-800/30 transition-colors border border-purple-800/30">
            <div className="flex items-center space-x-2 mb-3">
              <PresentationIcon className="w-5 h-5 text-purple-400" />
              <h3 className="font-medium">Create Promotions</h3>
            </div>
            <p className="text-sm text-foreground/80 mb-4">
              Create special offers and discounts to attract more bookings
            </p>
            <Button 
              variant="outline" 
              className="w-full justify-center border-purple-400/30 hover:border-purple-400/60 hover:bg-purple-900/30"
              onClick={handlePromotionsTabClick}
            >
              Manage Promotions
            </Button>
          </div>
          
          <div className="glass-card rounded-xl p-4 bg-gradient-to-br from-green-900/40 to-green-800/20 hover:from-green-900/50 hover:to-green-800/30 transition-colors border border-green-800/30">
            <div className="flex items-center space-x-2 mb-3">
              <MessageSquare className="w-5 h-5 text-green-400" />
              <h3 className="font-medium">Review Management</h3>
            </div>
            <p className="text-sm text-foreground/80 mb-4">
              Respond to guest reviews and improve your property ratings
            </p>
            <Button 
              variant="outline" 
              className="w-full justify-center border-green-400/30 hover:border-green-400/60 hover:bg-green-900/30"
              onClick={handleReviewsTabClick}
            >
              Manage Reviews
            </Button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <RecentBookings bookings={mockBookings} />
        <RecentReviews />
      </div>
      
      <QuickActions handlePropertyTabClick={handlePropertyTabClick} />
    </>
  );
}
