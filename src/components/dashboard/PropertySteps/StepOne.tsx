
import React, { useEffect } from "react";
import HotelInfoSection from "./StepOne/HotelInfo"; // Updated import path
import LocationSection from "./StepOne/Location"; // Updated import path
import ContactSection from "./StepOne/ContactSection";
import ValidationMessage from "./StepOne/ValidationMessage";
import useFormValidation from "./StepOne/useFormValidation";

interface StepOneProps {
  onValidationChange?: (isValid: boolean, data?: any) => void;
  initialData?: any;
}

export default function StepOne({
  onValidationChange = () => {},
  initialData
}: StepOneProps) {
  const {
    formData,
    errors,
    touchedFields,
    handleChange,
    handleBlur,
    setFormData
  } = useFormValidation(onValidationChange);
  
  // Initialize form with initial data if provided
  useEffect(() => {
    if (initialData) {
      // Map the initial data to form data fields
      const mappedData = {
        hotelName: initialData.name || "",
        category: initialData.category || "",
        propertyType: initialData.propertyType || "",
        description: initialData.description || "",
        country: initialData.country || "",
        city: initialData.city || "",
        address: initialData.address || "",
        contactName: initialData.contactName || formData.contactName || "",
        contactEmail: initialData.contactEmail || formData.contactEmail || "",
        contactPhone: initialData.contactPhone || formData.contactPhone || "",
        postalCode: initialData.postalCode || formData.postalCode || "",
        latitude: initialData.latitude || formData.latitude || "",
        longitude: initialData.longitude || formData.longitude || ""
      };
      
      setFormData(mappedData);
    }
  }, [initialData]);
  
  // Send form data to parent when it changes
  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      // Map form data back to the structure expected by parent
      const outputData = {
        name: formData.hotelName,
        category: formData.category,
        propertyType: formData.propertyType,
        description: formData.description,
        country: formData.country,
        city: formData.city,
        address: formData.address,
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        postalCode: formData.postalCode,
        latitude: formData.latitude,
        longitude: formData.longitude
      };
      
      onValidationChange(true, outputData);
    }
  }, [formData, errors]);

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
