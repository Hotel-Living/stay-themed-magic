
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { StayLengthSection } from './StayLengthSection';
import { PreferredWeekdaySection } from './PreferredWeekdaySection';
import { RoomsRatesSection } from './RoomRates/RoomsRatesSection';
import { AvailabilitySection } from './sections/AvailabilitySection';
import { ValidationMessages } from './ValidationMessages';
import { useAccommodationTerms } from './hooks/useAccommodationTerms';
import { useValidationState } from './hooks/useValidationState';
import { useSectionsState } from './hooks/useSectionsState';

interface AccommodationTermsStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

export const AccommodationTermsStep: React.FC<AccommodationTermsStepProps> = ({
  formData,
  updateFormData,
  onValidationChange
}) => {
  const { t } = useTranslation();
  const [showValidation, setShowValidation] = useState(false);
  
  // Section visibility states
  const {
    isStayLengthOpen,
    setIsStayLengthOpen,
    isWeekdayOpen,
    setIsWeekdayOpen,
    isRatesOpen,
    setIsRatesOpen,
    isAvailabilityOpen,
    setIsAvailabilityOpen
  } = useSectionsState();

  // Validation state
  const { validationErrors, updateValidationErrors } = useValidationState();

  // Main accommodation terms logic
  const {
    stayLengthOptions,
    weekdayOptions,
    handleStayLengthChange,
    handleWeekdayChange,
    handleRatesChange,
    handleAvailabilityChange
  } = useAccommodationTerms(formData, updateFormData);

  // Update validation when form data changes
  useEffect(() => {
    const errors = [];
    
    if (!formData.stayLength || formData.stayLength.length === 0) {
      errors.push(t('dashboard.validation.stayLengthRequired'));
    }
    
    if (!formData.preferredWeekday) {
      errors.push(t('dashboard.validation.weekdayRequired'));
    }
    
    updateValidationErrors(errors);
    onValidationChange(errors.length === 0);
  }, [formData.stayLength, formData.preferredWeekday, t, updateValidationErrors, onValidationChange]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          {t('dashboard.steps.accommodationTerms')}
        </h2>
        <p className="text-white/80">
          {t('dashboard.accommodationTerms.description')}
        </p>
      </div>

      {/* Stay Length Section */}
      <StayLengthSection
        isOpen={isStayLengthOpen}
        onToggle={setIsStayLengthOpen}
        formData={formData}
        updateFormData={updateFormData}
        stayLengthOptions={stayLengthOptions}
        onStayLengthChange={handleStayLengthChange}
      />

      {/* Preferred Weekday Section */}
      <PreferredWeekdaySection
        isOpen={isWeekdayOpen}
        onToggle={setIsWeekdayOpen}
        formData={formData}
        updateFormData={updateFormData}
        weekdayOptions={weekdayOptions}
        onWeekdayChange={handleWeekdayChange}
      />

      {/* Rooms & Rates Section */}
      <RoomsRatesSection
        isOpen={isRatesOpen}
        onToggle={setIsRatesOpen}
        formData={formData}
        updateFormData={updateFormData}
        onRatesChange={handleRatesChange}
      />

      {/* Availability Section */}
      <AvailabilitySection
        isOpen={isAvailabilityOpen}
        onToggle={setIsAvailabilityOpen}
        formData={formData}
        updateFormData={updateFormData}
      />

      {/* Validation Messages */}
      {showValidation && (
        <ValidationMessages 
          errors={validationErrors}
          onDismiss={() => setShowValidation(false)}
        />
      )}

      {/* Show Validation Button */}
      <div className="flex justify-center">
        <Button
          onClick={() => setShowValidation(true)}
          variant="outline"
          className="text-white border-white hover:bg-white hover:text-purple-900"
        >
          {t('dashboard.validation.checkValidation')}
        </Button>
      </div>
    </div>
  );
};
