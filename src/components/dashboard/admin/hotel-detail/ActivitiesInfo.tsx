
import React from "react";
import { Activity } from "lucide-react";
import { AdminHotelDetail } from "@/types/hotel";

interface ActivitiesInfoProps {
  activities: AdminHotelDetail['hotel_activities'];
}

export function ActivitiesInfo({ activities }: ActivitiesInfoProps) {
  // Ensure activities is always an array and filter out any empty entries
  const validActivities = Array.isArray(activities) 
    ? activities.filter(activity => activity && activity.activity_id && activity.activities)
    : [];
  
  return (
    <div className="rounded-xl p-6 bg-[#5d0083]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700 flex items-center gap-2">
        <Activity className="w-5 h-5 text-purple-400" />
        Activities
      </h3>
      {validActivities && validActivities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {validActivities.map((activity) => (
            <div key={activity.activity_id} className="p-3 border border-purple-700/30 rounded-lg bg-purple-900/20">
              <p className="font-medium text-purple-300">
                {activity.activities?.name || "Unknown Activity"}
              </p>
              {activity.activities?.category && (
                <p className="text-xs text-fuchsia-400 mt-2">Category: {activity.activities.category}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No activities associated with this hotel.</p>
      )}
    </div>
  );
}
