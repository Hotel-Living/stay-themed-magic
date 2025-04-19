
import React from "react";
import HotelInfoSection from "./StepOne/HotelInfo";
import LocationSection from "./StepOne/Location";
import ContactSection from "./StepOne/ContactSection";
import ValidationMessage from "./StepOne/ValidationMessage";
import { usePropertyForm } from "@/hooks/usePropertyForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StepOneProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function StepOne({
  onValidationChange = () => {},
  formData: externalFormData,
  updateFormData: externalUpdateFormData
}: StepOneProps) {
  const { 
    formData, 
    setFieldValue, 
    errors = {}, 
    touchedFields = {},
    handleBlur = () => {}
  } = usePropertyForm();

  const handleChange = (field: string, value: string) => {
    setFieldValue(field, value);
    if (externalUpdateFormData) {
      externalUpdateFormData(field, value);
    }
  };

  // Cast touchedFields to the expected shapes for each component
  const hotelInfoTouchedFields = {
    hotelName: !!touchedFields.hotelName,
    category: !!touchedFields.category,
    propertyType: !!touchedFields.propertyType,
    description: !!touchedFields.description
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-2 text-white">MAIN HOTEL DATA</h2>

      <div className="grid gap-3">
        <HotelInfoSection
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          touchedFields={hotelInfoTouchedFields}
          handleBlur={handleBlur}
        />

        <LocationSection
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          touchedFields={touchedFields}
          handleBlur={handleBlur}
        />

        <ContactSection
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          touchedFields={touchedFields}
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
          value={formData.testField || ""}
          onChange={(e) => handleChange("testField", e.target.value)}
          className="text-white bg-[#7A0486] border-white"
        />
      </div>
    </div>
  );
}
