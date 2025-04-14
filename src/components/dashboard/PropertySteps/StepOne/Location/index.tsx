
import React from 'react';
import AddressInput from './AddressInput';
import CountrySelector from './CountrySelector';
import CitySelector from './CitySelector';
import PostalCodeInput from './PostalCodeInput';
import { useCitiesByCountry } from './useCitiesByCountry';
import CustomCountryInput from './CustomCountryInput';
import CustomCityInput from './CustomCityInput';

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

const LocationSection: React.FC<LocationSectionProps> = ({
  formData,
  errors,
  touchedFields,
  handleChange,
  handleBlur
}) => {
  const { 
    countries, 
    cities, 
    customCountry, setCustomCountry,
    customCity, setCustomCity,
    customCountryName, setCustomCountryName,
    customCityName, setCustomCityName
  } = useCitiesByCountry(formData.country);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleChange(e.target.name, e.target.value);
  };

  const handleSelectChange = (name: string, value: string) => {
    handleChange(name, value);
  };

  return (
    <div className="space-y-4">
      <AddressInput 
        value={formData.address || ''}
        onChange={handleInputChange}
        onBlur={() => handleBlur('address')}
        hasError={!!errors.address && touchedFields.address}
        errorMessage={errors.address}
      />
      
      <div className="mb-4">
        {customCountry ? (
          <CustomCountryInput 
            value={customCountryName}
            onChange={(e) => setCustomCountryName(e.target.value)}
            onBlur={() => {
              handleChange('country', customCountryName);
              handleBlur('country');
            }}
            onCancel={() => setCustomCountry(false)}
          />
        ) : (
          <CountrySelector 
            value={formData.country || ''}
            onValueChange={(value) => {
              if (value === 'add-new') {
                setCustomCountry(true);
              } else {
                handleSelectChange('country', value);
              }
              handleBlur('country');
            }}
            onBlur={() => handleBlur('country')}
            hasError={!!errors.country && touchedFields.country}
            errorMessage={errors.country}
            onCustomClick={() => setCustomCountry(true)}
          />
        )}
      </div>

      <div className="mb-4">
        {customCity ? (
          <CustomCityInput 
            value={customCityName}
            onChange={(e) => setCustomCityName(e.target.value)}
            onBlur={() => {
              handleChange('city', customCityName);
              handleBlur('city');
            }}
            onCancel={() => setCustomCity(false)}
          />
        ) : (
          <CitySelector 
            value={formData.city || ''}
            onValueChange={(value) => {
              if (value === 'add-new') {
                setCustomCity(true);
              } else {
                handleSelectChange('city', value);
              }
              handleBlur('city');
            }}
            onBlur={() => handleBlur('city')}
            hasError={!!errors.city && touchedFields.city}
            errorMessage={errors.city}
            cities={cities.map(city => city.name)}
            disabled={!formData.country}
            onCustomClick={() => setCustomCity(true)}
          />
        )}
      </div>
      
      <PostalCodeInput 
        value={formData.postalCode || ''}
        onChange={handleInputChange}
        onBlur={() => handleBlur('postalCode')}
        hasError={!!errors.postalCode && touchedFields.postalCode}
        errorMessage={errors.postalCode}
      />
    </div>
  );
};

export default LocationSection;
