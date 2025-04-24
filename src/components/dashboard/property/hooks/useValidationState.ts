
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FIELD_LABELS } from "@/utils/constants";

export const useValidationState = () => {
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const { toast } = useToast();

  const getIncompleteFields = (step: number, formData: any): string[] => {
    switch (step) {
      case 1:
        const incompleteBasicFields = [];
        if (!formData.hotelName) incompleteBasicFields.push("Property Name");
        if (!formData.propertyType) incompleteBasicFields.push("Property Type");
        if (!formData.description) incompleteBasicFields.push("Description");
        
        // Check for images
        if (!formData.hotelImages || formData.hotelImages.length === 0) {
          incompleteBasicFields.push("Property Images");
        }
        
        return incompleteBasicFields;
      case 2:
        const incompleteAccommodationFields = [];
        
        // Check for stay lengths
        if (!formData.stayLengths || formData.stayLengths.length === 0) {
          incompleteAccommodationFields.push("Length of Stay");
        }
        
        // Check for meal plans
        if (!formData.mealPlans || formData.mealPlans.length === 0) {
          incompleteAccommodationFields.push("Meal Plans");
        }
        
        // Check for room types
        if (!formData.roomTypes || formData.roomTypes.length === 0) {
          incompleteAccommodationFields.push("Room Types");
        }
        
        return incompleteAccommodationFields;
      case 3:
        return [FIELD_LABELS.themes, FIELD_LABELS.activities];
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
