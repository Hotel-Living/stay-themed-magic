
import React, { useState } from "react";
import FormField from "./FormField";
import CollapsibleSection from "./CollapsibleSection";
import CountrySelector from "./Location/CountrySelector";
import CustomCountryInput from "./Location/CustomCountryInput";
import CitySelector from "./Location/CitySelector";
import CustomCityInput from "./Location/CustomCityInput";
import { useCitiesByCountry } from "./Location/useCitiesByCountry";

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
  
  const shouldShowError = (field: string) => {
    return touchedFields[field] && errors[field];
  };

  const handleCountrySelect = (value: string) => {
    if (value === "add-new") {
      setIsAddingNewCountry(true);
      handleChange("country", "");
    } else {
      setIsAddingNewCountry(false);
      handleChange("country", value);
      setIsAddingNewCity(false);
      handleChange("city", "");
    }
  };

  const handleCitySelect = (value: string) => {
    if (value === "add-new") {
      setIsAddingNewCity(true);
      handleChange("city", "");
    } else {
      setIsAddingNewCity(false);
      handleChange("city", value);
    }
  };

  const handleCustomCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomCountry(value);
    handleChange("country", value);
  };

  const handleCustomCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomCity(value);
    handleChange("city", value);
  };

  const selectedCountryCities = useCitiesByCountry(formData.country);
  
  // Fix: Convert string to boolean using Boolean
  const isCitySelectorDisabled = Boolean(formData.country === "");

  return (
    <CollapsibleSection title="LOCATION">
      <div className="space-y-2">
        <div>
          {!isAddingNewCountry ? (
            <CountrySelector
              value={formData.country}
              onValueChange={handleCountrySelect}
              onBlur={() => handleBlur("country")}
              hasError={shouldShowError("country")}
              errorMessage={errors.country}
            />
          ) : (
            <CustomCountryInput
              value={customCountry}
              onChange={handleCustomCountryChange}
              onBlur={() => handleBlur("country")}
              onCancel={() => {
                setIsAddingNewCountry(false);
                setCustomCountry("");
                handleChange("country", "");
              }}
            />
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
            {!isAddingNewCity ? (
              <CitySelector
                value={formData.city}
                onValueChange={handleCitySelect}
                onBlur={() => handleBlur("city")}
                hasError={shouldShowError("city")}
                errorMessage={errors.city}
                cities={selectedCountryCities}
                disabled={isCitySelectorDisabled}
              />
            ) : (
              <CustomCityInput
                value={customCity}
                onChange={handleCustomCityChange}
                onBlur={() => handleBlur("city")}
                onCancel={() => {
                  setIsAddingNewCity(false);
                  setCustomCity("");
                  handleChange("city", "");
                }}
              />
            )}
          </div>
          
          <FormField
            id="postal-code"
            label="Postal Code"
            value={formData.postalCode}
            onChange={(value) => handleChange("postalCode", value)}
            onBlur={() => handleBlur("postalCode")}
            error={shouldShowError("postalCode") ? errors.postalCode : ""}
            required={false}
          />
        </div>
      </div>
    </CollapsibleSection>
  );
}
