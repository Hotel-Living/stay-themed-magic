
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { PropertyFormData } from "./usePropertyFormData";
import { useHotelSubmission } from "./submission/useHotelSubmission";

export const usePropertySubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { createNewHotel, updateExistingHotel } = useHotelSubmission();

  const submitProperty = async (formData: PropertyFormData, editingHotelId?: string) => {
    setIsSubmitting(true);
    
    try {
      let result;
      
      if (editingHotelId) {
        console.log("Updating existing hotel:", editingHotelId);
        result = await updateExistingHotel(editingHotelId, formData);
      } else {
        console.log("Creating new hotel");
        result = await createNewHotel(formData);
      }

      toast({
        title: editingHotelId ? "Hotel Updated" : "Hotel Created",
        description: editingHotelId 
          ? "Your hotel has been updated successfully." 
          : "Your hotel has been created and is pending approval.",
        variant: "default"
      });

      return result;
    } catch (error) {
      console.error("Error submitting property:", error);
      
      toast({
        title: "Submission Error",
        description: "There was an error submitting your property. Please try again.",
        variant: "destructive"
      });
      
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitProperty,
    isSubmitting
  };
};
