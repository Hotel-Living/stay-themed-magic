
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
        return ["Accommodation Terms", "Meal Plans"];
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
