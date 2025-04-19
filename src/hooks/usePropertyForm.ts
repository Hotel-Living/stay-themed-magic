
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
    termsAccepted: false,
    testField: ""
  });

  // Adding errors and touchedFields to support form validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  // Load data from sessionStorage on component mount
  useEffect(() => {
    const sessionData = sessionStorage.getItem("propertyFormData");
    if (sessionData) {
      try {
        const parsedData = JSON.parse(sessionData);
        console.log("Loading from sessionStorage:", parsedData);
        setFormData(prev => ({ ...prev, ...parsedData }));

        // If we have saved data, check validation state of steps
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

  // Add setFieldValue method
  const setFieldValue = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Auto-mark field as touched when changed
    setTouchedFields(prev => ({ ...prev, [field]: true }));
  };

  // Add handleBlur method for validation
  const handleBlur = (field: string) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
  };

  return {
    currentStep,
    setCurrentStep,
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
    formData,
    setFormData,
    errors,
    setErrors,
    touchedFields,
    setTouchedFields,
    updateFormData: (field: string, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    setFieldValue,
    handleBlur,
    toast
  };
};

// Make sure hook is exported correctly
export default usePropertyForm;
