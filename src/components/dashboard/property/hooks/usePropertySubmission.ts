
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useHotelSubmission } from "./submission/useHotelSubmission";
import { useRelatedDataSubmission } from "./submission/useRelatedDataSubmission";
import { useSubmissionSuccess } from "./submission/useSubmissionSuccess";
import { useValidationError } from "./submission/useValidationError";
import { useImageSubmission } from "./submission/useImageSubmission";

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
}: any) => {
  const { toast } = useToast();
  const { submitHotel, updateHotel } = useHotelSubmission();
  const { submitRelatedData } = useRelatedDataSubmission();
  const { handleSubmissionSuccess } = useSubmissionSuccess();
  const { handlePlaceholderImages, handleCustomImages } = useImageSubmission();

  const handleSubmitProperty = async (editingHotelId: string | null = null) => {
    const isEditing = Boolean(editingHotelId);

    // Validate all steps
    const isAllValid = Object.values(stepValidation).every(valid => valid === true);
    
    if (!isAllValid) {
      const incompleteFields = getIncompleteFields();
      setErrorFields(incompleteFields);
      setShowValidationErrors(true);
      
      // Find first incomplete step and navigate to it
      for (let i = 1; i <= Object.keys(stepValidation).length; i++) {
        if (stepValidation[i] === false) {
          setCurrentStep(i);
          break;
        }
      }
      
      toast({
        title: "Validation Error",
        description: "Please complete all required fields before submitting.",
        variant: "destructive"
      });
      
      return;
    }

    setIsSubmitted(true);

    try {
      let hotelId: string;
      
      if (isEditing) {
        // Update existing hotel
        hotelId = await updateHotel(editingHotelId, formData, userId);
      } else {
        // Create new hotel
        hotelId = await submitHotel(formData, userId);
      }
      
      // Handle image submissions - if there are custom images use them, otherwise use placeholders
      if (formData.hotelImages && formData.hotelImages.length > 0) {
        await handleCustomImages(hotelId, formData.hotelImages);
      } else {
        await handlePlaceholderImages(hotelId);
      }
      
      // Submit related data
      await submitRelatedData(hotelId, formData);
      
      // Handle submission success
      handleSubmissionSuccess({
        setSubmitSuccess,
        toast,
        isEditing,
        onDoneEditing
      });
      
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
