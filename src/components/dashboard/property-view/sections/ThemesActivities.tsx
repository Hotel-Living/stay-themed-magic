
import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Hotel } from "@/integrations/supabase/types-custom";
import { supabase } from "@/integrations/supabase/client";

interface ActivityData {
  id: string;
  name: string;
}

interface ThemesActivitiesProps {
  hotel: Hotel;
}

export const ThemesActivities = ({ hotel }: ThemesActivitiesProps) => {
  const hotelThemes = hotel.hotel_themes || [];
  const hotelActivities = hotel.hotel_activities || [];
  
  console.log("ThemesActivities - Hotel themes:", hotelThemes);
  console.log("ThemesActivities - Hotel activities:", hotelActivities);
  
  const [activitiesData, setActivitiesData] = useState<Record<string, string>>({});
  
  // Fetch activity names
  useEffect(() => {
    const fetchActivitiesData = async () => {
      if (hotelActivities.length === 0) {
        console.log("ThemesActivities - No activities to fetch");
        return;
      }
      
      const activityIds = hotelActivities.map(activity => activity.activity_id).filter(Boolean);
      console.log("ThemesActivities - Activity IDs to fetch:", activityIds);
      
      if (activityIds.length === 0) {
        console.log("ThemesActivities - No valid activity IDs found");
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('activities')
          .select('id, name')
          .in('id', activityIds);
          
        if (error) {
          console.error("ThemesActivities - Error fetching activities data:", error);
          return;
        }
        
        console.log("ThemesActivities - Fetched activities data:", data);
        
        const activitiesMap: Record<string, string> = {};
        data?.forEach((activity: ActivityData) => {
          activitiesMap[activity.id] = activity.name;
        });
        
        console.log("ThemesActivities - Activities map:", activitiesMap);
        setActivitiesData(activitiesMap);
      } catch (error) {
        console.error("ThemesActivities - Error in fetchActivitiesData:", error);
      }
    };
    
    fetchActivitiesData();
  }, [hotelActivities]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 bg-[#AACAFE]/30">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-[#3300B0]/30 text-[#3300B0]">Affinities</h3>
        <div className="flex flex-wrap gap-2">
          {hotelThemes.length > 0 ? (
            hotelThemes.map((theme) => (
              <span key={theme.theme_id} className="px-3 py-1 bg-[#AACAFE]/70 rounded-full text-sm text-[#3300B0]">
                {theme.themes?.name || "Unknown Theme"}
              </span>
            ))
          ) : (
            <p className="text-[#3300B0]">No affinities specified</p>
          )}
        </div>
      </Card>

      <Card className="p-6 bg-[#AACAFE]/30">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-[#3300B0]/30 text-[#3300B0]">Activities</h3>
        <div className="flex flex-wrap gap-2">
          {hotelActivities.length > 0 ? (
            hotelActivities.map((activity) => {
              const activityName = activitiesData[activity.activity_id] || activity.activities?.name || "Unknown Activity";
              console.log("ThemesActivities - Rendering activity:", activity.activity_id, "->", activityName);
              
              return (
                <span key={activity.activity_id} className="px-3 py-1 bg-[#AACAFE]/70 rounded-full text-sm text-[#3300B0]">
                  {activityName}
                </span>
              );
            })
          ) : (
            <div>
              <p className="text-[#3300B0]">No activities specified</p>
              <p className="text-xs text-gray-500 mt-1">Debug: {JSON.stringify(hotelActivities)}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
