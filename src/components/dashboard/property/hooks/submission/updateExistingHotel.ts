
import { PropertyFormData } from "../usePropertyFormData";
import { fetchCurrentHotelData } from "./updateExistingHotel/fetchCurrentHotelData";
import { validateHotelData } from "./validateHotelData";
import { prepareUpdatePayload } from "./prepareUpdatePayload";
import { submitHotelUpdate } from "./submitHotelUpdate";

export const updateExistingHotel = async (formData: PropertyFormData, hotelId: string) => {
  console.log("Updating hotel with ID:", hotelId);
  console.log("Update data:", formData);
  
  // Fetch current hotel data including relationships
  const currentHotel = await fetchCurrentHotelData(hotelId);
  
  // Validate hotel data before proceeding
  validateHotelData(formData, currentHotel);
  
  // Prepare the update payload
  const { pendingChanges, hasChanges } = prepareUpdatePayload(formData, currentHotel);
  
  // If there are no changes, let the user know
  if (!hasChanges) {
    console.log("No changes detected in hotel data");
    return { id: hotelId, noChangesDetected: true };
  }
  
  // Submit the hotel update
  return await submitHotelUpdate(hotelId, pendingChanges, formData);
};
