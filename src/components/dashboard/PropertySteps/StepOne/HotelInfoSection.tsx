
import React from "react";
import FormField from "./FormField";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface HotelInfoSectionProps {
  formData: {
    hotelName: string;
    category: string;
    propertyType: string; // Added property type field
    description: string;
  };
  errors: {
    hotelName?: string;
    category?: string;
    propertyType?: string; // Added property type field error
    description?: string;
  };
  touchedFields: {
    hotelName: boolean;
    category: boolean;
    propertyType: boolean; // Added touched property type field
    description: boolean;
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
        <FormField
          id="hotelName"
          label="Hotel Name"
          value={formData.hotelName}
          onChange={(value) => handleChange("hotelName", value)}
          onBlur={() => handleBlur("hotelName")}
          error={touchedFields.hotelName && errors.hotelName ? errors.hotelName : ""}
          required
          placeholder="Enter hotel name"
        />
        
        <div>
          <Label htmlFor="category" className="text-white">
            Category <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleChange("category", value)}
            onOpenChange={() => handleBlur("category")}
          >
            <SelectTrigger id="category" className="text-white bg-[#7A0486] border-white">
              <SelectValue placeholder="Select hotel category" />
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
        
        {/* Add Type of Property field */}
        <div>
          <Label htmlFor="propertyType" className="text-white">
            Type of Property <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.propertyType}
            onValueChange={(value) => handleChange("propertyType", value)}
            onOpenChange={() => handleBlur("propertyType")}
          >
            <SelectTrigger id="propertyType" className="text-white bg-[#7A0486] border-white">
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hotel">Hotel</SelectItem>
              <SelectItem value="Resort">Resort</SelectItem>
              <SelectItem value="Boutique Hotel">Boutique Hotel</SelectItem>
              <SelectItem value="Motel">Motel</SelectItem>
              <SelectItem value="Inn">Inn</SelectItem>
            </SelectContent>
          </Select>
          {touchedFields.propertyType && errors.propertyType && (
            <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>
          )}
        </div>
        
        <FormField
          id="description"
          label="Description"
          type="textarea"
          value={formData.description}
          onChange={(value) => handleChange("description", value)}
          onBlur={() => handleBlur("description")}
          error={touchedFields.description && errors.description ? errors.description : ""}
          required
          placeholder="Enter a detailed description of your hotel"
        />
      </div>
    </div>
  );
}
