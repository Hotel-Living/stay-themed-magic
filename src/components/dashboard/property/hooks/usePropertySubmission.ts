
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
        result = await updateExistingHotel(formData, editingHotelId);
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
    } catch (error: any) {
      console.error("Error submitting property:", error);
      
      let errorMessage = "There was an error submitting your property. Please try again.";
      let errorTitle = "Submission Error";
      
      // Provide specific error messages based on error type
      if (error?.message) {
        if (error.message.includes("User not authenticated")) {
          errorTitle = "Authentication Error";
          errorMessage = "You must be logged in to submit a property. Please sign in and try again.";
        } else if (error.message.includes("duplicate key") || error.code === "23505") {
          errorTitle = "Duplicate Entry";
          errorMessage = "A property with this information already exists. Please check your data and try again.";
        } else if (error.message.includes("not null") || error.code === "23502") {
          errorTitle = "Missing Required Fields";
          errorMessage = "Please ensure all required fields are filled out before submitting.";
        } else if (error.message.includes("foreign key") || error.code === "23503") {
          errorTitle = "Invalid Data Reference";
          errorMessage = "Some selected options are no longer valid. Please review your selections and try again.";
        } else if (error.code === "PGRST116") {
          errorTitle = "No Data Found";
          errorMessage = "Required data could not be found. Please refresh the page and try again.";
        } else if (error.code?.startsWith("PGRST")) {
          errorTitle = "Database Error";
          errorMessage = `Database error: ${error.message}. Please contact support if this persists.`;
        } else {
          errorMessage = `Error: ${error.message}`;
        }
      } else if (error?.code) {
        errorMessage = `System error (${error.code}). Please contact support if this issue persists.`;
      }
      
      toast({
        title: errorTitle,
        description: errorMessage,
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
