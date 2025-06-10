
import { PropertyFormData } from "../usePropertyFormData";
import { updateThemes, updateActivities } from "./updateExistingHotel/updateRelationships";
import { updateHotelTable } from "./updateExistingHotel/updateHotelTable";
import { sendAdminNotification } from "./updateExistingHotel/sendAdminNotification";

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
  
  return { id: hotelId, changes: Object.keys(pendingChanges).length };
};
