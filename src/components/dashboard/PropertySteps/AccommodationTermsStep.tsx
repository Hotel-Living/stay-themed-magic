
import React, { useEffect } from "react";
import { useAccommodationTerms } from "./AccommodationTerms/hooks/useAccommodationTerms";
import { AccommodationValidation } from "./AccommodationTerms/components/AccommodationValidation";
import { AccommodationSections } from "./AccommodationTerms/components/AccommodationSections";
import { validateAccommodationTerms, formatMonths } from "./AccommodationTerms/utils/validation";

interface AccommodationTermsStepProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

const AccommodationTermsStep = ({
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {}
}: AccommodationTermsStepProps) => {
  const {
    selectedWeekday,
    selectedStayLengths,
    selectedMealPlans,
    roomTypes,
    error,
    setError,
    showValidationErrors,
    setShowValidationErrors,
    hasInteracted,
    sectionsState,
    handleWeekdayChange,
    toggleSection,
    isValid
  } = useAccommodationTerms({
    formData,
    updateFormData,
    onValidationChange
  });

  const checkValidation = () => {
    const isValid = validateAccommodationTerms(
      selectedStayLengths, 
      selectedMealPlans, 
      roomTypes,
      formData.available_months
    );
    
    if (!isValid) {
      setError("Please complete all required fields");
    } else {
      setError("");
      setShowValidationErrors(false);
    }
    
    onValidationChange(isValid);
    return isValid;
  };

  useEffect(() => {
    if (formData.available_months && Array.isArray(formData.available_months)) {
      const months = formatMonths(formData.available_months);
      updateFormData('available_months', months);
    }
  }, []);

  useEffect(() => {
    checkValidation();
  }, [selectedStayLengths, selectedMealPlans, roomTypes, formData.available_months]);

  return (
    <div className="space-y-6 max-w-[80%]">
      <h2 className="text-xl font-bold mb-4 text-white">ACCOMMODATION TERMS</h2>
      
      <AccommodationValidation 
        error={error}
        hasInteracted={hasInteracted}
        showValidationErrors={showValidationErrors}
        isValid={isValid}
      />
      
      <AccommodationSections 
        selectedWeekday={selectedWeekday}
        handleWeekdayChange={handleWeekdayChange}
        formData={formData}
        updateFormData={updateFormData}
        sectionsState={sectionsState}
        toggleSection={toggleSection}
        onCheckValidation={checkValidation}
      />
    </div>
  );
};

export default AccommodationTermsStep;
