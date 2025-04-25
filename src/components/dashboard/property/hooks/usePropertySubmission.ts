
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
  
  // Helper function to validate UUIDs
  const validateUUIDs = (arr: string[]): string[] => {
    if (!Array.isArray(arr)) return [];
    
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return arr.filter(id => id && typeof id === 'string' && uuidRegex.test(id));
  };

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
      // Ensure themes and activities are valid UUIDs
      const validThemes = validateUUIDs(formData.themes || []);
      const validActivities = validateUUIDs(formData.activities || []);
      
      console.log("Validated themes for submission:", validThemes.length);
      console.log("Validated activities for submission:", validActivities.length);
      
      // Create a clean version of formData with validated UUIDs
      const cleanedFormData = {
        ...formData,
        themes: validThemes,
        activities: validActivities
      };
      
      let hotelId: string;
      
      if (isEditing) {
        // Update existing hotel
        await updateExistingHotel(cleanedFormData, editingHotelId);
        hotelId = editingHotelId;
      } else {
        // Create new hotel
        const hotelData = await createNewHotel(cleanedFormData, userId);
        hotelId = hotelData.id;
      }
      
      // Handle image submissions - if there are custom images use them, otherwise use placeholders
      if (formData.hotelImages && formData.hotelImages.length > 0) {
        await handleCustomImages(hotelId, formData.hotelImages);
      } else {
        await handlePlaceholderImages(hotelId);
      }
      
      // Submit related data
      await handleThemesAndActivities(hotelId, validThemes, validActivities);
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
