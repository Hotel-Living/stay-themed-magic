
import React from 'react';
import { Card } from "@/components/ui/card";
import { Hotel } from "@/integrations/supabase/types-custom";

interface ThemesActivitiesProps {
  hotel: Hotel;
}

export const ThemesActivities = ({ hotel }: ThemesActivitiesProps) => {
  const hotelThemes = hotel.hotel_themes || [];
  const hotelActivities = hotel.hotel_activities || [];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 bg-[#2A0F44]">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Affinities</h3>
        <div className="flex flex-wrap gap-2">
          {hotelThemes.length > 0 ? (
            hotelThemes.map((theme) => (
              <span key={theme.theme_id} className="px-3 py-1 bg-fuchsia-900/50 rounded-full text-sm">
                {theme.themes?.name || "Unknown Theme"}
              </span>
            ))
          ) : (
            <p>No affinities specified</p>
          )}
        </div>
      </Card>

      <Card className="p-6 bg-[#2A0F44]">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Activities</h3>
        <div className="flex flex-wrap gap-2">
          {hotelActivities.length > 0 ? (
            hotelActivities.map((activity) => (
              <span key={activity.activity_id} className="px-3 py-1 bg-fuchsia-900/50 rounded-full text-sm">
                {activity.activities?.name || "Unknown Activity"}
              </span>
            ))
          ) : (
            <p>No activities specified</p>
          )}
        </div>
      </Card>
    </div>
  );
};
