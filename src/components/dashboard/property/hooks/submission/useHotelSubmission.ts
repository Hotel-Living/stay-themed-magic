
import { createNewHotel } from "./createNewHotel";
import { updateExistingHotel } from "./updateExistingHotel";

/**
 * Hook for managing hotel submission operations
 */
export const useHotelSubmission = () => {
  return {
    createNewHotel,
    updateExistingHotel
  };
};
