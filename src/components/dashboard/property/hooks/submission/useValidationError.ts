
import { useToast } from "@/hooks/use-toast";
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
  getIncompleteFields: (step: number, formData: PropertyFormData) => string[];
  stepValidation: Record<number, boolean>;
  formData: PropertyFormData;
}) => {
  const { toast } = useToast();

  const handleValidationError = () => {
    const invalidSteps = Object.entries(stepValidation)
      .filter(([_, isValid]) => !isValid)
      .map(([step]) => parseInt(step));
    
    const allIncompleteFields = invalidSteps.flatMap(step => getIncompleteFields(step, formData));
    setErrorFields(allIncompleteFields);
    setShowValidationErrors(true);

    toast({
      title: "Cannot Submit Property",
      description: "Please complete all required fields before submitting.",
      variant: "destructive"
    });
  };

  return { handleValidationError };
};
