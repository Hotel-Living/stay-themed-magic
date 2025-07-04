
import { useState, useCallback } from 'react';

interface PropertyFormData {
  hotelName: string;
  propertyType: string;
  description: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  category: string;
  // Add other fields as needed
}

export function useNewPropertyForm(editingHotelId?: string) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PropertyFormData>({
    hotelName: '',
    propertyType: '',
    description: '',
    country: '',
    city: '',
    address: '',
    postalCode: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    category: ''
  });
  const [isStepValid, setIsStepValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = useCallback((field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const onValidationChange = useCallback((isValid: boolean) => {
    setIsStepValid(isValid);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep]);

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

  const canMoveToNextStep = currentStep < 5;
  const canMoveToPrevStep = currentStep > 1;

  return {
    currentStep,
    formData,
    updateFormData,
    isStepValid,
    onValidationChange,
    canMoveToNextStep,
    canMoveToPrevStep,
    nextStep,
    prevStep,
    submitProperty,
    isSubmitting
  };
}
