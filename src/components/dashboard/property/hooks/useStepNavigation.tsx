
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
    console.log(`Handling ${action} navigation from step ${currentStep}`, { stepValidation });
    
    if (action === 'next') {
      // Allow navigation even if step is not valid, just show warning
      if (!stepValidation[currentStep]) {
        const fields = getIncompleteFields(currentStep);
        setErrorFields(fields);
        setShowValidationErrors(true);
        toast({
          title: "Warning",
          description: "Some fields are incomplete. You can still proceed but please complete them later.",
          variant: "destructive"
        });
      }

      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
        console.log(`Navigation succeeded: moving to step ${currentStep + 1}`);
      }
    } else if (action === 'previous' && currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
      console.log(`Navigation succeeded: moving back to step ${currentStep - 1}`);
    }
  };

  return { handleStepNavigation, getIncompleteFields };
};
