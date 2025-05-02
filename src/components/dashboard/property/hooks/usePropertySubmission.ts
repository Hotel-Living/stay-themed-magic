
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

    // Validate all steps before final submission
    let incompleteFieldsByStep = [];
    for (let i = 1; i <= Object.keys(stepValidation).length; i++) {
      const incompleteFields = getIncompleteFields(i);
      if (incompleteFields.length > 0) {
        incompleteFieldsByStep.push({ step: i, fields: incompleteFields });
      }
    }

    if (incompleteFieldsByStep.length > 0) {
      handleValidationError();
      
      // Navigate to the first step with incomplete fields
      const firstIncompleteStep = incompleteFieldsByStep[0].step;
      setCurrentStep(firstIncompleteStep);
      setErrorFields(incompleteFieldsByStep[0].fields);
      setShowValidationErrors(true);
      
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
      
      // Handle image submissions immediately after hotel creation/update
      if (formData.hotelImages && formData.hotelImages.length > 0) {
        await handleCustomImages(hotelId, formData.hotelImages);
      } else {
        await handlePlaceholderImages(hotelId);
      }
      
      // Submit related data - handle failures gracefully
      try {
        await handleThemesAndActivities(hotelId, formData.themes || [], formData.activities || []);
      } catch (themeError) {
        console.warn("Theme submission had issues but continuing:", themeError);
        // Continue with submission even if themes/activities have issues
      }
      
      try {
        // Availability should be processed after the hotel has been created/updated
        await handleAvailability(hotelId, formData.available_months || [], formData.stayLengths || []);
      } catch (availError) {
        console.warn("Availability submission had issues but continuing:", availError);
        // Continue with submission even if availability has issues
      }
      
      // Handle submission success even if some related data had issues
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
      setSubmitSuccess(false);
      
      toast({
        title: "Submission Failed",
        description: error.message || "There was a problem submitting your property.",
        variant: "destructive"
      });
    }
  };

  return { handleSubmitProperty };
};
