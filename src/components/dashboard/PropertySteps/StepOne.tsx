
import React from "react";
import HotelInfoSection from "./StepOne/HotelInfo";
import LocationSection from "./StepOne/Location";
import ContactSection from "./StepOne/ContactSection";
import ValidationMessage from "./StepOne/ValidationMessage";
import { usePropertyForm } from "@/hooks/usePropertyForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StepOne() {
  const { formData, setFieldValue } = usePropertyForm();

  const handleChange = (field: string, value: string) => {
    setFieldValue(field, value);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-2 text-white">MAIN HOTEL DATA</h2>

      <div className="grid gap-3">
        <HotelInfoSection
          formData={formData}
          handleChange={handleChange}
        />

        <LocationSection
          formData={formData}
          handleChange={handleChange}
        />

        <ContactSection
          formData={formData}
          handleChange={handleChange}
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
        />
      </div>
    </div>
  );
}
