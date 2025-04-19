
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { StepValidationState } from "@/components/dashboard/property/types";

export const usePropertyForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasNewItems, setHasNewItems] = useState(false);
  const [stepValidation, setStepValidation] = useState<StepValidationState>({
    1: false,
    2: false,
    3: false,
    4: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const { toast } = useToast();
  
  // Initialize with empty form structure
  const [formData, setFormData] = useState({
    hotelName: "",
    propertyType: "",
    description: "",
    country: "",
    address: "",
    city: "",
    postalCode: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    category: "",
    stayLengths: [] as number[],
    mealPlans: [] as string[],
    roomTypes: [] as any[],
    themes: [] as string[],
    activities: [] as string[],
    faqs: [] as any[],
    terms: "",
    termsAccepted: false
  });

  // Load data from sessionStorage on component mount
  useEffect(() => {
    const sessionData = sessionStorage.getItem('propertyFormData');
    if (sessionData) {
      try {
        const parsedData = JSON.parse(sessionData);
        console.log("Loading from sessionStorage:", parsedData);
        setFormData(prev => ({...prev, ...parsedData}));
        
        // If we have saved data, check validation state of steps
        if (parsedData.hotelName && parsedData.propertyType && parsedData.description) {
          setStepValidation(prev => ({...prev, 1: true}));
        }
        
        if (parsedData.roomTypes && parsedData.roomTypes.length > 0) {
          setStepValidation(prev => ({...prev, 2: true}));
        }
        
        if (parsedData.themes && parsedData.themes.length > 0) {
          setStepValidation(prev => ({...prev, 3: true}));
        }
        
        if (parsedData.faqs && parsedData.terms) {
          setStepValidation(prev => ({...prev, 4: true}));
        }
      } catch (error) {
        console.error("Error parsing session data:", error);
      }
    }
  }, []);

  const validateStep = (step: number, isValid: boolean) => {
    setStepValidation(prev => ({
      ...prev,
      [step]: isValid
    }));
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => {
      const updatedData = {
        ...prev,
        [field]: value
      };
      
      // Save to sessionStorage immediately after updating
      try {
        sessionStorage.setItem('propertyFormData', JSON.stringify(updatedData));
        console.log("Saved to sessionStorage:", field, value);
      } catch (error) {
        console.error("Error saving to sessionStorage:", error);
      }
      
      return updatedData;
    });
  };

  return {
    currentStep,
    setCurrentStep,
    hasNewItems,
    setHasNewItems,
    stepValidation,
    validateStep,
    isSubmitted,
    setIsSubmitted,
    submitSuccess,
    setSubmitSuccess,
    errorFields,
    setErrorFields,
    showValidationErrors,
    setShowValidationErrors,
    formData,
    updateFormData,
    toast
  };
};
