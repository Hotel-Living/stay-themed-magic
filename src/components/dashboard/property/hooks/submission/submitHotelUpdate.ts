
import { PropertyFormData } from "../usePropertyFormData";
import { updateThemes, updateActivities } from "./updateExistingHotel/updateRelationships";
import { updateHotelTable } from "./updateExistingHotel/updateHotelTable";
import { sendAdminNotification } from "./updateExistingHotel/sendAdminNotification";
import { supabase } from "@/integrations/supabase/client";

/**
 * Submits the hotel update to the database
 */
export const submitHotelUpdate = async (
  hotelId: string, 
  pendingChanges: Record<string, any>, 
  formData: PropertyFormData
) => {
  console.log("Detected changes:", pendingChanges);
  console.log("Number of changed fields:", Object.keys(pendingChanges).length);
  
  // Handle themes and activities changes immediately
  const changedThemes = pendingChanges.themes;
  const changedActivities = pendingChanges.activities;
  
  if (changedThemes !== undefined) {
    await updateThemes(hotelId, changedThemes);
  }
  
  if (changedActivities !== undefined) {
    await updateActivities(hotelId, changedActivities);
  }
  
  // Separate hotel table changes from relationship changes (which we've already handled)
  const { themes, activities, ...hotelTableChanges } = pendingChanges;
  
  // Store hotel table changes in pending_changes column and update status only if there are hotel table changes
  await updateHotelTable(hotelId, hotelTableChanges);
  
  // Send notification to admin about pending changes
  await sendAdminNotification(formData.hotelName);

  // Check if any translatable content has changed and trigger auto-translation
  const translatableFields = ['name', 'description', 'ideal_guests', 'atmosphere', 'perfect_location'];
  const hasTranslatableChanges = translatableFields.some(field => 
    hotelTableChanges[field] !== undefined || 
    (field === 'name' && hotelTableChanges['hotelName'] !== undefined)
  );

  if (hasTranslatableChanges) {
    // Trigger automatic translations asynchronously (non-blocking)
    setTimeout(async () => {
      try {
        const translationContent = {
          name: hotelTableChanges.hotelName || hotelTableChanges.name || formData.hotelName,
          description: hotelTableChanges.description || formData.description || undefined,
          ideal_guests: hotelTableChanges.ideal_guests || formData.idealGuests || undefined,
          atmosphere: hotelTableChanges.atmosphere || formData.atmosphere || undefined,
          perfect_location: hotelTableChanges.perfect_location || formData.perfectLocation || undefined
        };

        const targetLanguages: ('es' | 'pt' | 'ro')[] = ['es', 'pt', 'ro'];
        
        for (const language of targetLanguages) {
          try {
            await supabase.functions.invoke('translate-hotel-content', {
              body: {
                hotelId,
                targetLanguage: language,
                content: translationContent
              }
            });
            console.log(`Auto-translation triggered for updated hotel ${hotelId} in ${language}`);
          } catch (translationError) {
            console.warn(`Auto-translation failed for updated hotel ${hotelId} in ${language}:`, translationError);
            // Continue with other languages even if one fails
          }
        }
      } catch (error) {
        console.warn('Auto-translation process failed for hotel update:', error);
        // Fail silently to not affect the main hotel update workflow
      }
    }, 1000); // 1 second delay to ensure main workflow completes
  }
  
  return { id: hotelId, changes: Object.keys(pendingChanges).length };
};
