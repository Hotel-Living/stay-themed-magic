
import React from "react";
import FormField from "../FormField";
import { useTranslation } from "@/hooks/useTranslation";

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
  const { t } = useTranslation();
  
  return (
    <FormField
      id="description"
      label={t('dashboard.description')}
      type="textarea"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={hasError ? errorMessage : ""}
      required
      placeholder={t('dashboard.hotelDescription')}
    />
  );
};

export default DescriptionInput;
