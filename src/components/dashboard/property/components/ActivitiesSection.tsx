
import React, { useEffect, useState } from "react";
import { useActivities } from "@/hooks/useActivities";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

interface ActivitiesSectionProps {
  selectedActivities?: string[];
  onActivityChange?: (activityId: string, isSelected: boolean) => void;
}

export const ActivitiesSection = ({ 
  selectedActivities = [], 
  onActivityChange 
}: ActivitiesSectionProps) => {
  const { data: activities, isLoading } = useActivities();
  
  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Spinner size="sm" />
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return <p>No activities available</p>;
  }

  return (
    <div className="bg-[#5A1876]/15 rounded-lg p-4 border border-fuchsia-800/15">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start">
            <input
              type="checkbox"
              id={`activity-${activity.id}`}
              checked={selectedActivities.includes(activity.id)}
              onChange={(e) => {
                if (onActivityChange) {
                  onActivityChange(activity.id, e.target.checked);
                }
              }}
              className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 h-4 w-4 mt-0.5 mr-2"
            />
            <Label htmlFor={`activity-${activity.id}`} className="text-sm cursor-pointer">
              {activity.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
