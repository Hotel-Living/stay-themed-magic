import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Accordion } from '@/components/ui/accordion';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useHotelEditing } from '../property/hooks/useHotelEditing';
import { PropertyFormData } from '../property/hooks/usePropertyFormData';
import { supabase } from '@/integrations/supabase/client';
import { useAutoSaveReliable } from '@/hooks/useAutoSaveReliable';
import { useDataPreservation } from '@/hooks/useDataPreservation';
import { useSubmissionStability } from '@/hooks/useSubmissionStability';
import { SubmissionStatus } from './components/SubmissionStatus';
import { LockStatusIndicator } from '@/components/ui/LockStatusIndicator';

import { HotelBasicInfoSection } from './sections/HotelBasicInfoSection';
import { HotelClassificationSection } from './sections/HotelClassificationSection';
import { PropertyTypeSection } from './sections/PropertyTypeSection';
import { PropertyStyleSection } from './sections/PropertyStyleSection';
import { HotelDescriptionSection } from './sections/HotelDescriptionSection';
import { RoomDescriptionSection } from './sections/RoomDescriptionSection';
import { CompletePhraseSection } from './sections/CompletePhraseSection';
import { HotelFeaturesSection } from './sections/HotelFeaturesSection';
import { RoomFeaturesSection } from './sections/RoomFeaturesSection';
import { ActivitiesSection } from './sections/ActivitiesSection';
import { ClientAffinitiesSection } from './sections/ClientAffinitiesSection';
import { CheckInDaySection } from './sections/CheckInDaySection';
import { MealPlanSection } from './sections/MealPlanSection';

import { StayLengthsSection } from './sections/StayLengthsSection';
import { AvailabilityPackagesSection } from './sections/AvailabilityPackagesSection';
import { PricingMatrixSection } from './sections/PricingMatrixSection';
import { TermsConditionsSection } from './sections/TermsConditionsSection';


const hotelRegistrationSchema = z.object({
  // Basic Info
  hotelName: z.string().min(1, 'Hotel name is required'),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  
  // Contact Info
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  
  // Classification
  classification: z.string().optional(),
  
  // Property Details
  propertyType: z.string().optional(),
  propertyStyle: z.string().optional(),
  hotelDescription: z.string().optional(),
  roomDescription: z.string().optional(),
  idealGuests: z.string().optional(),
  atmosphere: z.string().optional(),
  location: z.string().optional(),
  
  // Features
  hotelFeatures: z.array(z.string()).default([]),
  roomFeatures: z.array(z.string()).default([]),
  
  // Activities and Affinities
  activities: z.array(z.string()).default([]),
  clientAffinities: z.array(z.string()).default([]),
  
  
  // Accommodation Terms
  checkInDay: z.string().optional(),
  mealPlan: z.string().optional(),
  stayLengths: z.array(z.enum(['8', '15', '22', '29'])).default([]),
  
  // Services
  weeklyLaundryIncluded: z.boolean().default(false),
  externalLaundryAvailable: z.boolean().default(false),
  
  // Availability
  numberOfRooms: z.string().optional(),
  
  // Pricing
  pricingMatrix: z.array(z.any()).default([]),
  price_per_month: z.number().optional(),
  
  // Terms
  termsAccepted: z.boolean().default(false),
  availabilityPackages: z.array(z.object({
    id: z.string().optional(),
    startDate: z.date(),
    endDate: z.date(),
    duration: z.number(),
    availableRooms: z.number().min(1)
  })).default([])
});

export type HotelRegistrationFormData = z.infer<typeof hotelRegistrationSchema>;

interface NewHotelRegistrationFormProps {
  editingHotelId?: string;
  onComplete?: () => void;
}

