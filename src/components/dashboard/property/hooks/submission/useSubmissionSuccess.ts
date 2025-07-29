
import { useToast, toast } from "@/hooks/use-toast";
import { PropertyFormData } from '../usePropertyFormData';
import { useState } from 'react';

interface SubmissionSuccessProps {
  setIsSubmitted: (value: boolean) => void;
  setSubmitSuccess: (value: boolean) => void;
  setCurrentStep: (step: number) => void;
  setFormData: (data: Partial<PropertyFormData>) => void;
  onDoneEditing?: () => void;
}

export const useSubmissionSuccess = ({
  setIsSubmitted,
  setSubmitSuccess,
  setCurrentStep,
  setFormData,
  onDoneEditing
}: SubmissionSuccessProps) => {
  const { toast: useToastRef } = useToast();
  const [showFallback, setShowFallback] = useState(false);

  const handleSubmissionSuccess = () => {
    console.log('Property submitted successfully!');
    setIsSubmitted(false);
    setSubmitSuccess(true);
    
    // Show enhanced success feedback
    toast.success("✅ Property submitted successfully!", {
      description: "Your property has been saved and is pending administrator approval."
    });
    
    // Set up fallback mechanism after 5 seconds
    setTimeout(() => {
      setShowFallback(true);
    }, 5000);
    
    // Original reset logic after 2 seconds
    setTimeout(() => {
      setCurrentStep(1);
      setIsSubmitted(false);
      setFormData({
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
        stayLengths: [],
        mealPlans: [],
        roomTypes: [],
        themes: [],
        activities: [],
        faqs: [],
        terms: "",
        termsAccepted: false,
        hotelImages: []
      });
      if (onDoneEditing) onDoneEditing();
    }, 2000);
  };

  const handleFallbackRedirect = () => {
    window.location.href = "/hotel-dashboard";
  };

  return { 
    handleSubmissionSuccess, 
    showFallback,
    handleFallbackRedirect 
  };
};
