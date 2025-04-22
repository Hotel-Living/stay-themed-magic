
import React from "react";
import AddressFormSection from "./StepOne/Location/sections/AddressFormSection";

interface LocationAddressSectionProps {
  address: string;
  setAddress: (value: string) => void;
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  customCountry: string;
  setCustomCountry: (value: string) => void;
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  customCity: string;
  setCustomCity: (value: string) => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  isAddingNewCountry: boolean;
  setIsAddingNewCountry: (value: boolean) => void;
  isAddingNewCity: boolean;
  setIsAddingNewCity: (value: boolean) => void;
}

const LocationAddressSection: React.FC<LocationAddressSectionProps> = (props) => (
  <AddressFormSection {...props} />
);

export default LocationAddressSection;
