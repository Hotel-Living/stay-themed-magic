
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
  
  // Initialize form data with default values
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

  // Load saved form data when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('propertyFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        
        // Validate all steps based on loaded data
        Object.keys(stepValidation).forEach(step => {
          validateStep(parseInt(step), true);
        });
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }
  }, []);

  // Function to validate a specific step
  const validateStep = (step: number, isValid: boolean) => {
    setStepValidation(prev => ({
      ...prev,
      [step]: isValid
    }));
  };

  // Update form data and save to localStorage
  const updateFormData = (field: string, value: any) => {
    const updatedData = {
      ...formData,
      [field]: value
    };
    setFormData(updatedData);
    
    // Save to localStorage to persist data between page refreshes
    try {
      localStorage.setItem('propertyFormData', JSON.stringify(updatedData));
    } catch (error) {
      console.error("Error saving form data to localStorage:", error);
    }
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
