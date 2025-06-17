
import React, { useState, useCallback } from "react";
import { Country } from 'country-state-city';
import CollapsibleSection from "../CollapsibleSection";
import CountrySelector from "./CountrySelector";
import CitySelector from "./CitySelector";
import AddressInput from "./AddressInput";
import PostalCodeInput from "./PostalCodeInput";
import InteractiveMap from "./InteractiveMap";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
  const { t } = useTranslation();
  const [showCustomCountry, setShowCustomCountry] = useState(false);
  const [showCustomCity, setShowCustomCity] = useState(false);

  const handleLocationSelect = useCallback((lat: string, lng: string) => {
    handleChange("latitude", lat);
    handleChange("longitude", lng);
  }, [handleChange]);

  const countryData = Country.getCountryByCode(formData.country);
  const formattedAddress = [
    formData.address,
    formData.city,
    countryData?.name
  ].filter(Boolean).join(", ");

  return (
    <CollapsibleSection title={t('dashboard.location')}>
      <div className="space-y-4">
        <AddressInput
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          onBlur={() => handleBlur("address")}
          error={errors.address}
          touched={touchedFields.address}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CountrySelector
            value={formData.country}
            onChange={(e) => handleChange("country", e.target.value)}
            onValueChange={(value) => handleChange("country", value)}
            onBlur={() => handleBlur("country")}
            error={errors.country}
            touched={touchedFields.country}
            onCustomClick={() => setShowCustomCountry(!showCustomCountry)}
          />

          <CitySelector
            value={formData.city}
            country={formData.country}
            onChange={(e) => handleChange("city", e.target.value)}
            onValueChange={(value) => handleChange("city", value)}
            onBlur={() => handleBlur("city")}
            error={errors.city}
            touched={touchedFields.city}
            disabled={!formData.country}
            onCustomClick={() => setShowCustomCity(!showCustomCity)}
          />
        </div>

        <PostalCodeInput
          value={formData.postalCode}
          onChange={(e) => handleChange("postalCode", e.target.value)}
          onBlur={() => handleBlur("postalCode")}
          error={errors.postalCode}
          touched={touchedFields.postalCode}
        />

        <div>
          <Label className="block text-sm font-medium text-white mb-1 uppercase">
            {t('dashboard.locationOnMap')}
          </Label>
          <InteractiveMap
            latitude={formData.latitude}
            longitude={formData.longitude}
            address={formattedAddress}
            onLocationSelect={handleLocationSelect}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="block text-sm font-medium text-white mb-1">
              {t('dashboard.latitude')}
            </Label>
            <Input
              type="text"
              placeholder={t('dashboard.latitudePlaceholder')}
              value={formData.latitude}
              onChange={(e) => handleChange("latitude", e.target.value)}
              className="text-white bg-[#7A0486] border-white"
              disabled
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-white mb-1">
              {t('dashboard.longitude')}
            </Label>
            <Input
              type="text"
              placeholder={t('dashboard.longitudePlaceholder')}
              value={formData.longitude}
              onChange={(e) => handleChange("longitude", e.target.value)}
              className="text-white bg-[#7A0486] border-white"
              disabled
            />
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}
