
import React from 'react';
import ThemesAndActivitiesStep from '../ThemesAndActivitiesStep';

interface ThemesActivitiesProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function ThemesActivities({
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {}
}: ThemesActivitiesProps) {
  return (
    <ThemesAndActivitiesStep 
      onValidationChange={onValidationChange}
      formData={formData}
      updateFormData={updateFormData}
    />
  );
}
