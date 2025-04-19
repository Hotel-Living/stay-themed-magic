
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface HotelNameInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  hasError: boolean;
  errorMessage?: string;
}

const HotelNameInput: React.FC<HotelNameInputProps> = ({
  value,
  onChange,
  onBlur,
  hasError,
  errorMessage
}) => {
  return (
    <div className="space-y-1">
      <Label htmlFor="hotelName" className="text-white">
        Property Name <span className="text-red-500">*</span>
      </Label>
      <Input
        id="hotelName"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`bg-[#edf0ff] text-black ${hasError ? "border-red-500" : "border-white"}`}
        placeholder="Enter hotel name"
      />
      {hasError && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
    </div>
  );
};

export default HotelNameInput;
