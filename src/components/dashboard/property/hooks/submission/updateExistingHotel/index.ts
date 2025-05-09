
import { supabase } from "@/integrations/supabase/client";
import { PropertyFormData } from "../../usePropertyFormData";
import { prepareHotelData } from "./prepareHotelData";
import { detectChanges } from "./detectChanges";
import { notifyAdmin } from "./notifyAdmin";

/**
 * Main function to update an existing hotel with all new data
 */
export const updateExistingHotel = async (formData: PropertyFormData, hotelId: string) => {
  console.log("Updating hotel with ID:", hotelId);
  console.log("Update data:", formData);
  
  // First, get the current hotel data to determine what has changed
  const { data: currentHotel, error: fetchError } = await supabase
    .from('hotels')
    .select('*')
    .eq('id', hotelId)
    .single();
  
  if (fetchError) {
    console.error("Error fetching current hotel data:", fetchError);
    throw fetchError;
  }
  
  // Check if there are already pending changes
  if (currentHotel.pending_changes && Object.keys(currentHotel.pending_changes).length > 0) {
    throw new Error("This hotel already has pending changes awaiting approval. Please wait for admin review before making additional changes.");
  }
  
  // Prepare the updated hotel data from form data
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
  
  // Store changes in pending_changes column and update status
  const { error } = await supabase
    .from('hotels')
    .update({
      pending_changes: pendingChanges,
      status: 'pending'
    })
    .eq('id', hotelId);
  
  if (error) {
    console.error("Error updating hotel with pending changes:", error);
    throw error;
  }
  
  // Send notification to admin about pending changes
  await notifyAdmin(formData.hotelName);
  
  return { 
    id: hotelId, 
    changes: Object.keys(pendingChanges).length 
  };
};
