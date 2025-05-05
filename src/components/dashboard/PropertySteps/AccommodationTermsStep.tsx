
import React from "react";
import StayLengthSection from "./AccommodationTerms/StayLengthSection";
import PreferredWeekdaySection from "./AccommodationTerms/PreferredWeekdaySection";
import AvailabilitySection from "./AccommodationTerms/AvailabilitySection";
import MealPlanSection from "./AccommodationTerms/MealPlanSection";
import RoomsRatesSection from "./AccommodationTerms/RoomsRatesSection";
import { PropertyFormData } from "../property/hooks/usePropertyFormData";
import ValidationMessages from "./AccommodationTerms/ValidationMessages";
import useAccommodationTerms from "./AccommodationTerms/hooks/useAccommodationTerms";
import AccommodationSections from "./AccommodationTerms/components/AccommodationSections";

interface AccommodationTermsStepProps {
  onValidationChange: (isValid: boolean) => void;
  formData: PropertyFormData;
  updateFormData: (field: string, value: any) => void;
}

export function AccommodationTermsStep({
  onValidationChange,
  formData,
  updateFormData
}: AccommodationTermsStepProps) {
  const {
    stayLengths,
    checkinDay,
    mealPlans,
    available_months,
    openSections,
    setOpenSections,
    validationState,
    setValidationState,
    handleStayLengthChange,
    handleCheckinDayChange,
    handleMealPlansChange,
    handleAvailableMonthsChange
  } = useAccommodationTerms({
    onValidationChange,
    formData,
    updateFormData
  });

  return (
    <div className="space-y-6 max-w-[80%]">
      <h2 className="text-xl font-bold mb-4 text-white">3. ACCOMMODATION TERMS</h2>
      
      <AccommodationSections
        openSections={openSections}
        setOpenSections={setOpenSections}
        stayLengths={stayLengths}
        checkinDay={checkinDay}
        mealPlans={mealPlans}
        available_months={available_months}
        formData={formData}
        updateFormData={updateFormData}
        validationState={validationState}
        setValidationState={setValidationState}
        handleStayLengthChange={handleStayLengthChange}
        handleCheckinDayChange={handleCheckinDayChange}
        handleMealPlansChange={handleMealPlansChange}
        handleAvailableMonthsChange={handleAvailableMonthsChange}
      />
      
      <ValidationMessages validationState={validationState} />
    </div>
  );
}
