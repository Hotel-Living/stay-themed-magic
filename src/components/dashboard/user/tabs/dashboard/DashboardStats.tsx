
import React from "react";
import DashboardCard from "../../DashboardCard";
import { Calendar, CalendarCheck, Building } from "lucide-react";

interface DashboardStatsProps {
  bookingsCount: number;
  completedStaysCount: number;
  savedHotelsCount: number;
  isLoading: boolean;
}

export default function DashboardStats({
  bookingsCount,
  completedStaysCount,
  savedHotelsCount,
  isLoading
}: DashboardStatsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="animate-pulse h-28 bg-fuchsia-500/10 rounded-xl"></div>
        <div className="animate-pulse h-28 bg-fuchsia-500/10 rounded-xl"></div>
        <div className="animate-pulse h-28 bg-fuchsia-500/10 rounded-xl"></div>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <DashboardCard 
        title="Upcoming Stay" 
        value={bookingsCount.toString()} 
        icon={<Calendar className="w-6 h-6" />} 
        color="fuchsia" 
      />
      <DashboardCard 
        title="Completed Stays" 
        value={completedStaysCount.toString()} 
        icon={<CalendarCheck className="w-6 h-6" />} 
        color="cyan" 
      />
      <DashboardCard 
        title="Saved Hotels" 
        value={savedHotelsCount.toString()} 
        icon={<Building className="w-6 h-6" />} 
        color="amber" 
      />
    </div>
  );
}
