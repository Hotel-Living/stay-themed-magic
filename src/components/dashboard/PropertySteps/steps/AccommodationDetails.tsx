
import React, { useEffect, useState } from 'react';
import AccommodationTermsStep from '../AccommodationTerms/AccommodationTermsStep';
import HotelFeaturesStep from '../HotelFeaturesStep';
import StepTwo from '../StepTwo';

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
  const [isValid, setIsValid] = useState(false);

  // Handle validation from both components
  const handleValidationChange = (valid: boolean) => {
    setIsValid(valid);
    onValidationChange(valid);
  };

  useEffect(() => {
    // Check if step 2 has any valid data to show validation state
    if (formData) {
      const hasRoomTypes = formData.roomTypes && formData.roomTypes.length > 0;
      const hasMealPlans = formData.mealPlans && formData.mealPlans.length > 0;
      const hasStayLengths = formData.stayLengths && formData.stayLengths.length > 0;
      
      // If any of these fields have data, the step is at least partially completed
      if (hasRoomTypes || hasMealPlans || hasStayLengths) {
        handleValidationChange(true);
      }
    }
  }, [formData]);

  return (
    <>
      <StepTwo
        onValidationChange={handleValidationChange}
        formData={formData}
        updateFormData={updateFormData}
      />
      <div className="mt-6">
        <HotelFeaturesStep />
      </div>
    </>
  );
}
