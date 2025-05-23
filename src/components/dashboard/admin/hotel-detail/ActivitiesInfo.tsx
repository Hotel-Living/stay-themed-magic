
import React from "react";
import { Activity } from "lucide-react";
import { AdminHotelDetail } from "@/types/hotel";

interface ActivitiesInfoProps {
  activities: AdminHotelDetail['hotel_activities'];
}

export function ActivitiesInfo({ activities }: ActivitiesInfoProps) {
  console.log("ActivitiesInfo - Raw activities data:", activities);
  
  // Ensure activities is always an array and filter out any empty entries
  const validActivities = Array.isArray(activities) 
    ? activities.filter(activity => {
        console.log("ActivitiesInfo - Processing activity:", activity);
        return activity && (activity.activity_id || activity.activities);
      })
    : [];
  
  console.log("ActivitiesInfo - Valid activities after filtering:", validActivities);
  
  return (
    <div className="rounded-xl p-6 bg-[#5d0083]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700 flex items-center gap-2">
        <Activity className="w-5 h-5 text-purple-400" />
        Activities
      </h3>
      {validActivities && validActivities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {validActivities.map((activity, index) => {
            console.log("ActivitiesInfo - Rendering activity:", activity);
            const activityName = activity.activities?.name || activity.activity_id || `Activity ${index + 1}`;
            const activityCategory = activity.activities?.category || "Uncategorized";
            
            return (
              <div key={activity.activity_id || index} className="p-3 border border-purple-700/30 rounded-lg bg-purple-900/20">
                <p className="font-medium text-purple-300">
                  {activityName}
                </p>
                {activityCategory && (
                  <p className="text-xs text-fuchsia-400 mt-2">Category: {activityCategory}</p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-gray-400">No activities associated with this hotel.</p>
          <p className="text-xs text-gray-500 mt-2">Activities data: {JSON.stringify(activities)}</p>
        </div>
      )}
    </div>
  );
}
