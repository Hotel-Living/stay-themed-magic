
import { supabase } from "@/integrations/supabase/client";
import { format, parse } from "date-fns";
import { handleSupabaseError } from "@/utils/errorHandling";
import { useToast } from "@/hooks/use-toast";

export const useRelatedDataSubmission = () => {
  const handleThemesAndActivities = async (hotelId: string, themes: string[], activities: string[]) => {
    console.log("Starting theme and activity processing for hotel:", hotelId);
    
    // Handle themes - ensuring we have valid UUIDs for database submission
    if (themes && themes.length > 0) {
      try {
        // Get all valid themes from database FIRST
        const { data: allThemesData, error: themesError } = await supabase
          .from('themes')
          .select('id, name')
          .order('name');
        
        if (themesError) {
          console.error("Error fetching themes from database:", themesError);
          throw new Error("Unable to fetch themes from database");
        }
        
        console.log(`Found ${allThemesData?.length || 0} themes in database`);
        
        // Delete existing themes for this hotel
        const { error: deleteThemesError } = await supabase
          .from('hotel_themes')
          .delete()
          .eq('hotel_id', hotelId);
        
        if (deleteThemesError) {
          console.error("Error deleting existing hotel themes:", deleteThemesError);
          throw deleteThemesError;
        }

        // If no themes were found in the database, we can't proceed with theme mapping
        if (!allThemesData || allThemesData.length === 0) {
          console.warn("No themes found in database to map selected themes to");
          return;
        }

        // Create a mapping for theme lookup with more sophisticated matching
        const themeMap = new Map();
        const themeNameToIdMap = new Map();
        
        // Create both a direct map and a lowercase map for case-insensitive matching
        allThemesData.forEach(theme => {
          if (theme.id && theme.name) {
            themeMap.set(theme.id, theme);
            themeNameToIdMap.set(theme.name.toLowerCase(), theme.id);
            
            // Add common alternatives for better matching
            if (theme.name.toLowerCase() === "art & design") {
              themeNameToIdMap.set("art", theme.id);
              themeNameToIdMap.set("design", theme.id);
            }
            if (theme.name.toLowerCase() === "technology") {
              themeNameToIdMap.set("innovation", theme.id);
              themeNameToIdMap.set("digital", theme.id);
              themeNameToIdMap.set("tech", theme.id);
            }
            if (theme.name.toLowerCase() === "music") {
              themeNameToIdMap.set("symphonic", theme.id);
              themeNameToIdMap.set("classical", theme.id);
              themeNameToIdMap.set("rock", theme.id);
              themeNameToIdMap.set("pop", theme.id);
            }
            if (theme.name.toLowerCase() === "sports") {
              themeNameToIdMap.set("golf", theme.id);
              themeNameToIdMap.set("tennis", theme.id);
              themeNameToIdMap.set("swimming", theme.id);
              themeNameToIdMap.set("yoga", theme.id);
            }
            if (theme.name.toLowerCase() === "photography") {
              themeNameToIdMap.set("photography", theme.id);
              themeNameToIdMap.set("photo", theme.id);
              themeNameToIdMap.set("photos", theme.id);
            }
          }
        });

        // Default to first theme as fallback if no match found
        const defaultThemeId = allThemesData[0].id;
        
        // Process and validate theme IDs - converting strings to valid UUIDs
        const validThemeRows = [];
        const processedThemeIds = new Set(); // To prevent duplicates
        
        for (const themeId of themes) {
          // Skip empty theme IDs
          if (!themeId) continue;
          
          let finalThemeId = null;
          
          // Check if it's already a valid UUID
          const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          if (typeof themeId === 'string' && UUID_REGEX.test(themeId.trim())) {
            // It's already a valid UUID, check if it exists in our map
            if (themeMap.has(themeId)) {
              finalThemeId = themeId;
            }
          } 
          
          // If not a valid UUID or doesn't exist, try to map by name
          if (!finalThemeId) {
            const lowercaseTheme = themeId.toLowerCase();
            
            // Try direct match first
            if (themeNameToIdMap.has(lowercaseTheme)) {
              finalThemeId = themeNameToIdMap.get(lowercaseTheme);
            } 
            // If no direct match, try partial matching
            else {
              // Look for theme that contains this as a substring
              for (const [themeName, id] of themeNameToIdMap.entries()) {
                if (themeName.includes(lowercaseTheme) || lowercaseTheme.includes(themeName)) {
                  finalThemeId = id;
                  console.log(`Mapped "${themeId}" to theme with ID ${id} via substring match`);
                  break;
                }
              }
              
              // If still no match, look for word similarity
              if (!finalThemeId) {
                const themeWords = lowercaseTheme.split(/\s+/);
                for (const [themeName, id] of themeNameToIdMap.entries()) {
                  const nameWords = themeName.split(/\s+/);
                  const hasCommonWord = themeWords.some(word => 
                    nameWords.some(nameWord => nameWord.includes(word) || word.includes(nameWord))
                  );
                  
                  if (hasCommonWord) {
                    finalThemeId = id;
                    console.log(`Mapped "${themeId}" to theme with ID ${id} via word similarity`);
                    break;
                  }
                }
              }
            }
          }
          
          // If we still don't have a valid ID, use the default
          if (!finalThemeId) {
            console.warn(`Could not map theme "${themeId}" to any known theme, using default theme`);
            finalThemeId = defaultThemeId;
          }
          
          // Add to our processed set if not already there
          if (!processedThemeIds.has(finalThemeId)) {
            processedThemeIds.add(finalThemeId);
            validThemeRows.push({
              hotel_id: hotelId,
              theme_id: finalThemeId
            });
          }
        }
        
        // If we have valid theme rows after processing, insert them
        if (validThemeRows.length > 0) {
          console.log(`Inserting ${validThemeRows.length} valid theme rows`);
          const { error: insertError } = await supabase
            .from('hotel_themes')
            .insert(validThemeRows);
            
          if (insertError) {
            console.error("Error inserting hotel themes:", insertError);
            throw insertError;
          }
          
          console.log(`Successfully inserted ${validThemeRows.length} themes`);
        } else {
          console.warn("No valid themes to insert after processing");
          
          // Always insert at least one default theme to prevent validation errors
          const { error: insertDefaultError } = await supabase
            .from('hotel_themes')
            .insert([{ hotel_id: hotelId, theme_id: defaultThemeId }]);
            
          if (insertDefaultError) {
            console.error("Error inserting default theme:", insertDefaultError);
          } else {
            console.log("Inserted default theme as fallback");
          }
        }
      } catch (error) {
        console.error("Error processing themes:", error);
        // Don't rethrow here - we want to continue with activities even if themes fail
      }
    }

    // Handle activities with strict UUID validation
    if (activities && activities.length > 0) {
      try {
        // Delete existing activities first
        const { error: deleteActivitiesError } = await supabase
          .from('hotel_activities')
          .delete()
          .eq('hotel_id', hotelId);
          
        if (deleteActivitiesError) {
          console.error("Error deleting existing activities:", deleteActivitiesError);
          throw deleteActivitiesError;
        }

        console.log("Activities before filtering:", activities);
        
        // Strict UUID validation using regex
        const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        
        // Remove any non-UUID values including category names like "museums"
        const validActivities = activities.filter(id => {
          if (!id) {
            console.warn("Filtering out null/undefined activity ID");
            return false;
          }
          
          const isValid = typeof id === 'string' && UUID_REGEX.test(id.trim());
          
          if (!isValid) {
            console.warn(`Invalid activity ID skipped (not a UUID): "${id}" (type: ${typeof id})`);
          }
          return isValid;
        });

        console.log("Filtered valid activities:", validActivities);
        
        if (validActivities.length === 0) {
          console.warn("No valid activities to insert after filtering");
          return; // Exit early if no valid activities
        }

        // Create rows for insertion with only valid UUIDs
        const activityRows = validActivities.map(activityId => ({
          hotel_id: hotelId,
          activity_id: activityId
        }));
        
        console.log("Activity rows to insert:", activityRows);
        
        const { error: insertActivitiesError } = await supabase
          .from('hotel_activities')
          .insert(activityRows);
          
        if (insertActivitiesError) {
          console.error("Error inserting activities:", insertActivitiesError);
          throw insertActivitiesError;
        } else {
          console.log("Successfully inserted activities:", activityRows.length);
        }
      } catch (error) {
        console.error("Critical error processing activities:", error);
        // Don't rethrow - we want the form to submit even if activities have issues
      }
    }
  };

  const handleAvailability = async (hotelId: string, stayLengths: number[]) => {
    if (stayLengths && stayLengths.length > 0) {
      // Get the selected months from the hotel submission
      const { data: hotelData, error: hotelError } = await supabase
        .from('hotels')
        .select('available_months, preferredWeekday')
        .eq('id', hotelId)
        .single();
        
      if (hotelError) {
        console.error("Error fetching hotel available months:", hotelError);
        return;
      }
      
      // Use the available months data from the hotel record
      const availableMonths = hotelData?.available_months || [];
      const preferredWeekday = hotelData?.preferredWeekday || 'Monday';
      
      console.log("Available months for hotel:", availableMonths);
      
      // Clear existing hotel availability entries
      await supabase
        .from('hotel_availability')
        .delete()
        .eq('hotel_id', hotelId);
      
      // Only create entries if there are actual months selected
      if (availableMonths.length > 0) {
        const currentYear = new Date().getFullYear();
        const availabilityRows = availableMonths.map(month => {
          // Ensure month name is properly capitalized
          const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
          
          try {
            // Try to parse the date - this might fail if the month name format is unexpected
            const firstDayOfMonth = parse(`01 ${capitalizedMonth} ${currentYear}`, 'dd MMMM yyyy', new Date());
            const formattedDate = format(firstDayOfMonth, 'yyyy-MM-dd');
            
            return {
              hotel_id: hotelId,
              availability_month: month.toLowerCase(), // Store lowercase in this field
              availability_year: currentYear,
              availability_date: formattedDate,
              is_full_month: true,
              preferred_weekday: preferredWeekday,
            };
          } catch (error) {
            console.error(`Error parsing month ${month}:`, error);
            return null;
          }
        }).filter(Boolean); // Filter out any null entries from parsing errors

        if (availabilityRows.length > 0) {
          const { data, error } = await supabase.from('hotel_availability').insert(availabilityRows);
          if (error) {
            console.error("Error inserting availability:", error);
          } else {
            console.log("Successfully inserted availability:", availabilityRows.length);
          }
        }
      }
    }
  };

  return {
    handleThemesAndActivities,
    handleAvailability
  };
};
