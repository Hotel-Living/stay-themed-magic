
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormData } from "./useFormValidation";
import FormField from "./FormField";

interface HotelInfoSectionProps {
  formData: FormData;
  errors: Record<string, string>;
  touchedFields: Record<string, boolean>;
  handleChange: (field: keyof FormData, value: string) => void;
  handleBlur: (field: keyof FormData) => void;
}

export default function HotelInfoSection({
  formData,
  errors,
  touchedFields,
  handleChange,
  handleBlur
}: HotelInfoSectionProps) {
  return (
    <div className="space-y-4 p-4 bg-fuchsia-950/20 rounded-lg">
      <h3 className="font-semibold text-lg text-white">Hotel Information</h3>
      
      <FormField
        id="hotelName"
        label="Hotel Name"
        value={formData.hotelName}
        onChange={(value) => handleChange('hotelName', value)}
        onBlur={() => handleBlur('hotelName')}
        error={touchedFields.hotelName ? errors.hotelName : ""}
        required={true}
        placeholder="Enter the name of your hotel"
      />
      
      {/* Add Category/Stars selection */}
      <div>
        <label htmlFor="category" className="block text-white mb-1">
          Category <span className="text-red-500">*</span>
        </label>
        <Select 
          value={formData.category} 
          onValueChange={(value) => handleChange('category', value)}
          onOpenChange={() => {
            if (!touchedFields.category) {
              handleBlur('category');
            }
          }}
        >
          <SelectTrigger 
            id="category"
            className={`w-full bg-[#7A0486] border-white ${touchedFields.category && errors.category ? "border-red-500" : ""}`}
          >
            <SelectValue placeholder="Select hotel category (stars)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Star</SelectItem>
            <SelectItem value="2">2 Stars</SelectItem>
            <SelectItem value="3">3 Stars</SelectItem>
            <SelectItem value="4">4 Stars</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
          </SelectContent>
        </Select>
        {touchedFields.category && errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category}</p>
        )}
      </div>
      
      <FormField
        id="description"
        label="Description"
        type="textarea"
        value={formData.description}
        onChange={(value) => handleChange('description', value)}
        onBlur={() => handleBlur('description')}
        error={touchedFields.description ? errors.description : ""}
        required={true}
        placeholder="Enter a detailed description of your hotel"
      />
    </div>
  );
}
