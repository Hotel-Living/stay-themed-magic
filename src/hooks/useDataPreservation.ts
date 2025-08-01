import { useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { HotelRegistrationFormData } from '@/components/dashboard/hotel-registration/NewHotelRegistrationForm';

interface SubmissionPayload {
  hotelData: any;
  availabilityPackages: any[];
  hotelImages: any[];
  hotelThemes: string[];
  hotelActivities: string[];
  formData: HotelRegistrationFormData;
  timestamp: number;
  attemptCount: number;
  userId?: string;
}

interface SubmissionAttempt {
  id: string;
  timestamp: number;
  success: boolean;
  error?: string;
  payload: SubmissionPayload;
}

interface SubmissionState {
  isSubmitting: boolean;
  hasFailedSubmission: boolean;
  lastFailedPayload: SubmissionPayload | null;
  submissionComplete: boolean;
  retryCount: number;
}

export function useDataPreservation() {
  const { user } = useAuth();
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    isSubmitting: false,
    hasFailedSubmission: false,
    lastFailedPayload: null,
    submissionComplete: false,
    retryCount: 0
  });

  const getStorageKey = useCallback(() => {
    return `hotel_registration_failed_submission_${user?.id || 'anonymous'}`;
  }, [user?.id]);

  const saveFailedSubmission = useCallback(async (payload: SubmissionPayload, error: string) => {
    try {
      const failedSubmission: SubmissionAttempt = {
        id: `attempt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        timestamp: Date.now(),
        success: false,
        error,
        payload
      };

      // Save to localStorage for immediate retry capability
      localStorage.setItem(getStorageKey(), JSON.stringify(failedSubmission));
      
      // Log to admin system
      await logSubmissionFailure(failedSubmission);
      
      setSubmissionState(prev => ({
        ...prev,
        hasFailedSubmission: true,
        lastFailedPayload: payload,
        isSubmitting: false
      }));

      console.log('[DATA-PRESERVATION] Failed submission saved locally:', failedSubmission.id);
      return true;
    } catch (saveError) {
      console.error('[DATA-PRESERVATION] Failed to save submission locally:', saveError);
      return false;
    }
  }, [getStorageKey, user?.id]);

  const logSubmissionFailure = useCallback(async (attempt: SubmissionAttempt) => {
    try {
      const logData = {
        timestamp: new Date(attempt.timestamp).toISOString(),
        user_id: user?.id || null,
        attempt_id: attempt.id,
        payload_summary: {
          hotel_name: attempt.payload.formData.hotelName || 'Unknown',
          payload_size_kb: Math.round(JSON.stringify(attempt.payload).length / 1024),
          image_count: attempt.payload.hotelImages.length,
          completed_fields: Object.keys(attempt.payload.formData).filter(key => 
            attempt.payload.formData[key as keyof HotelRegistrationFormData] !== '' && 
            attempt.payload.formData[key as keyof HotelRegistrationFormData] !== null &&
            attempt.payload.formData[key as keyof HotelRegistrationFormData] !== undefined
          ).length,
          attempt_count: attempt.payload.attemptCount
        },
        error_message: attempt.error,
        error_type: 'hotel_registration_failure',
        status: 'failed'
      };

      // Log to admin_messages table for admin review
      const { error: logError } = await supabase
        .from('admin_messages')
        .insert({
          user_id: user?.id,
          subject: `Hotel Registration Submission Failure - ${attempt.payload.formData.hotelName}`,
          message: `
Failed submission attempt details:

Hotel Name: ${attempt.payload.formData.hotelName}
User ID: ${user?.id || 'Anonymous'}
Attempt ID: ${attempt.id}
Timestamp: ${logData.timestamp}
Attempt Count: ${attempt.payload.attemptCount}

Payload Summary:
- Size: ${logData.payload_summary.payload_size_kb} KB
- Images: ${logData.payload_summary.image_count}
- Completed Fields: ${logData.payload_summary.completed_fields}

Error Details:
${attempt.error}

Payload Preview:
${JSON.stringify(logData.payload_summary, null, 2)}
          `,
          status: 'pending'
        });

      if (logError) {
        console.error('[DATA-PRESERVATION] Failed to log to admin_messages:', logError);
      } else {
        console.log('[DATA-PRESERVATION] Failure logged to admin system');
      }
    } catch (error) {
      console.error('[DATA-PRESERVATION] Failed to log submission failure:', error);
    }
  }, [user?.id]);

  const submitToSupabase = useCallback(async (payload: SubmissionPayload): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('[DATA-PRESERVATION] Attempting submission to Supabase for authenticated hotel user');
      console.log('[DATA-PRESERVATION] User authenticated:', !!user?.id);
      
      // Ensure we have the authenticated user's ID for ownership
      if (!payload.hotelData.owner_id && user?.id) {
        payload.hotelData.owner_id = user.id;
        console.log('[DATA-PRESERVATION] Set owner_id to authenticated user:', user.id);
      }
      
      const { data: response, error } = await supabase.rpc('submit_hotel_registration', {
        hotel_data: payload.hotelData,
        availability_packages: payload.availabilityPackages,
        hotel_images: payload.hotelImages,
        hotel_themes: payload.hotelThemes,
        hotel_activities: payload.hotelActivities
      });

      // After successful hotel registration, trigger automatic translations
      if (response?.success && response?.hotel_id) {
        console.log('[DATA-PRESERVATION] Hotel registration successful, triggering auto-translations for hotel:', response.hotel_id);
        
        try {
          // Import the auto-translation hook
          const { useAutoTranslation } = await import('@/hooks/useAutoTranslation');
          const { triggerAutoTranslations } = useAutoTranslation();
          
          // Prepare content for translation
          const contentForTranslation = {
            name: payload.hotelData.name,
            description: payload.hotelData.description,
            ideal_guests: payload.hotelData.ideal_guests,
            atmosphere: payload.hotelData.atmosphere,
            perfect_location: payload.hotelData.perfect_location
          };
          
          // Trigger translations for all target languages
          await triggerAutoTranslations(response.hotel_id, contentForTranslation);
          console.log('[DATA-PRESERVATION] Auto-translations triggered successfully');
        } catch (translationError) {
          console.warn('[DATA-PRESERVATION] Auto-translation failed, but hotel registration was successful:', translationError);
          // Don't fail the entire process if translation fails
        }
      }

      if (error) {
        console.error('[DATA-PRESERVATION] Supabase RPC Error Details:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        throw new Error(`Submission Error: ${error.message}`);
      }

      // Check if response indicates failure
      if ((response as any)?.success === false) {
        const serverError = (response as any)?.message || 'Server rejected submission';
        console.error('[DATA-PRESERVATION] Server Response Error:', serverError);
        throw new Error(`Server Error: ${serverError}`);
      }

      console.log('[DATA-PRESERVATION] Submission successful to Supabase - hotel data saved and forwarded to admin panel');
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.message || 'Unknown submission error';
      console.error('[DATA-PRESERVATION] Complete submission failure:', {
        error: errorMessage,
        userId: user?.id,
        hotelName: payload.hotelData.name,
        timestamp: new Date().toISOString()
      });
      return { success: false, error: errorMessage };
    }
  }, [user?.id]);

  const submitWithPreservation = useCallback(async (
    formData: HotelRegistrationFormData,
    hotelData: any,
    availabilityPackages: any[],
    hotelImages: any[],
    hotelThemes: string[],
    hotelActivities: string[]
  ): Promise<{ success: boolean; error?: string }> => {
    setSubmissionState(prev => ({ ...prev, isSubmitting: true }));
    
    const payload: SubmissionPayload = {
      hotelData,
      availabilityPackages,
      hotelImages,
      hotelThemes,
      hotelActivities,
      formData,
      timestamp: Date.now(),
      attemptCount: submissionState.retryCount + 1,
      userId: user?.id
    };

    const result = await submitToSupabase(payload);
    
    if (result.success) {
      // Clear any failed submissions on success
      clearFailedSubmission();
      setSubmissionState(prev => ({
        ...prev,
        isSubmitting: false,
        submissionComplete: true,
        hasFailedSubmission: false,
        lastFailedPayload: null,
        retryCount: 0
      }));
      
      console.log('[DATA-PRESERVATION] Submission completed successfully');
      return { success: true };
    } else {
      // Save failed submission for retry
      await saveFailedSubmission(payload, result.error || 'Unknown error');
      return { success: false, error: result.error };
    }
  }, [user?.id, submissionState.retryCount, submitToSupabase, saveFailedSubmission]);

  const retryFailedSubmission = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    if (!submissionState.lastFailedPayload) {
      return { success: false, error: 'No failed submission to retry' };
    }

    setSubmissionState(prev => ({ 
      ...prev, 
      isSubmitting: true,
      retryCount: prev.retryCount + 1
    }));

    // Update attempt count for retry
    const retryPayload: SubmissionPayload = {
      ...submissionState.lastFailedPayload,
      attemptCount: submissionState.retryCount + 1,
      timestamp: Date.now()
    };

    const result = await submitToSupabase(retryPayload);
    
    if (result.success) {
      clearFailedSubmission();
      setSubmissionState(prev => ({
        ...prev,
        isSubmitting: false,
        submissionComplete: true,
        hasFailedSubmission: false,
        lastFailedPayload: null,
        retryCount: 0
      }));
      
      console.log('[DATA-PRESERVATION] Retry submission completed successfully');
      return { success: true };
    } else {
      // Update failed submission with new attempt
      await saveFailedSubmission(retryPayload, result.error || 'Retry failed');
      return { success: false, error: result.error };
    }
  }, [submissionState.lastFailedPayload, submissionState.retryCount, submitToSupabase, saveFailedSubmission]);

  const clearFailedSubmission = useCallback(() => {
    try {
      localStorage.removeItem(getStorageKey());
      setSubmissionState(prev => ({
        ...prev,
        hasFailedSubmission: false,
        lastFailedPayload: null,
        retryCount: 0
      }));
      console.log('[DATA-PRESERVATION] Failed submission data cleared');
    } catch (error) {
      console.error('[DATA-PRESERVATION] Failed to clear submission data:', error);
    }
  }, [getStorageKey]);

  const loadFailedSubmission = useCallback((): SubmissionAttempt | null => {
    try {
      const saved = localStorage.getItem(getStorageKey());
      if (saved) {
        const attempt: SubmissionAttempt = JSON.parse(saved);
        setSubmissionState(prev => ({
          ...prev,
          hasFailedSubmission: true,
          lastFailedPayload: attempt.payload,
          retryCount: attempt.payload.attemptCount
        }));
        console.log('[DATA-PRESERVATION] Failed submission loaded from storage');
        return attempt;
      }
    } catch (error) {
      console.error('[DATA-PRESERVATION] Failed to load submission data:', error);
    }
    return null;
  }, [getStorageKey]);

  const getFailedSubmissionSummary = useCallback(() => {
    if (!submissionState.lastFailedPayload) return null;
    
    const payload = submissionState.lastFailedPayload;
    return {
      hotelName: payload.formData.hotelName,
      timestamp: new Date(payload.timestamp).toLocaleString(),
      attemptCount: payload.attemptCount,
      imageCount: payload.hotelImages.length,
      payloadSize: `${Math.round(JSON.stringify(payload).length / 1024)} KB`
    };
  }, [submissionState.lastFailedPayload]);

  return {
    submissionState,
    submitWithPreservation,
    retryFailedSubmission,
    clearFailedSubmission,
    loadFailedSubmission,
    getFailedSubmissionSummary
  };
}