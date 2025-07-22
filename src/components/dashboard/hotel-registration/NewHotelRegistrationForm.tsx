import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Accordion } from '@/components/ui/accordion';

// Import form sections
import { HotelBasicInfoSection } from './sections/HotelBasicInfoSection';
import { HotelClassificationSection } from './sections/HotelClassificationSection';
import { PropertyTypeSection } from './sections/PropertyTypeSection';
import { PropertyStyleSection } from './sections/PropertyStyleSection';
import { HotelDescriptionSection } from './sections/HotelDescriptionSection';
import { RoomDescriptionSection } from './sections/RoomDescriptionSection';
import { CompletePhraseSection } from './sections/CompletePhraseSection';
import { HotelFeaturesSection } from './sections/HotelFeaturesSection';
import { RoomFeaturesSection } from './sections/RoomFeaturesSection';
import { ClientAffinitiesSection } from './sections/ClientAffinitiesSection';
import { ActivitiesSection } from './sections/ActivitiesSection';
import { CheckInDaySection } from './sections/CheckInDaySection';
import { MealPlanSection } from './sections/MealPlanSection';
import { LaundryServiceSection } from './sections/LaundryServiceSection';
import { StayLengthsSection } from './sections/StayLengthsSection';
import { PricingMatrixSection } from './sections/PricingMatrixSection';
import { AvailabilityPackagesSection } from './sections/AvailabilityPackagesSection';
import { ImageUploadsSection } from './sections/ImageUploadsSection';
import { TermsConditionsSection } from './sections/TermsConditionsSection';

// Form validation schema
const hotelRegistrationSchema = z.object({
  // Basic info
  hotelName: z.string().min(1, 'Hotel name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  
  // Classification
  classification: z.enum(['***', '****', '*****'], { required_error: 'Classification is required' }),
  
  // Property details
  propertyType: z.enum(['Hotel', 'Boutique Hotel', 'Resort', 'Rural House', 'Hostel'], { required_error: 'Property type is required' }),
  propertyStyle: z.string().min(1, 'Property style is required'),
  
  // Descriptions
  hotelDescription: z.string().min(200, 'Hotel description must be at least 200 characters'),
  roomDescription: z.string().min(1, 'Room description is required'),
  
  // Complete phrases
  idealForGuests: z.string().min(1, 'Please complete this phrase'),
  atmosphere: z.string().min(1, 'Please complete this phrase'),
  locationPerfect: z.string().min(1, 'Please complete this phrase'),
  
  // Features
  hotelFeatures: z.array(z.string()).min(1, 'Please select at least one hotel feature'),
  roomFeatures: z.array(z.string()).optional(),
  clientAffinities: z.array(z.string()).optional(),
  activities: z.array(z.string()).optional(),
  
  // Operational details
  checkInDay: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], { required_error: 'Check-in day is required' }),
  mealPlan: z.enum(['Room only', 'Breakfast', 'Half board', 'Full board', 'All-inclusive'], { required_error: 'Meal plan is required' }),
  
  // Services
  inHouseLaundryIncluded: z.boolean().optional(),
  externalLaundryReferral: z.boolean().optional(),
  
  // Stay lengths
  stayLengths: z.array(z.enum(['8', '15', '22', '29'])).min(1, 'Please select at least one stay length'),
  
  // Pricing matrix
  pricingMatrix: z.array(z.object({
    duration: z.number(),
    doubleRoom: z.number().min(1, 'Price must be greater than 0'),
    singleRoom: z.number().min(1, 'Price must be greater than 0'),
  })).min(1, 'Please add pricing information'),
  
  // Availability packages
  availabilityPackages: z.array(z.object({
    entryDate: z.date().optional(),
    exitDate: z.date().optional(),
    numberOfRooms: z.number().optional(),
  })).optional(),
  
  // Images
  photos: z.object({
    hotel: z.array(z.string()).optional(),
    room: z.array(z.string()).optional(),
  }).optional(),
  
  // Terms
  termsAccepted: z.boolean().refine((val) => val === true, 'You must accept the Terms and Conditions'),
});

