
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
  const { handleSubmissionSuccess, showFallback, handleFallbackRedirect } = useSubmissionSuccess({
    setIsSubmitted,
    setSubmitSuccess,
    setCurrentStep,
    setFormData,
    onDoneEditing
  });
  const { handlePlaceholderImages, handleCustomImages, handleAutoImagePopulation } = useImageSubmission();

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

    // TEMPORARY: Only require hotel name for development/testing
    const requiredFields = ['hotelName'];
    const missingRequired = requiredFields.filter(field => !formData[field as keyof PropertyFormData]);
    
    if (missingRequired.length > 0) {
      toast({
        variant: "error",
        title: "Missing required information",
        description: `Please fill out the following fields: ${missingRequired.join(', ')}`
      });
      return;
    }

    setIsSubmitted(true);

    try {
      let hotelId: string;
      let noChangesDetected = false;
      let changesCount = 0;
      let hotelData: any;
      
      if (isEditing) {
        // Update existing hotel
        const result = await updateExistingHotel(formData, editingHotelId);
        hotelId = result.id;
        
        // Handle union type properly
        if ('noChangesDetected' in result) {
          noChangesDetected = result.noChangesDetected;
        }
        if ('changes' in result) {
          changesCount = result.changes;
        }
        
        if (noChangesDetected) {
          toast({
            title: "No changes detected",
            description: "No changes were detected in your submission."
          });
          setIsSubmitted(false);
          return;
        }
        
        console.log(`Hotel update request submitted with ${changesCount} changes pending approval`);
      } else {
        // Create new hotel
        console.log("=== STARTING HOTEL CREATION ===");
        hotelData = await createNewHotel(formData, userId);
        hotelId = hotelData.id;
        console.log("=== HOTEL CREATION COMPLETED ===");
        console.log("New hotel created successfully:", hotelId);
        console.log("Hotel data returned:", hotelData);
      }
      
      console.log("Processing images for hotel:", hotelId);
      
      // Handle image submissions immediately after hotel creation/update
      try {
        if (formData.hotelImages && formData.hotelImages.length > 0) {
          console.log("Using custom images:", formData.hotelImages);
          await handleCustomImages(hotelId, formData.hotelImages);
        } else if (!isEditing) {
          // For new hotels without custom images, use auto image population (non-blocking)
          console.log("No custom images provided, using auto image population");
          handleAutoImagePopulation(hotelId, hotelData).catch(error => {
            console.warn("Auto image population failed, but continuing:", error);
          });
        }
      } catch (imageError) {
        console.warn("Image processing failed, but hotel creation succeeded:", imageError);
        // Don't throw - let the hotel creation succeed even if images fail
      }
      
      // For new hotels, process related data
      if (!isEditing) {
        // Submit related data - handle failures gracefully
        try {
          console.log("Processing themes and activities");
          await handleThemesAndActivities(hotelId, formData.themes || [], formData.activities || []);
        } catch (themeError) {
          console.warn("Theme submission had issues but continuing:", themeError);
        }
        
        try {
          console.log("Processing availability");
          // Availability should be processed after the hotel has been created/updated
          await handleAvailability(hotelId, formData.available_months || []);
        } catch (availError) {
          console.warn("Availability submission had issues but continuing:", availError);
        }
      }
      
      // Handle submission success even if some related data had issues
      handleSubmissionSuccess();
      
      toast({
        variant: "success",
        title: isEditing ? "Changes Submitted for Review" : "Hotel Submitted",
        description: isEditing 
          ? "Your changes have been submitted and are pending admin approval." 
          : "Your hotel has been submitted and is pending approval. Images will be populated automatically."
      });
      
      // Reset form data after successful submission if not editing
      if (!isEditing) {
        setFormData({
          termsAccepted: false
        });
      }
    } catch (error: any) {
      console.error("=== SUBMISSION ERROR ===");
      console.error("Error submitting hotel:", error);
      console.error("Error message:", error.message);
      console.error("Error details:", error.details);
      console.error("Error code:", error.code);
      
      setIsSubmitted(false);
      setSubmitSuccess(false);
      
      toast({
        variant: "error",
        title: "❌ Submission Failed",
        description: error.message || "There was a problem submitting your property. Please try again."
      });
    }
  };

  return { 
    handleSubmitProperty, 
    showFallback, 
    handleFallbackRedirect 
  };
};
