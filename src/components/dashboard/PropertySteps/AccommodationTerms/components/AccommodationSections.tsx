
import React from 'react';
import { PreferredWeekdaySection } from '../PreferredWeekdaySection';
import { AvailabilitySection } from '../AvailabilitySection';
import { StayLengthSection } from '../StayLengthSection';
import MealPlanSection from '../MealPlanSection';
import RoomsRatesSection from '../RoomsRatesSection';

interface AccommodationSectionsProps {
  selectedWeekday: string;
  handleWeekdayChange: (weekday: string) => void;
  formData: any;
  updateFormData: (field: string, value: any) => void;
  sectionsState: {
    stayLength: boolean;
    mealPlan: boolean;
    roomRates: boolean;
  };
  toggleSection: (section: string) => void;
  onCheckValidation: () => void;
}

export const AccommodationSections = ({
  selectedWeekday,
  handleWeekdayChange,
  formData,
  updateFormData,
  sectionsState,
  toggleSection,
  onCheckValidation
}: AccommodationSectionsProps) => {
  return (
    <div className="space-y-6">
      <PreferredWeekdaySection 
        preferredWeekday={selectedWeekday}
        onWeekdayChange={handleWeekdayChange}
      />
      
      <AvailabilitySection 
        formData={formData}
        updateFormData={updateFormData}
        onValidationChange={(valid) => {
          if (!valid) onCheckValidation();
        }}
      />
      
      <StayLengthSection 
        isOpen={sectionsState.stayLength}
        onOpenChange={() => toggleSection('stayLength')}
        onValidationChange={(valid) => {
          if (!valid) onCheckValidation();
        }}
        formData={formData}
        updateFormData={updateFormData}
      />
      
      <MealPlanSection 
        isOpen={sectionsState.mealPlan}
        onOpenChange={() => toggleSection('mealPlan')}
        onValidationChange={(valid) => {
          if (!valid) onCheckValidation();
        }}
        formData={formData}
        updateFormData={updateFormData}
      />
      
      <RoomsRatesSection
        isOpen={sectionsState.roomRates}
        onOpenChange={() => toggleSection('roomRates')}
        onValidationChange={(valid) => {
          if (!valid) onCheckValidation();
        }}
        formData={{
          ...formData,
          preferredWeekday: selectedWeekday
        }}
        updateFormData={updateFormData}
      />
    </div>
  );
};
