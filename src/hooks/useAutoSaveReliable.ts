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
  // Image URLs (not files) for persistence
  photoUrls?: {
    hotel?: string[];
    room?: string[];
  };
  timestamp?: number;
  version?: string;
}

export function useAutoSaveReliable(
  formData: HotelRegistrationFormData,
  enabled: boolean = true
) {
  const { user, session } = useAuth();
  const lastSaveTimeRef = useRef<number>(0);
  const autoSaveIntervalRef = useRef<NodeJS.Timeout>();

  const getStorageKey = useCallback(() => {
    const userId = user?.id || session?.user?.id;
    if (userId) {
      return `hotel_registration_reliable_${userId}`;
    }
    
    // Fallback: try to detect user from existing localStorage keys
    const keys = Object.keys(localStorage);
    const hotelKey = keys.find(key => key.startsWith('hotel_registration_reliable_'));
    return hotelKey || 'hotel_registration_reliable_temp';
  }, [user?.id, session?.user?.id]);

  const createSafeFormData = useCallback((data: HotelRegistrationFormData): AutoSaveData => {
    const safeData: AutoSaveData = {};
    
    // Only include safe fields (exclude files but include image URLs)
    Object.keys(data).forEach(key => {
      const fieldKey = key as keyof HotelRegistrationFormData;
      
      if (!EXCLUDED_FIELDS.has(fieldKey)) {
        // Type-safe assignment
        (safeData as any)[fieldKey] = data[fieldKey];
      }
    });

    // Extract image URLs for persistence (not the files)
    if (data.photos) {
      safeData.photoUrls = {
        hotel: (data.photos.hotel || []).map(img => 
          typeof img === 'string' ? img : img?.url || ''
        ).filter(Boolean),
        room: (data.photos.room || []).map(img => 
          typeof img === 'string' ? img : img?.url || ''
        ).filter(Boolean)
      };
    }

    // Add metadata
    safeData.timestamp = Date.now();
    safeData.version = '2.1'; // Bump version for image URL support

    return safeData;
  }, []);

  const checkStorageSize = useCallback((data: string): boolean => {
    const currentSize = new Blob([data]).size;
    return currentSize < MAX_STORAGE_SIZE;
  }, []);

  const saveDraft = useCallback(async () => {
    // Allow saving even when user context is loading, but require some form of user identification
    const userId = user?.id || session?.user?.id;
    if (!enabled || (!userId && !getStorageKey().includes('temp'))) {
      return { success: false, reason: 'User not identified or auto-save disabled' };
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
  }, [formData, getStorageKey, user?.id, session?.user?.id]);

  const hasValidDraftData = useCallback((draft: AutoSaveData | null): boolean => {
    if (!draft) return false;
    
    // Check for meaningful form data (exclude metadata fields)
    const meaningfulFields = ['hotelName', 'address', 'city', 'country', 'phone', 'email', 'website', 'hotelDescription'];
    
    return meaningfulFields.some(field => {
      const value = draft[field as keyof AutoSaveData];
      return value && typeof value === 'string' && value.trim().length > 0;
    }) || (draft.photoUrls && (
      (draft.photoUrls.hotel && draft.photoUrls.hotel.length > 0) ||
      (draft.photoUrls.room && draft.photoUrls.room.length > 0)
    ));
  }, []);

  const loadDraft = useCallback((): AutoSaveData | null => {
    try {
      const storageKey = getStorageKey();
      const savedDraft = localStorage.getItem(storageKey);
      
      if (!savedDraft) {
        return null;
      }

      const parsedDraft = JSON.parse(savedDraft);
      
      // Version check (support both 2.0 and 2.1)
      if (parsedDraft.version !== '2.0' && parsedDraft.version !== '2.1') {
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

      // Only log and return if there's valid data
      if (hasValidDraftData(parsedDraft)) {
        console.log('[AUTO-SAVE] Draft loaded successfully');
        return parsedDraft;
      }
      
      return null;
    } catch (error) {
      console.error('[AUTO-SAVE] Failed to load draft:', error);
      // Clear corrupted draft
      clearDraft();
      return null;
    }
  }, [getStorageKey, hasValidDraftData]);

  const clearDraft = useCallback(() => {
    try {
      const storageKey = getStorageKey();
      localStorage.removeItem(storageKey);
      console.log('[AUTO-SAVE] Draft cleared successfully');
    } catch (error) {
      console.error('[AUTO-SAVE] Failed to clear draft:', error);
    }
  }, [getStorageKey]);

  const hasValidDraft = useCallback((): boolean => {
    const draft = loadDraft();
    return hasValidDraftData(draft);
  }, [loadDraft, hasValidDraftData]);

  const getDraftAge = useCallback((): number | null => {
    const draft = loadDraft();
    if (!draft?.timestamp) {
      return null;
    }
    return Date.now() - draft.timestamp;
  }, [loadDraft]);

  // Auto-save effect - work even when auth is loading
  useEffect(() => {
    const userId = user?.id || session?.user?.id;
    if (!enabled || !userId) {
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
  }, [enabled, user?.id, session?.user?.id, saveDraft]);

  // Save immediately when form data changes (with throttling)
  useEffect(() => {
    const userId = user?.id || session?.user?.id;
    if (!enabled || !userId) {
      return;
    }

    const timeoutId = setTimeout(() => {
      saveDraft();
    }, 5000); // Debounce 5 seconds

    return () => clearTimeout(timeoutId);
  }, [formData, enabled, user?.id, session?.user?.id, saveDraft]);

  return {
    saveDraft,
    loadDraft,
    clearDraft,
    hasValidDraft,
    hasValidDraftData,
    getDraftAge,
    isEnabled: enabled && !!(user?.id || session?.user?.id)
  };
}