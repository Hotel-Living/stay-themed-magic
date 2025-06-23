
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";

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
  const { toast } = useToast();
  const { t } = useTranslation();
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip auto-save on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!enabled || !formData) return;

    const timer = setTimeout(async () => {
      try {
        setIsSaving(true);
        await saveDraft(formData);
        setLastSaved(new Date());
        
        // Show subtle success indication
        toast({
          title: t('dashboard.autoSaveSuccess'),
          description: t('dashboard.draftSaved'),
          duration: 2000,
        });
      } catch (error) {
        console.error('Auto-save failed:', error);
        toast({
          title: t('dashboard.autoSaveError'),
          description: t('dashboard.draftSaveFailed'),
          variant: "destructive",
          duration: 3000,
        });
      } finally {
        setIsSaving(false);
      }
    }, interval);

    return () => clearTimeout(timer);
  }, [formData, saveDraft, interval, enabled, toast, t]);

  return {
    isSaving,
    lastSaved,
    forceSave: async () => {
      if (!formData) return;
      
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
