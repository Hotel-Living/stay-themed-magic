
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import { Country, State, City } from 'country-state-city';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the required props interface to match what StepOne is passing
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
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [customCountry, setCustomCountry] = useState(false);
  const [customCity, setCustomCity] = useState(false);
  const [customCountryName, setCustomCountryName] = useState('');
  const [customCityName, setCustomCityName] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const countryList = Country.getAllCountries();
    setCountries(countryList);
  }, []);

  useEffect(() => {
    if (formData.country) {
      const stateList = State.getStatesOfCountry(formData.country);
      setStates(stateList);
    } else {
      setStates([]);
      setCities([]);
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.country && formData.state) {
      const cityList = City.getCitiesOfState(formData.country, formData.state);
      setCities(cityList);
    } else {
      setCities([]);
    }
  }, [formData.country, formData.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleChange(e.target.name, e.target.value);
  };

  const handleSelectChange = (name: string, value: string) => {
    handleChange(name, value);
  };

  const CustomCountryInput = ({ customCountryName, setCustomCountryName, setCustomCountry }) => {
    return (
      <div>
        <Label htmlFor="customCountryName">Custom Country Name</Label>
        <Input
          id="customCountryName"
          type="text"
          value={customCountryName}
          onChange={(e) => setCustomCountryName(e.target.value)}
          onBlur={() => {
            handleChange('country', customCountryName);
            handleBlur('country');
          }}
        />
        <Button variant="secondary" size="sm" onClick={() => setCustomCountry(false)}>
          Cancel
        </Button>
      </div>
    );
  };

  const CustomCityInput = ({ customCityName, setCustomCityName, setCustomCity }) => {
    return (
      <div>
        <Label htmlFor="customCityName">Custom City Name</Label>
        <Input
          id="customCityName"
          type="text"
          value={customCityName}
          onChange={(e) => setCustomCityName(e.target.value)}
          onBlur={() => {
            handleChange('city', customCityName);
            handleBlur('city');
          }}
        />
        <Button variant="secondary" size="sm" onClick={() => setCustomCity(false)}>
          Cancel
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Address */}
      <div className="mb-4">
        <Label htmlFor="address" className={cn(errors.address && touchedFields.address ? "text-red-500" : "")}>
          Address {errors.address && touchedFields.address && <span className="text-red-500">*</span>}
        </Label>
        <Input
          type="text"
          id="address"
          name="address"
          value={formData.address || ''}
          onChange={handleInputChange}
          onBlur={() => handleBlur('address')}
          placeholder="Enter address"
          className={cn(errors.address && touchedFields.address ? "border-red-500" : "")}
        />
        {errors.address && touchedFields.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address}</p>
        )}
      </div>
      
      {/* Country Selection */}
      <div className="mb-4">
        <Label htmlFor="country" className={cn(errors.country && touchedFields.country ? "text-red-500" : "")}>
          Country {errors.country && touchedFields.country && <span className="text-red-500">*</span>}
        </Label>
        <div className="flex items-center space-x-2">
          <Select 
            value={formData.country || ''} 
            onValueChange={(value) => {
              handleSelectChange('country', value);
              handleBlur('country');
            }}
          >
            <SelectTrigger className={cn("w-[180px]", errors.country && touchedFields.country ? "border-red-500" : "")}>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="secondary" size="sm" onClick={() => setCustomCountry(true)}>
            Custom
          </Button>
        </div>
        {customCountry === true && (
          <CustomCountryInput
            customCountryName={customCountryName}
            setCustomCountryName={setCustomCountryName}
            setCustomCountry={setCustomCountry}
          />
        )}
        {errors.country && touchedFields.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country}</p>
        )}
      </div>

      {/* City Selection */}
      <div className="mb-4">
        <Label htmlFor="city" className={cn(errors.city && touchedFields.city ? "text-red-500" : "")}>
          City {errors.city && touchedFields.city && <span className="text-red-500">*</span>}
        </Label>
        <div className="flex items-center space-x-2">
          <Select 
            value={formData.city || ''} 
            onValueChange={(value) => {
              handleSelectChange('city', value);
              handleBlur('city');
            }}
          >
            <SelectTrigger className={cn("w-[180px]", errors.city && touchedFields.city ? "border-red-500" : "")}>
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {states.length === 0 ? (
                <SelectItem disabled value="">Select a country first</SelectItem>
              ) : cities.length === 0 ? (
                <SelectItem disabled value="">Select a state first</SelectItem>
              ) : (
                cities.map((city) => (
                  <SelectItem key={city.name} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          <Button variant="secondary" size="sm" onClick={() => setCustomCity(true)}>
            Custom
          </Button>
        </div>
        {customCity === true && (
          <CustomCityInput
            customCityName={customCityName}
            setCustomCityName={setCustomCityName}
            setCustomCity={setCustomCity}
          />
        )}
        {errors.city && touchedFields.city && (
          <p className="text-red-500 text-sm mt-1">{errors.city}</p>
        )}
      </div>
      
      {/* Postal Code */}
      <div className="mb-4">
        <Label htmlFor="postalCode" className={cn(errors.postalCode && touchedFields.postalCode ? "text-red-500" : "")}>
          Postal Code {errors.postalCode && touchedFields.postalCode && <span className="text-red-500">*</span>}
        </Label>
        <Input
          type="text"
          id="postalCode"
          name="postalCode"
          value={formData.postalCode || ''}
          onChange={handleInputChange}
          onBlur={() => handleBlur('postalCode')}
          placeholder="Enter postal code"
          className={cn(errors.postalCode && touchedFields.postalCode ? "border-red-500" : "")}
        />
        {errors.postalCode && touchedFields.postalCode && (
          <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
        )}
      </div>
    </div>
  );
};

export default LocationSection;
