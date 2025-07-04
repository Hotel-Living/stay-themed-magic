
import { useState, useCallback, useEffect } from 'react';
import { useMyRoles } from '@/hooks/useMyRoles';

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
      // Implementation for submitting property data
      console.log('Submitting property data:', data);
      console.log('Editing hotel ID:', hotelId);
      
      // Here you would call the actual submission logic
      // For now, just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { success: true };
    } catch (error) {
      console.error('Error submitting property:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

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
