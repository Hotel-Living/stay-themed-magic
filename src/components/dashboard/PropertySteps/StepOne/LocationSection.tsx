
import React, { useState } from "react";
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
  const [isAddingNewCountry, setIsAddingNewCountry] = useState(false);
  const [isAddingNewCity, setIsAddingNewCity] = useState(false);
  const [customCountry, setCustomCountry] = useState("");
  const [customCity, setCustomCity] = useState("");
  
  // Function to check if we should show error for a field
  const shouldShowError = (field: string) => {
    return touchedFields[field] && errors[field];
  };

  // Handler for country selection
  const handleCountrySelect = (value: string) => {
    if (value === "add-new") {
      setIsAddingNewCountry(true);
      handleChange("country", "");
    } else {
      setIsAddingNewCountry(false);
      handleChange("country", value);
      // Reset city when country changes
      setIsAddingNewCity(false);
      handleChange("city", "");
    }
  };

  // Handler for city selection
  const handleCitySelect = (value: string) => {
    if (value === "add-new") {
      setIsAddingNewCity(true);
      handleChange("city", "");
    } else {
      setIsAddingNewCity(false);
      handleChange("city", value);
    }
  };

  // Handler for custom country input
  const handleCustomCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomCountry(value);
    handleChange("country", value);
  };

  // Handler for custom city input
  const handleCustomCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomCity(value);
    handleChange("city", value);
  };

  // Get cities based on selected country
  const getCitiesByCountry = (countryCode: string) => {
    switch(countryCode) {
      case 'spain':
        return ["Madrid", "Barcelona", "Valencia", "Seville"];
      case 'france':
        return ["Paris", "Nice", "Marseille", "Lyon"];
      case 'italy':
        return ["Rome", "Milan", "Venice", "Florence"];
      case 'usa':
        return ["New York", "Los Angeles", "Chicago", "Miami", "Las Vegas", "San Francisco"];
      default:
        return [];
    }
  };

  const selectedCountryCities = getCitiesByCountry(formData.country);

  return (
    <CollapsibleSection title="LOCATION">
      <div className="space-y-2">
        <div>
          <label htmlFor="country" className="text-white">
            Country <span className="text-red-500">*</span>
          </label>
          {!isAddingNewCountry ? (
            <Select 
              value={formData.country} 
              onValueChange={handleCountrySelect}
              onOpenChange={() => !formData.country && handleBlur("country")}
            >
              <SelectTrigger 
                className={`text-white bg-[#7A0486] border-white ${shouldShowError("country") ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent className="bg-white border-[#7A0486]">
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
          ) : (
            <div className="mt-1">
              <input 
                type="text" 
                placeholder="Enter country name" 
                value={customCountry}
                onChange={handleCustomCountryChange}
                onBlur={() => handleBlur("country")}
                className="w-full p-2 text-white bg-[#7A0486] border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              />
              <button 
                onClick={() => {
                  setIsAddingNewCountry(false);
                  setCustomCountry("");
                  handleChange("country", "");
                }}
                className="mt-2 text-fuchsia-300 text-sm hover:text-fuchsia-100"
              >
                Cancel
              </button>
            </div>
          )}
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
            {!isAddingNewCity ? (
              <Select 
                value={formData.city} 
                onValueChange={handleCitySelect}
                onOpenChange={() => !formData.city && handleBlur("city")}
                disabled={!formData.country && !isAddingNewCountry}
              >
                <SelectTrigger 
                  className={`text-white bg-[#7A0486] border-white ${shouldShowError("city") ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#7A0486]">
                  {selectedCountryCities.map(city => (
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
            ) : (
              <div className="mt-1">
                <input 
                  type="text" 
                  placeholder="Enter city name" 
                  value={customCity}
                  onChange={handleCustomCityChange}
                  onBlur={() => handleBlur("city")}
                  className="w-full p-2 text-white bg-[#7A0486] border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
                <button 
                  onClick={() => {
                    setIsAddingNewCity(false);
                    setCustomCity("");
                    handleChange("city", "");
                  }}
                  className="mt-2 text-fuchsia-300 text-sm hover:text-fuchsia-100"
                >
                  Cancel
                </button>
              </div>
            )}
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
