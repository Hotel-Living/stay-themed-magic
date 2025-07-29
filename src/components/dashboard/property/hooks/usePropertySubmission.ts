
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
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
      let hotelData: any;
      
      if (isEditing) {
        // Update existing hotel directly
        const { data: result, error } = await supabase
          .from('hotels')
          .update({
            name: formData.hotelName,
            description: formData.description,
            country: formData.country,
            address: formData.address,
            city: formData.city,
            postal_code: formData.postalCode,
            contact_name: formData.contactName,
            contact_email: formData.contactEmail,
            contact_phone: formData.contactPhone,
            status: 'pending'
          })
          .eq('id', editingHotelId)
          .select()
          .single();
        
        if (error) {
          throw error;
        }
        
        hotelId = result.id;
        console.log(`Hotel update completed for hotel: ${hotelId}`);
      } else {
        // Create new hotel directly
        console.log("=== STARTING HOTEL CREATION ===");
        const { data: result, error } = await supabase
          .from('hotels')
          .insert({
            name: formData.hotelName,
            description: formData.description,
            country: formData.country,
            address: formData.address,
            city: formData.city,
            postal_code: formData.postalCode,
            contact_name: formData.contactName,
            contact_email: formData.contactEmail,
            contact_phone: formData.contactPhone,
            status: 'pending',
            user_id: userId
          })
          .select()
          .single();
        
        if (error) {
          throw error;
        }
        
        hotelData = result;
        hotelId = hotelData.id;
        console.log("=== HOTEL CREATION COMPLETED ===");
        console.log("New hotel created successfully:", hotelId);
      }
      
      setIsSubmitted(false);
      setSubmitSuccess(true);
      
      toast({
        variant: "success",
        title: isEditing ? "Hotel Updated" : "Hotel Submitted",
        description: isEditing 
          ? "Your hotel has been updated successfully." 
          : "Your hotel has been submitted and is pending approval."
      });
      
      // Reset form data after successful submission if not editing
      if (!isEditing) {
        setTimeout(() => {
          setCurrentStep(1);
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
            termsAccepted: false,
            hotelImages: []
          });
          if (onDoneEditing) onDoneEditing();
        }, 2000);
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
    handleSubmitProperty
  };
};
