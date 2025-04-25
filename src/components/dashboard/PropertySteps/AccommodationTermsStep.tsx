
import React from "react";
import StayLengthSection from "./AccommodationTerms/StayLengthSection";
import MealPlanSection from "./AccommodationTerms/MealPlanSection";
import RoomsRatesSection from "./AccommodationTerms/RoomsRatesSection";
import PreferredWeekdaySection from "./AccommodationTerms/PreferredWeekdaySection";
import ValidationMessages from "./AccommodationTerms/ValidationMessages";
import { useAccommodationTerms } from "./AccommodationTerms/hooks/useAccommodationTerms";

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
    error,
    showValidationErrors,
    hasInteracted,
    sectionsState,
    handleWeekdayChange,
    handleStayLengthChange,
    handleMealPlanChange,
    handleRoomTypesChange,
    toggleSection,
    isValid
  } = useAccommodationTerms({
    formData,
    updateFormData,
    onValidationChange
  });

  // Make sure we have a well-formed array of available months (if any)
  React.useEffect(() => {
    if (formData.available_months && Array.isArray(formData.available_months)) {
      // Normalize months to have proper capitalization and remove duplicates
      const months = [...new Set(formData.available_months.map((month: string) => {
        if (typeof month !== 'string') return '';
        return month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
      }))].filter(Boolean);
      
      updateFormData('available_months', months);
    }
  }, []);

  return (
    <div className="space-y-6 max-w-[80%]">
      <h2 className="text-xl font-bold mb-4 text-white">ACCOMMODATION TERMS</h2>
      
      <ValidationMessages 
        error={error}
        showErrors={hasInteracted && showValidationErrors}
        isValid={isValid}
      />
      
      <div className="space-y-6">
        <PreferredWeekdaySection 
          preferredWeekday={selectedWeekday}
          onWeekdayChange={handleWeekdayChange}
        />
        
        <StayLengthSection 
          isOpen={sectionsState.stayLength}
          onOpenChange={() => toggleSection('stayLength')}
          onValidationChange={(valid) => {
            if (!valid) onValidationChange(false);
          }}
          formData={formData}
          updateFormData={updateFormData}
        />
        
        <MealPlanSection 
          isOpen={sectionsState.mealPlan}
          onOpenChange={() => toggleSection('mealPlan')}
          onValidationChange={(valid) => {
            if (!valid) onValidationChange(false);
          }}
          formData={formData}
          updateFormData={updateFormData}
        />
        
        <RoomsRatesSection
          isOpen={sectionsState.roomRates}
          onOpenChange={() => toggleSection('roomRates')}
          onValidationChange={(valid) => {
            if (!valid) onValidationChange(false);
          }}
          formData={{
            ...formData,
            preferredWeekday: selectedWeekday,
            stayLengths: selectedStayLengths
          }}
          updateFormData={updateFormData}
        />
      </div>
    </div>
  );
};

export default AccommodationTermsStep;
