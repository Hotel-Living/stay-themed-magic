import React from "react";
import CountrySelector from "./CountrySelector";
import CitySelector from "./CitySelector";
import AddressInput from "./AddressInput";
import PostalCodeInput from "./PostalCodeInput";
import { Input } from "@/components/ui/input";

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
          onBlur={() => handleBlur('country')}
          error={errors.country}
          touched={touchedFields.country}
        />
        
        <CitySelector
          country={formData.country}
          value={formData.city}
          onChange={(e) => handleChange('city', e.target.value)}
          onBlur={() => handleBlur('city')}
          error={errors.city}
          touched={touchedFields.city}
        />
      </div>
      
      <PostalCodeInput
        value={formData.postalCode}
        onChange={(e) => handleChange('postalCode', e.target.value)}
        onBlur={() => handleBlur('postalCode')}
        error={errors.postalCode}
        touched={touchedFields.postalCode}
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
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
