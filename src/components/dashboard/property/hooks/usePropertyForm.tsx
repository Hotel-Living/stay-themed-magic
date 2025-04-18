
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
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

  return {
    currentStep,
    setCurrentStep,
    hasNewItems,
    setHasNewItems,
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
    isSubmitting,
    setIsSubmitting,
    termsAccepted,
    setTermsAccepted,
    formData,
    setFormData,
    user,
    navigate,
    toast
  };
};
