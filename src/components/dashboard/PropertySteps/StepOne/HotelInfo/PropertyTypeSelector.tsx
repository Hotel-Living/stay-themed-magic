
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/useTranslation";

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
  const { t } = useTranslation();
  
  return (
    <div>
      <Label htmlFor="propertyType" className="text-white">
        {t('dashboard.propertyType')} <span className="text-red-500">*</span>
      </Label>
      <Select
        value={value}
        onValueChange={onChange}
        onOpenChange={onBlur}
      >
        <SelectTrigger id="propertyType" className="text-white bg-[#7A0486] border-white">
          <SelectValue placeholder={t('dashboard.selectPropertyType')} />
        </SelectTrigger>
        <SelectContent className="bg-[#7A0486] border-white">
          <SelectItem value="Hotel" className="text-white hover:bg-[#8A0499] focus:bg-[#8A0499] focus:text-white">Hotel</SelectItem>
          <SelectItem value="Resort" className="text-white hover:bg-[#8A0499] focus:bg-[#8A0499] focus:text-white">Resort</SelectItem>
          <SelectItem value="Boutique Hotel" className="text-white hover:bg-[#8A0499] focus:bg-[#8A0499] focus:text-white">Boutique Hotel</SelectItem>
          <SelectItem value="Motel" className="text-white hover:bg-[#8A0499] focus:bg-[#8A0499] focus:text-white">Motel</SelectItem>
          <SelectItem value="Inn" className="text-white hover:bg-[#8A0499] focus:bg-[#8A0499] focus:text-white">Inn</SelectItem>
        </SelectContent>
      </Select>
      {hasError && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default PropertyTypeSelector;
