
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  hasError: boolean;
  errorMessage?: string;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  value,
  onChange,
  onBlur,
  hasError,
  errorMessage
}) => {
  return (
    <div className="space-y-1">
      <Label htmlFor="description" className="text-white">
        Description <span className="text-red-500">*</span>
      </Label>
      <Textarea
        id="description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`bg-[#edf0ff] text-black ${hasError ? "border-red-500" : "border-white"}`}
        placeholder="Enter a detailed description of your hotel"
      />
      {hasError && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
    </div>
  );
};

export default DescriptionInput;
