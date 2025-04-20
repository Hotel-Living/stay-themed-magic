
import React from "react";
import FormField from "../FormField";

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
    <FormField
      id="hotelName"
      label="Hotel Name"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={hasError ? errorMessage : ""}
      required
      placeholder="Enter hotel name"
    />
  );
};

export default HotelNameInput;
