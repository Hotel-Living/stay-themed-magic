
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  hasError?: boolean;
  errorMessage?: string;
  error?: string;
}

export default function AddressInput({ 
  value, 
  onChange, 
  onBlur,
  hasError,
  errorMessage,
  error 
}: AddressInputProps) {
  const { t } = useTranslation();

  const finalError = errorMessage || error;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground/90 uppercase">
        {t('dashboard.address')} *
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={t('dashboard.enterFullAddress')}
        className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
      />
      {finalError && <p className="text-red-400 text-xs">{finalError}</p>}
    </div>
  );
}
