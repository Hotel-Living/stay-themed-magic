
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import CountrySelector from "./StepOne/Location/CountrySelector";
import CitySelector from "./StepOne/Location/CitySelector";
import CustomCountryInput from "./StepOne/Location/CustomCountryInput";
import CustomCityInput from "./StepOne/Location/CustomCityInput";
import AddressInput from "./StepOne/Location/AddressInput";
import PostalCodeInput from "./StepOne/Location/PostalCodeInput";
import InteractiveMap from "./StepOne/Location/InteractiveMap";

interface LocationStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  errors: Record<string, string>;
  touchedFields: Record<string, boolean>;
  handleChange: (field: string, value: string) => void;
  handleBlur: (field: string) => void;
}

export default function LocationStep({
  formData,
  updateFormData,
  errors,
  touchedFields,
  handleChange,
  handleBlur
}: LocationStepProps) {
  const { t } = useTranslation();
  const [showCustomCountry, setShowCustomCountry] = useState(false);
  const [showCustomCity, setShowCustomCity] = useState(false);

  // Clear city when country changes
  useEffect(() => {
    if (formData.country && formData.city) {
      // Check if current city is valid for the selected country
      const { getCitiesForCountry } = require("@/utils/cityData");
      const validCities = getCitiesForCountry(formData.country);
      if (!validCities.includes(formData.city)) {
        handleChange('city', '');
      }
    }
  }, [formData.country, formData.city, handleChange]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">{t('dashboard.location.title')}</h3>
        <p className="text-gray-300">{t('dashboard.basicDetailsAboutProperty')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!showCustomCountry ? (
          <CountrySelector
            value={formData.country || ""}
            onChange={(e) => handleChange('country', e.target.value)}
            onValueChange={(value) => handleChange('country', value)}
            onBlur={() => handleBlur('country')}
            error={errors.country}
            touched={touchedFields.country}
            errorMessage={errors.country}
            onCustomClick={() => setShowCustomCountry(true)}
          />
        ) : (
          <CustomCountryInput
            value={formData.country || ""}
            onChange={(e) => handleChange('country', e.target.value)}
            onBlur={() => handleBlur('country')}
            touched={touchedFields.country}
            errorMessage={errors.country}
            onBackClick={() => setShowCustomCountry(false)}
          />
        )}

        {!showCustomCity ? (
          <CitySelector
            value={formData.city || ""}
            country={formData.country || ""}
            onChange={(e) => handleChange('city', e.target.value)}
            onValueChange={(value) => handleChange('city', value)}
            onBlur={() => handleBlur('city')}
            error={errors.city}
            touched={touchedFields.city}
            errorMessage={errors.city}
            disabled={!formData.country}
            onCustomClick={() => setShowCustomCity(true)}
          />
        ) : (
          <CustomCityInput
            value={formData.city || ""}
            onChange={(e) => handleChange('city', e.target.value)}
            onBlur={() => handleBlur('city')}
            touched={touchedFields.city}
            errorMessage={errors.city}
            onBackClick={() => setShowCustomCity(false)}
          />
        )}
      </div>

      <AddressInput
        value={formData.address || ""}
        onChange={(e) => handleChange('address', e.target.value)}
        onBlur={() => handleBlur('address')}
        error={errors.address}
        touched={touchedFields.address}
        errorMessage={errors.address}
      />

      <PostalCodeInput
        value={formData.postalCode || ""}
        onChange={(e) => handleChange('postalCode', e.target.value)}
        onBlur={() => handleBlur('postalCode')}
        error={errors.postalCode}
        touched={touchedFields.postalCode}
        errorMessage={errors.postalCode}
      />

      <InteractiveMap
        latitude={formData.latitude}
        longitude={formData.longitude}
        onLocationSelect={(lat, lng) => {
          updateFormData('latitude', lat.toString());
          updateFormData('longitude', lng.toString());
        }}
      />
    </div>
  );
}
