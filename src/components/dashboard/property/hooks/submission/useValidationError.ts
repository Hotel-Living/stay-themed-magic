
import { useToast } from "@/hooks/use-toast";

export const useValidationError = ({
  setErrorFields,
  setShowValidationErrors,
  getIncompleteFields,
  stepValidation
}: {
  setErrorFields: (fields: string[]) => void;
  setShowValidationErrors: (show: boolean) => void;
  getIncompleteFields: (step: number) => string[];
  stepValidation: Record<number, boolean>;
}) => {
  const { toast } = useToast();

  const handleValidationError = () => {
    const invalidSteps = Object.entries(stepValidation)
      .filter(([_, isValid]) => !isValid)
      .map(([step]) => parseInt(step));
    const allIncompleteFields = invalidSteps.flatMap(step => getIncompleteFields(step));
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
