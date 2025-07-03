import React, { useState, useEffect } from "react";
import InteractiveMap from "./StepOne/Location/InteractiveMap";
import CountryAutocomplete from "./StepOne/Location/CountryAutocomplete";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/useTranslation";
import { useFilterData } from "@/hooks/useFilterData";
import { supabase } from "@/integrations/supabase/client";

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
  const { countries, loading: filterLoading } = useFilterData();
  const [address, setAddress] = useState(formData.address || "");
  const [selectedCountry, setSelectedCountry] = useState(formData.country || "");
  const [selectedCity, setSelectedCity] = useState(formData.city || "");
  const [customCity, setCustomCity] = useState("");
  const [isAddingNewCity, setIsAddingNewCity] = useState(false);
  const [postalCode, setPostalCode] = useState(formData.postalCode || "");
  const [latitude, setLatitude] = useState(formData.latitude || "");
  const [longitude, setLongitude] = useState(formData.longitude || "");
  const [formattedAddress, setFormattedAddress] = useState("");
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  
  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    handleChange('country', countryCode);
    
    // Reset city selection when country changes
    setSelectedCity("");
    setIsAddingNewCity(false);
    setCustomCity("");
    handleChange('city', '');
  };
  
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCity(value);
    
    if (value === "other") {
      setIsAddingNewCity(true);
      setCustomCity("");
    } else {
      setIsAddingNewCity(false);
      setCustomCity("");
      handleChange('city', value);
    }
  };

  const handleCustomCitySubmit = () => {
    if (customCity.trim()) {
      const cityName = customCity.trim();
      console.log(`🏙️ CUSTOM CITY: Adding "${cityName}" to "${selectedCountry}"`);
      
      // Update the form data
      handleChange('city', cityName);
      
      // Update local state
      setSelectedCity(cityName);
      setIsAddingNewCity(false);
      setCustomCity("");
      
      // Add the new city to available cities list for immediate display
      setAvailableCities(prev => {
        if (!prev.includes(cityName)) {
          return [...prev, cityName].sort();
        }
        return prev;
      });
    }
  };

  const handleLocationSelect = (lat: string, lng: string) => {
    setLatitude(lat);
    setLongitude(lng);
    updateFormData('latitude', lat);
    updateFormData('longitude', lng);
  };
  
  // Fetch cities for selected country
  useEffect(() => {
    const fetchCitiesForCountry = async () => {
      if (!selectedCountry) {
        setAvailableCities([]);
        return;
      }

      setCitiesLoading(true);
      try {
        // Find the selected country object
        const selectedCountryObj = countries.find(c => c.code === selectedCountry || c.name === selectedCountry);
        if (!selectedCountryObj) {
          console.warn(`🏙️ Country not found in list: "${selectedCountry}"`);
          setAvailableCities([]);
          setCitiesLoading(false);
          return;
        }

        console.log(`🏙️ CITY SEARCH: Looking for cities in "${selectedCountryObj.name}" (code: ${selectedCountryObj.code})`);
        
        // Try multiple query strategies to handle database inconsistencies
        const queries = [
          selectedCountryObj.name,    // Full name like "Argentina"
          selectedCountryObj.code,    // Code like "AR"
          selectedCountryObj.code.toLowerCase() // Lowercase code like "ar"
        ];

        let allCities: string[] = [];
        
        for (const queryValue of queries) {
          const { data: hotelData, error } = await supabase
            .from('hotels')
            .select('city, country')
            .eq('status', 'approved')
            .eq('country', queryValue);

          if (!error && hotelData && hotelData.length > 0) {
            const cities = hotelData
              .map(hotel => hotel.city)
              .filter(city => city && city.trim() !== '');
            
            allCities = [...allCities, ...cities];
            console.log(`🏙️ Found ${cities.length} cities with query "${queryValue}":`, cities.slice(0, 3));
          }
        }

        // Remove duplicates and sort
        const uniqueCities = [...new Set(allCities)]
          .filter(city => city && city.trim() !== '')
          .sort();
          
        console.log(`🏙️ FINAL RESULT: ${uniqueCities.length} unique cities:`, uniqueCities);
        setAvailableCities(uniqueCities);
      } catch (error) {
        console.error('🏙️ ERROR fetching cities:', error);
        setAvailableCities([]);
      } finally {
        setCitiesLoading(false);
      }
    };

    fetchCitiesForCountry();
  }, [selectedCountry, countries, formData.country]);
  
  // Update form data when local state changes
  useEffect(() => {
    updateFormData('address', address);
  }, [address, updateFormData]);

  useEffect(() => {
    updateFormData('postalCode', postalCode);
  }, [postalCode, updateFormData]);

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
    if (selectedCountry && selectedCountry.trim() !== "") {
      const countryData = countries.find(c => c.code === selectedCountry);
      if (countryData) {
        if (formattedAddr) formattedAddr += ", ";
        formattedAddr += countryData.name;
      }
    }
    
    setFormattedAddress(formattedAddr);
  }, [address, selectedCity, customCity, selectedCountry, countries]);
  
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
          <CountryAutocomplete
            countries={countries}
            value={selectedCountry}
            onChange={handleCountryChange}
            onBlur={() => handleBlur('country')}
            placeholder={filterLoading ? t('dashboard.loading') : t('dashboard.selectCountry')}
            disabled={filterLoading}
            className={`text-white w-full p-2.5 rounded-lg border focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#7A0486] ${
              touchedFields.country && errors.country ? 'border-red-500' : 'border-fuchsia-800/30'
            }`}
            error={!!(touchedFields.country && errors.country)}
          />
          {touchedFields.country && errors.country && (
            <p className="text-red-400 text-sm mt-1">{errors.country}</p>
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
            disabled={!selectedCountry || citiesLoading}
            className={`text-white w-full p-2.5 rounded-lg border focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#7A0486] ${
              touchedFields.city && errors.city ? 'border-red-500' : 'border-fuchsia-800/30'
            }`}
          >
            <option value="">
              {!selectedCountry 
                ? t('dashboard.selectCountryFirst') 
                : citiesLoading
                  ? t('dashboard.loading')
                  : t('dashboard.selectCity')
              }
            </option>
            {availableCities.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
            {selectedCountry && !citiesLoading && (
              <option value="other">{t('dashboard.addNewCity')}</option>
            )}
          </select>
          {touchedFields.city && errors.city && (
            <p className="text-red-400 text-sm mt-1">{errors.city}</p>
          )}
          
          {isAddingNewCity && (
            <div className="mt-2 space-y-2">
              <input 
                type="text" 
                placeholder={t('dashboard.enterCityName')} 
                value={customCity} 
                onChange={e => setCustomCity(e.target.value)} 
                required 
                className="text-white w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#7A0486]" 
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCustomCitySubmit}
                  disabled={!customCity.trim()}
                  className="px-3 py-1 text-xs bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors"
                >
                  {t('dashboard.add')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNewCity(false);
                    setCustomCity("");
                    setSelectedCity("");
                  }}
                  className="px-3 py-1 text-xs bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                >
                  {t('dashboard.cancel')}
                </button>
              </div>
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