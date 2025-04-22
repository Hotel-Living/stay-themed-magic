
import React, { useState, useEffect } from "react";
import { Country } from 'country-state-city';
import AddressFormSection from "./StepOne/Location/sections/AddressFormSection";
import MapSection from "./StepOne/Location/sections/MapSection";
import CoordinatesSection from "./StepOne/Location/sections/CoordinatesSection";

export default function LocationStep() {
  const [address, setAddress] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [customCountry, setCustomCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [isAddingNewCountry, setIsAddingNewCountry] = useState(false);
  const [isAddingNewCity, setIsAddingNewCity] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [formattedAddress, setFormattedAddress] = useState("");
  
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
      <h3 className="text-xl font-bold uppercase mb-4 text-slate-50">LOCATION</h3>
      
      <AddressFormSection
        address={address}
        setAddress={setAddress}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        customCountry={customCountry}
        setCustomCountry={setCustomCountry}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        customCity={customCity}
        setCustomCity={setCustomCity}
        postalCode={postalCode}
        setPostalCode={setPostalCode}
        isAddingNewCountry={isAddingNewCountry}
        setIsAddingNewCountry={setIsAddingNewCountry}
        isAddingNewCity={isAddingNewCity}
        setIsAddingNewCity={setIsAddingNewCity}
      />
      
      <MapSection
        latitude={latitude}
        longitude={longitude}
        formattedAddress={formattedAddress}
        onLocationSelect={(lat, lng) => {
          setLatitude(lat);
          setLongitude(lng);
        }}
      />

      <CoordinatesSection
        latitude={latitude}
        longitude={longitude}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
      />
    </div>
  );
}
