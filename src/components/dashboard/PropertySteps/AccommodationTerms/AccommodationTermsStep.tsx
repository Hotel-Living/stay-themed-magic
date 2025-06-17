
import React from "react";
import { useAccommodationTerms } from "./hooks/useAccommodationTerms";
import AccommodationSections from "./components/AccommodationSections";

interface AccommodationTermsStepProps {
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export default function AccommodationTermsStep({
  formData,
  updateFormData,
  onValidationChange
}: AccommodationTermsStepProps) {
  const {
    sectionsState,
    validationState,
    weekdayState,
    stayLengthState,
    updateSectionState,
    updateWeekdayState,
    updateStayLengthState
  } = useAccommodationTerms(formData, updateFormData, onValidationChange);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">CONDICIONES DE LA ESTANCIA</h2>
        <p className="text-gray-300">Configure los términos y condiciones de la estancia en su propiedad</p>
      </div>
      
      <AccommodationSections
        formData={formData}
        updateFormData={updateFormData}
        sectionsState={sectionsState}
        validationState={validationState}
        weekdayState={weekdayState}
        stayLengthState={stayLengthState}
        updateSectionState={updateSectionState}
        updateWeekdayState={updateWeekdayState}
        updateStayLengthState={updateStayLengthState}
        onValidationChange={onValidationChange}
      />
    </div>
  );
}
