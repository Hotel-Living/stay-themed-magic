
import React from 'react';
import ValidationMessages from '../ValidationMessages';

interface AccommodationValidationProps {
  error: string;
  hasInteracted: boolean;
  showValidationErrors: boolean;
  isValid: boolean;
  formData: any;
}

export const AccommodationValidation = ({
  error,
  hasInteracted,
  showValidationErrors,
  isValid,
  formData
}: AccommodationValidationProps) => {
  return (
    <ValidationMessages 
      error={error}
      showErrors={hasInteracted && showValidationErrors}
      isValid={isValid}
      formData={formData}
    />
  );
};
