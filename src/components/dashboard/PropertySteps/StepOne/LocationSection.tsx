
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormField from "./FormField";
import CollapsibleSection from "./CollapsibleSection";
import { countries } from "@/utils/countries";

interface LocationSectionProps {
  formData: {
    country: string;
    address: string;
    city: string;
    postalCode: string;
  };
  errors: Record<string, string>;
  touchedFields: Record<string, boolean>;
  handleChange: (field: string, value: string) => void;
  handleBlur: (field: string) => void;
}

export default function LocationSection({
  formData,
  errors,
  touchedFields,
  handleChange,
  handleBlur
}: LocationSectionProps) {
  // Function to check if we should show error for a field
  const shouldShowError = (field: string) => {
    return touchedFields[field] && errors[field];
  };

  return (
    <CollapsibleSection title="LOCATION">
      <div className="space-y-2">
        <div>
          <label htmlFor="country" className="text-white">
            Country <span className="text-red-500">*</span>
          </label>
          <Select 
            value={formData.country} 
            onValueChange={(value) => handleChange("country", value)} 
            onOpenChange={() => !formData.country && handleBlur("country")}
          >
            <SelectTrigger 
              className={`text-white bg-[#7A0486] border-[#7A0486]/30 ${shouldShowError("country") ? "border-red-500" : ""}`}
            >
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent className="bg-white border-[#7A0486]/30">
              {countries.map(country => (
                <SelectItem 
                  key={country.id} 
                  value={country.id} 
                  className="text-[#7A0486] hover:bg-[#7A0486]/10 focus:bg-[#7A0486]/10"
                >
                  {country.name}
                </SelectItem>
              ))}
              <SelectItem 
                value="add-new" 
                className="text-green-600 hover:bg-[#7A0486]/10 focus:bg-[#7A0486]/10"
              >
                + Add New Country
              </SelectItem>
            </SelectContent>
          </Select>
          {shouldShowError("country") && (
            <p className="text-red-500 text-sm mt-1">{errors.country}</p>
          )}
        </div>
        
        <FormField
          id="address"
          label="Address"
          value={formData.address}
          onChange={(value) => handleChange("address", value)}
          onBlur={() => handleBlur("address")}
          error={shouldShowError("address") ? errors.address : ""}
          required={true}
        />
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="city" className="text-white">
              City <span className="text-red-500">*</span>
            </label>
            <Select 
              value={formData.city} 
              onValueChange={(value) => handleChange("city", value)} 
              onOpenChange={() => !formData.city && handleBlur("city")}
            >
              <SelectTrigger 
                className={`text-white bg-[#7A0486] border-[#7A0486]/30 ${shouldShowError("city") ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent className="bg-white border-[#7A0486]/30">
                {["New York", "Los Angeles", "Chicago", "Miami", "Las Vegas", "San Francisco"].map(city => (
                  <SelectItem 
                    key={city} 
                    value={city} 
                    className="text-[#7A0486] hover:bg-[#7A0486]/10 focus:bg-[#7A0486]/10"
                  >
                    {city}
                  </SelectItem>
                ))}
                <SelectItem 
                  value="add-new" 
                  className="text-green-600 hover:bg-[#7A0486]/10 focus:bg-[#7A0486]/10"
                >
                  + Add New City
                </SelectItem>
              </SelectContent>
            </Select>
            {shouldShowError("city") && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>
          
          <FormField
            id="postal-code"
            label="Postal Code"
            value={formData.postalCode}
            onChange={(value) => handleChange("postalCode", value)}
            onBlur={() => handleBlur("postalCode")}
            error={""}
            required={false}
          />
        </div>
      </div>
    </CollapsibleSection>
  );
}
