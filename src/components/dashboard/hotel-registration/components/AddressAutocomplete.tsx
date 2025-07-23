import React from 'react';

interface AddressAutocompleteProps {
  value?: string;
  onChange?: (value: string) => void;
  onPlaceSelected?: (place: any) => void;
  placeholder?: string;
  className?: string;
}

export const AddressAutocomplete = ({
  value = '',
  onChange,
  placeholder,
  className
}: AddressAutocompleteProps) => {
  // Simple, unblocked input field with NO interference whatsoever
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder || "Enter address"}
      className={className}
      autoComplete="off"
    />
  );
};