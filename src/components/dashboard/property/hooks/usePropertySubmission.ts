
import { useToast } from "@/hooks/use-toast";
import { PropertyFormData } from "./usePropertyFormData";
import { supabase } from "@/integrations/supabase/client";

interface PropertySubmissionProps {
  formData: PropertyFormData;
  setIsSubmitted: (value: boolean) => void;
  setSubmitSuccess: (value: boolean) => void;
  setErrorFields: (fields: string[]) => void;
  setShowValidationErrors: (show: boolean) => void;
  userId?: string;
  onDoneEditing?: () => void;
}

export const usePropertySubmission = ({
  formData,
  setIsSubmitted,
  setSubmitSuccess,
  setErrorFields,
  setShowValidationErrors,
  userId,
  onDoneEditing
}: PropertySubmissionProps) => {
  const { toast } = useToast();

  const handleSubmitProperty = async (editingHotelId: string | null = null) => {
    try {
      setIsSubmitted(true);
      setErrorFields([]);
      setShowValidationErrors(false);

      // Get current authenticated user - no role validation needed
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        toast({
          title: "Authentication Error",
          description: "Please log in to submit your property.",
          variant: "destructive"
        });
        setIsSubmitted(false);
        return;
      }

      // Prepare hotel data for submission
      const hotelData = {
        name: formData.hotelName,
        description: formData.description,
        city: formData.city,
        country: formData.country,
        address: formData.address,
        latitude: formData.latitude ? parseFloat(formData.latitude.toString()) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude.toString()) : null,
        category: formData.category ? parseInt(formData.category) : null,
        property_type: formData.propertyType,
        style: formData.style,
        price_per_month: formData.price_per_month || 0,
        owner_id: user.id,
        status: 'pending'
      };

      let result;
      
      if (editingHotelId) {
        // Update existing hotel
        result = await supabase
          .from('hotels')
          .update(hotelData)
          .eq('id', editingHotelId)
          .eq('owner_id', user.id) // Ensure user can only edit their own properties
          .select()
          .single();
      } else {
        // Create new hotel
        result = await supabase
          .from('hotels')
          .insert(hotelData)
          .select()
          .single();
      }

      if (result.error) {
        console.error('Hotel submission error:', result.error);
        toast({
          title: "Submission Failed",
          description: result.error.message || "Failed to submit property. Please try again.",
          variant: "destructive"
        });
        setIsSubmitted(false);
        return;
      }

      setSubmitSuccess(true);
      toast({
        title: "Property Submitted Successfully",
        description: editingHotelId ? "Property updated successfully!" : "Property submitted for review!",
      });

      if (onDoneEditing) {
        onDoneEditing();
      }

    } catch (error) {
      console.error('Unexpected error during submission:', error);
      toast({
        title: "Submission Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      setIsSubmitted(false);
    }
  };

  return { 
    handleSubmitProperty, 
    showFallback: false, 
    handleFallbackRedirect: () => {} 
  };
};
