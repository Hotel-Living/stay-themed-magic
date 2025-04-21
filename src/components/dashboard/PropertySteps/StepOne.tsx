
import React, { useEffect } from "react";
import HotelInfoSection from "./StepOne/HotelInfo"; // Updated import path
import LocationSection from "./StepOne/Location"; // Updated import path
import ContactSection from "./StepOne/ContactSection";
import ValidationMessage from "./StepOne/ValidationMessage";
import useFormValidation from "./StepOne/useFormValidation";

interface StepOneProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function StepOne({
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {}
}: StepOneProps) {
  const {
    formData: localFormData,
    errors,
    touchedFields,
    handleChange,
    handleBlur,
    setFormData: setLocalFormData
  } = useFormValidation(onValidationChange);

  // Sync with parent formData when component mounts or formData changes
  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      setLocalFormData({
        hotelName: formData.hotelName || '',
        category: formData.category || '',
        propertyType: formData.propertyType || '',
        description: formData.description || '',
        country: formData.country || '',
        address: formData.address || '',
        city: formData.city || '',
        postalCode: formData.postalCode || '',
        contactName: formData.contactName || '',
        contactEmail: formData.contactEmail || '',
        contactPhone: formData.contactPhone || '',
        latitude: formData.latitude || '',
        longitude: formData.longitude || ''
      });
    }
  }, [formData]);

  // Custom handleChange to update both local and parent state
  const handleFieldChange = (field: string, value: string) => {
    handleChange(field, value);
    if (updateFormData) {
      updateFormData(field, value);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-2 text-white">MAIN HOTEL DATA</h2>
      
      <div className="grid gap-3">
        <HotelInfoSection 
          formData={localFormData}
          errors={errors}
          touchedFields={touchedFields}
          handleChange={handleFieldChange}
          handleBlur={handleBlur}
        />
        
        <LocationSection
          formData={{
            country: localFormData.country,
            address: localFormData.address,
            city: localFormData.city,
            postalCode: localFormData.postalCode,
            latitude: localFormData.latitude,
            longitude: localFormData.longitude
          }}
          errors={errors}
          touchedFields={touchedFields}
          handleChange={handleFieldChange}
          handleBlur={handleBlur}
        />
        
        <ContactSection
          formData={{
            contactName: localFormData.contactName,
            contactEmail: localFormData.contactEmail,
            contactPhone: localFormData.contactPhone
          }}
          errors={errors}
          touchedFields={touchedFields}
          handleChange={handleFieldChange}
          handleBlur={handleBlur}
        />
      </div>
      
      <ValidationMessage errors={errors} />
    </div>
  );
}
