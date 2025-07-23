
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
    // Auto-save completely disabled
    return;
  }, []);

  return {
    isSaving,
    lastSaved,
    forceSave: async () => {
      // Force save completely disabled
      return;
    }
  };
}
