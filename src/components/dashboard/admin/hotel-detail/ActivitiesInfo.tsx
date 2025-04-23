import React from "react";
import { Globe } from "lucide-react";
import { AdminHotelDetail } from "@/types/hotel";

interface ActivitiesInfoProps {
  activities: AdminHotelDetail['hotel_activities'];
}

export function ActivitiesInfo({ activities }: ActivitiesInfoProps) {
  return (
    <div className="rounded-xl p-6 bg-[#2A0F44]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700 flex items-center gap-2">
        <Globe className="w-5 h-5 text-purple-400" />
        Activities
      </h3>
      {activities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {activities.map((activity) => (
            <div key={activity.activity_id} className="p-3 border border-purple-500/20 rounded-lg bg-purple-900/20">
              <p className="font-medium">{activity.activities?.name || "Unknown Activity"}</p>
              <p className="text-sm text-purple-300">{activity.activities?.category || "No category"}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No activities associated with this hotel.</p>
      )}
    </div>
  );
}
