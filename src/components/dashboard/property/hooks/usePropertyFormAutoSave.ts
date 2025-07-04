
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
    if (!user?.id) return;

    const draftKey = editingHotelId 
      ? `property_draft_edit_${editingHotelId}` 
      : `property_draft_new_${user.id}`;

    // Save to localStorage as fallback
    localStorage.setItem(draftKey, JSON.stringify({
      data,
      timestamp: Date.now(),
      userId: user.id
    }));

    // Optionally save to server (if you have a drafts table)
    // This could be implemented later for cross-device sync
  }, [user?.id, editingHotelId]);

  const loadDraft = useCallback((): PropertyFormData | null => {
    if (!user?.id) return null;

    const draftKey = editingHotelId 
      ? `property_draft_edit_${editingHotelId}` 
      : `property_draft_new_${user.id}`;

    try {
      const saved = localStorage.getItem(draftKey);
      if (!saved) return null;

      const parsed = JSON.parse(saved);
      
      // Check if draft is not too old (e.g., 7 days)
      const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
      if (parsed.timestamp < weekAgo) {
        localStorage.removeItem(draftKey);
        return null;
      }

      // Verify draft belongs to current user
      if (parsed.userId !== user.id) {
        return null;
      }

      return parsed.data;
    } catch (error) {
      console.error('Error loading draft:', error);
      return null;
    }
  }, [user?.id, editingHotelId]);

  const clearDraft = useCallback(() => {
    if (!user?.id) return;

    const draftKey = editingHotelId 
      ? `property_draft_edit_${editingHotelId}` 
      : `property_draft_new_${user.id}`;

    localStorage.removeItem(draftKey);
  }, [user?.id, editingHotelId]);

  const autoSave = useAutoSave(formData, saveDraft, {
    interval: 30000, // 30 seconds
    enabled: !!user?.id
  });

  return {
    ...autoSave,
    loadDraft,
    clearDraft
  };
}
