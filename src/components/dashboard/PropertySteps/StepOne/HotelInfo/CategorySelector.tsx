
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
        Category <span className="text-red-500">*</span>
      </Label>
      <Select
        value={value}
        onValueChange={onChange}
        onOpenChange={onBlur}
      >
        <SelectTrigger id="category" className="text-white bg-[#7A0486] border-white">
          <SelectValue placeholder="Select hotel category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1 Star</SelectItem>
          <SelectItem value="2">2 Stars</SelectItem>
          <SelectItem value="3">3 Stars</SelectItem>
          <SelectItem value="4">4 Stars</SelectItem>
          <SelectItem value="5">5 Stars</SelectItem>
        </SelectContent>
      </Select>
      {hasError && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default CategorySelector;
