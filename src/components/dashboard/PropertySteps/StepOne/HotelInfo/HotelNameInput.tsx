
import React from "react";
import FormField from "../FormField";
import { useTranslation } from "@/hooks/useTranslation";

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
  const { t } = useTranslation();
  
  return (
    <FormField
      id="hotelName"
      label={t('dashboard.hotelName')}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={hasError ? errorMessage : ""}
      required
      placeholder={t('dashboard.hotelNamePlaceholder')}
    />
  );
};

export default HotelNameInput;
