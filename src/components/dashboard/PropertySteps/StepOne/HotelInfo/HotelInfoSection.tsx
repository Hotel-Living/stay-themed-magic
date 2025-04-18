
import React from "react";
import HotelNameInput from "./HotelNameInput";
import CategorySelector from "./CategorySelector";
import PropertyTypeSelector from "./PropertyTypeSelector";
import DescriptionInput from "./DescriptionInput";

interface HotelInfoSectionProps {
  formData: {
    hotelName: string;
    category: string;
    propertyType: string;
    description: string;
  };
  errors: {
    hotelName?: string;
    category?: string;
    propertyType?: string;
    description?: string;
    [key: string]: string | undefined;
  };
  touchedFields: {
    hotelName: boolean;
    category: boolean;
    propertyType: boolean;
    description: boolean;
    [key: string]: boolean;
  };
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
  return (
    <div className="glass-card rounded-xl p-4 space-y-4 bg-[#690695]/40">
      <h3 className="text-lg font-semibold text-white">Hotel Information</h3>
      
      <div className="space-y-4">
        <HotelNameInput
          value={formData.hotelName}
          onChange={(value) => handleChange("name", value)}
          onBlur={() => handleBlur("name")}
          hasError={touchedFields.hotelName && !!errors.hotelName}
          errorMessage={errors.hotelName}
        />
        
        <CategorySelector
          value={formData.category}
          onChange={(value) => handleChange("category", value)}
          onBlur={() => handleBlur("category")}
          hasError={touchedFields.category && !!errors.category}
          errorMessage={errors.category}
        />
        
        <PropertyTypeSelector
          value={formData.propertyType}
          onChange={(value) => handleChange("propertyType", value)}
          onBlur={() => handleBlur("propertyType")}
          hasError={touchedFields.propertyType && !!errors.propertyType}
          errorMessage={errors.propertyType}
        />
        
        <DescriptionInput
          value={formData.description}
          onChange={(value) => handleChange("description", value)}
          onBlur={() => handleBlur("description")}
          hasError={touchedFields.description && !!errors.description}
          errorMessage={errors.description}
        />
      </div>
    </div>
  );
}
