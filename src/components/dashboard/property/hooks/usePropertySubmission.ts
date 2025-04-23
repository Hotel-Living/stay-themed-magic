
import { PropertyFormData } from './usePropertyForm';
import { useHotelSubmission } from "./submission/useHotelSubmission";
import { useRelatedDataSubmission } from "./submission/useRelatedDataSubmission";
import { useImageSubmission } from "./submission/useImageSubmission";
import { useSubmissionSuccess } from "./submission/useSubmissionSuccess";
import { useValidationError } from "./submission/useValidationError";

interface UsePropertySubmissionProps {
  formData: PropertyFormData;
  stepValidation: Record<number, boolean>;
  setIsSubmitted: (value: boolean) => void;
  setSubmitSuccess: (value: boolean) => void;
  setErrorFields: (fields: string[]) => void;
  setShowValidationErrors: (show: boolean) => void;
  getIncompleteFields: (step: number) => string[];
  setCurrentStep: (step: number) => void;
  setFormData: (data: PropertyFormData) => void;
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
}: UsePropertySubmissionProps) => {
  const { createNewHotel, updateExistingHotel } = useHotelSubmission();
  const { handleThemesAndActivities, handleAvailability } = useRelatedDataSubmission();
  const { handlePlaceholderImages } = useImageSubmission();
  
  const { handleSubmissionSuccess } = useSubmissionSuccess({
    setIsSubmitted,
    setSubmitSuccess,
    setCurrentStep,
    setFormData,
    onDoneEditing
  });
  
  const { handleValidationError } = useValidationError({
    setErrorFields,
    setShowValidationErrors,
    getIncompleteFields,
    stepValidation
  });

  const handleSubmitProperty = async (editingHotelId?: string | null) => {
    if (editingHotelId) {
      try {
        await updateExistingHotel(formData, editingHotelId);
        await handleThemesAndActivities(editingHotelId, formData.themes, formData.activities);
        handleSubmissionSuccess();
        return;
      } catch (error) {
        console.error('Error in handleSubmitProperty:', error);
        return;
      }
    }

    const allStepsValid = Object.values(stepValidation).every(isValid => isValid);
    if (!allStepsValid) {
      handleValidationError();
      return;
    }

    try {
      const hotelData = await createNewHotel(formData, userId);
      if (!hotelData) return;

      const hotelId = hotelData.id;
      await handleThemesAndActivities(hotelId, formData.themes, formData.activities);
      await handleAvailability(hotelId, formData.stayLengths);
      await handlePlaceholderImages(hotelId);

      handleSubmissionSuccess();
    } catch (error) {
      console.error('Error in handleSubmitProperty:', error);
    }
  };

  return {
    handleSubmitProperty
  };
};
