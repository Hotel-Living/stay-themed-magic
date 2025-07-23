
import { useCallback } from "react";
import { useAutoSave } from "@/hooks/useAutoSave";
import { PropertyFormData } from "./usePropertyFormData";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

export function usePropertyFormAutoSave(
  formData: PropertyFormData,
  setFormData: (data: PropertyFormData) => void,
  editingHotelId?: string | null
) {
  const { user } = useAuth();

  const saveDraft = useCallback(async (data: PropertyFormData) => {
    // Draft saving completely disabled
    return;
  }, []);

  const loadDraft = useCallback((): PropertyFormData | null => {
    // Draft loading completely disabled
    return null;
  }, []);

  const clearDraft = useCallback(() => {
    // Draft clearing completely disabled
    return;
  }, []);

  const autoSave = useAutoSave(formData, saveDraft, {
    interval: 30000,
    enabled: false // Auto-save completely disabled
  });

  return {
    ...autoSave,
    loadDraft,
    clearDraft
  };
}
