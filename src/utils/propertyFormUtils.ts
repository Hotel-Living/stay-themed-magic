
export const validateCurrentStep = (
  stepValidation: Record<number, boolean>,
  currentStep: number
): boolean => {
  return stepValidation[currentStep];
};

export const getIncompleteFields = (step: number, formData?: any): string[] => {
  if (!formData) return [];

  switch (step) {
    case 1: {
      const missing: string[] = [];
      if (!formData.hotelName?.trim()) missing.push("Property Name");
      if (!formData.propertyType?.trim()) missing.push("Property Type");
      if (!formData.description?.trim()) missing.push("Description");
      return missing;
    }

    case 2: {
      const missing: string[] = [];
      if (!formData.roomTypes || formData.roomTypes.length === 0) {
        missing.push("Accommodation Terms");
        missing.push("Meal Plans");
      }
      return missing;
    }

    case 3: {
      const missing: string[] = [];
      if (!formData.themes || formData.themes.length === 0) {
        missing.push("Affinities");
      }
      if (!formData.activities || formData.activities.length === 0) {
        missing.push("Activities");
      }
      return missing;
    }

    case 4: {
      const missing: string[] = [];
      if (!formData.faqs || formData.faqs.length === 0) {
        missing.push("FAQ");
      }
      if (!formData.terms?.trim()) {
        missing.push("Terms & Conditions");
      }
      return missing;
    }

    default:
      return [];
  }
};
