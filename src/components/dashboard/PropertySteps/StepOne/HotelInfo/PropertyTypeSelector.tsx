
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    <div>
      <Label htmlFor="propertyType" className="text-white">
        Type of Property <span className="text-red-500">*</span>
      </Label>
      <Select
        value={value}
        onValueChange={onChange}
        onOpenChange={onBlur}
      >
        <SelectTrigger id="propertyType" className="text-white bg-[#7A0486] border-white">
          <SelectValue placeholder="Select property type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Hotel">Hotel</SelectItem>
          <SelectItem value="Resort">Resort</SelectItem>
          <SelectItem value="Boutique Hotel">Boutique Hotel</SelectItem>
          <SelectItem value="Motel">Motel</SelectItem>
          <SelectItem value="Inn">Inn</SelectItem>
        </SelectContent>
      </Select>
      {hasError && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default PropertyTypeSelector;
