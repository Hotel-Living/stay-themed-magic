
import React, { useState, useEffect } from "react";
import InteractiveMap from "./StepOne/Location/InteractiveMap";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Country } from 'country-state-city';
import { useTranslation } from "@/hooks/useTranslation";

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
  const [address, setAddress] = useState(formData.address || "");
  const [selectedCountry, setSelectedCountry] = useState(formData.country || "");
  const [customCountry, setCustomCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState(formData.city || "");
  const [customCity, setCustomCity] = useState("");
  const [isAddingNewCountry, setIsAddingNewCountry] = useState(false);
  const [isAddingNewCity, setIsAddingNewCity] = useState(false);
  const [postalCode, setPostalCode] = useState(formData.postalCode || "");
  const [latitude, setLatitude] = useState(formData.latitude || "");
  const [longitude, setLongitude] = useState(formData.longitude || "");
  const [formattedAddress, setFormattedAddress] = useState("");
  
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCountry(value);
    handleChange('country', value);
    
    if (value === "other") {
      setIsAddingNewCountry(true);
    } else {
      setIsAddingNewCountry(false);
      setCustomCountry("");
    }
    
    setSelectedCity("");
    setIsAddingNewCity(false);
    setCustomCity("");
    handleChange('city', '');
  };
  
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCity(value);
    handleChange('city', value);
    
    if (value === "other") {
      setIsAddingNewCity(true);
    } else {
      setIsAddingNewCity(false);
      setCustomCity("");
    }
  };

  const handleLocationSelect = (lat: string, lng: string) => {
    setLatitude(lat);
    setLongitude(lng);
    updateFormData('latitude', lat);
    updateFormData('longitude', lng);
  };
  
  // Update form data when local state changes
  useEffect(() => {
    updateFormData('address', address);
  }, [address, updateFormData]);

  useEffect(() => {
    updateFormData('postalCode', postalCode);
  }, [postalCode, updateFormData]);

  useEffect(() => {
    updateFormData('customCountry', customCountry);
  }, [customCountry, updateFormData]);

  useEffect(() => {
    updateFormData('customCity', customCity);
  }, [customCity, updateFormData]);
  
  // Create formatted address for geocoding
  useEffect(() => {
    let formattedAddr = "";
    
    // Add specific address if available
    if (address && address.trim() !== "") {
      formattedAddr = address;
    }
    
    // Add city if available
    if (selectedCity && selectedCity !== "other" && selectedCity.trim() !== "") {
      if (formattedAddr) formattedAddr += ", ";
      formattedAddr += selectedCity;
    } else if (customCity && customCity.trim() !== "") {
      if (formattedAddr) formattedAddr += ", ";
      formattedAddr += customCity;
    }
    
    // Add country if available
    if (selectedCountry && selectedCountry !== "other" && selectedCountry.trim() !== "") {
      const countryData = Country.getCountryByCode(selectedCountry);
      if (countryData) {
        if (formattedAddr) formattedAddr += ", ";
        formattedAddr += countryData.name;
      }
    } else if (customCountry && customCountry.trim() !== "") {
      if (formattedAddr) formattedAddr += ", ";
      formattedAddr += customCountry;
    }
    
    setFormattedAddress(formattedAddr);
  }, [address, selectedCity, customCity, selectedCountry, customCountry]);
  
  return (
    <div className="space-y-5">
      <h3 className="text-xl font-bold uppercase mb-4 text-slate-50">{t('dashboard.location')}</h3>
      
      <div>
        <label className="block text-sm font-medium text-white mb-1 uppercase">
          {t('dashboard.address')}
        </label>
        <input 
          type="text" 
          placeholder={t('dashboard.streetAddress')} 
          required 
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            handleChange('address', e.target.value);
          }}
          onBlur={() => handleBlur('address')}
          className={`text-white w-full p-2.5 rounded-lg border focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#7A0486] ${
            touchedFields.address && errors.address ? 'border-red-500' : 'border-fuchsia-800/30'
          }`}
        />
        {touchedFields.address && errors.address && (
          <p className="text-red-400 text-sm mt-1">{errors.address}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1 uppercase">
            {t('dashboard.country')}
          </label>
          <select 
            required 
            value={selectedCountry} 
            onChange={handleCountryChange}
            onBlur={() => handleBlur('country')}
            className={`text-white w-full p-2.5 rounded-lg border focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#7A0486] ${
              touchedFields.country && errors.country ? 'border-red-500' : 'border-fuchsia-800/30'
            }`}
          >
            <option value="">{t('dashboard.selectCountry')}</option>
            <option value="es">{t('dashboard.countries.spain')}</option>
            <option value="fr">{t('dashboard.countries.france')}</option>
            <option value="it">{t('dashboard.countries.italy')}</option>
            <option value="us">{t('dashboard.countries.unitedStates')}</option>
            <option value="other">{t('dashboard.addAnotherCountry')}</option>
          </select>
          {touchedFields.country && errors.country && (
            <p className="text-red-400 text-sm mt-1">{errors.country}</p>
          )}
          
          {isAddingNewCountry && (
            <div className="mt-2">
              <input 
                type="text" 
                placeholder={t('dashboard.enterCountryName')} 
                value={customCountry} 
                onChange={e => setCustomCountry(e.target.value)} 
                required 
                className="text-white w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#7A0486]" 
              />
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white mb-1 uppercase">
            {t('dashboard.city')}
          </label>
          <select 
            required 
            value={selectedCity} 
            onChange={handleCityChange}
            onBlur={() => handleBlur('city')}
            className={`text-white w-full p-2.5 rounded-lg border focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#7A0486] ${
              touchedFields.city && errors.city ? 'border-red-500' : 'border-fuchsia-800/30'
            }`}
          >
            <option value="">{t('dashboard.selectCity')}</option>
            {selectedCountry === 'es' && (
              <>
                <option value="madrid">{t('dashboard.cities.madrid')}</option>
                <option value="barcelona">{t('dashboard.cities.barcelona')}</option>
                <option value="valencia">{t('dashboard.cities.valencia')}</option>
                <option value="seville">{t('dashboard.cities.seville')}</option>
                <option value="other">{t('dashboard.addNewCity')}</option>
              </>
            )}
            {selectedCountry === 'fr' && (
              <>
                <option value="paris">{t('dashboard.cities.paris')}</option>
                <option value="nice">{t('dashboard.cities.nice')}</option>
                <option value="marseille">{t('dashboard.cities.marseille')}</option>
                <option value="lyon">{t('dashboard.cities.lyon')}</option>
                <option value="other">{t('dashboard.addNewCity')}</option>
              </>
            )}
            {selectedCountry === 'it' && (
              <>
                <option value="rome">{t('dashboard.cities.rome')}</option>
                <option value="milan">{t('dashboard.cities.milan')}</option>
                <option value="venice">{t('dashboard.cities.venice')}</option>
                <option value="florence">{t('dashboard.cities.florence')}</option>
                <option value="other">{t('dashboard.addNewCity')}</option>
              </>
            )}
            {selectedCountry === 'us' && (
              <>
                <option value="newyork">{t('dashboard.cities.newYork')}</option>
                <option value="losangeles">{t('dashboard.cities.losAngeles')}</option>
                <option value="chicago">{t('dashboard.cities.chicago')}</option>
                <option value="miami">{t('dashboard.cities.miami')}</option>
                <option value="other">{t('dashboard.addNewCity')}</option>
              </>
            )}
            {selectedCountry === 'other' && <option value="other">{t('dashboard.addNewCity')}</option>}
          </select>
          {touchedFields.city && errors.city && (
            <p className="text-red-400 text-sm mt-1">{errors.city}</p>
          )}
          
          {isAddingNewCity && (
            <div className="mt-2">
              <input 
                type="text" 
                placeholder={t('dashboard.enterCityName')} 
                value={customCity} 
                onChange={e => setCustomCity(e.target.value)} 
                required 
                className="text-white w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#7A0486]" 
              />
            </div>
          )}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-white mb-1 uppercase">
          {t('dashboard.postalCode')}
        </label>
        <input 
          type="text" 
          placeholder={t('dashboard.postalZipCode')} 
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="text-white w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#7A0486]" 
        />
      </div>
      
      <div>
        <Label className="block text-sm font-medium text-white mb-1 uppercase">
          {t('dashboard.locationOnMap')}
        </Label>
        <InteractiveMap
          latitude={latitude}
          longitude={longitude}
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
            placeholder={t('dashboard.latitudeFromMap')}
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="text-white bg-[#7A0486] border-fuchsia-800/30 focus:border-fuchsia-500/50"
            disabled
          />
        </div>
        <div>
          <Label className="block text-sm font-medium text-white mb-1">
            {t('dashboard.longitude')}
          </Label>
          <Input
            type="text"
            placeholder={t('dashboard.longitudeFromMap')}
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="text-white bg-[#7A0486] border-fuchsia-800/30 focus:border-fuchsia-500/50"
            disabled
          />
        </div>
      </div>
    </div>
  );
}
