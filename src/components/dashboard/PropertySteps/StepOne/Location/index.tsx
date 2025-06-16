
import React from "react";
import AddressInput from "./AddressInput";
import CountrySelector from "./CountrySelector";
import CitySelector from "./CitySelector";
import PostalCodeInput from "./PostalCodeInput";
import InteractiveMap from "./InteractiveMap";
import { useTranslation } from "@/hooks/useTranslation";

interface LocationSectionProps {
  formData: {
    country: string;
    address: string;
    city: string;
    postalCode: string;
    latitude: string;
    longitude: string;
  };
  errors: {
    country?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    latitude?: string;
    longitude?: string;
  };
  touchedFields: {
    country: boolean;
    address: boolean;
    city: boolean;
    postalCode: boolean;
    latitude: boolean;
    longitude: boolean;
  };
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
  const { t } = useTranslation();
  const sectionClassName = "mb-6";

  return (
    <div className="glass-card rounded-xl p-6 space-y-6 bg-[#690695]/40">
      <h3 className="text-lg font-semibold text-white uppercase">{t('location.title')}</h3>
      
      <div className={sectionClassName}>
        <AddressInput 
          value={formData.address}
          onChange={value => handleChange("address", value)}
          onBlur={() => handleBlur("address")}
          hasError={touchedFields.address && !!errors.address}
          errorMessage={errors.address}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={sectionClassName}>
          <CountrySelector
            value={formData.country}
            onChange={(value) => handleChange("country", value)}
            onBlur={() => handleBlur("country")}
            error={errors.country}
            touched={touchedFields.country}
            hasError={touchedFields.country && !!errors.country}
            errorMessage={errors.country}
            onCustomClick={() => {}}
          />
        </div>
        
        <div className={sectionClassName}>
          <CitySelector
            country={formData.country}
            value={formData.city}
            onChange={(value) => handleChange("city", value)}
            onBlur={() => handleBlur("city")}
            error={errors.city}
            touched={touchedFields.city}
            hasError={touchedFields.city && !!errors.city}
            errorMessage={errors.city}
            onCustomClick={() => {}}
          />
        </div>
      </div>
      
      <div className={sectionClassName}>
        <PostalCodeInput 
          value={formData.postalCode}
          onChange={(value) => handleChange("postalCode", value)}
          onBlur={() => handleBlur("postalCode")}
          error={errors.postalCode}
          touched={touchedFields.postalCode}
          hasError={touchedFields.postalCode && !!errors.postalCode}
          errorMessage={errors.postalCode}
        />
      </div>
      
      <div className={sectionClassName}>
        <InteractiveMap
          latitude={formData.latitude}
          longitude={formData.longitude}
          onLocationChange={(lat, lng) => {
            handleChange("latitude", lat.toString());
            handleChange("longitude", lng.toString());
          }}
        />
      </div>
    </div>
  );
}
