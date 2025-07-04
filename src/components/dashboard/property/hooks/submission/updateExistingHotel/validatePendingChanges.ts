
import { supabase } from "@/integrations/supabase/client";

/**
 * Validates that the hotel doesn't already have pending changes
 */
export const validatePendingChanges = (currentHotel: any) => {
  if (currentHotel.pending_changes && Object.keys(currentHotel.pending_changes).length > 0) {
    throw new Error("This hotel already has pending changes awaiting approval. Please wait for admin review before making additional changes.");
  }
};
