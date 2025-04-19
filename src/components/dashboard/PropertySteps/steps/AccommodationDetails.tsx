
import React from 'react';
import AccommodationTermsStep from '../AccommodationTerms/AccommodationTermsStep';
import HotelFeaturesStep from '../HotelFeaturesStep';

interface AccommodationDetailsProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function AccommodationDetails({
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {}
}: AccommodationDetailsProps) {
  return (
    <>
      <AccommodationTermsStep 
        onValidationChange={onValidationChange}
        formData={formData}
        updateFormData={updateFormData}
      />
      <div className="mt-6">
        <HotelFeaturesStep />
      </div>
    </>
  );
}