export type HotelRegistrationFormData = z.infer<typeof hotelRegistrationSchema>;

export const NewHotelRegistrationForm = () => {
  const { t } = useTranslation('dashboard/hotel-registration');
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>([]);

  const form = useForm<HotelRegistrationFormData>({
    resolver: zodResolver(hotelRegistrationSchema),
    defaultValues: {
      hotelFeatures: [],
      roomFeatures: [],
      clientAffinities: [],
      activities: [],
      stayLengths: [],
      pricingMatrix: [],
      availabilityPackages: [],
      photos: { hotel: [], room: [] },
      inHouseLaundryIncluded: false,
      externalLaundryReferral: false,
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: HotelRegistrationFormData) => {
    if (!user) {
      toast.error('You must be logged in to submit a hotel');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Transform form data to match database schema
      const hotelData = {
        owner_id: user.id,
        name: data.hotelName,
        description: data.hotelDescription,
        country: data.country,
        city: data.city,
        address: data.address,
        postal_code: data.postalCode,
        property_type: data.propertyType,
        style: data.propertyStyle,
        category: parseInt(data.classification.length.toString()), // Convert stars to number
        ideal_guests: data.idealForGuests.toLowerCase(),
        atmosphere: data.atmosphere.toLowerCase(),
        perfect_location: data.locationPerfect.toLowerCase(),
        check_in_weekday: data.checkInDay,
        meal_plans: [data.mealPlan],
        stay_lengths: data.stayLengths.map(length => parseInt(length)),
        features_hotel: data.hotelFeatures.reduce((acc, feature) => ({ ...acc, [feature]: true }), {}),
        features_room: data.roomFeatures?.reduce((acc, feature) => ({ ...acc, [feature]: true }), {}) || {},
        room_types: [{
          name: 'Standard Room',
          description: data.roomDescription,
        }],
        rates: data.pricingMatrix.reduce((acc, item) => ({
          ...acc,
          [`price_${item.duration}`]: item.doubleRoom,
          [`single_price_${item.duration}`]: item.singleRoom,
        }), {}),
        additional_data: {
          clientAffinities: data.clientAffinities || [],
          activities: data.activities || [],
          laundryServices: {
            inHouseIncluded: data.inHouseLaundryIncluded,
            externalReferral: data.externalLaundryReferral,
          },
          availabilityPackages: (data.availabilityPackages || []).map(pkg => ({
            entryDate: pkg.entryDate ? pkg.entryDate.toISOString() : null,
            exitDate: pkg.exitDate ? pkg.exitDate.toISOString() : null,
            numberOfRooms: pkg.numberOfRooms || 0
          })),
          photos: data.photos || { hotel: [], room: [] }
        },
        status: 'pending',
        price_per_month: Math.min(...data.pricingMatrix.map(item => item.doubleRoom)), // Use lowest price as base
      };

      const { data: result, error } = await supabase
        .from('hotels')
        .insert([hotelData])
        .select()
        .single();

      if (error) {
        console.error('Error submitting hotel:', error);
        toast.error('Failed to submit hotel registration');
        return;
      }

      toast.success('Hotel registration submitted successfully! Your property will appear as "Pending approval" in your dashboard.');
      form.reset();
      setOpenSections([]);
      
    } catch (error) {
      console.error('Error submitting hotel:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {t('title')}
        </h1>
        <p className="text-white/70">
          {t('description')}
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Accordion 
          type="multiple" 
          value={openSections} 
          onValueChange={setOpenSections}
          className="space-y-2"
        >
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
          <CheckInDaySection form={form} />
          <MealPlanSection form={form} />
          <LaundryServiceSection form={form} />
          <StayLengthsSection form={form} />
          <PricingMatrixSection form={form} />
          <AvailabilityPackagesSection form={form} checkInDay={form.watch('checkInDay') || 'Monday'} />
          <ImageUploadsSection form={form} />
          <TermsConditionsSection form={form} />
        </Accordion>

        <div className="pt-6 border-t border-white/10">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200"
          >
            {isSubmitting ? t('submitting') : t('submitRegistration')}
          </button>
        </div>
      </form>
    </div>
  );
};