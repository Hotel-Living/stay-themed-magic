
import { useToast } from "@/hooks/use-toast";
import { PropertyFormData } from './usePropertyForm';
import { useHotelSubmission } from "./submission/useHotelSubmission";
import { useRelatedDataSubmission } from "./submission/useRelatedDataSubmission";
import { useImageSubmission } from "./submission/useImageSubmission";

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
  const { toast } = useToast();
  const { createNewHotel, updateExistingHotel } = useHotelSubmission();
  const { handleThemesAndActivities, handleAvailability } = useRelatedDataSubmission();
  const { handlePlaceholderImages } = useImageSubmission();

  const handleValidationError = () => {
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
  };

  const handleSubmissionSuccess = () => {
    console.log('Property submitted successfully with all related data!');
    setIsSubmitted(true);
    setSubmitSuccess(true);
    
    toast({
      title: "Property Submitted Successfully",
      description: "Your property has been submitted for review.",
      duration: 5000
    });
    
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
        termsAccepted: false
      });
      if (onDoneEditing) onDoneEditing();
    }, 5000);
  };

  const handleSubmissionError = (error: any) => {
    console.error('Error in handleSubmitProperty:', error);
    toast({
      title: "Submission Error",
      description: "An unexpected error occurred. Please try again.",
      variant: "destructive"
    });
  };

  const handleSubmitProperty = async (editingHotelId?: string | null) => {
    if (editingHotelId) {
      try {
        await updateExistingHotel(formData, editingHotelId);
        await handleThemesAndActivities(editingHotelId, formData.themes, formData.activities);
        handleSubmissionSuccess();
        return;
      } catch (error) {
        handleSubmissionError(error);
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
      handleSubmissionError(error);
    }
  };

  return {
    handleSubmitProperty
  };
};
