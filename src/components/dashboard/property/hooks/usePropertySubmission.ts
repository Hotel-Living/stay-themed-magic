
import { useToast } from "@/hooks/use-toast";
import { PropertyFormData } from "./usePropertyFormData";

interface PropertySubmissionProps {
  formData: PropertyFormData;
  setIsSubmitted: (value: boolean) => void;
  setSubmitSuccess: (value: boolean) => void;
  setErrorFields: (fields: string[]) => void;
  setShowValidationErrors: (show: boolean) => void;
  userId?: string;
  onDoneEditing?: () => void;
}

export const usePropertySubmission = ({
  formData,
  setIsSubmitted,
  setSubmitSuccess,
  setErrorFields,
  setShowValidationErrors,
  userId,
  onDoneEditing
}: PropertySubmissionProps) => {
  const { toast } = useToast();

  const handleSubmitProperty = async (editingHotelId: string | null = null) => {
    console.log('Property submission disabled - UI mode only');
    console.log('Form data:', formData);
    console.log('Editing hotel ID:', editingHotelId);
    
    toast({
      title: "Form Data Captured",
      description: "Property submission is in UI-only mode. Check console for form data.",
      duration: 3000
    });
  };

  return { 
    handleSubmitProperty, 
    showFallback: false, 
    handleFallbackRedirect: () => {} 
  };
};
