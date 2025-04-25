
import { supabase } from "@/integrations/supabase/client";
import { format, parse } from "date-fns";

export const useRelatedDataSubmission = () => {
  const generateAvailableMonths = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    const availableMonths = [];
    for (let i = 0; i < 6; i++) {
      const monthIndex = (currentMonth + i) % 12;
      availableMonths.push(months[monthIndex]);
    }

    return availableMonths;
  };

  const handleThemesAndActivities = async (hotelId: string, themes: string[], activities: string[]) => {
    if (themes && themes.length > 0) {
      await supabase
        .from('hotel_themes')
        .delete()
        .eq('hotel_id', hotelId);

      const themeRows = themes.map(themeId => ({
        hotel_id: hotelId,
        theme_id: themeId
      }));
      
      if (themeRows.length > 0) {
        await supabase.from('hotel_themes').insert(themeRows);
      }
    }

    if (activities && activities.length > 0) {
      await supabase
        .from('hotel_activities')
        .delete()
        .eq('hotel_id', hotelId);

      const activityRows = activities.map(activityId => ({
        hotel_id: hotelId,
        activity_id: activityId
      }));
      
      if (activityRows.length > 0) {
        await supabase.from('hotel_activities').insert(activityRows);
      }
    }
  };

  const handleAvailability = async (hotelId: string, stayLengths: number[]) => {
    if (stayLengths && stayLengths.length > 0) {
      // Generate properly formatted month names with first letter capitalized
      const availableMonths = generateAvailableMonths();
      
      await supabase
        .from('hotels')
        .update({ available_months: availableMonths })
        .eq('id', hotelId);
      
      const currentYear = new Date().getFullYear();
      const availabilityRows = availableMonths.map(month => {
        const firstDayOfMonth = parse(`01 ${month} ${currentYear}`, 'dd MMMM yyyy', new Date());
        const formattedDate = format(firstDayOfMonth, 'yyyy-MM-dd');
        return {
          hotel_id: hotelId,
          availability_month: month.toLowerCase(), // Store lowercase in this field
          availability_year: currentYear,
          availability_date: formattedDate,
          is_full_month: true,
          preferred_weekday: 'Monday',
        };
      });

      if (availabilityRows.length > 0) {
        await supabase.from('hotel_availability').insert(availabilityRows);
      }
    }
  };

  return {
    handleThemesAndActivities,
    handleAvailability,
    generateAvailableMonths
  };
};
