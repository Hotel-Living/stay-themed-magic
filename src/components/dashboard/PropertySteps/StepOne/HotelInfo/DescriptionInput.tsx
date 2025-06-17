
import React from "react";
import FormField from "../FormField";

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
    <FormField
      id="description"
      label="Descripción del Hotel"
      type="textarea"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={hasError ? errorMessage : ""}
      required
      placeholder="Ingrese una descripción detallada de su hotel"
    />
  );
};

export default DescriptionInput;
