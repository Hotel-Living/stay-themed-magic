import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import StayLengthSection from './StayLengthSection';
import PreferredWeekdaySection from './PreferredWeekdaySection';
import ValidationMessages from './ValidationMessages';
import { useValidationState } from './hooks/useValidationState';
import { useSectionsState } from './hooks/useSectionsState';

interface AccommodationTermsStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

const AccommodationTermsStep: React.FC<AccommodationTermsStepProps> = ({
  formData,
  updateFormData,
  onValidationChange
}) => {
  const { t } = useTranslation();
  const [showValidation, setShowValidation] = useState(false);
  
  // Section visibility states
  const { sectionsState, toggleSection } = useSectionsState();

  // Validation state
  const { 
    error, 
    setError, 
    showValidationErrors, 
    setShowValidationErrors, 
    hasInteracted, 
    setHasInteracted, 
    isValid 
  } = useValidationState({
    selectedStayLengths: formData.stayLengths || [],
    selectedMealPlans: formData.mealPlans || [],
    roomTypes: formData.roomTypes || [],
    onValidationChange
  }); // ← cierre correctamente añadido aquí

  // Update validation when form data changes
  useEffect(() => {
    const errors = [];
    
    if (!formData.stayLength || formData.stayLength.length === 0) {
      errors.push(t('dashboard.validation.stayLengthRequired'));
    }
    
    if (!formData.preferredWeekday) {
      errors.push(t('dashboard.validation.weekdayRequired'));
    }
    
    onValidationChange(errors.length === 0);
  }, [formData.stayLength, formData.preferredWeekday, t, onValidationChange]);

  const handleStayLengthToggle = (field: string, value: any) => {
    updateFormData(field, value);
  };

  const handleWeekdaySelect = (field: string, value: any) => {
    updateFormData(field, value);
  };

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
        isOpen={sectionsState.stayLength}
        onToggle={() => toggleSection('stayLength')}
        selectedLengths={formData.stayLengths || []}
        onLengthToggle={handleStayLengthToggle}
        formData={formData}
        updateFormData={updateFormData}
      />

      {/* Preferred Weekday Section */}
      <PreferredWeekdaySection
        isOpen={sectionsState.weekday}
        onToggle={() => toggleSection('weekday')}
        selectedDay={formData.preferredWeekday || 'monday'}
        onDaySelect={handleWeekdaySelect}
        formData={formData}
        updateFormData={updateFormData}
      />

      {/* Validation Messages */}
      {showValidation && (
        <ValidationMessages 
          formData={formData}
          error={error}
          showErrors={showValidationErrors}
          isValid={isValid}
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

export default AccommodationTermsStep;
