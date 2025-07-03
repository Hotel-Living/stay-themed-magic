
import { createNewHotel } from "./createNewHotel";
import { updateExistingHotel } from "./updateExistingHotel";
import { useAtomicHotelSubmission } from "./useAtomicHotelSubmission";

/**
 * Hook for managing hotel submission operations
 * Now includes atomic submission system to prevent data loss
 */
export const useHotelSubmission = () => {
  const { createHotelAtomically } = useAtomicHotelSubmission();
  
  return {
    createNewHotel: createHotelAtomically, // Use atomic submission
    updateExistingHotel
  };
};
