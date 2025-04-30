
import { supabase } from "@/integrations/supabase/client";
import { format, parse } from "date-fns";
import { handleSupabaseError } from "@/utils/errorHandling";
import { toast } from "@/hooks/use-toast";

export const useRelatedDataSubmission = () => {
  const handleThemesAndActivities = async (hotelId: string, themes: string[], activities: string[]) => {
    console.log("Handling themes and activities for hotel:", hotelId, { themes, activities });
    
    // Handle themes - we'll map string IDs to UUIDs from the database if needed
    if (themes && themes.length > 0) {
      try {
        // Delete existing themes first
        const { error: deleteThemesError } = await supabase
          .from('hotel_themes')
          .delete()
          .eq('hotel_id', hotelId);
          
        if (deleteThemesError) {
          console.error("Error deleting existing themes:", deleteThemesError);
          throw deleteThemesError;
        }

        // First, fetch all themes from the database to get valid theme IDs
        const { data: themeData, error: themeError } = await supabase
          .from('themes')
          .select('id, name')
          .order('name');
          
        if (themeError) {
          console.error("Error fetching themes:", themeError);
          throw themeError;
        }

        // Create theme mapping and prepare for insertion
        let validThemeRows = [];
        
        if (themeData && themeData.length > 0) {
          // Create a mapping of theme name to database UUID
          const themeMap = new Map();
          
          // Map all themes by name lowercase for better matching
          themeData.forEach(theme => {
            if (theme.name) {
              themeMap.set(theme.name.toLowerCase(), theme.id);
              
              // Also map common variations/shorthands
              if (theme.name.toLowerCase() === "art & design") {
                themeMap.set("art", theme.id);
                themeMap.set("design", theme.id);
              }
              if (theme.name.toLowerCase() === "technology") {
                themeMap.set("digital", theme.id);
                themeMap.set("innovation", theme.id);
              }
            }
          });
          
          console.log("Theme mapping created with entries:", themeMap.size);
          
          // Create a fallback theme ID (use first theme as default)
          const fallbackThemeId = themeData[0].id;
          
          // Process each theme from the form
          validThemeRows = themes.map(themeId => {
            // Direct UUID handling
            const validUUIDRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            if (validUUIDRegex.test(themeId)) {
              return { hotel_id: hotelId, theme_id: themeId };
            }
            
            // Convert to lowercase for case-insensitive matching
            const lowercaseThemeId = themeId.toLowerCase();
            
            // Try direct map lookup
            let mappedId = themeMap.get(lowercaseThemeId);
            
            // Special handling for common themes that might not directly map
            if (!mappedId) {
              // Handle Innovation explicitly since it's causing issues
              if (lowercaseThemeId === "innovation") {
                // Find a technology related theme
                const techTheme = themeData.find(t => 
                  t.name && ["technology", "tech", "digital"].includes(t.name.toLowerCase())
                );
                if (techTheme) {
                  mappedId = techTheme.id;
                  console.log(`Mapped "innovation" to "${techTheme.name}" theme`);
                }
              }
              
              // Try partial matching if still not found
              if (!mappedId) {
                // Find a theme that contains our theme ID as a substring
                const matchedTheme = themeData.find(theme => 
                  theme.name && theme.name.toLowerCase().includes(lowercaseThemeId)
                );
                
                if (matchedTheme) {
                  mappedId = matchedTheme.id;
                  console.log(`Mapped "${themeId}" to "${matchedTheme.name}" via substring match`);
                }
              }
              
              // Try word similarity if still not found (check if any words match)
              if (!mappedId) {
                const themeWords = lowercaseThemeId.split(/[\s-_]+/);
                
                for (const theme of themeData) {
                  if (theme.name) {
                    const themeNameWords = theme.name.toLowerCase().split(/[\s-_]+/);
                    // Check if any words match between the theme names
                    const hasCommonWord = themeWords.some(word => 
                      themeNameWords.some(nameWord => nameWord.includes(word) || word.includes(nameWord))
                    );
                    
                    if (hasCommonWord) {
                      mappedId = theme.id;
                      console.log(`Mapped "${themeId}" to "${theme.name}" via word similarity`);
                      break;
                    }
                  }
                }
              }
            }
            
            // Use the mapped ID if found, otherwise use fallback
            if (mappedId) {
              return { hotel_id: hotelId, theme_id: mappedId };
            } else {
              console.warn(`Could not map theme "${themeId}" to any known theme, using fallback`);
              return { hotel_id: hotelId, theme_id: fallbackThemeId };
            }
          });
          
          // Deduplicate theme rows (in case multiple string IDs map to same UUID)
          const uniqueThemeIds = new Set();
          validThemeRows = validThemeRows.filter(row => {
            if (uniqueThemeIds.has(row.theme_id)) {
              return false;
            }
            uniqueThemeIds.add(row.theme_id);
            return true;
          });
        }
        
        console.log(`Processed ${themes.length} themes, created ${validThemeRows.length} valid rows`);
        
        // Only insert if we have valid theme rows
        if (validThemeRows.length > 0) {
          const { error: insertThemesError } = await supabase
            .from('hotel_themes')
            .insert(validThemeRows);
            
          if (insertThemesError) {
            console.error("Error inserting themes:", insertThemesError);
            throw insertThemesError;
          } else {
            console.log("Successfully inserted themes:", validThemeRows.length);
          }
        }
      } catch (error) {
        console.error("Error processing themes:", error);
        throw error;
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
        throw error;
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
