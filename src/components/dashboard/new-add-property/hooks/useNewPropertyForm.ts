
import { useState, useCallback, useEffect } from 'react';
import { useMyRoles } from '@/hooks/useMyRoles';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PropertyFormData {
  // Step 1: Hotel Information
  hotelName: string;
  propertyType: string;
  description: string;
  idealGuestsEnjoy: string;
  atmosphereIs: string;
  locationPerfectFor: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  category: string;
  style: string;
  latitude: string;
  longitude: string;
  referralAssociation: string;
  
  // Step 2: Property Details
  selectedAffinities: string[];
  selectedActivities: string[];
  selectedHotelFeatures: string[];
  selectedRoomFeatures: string[];
  
  // Step 3: Accommodation Terms
  roomTypes: any[];
  selectedMealPlans: string[];
  selectedStayDurations: number[];
  preferredWeekday: string;
  laundryIncluded: boolean;
  externalLaundryAvailable: boolean;
  availabilityPackages: any[];
  roomImages: string[];
  roomDescription: string;
  
  // Step 4: Pricing & Packages
  durationPricing: Record<string, { double: number; single: number }>;
  enablePriceIncrease: boolean;
  priceIncreaseCap: number;
  
  // Step 5: Photos & Final Review
  hotelImages: string[];
  termsAccepted: boolean;
}

export function useNewPropertyForm(editingHotelId?: string) {
  const { roles } = useMyRoles();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PropertyFormData>({
    // Step 1: Hotel Information
    hotelName: '',
    propertyType: '',
    description: '',
    idealGuestsEnjoy: '',
    atmosphereIs: '',
    locationPerfectFor: '',
    country: '',
    city: '',
    address: '',
    postalCode: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    category: '',
    style: '',
    latitude: '',
    longitude: '',
    referralAssociation: '',
    
    // Step 2: Property Details
    selectedAffinities: [],
    selectedActivities: [],
    selectedHotelFeatures: [],
    selectedRoomFeatures: [],
    
    // Step 3: Accommodation Terms
    roomTypes: [],
    selectedMealPlans: [],
    selectedStayDurations: [],
    preferredWeekday: 'monday',
    laundryIncluded: false,
    externalLaundryAvailable: false,
    availabilityPackages: [],
    roomImages: [],
    roomDescription: '',
    
    // Step 4: Pricing & Packages
    durationPricing: {},
    enablePriceIncrease: false,
    priceIncreaseCap: 20,
    
    // Step 5: Photos & Final Review
    hotelImages: [],
    termsAccepted: false
  });
  const [stepValidations, setStepValidations] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = useCallback((field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const onValidationChange = useCallback((stepNumber: number, isValid: boolean) => {
    setStepValidations(prev => ({
      ...prev,
      [stepNumber]: isValid
    }));
  }, []);

  const nextStep = useCallback(() => {
    // Only allow navigation if current step is valid
    if (currentStep < 5 && stepValidations[currentStep as keyof typeof stepValidations]) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, stepValidations]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const submitProperty = useCallback(async (data: PropertyFormData, hotelId?: string) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Prepare hotel data for submission
      const hotelData = {
        name: data.hotelName,
        description: data.description,
        property_type: data.propertyType,
        country: data.country,
        city: data.city,
        address: data.address,
        postal_code: data.postalCode,
        latitude: parseFloat(data.latitude) || null,
        longitude: parseFloat(data.longitude) || null,
        contact_name: data.contactName,
        contact_email: data.contactEmail,
        contact_phone: data.contactPhone,
        style: data.style,
        category: parseInt(data.category) || null,
        atmosphere: data.atmosphereIs,
        ideal_guests: data.idealGuestsEnjoy,
        perfect_location: data.locationPerfectFor,
        stay_lengths: data.selectedStayDurations,
        meal_plans: data.selectedMealPlans,
        preferred_weekday: data.preferredWeekday,
        photos: data.hotelImages,
        rates: data.durationPricing,
        enable_price_increase: data.enablePriceIncrease,
        price_increase_cap: data.priceIncreaseCap,
        price_per_month: 0, // Will be calculated from rates
        owner_id: user.id,
        status: 'pending'
      };

      // Submit to database
      const { data: hotel, error } = await supabase
        .from('hotels')
        .insert(hotelData)
        .select()
        .single();

      if (error) throw error;

      // Show success message
      toast({
        title: "Property Submitted Successfully",
        description: "Your property has been submitted for review and approval.",
      });

      return { success: true, hotel };
    } catch (error) {
      console.error('Error submitting property:', error);
      toast({
        title: "Error Submitting Property",
        description: "There was an error submitting your property. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [toast]);

  const canMoveToNextStep = currentStep < 5 && stepValidations[currentStep as keyof typeof stepValidations];
  const canMoveToPrevStep = currentStep > 1;
  const isCurrentStepValid = stepValidations[currentStep as keyof typeof stepValidations];
  const isAdmin = roles.includes('admin');

  return {
    currentStep,
    formData,
    updateFormData,
    isStepValid: isCurrentStepValid,
    onValidationChange,
    canMoveToNextStep,
    canMoveToPrevStep,
    nextStep,
    prevStep,
    submitProperty,
    isSubmitting,
    isAdmin,
    stepValidations
  };
}
