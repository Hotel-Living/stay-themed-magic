
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
    // Set submission lock to prevent auto-save conflicts
    localStorage.setItem('submission_in_progress', 'true');
    setIsSubmitted(true);
    setShowValidationErrors(false);
    
    try {
      // TODO: Implement actual submission logic here
      setSubmitSuccess(true);
      
      toast({
        title: "Property Submitted",
        description: "Your property has been submitted successfully.",
        duration: 3000
      });
      
      if (onDoneEditing) {
        onDoneEditing();
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitSuccess(false);
      setIsSubmitted(false);
      
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your property. Please try again.",
        variant: "destructive",
        duration: 5000
      });
    } finally {
      // Always release submission lock
      localStorage.removeItem('submission_in_progress');
    }
  };

  return { 
    handleSubmitProperty, 
    showFallback: false, 
    handleFallbackRedirect: () => {} 
  };
};
