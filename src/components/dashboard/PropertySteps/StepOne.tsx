import React, { useState, useEffect } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries } from "@/utils/countries";

interface StepOneProps {
  onValidationChange?: (isValid: boolean) => void;
}

export default function StepOne({
  onValidationChange = () => {}
}: StepOneProps) {
  const [propertyName, setPropertyName] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [error, setError] = useState<string>("");

  const checkValidation = () => {
    if (!propertyName.trim()) {
      setError("Property Name is required");
      onValidationChange(false);
      return false;
    }

    if (!propertyType.trim()) {
      setError("Property Type is required");
      onValidationChange(false);
      return false;
    }

    if (!description.trim()) {
      setError("Description is required");
      onValidationChange(false);
      return false;
    }

    setError("");
    onValidationChange(true);
    return true;
  };

  useEffect(() => {
    checkValidation();
  }, [propertyName, propertyType, description]);

  return (
    <div className="space-y-6">
      {/* Add title with bold styling */}
      <h2 className="text-xl font-bold mb-4">MAIN HOTEL DATA</h2>
      
      {/* Basic Hotel Information */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="property-name">Property Name <span className="text-red-500">*</span></Label>
          <Input
            id="property-name"
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
            placeholder="Enter property name"
            className="bg-[#850390]"
          />
        </div>

        <div>
          <Label htmlFor="property-type">Property Type <span className="text-red-500">*</span></Label>
          <Select onValueChange={setPropertyType}>
            <SelectTrigger className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30">
              <SelectValue placeholder="Select a property type" />
            </SelectTrigger>
            <SelectContent className="bg-[#860493] border border-fuchsia-800/30">
              <SelectItem value="hotel" className="text-white hover:bg-[#5A1876]/20">Hotel</SelectItem>
              <SelectItem value="motel" className="text-white hover:bg-[#5A1876]/20">Motel</SelectItem>
              <SelectItem value="resort" className="text-white hover:bg-[#5A1876]/20">Resort</SelectItem>
              <SelectItem value="bnb" className="text-white hover:bg-[#5A1876]/20">Bed & Breakfast</SelectItem>
              <SelectItem value="vacation-rental" className="text-white hover:bg-[#5A1876]/20">Vacation Rental</SelectItem>
              {/* Add more property types as needed */}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="bg-[#7c057e]"
          />
        </div>

        <div>
          <Label htmlFor="country">Country</Label>
          <Select onValueChange={setCountry}>
            <SelectTrigger className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent className="bg-[#860493] border border-fuchsia-800/30">
              {countries.map((countryItem) => (
                <SelectItem key={countryItem.code} value={countryItem.name} className="text-white hover:bg-[#5A1876]/20">
                  {countryItem.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            className="bg-[#850588]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              className="bg-[#7c057e]"
            />
          </div>
          <div>
            <Label htmlFor="zip-code">Zip Code</Label>
            <Input
              id="zip-code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Enter zip code"
              className="bg-[#850588]"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-md text-red-200 flex items-center gap-2 bg-[#540ea9]/20">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      {!error && propertyName && propertyType && description && (
        <div className="p-3 rounded-md bg-green-500/20 text-green-200 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          <span>All required information has been provided</span>
        </div>
      )}
    </div>
  );
}
