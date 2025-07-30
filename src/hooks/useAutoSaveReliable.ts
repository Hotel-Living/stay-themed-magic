import { useCallback, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { HotelRegistrationFormData } from "@/components/dashboard/hotel-registration/NewHotelRegistrationForm";

const AUTO_SAVE_INTERVAL = 30000; // 30 seconds
const MAX_STORAGE_SIZE = 4 * 1024 * 1024; // 4MB localStorage limit

// Fields that should NOT be auto-saved (images, large objects)
const EXCLUDED_FIELDS: Set<keyof HotelRegistrationFormData> = new Set([
  'photos', // Exclude images to prevent localStorage overflow
]);

// Create a safe subset of form data for auto-save
interface AutoSaveData {
  hotelName?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  email?: string;
  phone?: string;
  website?: string;
  classification?: string;
  propertyType?: string;
  propertyStyle?: string;
  hotelDescription?: string;
  roomDescription?: string;
  idealGuests?: string;
  atmosphere?: string;
  location?: string;
  hotelFeatures?: string[];
  roomFeatures?: string[];
  activities?: string[];
  clientAffinities?: string[];
  checkInDay?: string;
  mealPlan?: string;
  stayLengths?: string[];
  weeklyLaundryIncluded?: boolean;
  externalLaundryAvailable?: boolean;
  numberOfRooms?: string;
  price_per_month?: number;
  termsAccepted?: boolean;
  timestamp?: number;
  version?: string;
}

export function useAutoSaveReliable(
  formData: HotelRegistrationFormData,
  enabled: boolean = true
) {
  const { user } = useAuth();
  const lastSaveTimeRef = useRef<number>(0);
  const autoSaveIntervalRef = useRef<NodeJS.Timeout>();

  const getStorageKey = useCallback(() => {
    return `hotel_registration_autosave_${user?.id || 'anonymous'}`;
  }, [user?.id]);

  const createSafeFormData = useCallback((data: HotelRegistrationFormData): AutoSaveData => {
    const safeData: AutoSaveData = {};
    
    // Only include safe fields (exclude images and large objects)
    Object.keys(data).forEach(key => {
      const fieldKey = key as keyof HotelRegistrationFormData;
      
      if (!EXCLUDED_FIELDS.has(fieldKey)) {
        // Type-safe assignment
        (safeData as any)[fieldKey] = data[fieldKey];
      }
    });

    // Add metadata
    safeData.timestamp = Date.now();
    safeData.version = '2.0';

    return safeData;
  }, []);

  const checkStorageSize = useCallback((data: string): boolean => {
    const currentSize = new Blob([data]).size;
    return currentSize < MAX_STORAGE_SIZE;
  }, []);

  const saveDraft = useCallback(async () => {
    if (!user?.id || !enabled) {
      return { success: false, reason: 'Not authenticated or disabled' };
    }

    try {
      const now = Date.now();
      
      // Throttle saves to prevent excessive localStorage writes
      if (now - lastSaveTimeRef.current < 10000) { // Min 10 seconds between saves
        return { success: false, reason: 'Too frequent' };
      }

      const safeData = createSafeFormData(formData);
      const dataString = JSON.stringify(safeData);

      // Check if data size is reasonable
      if (!checkStorageSize(dataString)) {
        console.warn('[AUTO-SAVE] Data too large for localStorage');
        return { success: false, reason: 'Data too large' };
      }

      const storageKey = getStorageKey();
      localStorage.setItem(storageKey, dataString);
      
      lastSaveTimeRef.current = now;
      console.log('[AUTO-SAVE] Draft saved successfully at', new Date(now).toLocaleTimeString());
      
      return { success: true };
    } catch (error) {
      console.error('[AUTO-SAVE] Failed to save draft:', error);
      return { success: false, reason: error instanceof Error ? error.message : 'Unknown error' };
    }
  }, [user?.id, enabled, formData, createSafeFormData, checkStorageSize, getStorageKey]);

  const loadDraft = useCallback((): AutoSaveData | null => {
    if (!user?.id) {
      return null;
    }

    try {
      const storageKey = getStorageKey();
      const savedDraft = localStorage.getItem(storageKey);
      
      if (!savedDraft) {
        return null;
      }

      const parsedDraft = JSON.parse(savedDraft);
      
      // Version check
      if (parsedDraft.version !== '2.0') {
        console.warn('[AUTO-SAVE] Incompatible draft version, clearing old draft');
        clearDraft();
        return null;
      }

      // Age check (7 days max)
      const MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days
      if (parsedDraft.timestamp && (Date.now() - parsedDraft.timestamp) > MAX_AGE) {
        console.warn('[AUTO-SAVE] Draft too old, clearing');
        clearDraft();
        return null;
      }

      console.log('[AUTO-SAVE] Draft loaded successfully');
      return parsedDraft;
    } catch (error) {
      console.error('[AUTO-SAVE] Failed to load draft:', error);
      // Clear corrupted draft
      clearDraft();
      return null;
    }
  }, [user?.id, getStorageKey]);

  const clearDraft = useCallback(() => {
    if (!user?.id) {
      return;
    }

    try {
      const storageKey = getStorageKey();
      localStorage.removeItem(storageKey);
      console.log('[AUTO-SAVE] Draft cleared successfully');
    } catch (error) {
      console.error('[AUTO-SAVE] Failed to clear draft:', error);
    }
  }, [user?.id, getStorageKey]);

  const hasValidDraft = useCallback((): boolean => {
    const draft = loadDraft();
    return draft !== null && Object.keys(draft).length > 3; // More than just metadata
  }, [loadDraft]);

  const getDraftAge = useCallback((): number | null => {
    const draft = loadDraft();
    if (!draft?.timestamp) {
      return null;
    }
    return Date.now() - draft.timestamp;
  }, [loadDraft]);

  // Auto-save effect
  useEffect(() => {
    if (!enabled || !user?.id) {
      return;
    }

    // Clear any existing interval
    if (autoSaveIntervalRef.current) {
      clearInterval(autoSaveIntervalRef.current);
    }

    // Set up auto-save interval
    autoSaveIntervalRef.current = setInterval(() => {
      saveDraft();
    }, AUTO_SAVE_INTERVAL);

    // Clean up on unmount
    return () => {
      if (autoSaveIntervalRef.current) {
        clearInterval(autoSaveIntervalRef.current);
      }
    };
  }, [enabled, user?.id, saveDraft]);

  // Save immediately when form data changes (with throttling)
  useEffect(() => {
    if (!enabled || !user?.id) {
      return;
    }

    const timeoutId = setTimeout(() => {
      saveDraft();
    }, 5000); // Debounce 5 seconds

    return () => clearTimeout(timeoutId);
  }, [formData, enabled, user?.id, saveDraft]);

  return {
    saveDraft,
    loadDraft,
    clearDraft,
    hasValidDraft,
    getDraftAge,
    isEnabled: enabled && !!user?.id
  };
}