export const NewHotelRegistrationForm = ({ editingHotelId, onComplete }: NewHotelRegistrationFormProps = {}) => {
  const { t } = useTranslation('dashboard/hotel-registration');
  const { toast } = useToast();
  const { user, session } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionAttempted, setSubmissionAttempted] = useState(false);
  const isEditing = !!editingHotelId;
  
  // Form validation is now handled ONLY by the Zod schema
  // No legacy validation layers


  // Use data preservation system
  const {
    submissionState,
    submitWithPreservation,
    retryFailedSubmission,
    clearFailedSubmission,
    loadFailedSubmission,
    getFailedSubmissionSummary
  } = useDataPreservation();

  // Add stability features
  const {
    submissionState: stabilityState,
    lockState,
    submitWithStabilityChecks,
    retryWithBackoff,
    deleteWithCleanup,
    resetSubmissionState
  } = useSubmissionStability({ hotelId: editingHotelId });
  
  const form = useForm<HotelRegistrationFormData>({
    resolver: zodResolver(hotelRegistrationSchema),
    defaultValues: {
      stayLengths: [],
      activities: [],
      clientAffinities: [],
      hotelFeatures: [],
      roomFeatures: [],
      
      pricingMatrix: [],
      weeklyLaundryIncluded: false,
      externalLaundryAvailable: false,
      termsAccepted: false
    }
  });

  // Convert form data to PropertyFormData for auto-save and submission
  const convertToPropertyFormData = (data: HotelRegistrationFormData): PropertyFormData => ({
    hotelName: data.hotelName,
    propertyType: data.propertyType,
    description: data.hotelDescription,
    idealGuests: data.idealGuests,
    atmosphere: data.atmosphere,
    perfectLocation: data.location,
    style: data.propertyStyle,
    country: data.country,
    address: data.address,
    city: data.city,
    postalCode: data.postalCode,
    contactName: user?.user_metadata?.first_name + ' ' + user?.user_metadata?.last_name || '',
    contactEmail: data.email,
    contactPhone: data.phone,
    category: data.classification,
    stayLengths: data.stayLengths.map(length => parseInt(length)),
    mealPlans: [data.mealPlan].filter(Boolean),
    roomTypes: [{ description: data.roomDescription }].filter(rt => rt.description),
    themes: data.clientAffinities || [], // FIX: Use only clientAffinities for themes
    activities: data.activities || [], // FIX: Ensure array fallback
    faqs: [],
    terms: '',
    termsAccepted: data.termsAccepted,
    hotelImages: [],
    mainImageUrl: '',
    preferredWeekday: data.checkInDay,
    featuresHotel: data.hotelFeatures.reduce((acc, feature) => ({ ...acc, [feature]: true }), {}),
    featuresRoom: data.roomFeatures.reduce((acc, feature) => ({ ...acc, [feature]: true }), {}),
    // FIX: Process availability packages for months
    available_months: data.availabilityPackages?.map(pkg => {
      const month = new Date(pkg.startDate).toLocaleString('default', { month: 'long' }).toLowerCase();
      return month;
    }) || [],
    rates: {},
    currency: 'USD',
    enablePriceIncrease: false,
    priceIncreaseCap: 20,
    pricingMatrix: data.pricingMatrix || [],
    checkinDay: data.checkInDay,
    stayDurations: data.stayLengths.map(length => parseInt(length)),
    // FIX: Remove duplicate affinities field to avoid confusion
    // FIX: Add availability packages data for processing
    availabilityPackages: data.availabilityPackages || []
  });

  // Load existing hotel data for editing
  const { isLoading: isLoadingHotelData } = useHotelEditing({
    editingHotelId,
    setFormData: (updater) => {
      const newData = updater({} as PropertyFormData);
      // Convert PropertyFormData back to HotelRegistrationFormData
      form.reset({
        hotelName: newData.hotelName,
        address: newData.address,
        city: newData.city,
        postalCode: newData.postalCode,
        country: newData.country,
        email: newData.contactEmail,
        phone: newData.contactPhone,
        classification: newData.category,
        propertyType: newData.propertyType,
        propertyStyle: newData.style,
        hotelDescription: newData.description,
        idealGuests: newData.idealGuests,
        atmosphere: newData.atmosphere,
        location: newData.perfectLocation,
        hotelFeatures: Object.keys(newData.featuresHotel || {}).filter(key => newData.featuresHotel?.[key]),
        roomFeatures: Object.keys(newData.featuresRoom || {}).filter(key => newData.featuresRoom?.[key]),
        activities: newData.activities || [],
        clientAffinities: newData.themes || [],
        checkInDay: newData.preferredWeekday,
        stayLengths: (newData.stayLengths || []).map(length => length.toString()) as ('8' | '15' | '22' | '29')[],
        pricingMatrix: newData.pricingMatrix || []
      });
    },
    setCurrentStep: () => {} // Not needed for this form
  });

  // Auto-save functionality (only text and numeric fields)
  const formData = form.watch();
  const autoSave = useAutoSaveReliable(formData, true);

  // Track if draft has already been restored to prevent multiple attempts
  const [isDraftRestored, setIsDraftRestored] = React.useState(false);

  // Load draft data when user becomes available (critical for data recovery after browser closure)
  useEffect(() => {
    const loadSavedDraft = async () => {
      try {
        const draft = autoSave.loadDraft();
        if (draft && autoSave.hasValidDraftData && autoSave.hasValidDraftData(draft)) {
          console.log('[HOTEL-REGISTRATION] Loading saved draft data after session restoration');
          
          // Restore form values from draft
          Object.keys(draft).forEach(key => {
            if (key !== 'timestamp' && key !== 'version' && key !== 'photoUrls' && draft[key] !== undefined) {
              form.setValue(key as any, draft[key]);
            }
          });

          
          toast({
            title: "Draft Restored",
            description: "Your previous work has been restored. You can continue where you left off.",
            duration: 5000
          });
          
          setIsDraftRestored(true);
        }
      } catch (error) {
        console.error('[HOTEL-REGISTRATION] Failed to load draft:', error);
      }
    };

    // Only try to load draft once when auth becomes ready and draft hasn't been restored yet
    if ((user?.id || session?.user?.id) && !submissionState.submissionComplete && !isDraftRestored) {
      loadSavedDraft();
    }
  }, [user?.id, session?.user?.id, autoSave.loadDraft, autoSave.hasValidDraftData, form, toast, submissionState.submissionComplete, isDraftRestored]);

  // Load any failed submission on component mount
  React.useEffect(() => {
    loadFailedSubmission();
  }, [loadFailedSubmission]);

  const onSubmit = async (data: HotelRegistrationFormData) => {
    // Check if locked first
    if (lockState.isLocked) {
      toast({
        title: "Editing Locked",
        description: `Cannot submit: ${lockState.lockReason}`,
        variant: "destructive",
        duration: 5000
      });
      return;
    }

    // Prevent duplicate submissions if already submitting or completed
    if (submissionState.isSubmitting || submissionState.submissionComplete || stabilityState.isSubmitting) {
      return;
    }
    
    // Form validation is handled by the Zod schema automatically
    // No legacy validation layers needed
    
    console.log('[HOTEL-REGISTRATION] Starting submission for authenticated user:', user?.id);
    console.log('[HOTEL-REGISTRATION] No role verification required - authenticated user can submit');
    
    // Prepare hotel data for submission
    const hotelData = {
      owner_id: user?.id, // Set to authenticated user - no role check needed
      name: data.hotelName,
      description: data.hotelDescription,
      country: data.country,
      city: data.city,
      address: data.address,
      postal_code: data.postalCode,
      contact_name: user?.user_metadata?.first_name + ' ' + user?.user_metadata?.last_name || '',
      contact_email: data.email,
      contact_phone: data.phone,
      property_type: data.propertyType,
      style: data.propertyStyle,
      category: data.classification ? parseInt(data.classification) : 1,
      ideal_guests: data.idealGuests,
      atmosphere: data.atmosphere,
      perfect_location: data.location,
      room_description: data.roomDescription,
      weekly_laundry_included: data.weeklyLaundryIncluded,
      external_laundry_available: data.externalLaundryAvailable,
      stay_lengths: data.stayLengths,
      meals_offered: data.mealPlan ? [data.mealPlan] : [],
      features_hotel: data.hotelFeatures.reduce((acc, feature) => ({ ...acc, [feature]: true }), {}),
      features_room: data.roomFeatures.reduce((acc, feature) => ({ ...acc, [feature]: true }), {}),
      available_months: data.availabilityPackages?.map(pkg => {
        const month = new Date(pkg.startDate).toLocaleString('default', { month: 'long' }).toLowerCase();
        return month;
      }) || [],
      main_image_url: '',
      price_per_month: data.price_per_month || 0,
      terms: data.termsAccepted ? 'Terms accepted on ' + new Date().toISOString() : '',
      check_in_weekday: data.checkInDay || 'Monday'
    };

    // Prepare related data
    const availabilityPackages = data.availabilityPackages?.map(pkg => ({
      start_date: pkg.startDate.toISOString().split('T')[0],
      end_date: pkg.endDate.toISOString().split('T')[0],
      duration_days: pkg.duration,
      total_rooms: pkg.availableRooms,
      available_rooms: pkg.availableRooms
    })) || [];

    // No images for registration - photos will be submitted via email
    const hotelImages: any[] = [];

    console.log('[HOTEL-REGISTRATION] Submitting hotel registration with stability checks');
    
    // Submit using stability system with comprehensive checks
    try {
      const result = await submitWithStabilityChecks(data, async () => {
        return await submitWithPreservation(
          data,
          hotelData,
          availabilityPackages,
          hotelImages,
          data.clientAffinities || [],
          data.activities || []
        );
      });

      if (result.success) {
        console.log('[HOTEL-REGISTRATION] Submission successful - hotel data saved to user panel and forwarded to admin panel');
        toast({
          title: "¡Ha completado su registro!",
          description: "Ahora es imprescindible que nos envíe fotografías de su establecimiento (mínimo 10), y de las habitaciones (mínimo 5). Tamaño máximo por foto: 1 MB, formato JPG, PNG o WEBP. Envíelas ahora a contact@hotel-living.com. ¡Sin fotos no es posible publicar su propiedad, llenar sus habitaciones vacías y multiplicar sus beneficios!",
          duration: 10000
        });
        
        // Clear auto-save draft on successful submission
        autoSave.clearDraft();
        
        if (onComplete) {
          onComplete();
        }
      } else {
        // Error handling is managed by the data preservation system
        // User will see the retry interface automatically
        console.log('[HOTEL-REGISTRATION] Submission failed, data preserved for retry:', result.error);
        toast({
          title: "Submission Error",
          description: result.error || "Your data has been safely preserved. Use the retry button below to attempt submission again.",
          variant: "destructive",
          duration: 8000
        });
      }
    } catch (error: any) {
      // SURGICAL FIX: Catch any validation errors and show user-facing messages
      console.error('[HOTEL-REGISTRATION] Submission error caught:', error);
      
      // Check if it's an image validation error
      if (error.message && error.message.includes('Image upload failures')) {
        toast({
          title: "Image Upload Issue",
          description: "Some images are still processing. Please wait a moment and try submitting again, or try re-uploading any failed images.",
          variant: "destructive",
          duration: 8000
        });
      } else {
        toast({
          title: "Submission Failed",
          description: error.message || "An unexpected error occurred. Please try again or contact support if the issue persists.",
          variant: "destructive",
          duration: 8000
        });
      }
    }
  };

  const handleRetrySubmission = async () => {
    try {
      const result = await retryFailedSubmission();
      
      if (result.success) {
        toast({
          title: "Registration Completed ✅",
          description: "Your hotel registration has been successfully submitted to Supabase after retry.",
          duration: 5000
        });
        
        autoSave.clearDraft();
        
        if (onComplete) {
          onComplete();
        }
      } else {
        toast({
          title: "Retry Failed",
          description: "The retry attempt failed. Your data remains safely stored for future attempts.",
          variant: "destructive",
          duration: 8000
        });
      }
    } catch (error) {
      toast({
        title: "Retry Error",
        description: "An error occurred during retry. Please try again.",
        variant: "destructive",
        duration: 5000
      });
    }
  };

  const handleClearFailedSubmission = () => {
    clearFailedSubmission();
    toast({
      title: "Data Cleared",
      description: "Saved submission data has been cleared from local storage.",
      duration: 3000
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Lock Status Indicator */}
      <LockStatusIndicator 
        lockState={lockState} 
        onRefresh={() => window.location.reload()}
        className="mb-6" 
      />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Accordion type="single" collapsible className="space-y-4">
            <HotelBasicInfoSection form={form} />
            <HotelClassificationSection form={form} />
            <PropertyTypeSection form={form} />
            <PropertyStyleSection form={form} />
            <HotelDescriptionSection form={form} />
            <RoomDescriptionSection form={form} />
            <CompletePhraseSection form={form} />
            <HotelFeaturesSection form={form} />
            <RoomFeaturesSection form={form} />
            <ClientAffinitiesSection form={form} />
            <ActivitiesSection form={form} />
            <MealPlanSection form={form} />
            <StayLengthsSection form={form} />
            <CheckInDaySection form={form} />
            <AvailabilityPackagesSection form={form} />
            <PricingMatrixSection form={form} />
          </Accordion>
          
          <TermsConditionsSection form={form} />
          
          {/* Submission Status Display */}
          <SubmissionStatus
            submissionState={submissionState}
            failedSubmissionSummary={getFailedSubmissionSummary()}
            onRetry={handleRetrySubmission}
            onClearFailed={handleClearFailedSubmission}
          />

          {/* Form validation errors are shown by individual form fields via Zod schema */}
          
          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <Button 
              type="submit" 
              className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-8 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                lockState.isLocked || 
                submissionState.isSubmitting || 
                stabilityState.isSubmitting ||
                isLoadingHotelData || 
                submissionState.submissionComplete ||
                submissionState.hasFailedSubmission
              }
            >
              {(() => {                
                if (lockState.isLocked) return 'Editing Locked';
                if (submissionState.isSubmitting || stabilityState.isSubmitting) return 'Processing...';
                if (submissionState.submissionComplete) return 'Registration Complete ✅';
                if (submissionState.hasFailedSubmission) return 'Use Retry Button Above';
                return 'Submit Hotel Registration';
              })()}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
