
import React from "react";
import { useAccommodationTerms } from "../../PropertySteps/AccommodationTerms/hooks/useAccommodationTerms";
import { AccommodationSections } from "../../PropertySteps/AccommodationTerms/components/AccommodationSections";
import { AccommodationValidation } from "../../PropertySteps/AccommodationTerms/components/AccommodationValidation";
import { RoomTypesSection } from "../components/RoomTypesSection";

interface NewStep3AccommodationTermsProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

export const NewStep3AccommodationTerms: React.FC<NewStep3AccommodationTermsProps> = ({
  formData,
  updateFormData,
  onValidationChange
}) => {
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
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">ACCOMMODATION TERMS</h2>
        <p className="text-gray-300">Define your accommodation terms and room types</p>
      </div>

      <AccommodationSections
        sectionsState={sectionsState}
        validationState={validationState}
        weekdayState={weekdayState}
        stayLengthState={stayLengthState}
        updateSectionState={updateSectionState}
        updateWeekdayState={updateWeekdayState}
        updateStayLengthState={updateStayLengthState}
        formData={formData}
        updateFormData={updateFormData}
      />

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-white mb-4">ROOM TYPES</h3>
        <RoomTypesSection
          formData={formData}
          updateFormData={updateFormData}
          onValidationChange={onValidationChange}
        />
      </div>

      <AccommodationValidation 
        error={validationState.error}
        hasInteracted={validationState.hasInteracted}
        showValidationErrors={validationState.showValidationErrors}
        isValid={validationState.isValid}
        formData={formData}
      />
    </div>
  );
};
