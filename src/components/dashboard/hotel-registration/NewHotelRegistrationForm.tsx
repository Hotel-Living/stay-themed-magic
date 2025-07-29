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
import { supabase } from '@/integrations/supabase/client';
import { PropertyFormData } from '../property/hooks/usePropertyFormData';

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
import { ImageUploadsSection } from './sections/ImageUploadsSection';
import { AvailabilityPackagesSection } from './sections/AvailabilityPackagesSection';
import { PricingMatrixSection } from './sections/PricingMatrixSection';
import { TermsConditionsSection } from './sections/TermsConditionsSection';
import { ValidationSubmitButton } from './ValidationSubmitButton';

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
  
  // Photos
  photos: z.object({
    hotel: z.array(z.any()).default([]),
    room: z.array(z.any()).default([])
  }).default({ hotel: [], room: [] }),
  
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
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!editingHotelId;
  
  const form = useForm<HotelRegistrationFormData>({
    resolver: zodResolver(hotelRegistrationSchema),
    defaultValues: {
      stayLengths: [],
      activities: [],
      clientAffinities: [],
      hotelFeatures: [],
      roomFeatures: [],
      photos: { hotel: [], room: [] },
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
    // FIX: Properly format images with correct structure
    hotelImages: [
      ...(data.photos?.hotel || []).map(img => ({
        url: img.url || img,
        isMain: img.isMain || false,
        name: img.name || 'hotel-image'
      })),
      ...(data.photos?.room || []).map(img => ({
        url: img.url || img,
        isMain: false,
        name: img.name || 'room-image'
      }))
    ],
    mainImageUrl: data.photos?.hotel?.[0]?.url || data.photos?.hotel?.[0] || '',
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
        photos: {
          hotel: newData.hotelImages || [],
          room: []
        },
        pricingMatrix: newData.pricingMatrix || []
      });
    },
    setCurrentStep: () => {} // Not needed for this form
  });

  // Auto-save functionality completely disabled
  const autoSave = {
    isSaving: false,
    lastSaved: null,
    forceSave: async () => {},
    loadDraft: () => null,
    clearDraft: () => {}
  };

  const onSubmit = async (data: HotelRegistrationFormData) => {
    console.log('=== HOTEL REGISTRATION SUBMISSION START ===');
    console.log('Form data:', data);
    console.log('User:', user);
    
    // Check authentication first
    if (!user?.id) {
      console.error('User not authenticated');
      toast({
        title: t('error'),
        description: t('userNotAuthenticated'),
        variant: 'destructive'
      });
      return;
    }

    // Check if form is valid before proceeding
    const isValid = await form.trigger();
    if (!isValid) {
      console.error('Form validation failed');
      // Get all field errors and display them
      const errors = form.formState.errors;
      const errorMessages = Object.entries(errors)
        .map(([field, error]) => `${field}: ${error?.message || 'Invalid'}`)
        .join(', ');
      
      toast({
        title: t('validationErrors'),
        description: `${t('pleaseFixTheFollowingErrors')}: ${errorMessages}`,
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Store raw form data in temporary table
      const rawSubmissionData = {
        user_id: user.id,
        is_edit: isEditing,
        editing_hotel_id: editingHotelId || null,
        raw_form_data: data,
        form_version: '16-step',
        submitted_at: new Date().toISOString()
      };

      const { data: submissionResult, error } = await supabase
        .from('hotel_submissions_raw')
        .insert([rawSubmissionData])
        .select()
        .single();

      if (error) {
        console.error('Error storing raw submission:', error);
        throw new Error(`Submission storage failed: ${error.message}`);
      }

      console.log('Raw submission stored successfully:', submissionResult);
      
      // Show success feedback
      toast({
        title: isEditing ? "✅ Hotel Update Submitted!" : "✅ Hotel Registration Submitted!",
        description: isEditing 
          ? "Your hotel information has been submitted for processing."
          : "Your hotel registration has been submitted and will be processed shortly.",
        duration: 8000
      });

      // Clear the submitting state immediately to show success
      setIsSubmitting(false);

      // Wait before redirect/callback to ensure user sees success message
      setTimeout(() => {
        if (isEditing && onComplete) {
          console.log('Completing edit operation...');
          onComplete();
        } else {
          console.log('Redirecting to hotel dashboard...');
          window.location.href = '/hotel-dashboard';
        }
      }, 3000);
      
    } catch (error: any) {
      console.error('=== HOTEL SUBMISSION ERROR ===');
      console.error('Error submitting hotel:', error);
      console.error('Error message:', error?.message);
      
      toast({
        title: t('error'),
        description: error?.message || t('submissionFailed'),
        variant: 'destructive',
        duration: 8000
      });
    } finally {
      setIsSubmitting(false);
      console.log('=== HOTEL REGISTRATION SUBMISSION END ===');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
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
            <ImageUploadsSection form={form} />
            <PricingMatrixSection form={form} />
          </Accordion>
          
          <TermsConditionsSection form={form} />
          
          <div className="flex justify-end pt-6">
            <ValidationSubmitButton form={form} />
            <Button 
              type="submit" 
              className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-8 py-3 text-lg font-semibold"
              disabled={isSubmitting || isLoadingHotelData}
            >
              {isSubmitting 
                ? (isEditing ? 'Updating...' : t('submitting'))
                : (isEditing ? 'Update Property' : t('submitRegistration'))
              }
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
