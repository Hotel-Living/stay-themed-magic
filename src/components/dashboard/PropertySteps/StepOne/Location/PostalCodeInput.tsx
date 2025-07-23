
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

interface PostalCodeInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error: any;
  touched: any;
  errorMessage?: string;
}

const PostalCodeInput: React.FC<PostalCodeInputProps> = ({
  value,
  onChange,
  onBlur,
  error,
  touched,
  errorMessage
}) => {
  const { t } = useTranslation();
  const hasError = touched && error;

  return (
    <div className="mb-4">
      <Label htmlFor="postalCode" className={cn("text-white", hasError ? "text-red-500" : "")}>
        {t('dashboard.postalCode')} {hasError && <span className="text-red-500">*</span>}
      </Label>
      <Input
        type="text"
        id="postalCode"
        name="postalCode"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={t('dashboard.enterPostalCode')}
        className={cn("text-white bg-[#7A0486] border-white", hasError ? "border-red-500" : "")}
      />
      {hasError && (
        <p className="text-red-500 text-sm mt-1">{errorMessage || error}</p>
      )}
    </div>
  );
};

export default PostalCodeInput;
