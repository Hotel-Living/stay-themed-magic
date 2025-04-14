
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PostalCodeInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  hasError: boolean;
  errorMessage?: string;
}

const PostalCodeInput: React.FC<PostalCodeInputProps> = ({
  value,
  onChange,
  onBlur,
  hasError,
  errorMessage
}) => {
  return (
    <div className="mb-4">
      <Label htmlFor="postalCode" className={cn(hasError ? "text-red-500" : "")}>
        Postal Code {hasError && <span className="text-red-500">*</span>}
      </Label>
      <Input
        type="text"
        id="postalCode"
        name="postalCode"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Enter postal code"
        className={cn(hasError ? "border-red-500" : "")}
      />
      {hasError && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default PostalCodeInput;
