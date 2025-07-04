
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

interface CustomCountryInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  touched: boolean;
  errorMessage?: string;
  onBackClick: () => void;
}

export default function CustomCountryInput({
  value,
  onChange,
  onBlur,
  touched,
  errorMessage,
  onBackClick
}: CustomCountryInputProps) {
  const { t } = useTranslation();
  const hasError = touched && errorMessage;

  return (
    <div>
      <Label htmlFor="country" className={cn(hasError ? "text-red-500" : "text-white")}>
        {t('dashboard.propertyForm.country')} {hasError && <span className="text-red-500">*</span>}
      </Label>
      <input 
        type="text" 
        placeholder={t('dashboard.propertyForm.enterCountryName')} 
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={cn(
          "w-full p-2 text-white bg-[#7A0486] border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500",
          hasError ? "border-red-500" : ""
        )}
      />
      {hasError && (
        <p className="text-red-500 text-sm mt-1 bg-[#1A1F2C] px-3 py-1 rounded">{errorMessage}</p>
      )}
      <Button 
        onClick={onBackClick}
        variant="secondary"
        size="sm"
        className="mt-2 bg-[#1A1F2C] hover:bg-[#2A2F3C] text-white"
      >
        {t('dashboard.propertyForm.back')}
      </Button>
    </div>
  );
}
