
export const useStepNavigation = () => {
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

  const handleStepNavigation = ({
    action,
    currentStep,
    totalSteps,
    stepValidation,
    setCurrentStep,
    setErrorFields,
    setShowValidationErrors,
    toast
  }: any) => {
    if (action === 'next' && !stepValidation[currentStep]) {
      const fields = getIncompleteFields(currentStep);
      setErrorFields(fields);
      setShowValidationErrors(true);
      toast({
        title: "Warning",
        description: "Some fields are incomplete. You can still proceed but please complete them later.",
        variant: "destructive"
      });
    }

    if (action === 'next' && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else if (action === 'previous' && currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  return { handleStepNavigation, getIncompleteFields };
};
