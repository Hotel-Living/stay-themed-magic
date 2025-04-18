
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { createHotel } from "@/services/hotelService";
import { StepValidationState } from "../types";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    basicInfo: {
      name: "",
      propertyType: "",
      description: "",
      country: "",
      city: "",
      address: "",
      category: 3,
      style: ""
    },
    accommodationTerms: {
      stayLengths: [] as number[],
      mealPlans: [] as string[]
    },
    themesAndActivities: {
      themes: [] as string[],
      activities: [] as string[]
    },
    roomTypes: [] as any[],
    images: [] as string[],
    termsAccepted: false
  });

  useEffect(() => {
    const savedData = sessionStorage.getItem('propertyFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        
        const newValidation = { ...stepValidation };
        if (parsedData.basicInfo && parsedData.basicInfo.name) newValidation[1] = true;
        if (parsedData.accommodationTerms && parsedData.accommodationTerms.stayLengths.length > 0) newValidation[2] = true;
        if (parsedData.themesAndActivities && parsedData.themesAndActivities.themes.length > 0) newValidation[3] = true;
        setStepValidation(newValidation);
        
        if (parsedData.termsAccepted) {
          setTermsAccepted(parsedData.termsAccepted);
        }
      } catch (e) {
        console.error("Error loading saved form data:", e);
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('propertyFormData', JSON.stringify(formData));
  }, [formData]);

  const validateStep = (step: number, isValid: boolean, stepData?: any) => {
    setStepValidation(prev => ({
      ...prev,
      [step]: isValid
    }));

    if (stepData) {
      updateFormData(step, stepData);
    }
  };

  const updateFormData = (step: number, data: any) => {
    switch (step) {
      case 1:
        setFormData(prev => ({
          ...prev,
          basicInfo: { ...prev.basicInfo, ...data }
        }));
        break;
      case 2:
        setFormData(prev => ({
          ...prev,
          accommodationTerms: { ...prev.accommodationTerms, ...data },
          roomTypes: data.roomTypes || prev.roomTypes
        }));
        break;
      case 3:
        setFormData(prev => ({
          ...prev,
          themesAndActivities: { ...prev.themesAndActivities, ...data }
        }));
        break;
      case 4:
        if (data && typeof data.termsAccepted === 'boolean') {
          setTermsAccepted(data.termsAccepted);
          setFormData(prev => ({
            ...prev,
            termsAccepted: data.termsAccepted
          }));
        }
        break;
    }
  };

  const calculateAveragePrice = (roomTypes: any[]): number => {
    if (roomTypes.length === 0) return 0;
    
    let totalPrice = 0;
    let rateCount = 0;
    
    roomTypes.forEach(room => {
      if (room.rates) {
        Object.values(room.rates).forEach((rate: any) => {
          if (typeof rate === 'number' && rate > 0) {
            totalPrice += rate;
            rateCount++;
          }
        });
      }
    });
    
    return rateCount > 0 ? Math.round(totalPrice / rateCount) : 0;
  };

  const handleSubmitProperty = async () => {
    if (!user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit a property.",
        variant: "destructive"
      });
      return;
    }

    if (!termsAccepted) {
      toast({
        title: "Terms & Conditions",
        description: "You must accept the Terms & Conditions to submit a property.",
        variant: "destructive"
      });
      setErrorFields(["Terms & Conditions"]);
      setShowValidationErrors(true);
      return;
    }

    const allStepsValid = Object.values(stepValidation).every(isValid => isValid);
    
    if (!allStepsValid) {
      const invalidSteps = Object.entries(stepValidation)
        .filter(([_, isValid]) => !isValid)
        .map(([step]) => parseInt(step));
      
      const allIncompleteFields = invalidSteps.flatMap(step => getIncompleteFields(step));
      setErrorFields(allIncompleteFields);
      setShowValidationErrors(true);
      
      toast({
        title: "Cannot Submit Property",
        description: "Please complete all required fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const hotelData = {
        name: formData.basicInfo.name,
        description: formData.basicInfo.description,
        country: formData.basicInfo.country,
        city: formData.basicInfo.city,
        address: formData.basicInfo.address,
        propertyType: formData.basicInfo.propertyType,
        category: formData.basicInfo.category,
        pricePerMonth: calculateAveragePrice(formData.roomTypes),
        ownerId: user.id,
        style: formData.basicInfo.style,
        images: formData.images,
        themes: formData.themesAndActivities.themes
      };

      const result = await createHotel(hotelData);
      console.log("Hotel created:", result);

      setIsSubmitted(true);
      setSubmitSuccess(true);
      
      toast({
        title: "Property Submitted Successfully",
        description: "Your property has been submitted for review.",
        duration: 5000
      });
      
      sessionStorage.removeItem('propertyFormData');
      
      setTimeout(() => {
        navigate("/hotel-dashboard");
      }, 3000);
    } catch (error: any) {
      console.error("Error submitting property:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "There was a problem submitting your property.",
        variant: "destructive"
      });
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIncompleteFields = (step: number): string[] => {
    switch (step) {
      case 1:
        return ["Property Name", "Property Type", "Description"];
      case 2:
        return ["Accommodation Terms", "Meal Plans", "Hotel Features", "Room Features"];
      case 3:
        return ["Themes", "Activities"];
      case 4:
        return ["FAQ", "Terms & Conditions"];
      default:
        return [];
    }
  };

  return {
    currentStep,
    setCurrentStep,
    formData,
    isSubmitted,
    submitSuccess,
    errorFields,
    showValidationErrors,
    isSubmitting,
    termsAccepted,
    setTermsAccepted,
    validateStep,
    handleSubmitProperty,
    setErrorFields,
    setShowValidationErrors
  };
};
