
export const getIncompleteFields = (step: number, formData?: any): string[] => {
  switch (step) {
    case 1:
      // Validate Step One fields
      const step1Fields: string[] = [];
      if (!formData?.hotelName) step1Fields.push("Property Name");
      if (!formData?.propertyType) step1Fields.push("Property Type");
      if (!formData?.description) step1Fields.push("Description");
      return step1Fields;
    case 2:
      // Validate Step Two fields
      const step2Fields: string[] = [];
      if (!formData?.roomTypes || formData.roomTypes.length === 0) {
        step2Fields.push("Accommodation Terms");
        step2Fields.push("Meal Plans");
      }
      return step2Fields;
    case 3:
      // Validate Step Three fields
      const step3Fields: string[] = [];
      if (!formData?.themes || formData.themes.length === 0) step3Fields.push("Affinities");
      if (!formData?.activities || formData.activities.length === 0) step3Fields.push("Activities");
      return step3Fields;
    case 4:
      // Validate Step Four fields
      const step4Fields: string[] = [];
      if (!formData?.faqs || formData.faqs.length === 0) step4Fields.push("FAQ");
      if (!formData?.terms) step4Fields.push("Terms & Conditions");
      return step4Fields;
    default:
      return [];
  }
};
