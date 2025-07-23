
import { useEffect, useRef, useState } from "react";

export interface AutoSaveOptions {
  interval?: number;
  enabled?: boolean;
}

export function useAutoSave<T>(
  formData: T,
  saveDraft: (data: T) => Promise<void> | void,
  options: AutoSaveOptions = {}
) {
  const { interval = 30000, enabled = true } = options;
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip auto-save on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // If auto-save is disabled, don't do anything
    if (!enabled || !formData) return;

    const timer = setTimeout(async () => {
      try {
        setIsSaving(true);
        await saveDraft(formData);
        setLastSaved(new Date());
        
        // Silent auto-save - no user notifications
      } catch (error) {
        console.error('Auto-save failed:', error);
        // Only show error messages for critical failures, not for routine auto-save
      } finally {
        setIsSaving(false);
      }
    }, interval);

    return () => clearTimeout(timer);
  }, [formData, saveDraft, interval, enabled]);

  return {
    isSaving: enabled ? isSaving : false,
    lastSaved: enabled ? lastSaved : null,
    forceSave: async () => {
      if (!formData || !enabled) return;
      
      try {
        setIsSaving(true);
        await saveDraft(formData);
        setLastSaved(new Date());
      } catch (error) {
        console.error('Force save failed:', error);
        throw error;
      } finally {
        setIsSaving(false);
      }
    }
  };
}
