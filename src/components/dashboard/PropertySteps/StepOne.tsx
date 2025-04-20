
import React from "react";
import HotelInfoSection from "./StepOne/HotelInfo";
import LocationSection from "./StepOne/Location";
import ContactSection from "./StepOne/ContactSection";
import { usePropertyForm } from "@/hooks/usePropertyForm";

export default function StepOne() {
  const {
    formData,
    setFieldValue,
    errors = {},
    touchedFields = {},
    handleBlur = () => {}
  } = usePropertyForm();

  const handleChange = (field: string, value: string) => {
    setFieldValue(field, value);
  };

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
    </div>
  );
}
