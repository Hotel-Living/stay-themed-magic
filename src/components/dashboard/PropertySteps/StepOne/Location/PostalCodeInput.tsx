
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PostalCodeInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error: any;
  touched: any;
  errorMessage?: string;
  hasError?: boolean;
}

const PostalCodeInput: React.FC<PostalCodeInputProps> = ({
  value,
  onChange,
  onBlur,
  error,
  touched,
  errorMessage,
  hasError
}) => {
  const finalHasError = hasError || (touched && error);

  return (
    <div className="mb-4">
      <Label htmlFor="postalCode" className={cn("text-white", finalHasError ? "text-red-500" : "")}>
        Postal Code {finalHasError && <span className="text-red-500">*</span>}
      </Label>
      <Input
        type="text"
        id="postalCode"
        name="postalCode"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Enter postal code"
        className={cn("text-white bg-[#7A0486] border-white", finalHasError ? "border-red-500" : "")}
      />
      {finalHasError && (
        <p className="text-red-500 text-sm mt-1">{errorMessage || error}</p>
      )}
    </div>
  );
};

export default PostalCodeInput;
