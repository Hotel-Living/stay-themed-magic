
import React, { useEffect } from "react";
import HotelInfoSection from "./StepOne/HotelInfo";
import LocationSection from "./StepOne/Location";
import ContactSection from "./StepOne/ContactSection";
import ValidationMessage from "./StepOne/ValidationMessage";
import useFormValidation from "./StepOne/useFormValidation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        testField: formData.testField || '' // Add the new field
      });
    }
  }, [formData]);

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
            postalCode: localFormData.postalCode
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

      {/* Test Field */}
      <div className="mt-4">
        <Label htmlFor="testField" className="text-white">
          Test Field
        </Label>
        <Input
          id="testField"
          value={localFormData.testField || ""}
          onChange={(e) => handleFieldChange("testField", e.target.value)}
          onBlur={() => handleBlur("testField")}
          placeholder="Enter test value..."
          className="bg-[#7A0486] text-white border-white"
        />
        {touchedFields.testField && errors.testField && (
          <p className="text-red-500 text-sm mt-1">{errors.testField}</p>
        )}
      </div>
    </div>
  );
}
