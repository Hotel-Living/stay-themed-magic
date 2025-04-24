
import React, { useState, useEffect } from "react";
import CountrySelector from "./CountrySelector";
import CitySelector from "./CitySelector";
import AddressInput from "./AddressInput";
import PostalCodeInput from "./PostalCodeInput";
import InteractiveMap from "./InteractiveMap";
import { Input } from "@/components/ui/input";
import { City, Country } from 'country-state-city';

interface LocationSectionProps {
  formData: {
    country: string;
    address: string;
    city: string;
    postalCode: string;
    latitude?: string;
    longitude?: string;
  };
  errors: any;
  touchedFields: any;
  handleChange: (field: string, value: string) => void;
  handleBlur: (field: string) => void;
}

const LocationSection = ({ formData, errors, touchedFields, handleChange, handleBlur }: LocationSectionProps) => {
  const [cities, setCities] = useState<string[]>([]);
  const [showCustomCountry, setShowCustomCountry] = useState(false);
  const [showCustomCity, setShowCustomCity] = useState(false);
  const [formattedAddress, setFormattedAddress] = useState<string>("");

  useEffect(() => {
    if (formData.country) {
      const citiesData = City.getCitiesOfCountry(formData.country) || [];
      setCities(citiesData.map(city => city.name));
    } else {
      setCities([]);
    }
  }, [formData.country]);

  // Create a formatted address for geocoding
  useEffect(() => {
    let address = "";
    
    // Add specific address if available
    if (formData.address && formData.address.trim() !== "") {
      address = formData.address;
    }
    
    // Add city if available
    if (formData.city && formData.city.trim() !== "") {
      if (address) address += ", ";
      address += formData.city;
    }
    
    // Add country if available (use country name instead of code)
    if (formData.country && formData.country.trim() !== "") {
      // Convert country code to full name
      const countryData = Country.getCountryByCode(formData.country);
      if (countryData) {
        if (address) address += ", ";
        address += countryData.name;
      } else if (address) {
        // If country code doesn't match, just use it as is
        address += ", " + formData.country;
      }
    }
    
    setFormattedAddress(address);
  }, [formData.address, formData.city, formData.country]);

  const handleCustomCountry = () => {
    setShowCustomCountry(true);
  };

  const handleCustomCity = () => {
    setShowCustomCity(true);
  };

  const handleLocationSelect = (lat: string, lng: string) => {
    handleChange('latitude', lat);
    handleChange('longitude', lng);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Location Information</h3>
      
      <AddressInput
        value={formData.address}
        onChange={(e) => handleChange('address', e.target.value)}
        onBlur={() => handleBlur('address')}
        error={errors.address}
        touched={touchedFields.address}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CountrySelector
          value={formData.country}
          onChange={(e) => handleChange('country', e.target.value)}
          onValueChange={(value) => handleChange('country', value)}
          onBlur={() => handleBlur('country')}
          error={errors.country}
          touched={touchedFields.country}
          onCustomClick={handleCustomCountry}
        />
        
        <CitySelector
          country={formData.country}
          value={formData.city}
          onChange={(e) => handleChange('city', e.target.value)}
          onValueChange={(value) => handleChange('city', value)}
          onBlur={() => handleBlur('city')}
          error={errors.city}
          touched={touchedFields.city}
          cities={cities}
          disabled={!formData.country}
          onCustomClick={handleCustomCity}
        />
      </div>
      
      <PostalCodeInput
        value={formData.postalCode}
        onChange={(e) => handleChange('postalCode', e.target.value)}
        onBlur={() => handleBlur('postalCode')}
        error={errors.postalCode}
        touched={touchedFields.postalCode}
      />

      <InteractiveMap
        latitude={formData.latitude || ''}
        longitude={formData.longitude || ''}
        address={formattedAddress}
        onLocationSelect={handleLocationSelect}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Latitude (optional)
          </label>
          <Input
            type="number"
            step="0.000001"
            placeholder="Enter latitude (e.g. 41.8902)"
            value={formData.latitude || ''}
            onChange={(e) => handleChange('latitude', e.target.value)}
            onBlur={() => handleBlur('latitude')}
            className="text-white bg-[#7A0486] border-fuchsia-800/30 focus:border-fuchsia-500/50"
          />
          {touchedFields.latitude && errors.latitude && (
            <p className="text-red-500 text-sm mt-1">{errors.latitude}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Longitude (optional)
          </label>
          <Input
            type="number"
            step="0.000001"
            placeholder="Enter longitude (e.g. 12.4922)"
            value={formData.longitude || ''}
            onChange={(e) => handleChange('longitude', e.target.value)}
            onBlur={() => handleBlur('longitude')}
            className="text-white bg-[#7A0486] border-fuchsia-800/30 focus:border-fuchsia-500/50"
          />
          {touchedFields.longitude && errors.longitude && (
            <p className="text-red-500 text-sm mt-1">{errors.longitude}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
