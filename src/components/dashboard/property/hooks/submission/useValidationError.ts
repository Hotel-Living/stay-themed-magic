
import { useToast, toast } from "@/hooks/use-toast";
import { PropertyFormData } from "../usePropertyFormData";

export const useValidationError = ({
  setErrorFields,
  setShowValidationErrors,
  getIncompleteFields,
  stepValidation,
  formData
}: {
  setErrorFields: (fields: string[]) => void;
  setShowValidationErrors: (show: boolean) => void;
  getIncompleteFields: (step: number) => string[];
  stepValidation: Record<number, boolean>;
  formData: PropertyFormData;
}) => {
  const { toast: useToastRef } = useToast();

  const handleValidationError = () => {
    const invalidSteps = Object.entries(stepValidation)
      .filter(([_, isValid]) => !isValid)
      .map(([step]) => parseInt(step));
    
    const allIncompleteFields = invalidSteps.flatMap(step => getIncompleteFields(step));
    setErrorFields(allIncompleteFields);
    setShowValidationErrors(true);

    toast.error("Cannot Submit Property", {
      description: "Please complete all required fields before submitting."
    });
  };

  return { handleValidationError };
};
