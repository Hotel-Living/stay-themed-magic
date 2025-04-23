
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useValidationState = () => {
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const { toast } = useToast();

  const getIncompleteFields = (step: number): string[] => {
    switch (step) {
      case 1:
        return ["Property Name", "Property Type", "Description"];
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
