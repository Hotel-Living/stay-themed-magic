
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useHotelSubmission } from "./submission/useHotelSubmission";
import { useRelatedDataSubmission } from "./submission/useRelatedDataSubmission";
import { useSubmissionSuccess } from "./submission/useSubmissionSuccess";
import { useValidationError } from "./submission/useValidationError";
import { useImageSubmission } from "./submission/useImageSubmission";
import { PropertyFormData } from "./usePropertyFormData";

interface PropertySubmissionProps {
  formData: PropertyFormData;
  stepValidation: Record<number, boolean>;
  setIsSubmitted: (value: boolean) => void;
  setSubmitSuccess: (value: boolean) => void;
  setErrorFields: (fields: string[]) => void;
  setShowValidationErrors: (show: boolean) => void;
  getIncompleteFields: (step: number) => string[];
  setCurrentStep: (step: number) => void;
  setFormData: (data: Partial<PropertyFormData>) => void;
  userId?: string;
  onDoneEditing?: () => void;
}

export const usePropertySubmission = ({
  formData,
  stepValidation,
  setIsSubmitted,
  setSubmitSuccess,
  setErrorFields,
  setShowValidationErrors,
  getIncompleteFields,
  setCurrentStep,
  setFormData,
  userId,
  onDoneEditing
}: PropertySubmissionProps) => {
  const { toast } = useToast();
  const { createNewHotel, updateExistingHotel } = useHotelSubmission();
  const { handleThemesAndActivities, handleAvailability } = useRelatedDataSubmission();
  const { handleSubmissionSuccess } = useSubmissionSuccess({
    setIsSubmitted,
    setSubmitSuccess,
    setCurrentStep,
    setFormData,
    onDoneEditing
  });
  const { handlePlaceholderImages, handleCustomImages } = useImageSubmission();

  const { handleValidationError } = useValidationError({
    setErrorFields,
    setShowValidationErrors,
    getIncompleteFields,
    stepValidation,
    formData
  });

  const handleSubmitProperty = async (editingHotelId: string | null = null) => {
    const isEditing = Boolean(editingHotelId);

    // Validate all steps
    const isAllValid = Object.values(stepValidation).every(valid => valid === true);
    
    if (!isAllValid) {
      handleValidationError();
      
      // Find first incomplete step and navigate to it
      for (let i = 1; i <= Object.keys(stepValidation).length; i++) {
        if (stepValidation[i] === false) {
          setCurrentStep(i);
          break;
        }
      }
      
      return;
    }

    setIsSubmitted(true);

    try {
      let hotelId: string;
      
      if (isEditing) {
        // Update existing hotel
        await updateExistingHotel(formData, editingHotelId);
        hotelId = editingHotelId;
      } else {
        // Create new hotel
        const hotelData = await createNewHotel(formData, userId);
        hotelId = hotelData.id;
      }
      
      // Handle image submissions - if there are custom images use them, otherwise use placeholders
      if (formData.hotelImages && formData.hotelImages.length > 0) {
        await handleCustomImages(hotelId, formData.hotelImages);
      } else {
        await handlePlaceholderImages(hotelId);
      }
      
      // Submit related data
      await handleThemesAndActivities(hotelId, formData.themes || [], formData.activities || []);
      await handleAvailability(hotelId, formData.stayLengths || []);
      
      // Handle submission success
      handleSubmissionSuccess();
      
      // Reset form data after successful submission if not editing
      if (!isEditing) {
        setFormData({
          termsAccepted: false
        });
      }
    } catch (error: any) {
      console.error("Error submitting hotel:", error);
      
      setIsSubmitted(false);
      
      toast({
        title: "Submission Failed",
        description: error.message || "There was a problem submitting your property.",
        variant: "destructive"
      });
    }
  };

  return { handleSubmitProperty };
};
