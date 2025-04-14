
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AddressInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  hasError: boolean;
  errorMessage?: string;
}

const AddressInput: React.FC<AddressInputProps> = ({
  value,
  onChange,
  onBlur,
  hasError,
  errorMessage
}) => {
  return (
    <div className="mb-4">
      <Label htmlFor="address" className={cn(hasError ? "text-red-500" : "")}>
        Address {hasError && <span className="text-red-500">*</span>}
      </Label>
      <Input
        type="text"
        id="address"
        name="address"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Enter address"
        className={cn(hasError ? "border-red-500" : "")}
      />
      {hasError && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default AddressInput;
