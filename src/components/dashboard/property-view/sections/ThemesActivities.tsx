
import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Hotel } from "@/integrations/supabase/types-custom";
import { supabase } from "@/integrations/supabase/client";

interface ThemesActivitiesProps {
  hotel: Hotel;
}

interface ActivityItem {
  id: string;
  name: string;
}

export const ThemesActivities = ({ hotel }: ThemesActivitiesProps) => {
  const hotelThemes = hotel.hotel_themes || [];
  const hotelActivities = hotel.hotel_activities || [];
  const [activityNames, setActivityNames] = useState<Record<string, string>>({});
  
  // Fetch activity names for display
  useEffect(() => {
    const fetchActivityNames = async () => {
      if (hotelActivities.length === 0) return;
      
      try {
        const activityIds = hotelActivities.map(activity => activity.activity_id);
        const { data, error } = await supabase
          .from('activities')
          .select('id, name')
          .in('id', activityIds);
          
        if (error) {
          throw error;
        }
        
        const namesMap: Record<string, string> = {};
        (data as ActivityItem[]).forEach(activity => {
          namesMap[activity.id] = activity.name;
        });
        
        setActivityNames(namesMap);
      } catch (error) {
        console.error('Error fetching activity names:', error);
      }
    };
    
    fetchActivityNames();
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
            hotelActivities.map((activity) => (
              <span key={activity.activity_id} className="px-3 py-1 bg-[#AACAFE]/70 rounded-full text-sm text-[#3300B0]">
                {activityNames[activity.activity_id] || activity.activities?.name || "Unknown Activity"}
              </span>
            ))
          ) : (
            <p className="text-[#3300B0]">No activities specified</p>
          )}
        </div>
      </Card>
    </div>
  );
}

