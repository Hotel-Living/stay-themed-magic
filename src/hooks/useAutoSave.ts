
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
    if (!enabled || isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timeoutId = setTimeout(async () => {
      if (!isSaving) {
        setIsSaving(true);
        try {
          await saveDraft(formData);
          setLastSaved(new Date());
        } catch (error) {
          console.error('Auto-save failed:', error);
        } finally {
          setIsSaving(false);
        }
      }
    }, interval);

    return () => clearTimeout(timeoutId);
  }, [formData, saveDraft, interval, enabled, isSaving]);

  return {
    isSaving,
    lastSaved,
    forceSave: async () => {
      if (!isSaving) {
        setIsSaving(true);
        try {
          await saveDraft(formData);
          setLastSaved(new Date());
        } catch (error) {
          console.error('Force save failed:', error);
        } finally {
          setIsSaving(false);
        }
      }
    }
  };
}
