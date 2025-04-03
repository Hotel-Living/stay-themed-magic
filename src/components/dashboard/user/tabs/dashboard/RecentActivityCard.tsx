
import React from "react";
import { Clock } from "lucide-react";
import ActivityItem from "../../ActivityItem";
import { RecentActivity } from "../../../types/dashboard";

interface RecentActivityCardProps {
  activities: RecentActivity[];
  isLoading: boolean;
}

export default function RecentActivityCard({ activities, isLoading }: RecentActivityCardProps) {
  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-fuchsia-900/20 bg-[#5c0869]">
          <h2 className="text-xl font-bold">Recent Activity</h2>
        </div>
        <div className="animate-pulse">
          <div className="h-24 border-b border-fuchsia-900/20 p-4"></div>
          <div className="h-24 border-b border-fuchsia-900/20 p-4"></div>
          <div className="h-24 p-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-fuchsia-900/20 bg-[#5c0869]">
        <h2 className="text-xl font-bold">Recent Activity</h2>
      </div>
      
      <div className="divide-y divide-fuchsia-900/10">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <ActivityItem 
              key={index}
              iconName={activity.iconName} 
              title={activity.title} 
              description={activity.description} 
              time={activity.time} 
            />
          ))
        ) : (
          <div className="text-center py-8">
            <Clock className="w-8 h-8 mx-auto mb-3 text-fuchsia-400/50" />
            <h3 className="text-lg font-bold mb-2">No recent activity</h3>
            <p className="text-muted-foreground">Your recent actions will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
