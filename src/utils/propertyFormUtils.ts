
export const getIncompleteFields = (step: number): string[] => {
  switch (step) {
    case 1:
      return ["Property Name", "Property Type", "Description"];
    case 2:
      return ["Accommodation Terms", "Meal Plans"];
    case 3:
      return ["Affinities", "Activities"];
    case 4:
      return ["FAQ", "Terms & Conditions"];
    default:
      return [];
  }
};

export const validateCurrentStep = (stepValidation: Record<number, boolean>, currentStep: number): boolean => {
  return stepValidation[currentStep];
};
