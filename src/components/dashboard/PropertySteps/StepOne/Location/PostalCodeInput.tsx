
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface PostalCodeInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  hasError?: boolean;
  errorMessage?: string;
  error?: string;
  touched?: boolean;
}

export default function PostalCodeInput({ 
  value, 
  onChange, 
  onBlur,
  hasError,
  errorMessage,
  error,
  touched 
}: PostalCodeInputProps) {
  const { t } = useTranslation();

  const finalError = errorMessage || error;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground/90 uppercase">
        {t('dashboard.postalCode')}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
      />
      {finalError && <p className="text-red-400 text-xs">{finalError}</p>}
    </div>
  );
}
