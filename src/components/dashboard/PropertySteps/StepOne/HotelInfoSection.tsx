
import React from "react";
import FormField from "./FormField";
import CollapsibleSection from "./CollapsibleSection";

interface HotelInfoSectionProps {
  formData: {
    hotelName: string;
    description: string;
  };
  errors: Record<string, string>;
  touchedFields: Record<string, boolean>;
  handleChange: (field: string, value: string) => void;
  handleBlur: (field: string) => void;
}

export default function HotelInfoSection({
  formData,
  errors,
  touchedFields,
  handleChange,
  handleBlur
}: HotelInfoSectionProps) {
  // Function to check if we should show error for a field
  const shouldShowError = (field: string) => {
    return touchedFields[field] && errors[field];
  };

  return (
    <CollapsibleSection title="HOTEL INFORMATION">
      <div className="space-y-2">
        <FormField
          id="hotel-name"
          label="Hotel Name"
          value={formData.hotelName}
          onChange={(value) => handleChange("hotelName", value)}
          onBlur={() => handleBlur("hotelName")}
          error={shouldShowError("hotelName") ? errors.hotelName : ""}
          required={true}
        />
        
        <FormField
          id="description"
          label="Description"
          type="textarea"
          value={formData.description}
          onChange={(value) => handleChange("description", value)}
          onBlur={() => handleBlur("description")}
          error={shouldShowError("description") ? errors.description : ""}
          required={true}
        />
      </div>
    </CollapsibleSection>
  );
}
