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

const hotelRegistrationSchema = z.object({
  // Basic Info
  hotelName: z.string().min(1, 'Hotel name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  
  // Contact Info
  email: z.string().email('Invalid email'),
  phone: z.string().min(1, 'Phone is required'),
  website: z.string().url().optional(),
  
  // Classification
  classification: z.string().min(1, 'Classification is required'),
  
  // Property Details
  propertyType: z.string().min(1, 'Property type is required'),
  propertyStyle: z.string().min(1, 'Property style is required'),
  hotelDescription: z.string().min(200, 'Description must be at least 200 characters'),
  roomDescription: z.string().min(1, 'Room description is required'),
  idealGuests: z.string().min(1, 'Ideal guests description is required'),
  atmosphere: z.string().min(1, 'Atmosphere description is required'),
  location: z.string().min(1, 'Location description is required'),
  
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
  checkInDay: z.string().min(1, 'Check-in day is required'),
  mealPlan: z.string().min(1, 'Meal plan is required'),
  stayLengths: z.array(z.enum(['8', '15', '22', '29'])).min(1, 'At least one stay length is required'),
  
  // Services
  weeklyLaundryIncluded: z.boolean().default(false),
  externalLaundryAvailable: z.boolean().default(false),
  
  // Availability
  numberOfRooms: z.string().min(1, 'Number of rooms is required'),
  
  // Pricing (optional until fully implemented)
  pricingMatrix: z.array(z.any()).optional().default([]),
  
  // Terms
  termsAccepted: z.boolean().refine(val => val === true, 'Terms must be accepted'),
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

  const getFieldDisplayName = (fieldName: string): string => {
    const fieldMap: Record<string, string> = {
      'hotelName': 'Nombre del Hotel',
      'address': 'Dirección',
      'city': 'Ciudad',
      'postalCode': 'Código Postal',
      'country': 'País',
      'email': 'Email',
      'phone': 'Teléfono',
      'classification': 'Clasificación',
      'propertyType': 'Tipo de Propiedad',
      'propertyStyle': 'Estilo de Propiedad',
      'hotelDescription': 'Descripción del Hotel',
      'roomDescription': 'Descripción de las Habitaciones',
      'idealGuests': 'Huéspedes Ideales',
      'atmosphere': 'Ambiente',
      'location': 'Ubicación',
      'checkInDay': 'Día de Check-in',
      'mealPlan': 'Plan de Comidas',
      'stayLengths': 'Duración de Estancia',
      'numberOfRooms': 'Número de Habitaciones',
      'termsAccepted': 'Términos y Condiciones'
    };
    return fieldMap[fieldName] || fieldName;
  };

  const validateRequiredFields = (data: HotelRegistrationFormData): string[] => {
    const missingFields: string[] = [];
    
    // Basic Info Section
    if (!data.hotelName?.trim()) missingFields.push('Nombre del Hotel');
    if (!data.address?.trim()) missingFields.push('Dirección');
    if (!data.city?.trim()) missingFields.push('Ciudad');
    if (!data.postalCode?.trim()) missingFields.push('Código Postal');
    if (!data.country?.trim()) missingFields.push('País');
    if (!data.email?.trim()) missingFields.push('Email');
    if (!data.phone?.trim()) missingFields.push('Teléfono');
    
    // Classification Section
    if (!data.classification?.trim()) missingFields.push('Clasificación');
    
    // Property Details Section
    if (!data.propertyType?.trim()) missingFields.push('Tipo de Propiedad');
    if (!data.propertyStyle?.trim()) missingFields.push('Estilo de Propiedad');
    if (!data.hotelDescription?.trim() || data.hotelDescription.length < 200) missingFields.push('Descripción del Hotel (mínimo 200 caracteres)');
    if (!data.roomDescription?.trim()) missingFields.push('Descripción de las Habitaciones');
    if (!data.idealGuests?.trim()) missingFields.push('Huéspedes Ideales');
    if (!data.atmosphere?.trim()) missingFields.push('Ambiente');
    if (!data.location?.trim()) missingFields.push('Ubicación');
    
    // Accommodation Terms Section
    if (!data.checkInDay?.trim()) missingFields.push('Día de Check-in');
    if (!data.mealPlan?.trim()) missingFields.push('Plan de Comidas');
    if (!data.stayLengths || data.stayLengths.length === 0) missingFields.push('Duración de Estancia');
    if (!data.numberOfRooms?.trim()) missingFields.push('Número de Habitaciones');
    
    // Terms Section
    if (!data.termsAccepted) missingFields.push('Términos y Condiciones');
    
    return missingFields;
  };

  const onSubmit = async (data: HotelRegistrationFormData) => {
    console.log('🚀 Form submission started');
    console.log('📋 Form data received:', data);
    
    // Immediate user feedback
    setIsSubmitting(true);
    
    try {
      // Manual validation first to catch any missing fields
      const missingFields = validateRequiredFields(data);
      
      if (missingFields.length > 0) {
        console.log('❌ Missing required fields:', missingFields);
        
        // Display detailed error message with sections
        const errorMessage = `Por favor complete los siguientes campos requeridos: ${missingFields.join(', ')}`;
        
        // Try multiple notification methods in case of network issues
        try {
          toast({
            title: 'Campos Requeridos Faltantes',
            description: errorMessage,
            variant: 'destructive',
            duration: 8000
          });
        } catch (toastError) {
          console.error('Toast failed, using alert fallback:', toastError);
          alert(`Campos Requeridos Faltantes\n\n${errorMessage}`);
        }
        
        setIsSubmitting(false);
        return;
      }
      
      // React Hook Form validation as secondary check
      const isValid = await form.trigger();
      console.log('🔍 React Hook Form validation result:', isValid);
      console.log('📝 Form errors from RHF:', form.formState.errors);
      
      if (!isValid) {
        const errors = form.formState.errors;
        console.log('⚠️ Processing React Hook Form errors:', errors);
        
        if (Object.keys(errors).length === 0) {
          // Generic fallback if RHF validation fails but no specific errors
          try {
            toast({
              title: 'Error de Validación',
              description: 'El formulario contiene errores. Por favor revise todos los campos.',
              variant: 'destructive',
              duration: 6000
            });
          } catch (toastError) {
            console.error('Toast failed, using alert fallback:', toastError);
            alert('Error de Validación\n\nEl formulario contiene errores. Por favor revise todos los campos.');
          }
          
          setIsSubmitting(false);
          return;
        }
        
        // Display specific RHF errors
        const errorMessages = Object.entries(errors)
          .map(([field, error]) => {
            const displayName = getFieldDisplayName(field);
            const message = error?.message || 'Campo requerido';
            return `${displayName}: ${message}`;
          })
          .join(', ');
        
        console.log('📢 Error messages to display:', errorMessages);
        
        try {
          toast({
            title: 'Errores de Validación',
            description: `${errorMessages}`,
            variant: 'destructive',
            duration: 8000
          });
        } catch (toastError) {
          console.error('Toast failed, using alert fallback:', toastError);
          alert(`Errores de Validación\n\n${errorMessages}`);
        }
        
        setIsSubmitting(false);
        return;
      }
      
      console.log('✅ All validations passed, proceeding with submission');

      if (!user?.id) {
        toast({
          title: t('error'),
          description: t('userNotAuthenticated'),
          variant: 'destructive'
        });
        setIsSubmitting(false);
        return;
      }
      
      // Convert and submit the form data
      const propertyData = convertToPropertyFormData(data);
      
      // Submit to hotel creation system
      const result = await createNewHotel(propertyData, user.id);
      
      if (result) {
        toast({
          title: t('success'),
          description: t('hotelSubmittedForApproval'),
          duration: 5000
        });

        // Redirect to hotel dashboard after successful submission
        setTimeout(() => {
          window.location.href = '/hotel-dashboard';
        }, 2000);
      }
      
    } catch (error) {
      console.error('Error submitting hotel:', error);
      toast({
        title: t('error'),
        description: t('submissionFailed'),
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
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
