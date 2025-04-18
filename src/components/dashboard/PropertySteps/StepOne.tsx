
import React from "react";
import HotelInfoSection from "./StepOne/HotelInfo"; // Updated import path
import LocationSection from "./StepOne/Location"; // Updated import path
import ContactSection from "./StepOne/ContactSection";
import ValidationMessage from "./StepOne/ValidationMessage";
import useFormValidation from "./StepOne/useFormValidation";

export interface StepOneProps {
  onValidationChange?: (isValid: boolean) => void;
  initialData?: any;
}

export default function StepOne({
  onValidationChange = () => {},
  initialData = {}
}: StepOneProps) {
  const {
    formData,
    errors,
    touchedFields,
    handleChange,
    handleBlur
  } = useFormValidation(onValidationChange, initialData);

  // Adapter functions to match expected prop types in child components
  const handleFieldChange = (field: string, value: string) => {
    const syntheticEvent = {
      target: { name: field, value }
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange(syntheticEvent);
  };

  const handleFieldBlur = (field: string) => {
    const syntheticEvent = {
      target: { name: field }
    } as React.FocusEvent<HTMLInputElement>;
    handleBlur(syntheticEvent);
  };

  return (
    <div className="space-y-4">
      {/* Add bold title */}
      <h2 className="text-xl font-bold mb-2 text-white">MAIN HOTEL DATA</h2>
      
      <div className="grid gap-3">
        <HotelInfoSection 
          formData={{
            hotelName: formData.name || "",
            category: formData.category?.toString() || "",
            propertyType: formData.propertyType || "",
            description: formData.description || ""
          }}
          errors={{
            hotelName: errors.name,
            category: errors.category,
            propertyType: errors.propertyType,
            description: errors.description
          }}
          touchedFields={{
            hotelName: touchedFields.name || false,
            category: touchedFields.category || false,
            propertyType: touchedFields.propertyType || false,
            description: touchedFields.description || false
          }}
          handleChange={handleFieldChange}
          handleBlur={handleFieldBlur}
        />
        
        <LocationSection
          formData={{
            country: formData.country || "",
            address: formData.address || "",
            city: formData.city || "",
            postalCode: formData.postalCode || ""
          }}
          errors={{
            country: errors.country,
            address: errors.address,
            city: errors.city,
            postalCode: errors.postalCode
          }}
          touchedFields={{
            country: touchedFields.country || false,
            address: touchedFields.address || false,
            city: touchedFields.city || false,
            postalCode: touchedFields.postalCode || false
          }}
          handleChange={handleFieldChange}
          handleBlur={handleFieldBlur}
        />
        
        <ContactSection
          formData={{
            contactName: formData.contactName || "",
            contactEmail: formData.contactEmail || "",
            contactPhone: formData.contactPhone || ""
          }}
          errors={{
            contactName: errors.contactName,
            contactEmail: errors.contactEmail,
            contactPhone: errors.contactPhone
          }}
          touchedFields={{
            contactName: touchedFields.contactName || false,
            contactEmail: touchedFields.contactEmail || false,
            contactPhone: touchedFields.contactPhone || false
          }}
          handleChange={handleFieldChange}
          handleBlur={handleFieldBlur}
        />
      </div>
      
      {/* Validation status */}
      <ValidationMessage errors={errors} />
    </div>
  );
}
