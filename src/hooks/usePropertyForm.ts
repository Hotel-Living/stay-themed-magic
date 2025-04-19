
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
    termsAccepted: false,
    testField: "" // Add the new field here
  });

  // Cargar datos desde sessionStorage al iniciar
  useEffect(() => {
    const sessionData = sessionStorage.getItem('propertyFormData');
    if (sessionData) {
      try {
        const parsedData = JSON.parse(sessionData);
        setFormData(prev => ({ ...prev, ...parsedData }));

        if (parsedData.hotelName && parsedData.propertyType && parsedData.description) {
          setStepValidation(prev => ({ ...prev, 1: true }));
        }

        if (parsedData.roomTypes && parsedData.roomTypes.length > 0) {
          setStepValidation(prev => ({ ...prev, 2: true }));
        }
      } catch (error) {
        console.error("Error parsing session data:", error);
      }
    }
  }, []);

  // GUARDAR AUTOMÁTICAMENTE cada vez que cambia formData
  useEffect(() => {
    sessionStorage.setItem('propertyFormData', JSON.stringify(formData));
  }, [formData]);

  // Add back the updateFormData function that was in the original implementation
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    stepValidation,
    setStepValidation,
    isSubmitted,
    setIsSubmitted,
    submitSuccess,
    setSubmitSuccess,
    errorFields,
    setErrorFields,
    showValidationErrors,
    setShowValidationErrors,
    hasNewItems,
    setHasNewItems,
    updateFormData,
    toast
  };
};
