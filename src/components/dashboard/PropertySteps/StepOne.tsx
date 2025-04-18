
import React from "react";
import HotelInfoSection from "./StepOne/HotelInfo"; // Updated import path
import LocationSection from "./StepOne/Location"; // Updated import path
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
          formData={{
            country: formData.country,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode
          }}
          errors={errors}
          touchedFields={touchedFields}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        
        <ContactSection
          formData={{
            contactName: formData.contactName,
            contactEmail: formData.contactEmail,
            contactPhone: formData.contactPhone
          }}
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
