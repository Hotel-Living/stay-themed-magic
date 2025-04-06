
import React from "react";
import HotelInfoSection from "./StepOne/HotelInfoSection";
import LocationSection from "./StepOne/LocationSection";
import ContactSection from "./StepOne/ContactSection";
import ValidationMessage from "./StepOne/ValidationMessage";
import useFormValidation from "./StepOne/useFormValidation";

interface StepOneProps {
  onValidationChange?: (isValid: boolean) => void;
}

export default function StepOne({
  onValidationChange = () => {}
}: StepOneProps) {
  const {
    formData,
    errors,
    touchedFields,
    handleChange,
    handleBlur
  } = useFormValidation(onValidationChange);

  return (
    <div className="space-y-4">
      {/* Add bold title */}
      <h2 className="text-xl font-bold mb-2 text-white">MAIN HOTEL DATA</h2>
      
      <div className="grid gap-3">
        <HotelInfoSection 
          formData={formData}
          errors={errors}
          touchedFields={touchedFields}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        
        <LocationSection
          formData={formData}
          errors={errors}
          touchedFields={touchedFields}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        
        <ContactSection
          formData={formData}
          errors={errors}
          touchedFields={touchedFields}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
      </div>
      
      {/* Validation status */}
      <ValidationMessage errors={errors} />
    </div>
  );
}
