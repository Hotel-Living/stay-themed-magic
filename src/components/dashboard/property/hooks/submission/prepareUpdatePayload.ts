
import { PropertyFormData } from "../usePropertyFormData";
import { prepareHotelData } from "./updateExistingHotel/prepareHotelData";
import { detectChanges } from "./updateExistingHotel/detectChanges";

/**
 * Prepares the update payload for hotel submission
 */
export const prepareUpdatePayload = (formData: PropertyFormData, currentHotel: any) => {
  // Prepare the updated hotel data including relationship fields for comparison
  const updatedData = prepareHotelData(formData);
  
  // Detect changes between current and updated data
  const { pendingChanges, hasChanges } = detectChanges(currentHotel, updatedData);
  
  return {
    updatedData,
    pendingChanges,
    hasChanges
  };
};
