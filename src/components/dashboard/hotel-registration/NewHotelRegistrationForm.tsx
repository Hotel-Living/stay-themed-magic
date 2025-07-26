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
import { usePropertyFormAutoSave } from '../property/hooks/usePropertyFormAutoSave';
import { createNewHotel } from '../property/hooks/submission/createNewHotel';
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

export const NewHotelRegistrationForm = () => {
  const { t } = useTranslation('dashboard/hotel-registration');
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
    mealPlans: [data.mealPlan],
    roomTypes: [{ description: data.roomDescription }],
    themes: data.clientAffinities,
    activities: data.activities,
    faqs: [],
    terms: '',
    termsAccepted: data.termsAccepted,
    hotelImages: [...data.photos.hotel, ...data.photos.room],
    mainImageUrl: data.photos.hotel[0]?.url || '',
    preferredWeekday: data.checkInDay,
    featuresHotel: data.hotelFeatures.reduce((acc, feature) => ({ ...acc, [feature]: true }), {}),
    featuresRoom: data.roomFeatures.reduce((acc, feature) => ({ ...acc, [feature]: true }), {}),
    available_months: [],
    rates: {},
    currency: 'USD',
    enablePriceIncrease: false,
    priceIncreaseCap: 20,
    pricingMatrix: data.pricingMatrix,
    checkinDay: data.checkInDay,
    stayDurations: data.stayLengths.map(length => parseInt(length)),
    affinities: data.clientAffinities
  });

  // Auto-save completely removed - no watching form values
  const propertyFormData = convertToPropertyFormData(form.getValues());

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
      console.log('Converting form data...');
      const propertyData = convertToPropertyFormData(data);
      console.log('Property data converted:', propertyData);
      
      console.log('Calling createNewHotel...');
      // Submit to hotel creation system
      const result = await createNewHotel(propertyData, user.id);
      console.log('=== HOTEL CREATION RESULT ===');
      console.log('Hotel creation result:', result);
      console.log('Result type:', typeof result);
      console.log('Result keys:', result ? Object.keys(result) : 'No result');
      
      if (result && result.id) {
        console.log('=== SUCCESS: Hotel created successfully ===');
        console.log('Hotel ID:', result.id);
        console.log('Hotel name:', result.name);
        console.log('Hotel owner:', result.owner_id);
        
        // Show immediate success feedback
        toast({
          title: "✅ Hotel Created Successfully!",
          description: "Your hotel has been submitted and is pending approval.",
          duration: 8000
        });

        // Clear the submitting state immediately to show success
        setIsSubmitting(false);

        // Wait before redirect to ensure user sees success message
        setTimeout(() => {
          console.log('Redirecting to hotel dashboard...');
          window.location.href = '/hotel-dashboard';
        }, 3000);
      } else {
        console.error('=== ERROR: Hotel creation returned invalid result ===');
        console.error('Result:', result);
        throw new Error('Hotel creation failed - invalid result returned');
      }
    } catch (error: any) {
      console.error('=== HOTEL SUBMISSION ERROR ===');
      console.error('Error submitting hotel:', error);
      console.error('Error message:', error?.message);
      console.error('Error details:', error?.details);
      console.error('Error hint:', error?.hint);
      
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
              disabled={isSubmitting}
            >
              {isSubmitting ? t('submitting') : t('submitRegistration')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
