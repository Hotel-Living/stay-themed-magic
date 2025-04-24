
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { PropertyFormData } from "./usePropertyFormData";

export const useValidationState = () => {
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const { toast } = useToast();

  const getIncompleteFields = (step: number, formData: PropertyFormData): string[] => {
    switch (step) {
      case 1:
        const incompleteBasicFields = [];
        if (!formData.hotelName) incompleteBasicFields.push("Property Name");
        if (!formData.propertyType) incompleteBasicFields.push("Property Type");
        if (!formData.description) incompleteBasicFields.push("Description");
        
        // Check for images with proper null/undefined handling
        const hasImages = formData.hotelImages && Array.isArray(formData.hotelImages) && formData.hotelImages.length > 0;
        if (!hasImages) {
          incompleteBasicFields.push("Property Images");
        }
        
        return incompleteBasicFields;
      case 2:
        const incompleteAccommodationFields = [];
        
        // Check for stay lengths with better null handling
        const hasStayLengths = formData.stayLengths && Array.isArray(formData.stayLengths) && formData.stayLengths.length > 0;
        if (!hasStayLengths) {
          incompleteAccommodationFields.push("Length of Stay");
        }
        
        // Check for meal plans with better null handling
        const hasMealPlans = formData.mealPlans && Array.isArray(formData.mealPlans) && formData.mealPlans.length > 0;
        if (!hasMealPlans) {
          incompleteAccommodationFields.push("Meal Plans");
        }
        
        // Check for room types with better null handling
        const hasRoomTypes = formData.roomTypes && Array.isArray(formData.roomTypes) && formData.roomTypes.length > 0;
        if (!hasRoomTypes) {
          incompleteAccommodationFields.push("Room Types");
        }
        
        return incompleteAccommodationFields;
      case 3:
        return ["Themes", "Activities"];
      case 4:
        return ["FAQ", "Terms & Conditions"];
      default:
        return [];
    }
  };

  return {
    errorFields,
    setErrorFields,
    showValidationErrors,
    setShowValidationErrors,
    getIncompleteFields,
    toast
  };
};
