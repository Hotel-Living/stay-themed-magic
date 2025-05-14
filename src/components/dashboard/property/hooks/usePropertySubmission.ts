
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
      
      if (isEditing) {
        // Update existing hotel
        const result = await updateExistingHotel(formData, editingHotelId);
        hotelId = result.id;
        noChangesDetected = result.noChangesDetected;
        changesCount = result.changes;
        
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
        const hotelData = await createNewHotel(formData, userId);
        hotelId = hotelData.id;
        console.log("New hotel created successfully:", hotelId);
      }
      
      console.log("Processing images for hotel:", hotelId);
      
      // Handle image submissions immediately after hotel creation/update
      if (formData.hotelImages && formData.hotelImages.length > 0) {
        console.log("Using custom images:", formData.hotelImages);
        await handleCustomImages(hotelId, formData.hotelImages);
      } else if (!isEditing) {
        // Only use placeholder images for new hotels
        console.log("No images provided, using placeholders");
        await handlePlaceholderImages(hotelId);
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
          : "Your hotel has been submitted and is pending approval."
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
        variant: "error",
        title: "Submission Failed",
        description: error.message || "There was a problem submitting your property."
      });
    }
  };

  return { handleSubmitProperty };
};
