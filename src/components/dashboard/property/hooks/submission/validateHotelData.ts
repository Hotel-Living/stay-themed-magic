
import { PropertyFormData } from "../usePropertyFormData";

/**
 * Validates hotel data before submission
 */
export const validateHotelData = (formData: PropertyFormData, currentHotel: any) => {
  // Check if there are already pending changes
  if (currentHotel.pending_changes && Object.keys(currentHotel.pending_changes).length > 0) {
    throw new Error("This hotel already has pending changes awaiting approval. Please wait for admin review before making additional changes.");
  }
  
  // Add any other validation logic here if needed
  return true;
};
