
import React from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface PropertyTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  hasError: boolean;
  errorMessage?: string;
}

const PropertyTypeSelector: React.FC<PropertyTypeSelectorProps> = ({
  value,
  onChange,
  onBlur,
  hasError,
  errorMessage
}) => {
  return (
    <div className="space-y-1">
      <Label htmlFor="propertyType" className="text-white">
        Property Type <span className="text-red-500">*</span>
      </Label>
      <Select
        value={value}
        onValueChange={onChange}
        onOpenChange={onBlur}
      >
        <SelectTrigger id="propertyType" className="text-white bg-[#7A0486] border-white">
          <SelectValue placeholder="Select property type" />
        </SelectTrigger>
        <SelectContent className="bg-[#7A0486] border-white">
          <SelectItem value="Hotel">Hotel</SelectItem>
          <SelectItem value="Resort">Resort</SelectItem>
          <SelectItem value="Boutique Hotel">Boutique Hotel</SelectItem>
          <SelectItem value="Motel">Motel</SelectItem>
          <SelectItem value="Inn">Inn</SelectItem>
        </SelectContent>
      </Select>
      {hasError && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
    </div>
  );
};

export default PropertyTypeSelector;
