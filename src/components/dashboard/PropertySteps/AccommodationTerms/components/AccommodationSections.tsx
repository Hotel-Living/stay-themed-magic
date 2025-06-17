
import React from 'react';
import PreferredWeekdaySection from '../PreferredWeekdaySection';
import AvailabilitySection from '../AvailabilitySection';
import StayLengthSection from '../StayLengthSection';
import MealPlanSection from '../MealPlanSection';
import RoomsRatesSection from '../RoomsRatesSection';

interface AccommodationSectionsProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  sectionsState: {
    stayLength: boolean;
    mealPlan: boolean;
    roomRates: boolean;
  };
  validationState: any;
  weekdayState: any;
  stayLengthState: any;
  updateSectionState: (section: string) => void;
  updateWeekdayState: (weekday: string) => void;
  updateStayLengthState: (lengths: number[]) => void;
  onValidationChange: (isValid: boolean) => void;
}

export const AccommodationSections = ({
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
}: AccommodationSectionsProps) => {
  return (
    <div className="space-y-6">
      <PreferredWeekdaySection 
        preferredWeekday={weekdayState.selectedWeekday}
        onWeekdayChange={updateWeekdayState}
      />
      
      <AvailabilitySection 
        formData={formData}
        updateFormData={updateFormData}
        onValidationChange={(valid) => {
          if (!valid) onValidationChange(false);
        }}
      />
      
      <StayLengthSection 
        isOpen={sectionsState.stayLength}
        onOpenChange={() => updateSectionState('stayLength')}
        onValidationChange={(valid) => {
          if (!valid) onValidationChange(false);
        }}
        formData={formData}
        updateFormData={updateFormData}
      />
      
      <MealPlanSection 
        isOpen={sectionsState.mealPlan}
        onOpenChange={() => updateSectionState('mealPlan')}
        onValidationChange={(valid) => {
          if (!valid) onValidationChange(false);
        }}
        formData={formData}
        updateFormData={updateFormData}
      />
      
      <RoomsRatesSection
        isOpen={sectionsState.roomRates}
        onOpenChange={() => updateSectionState('roomRates')}
        onValidationChange={(valid) => {
          if (!valid) onValidationChange(false);
        }}
        formData={{
          ...formData,
          preferredWeekday: weekdayState.selectedWeekday
        }}
        updateFormData={updateFormData}
      />
    </div>
  );
};
