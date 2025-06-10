
import { supabase } from "@/integrations/supabase/client";
import { PropertyFormData } from "../usePropertyFormData";
import { fetchCurrentHotelData } from "./updateExistingHotel/fetchCurrentHotelData";
import { prepareHotelData } from "./updateExistingHotel/prepareHotelData";
import { detectChanges } from "./updateExistingHotel/detectChanges";
import { validatePendingChanges } from "./updateExistingHotel/validatePendingChanges";
import { updateThemes, updateActivities } from "./updateExistingHotel/updateRelationships";
import { updateHotelTable } from "./updateExistingHotel/updateHotelTable";
import { sendAdminNotification } from "./updateExistingHotel/sendAdminNotification";

export const updateExistingHotel = async (formData: PropertyFormData, hotelId: string) => {
  console.log("Updating hotel with ID:", hotelId);
  console.log("Update data:", formData);
  
  // Fetch current hotel data including relationships
  const currentHotel = await fetchCurrentHotelData(hotelId);
  
  // Check if there are already pending changes
  validatePendingChanges(currentHotel);
  
  // Prepare the updated hotel data including relationship fields for comparison
  const updatedData = prepareHotelData(formData);
  
  // Detect changes between current and updated data
  const { pendingChanges, hasChanges } = detectChanges(currentHotel, updatedData);
  
  // If there are no changes, let the user know
  if (!hasChanges) {
    console.log("No changes detected in hotel data");
    return { id: hotelId, noChangesDetected: true };
  }
  
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
