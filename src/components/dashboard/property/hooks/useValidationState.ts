
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
        const incompleteThemeFields = [];
        
        // Changed from "Themes" to "Affinities" to match UI terminology
        // Also fixed validation to properly check the array length
        const hasThemes = formData.themes && Array.isArray(formData.themes) && formData.themes.length > 0;
        if (!hasThemes) {
          incompleteThemeFields.push("Affinities");
        }
        
        // Only validate activities if they exist - skip UUID validation for themes
        if (formData.activities && Array.isArray(formData.activities)) {
          const validUUIDRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          
          // We'll only check UUID format for activities, not themes
          const validActivities = formData.activities.filter(id => id && typeof id === 'string' && validUUIDRegex.test(id));
          
          if (validActivities.length === 0) {
            incompleteThemeFields.push("Activities");
          }
        } else {
          incompleteThemeFields.push("Activities");
        }
        
        return incompleteThemeFields;
      case 4:
        // Check ONLY for Terms & Conditions acceptance
        console.log("Checking Terms & Conditions acceptance:", formData.termsAccepted);
        return formData.termsAccepted ? [] : ["Terms & Conditions"];
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
