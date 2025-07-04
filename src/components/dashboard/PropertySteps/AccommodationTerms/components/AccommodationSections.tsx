
import React from "react";
import StayLengthSection from "../StayLengthSection";
import PreferredWeekdaySection from "../PreferredWeekdaySection";
import AvailabilitySection from "../AvailabilitySection";
import MealPlanSection from "../MealPlanSection";
import RoomsRatesSection from "../RoomsRatesSection";
import ValidationMessages from "../ValidationMessages";
import { useTranslation } from "@/hooks/useTranslation";

interface AccommodationSectionsProps {
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
  sectionsState: any;
  validationState: any;
  weekdayState: any;
  stayLengthState: any;
  updateSectionState: (section: string, isOpen: boolean) => void;
  updateWeekdayState: (field: string, value: any) => void;
  updateStayLengthState: (lengths: number[]) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export const AccommodationSections: React.FC<AccommodationSectionsProps> = ({
  formData,
  updateFormData,
  sectionsState,
  validationState,
  weekdayState,
  stayLengthState,
  updateSectionState,
  updateWeekdayState,
  updateStayLengthState,
  onValidationChange
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <StayLengthSection
        isOpen={sectionsState.stayLength}
        onToggle={(isOpen) => updateSectionState('stayLength', isOpen)}
        selectedLengths={stayLengthState.selectedLengths}
        onLengthToggle={(field, value) => updateStayLengthState(value)}
        formData={formData}
        updateFormData={updateFormData}
      />

      <PreferredWeekdaySection
        isOpen={sectionsState.weekday}
        onToggle={(isOpen) => updateSectionState('weekday', isOpen)}
        selectedDay={weekdayState.selectedDay}
        onDaySelect={updateWeekdayState}
        formData={formData}
        updateFormData={updateFormData}
      />

      <AvailabilitySection
        isOpen={sectionsState.availability}
        onToggle={(isOpen) => updateSectionState('availability', isOpen)}
        formData={formData}
        updateFormData={updateFormData}
      />

      <MealPlanSection
        isOpen={sectionsState.mealPlans}
        onToggle={(isOpen) => updateSectionState('mealPlans', isOpen)}
        formData={formData}
        updateFormData={updateFormData}
      />

      <RoomsRatesSection
        isOpen={sectionsState.roomRates}
        onToggle={(isOpen) => updateSectionState('roomRates', isOpen)}
        formData={formData}
        updateFormData={updateFormData}
      />

      <ValidationMessages 
        validationState={validationState}
        formData={formData}
      />
    </div>
  );
};
