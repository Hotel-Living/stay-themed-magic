
import React from "react";
import { useDashboardData } from "../../hooks/useDashboardData";
import DashboardStats from "./dashboard/DashboardStats";
import UpcomingStayCard from "./dashboard/UpcomingStayCard";
import RecentActivityCard from "./dashboard/RecentActivityCard";
import LoadingState from "./dashboard/LoadingState";

export default function DashboardContent() {
  const {
    upcomingStay,
    bookingsCount,
    completedStaysCount,
    savedHotelsCount,
    recentActivities,
    isLoading
  } = useDashboardData();
  
  if (isLoading) {
    return <LoadingState />;
  }
  
  return (
    <div>
      {/* Stats Section */}
      <DashboardStats 
        bookingsCount={bookingsCount}
        completedStaysCount={completedStaysCount}
        savedHotelsCount={savedHotelsCount}
        isLoading={isLoading}
      />
      
      {/* Upcoming Stay Section */}
      <UpcomingStayCard 
        upcomingStay={upcomingStay}
        isLoading={isLoading}
      />
      
      {/* Recent Activities Section */}
      <RecentActivityCard 
        activities={recentActivities}
        isLoading={isLoading}
      />
    </div>
  );
}
