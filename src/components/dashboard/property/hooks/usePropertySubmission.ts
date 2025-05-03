
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
    console.log("Submitting property:", isEditing ? "Editing existing" : "Creating new");
    console.log("Form data:", formData);

    // Check for critical required fields only
    const requiredFields = ['hotelName', 'country', 'city', 'category'];
    const missingRequired = requiredFields.filter(field => !formData[field as keyof PropertyFormData]);
    
    if (missingRequired.length > 0) {
      toast({
        title: "Missing required information",
        description: `Please fill out the following fields: ${missingRequired.join(', ')}`,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitted(true);

    try {
      let hotelId: string;
      
      if (isEditing) {
        // Update existing hotel
        await updateExistingHotel(formData, editingHotelId);
        hotelId = editingHotelId;
        console.log("Hotel updated successfully:", hotelId);
      } else {
        // Create new hotel
        const hotelData = await createNewHotel(formData, userId);
        hotelId = hotelData.id;
        console.log("New hotel created successfully:", hotelId);
      }
      
      // ✅ Fix: persist themes and activities
      console.log("Processing themes and activities for hotel:", hotelId, {
        themes: formData.themes || [],
        activities: formData.activities || []
      });
      await handleThemesAndActivities(hotelId, formData.themes || [], formData.activities || []);
      
      console.log("Processing images for hotel:", hotelId);
      
      // Handle image submissions immediately after hotel creation/update
      if (formData.hotelImages && formData.hotelImages.length > 0) {
        console.log("Using custom images:", formData.hotelImages);
        await handleCustomImages(hotelId, formData.hotelImages);
      } else {
        console.log("No images provided, using placeholders");
        await handlePlaceholderImages(hotelId);
      }
      
      try {
        console.log("Processing availability");
        // Availability should be processed after the hotel has been created/updated
        await handleAvailability(hotelId, formData.available_months || []);
      } catch (availError) {
        console.warn("Availability submission had issues but continuing:", availError);
      }
      
      // Handle submission success even if some related data had issues
      handleSubmissionSuccess();
      
      toast({
        title: isEditing ? "Hotel Updated" : "Hotel Submitted",
        description: isEditing 
          ? "Your hotel has been updated and is pending approval." 
          : "Your hotel has been submitted and is pending approval.",
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
