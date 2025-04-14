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
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

interface LocationSectionProps {
  propertyData: any;
  setPropertyData: (data: any) => void;
  onNext: () => void;
}

const LocationSection: React.FC<LocationSectionProps> = ({
  propertyData,
  setPropertyData,
  onNext
}) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
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
    if (propertyData.country) {
      const stateList = State.getStatesOfCountry(propertyData.country);
      setStates(stateList);
    } else {
      setStates([]);
      setCities([]);
    }
  }, [propertyData.country]);

  useEffect(() => {
    if (propertyData.country && propertyData.state) {
      const cityList = City.getCitiesOfState(propertyData.country, propertyData.state);
      setCities(cityList);
    } else {
      setCities([]);
    }
  }, [propertyData.country, propertyData.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPropertyData({ ...propertyData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setPropertyData({ ...propertyData, [name]: value });
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
          onBlur={() => setPropertyData({ ...propertyData, country: customCountryName })}
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
          onBlur={() => setPropertyData({ ...propertyData, city: customCityName })}
        />
        <Button variant="secondary" size="sm" onClick={() => setCustomCity(false)}>
          Cancel
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Property Name */}
      <div className="mb-4">
        <Label htmlFor="propertyName">Property Name</Label>
        <Input
          type="text"
          id="propertyName"
          name="propertyName"
          value={propertyData.propertyName || ''}
          onChange={handleInputChange}
          placeholder="Enter property name"
        />
      </div>

      {/* Address */}
      <div className="mb-4">
        <Label htmlFor="address">Address</Label>
        <Input
          type="text"
          id="address"
          name="address"
          value={propertyData.address || ''}
          onChange={handleInputChange}
          placeholder="Enter address"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={propertyData.description || ''}
          onChange={handleInputChange}
          placeholder="Enter description"
        />
      </div>
      
      {/* Country Selection */}
      <div className="mb-4">
        <Label htmlFor="country">Country</Label>
        <div className="flex items-center space-x-2">
          <Select onValueChange={(value) => handleSelectChange('country', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a country" defaultValue={propertyData.country || ''} />
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
      </div>

      {/* City Selection */}
      <div className="mb-4">
        <Label htmlFor="city">City</Label>
        <div className="flex items-center space-x-2">
          <Select onValueChange={(value) => handleSelectChange('city', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a city" defaultValue={propertyData.city || ''} />
            </SelectTrigger>
            <SelectContent>
              {states.length === 0 ? (
                <SelectItem disabled value="">Select a country first</SelectItem>
              ) : cities.length === 0 ? (
                <SelectItem disabled value="">Select a state first</SelectItem>
              ) : (
                cities.map((city) => (
                  <SelectItem key={city.isoCode} value={city.name}>
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
      </div>
      
      {/* Postal Code */}
      <div className="mb-4">
        <Label htmlFor="postalCode">Postal Code</Label>
        <Input
          type="text"
          id="postalCode"
          name="postalCode"
          value={propertyData.postalCode || ''}
          onChange={handleInputChange}
          placeholder="Enter postal code"
        />
      </div>
    </div>
  );
};

export default LocationSection;
