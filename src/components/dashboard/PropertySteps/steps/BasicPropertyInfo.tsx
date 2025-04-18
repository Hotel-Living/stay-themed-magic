
import React from 'react';
import StepOne from '../StepOne';

interface BasicPropertyInfoProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function BasicPropertyInfo({
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {}
}: BasicPropertyInfoProps) {
  return (
    <StepOne 
      onValidationChange={onValidationChange}
      formData={formData}
      updateFormData={updateFormData}
    />
  );
}
