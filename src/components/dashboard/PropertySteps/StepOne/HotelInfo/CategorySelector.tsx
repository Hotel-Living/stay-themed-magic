
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface CategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  hasError: boolean;
  errorMessage?: string;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  value,
  onChange,
  onBlur,
  hasError,
  errorMessage
}) => {
  return (
    <div>
      <Label htmlFor="category" className="text-white">
        Categoría <span className="text-red-500">*</span>
      </Label>
      <Select
        value={value}
        onValueChange={onChange}
        onOpenChange={onBlur}
      >
        <SelectTrigger id="category" className="text-white bg-[#7A0486] border-white">
          <SelectValue placeholder="Seleccione la categoría del hotel" />
        </SelectTrigger>
        <SelectContent className="bg-[#7A0486] border-white">
          <SelectItem value="1" className="text-white hover:bg-[#8A0499] focus:bg-[#8A0499] focus:text-white">1 Estrella</SelectItem>
          <SelectItem value="2" className="text-white hover:bg-[#8A0499] focus:bg-[#8A0499] focus:text-white">2 Estrellas</SelectItem>
          <SelectItem value="3" className="text-white hover:bg-[#8A0499] focus:bg-[#8A0499] focus:text-white">3 Estrellas</SelectItem>
          <SelectItem value="4" className="text-white hover:bg-[#8A0499] focus:bg-[#8A0499] focus:text-white">4 Estrellas</SelectItem>
          <SelectItem value="5" className="text-white hover:bg-[#8A0499] focus:bg-[#8A0499] focus:text-white">5 Estrellas</SelectItem>
        </SelectContent>
      </Select>
      {hasError && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default CategorySelector;
